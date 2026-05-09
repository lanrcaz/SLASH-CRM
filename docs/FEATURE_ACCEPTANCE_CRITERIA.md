# Feature Acceptance Criteria

This document defines what each Beta feature must do before it is considered complete.

## Global Criteria

Every feature must:

- Use persisted Supabase data when backend is connected.
- Respect organization scoping.
- Handle loading, empty, success, and error states.
- Survive page refresh.
- Avoid leaking data across organizations.
- Pass lint, typecheck, and build.
- Preserve the professional light workspace UI direction.

## Auth

Complete when:

- User can sign in.
- User can sign out.
- User session persists on refresh.
- Password reset path exists or is delegated to Supabase Auth.
- `/` remains public.
- `/app/*` is protected.
- Loading state prevents private app flash before session check completes.

Failure states:

- Invalid credentials show a safe error.
- Missing Supabase env shows a developer-facing setup state.
- User without organization sees bootstrap or support state.

## Organizations And Roles

Complete when:

- Signed-in user has an active organization context.
- Role is available to feature modules.
- Owner/admin/editor/viewer permissions are represented in UI behavior.
- Viewer cannot create or edit records.
- Owner/admin can manage organization settings when team management is implemented.

Failure states:

- No membership.
- Multiple memberships.
- Organization fetch error.

## Services

Complete when:

- User can create service with name, category, billing type, base price, and deliverables.
- User can edit service.
- User can deactivate service.
- Active service list survives refresh.
- Services are unique by organization and name.
- Service can be selected for client assignment and proposals.

Validation:

- Name is required.
- Category is required.
- Base price cannot be negative.
- Billing type must be valid.

## Clients

Complete when:

- User can create client.
- User can edit client.
- User can archive client without hard delete.
- User can view client detail by ID.
- User can assign services to client.
- User can pause/cancel client service assignment.
- Client timeline shows activities.
- Client list filters by status.

Validation:

- Client name is required.
- Email must be valid when provided.
- Health score stays between 0 and 100.
- Archived clients do not count as active clients.

## Leads And Prospects

Complete when:

- User can create lead.
- User can edit lead.
- User can move lead through stages.
- Stage move persists and logs activity.
- User can filter/search leads.
- Lead source and attribution fields are stored.
- Open leads visibly require owner and next follow-up date.
- Won and lost leads stop appearing as active opportunities by default.

Validation:

- Contact name is required.
- Company name is required.
- Lead source is required.
- Probability must be between 0 and 100.
- Estimated value cannot be negative.

## Proposals

Complete when:

- User can create proposal for a lead.
- Proposal can include services.
- Proposal stores monthly value, one-time fees, status, sent date, and expiry date.
- Proposal status can change to sent, accepted, rejected, expired.
- Accepted proposal can be used for conversion.

Validation:

- Proposal must belong to a lead.
- Total value cannot be negative.
- Sent date cannot be after accepted/rejected date.

## Activities

Complete when:

- User can add note, call, email, meeting, or task.
- System can log stage change, proposal sent, service assignment, and onboarding events.
- Activities can attach to client, lead, or both.
- Activities show timestamp and creator when available.

Validation:

- Activity description or summary is required.
- Activity type must be valid.

## Lead Intake

Complete when:

- Public endpoint accepts website form submissions.
- Payload validation rejects invalid submissions.
- UTM fields, referrer, and page URL are captured when present.
- Duplicate handling avoids obvious duplicate spam.
- Lead is created in `new` status.
- Initial activity is created.
- Response is safe for public clients.

Security:

- Service role key is only used server-side.
- CORS is explicit.
- No organization data is exposed in public response.

## Lead Conversion

Complete when:

- User can convert a won/accepted lead.
- Client is created or linked.
- Service assignments are created from proposal or selected services.
- Onboarding record is created.
- Lead is marked won with `converted_at`.
- Conversion writes activity history.
- Duplicate conversion is blocked or idempotent.

Validation:

- Lead must belong to current organization.
- User must have editor/admin/owner permission.
- At least one service assignment is required unless explicitly bypassed.

## Dashboard

Complete when:

- Active client count comes from clients table.
- MRR comes from active client-service assignments.
- Weighted pipeline comes from open leads.
- Follow-ups due come from lead next follow-up dates.
- Dashboard handles empty organization state.

No mock metrics should appear when backend data is connected.

## Revenue

Complete when:

- MRR and ARR are calculated from active client services.
- Revenue can be grouped by client and service.
- Paused/cancelled services are excluded from active MRR.
- Manual ROI inputs are clearly labeled if integrations are not connected.

Formula:

```text
MRR = sum(active client_service monthly_price)
ARR = MRR * 12
Weighted Pipeline = sum(open lead estimated_value * probability)
```

## Onboarding

Complete when:

- Converted leads create onboarding records.
- User can view active onboarding records.
- User can update status and target date.
- Completed onboarding records have completion date.
- Empty state explains that onboarding starts from lead conversion or manual client onboarding.

Future criteria:

- Onboarding tasks.
- Document uploads.
- Client asset checklist.

## Reports And Exports

Complete when:

- User can export clients CSV.
- User can export leads CSV.
- User can export services CSV.
- User can export revenue summary CSV.
- Export respects organization scope.
- Export includes generated date.

Future criteria:

- PDF reports.
- Scheduled report emails.
- Client-facing report packages.

## Settings

Complete when:

- Profile settings persist.
- Organization settings persist.
- Notification preferences persist only after notification system exists.
- API keys shown in UI are not fake production secrets.
- Integration statuses reflect real connection state or are clearly marked as coming soon.

Do not show fake connected integrations.

## Beta Release Acceptance

Beta is acceptable when one internal operator can complete this flow:

1. Sign in.
2. Create service.
3. Create client.
4. Assign service to client.
5. Create lead.
6. Move lead to proposal stage.
7. Create proposal.
8. Mark proposal accepted.
9. Convert lead into client and onboarding.
10. Confirm dashboard MRR changed.
11. Export client or revenue CSV.

The flow must work after browser refresh and must not require editing mock data.
