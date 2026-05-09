# Beta Execution Plan

This is the task board for building SLASH-CRM Beta. It is written for autonomous agents and should be followed in order.

## Beta Definition

Beta means an internal agency team can use SLASH-CRM daily to manage leads, clients, services, revenue, and onboarding without returning to spreadsheets.

Beta does not require advanced API integrations, AI, or a client portal.

## Beta Gates

The product is not Beta until:

- Users can sign in, sign out, reset password, and have roles.
- Users can only access organization-scoped data.
- Clients, services, leads, proposals, activities, and onboarding records persist in Supabase.
- Website lead capture creates real leads with source attribution.
- A won lead can become a client with services and onboarding.
- MRR is computed from active client-service assignments.
- Every open lead has an owner and next follow-up date.
- Lint, typecheck, build, and GitHub Actions pass.
- Staging deployment is live.

## Phase P0: Platform Spine

### P0-ENV-001: Add typed environment handling

Role: Platform Agent

Allowed files:

- `src/integrations/supabase/*`
- `src/lib/*`
- `.env.example`
- `docs/SETUP.md`

Implementation:

- Add a small environment reader for `VITE_APP_ENV`, `VITE_SUPABASE_URL`, and `VITE_SUPABASE_ANON_KEY`.
- Fail with a clear developer message when required Supabase values are missing in production-like environments.
- Keep server-only secrets out of Vite code.
- Update setup docs.

Acceptance criteria:

- App can run locally without crashing when Supabase values are empty, but clearly reports that backend is not connected where needed.
- Production/staging mode requires Supabase URL and anon key.
- No server-only key is imported into client code.

Commands:

- `npm run lint`
- `npm run typecheck`
- `npm run build`

### P0-SUPABASE-001: Add Supabase browser client

Role: Platform Agent

Allowed files:

- `src/integrations/supabase/*`
- `src/app/providers.tsx`
- `package.json`
- `package-lock.json`

Implementation:

- Install `@supabase/supabase-js` if missing.
- Create a browser Supabase client.
- Export typed helpers that use `src/types/database.ts`.
- Add a provider boundary only if needed.

Acceptance criteria:

- Supabase client can be imported by feature modules.
- Types reference the generated database type.
- Build passes.

### P0-AUTH-001: Create auth feature module

Role: Platform Agent

Allowed files:

- `src/features/auth/*`
- `src/app/providers.tsx`
- `src/app/routes.tsx`
- `src/pages/*` only if adding route wrappers

Implementation:

- Add auth context or hook for session, user, loading state, sign in, sign out, password reset.
- Add protected route behavior for `/app/*`.
- Add a minimal login screen if no session exists.
- Keep public `/` landing route accessible.

Acceptance criteria:

- `/` remains public.
- `/app/*` requires a session when Supabase is configured.
- User can sign out.
- Auth loading state avoids route flicker.

### P0-ORG-001: Add organization context

Role: Platform Agent

Allowed files:

- `src/features/auth/*`
- `src/app/providers.tsx`
- `src/integrations/supabase/*`

Implementation:

- Fetch organization memberships for signed-in user.
- Select current organization.
- Expose `organizationId`, `role`, and permission helpers.
- Add owner bootstrap behavior plan if no organization exists.

Acceptance criteria:

- Feature queries can require `organizationId`.
- Role helpers support owner, admin, editor, and viewer.
- Empty org state is handled.

### P0-DB-001: Validate current schema and create next migration plan

Role: Database Agent

Allowed files:

- `supabase/migrations/*`
- `supabase/seed.sql`
- `docs/SUPABASE_DB_MAPPING.md`

Implementation:

- Verify `0001_initial_schema.sql` covers Beta core.
- Identify missing Beta tables.
- Add migration only when a task requires it.
- Keep RLS organization-scoped.

Acceptance criteria:

- Database mapping doc matches actual schema.
- Missing tables are explicitly listed with migration names.

## Phase P1: Real CRM Core

### P1-SERVICES-001: Build services data module

Role: Services Agent

Allowed files:

