# Supabase Setup Runbook

This runbook is the controlled procedure for creating, configuring, validating, and operating the Supabase backbone for SLASH-CRM.

It must be completed before any KIMI-generated backend or persistence layer is assembled into the production app tree.

## Operating Principle

Supabase is the system of record for:

- Authentication and sessions.
- Multi-tenant organization data.
- CRM business records.
- Lead intake and conversion Edge Functions.
- Future SEO performance data from Google Search Console.

No production Supabase project should be modified manually after launch unless the change is captured in a migration, runbook update, or incident record.

## Source References

- Supabase CLI reference: https://supabase.com/docs/reference/cli
- Supabase local development: https://supabase.com/docs/guides/local-development/cli/getting-started
- Supabase environment management: https://supabase.com/docs/guides/cli/managing-environments
- Supabase Auth redirect URLs: https://supabase.com/docs/guides/auth/redirect-urls

## Environment Model

| Environment | Supabase Project | Purpose | Data Policy |
| --- | --- | --- | --- |
| `local` | Local Supabase or staging cloud project | Developer verification | Disposable or test-only |
| `staging` | Dedicated cloud project | QA, demos, release validation | Test or anonymized |
| `production` | Dedicated cloud project | Live customers | Real customer data |

Minimum acceptable Beta path:

- One staging Supabase project.
- One production Supabase project before public launch.

Do not reuse the production project for local experimentation.

## Required Access

The operator needs:

- Supabase account with project owner access.
- GitHub repository admin or maintainer access.
- Vercel project admin access.
- Local terminal with Node.js 20+ if using `npx supabase`.
- Ability to store secrets in Vercel and GitHub Actions.

## Project Creation

Create the staging project first.

1. Open Supabase dashboard.
2. Create a new organization or use the SLASH-CRM organization.
3. Create project: `slash-crm-staging`.
4. Choose the closest production-region candidate to the expected customer base.
5. Save the database password in the team password manager.
6. Record the project reference as `SUPABASE_PROJECT_REF`.
7. Copy the project URL as `VITE_SUPABASE_URL`.
8. Copy the anon public key as `VITE_SUPABASE_ANON_KEY`.
9. Copy the service role key only into server-side secret storage.

Repeat later for `slash-crm-production`.

## Local CLI Setup

Install or invoke the Supabase CLI:

```bash
npx supabase --version
```

Log in:

```bash
npx supabase login
```

Link staging:

```bash
npx supabase link --project-ref <staging-project-ref>
```

Verify local project linkage:

```bash
npx supabase status
```

If `supabase status` cannot resolve the linked project, stop and relink before applying migrations or deploying functions.

## Migration Deployment

Current migration source:

```text
supabase/migrations/0001_initial_schema.sql
```

This migration defines:

- Auth-adjacent profile table.
- Organizations and memberships.
- Services, clients, client services.
- Leads, lead activities, proposals.
- Activities and onboarding records.
- SEO projects, target keywords, and GSC query snapshots.
- RLS helper functions and policies.

Apply migrations to staging:

```bash
npx supabase db push
```

Validation SQL after migration:

```sql
select table_name
from information_schema.tables
where table_schema = 'public'
order by table_name;
```

Expected business tables:

```text
activities
client_services
clients
gsc_query_snapshots
lead_activities
leads
onboarding_records
organization_memberships
organizations
profiles
proposals
seo_projects
seo_target_keywords
services
```

Validate RLS is enabled:

```sql
select schemaname, tablename, rowsecurity
from pg_tables
where schemaname = 'public'
order by tablename;
```

Every business table listed above must show `rowsecurity = true`.

## Auth Configuration

Configure Authentication > URL Configuration.

Staging `Site URL`:

```text
https://<staging-vercel-domain>
```

Allowed redirect URLs:

```text
http://localhost:5173/**
http://127.0.0.1:5173/**
http://localhost:5180/**
http://127.0.0.1:5180/**
https://<vercel-preview-domain>/**
https://<staging-vercel-domain>/**
```

Production `Site URL`:

```text
https://<production-domain>
```

Production allowed redirect URLs:

```text
https://<production-domain>/**
https://www.<production-domain>/**
```

Do not allow broad wildcard domains in production unless explicitly approved.

## Auth Provider Policy

Beta default:

- Email/password enabled.
- Email confirmations enabled for production.
- Social OAuth disabled until provider ownership, redirect URLs, and data handling are documented.

If Google OAuth is added later:

- Create a separate Google OAuth client per environment.
- Store client secret only in Supabase provider settings.
- Add exact redirect URLs from Supabase to Google Cloud Console.

## Edge Functions

Current functions:

```text
supabase/functions/lead-intake
supabase/functions/convert-lead
supabase/functions/scheduled-sync
```

Deploy staging functions:

```bash
npx supabase functions deploy lead-intake
npx supabase functions deploy convert-lead
npx supabase functions deploy scheduled-sync
```

Set function secrets:

```bash
npx supabase secrets set SUPABASE_URL=<project-url>
npx supabase secrets set SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
npx supabase secrets set APP_ORIGIN_ALLOWLIST=<comma-separated-approved-origins>
```

Future SEO sync secrets:

```bash
npx supabase secrets set GOOGLE_CLIENT_ID=<value>
npx supabase secrets set GOOGLE_CLIENT_SECRET=<value>
npx supabase secrets set GOOGLE_REFRESH_TOKEN=<value>
```

Never expose `SUPABASE_SERVICE_ROLE_KEY` through Vite, Vercel frontend env vars, committed files, browser logs, or client bundles.

## Seed Data

Seed source:

```text
supabase/seed.sql
```

Allowed usage:

- Local development.
- Staging demos.

Forbidden usage:

- Production unless reviewed and rewritten as a deliberate production bootstrap script.

## Smoke Test Checklist

After staging setup:

1. Open the deployed app.
2. Sign up with a test email.
3. Confirm a profile record exists.
4. Create or bootstrap an organization.
5. Confirm an `organization_memberships` owner row exists.
6. Create one service.
7. Create one client.
8. Create one lead.
9. Confirm each record has the same `organization_id`.
10. Sign out and verify private routes are inaccessible.
11. Sign in as a second test user if available and confirm cross-org data is not visible.

## RLS Validation

Use two test users:

- `owner-a@example.com` in Organization A.
- `owner-b@example.com` in Organization B.

Validation:

1. User A creates a client.
2. User B creates a client.
3. User A cannot read User B's client via UI.
4. User B cannot read User A's client via UI.
5. Direct API attempts with anon key respect RLS and return only the authenticated user's organization data.

Failure response:

- Stop deployment.
- Record the finding in `docs/GAP_REGISTER.md`.
- Fix policy or query scoping before continuing.

## Backup And Recovery

Before production launch:

- Confirm daily backups are enabled or available on the selected Supabase plan.
- Confirm who can restore backups.
- Record RPO/RTO expectations in release notes.
- Export schema before major migration work.

Production migration rule:

- Prefer additive migrations.
- Avoid destructive migrations.
- If destructive migration is unavoidable, create a backup, rehearse in staging, and require operator approval.

## Completion Evidence

The Supabase setup is complete only when all evidence is captured:

- Supabase project refs recorded privately.
- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` stored in Vercel.
- Server-only secrets stored in Supabase and/or GitHub Actions only.
- `npx supabase db push` succeeded for staging.
- All Edge Functions deployed or explicitly deferred.
- Auth redirect URLs configured.
- Smoke tests completed.
- `docs/GAP_REGISTER.md` updated with closed or remaining gaps.
