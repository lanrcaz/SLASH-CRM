# Swarm Orchestration

This document is the operating manual for deploying KIMI 2.6 or another agent swarm against SLASH-CRM.

## Objective

Build the Beta from top to bottom without agents stepping on each other.

The objective is controlled assembly, not improvisational rebuilding. KIMI 2.6 agents produce hardened blueprint artifacts and system blocks. Codex agents integrate those blocks into the current SLASH-CRM production structure through the assembly controls in `PRODUCTION_ASSEMBLY_PROTOCOL.md` and `CODEX_ASSEMBLY_PROTOCOL.md`.

The swarm should produce a working internal agency CRM with:

- Authentication and organization roles.
- Persistent clients, services, leads, proposals, activities, and onboarding records.
- Public lead intake from website forms.
- Won lead to client conversion.
- MRR calculated from active client-service assignments.
- Import/export paths for Beta operations.
- Release checks and staging deployment readiness.

## Orchestration Philosophy

Agents should not all start coding at once. The project has hard dependencies.

Agents should also not treat generated code as automatically mergeable. Every generated block must be mapped to the current repo, checked against its manifest, validated against contracts, and tracked against the gap register.

The correct sequence is:

1. Blueprint package verification.
2. Current-state mapping.
3. Gap registration.
4. Platform spine.
5. Database and types.
6. Auth and organization context.
7. Feature data layers.
8. Feature UI wiring.
9. Cross-feature workflows.
10. Reporting and exports.
11. QA, release, deployment.

Parallel work is allowed only when file ownership does not overlap and dependencies are satisfied.

## Agent Roles

| Agent | Role | Primary Files |
| --- | --- | --- |
| Orchestrator | Assigns tasks, enforces scope, reviews outputs, resolves conflicts | `docs/*`, task board, release checklist |
| Platform Agent | Supabase client, env, providers, route guards, app context | `src/app`, `src/integrations/supabase`, `src/features/auth` |
| Database Agent | Migrations, RLS, seed data, generated types | `supabase/migrations`, `supabase/seed.sql`, `src/types/database.ts` |
| Clients Agent | Client CRUD, archive, client detail, service assignment UI | `src/features/clients`, `src/pages/Clients.tsx`, `src/pages/ClientDetail.tsx` |
| Services Agent | Service catalog, pricing, deliverables, assignment defaults | `src/features/services`, `src/pages/Services.tsx` |
| Leads Agent | Pipeline, qualification, proposals, stale rules, conversion UI | `src/features/leads`, `src/pages/Prospects.tsx` |
| Backend Agent | Edge Functions, webhook validation, conversion workflow | `supabase/functions/*` |
| Revenue Agent | MRR, ARR, pipeline value, time, invoices, exports | `src/features/revenue`, `src/pages/Earnings.tsx` |
| Onboarding Agent | Onboarding records, tasks, templates, file checklist | `src/features/onboarding`, `src/pages/Onboarding.tsx` |
| Reports Agent | CSV/PDF exports, scheduled report shell, report builder | `src/features/reports`, `src/pages/Reports.tsx` |
| QA Agent | Smoke tests, browser checks, release checklist | test files, docs, CI |
| Blueprint Intake Agent | Verifies KIMI package completeness before assembly | `docs/GAP_REGISTER.md`, intake notes |
| Adapter Agent | Resolves blueprint/current-repo mismatches through narrow adapters | Feature boundaries and integration files |
| Security Validation Agent | Validates auth, RLS, secrets, CORS, and public endpoints | Security docs, Supabase policies, function contracts |

## Dependency Graph

```text
DB schema
  -> generated types
  -> Supabase client
  -> auth provider
  -> organization context
  -> protected routes
  -> feature query layers
  -> feature UI wiring
  -> cross-feature workflows
  -> dashboards and reports
  -> QA and deployment
```

Feature-specific dependencies:

```text
services
  -> client_services
  -> MRR dashboard
  -> invoices
  -> ROI reports

leads
  -> proposals
  -> convert-lead function
  -> clients
  -> onboarding_records

activities
  -> client timeline
  -> lead timeline
  -> health score
  -> audit visibility
```