- `src/features/services/*`
- `src/pages/Services.tsx`

Dependencies:

- P0-SUPABASE-001
- P0-ORG-001

Implementation:

- Add service queries and mutations.
- Add zod schema for service create/edit.
- Wire services page to Supabase when connected.
- Keep mock fallback only for development/demo mode if explicitly isolated.

Acceptance criteria:

- Create, edit, archive/deactivate service works.
- Services are organization-scoped.
- Service list survives refresh.

### P1-CLIENTS-001: Build clients data module

Role: Clients Agent

Allowed files:

- `src/features/clients/*`
- `src/pages/Clients.tsx`
- `src/pages/ClientDetail.tsx`

Dependencies:

- P0-SUPABASE-001
- P0-ORG-001
- P1-SERVICES-001 for service assignment

Implementation:

- Add client queries and mutations.
- Add create/edit/archive forms.
- Add client detail query.
- Add client-service assignment view.
- Preserve existing light workspace UI direction.

Acceptance criteria:

- Create, edit, and archive clients persist.
- Archived clients are hidden by default but not deleted.
- Client detail reloads from database by ID.
- Client status and service assignments display correctly.

### P1-LEADS-001: Build leads data module

Role: Leads Agent

Allowed files:

- `src/features/leads/*`
- `src/pages/Prospects.tsx`

Dependencies:

- P0-SUPABASE-001
- P0-ORG-001

Implementation:

- Add lead queries and mutations.
- Wire pipeline board and table to Supabase.
- Enforce owner and next follow-up for open leads.
- Add stage updates with activity logging.

Acceptance criteria:

- Lead create/edit/stage move persists.
- Stage move creates a `lead_activities` or `activities` record.
- Open leads without next follow-up are visually flagged.
- Filters operate on real data.

### P1-PROPOSALS-001: Add proposal tracking

Role: Leads Agent

Allowed files:

- `src/features/leads/*`
- `src/pages/Prospects.tsx`

Dependencies:

- P1-LEADS-001
- P1-SERVICES-001

Implementation:

- Add proposals for lead with services, monthly value, one-time fees, status, sent date, expiry.
- Add proposal status changes.
- Keep document URL optional for Beta.

Acceptance criteria:

- A lead can have at least one proposal.
- Proposal status affects lead context but does not automatically convert the lead.
- Proposal value contributes to pipeline value.

### P1-ACTIVITIES-001: Add activity logging module

Role: Activities Agent or Leads Agent

Allowed files:

- `src/features/activities/*`
- Relevant feature files that call activity APIs

Implementation:

- Add activity create/list helpers.
- Support note, call, email, meeting, task, stage change, proposal sent, service, onboarding.
- Attach activities to client, lead, or both when appropriate.

Acceptance criteria:

- Client detail shows activity timeline.
- Lead detail/drawer shows lead activity.
- Stage changes and proposal events create activity records.

### P1-DASHBOARD-001: Replace dashboard mock KPIs

Role: Revenue Agent

Allowed files:

- `src/features/dashboard/*`
- `src/features/revenue/*`
- `src/pages/Dashboard.tsx`

Dependencies:

- P1-CLIENTS-001
- P1-SERVICES-001
- P1-LEADS-001

Implementation:

- Compute active clients.
- Compute MRR from active client services.
- Compute weighted pipeline from open leads.
- Show follow-ups due.

Acceptance criteria:

- Dashboard numbers are derived from Supabase records.
- Empty states explain what data is needed.
- Mock values do not appear when backend data is connected.

## Phase P2: Lead Engine

### P2-LEADINTAKE-001: Implement lead intake Edge Function

Role: Backend Agent

Allowed files:

- `supabase/functions/lead-intake/*`
- `docs/THIRD_PARTY_SERVICE_MAP.md`
- `docs/SETUP.md`

Dependencies:

- P0-DB-001
- P1-LEADS-001

Implementation:

- Validate public form payload.
- Capture source, campaign, channel, UTM fields, referrer, and page URL.
- Insert lead as `new`.
- Add initial lead activity.
- Return safe response with no internal IDs unless needed.
- Add basic CORS policy.

