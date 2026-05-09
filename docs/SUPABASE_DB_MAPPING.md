# Supabase Database Mapping

This document maps the product workflows to Supabase tables, RLS policies, Edge Functions, and future migrations.

## Source Of Truth

Current migration:

- `supabase/migrations/0001_initial_schema.sql`

Current generated/project type file:

- `src/types/database.ts`

Agents must keep this document aligned whenever migrations change.

## Multi-Tenant Model

SLASH-CRM is organization-scoped.

Every business table should include:

- `id uuid primary key`
- `organization_id uuid references public.organizations(id)`
- `created_at timestamptz`
- `updated_at timestamptz` when records are editable

Every query for business data must filter by `organization_id` or rely on RLS that enforces membership.

## Roles

Current enum:

```sql
create type public.app_role as enum ('owner', 'admin', 'editor', 'viewer');
```

Role behavior:

| Role | Can read | Can create/edit | Can manage org/users | Can delete/archive |
| --- | --- | --- | --- | --- |
| owner | Yes | Yes | Yes | Yes |
| admin | Yes | Yes | Yes | Yes |
| editor | Yes | Yes | No | Limited archive if allowed by feature |
| viewer | Yes | No | No | No |

Hard delete should be avoided for business records. Prefer `archived_at`, `status`, or cancellation fields.

## Current Tables

### `profiles`

Purpose:

- User profile extension for Supabase Auth users.

Used by:

- Auth
- Settings
- Assignments

Beta requirements:

- Profile loads after sign in.
- User can update their own name.
- Email should mirror auth email or be kept in sync.

### `organizations`

Purpose:

- Tenant container for agency data.

Used by:

- All business modules.

Beta requirements:

- First signed-in user can bootstrap an organization.
- Organization name is visible in settings and exports.

### `organization_memberships`

Purpose:

- Connect users to organizations with roles.

Used by:

- Auth
- Route guards
- RLS
- Team settings

Beta requirements:

- Signed-in user must have selected organization context.
- Owner/admin can invite or manage members in a later Beta task.

### `services`

Purpose:

- Agency service catalog.

Used by:

- Services
- Client service assignments
- Proposals
- Revenue
- Reports

Required fields:

- `name`
- `category`
- `base_price`
- `billing_type`
- `deliverables`
- `expected_hours_per_month`
- `is_active`

Beta operations:

- Create service.
- Edit service.
- Deactivate service.
- List active services.

### `clients`

Purpose:

- Companies or contacts paying the agency or in client lifecycle.

Used by:

- Clients
- Client detail
- Revenue
- Activities
- Onboarding
- Reports

Required fields:

- `name`
- `company_name`
- `email`
- `status`
- `assigned_to`
- `health_score`

Beta operations:

- Create client.
- Edit client.
- Archive client.
- View timeline.
- Filter by status.

Status behavior:

| Status | Meaning | Counts in active MRR |
| --- | --- | --- |
| lead | Legacy/contact state | No |
| prospect | Not yet active | No |
| active | Paying or active delivery | Yes, if service active |
| paused | Temporarily paused | No unless service status active by exception |
| churned | Lost client | No |
| archived | Hidden from daily ops | No |

### `client_services`

Purpose:

- Assign services to clients with pricing and contract state.

Used by:

- Client detail
- Revenue
- Invoices
- Reports

Required fields:

- `client_id`
- `service_id`
- `status`
- `monthly_price`
- `start_date`
- `contract_type`
- `auto_renew`

Beta operations:

- Assign service to client.
- Pause/cancel service.
- Update monthly price.
- Calculate MRR.

MRR rule:

```text
MRR = sum(monthly_price) where client_services.status = 'active'
```

### `leads`

Purpose:

- Track prospects from first touch to won/lost.

Used by:

- Prospects
- Lead intake
- Proposals
- Conversion
- Pipeline reports

Required fields:

