# Deployment Runbook

This document defines the controlled deployment path for SLASH-CRM across local, staging, and production.

It assumes the current frontend foundation remains intact and KIMI-generated modules are assembled only after they pass quarantine gates.

## Source References

- Vercel environment variables: https://vercel.com/docs/projects/environment-variables
- Vercel Vite deployments: https://vercel.com/docs/frameworks/frontend/vite
- Supabase environment deployment: https://supabase.com/docs/guides/cli/managing-environments
- Supabase Auth redirect URLs: https://supabase.com/docs/guides/auth/redirect-urls

## Deployment Stack

| Layer | Service | Release Requirement |
| --- | --- | --- |
| Frontend hosting | Vercel | Required for staging and production |
| Auth | Supabase Auth | Required for private CRM routes |
| Database | Supabase Postgres | Required before real CRM persistence |
| Backend jobs/functions | Supabase Edge Functions | Required for public lead intake and lead conversion |
| Source control | GitHub | Required |
| CI | GitHub Actions | Required before external contributors |
| Error tracking | Sentry | Recommended before external beta |
| Product analytics | PostHog or Mixpanel | Recommended after event taxonomy is approved |

## Release Environments

| Environment | Purpose | Data | Deployment Source |
| --- | --- | --- | --- |
| `local` | Development and smoke testing | Local/staging test data | Local machine |
| `staging` | QA and internal beta | Test/anonymized data | Vercel preview or staging project |
| `production` | Market-facing app | Real customer data | Vercel production |

Production must not be used as the first place to test migrations, Edge Functions, env vars, auth redirects, or data import routines.

## Required Runbooks

Before staging:

- `docs/SUPABASE_SETUP_RUNBOOK.md`
- `docs/ENVIRONMENT_VARIABLES.md`
- `docs/THIRD_PARTY_SETUP_RUNBOOK.md`

Before production:

- `docs/RELEASE_CHECKLIST.md`
- `docs/QA_BETA.md`
- `docs/GAP_REGISTER.md`

## Local Validation

Run before every deployment:

```bash
npm run lint
npm run typecheck
npm run build
```

If any command fails, do not deploy.

## Vercel Project Setup

1. Import `lanrcaz/SLASH-CRM` into Vercel.
2. Framework preset: Vite.
3. Install command: `npm install`.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Add environment variables from `docs/ENVIRONMENT_VARIABLES.md`.
7. Deploy preview.
8. Add the Vercel preview/staging domain to Supabase Auth redirect allowlist.
9. Open `/`, `/app`, and nested `/app/*` routes.

Required Vercel variables:

```bash
VITE_APP_ENV=staging
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

Do not add server secrets to Vercel frontend env:

```text
SUPABASE_SERVICE_ROLE_KEY
GOOGLE_CLIENT_SECRET
GOOGLE_REFRESH_TOKEN
RESEND_API_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
```

## Supabase Deployment Setup

Follow `docs/SUPABASE_SETUP_RUNBOOK.md`.

Minimum staging sequence:

```bash
npx supabase login
npx supabase link --project-ref <staging-project-ref>
npx supabase db push
npx supabase functions deploy lead-intake
npx supabase functions deploy convert-lead
npx supabase functions deploy scheduled-sync
```

Set server-side function secrets:

```bash
npx supabase secrets set APP_ORIGIN_ALLOWLIST=https://<staging-domain>
npx supabase secrets set SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

Edge Functions may be deferred only if the relevant feature route is disabled or clearly marked unavailable.

## GitHub CI Setup

Required check commands:

```bash
npm install
npm run lint
npm run typecheck
npm run build
```

Recommended branch policy before external collaboration:

- Protect `main`.
- Require pull request review.
- Require CI pass.
- Disallow force-push to `main`.

Optional future Supabase CI secrets:

```text
SUPABASE_ACCESS_TOKEN
SUPABASE_PROJECT_REF_STAGING
SUPABASE_PROJECT_REF_PRODUCTION
SUPABASE_DB_PASSWORD_STAGING
SUPABASE_DB_PASSWORD_PRODUCTION
```

## Pre-Deploy Checklist

Before deploying staging:

- Local lint/typecheck/build pass.
- Supabase staging project exists.
- Supabase migrations applied.
- RLS manually reviewed.
- Vercel env vars set.
- Supabase Auth redirect URLs include local and staging URLs.
- Edge Function CORS allowlist is explicit.
- No secrets are committed.
- KIMI package remains quarantined unless its gates pass.

Before deploying production:

- All staging smoke tests pass.
- Production Supabase project exists.
- Production env vars use production Supabase values.
- Production Auth redirects use exact production domains.
- Backups and rollback expectations are understood.
- `docs/GAP_REGISTER.md` has no open P0 release blockers.

## Post-Deploy Smoke Test

Staging:

1. Open `/`.
2. Open `/app`.
3. Sign in or sign up.
4. Bootstrap organization if needed.
5. Create or view a service.
6. Create or view a client.
7. Create or view a lead.
8. Refresh each private route.
9. Confirm unauthenticated users cannot access private routes.
10. Confirm browser console has no runtime errors.
11. Confirm network responses do not expose service-role secrets.

Production:

1. Repeat staging smoke test with production test account.
2. Verify Sentry if enabled.
3. Verify analytics if enabled.
4. Verify Supabase logs show expected auth/database activity.
5. Record deployment evidence in release notes.

## Rollback Plan

Frontend rollback:

- Use Vercel's previous deployment rollback.

Database rollback:

- Prefer forward-fix migrations.
- Avoid destructive rollback SQL.
- If a migration corrupts staging, create a corrective migration and document it.
- If production data is affected, stop release activity and create an incident record.

Edge Function rollback:

- Redeploy prior known-good function.
- Temporarily disable public form integration if lead intake is affected.
- Tighten CORS allowlist if origin behavior is wrong.

## Deployment Decision Gate

Deployment may proceed only when:

- Local commands pass.
- Staging infrastructure exists.
- Required env vars are set in the correct systems.
- Auth redirects are configured.
- Open P0 gaps are either closed or explicitly scoped out of the deployment.
- The deployment owner signs off.
