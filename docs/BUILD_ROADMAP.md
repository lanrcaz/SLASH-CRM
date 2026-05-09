# Build Roadmap

This roadmap turns the master plan into an execution path for shipping SLASH-CRM from prototype to market-ready agency CRM.

## Product North Star

SLASH-CRM is an agency operating system that connects lead capture, client management, service delivery, revenue tracking, and proof-of-value reporting.

The product wins when an agency can answer these questions without spreadsheets:

- Which leads need follow-up today?
- Which clients are active, at risk, paused, or churned?
- Which services is each client paying for?
- What is true MRR by client, service, and owner?
- What proof do we have that our work is producing ROI?
- What needs to happen next to retain or upsell each client?

## Shipping Principles

- Build real workflows before advanced automation.
- Replace mock data with Supabase-backed data before adding more polish.
- Ship in vertical slices: database, API, UI, validation, QA, docs, deploy.
- Do not call a feature complete until it saves, reloads, and survives refresh.
- Do not add AI unless it can read real data and take a useful action.
- Prefer free-first integrations, especially Google Search Console for SEO.

## Phase 0: Platform Spine

Goal: make the app safe, persistent, and deployable.

Primary deliverables:

- Supabase project connected through environment variables.
- Auth flows for sign in, sign out, password reset, and session persistence.
- Organization and role context from `organization_memberships`.
- Protected `/app/*` routes.
- Seed or bootstrap path for first owner and organization.
- Staging deployment on Vercel.
- CI remains green for lint, typecheck, and build.

Exit criteria:

- A real user can log in and see only their organization data.
- The app can deploy to staging without secrets in the repo.
- The team can stop relying on mock-only screens for new core work.

## Phase 1: Real CRM Core

Goal: replace the prototype data layer with real records.

Primary deliverables:

- Clients CRUD with archive instead of hard delete.
- Services catalog CRUD.
- Client-service assignments with status, price, start date, contract type, and auto-renew.
- Leads pipeline with owner, source, stage, probability, value, and next follow-up.
- Proposals attached to leads.
- Activities attached to clients and leads.
- Dashboard metrics computed from persisted records.

Exit criteria:

- Clients, services, leads, proposals, and activities persist in Supabase.
- MRR comes from active client-service assignments.
- Every open lead has an owner and next follow-up date.

## Phase 2: Lead Engine

Goal: make SLASH-CRM generate and process real opportunities, not just store manual entries.

Primary deliverables:

- Public lead intake Edge Function for website/contact forms.
- UTM/source attribution capture.
- Duplicate lead detection.
- Lead assignment rules.
- Stale lead detection.
- Lead qualification checklist.
- Convert won lead into client, service assignment, and onboarding record.

Exit criteria:

- A website form submission creates a lead in the CRM with source attribution.
- A won lead converts into an active client without retyping core data.
- The pipeline can show source quality, win rate, and expected revenue.

## Phase 3: Revenue And Delivery Workflows

Goal: make the CRM useful for daily agency operations.

Primary deliverables:

- MRR, ARR, weighted pipeline, and closed revenue calculations.
- Time tracking per client and service.
- Invoice readiness view.
- Onboarding records, task templates, and document checklist.
- Offboarding workflow for churned clients.
- CSV exports for clients, revenue, leads, and activities.
- Basic PDF report generation.

Exit criteria:

- The team can run weekly operations from SLASH-CRM.
- Invoices can be generated or reviewed from CRM data.
- Reports can be exported and shared.

## Phase 4: Proof-Of-Value Integrations

Goal: prove client ROI with real external data.

Recommended order:

1. Google Search Console for SEO query, page, clicks, impressions, CTR, and average position.
2. GA4 for traffic, conversions, landing pages, and content performance.
3. Google Ads for spend, campaigns, clicks, conversions, and ROAS.
4. Meta Ads for social spend, campaign performance, and conversion tracking.
5. Optional SerpBear for exact rank tracking when a client needs it.

Exit criteria:

- SEO reports can be produced without paid keyword APIs.
- Client ROI uses real or clearly labeled manual inputs.
- Scheduled sync jobs record source freshness and failures.

## Phase 5: Beta Launch

Goal: use the product internally with real agency data.

Primary deliverables:

- Import real clients, services, assignments, leads, proposals, and activities.
- Connect agency website forms to lead intake.
- Train team on lead follow-up and activity logging.
- Deploy staging and production environments.
- Run the release checklist before calling the app Beta.

Exit criteria:

- The team uses SLASH-CRM for at least one week without reverting to spreadsheets.
- Active clients, services, MRR, and open leads match the source of truth.
- Release checklist passes.

## Phase 6: Market Version

Goal: turn the internal operating system into a sellable SaaS product.

Primary deliverables:

- Client portal with read-only client reporting.
- Scheduled email reports.
- Notifications for overdue follow-ups, stale leads, low ROI, and onboarding delays.
- Product analytics and error tracking.
- Billing and subscription management.
- Public marketing site or landing page if selling beyond internal use.
- AI workflows only after core data and permissions are stable.

Exit criteria:

- A new agency can onboard without developer help.
- Billing, auth, data isolation, and onboarding are production ready.
- Product positioning and docs match the live feature set.

## Immediate Build Order

1. Add Supabase client integration and typed environment handling.
2. Implement auth and route protection.
3. Add organization bootstrap and role-aware app context.
4. Move Clients into `src/features/clients` with queries, mutations, schemas, hooks, and components.
5. Wire Clients to Supabase.
6. Move Services into `src/features/services` and wire to Supabase.
7. Wire Prospects/Leads to Supabase.
8. Add lead intake Edge Function and conversion workflow.
9. Replace dashboard metrics with persisted computed data.
10. Prepare staging deployment and run the release checklist.
