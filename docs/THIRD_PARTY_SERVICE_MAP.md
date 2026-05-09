# Third-Party Service Map

This document maps required and deferred services for SLASH-CRM Beta and v1.

## Service Strategy

Beta should use the smallest reliable stack:

- Supabase for auth, database, storage, RLS, and Edge Functions.
- Vercel for frontend hosting.
- GitHub Actions for CI.
- Resend or SendGrid only when emails are actually sent.
- Sentry only when staging or production is live.
- PostHog or Mixpanel only after real users begin testing.

Do not add paid SEO, ads, or automation vendors during Beta unless explicitly approved.

## Beta Required

### Supabase

Purpose:

- Auth
- Postgres
- RLS
- Storage
- Edge Functions
- Scheduled jobs later

Required values:

| Value | Where used | Client-safe |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | Vite app | Yes |
| `VITE_SUPABASE_ANON_KEY` | Vite app | Yes |
| `SUPABASE_PROJECT_REF` | CLI/deploy scripts | No |
| `SUPABASE_SERVICE_ROLE_KEY` | Edge Functions/server only | No |

Setup checklist:

- Create Supabase project.
- Run migrations.
- Configure auth email settings.
- Configure redirect URLs for local, staging, and production.
- Set RLS policies.
- Deploy Edge Functions after implementation.
- Add storage buckets when onboarding documents or reports need them.

Local redirect URLs:

- `http://127.0.0.1:5180`
- `http://localhost:5180`

Staging and production URLs must be added after Vercel setup.

### Vercel

Purpose:

- Host Vite frontend.
- Provide staging and production deployments.

Required environment variables:

- `VITE_APP_ENV`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Setup checklist:

- Import GitHub repo.
- Set build command: `npm run build`.
- Set output directory: `dist`.
- Add environment variables.
- Verify SPA routing works for `/app/*`.
- Add staging URL to Supabase auth redirect allowlist.

### GitHub Actions

Purpose:

- Prevent broken code from entering `main`.

Required checks:

- `npm run lint`
- `npm run typecheck`
- `npm run build`

Setup checklist:

- Keep CI workflow active.
- Require checks before release branches if branch protection is enabled.

## Beta Optional

### Resend Or SendGrid

Purpose:

- Password emails are handled by Supabase Auth.
- Product emails are needed later for invites, reports, and alerts.

Beta use:

- Optional for team invite emails or report sending.
- Not required for initial CRM persistence.

Required values:

- `RESEND_API_KEY` or provider equivalent.

Do not expose email API keys in Vite code.

### Sentry

Purpose:

- Production error monitoring.

Beta use:

- Add before staging or production user testing.

Required values:

- `SENTRY_DSN`

Client DSN may be public. Auth tokens and upload keys are not public.

### PostHog Or Mixpanel

Purpose:

- Product analytics.

Beta use:

- Optional after real users start testing.
- Track adoption metrics such as logins, client creation, lead creation, conversion, and export usage.

Required values:

- `POSTHOG_KEY` or provider equivalent.

## v1 Proof-Of-Value Integrations

### Google Search Console

Purpose:

- Free SEO performance reporting.
- Query/page clicks, impressions, CTR, and average position.

Why first:

- Official source.
- Free.
- Strong enough for retention reporting.
- Avoids paid keyword API dependency.

OAuth scopes:

- `https://www.googleapis.com/auth/webmasters.readonly`

Writes:

- `seo_projects`
- `gsc_query_snapshots`
- `seo_target_keywords`
- future `integration_connections`

Beta status:

- Not required for Beta launch.

v1 setup:

- Create Google Cloud project.
- Configure OAuth consent.
- Add redirect URLs.
- Store encrypted refresh tokens server-side.
- Run daily sync with scheduled Edge Function or later job runner.

### GA4

Purpose:

- Traffic, landing pages, conversions, content performance.

OAuth scopes:

- Google Analytics readonly scopes, finalized during implementation.

Beta status:

- Deferred.

v1 setup:

- Requires Google Cloud OAuth.
- Requires property selection per client.
- Store tokens server-side only.

### Google Ads

Purpose:

- Spend, clicks, conversions, ROAS.

Beta status:

- Manual metrics only.

v1 setup:

- Requires Google Ads developer token.
- Requires OAuth.
- Requires manager/customer account mapping.
- Needs retry and rate limit handling.

### Meta Ads

Purpose:

- Social ad spend, performance, conversions.

Beta status:

- Manual metrics only.

v1 setup:

- Requires Meta developer app.
- Requires business verification depending on access level.
- Requires long-lived token handling and permissions review.

## Deferred Or Optional

### SerpBear

Purpose:

- Optional exact rank tracking.

Use only when:

- A client specifically needs independent keyword position checks.
- The team accepts scraping/proxy operational complexity.

Do not use as Beta core.

### SEMrush And Ahrefs

Purpose:

- Paid keyword and competitor intelligence.

Use only when:

- Revenue justifies API cost.
- GSC data is insufficient.
- The product needs competitor research beyond owned properties.

Do not use for Beta.

### Stripe

Purpose:

- SaaS billing or invoice payment collection.

Beta status:

- Deferred unless SLASH-CRM is sold externally during Beta.

Use when:

- Customer subscriptions need to be charged.
- Invoices need payment collection.

## Environment Variable Policy

Client-safe variables may start with `VITE_`.

Server-only variables must never start with `VITE_`.

Client-safe:

- `VITE_APP_ENV`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Server-only:

- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- OAuth client secrets
- Google Ads developer token
- Meta app secret
- Stripe secret key

## Integration Rollout Order

1. Supabase.
2. Vercel.
3. Resend or SendGrid if email workflows are active.
4. Sentry before staging users.
5. PostHog after internal Beta starts.
6. Google Search Console for v1 SEO reporting.
7. GA4 for traffic and conversions.
8. Google Ads.
9. Meta Ads.
10. Stripe only when monetizing external customers.
