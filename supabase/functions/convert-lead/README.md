# Convert Lead Function

Planned Supabase Edge Function for turning a won lead into a client.

## Purpose

Convert an accepted/won lead into an active client with service assignments and an onboarding record without retyping core data.

## Responsibilities

- Validate lead, proposal, and service selections.
- Verify authenticated user has permission.
- Create or link the client record.
- Create client-service assignments.
- Create an onboarding record.
- Mark lead as won and converted.
- Preserve lead activity history.
- Write conversion activity.

## Route

Suggested function path:

```text
/functions/v1/convert-lead
```

## Auth

Requires authenticated user.

Allowed roles:

- owner
- admin
- editor

Viewers cannot convert leads.

## Request Payload

```json
{
  "organization_id": "uuid",
  "lead_id": "uuid",
  "proposal_id": "uuid",
  "client_overrides": {
    "name": "Acme Inc",
    "email": "jane@acme.com",
    "phone": "+1 555 0100",
    "website": "https://acme.com"
  },
  "service_assignments": [
    {
      "service_id": "uuid",
      "monthly_price": 2500,
      "start_date": "2026-05-01",
      "contract_type": "month-to-month",
      "auto_renew": true
    }
  ],
  "target_onboarding_date": "2026-05-15"
}
```

## Validation

Required:

- `organization_id`
- `lead_id`
- At least one `service_assignment` unless explicitly converting without services is approved.

Validate:

- Lead belongs to organization.
- User belongs to organization.
- User role can convert.
- Lead is not already converted.
- Services belong to organization.
- Monthly prices are not negative.
- Proposal belongs to lead if provided.

## Database Writes

Write to:

- `clients`
- `client_services`
- `onboarding_records`
- `leads`
- `activities`

Suggested transaction behavior:

- Conversion should be atomic.
- If any step fails, do not leave partial client/service/onboarding data.

If Edge Function transaction handling is limited, use a Postgres RPC function for the atomic conversion.

## Response

Success:

```json
{
  "ok": true,
  "client_id": "uuid",
  "onboarding_record_id": "uuid"
}
```

Already converted:

```json
{
  "ok": false,
  "error": "Lead has already been converted."
}
```

## Idempotency

Conversion must be safe against double-clicks and retries.

Recommended guard:

- If `leads.converted_at` is not null, block conversion and return existing `client_id` when available.

## Acceptance Criteria

- Won lead converts into client.
- Client service assignments are created.
- Onboarding record is created.
- Lead is marked `won` with `converted_at`.
- Conversion activity is logged.
- Re-running conversion does not create duplicate clients.