Acceptance criteria:

- Website/contact forms can create leads.
- Duplicate email/company/website submissions are handled safely.
- Invalid payloads return clear errors.
- Service role key remains server-side only.

### P2-CONVERT-001: Implement convert lead workflow

Role: Backend Agent

Allowed files:

- `supabase/functions/convert-lead/*`
- `src/features/leads/*`
- `src/features/clients/*`
- `src/features/onboarding/*`

Dependencies:

- P1-CLIENTS-001
- P1-SERVICES-001
- P1-LEADS-001
- P1-PROPOSALS-001

Implementation:

- Convert accepted or manually selected won lead into client.
- Create client record if no linked client exists.
- Create client-service assignments.
- Create onboarding record.
- Mark lead `won` and set `converted_at`.
- Write activity history.

Acceptance criteria:

- Lead conversion does not require retyping core data.
- Conversion is idempotent or safely blocked if already converted.
- Created client links back to original lead.

## Phase P3: Operations

### P3-ONBOARDING-001: Wire onboarding records

Role: Onboarding Agent

Allowed files:

- `src/features/onboarding/*`
- `src/pages/Onboarding.tsx`

Dependencies:

- P2-CONVERT-001

Implementation:

- Read onboarding records from Supabase.
- Support status, target date, completion date.
- Add task/template structure if migration exists.
- Add document checklist plan if storage is not ready.

Acceptance criteria:

- Converted leads appear in onboarding.
- Onboarding status persists.
- Empty state explains how onboarding starts.

### P3-REVENUE-001: Add revenue calculations

Role: Revenue Agent

Allowed files:

- `src/features/revenue/*`
- `src/pages/Earnings.tsx`

Dependencies:

- P1-CLIENTS-001
- P1-SERVICES-001

Implementation:

- Calculate MRR, ARR, revenue by service, revenue by client.
- Replace mock earnings values when backend is connected.
- Keep ROI fields clearly marked as manual until integrations exist.

Acceptance criteria:

- Revenue uses active client-service assignments.
- Paused/cancelled services do not count toward active MRR.
- Totals match visible records.

### P3-EXPORTS-001: Add CSV exports

Role: Reports Agent

Allowed files:

- `src/features/reports/*`
- `src/pages/Reports.tsx`

Dependencies:

- P1 core data

Implementation:

- Export clients, services, leads, proposals, activities, and revenue summary.
- Include date generated and organization name.
- Keep PDF generation as optional if not yet available.

Acceptance criteria:

- CSV exports download successfully.
- Export values match current filtered records.
- No cross-organization data leaks.

## Phase P4: Beta QA And Launch

### P4-QA-001: Add smoke test plan

Role: QA Agent

Allowed files:

- `docs/RELEASE_CHECKLIST.md`
- test files if test tooling is added

Implementation:

- Define smoke paths:
  - sign in
  - create service
  - create client
  - assign service
  - create lead
  - move lead stage
  - create proposal
  - convert lead
  - verify dashboard MRR
  - export CSV
- Add manual browser checklist if automated tests are not added yet.

Acceptance criteria:

- Release checklist is complete enough for Beta verification.
- Smoke plan maps to actual routes.

### P4-DEPLOY-001: Prepare staging deployment

Role: Platform Agent

Allowed files:

- `docs/DEPLOYMENT.md`
- `.env.example`
- deployment config if required

Implementation:

- Document Vercel project setup.
- Document Supabase env vars.
- Document Supabase redirect URLs for auth.
- Document deployment verification.

Acceptance criteria:

- A new operator can deploy staging from docs.
- No secrets are committed.

## Task Prioritization

If agents are idle, pick the lowest-numbered unblocked task.

Priority order:

1. P0 platform tasks.
2. P1 services and clients.
3. P1 leads and activities.
4. P2 lead engine.
5. P3 revenue, onboarding, exports.
6. P4 QA and deployment.

Do not start P3 or P4 implementation until P0 and relevant P1 dependencies are complete.
