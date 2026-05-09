# Architecture

This document defines the intended production architecture for SLASH-CRM.

## Current State

The repository is a Vite, React, TypeScript, Tailwind, and shadcn-style frontend with route-level product screens and mock data.

Current strengths:

- Clear route surface for dashboard, clients, prospects, onboarding, earnings, services, reports, and settings.
- Supabase migration scaffold exists for organizations, members, clients, services, leads, proposals, activities, onboarding, and SEO.
- CI scripts exist for lint, typecheck, and build.
- Feature folders exist as future module homes.

Current gaps:

- No active Supabase client integration in the app.
- No auth or route protection.
- Most screens still read from `src/mocks`.
- Large page files need to be split into feature-owned modules.
- Edge Functions are scaffolded but not implemented.
- No staging deployment is connected yet.

## Stack

| Layer | Choice | Reason |
| --- | --- | --- |
| Frontend | Vite + React + TypeScript | Current app is already productive and fast. |
| UI | Tailwind + Radix + shadcn-style components | Flexible internal-app component model. |
| Auth | Supabase Auth | Integrated with Postgres RLS and user sessions. |
| Database | Supabase Postgres | Relational CRM data, RLS, migrations, and SQL visibility. |
| API | Supabase Edge Functions | Lead intake, conversions, scheduled syncs, and webhooks. |
| Storage | Supabase Storage | Onboarding files, client documents, report exports. |
| Hosting | Vercel | Preview deploys and production frontend hosting. |
| Email | Resend or SendGrid | Transactional emails and scheduled reports. |
| Monitoring | Sentry | Runtime error visibility. |
| Product Analytics | PostHog or Mixpanel | Usage analytics after Beta starts. |

## Application Layers

Recommended frontend structure:

```text
src/
├── app/
│   ├── App.tsx
│   ├── providers.tsx
│   └── routes.tsx
├── components/
│   ├── layout/
│   └── ui/
├── features/
│   ├── activities/
│   ├── auth/
│   ├── clients/
│   ├── dashboard/
│   ├── leads/
│   ├── onboarding/
│   ├── reports/
│   ├── revenue/
│   └── services/
├── integrations/
│   └── supabase/
├── lib/
├── mocks/
├── pages/
└── types/
```

Each feature should follow the same shape:

```text
src/features/clients/
├── api/
│   ├── clients.queries.ts
│   └── clients.mutations.ts
├── components/
├── hooks/
├── pages/
├── schemas/
├── types.ts
└── utils.ts
```

## Data Ownership

| Feature | Owns |
| --- | --- |
| Auth | sessions, profiles, organizations, memberships, roles |
| Clients | client records, status, archive behavior, client timeline |
| Services | service catalog, pricing, billing model, deliverables |
| Revenue | MRR, ARR, invoices, time entries, ROI inputs |
| Leads | lead intake, attribution, qualification, pipeline, proposals |
| Activities | notes, calls, emails, meetings, tasks, history |
| Onboarding | onboarding records, tasks, templates, file checklists |
| Reports | exports, PDF packages, scheduled reports |
| SEO | GSC projects, query snapshots, target keywords |

## Supabase Model

Core tables already defined in the first migration:

- `profiles`
- `organizations`
- `organization_memberships`
- `services`
- `clients`
- `client_services`
- `leads`
- `lead_activities`
- `proposals`
- `activities`
- `onboarding_records`
- `seo_projects`
- `gsc_query_snapshots`
- `seo_target_keywords`

Security model:

- Every business table is scoped by `organization_id`.
- RLS is enabled across core tables.
- Read access requires organization membership.
- Write access requires owner, admin, or editor role.
- Viewers should remain read-only unless explicitly upgraded.

## Runtime Data Flow

```text
User
  -> React route
  -> Feature hook
  -> Feature query or mutation
  -> Supabase client or Edge Function
  -> Postgres table protected by RLS
  -> UI state refresh
```

Lead intake flow:

```text
Website form
  -> lead-intake Edge Function
  -> validate payload
  -> capture UTM and referrer
  -> check duplicates
  -> insert lead and activity
  -> assign owner or queue unassigned lead
  -> notify team
```

Lead conversion flow:

```text
Won lead
  -> convert-lead Edge Function
  -> create client
  -> create client_services
  -> create onboarding_record
  -> mark lead won and converted_at
  -> write activity history
```

Reporting flow:

```text
Client/service data
  -> revenue calculations
  -> external metric snapshots
  -> report builder
  -> PDF or CSV export
  -> optional scheduled email
```

## Integration Strategy

Use free and official sources first.

SEO:

- Beta: manual SEO notes and targets.
- v1: Google Search Console OAuth and daily query/page snapshots.
- v2: optional SerpBear for exact SERP positions when needed.

Ads:

- Beta: manual campaign metrics.
- v1: Google Ads and Meta Ads OAuth.
- v1+: scheduled metric syncs with retry and error logging.

Analytics:

- Beta: manual conversion and revenue inputs.
- v1: GA4 integration for traffic, landing page, and conversion reporting.

## Quality Gates

Every production-bound change should pass:

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- Feature behavior survives refresh.
- No secrets are committed.
- Data access respects `organization_id` and role policies.
- Any new workflow has at least one success path and one failure path considered.

## Architecture Decisions

- Keep Vite and React for Beta.
- Do not migrate to Next.js unless server-rendered public pages or a heavier backend become necessary.
- Keep mock data isolated under `src/mocks`.
- Feature modules own business logic.
- Page files should become thin route wrappers over feature modules.
- Edge Functions own cross-table workflows and public webhooks.
- Supabase RLS is the security boundary, not frontend checks.
