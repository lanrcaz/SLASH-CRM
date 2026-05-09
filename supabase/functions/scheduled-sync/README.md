# Scheduled Sync Function

Planned Supabase Edge Function for recurring data syncs.

## Purpose

Run recurring integration sync jobs that pull proof-of-value data into SLASH-CRM.

This function is not required for the first Beta launch. It becomes important in v1 when real external metrics replace manual inputs.

## Initial Jobs

v1 jobs:

- Google Search Console query/page snapshots.
- GA4 organic traffic summaries.

Later jobs:

- Google Ads metrics.
- Meta Ads metrics.
- Report generation.
- Notification checks.

## Inputs

Suggested payload:

```json
{
  "job": "gsc_daily_sync",
  "organization_id": "uuid",
  "client_id": "uuid",
  "force": false
}
```

Scheduled invocation may omit `client_id` and process all active connections.

## Required Future Tables

Likely needed before full implementation:

- `integration_connections`
- provider-specific metric tables or normalized metric snapshots
- `report_exports`
- `notifications`

See `docs/SUPABASE_DB_MAPPING.md`.

## Security

- Scheduled jobs must run server-side only.
- Provider refresh tokens must be encrypted.
- Access tokens must never be returned to browser clients.
- Job logs should not include private tokens or client secrets.

## Retry Rules

Recommended:

- Retry transient provider errors.
- Store `last_error`.
- Store `last_sync_at`.
- Do not fail the whole job because one client integration fails.

## Acceptance Criteria For v1

- GSC query/page snapshots sync daily.
- Sync status is visible internally.
- Failed syncs are logged.
- No provider secrets are exposed.
- Reports can identify stale data.
