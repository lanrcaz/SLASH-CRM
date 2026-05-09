# Deployment

This document defines how SLASH-CRM should be deployed for staging and production.

## Deployment Stack

| Layer | Service |
| --- | --- |
| Frontend | Vercel |
| Auth | Supabase Auth |
| Database | Supabase Postgres |
| Backend functions | Supabase Edge Functions |
| Storage | Supabase Storage |
| CI | GitHub Actions |
| Error tracking | Sentry, before production users |
| Product analytics | PostHog or Mixpanel, after Beta users |

## Environments

| Environment | Purpose | Data |
| --- | --- | --- |
| `local` | Developer machine | Local or staging Supabase |
| `staging` | Internal testing and QA | Test or copied anonymized data |
| `production` | Market-facing app | Real customer data |

Do not test destructive migrations on production first.

## Vercel Setup

1. Import `lanrcaz/SLASH-CRM` into Vercel.
2. Framework preset: Vite.
3. Install command: `npm install`.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Add environment variables.
7. Deploy preview.
8. Add preview/staging URL to Supabase Auth redirect allowlist.
9. Verify `/`, `/app`, and nested `/app/*` routes.

## Required Vercel Environment Variables

Client-safe:

```bash
VITE_APP_ENV=staging
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Optional client-safe:

```bash
SENTRY_DSN=
POSTHOG_KEY=
```

Do not add these to Vercel frontend env unless they are explicitly used client-side:

- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- OAuth client secrets
- Google Ads developer token
- Meta app secret
- Stripe secret key

## Supabase Deployment Setup

1. Create separate staging and production Supabase projects if possible.
2. Run migrations in staging.
3. Validate RLS policies.
4. Configure Auth redirect URLs:
   - local URL
   - Vercel preview URL
   - staging URL
   - production URL
5. Deploy Edge Functions only after implementation and local verification.
6. Configure storage buckets only when onboarding files or report exports are implemented.

## Pre-Deploy Checks

Run locally:

```bash
npm run lint
npm run typecheck
npm run build
```

Confirm:

- No secrets committed.
- `.env.local` is ignored.
- New env vars are documented in `.env.example`.
- Database migrations are reviewed.
- RLS policies exist for new business tables.
- Feature docs are updated if behavior changed.

## Post-Deploy Smoke Test

For staging:

1. Open `/`.
2. Open `/app`.
3. Sign in.
4. Create or view service.
5. Create or view client.
6. Create or view lead.
7. Refresh each route.
8. Confirm no browser console errors.
9. Confirm network calls do not expose secrets.
10. Confirm unauthenticated user cannot access private routes.

For production:

1. Repeat staging smoke test.
2. Verify Sentry is receiving errors if enabled.
3. Verify analytics only tracks approved events if enabled.
4. Verify Supabase logs show expected auth and database activity.

## Rollback Plan

Frontend rollback:

- Revert to previous Vercel deployment.

Database rollback:

- Prefer forward-fix migrations.
- Do not run destructive SQL unless approved.
- If a bad migration reaches staging, create a corrective migration and document it.

Edge Function rollback:

- Redeploy previous function version if available.
- Disable function route or remove public form integration if intake is affected.

## Production Readiness

Production is not ready until:

- Release checklist passes.
- Staging is tested with real-like data.
- RLS has been manually reviewed.
- Backups are understood.
- Error tracking is enabled.
- Auth redirects are correct.
- No fake/mock production flows remain in core routes.