- `contact_name`
- `company_name`
- `source`
- `status`
- `estimated_value`
- `probability`
- `assigned_to`
- `next_follow_up_date`

Beta operations:

- Create lead.
- Edit lead.
- Move stage.
- Mark won/lost.
- Track source attribution.
- Flag stale leads.

Open lead rule:

Open leads must have:

- `assigned_to`
- `next_follow_up_date`

Open lead statuses:

- `new`
- `contacted`
- `qualified`
- `proposal_sent`
- `negotiation`
- `nurture`

Closed statuses:

- `won`
- `lost`

### `lead_activities`

Purpose:

- Lead-specific activity history.

Used by:

- Prospects drawer/detail
- Pipeline audit trail
- Lead follow-up

Beta operations:

- Create initial activity from lead intake.
- Create stage-change activity.
- Create proposal-sent activity.
- Create follow-up activity.

### `proposals`

Purpose:

- Track proposals sent to leads.

Used by:

- Leads
- Pipeline value
- Conversion
- Reports

Required fields:

- `lead_id`
- `services`
- `total_monthly_value`
- `one_time_fees`
- `status`
- `sent_date`
- `expiry_date`

Beta operations:

- Create draft proposal.
- Mark sent.
- Mark accepted or rejected.
- Use accepted proposal for conversion.

### `activities`

Purpose:

- General activity log for clients and leads.

Used by:

- Client detail
- Lead detail
- Health score
- Audit history

Beta operations:

- Add note.
- Log call.
- Log email.
- Log meeting.
- Log task.
- Log system-generated stage/service/onboarding events.

### `onboarding_records`

Purpose:

- Track client onboarding after conversion.

Used by:

- Onboarding page
- Client detail
- Convert lead flow

Beta operations:

- Create from converted lead.
- Set target date.
- Mark completed.
- Track status.

### `seo_projects`

Purpose:

- Track SEO reporting setup per client/domain.

Used by:

- SEO v1
- Reports

Beta status:

- Present in schema but not required for initial Beta core.

### `gsc_query_snapshots`

Purpose:

- Store Google Search Console query/page performance snapshots.

Used by:

- SEO reporting v1

Beta status:

- Present in schema but should not block Beta.

### `seo_target_keywords`

Purpose:

- Store agency-selected keywords for client SEO reporting.

Used by:

- SEO reporting v1

Beta status:

- Present in schema but should not block Beta.

## Missing Tables For Full Beta Operations

The current migration covers the CRM spine but not every operational workflow. Add these in future migrations when assigned.

### `time_entries`

Needed for:

- Team time tracking.
- Service profitability.
- Invoice readiness.

Suggested fields:

- `id`
- `organization_id`
- `client_id`
- `service_id`
- `user_id`
- `activity_id`
- `entry_date`
- `minutes`
- `billable`
- `hourly_rate`
- `description`
- `created_at`
- `updated_at`

### `invoices`

Needed for:

- Invoice generation.
- Monthly billing review.

Suggested fields:

- `id`
- `organization_id`
- `client_id`
- `invoice_number`
- `status`
- `period_start`
- `period_end`
- `subtotal`
- `tax`
- `total`
- `currency`
- `due_date`
- `sent_at`
- `paid_at`
- `created_at`
- `updated_at`

### `invoice_line_items`

Needed for:

- Service and time line items.

Suggested fields:

- `id`
- `organization_id`
- `invoice_id`
- `client_service_id`
- `description`
- `quantity`
- `unit_price`
- `amount`
- `created_at`

### `onboarding_tasks`

Needed for:

- Task-level onboarding tracking.

Suggested fields:

- `id`
- `organization_id`
- `onboarding_record_id`
- `title`
- `description`
- `owner_id`
- `status`
- `due_date`
- `completed_at`
- `created_at`
- `updated_at`

### `client_documents`

Needed for:

- Onboarding asset upload.
- Reports/documents.

Suggested fields:

- `id`
- `organization_id`
- `client_id`
- `onboarding_record_id`
- `storage_bucket`
- `storage_path`
- `file_name`
- `content_type`
- `file_size`
- `uploaded_by`
- `created_at`

### `integration_connections`

Needed for:

- GSC, GA4, Google Ads, Meta Ads OAuth.

Suggested fields:

- `id`
- `organization_id`
- `client_id`
- `provider`
- `status`
- `scopes`
- `access_token_encrypted`
- `refresh_token_encrypted`
- `expires_at`
- `last_sync_at`
- `last_error`
- `created_at`
- `updated_at`

Tokens must be encrypted and must never be exposed to the Vite client.

### `report_exports`

Needed for:

- Generated PDFs and CSVs.

Suggested fields:

- `id`
- `organization_id`
- `client_id`
- `report_type`
- `period_start`
- `period_end`
- `storage_path`
- `status`
- `generated_by`
- `generated_at`
- `created_at`

### `notifications`

Needed for:

- Follow-up reminders.
- Stale lead alerts.
- Onboarding delays.

Suggested fields:

- `id`
- `organization_id`
- `user_id`
- `kind`
- `title`
- `body`
- `entity_type`
- `entity_id`
- `read_at`
- `created_at`

## Edge Functions

### `lead-intake`

Purpose:

- Public form endpoint that creates leads.

Inputs:

- `contact_name`
- `company_name`
- `contact_email`
- `contact_phone`
- `website`
- `service_interest`
- `message`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `referrer`
- `page_url`

Writes:

- `leads`
- `lead_activities`
- optional `activities`

Security:

- Validate CORS allowlist.
- Rate limit if possible.
- Use server-side Supabase client with service role key.
- Return safe public response.

### `convert-lead`

Purpose:

- Convert won lead into client, service assignments, and onboarding.

Inputs:

- `lead_id`
- `proposal_id`
- `service_assignments`
- `client_overrides`
- `target_onboarding_date`

Writes:

- `clients`
- `client_services`
- `onboarding_records`
- `leads`
- `activities`

Security:

- Requires authenticated user.
- Requires editor/admin/owner role.
- Must verify lead belongs to active organization.

### `scheduled-sync`

Purpose:

- Run recurring integration sync jobs.

Beta status:

- Scaffold only.

v1 jobs:

- Google Search Console daily snapshots.
- GA4 daily traffic summaries.
- Later Google Ads and Meta Ads syncs.

## Storage Buckets

Suggested future buckets:

| Bucket | Purpose | Access |
| --- | --- | --- |
| `client-documents` | Onboarding files and client assets | Authenticated org members through signed URLs |
| `report-exports` | Generated PDFs and CSVs | Authenticated org members through signed URLs |
| `proposal-documents` | Proposal PDFs | Authenticated org members, optional client sharing later |

## RLS Policy Pattern

Read policy:

```sql
using (public.is_org_member(organization_id))
```

Write policy:

```sql
using (
  public.has_org_role(
    organization_id,
    array['owner', 'admin', 'editor']::public.app_role[]
  )
)
with check (
  public.has_org_role(
    organization_id,
    array['owner', 'admin', 'editor']::public.app_role[]
  )
)
```

Owner/admin-only policy:

```sql
using (
  public.has_org_role(
    organization_id,
    array['owner', 'admin']::public.app_role[]
  )
)
```

## Seed Data

Beta seed should include:

- One organization.
- One owner membership.
- Six agency services:
  - Ad Management
  - SEO Optimization
  - Content Marketing
  - Social Media Management
  - Web Development
  - Consulting

Do not seed fake client revenue into production.

## Database Work Order

1. Validate `0001_initial_schema.sql` in Supabase.
2. Generate TypeScript database types.
3. Connect app to Supabase client.
4. Implement auth and organization context.
5. Wire services and clients.
6. Wire leads and proposals.
7. Add lead intake and conversion Edge Functions.
8. Add missing operational tables as scoped migrations only when needed.
