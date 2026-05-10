# Third-Party Setup Runbook

This runbook defines the third-party services SLASH-CRM needs for Beta, what can wait, and how each integration should be introduced without destabilizing the product.

## Setup Phases

| Phase | Category | Service | Status |
| --- | --- | --- | --- |
| Foundation | Database/auth/backend | Supabase | Required now |
| Foundation | Frontend deploy | Vercel | Required before staging |
| Foundation | Source control/CI | GitHub | Already connected, CI procedure still needed |
| Beta | Error tracking | Sentry | Recommended before external testers |
| Beta | Product analytics | PostHog or Mixpanel | Recommended after core events are defined |
| Beta | Email | Resend | Required when transactional email is implemented |
| Beta | SEO data | Google Search Console | Required for free SEO reporting workflow |
| Beta | Web analytics | GA4 | Optional but recommended for client reporting |
| v1 | Billing | Stripe | Required before paid self-serve plans |
| v1 | CRM imports | CSV/Google Sheets | Required for onboarding real agency data |
| v2 | Paid SEO APIs | DataForSEO, SerpAPI, Ahrefs, SEMrush | Optional only after free GSC workflow proves demand |

## Decision Rule

Do not add a paid provider until:

- The free or native workflow is insufficient.
- The product requirement is measurable.
- Data ownership and cost exposure are documented.
- There is a rollback or fallback path.

## Foundation Services

### Supabase

Purpose:

- Auth.
- Postgres.
- RLS.
- Edge Functions.
- Future scheduled sync jobs.

Runbook:

- `docs/SUPABASE_SETUP_RUNBOOK.md`

Blocking evidence:

- Project created.
- Migrations applied.
- Auth redirects configured.
- Env vars set.
- Edge Functions deployed or explicitly deferred.
- Smoke test completed.

### Vercel

Purpose:

- Host the Vite frontend.
- Provide preview deployments.
- Store client-safe build variables.

Runbook:

- `docs/DEPLOYMENT.md`

Blocking evidence:

- Repository imported.
- Build command configured as `npm run build`.
- Output directory configured as `dist`.
- Staging deployment works.
- Supabase redirect URLs include the deployed domain.

### GitHub

Purpose:

- Source control.
- Pull request review.
- CI status.
- Future Supabase deployment workflows.

Required setup:

- Protect `main` before external contributors are added.
- Require lint/typecheck/build checks before merge.
- Store Supabase deployment secrets only when CI/CD is enabled.

## Beta Services

### Sentry

Purpose:

- Frontend error monitoring.
- Release regression visibility.

Setup timing:

- Add before external beta users.

Initial configuration:

```text
SENTRY_DSN=<browser-dsn>
```

Guardrails:

- Do not send PII unless data handling is reviewed.
- Source maps must not expose secrets.
- Disable noisy non-actionable alerts.

### PostHog Or Mixpanel

Purpose:

- Product usage analytics.
- Activation and retention funnel measurement.

Setup timing:

- After core events are named.

Initial events:

```text
signed_in
organization_created
service_created
client_created
lead_created
lead_stage_changed
lead_converted
csv_exported
```

Guardrails:

- Track organization and record IDs only if needed.
- Do not track notes, email bodies, private client content, or secrets.

### Resend

Purpose:

- Transactional email.
- Future invite, password reset customization, lead alerts, onboarding notifications.

Setup timing:

- When the app sends first-party transactional emails outside Supabase Auth defaults.

Required evidence:

- Sending domain verified.
- SPF/DKIM configured.
- Test email succeeds.
- `RESEND_API_KEY` stored server-side only.

## SEO Data Services

### Google Search Console

Purpose:

- Free SEO performance reporting.
- Query impressions, clicks, CTR, average position.
- Client SEO project tracking.

Why this is first:

- It is free.
- It uses real first-party search performance data.
- The current schema already includes `seo_projects`, `gsc_query_snapshots`, and `seo_target_keywords`.

Setup timing:

- Beta, after Supabase and scheduled sync scaffolding are stable.

Required Google Cloud setup:

1. Create a Google Cloud project.
2. Enable Search Console API.
3. Configure OAuth consent screen.
4. Create OAuth client credentials.
5. Add authorized redirect URI for the integration callback.
6. Store OAuth secrets server-side only.
7. Connect one verified Search Console property.
8. Run manual sync into staging first.

Stored data:

- Query.
- Page URL.
- Country.
- Device.
- Clicks.
- Impressions.
- CTR.
- Average position.

Do not store:

- Google account passwords.
- Unnecessary profile data.
- OAuth secrets in client env.

### GA4

Purpose:

- Optional website analytics reporting.
- Complements GSC by showing engagement after search click.

Setup timing:

- After GSC sync works or if client reporting needs traffic attribution.

### Paid SEO APIs

Possible providers:

- DataForSEO.
- SerpAPI.
- Ahrefs.
- SEMrush.

Decision:

- Defer for Beta.
- Use Google Search Console first.
- Add paid APIs only for keyword discovery, competitor data, or rank data that GSC cannot provide.

## Billing Service

### Stripe

Purpose:

- Paid subscriptions.
- Future agency/client billing.

Setup timing:

- v1, not Beta foundation.

Guardrails:

- Use test mode first.
- Store secret key server-side only.
- Verify webhooks with `STRIPE_WEBHOOK_SECRET`.
- Do not model revenue recognition only from Stripe; CRM MRR still comes from `client_services`.

## Integration Readiness Checklist

Before activating any third-party provider:

1. Owner assigned.
2. Environment variables documented.
3. Secrets stored in the correct location.
4. Local/staging test completed.
5. Failure mode documented.
6. Cost exposure understood.
7. Data retention reviewed.
8. Rollback plan written.
9. Smoke test added to release checklist.
10. Gap register updated.
