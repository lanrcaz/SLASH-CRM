# Data Import

This document defines how to import real agency data for Beta.

## Import Goal

The first Beta import should make SLASH-CRM useful for daily operations.

Import priority:

1. Services.
2. Clients.
3. Client-service assignments.
4. Leads.
5. Proposals.
6. Activities.
7. Onboarding records.

## Import Rules

- Do not hard-delete historical clients.
- Preserve lost and disqualified leads for reporting.
- Every active client must have at least one service assignment.
- Every open lead must have an owner and next follow-up date.
- MRR must come from active client-service assignments.
- Imported data must belong to one organization.
- Invalid rows should be rejected into an error report, not silently skipped.
- Imports should be repeatable in staging before production.

## Data Sources

Possible starting sources:

- Spreadsheet.
- HubSpot export.
- Pipedrive export.
- GoHighLevel export.
- QuickBooks or Stripe customer list.
- Manual CSV.

The import process should normalize source data into the table fields in `docs/SUPABASE_DB_MAPPING.md`.

## Suggested CSV Files

### `services.csv`

Required columns:

- `name`
- `category`
- `base_price`
- `billing_type`

Optional columns:

- `description`
- `deliverables`
- `expected_hours_per_month`
- `is_active`

### `clients.csv`

Required columns:

- `name`
- `company_name`
- `email`
- `status`

Optional columns:

- `phone`
- `website`
- `industry`
- `assigned_to_email`
- `notes`
- `tags`

### `client_services.csv`

Required columns:

- `client_email` or `client_company_name`
- `service_name`
- `status`
- `monthly_price`
- `start_date`

Optional columns:

- `end_date`
- `contract_type`
- `auto_renew`

### `leads.csv`

Required columns:

- `contact_name`
- `company_name`
- `source`
- `status`

Optional columns:

- `contact_email`
- `contact_phone`
- `website`
- `source_detail`
- `source_campaign`
- `source_channel`
- `first_contact_date`
- `first_contact_method`
- `estimated_value`
- `probability`
- `assigned_to_email`
- `next_follow_up_date`
- `qualification_score`
- `qualification_status`
- `notes`

### `proposals.csv`

Required columns:

- `lead_company_name` or `lead_contact_email`
- `status`
- `total_monthly_value`

Optional columns:

- `services`
- `one_time_fees`
- `sent_date`
- `accepted_date`
- `rejected_date`
- `expiry_date`
- `document_url`
- `notes`

### `activities.csv`

Required columns:

- `activity_type`
- `description`
- `occurred_at`

Optional columns:

- `client_email`
- `lead_contact_email`
- `user_email`

## Import Validation

Before import:

- Confirm organization ID.
- Confirm owner/admin user.
- Confirm services are deduplicated.
- Confirm clients have stable identifiers.
- Confirm date formats.
- Confirm currency is USD unless otherwise approved.

After import:

- Count imported rows per table.
- Verify active client count.
- Verify service count.
- Verify active client-service assignments.
- Verify MRR total.
- Verify open leads have owners and next follow-up dates.
- Verify no cross-organization records.

## MRR Validation

Use this rule:

```text
MRR = sum(client_services.monthly_price where status = 'active')
```

Compare CRM MRR with source-of-truth billing system.

If totals differ:

- Check paused clients.
- Check cancelled services.
- Check project-only services.
- Check duplicate assignments.
- Check missing discounts or custom pricing.

## Import Rollback

For staging:

- Re-run from clean staging database when needed.

For production:

- Prefer importing in batches.
- Record import batch ID in a future import log table if bulk imports become common.
- Avoid destructive rollback.
- Correct bad rows with update scripts or admin UI.

## First Beta Import Checklist

- [ ] Six services imported.
- [ ] All active clients imported.
- [ ] All active service assignments imported.
- [ ] Open leads imported.
- [ ] Won/lost historical leads imported if available.
- [ ] MRR verified.
- [ ] Open leads have owner and follow-up.
- [ ] Team reviews sample client detail pages.
- [ ] Team reviews sample pipeline leads.
- [ ] Export CSV matches imported data.
