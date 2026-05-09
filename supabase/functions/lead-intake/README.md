# Lead Intake Function

Planned Supabase Edge Function for public website/contact form submissions.

## Purpose

Create a CRM lead from a public website/contact form without exposing internal credentials or database structure.

## Responsibilities

- Validate lead payloads.
- Capture UTM/source attribution.
- Prevent obvious duplicates.
- Create a lead record.
- Create initial lead activity.
- Assign an owner or default queue when rules exist.
- Return a safe response to the public form.

## Route

Suggested function path:

```text
/functions/v1/lead-intake
```

## Request Payload

```json
{
  "organization_slug": "agency-slug",
  "contact_name": "Jane Smith",
  "company_name": "Acme Inc",
  "contact_email": "jane@acme.com",
  "contact_phone": "+1 555 0100",
  "website": "https://acme.com",
  "service_interest": ["SEO Optimization", "Ad Management"],
  "message": "We need help with lead generation.",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "spring-growth",
  "utm_term": "agency crm",
  "utm_content": "hero-form",
  "referrer": "https://google.com",
  "page_url": "https://slash-crm.com/contact"
}
```

## Validation

Required:

- `organization_slug` or another safe tenant routing value.
- `contact_name`.
- `company_name`.
- At least one contact method: `contact_email`, `contact_phone`, or `website`.

Optional:

- `service_interest`.
- UTM fields.
- `message`.
- `referrer`.
- `page_url`.

Reject:

- Empty payload.
- Invalid email format.
- Invalid website URL.
- Payloads over configured size.
- Unknown organization slug.

## Database Writes

Write to:

- `leads`
- `lead_activities`

Optional write:

- `activities`

Default values:

- `status`: `new`
- `qualification_status`: `working`
- `source`: map from UTM/source fields or fallback to `website`
- `first_contact_date`: current date
- `first_contact_method`: `website_form`

## Duplicate Handling

Check for existing open leads in the same organization by:

- contact email
- company name and website
- website domain

Suggested behavior:

- If duplicate open lead exists, append a new activity instead of creating a second lead.
- Return success to the public form either way.
- Do not reveal whether the lead was duplicate.

## Response

Success:

```json
{
  "ok": true,
  "message": "Thanks, we received your request."
}
```

Validation error:

```json
{
  "ok": false,
  "error": "Please provide a valid email or phone number."
}
```

Do not expose internal lead IDs unless there is a clear product need.

## Security

- Use service role key only inside the Edge Function.
- Never expose service role key to browser code.
- Configure explicit CORS allowlist.
- Consider rate limiting by IP or form source.
- Log errors safely without private message contents if not necessary.

## Acceptance Criteria

- Public website form can create a lead.
- UTM/source fields are stored.
- Duplicate handling prevents obvious lead spam.
- Invalid payloads are rejected.
- Initial activity is created.
- No internal secrets appear in responses or client code.