## Parallelization Plan

### Wave 0: Blueprint Intake And Guardrails

Can run in parallel:

- Orchestrator verifies KIMI blueprint package.
- Blueprint Intake Agent checks required manifests and contracts.
- QA Agent checks release checklist gaps.
- Security Validation Agent checks security model completeness.

Do not code feature logic yet.

Exit gate:

- `docs/GAP_REGISTER.md` updated.
- KIMI package accepted, accepted with gaps, or blocked for clarification.

### Wave 1: Platform Foundation

Must be coordinated tightly:

- Database Agent validates or extends initial migration.
- Platform Agent adds Supabase client, env validation, auth provider.
- QA Agent prepares smoke testing approach.

Only Platform and Database agents should touch shared app/provider files in this wave.

### Wave 2: Core Feature Data Layers

Can run in parallel after Wave 1:

- Clients Agent creates clients API/hooks/schemas.
- Services Agent creates services API/hooks/schemas.
- Leads Agent creates leads API/hooks/schemas.
- Activities ownership should be assigned to the agent that needs it first, usually Leads or Clients.

Agents must avoid editing shared route files at the same time.

### Wave 3: UI Wiring

Can run in parallel with strict file ownership:

- Clients Agent wires `/app/clients` and `/app/clients/:id`.
- Services Agent wires `/app/services`.
- Leads Agent wires `/app/prospects`.

Shared layout or global CSS changes require orchestrator approval.

### Wave 4: Cross-Feature Workflows

Should be sequential or carefully coordinated:

- Lead intake Edge Function.
- Proposal flow.
- Convert lead to client.
- Client service assignment.
- Onboarding handoff.
- Dashboard computed metrics.

### Wave 5: Beta Operations

Can run after core persistence:

- CSV import/export.
- Time tracking.
- Invoice readiness.
- Basic PDF/CSV reporting.
- Staging deployment.
- Release checklist.

## Task Packet Format

Every agent should receive a task packet in this format:

```text
Task ID:
Role:
Goal:
Read first:
Allowed files:
Do not touch:
Dependencies:
Implementation steps:
Acceptance criteria:
Commands to run:
Final report required:
```

## Branch And Commit Protocol

Preferred branch naming:

```text
codex/<task-id-short-name>
```

Commit messages should be specific:

```text
Implement Supabase auth provider
Wire clients list to Supabase
Add lead intake edge function
```

Do not combine unrelated tasks in one commit.

## Conflict Rules

If two agents need the same file:

1. Pause one task.
2. Let the owner finish first.
3. Rebase or merge.
4. Continue with fresh context.

Never manually overwrite a file without reading the latest version.

## Autonomous Decision Policy

Agents may proceed without asking when:

- The task is explicitly listed in `docs/BETA_EXECUTION_PLAN.md`.
- The change stays inside assigned files.
- The implementation follows existing architecture docs.
- The feature is required for Beta.

Agents must pause and ask when:

- A paid service is required.
- A database table must be renamed or deleted.
- A route or feature is removed.
- Product name changes.
- Security policy must be weakened.
- An implementation requires secrets not present in `.env.local`.

## No-Build List For Beta

Do not build these until explicitly assigned:

- AI assistant.
- Client portal.
- White-labeling.
- Google Ads API sync.
- Meta Ads API sync.
- Exact SERP scraping.
- Paid SEMrush or Ahrefs APIs.
- Mobile app.
- Complex revenue forecasting.
- Multi-currency.

## Agent Review Checklist

Before an agent marks work complete:

- Does the feature persist real data?
- Does it respect `organization_id`?
- Does it fail safely?
- Does it show a useful empty state?
- Does it preserve existing UI quality?
- Does it pass lint, typecheck, and build?
- Did the agent avoid touching unrelated files?
- Did the agent update docs if setup changed?

## Orchestrator Review Checklist

Before merging a task:

- Verify changed files match task ownership.
- Review RLS and auth assumptions.
- Run quality checks.
- Browser-test main changed route.
- Confirm no secrets were added.
- Confirm no mock data leaked into production flows.
- Add follow-up tasks for deferred work.
