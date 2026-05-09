# Release Checklist

Do not call SLASH-CRM Beta until these gates pass.

## Product Gates

- [ ] Users can sign in.
- [ ] Users can sign out.
- [ ] Users can reset password or use Supabase password recovery.
- [ ] Users have organization roles.
- [ ] `/app/*` routes are protected.
- [ ] Public `/` route remains accessible.
- [ ] Clients persist in Supabase.
- [ ] Services persist in Supabase.
- [ ] Client-service assignments persist in Supabase.
- [ ] Leads persist in Supabase.
- [ ] Proposals persist in Supabase.
- [ ] Activities persist in Supabase.
- [ ] Onboarding records persist in Supabase.
- [ ] A public website form creates a lead with source attribution.
- [ ] A won lead can become a client with service assignments and onboarding.
- [ ] MRR is computed from active client-service assignments.
- [ ] Open leads require owner and next follow-up date.
- [ ] Archived clients are not hard-deleted.
- [ ] Paused/cancelled services do not count toward active MRR.

## Data Gates

- [ ] RLS is enabled on business tables.
- [ ] Business tables are scoped by `organization_id`.
- [ ] Viewer role cannot write business records.
- [ ] Editor role cannot manage organization members.
- [ ] Owner/admin can manage organization settings.
- [ ] No mock values appear in connected production flows.
- [ ] Imported service count matches source.
- [ ] Imported active client count matches source.
- [ ] Imported MRR matches source billing total or differences are documented.

## Lead Workflow Gates

- [ ] Manual lead creation works.
- [ ] Website lead intake works.
- [ ] UTM/source fields are captured.
- [ ] Stage movement persists.
- [ ] Stage movement logs activity.
- [ ] Proposal creation works.
- [ ] Proposal accepted/rejected state persists.
- [ ] Conversion creates or links client.
- [ ] Conversion creates client-service assignments.
- [ ] Conversion creates onboarding record.
- [ ] Duplicate conversion is blocked or idempotent.

## Revenue Gates

- [ ] Dashboard active clients are database-derived.
- [ ] Dashboard MRR is database-derived.
- [ ] Weighted pipeline is database-derived.
- [ ] Revenue by service is database-derived.
- [ ] CSV export matches displayed values.

## UX Gates

- [ ] Main app preserves professional light workspace UI.
- [ ] Mobile layout is usable for critical routes.
- [ ] Loading states exist for backend data.
- [ ] Empty states explain next action.
- [ ] Error states are safe and understandable.
- [ ] Forms validate required fields.
- [ ] Refresh does not lose saved records.

## Engineering Gates

- [ ] `npm run lint` passes.
- [ ] `npm run typecheck` passes.
- [ ] `npm run build` passes.
- [ ] GitHub Actions passes on `main`.
- [ ] Staging deployment is live.
- [ ] Browser smoke test passes.
- [ ] No secrets are committed.
- [ ] `.env.example` documents required env vars.
- [ ] New migrations are reviewed.
- [ ] Generated database types are current.

## Security Gates

- [ ] Service role key is never used in Vite client code.
- [ ] Public Edge Functions validate payloads.
- [ ] CORS is explicit for public functions.
- [ ] OAuth secrets are server-side only.
- [ ] No private customer data appears in logs.
- [ ] Auth redirect URLs are configured correctly.
- [ ] Storage buckets use signed URLs or RLS-equivalent access.

## Deployment Gates

- [ ] Vercel project is configured.
- [ ] Supabase staging project is configured.
- [ ] Supabase production project is planned or configured.
- [ ] Staging env vars are set.
- [ ] Production env vars are planned.
- [ ] Supabase Auth redirect URLs include staging.
- [ ] Supabase Auth redirect URLs include production before launch.
- [ ] Edge Functions are deployed if used.
- [ ] Post-deploy smoke test passes.

## Operator Gates

- [ ] One operator can create a service.
- [ ] One operator can create a client.
- [ ] One operator can assign service to client.
- [ ] One operator can create a lead.
- [ ] One operator can move lead stages.
- [ ] One operator can create proposal.
- [ ] One operator can convert won lead.
- [ ] One operator can verify MRR changed.
- [ ] One operator can export CSV.
- [ ] Team can use the app for one week without reverting to spreadsheets.

## Beta Sign-Off

Beta can be declared only when:

- Product gates pass.
- Engineering gates pass.
- Security gates pass.
- Staging smoke test passes.
- Known gaps are documented.
- The owner accepts remaining Beta limitations.
