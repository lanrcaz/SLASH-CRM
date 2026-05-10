# Environment Variables

This document defines every known SLASH-CRM environment variable, where it belongs, and whether it is safe for browser exposure.

## Core Rule

Only variables prefixed with `VITE_` are intended for the Vite browser bundle.

Anything that grants server privilege, API write access, customer data access, billing access, OAuth secret access, or email-sending access must stay server-side only.

## Source References

- Vercel environment variables: https://vercel.com/docs/projects/environment-variables
- Vercel Vite framework notes: https://vercel.com/docs/frameworks/frontend/vite
- Supabase CLI secrets: https://supabase.com/docs/reference/cli

## Variable Matrix

| Variable | Required | Environments | Browser-safe | Store In | Purpose |
| --- | --- | --- | --- | --- | --- |
| `VITE_APP_ENV` | Yes | local, staging, production | Yes | `.env.local`, Vercel | Identifies runtime environment. |
| `VITE_SUPABASE_URL` | Yes when Supabase enabled | local, staging, production | Yes | `.env.local`, Vercel | Public Supabase project URL. |
| `VITE_SUPABASE_ANON_KEY` | Yes when Supabase enabled | local, staging, production | Yes | `.env.local`, Vercel | Public anon key protected by RLS. |
| `SUPABASE_PROJECT_REF` | Yes for CLI/deploy | local operator, CI | No | local shell, GitHub Actions | Supabase project reference for CLI deploys. |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes for Edge Functions/admin jobs | Supabase Functions, CI | No | Supabase secrets, GitHub Actions | Server-only privileged database access. |
| `APP_ORIGIN_ALLOWLIST` | Yes before public intake | staging, production | No | Supabase secrets | Allowed origins for public Edge Function CORS. |
| `RESEND_API_KEY` | Future | staging, production | No | Supabase secrets | Transactional email. |
| `SENTRY_DSN` | Future optional | staging, production | Usually yes if browser SDK used | Vercel | Error tracking DSN. |
| `POSTHOG_KEY` | Future optional | staging, production | Usually yes if browser SDK used | Vercel | Product analytics project key. |
| `GOOGLE_CLIENT_ID` | Future SEO sync | staging, production | No for this app | Supabase secrets | Google OAuth client ID. |
| `GOOGLE_CLIENT_SECRET` | Future SEO sync | staging, production | No | Supabase secrets | Google OAuth client secret. |
| `GOOGLE_REFRESH_TOKEN` | Future SEO sync | staging, production | No | Supabase secrets | Server-side token for scheduled GSC sync. |
| `GA4_PROPERTY_ID` | Future analytics | staging, production | No | Supabase secrets | GA4 property identifier for reporting jobs. |
| `STRIPE_SECRET_KEY` | Future billing | staging, production | No | Server-side secret store only | Stripe API access. |
| `STRIPE_WEBHOOK_SECRET` | Future billing | staging, production | No | Server-side secret store only | Stripe webhook verification. |

## Local `.env.local`

Create a local file:

```bash
cp .env.example .env.local
```

Minimum local values when using Supabase:

```bash
VITE_APP_ENV=local
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

Server-only local values for CLI work:

```bash
SUPABASE_PROJECT_REF=<project-ref>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

Do not commit `.env.local`.

## Vercel Variables

Set for Preview/Staging:

```bash
VITE_APP_ENV=staging
VITE_SUPABASE_URL=https://<staging-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<staging-anon-key>
```

Set for Production:

```bash
VITE_APP_ENV=production
VITE_SUPABASE_URL=https://<production-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<production-anon-key>
```

Do not put these in Vercel frontend variables:

```text
SUPABASE_SERVICE_ROLE_KEY
GOOGLE_CLIENT_SECRET
GOOGLE_REFRESH_TOKEN
RESEND_API_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
```

## Supabase Function Secrets

Set with the Supabase CLI:

```bash
npx supabase secrets set APP_ORIGIN_ALLOWLIST=https://<staging-domain>,https://<production-domain>
npx supabase secrets set SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

Future SEO sync secrets:

```bash
npx supabase secrets set GOOGLE_CLIENT_ID=<value>
npx supabase secrets set GOOGLE_CLIENT_SECRET=<value>
npx supabase secrets set GOOGLE_REFRESH_TOKEN=<value>
npx supabase secrets set GA4_PROPERTY_ID=<value>
```

Future email secret:

```bash
npx supabase secrets set RESEND_API_KEY=<value>
```

## GitHub Actions Secrets

Required only when CI/CD deploys Supabase migrations or functions:

```text
SUPABASE_ACCESS_TOKEN
SUPABASE_PROJECT_REF_STAGING
SUPABASE_PROJECT_REF_PRODUCTION
SUPABASE_DB_PASSWORD_STAGING
SUPABASE_DB_PASSWORD_PRODUCTION
```

Optional future CI secrets:

```text
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

## Rotation Rules

Rotate immediately if:

- A secret is pasted into chat, issue text, README, browser logs, or source code.
- A service role key is added to Vercel client env by mistake.
- A team member with secret access leaves the project.
- A third-party account is compromised.

Rotation evidence:

- Record the variable name, environment, date, operator, and validation result in the release or incident note.
- Do not record the secret value.

## Validation Commands

Local app:

```bash
npm run lint
npm run typecheck
npm run build
```

Supabase link:

```bash
npx supabase status
```

Vercel env pull check:

```bash
vercel env pull .env.vercel.local
```

Do not commit `.env.vercel.local`.
