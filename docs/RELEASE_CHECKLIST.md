# Release Checklist

Do not call the product Beta until these gates pass.

## Product Gates

- [ ] Users can sign in, sign out, reset password, and have roles.
- [ ] Clients, services, leads, activities, and proposals persist in Supabase.
- [ ] A public website form creates a lead with source attribution.
- [ ] A won lead can become a client with service assignments and onboarding.
- [ ] MRR is computed from active client-service assignments.
- [ ] Open leads require owner and next follow-up date.

## Engineering Gates

- [ ] `npm run lint` passes.
- [ ] `npm run typecheck` passes.
- [ ] `npm run build` passes.
- [ ] GitHub Actions passes on `main`.
- [ ] Staging deployment is live.
- [ ] No secrets are committed.
