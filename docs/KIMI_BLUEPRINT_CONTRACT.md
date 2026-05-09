# KIMI Blueprint Contract

This document defines the required output package from the KIMI 2.6 swarm before Codex begins production assembly.

KIMI must not produce only code. KIMI must produce a hardened, inspectable blueprint package that allows Codex to integrate system blocks into the existing SLASH-CRM repository without improvisation.

## Required Package Structure

KIMI output should be organized like this:

```text
kimi-blueprint-package/
├── README.md
├── blueprint/
│   ├── architecture-map.md
│   ├── module-manifest.md
│   ├── dependency-graph.md
│   ├── data-flow-map.md
│   ├── route-map.md
│   ├── security-model.md
│   ├── deployment-sequence.md
│   └── failure-route-map.md
├── contracts/
│   ├── api-contracts.md
│   ├── edge-function-contracts.md
│   ├── database-contracts.md
│   ├── event-contracts.md
│   └── ui-state-contracts.md
├── blocks/
│   ├── platform/
│   ├── auth/
│   ├── clients/
│   ├── services/
│   ├── leads/
│   ├── revenue/
│   ├── onboarding/
│   ├── reports/
│   └── qa/
├── migrations/
│   ├── manifest.md
│   └── *.sql
├── tests/
│   ├── test-matrix.md
│   ├── smoke-tests.md
│   ├── security-tests.md
│   └── regression-tests.md
├── evidence/
│   ├── validation-report.md
│   ├── build-report.md
│   ├── typecheck-report.md
│   ├── lint-report.md
│   └── known-gaps.md
└── assembly/
    ├── integration-order.md
    ├── file-map.md
    ├── adapter-plan.md
    └── rollback-plan.md
```

## Package README Requirements

The package `README.md` must include:

- KIMI swarm version.
- Date generated.
- Source branch or source context.
- Assumptions.
- Included modules.
- Excluded modules.
- Required environment variables.
- Required third-party services.
- Known limitations.
- Suggested assembly sequence.
- Validation summary.

## Architecture Map

Required content:

- System overview.
- Frontend architecture.
- Backend architecture.
- Supabase architecture.
- Edge Function architecture.
- Auth and role model.
- Feature module boundaries.
- Shared utilities.
- Error handling model.
- Deployment environments.

Must explicitly state:

- What should map directly into the current SLASH-CRM repo.
- What requires adapter work.
- What requires migration work.
- What should be deferred.

## Module Manifest

Every module must have a manifest.

Manifest format:

```text
Module ID:
Module name:
Purpose:
Source block path:
Target SLASH-CRM path:
Owned files:
Required dependencies:
Required database tables:
Required Edge Functions:
Required env vars:
Public API:
Internal API:
Events emitted:
Events consumed:
UI routes affected:
Tests included:
Validation evidence:
Known gaps:
Rollback notes:
```

No module may be assembled without a manifest.

## Dependency Graph

Required content:

- Module dependency graph.
- Build dependency graph.
- Database dependency graph.
- Runtime dependency graph.
- Deployment dependency graph.
- Third-party service dependency graph.

Format:

```text
module_a -> module_b -> module_c
```

Each dependency must include:

- Why it exists.
- Whether it is hard or soft.
- What breaks if missing.
- Validation method.

## Data-Flow Map

Required flows:

- Sign in and organization resolution.
- Create service.
- Create client.
- Assign service to client.
- Create lead manually.
- Create lead through public intake.
- Move lead stage.
- Create proposal.
- Convert lead to client.
- Create onboarding record.
- Calculate MRR.
- Export report.

Each flow must include:

- UI entry point.
- Feature hook/service.
- API call or Supabase query.
- Tables read.
- Tables written.
- RLS expectation.
- Success state.
- Error state.
- Audit/activity event.

## Route Map

Required current target routes:

- `/`
- `/app`
- `/app/clients`
- `/app/clients/:id`
- `/app/prospects`
- `/app/onboarding`
- `/app/offboarding`
- `/app/earnings`
- `/app/services`
- `/app/reports`
- `/app/settings`

Each route must declare:

- Auth requirement.
- Data dependencies.
- Feature module owner.
- Loading state.
- Empty state.
- Error state.
- Smoke test path.

## Security Model

Required content:

- Auth strategy.
- Session persistence.
- Organization context.
- Role permissions.
- RLS policy expectations.
- Service role usage.
- Secret handling.
- Public function threat model.
- CORS policy.
- Data leakage prevention.
- Logging policy.

KIMI must explicitly identify:

- Any operation requiring service role.
- Any browser-safe env var.
- Any server-only env var.
- Any public endpoint.
- Any operation requiring owner/admin/editor role.

## API Contracts

Required for:

- Supabase query/mutation wrappers.
- Edge Functions.
- Cross-module functions.
- Report/export functions.

Contract format:

```text
Contract ID:
Purpose:
Caller:
Callee:
Input:
Output:
Errors:
Auth required:
Role required:
Tables read:
Tables written:
Idempotency:
Validation:
Test coverage:
```

## Database Contracts

Required content:

- Tables used.
- Columns required.
- Enum dependencies.
- Index dependencies.
- RLS policies.
- Migration order.
- Backfill needs.
- Seed data needs.
- Rollback risk.

If KIMI proposes schema changes, it must provide:

- Migration file.
- Reason.
- Impacted modules.
- Type regeneration requirement.
- Backward compatibility notes.
- Data migration notes.

## Edge Function Contracts

Required for:

- `lead-intake`
- `convert-lead`
- `scheduled-sync` if implemented

Each must include:

- Request schema.
- Response schema.
- Auth mode.
- CORS policy.
- Tables read/written.
- Idempotency behavior.
- Error codes.
- Logging behavior.
- Test cases.

## UI State Contracts

Every route or major component must define:

- Loading state.
- Empty state.
- Error state.
- Success state.
- Disabled state.
- Permission-denied state.
- Backend-not-configured state.

This prevents agents from shipping UI that only works in the happy path.

## Failure Route Map

KIMI must define recovery behavior for:

- Missing Supabase env.
- Failed session load.
- User without organization.
- RLS denial.
- Network failure.
- Edge Function failure.
- Duplicate lead intake.
- Duplicate lead conversion.
- Migration mismatch.
- Stale generated database types.
- Export failure.
- Deployment env mismatch.

Each failure route must include:

- Detection method.
- User-facing behavior.
- Developer-facing log.
- Recovery path.
- Test case.

## Test Matrix

Required layers:

- Static checks.
- Unit/domain tests if introduced.
- Integration tests.
- Browser smoke tests.
- Security tests.
- RLS tests or manual RLS checklist.
- Deployment smoke tests.

Minimum required commands:

```bash
npm run lint
npm run typecheck
npm run build
```

If KIMI adds test tooling, it must document:

- Install command.
- Test command.
- Expected output.
- Known flake risk.

## Deployment Sequence

Required steps:

1. Create assembly branch.
2. Verify blueprint package.
3. Apply migrations to staging.
4. Regenerate database types.
5. Integrate platform/auth blocks.
6. Integrate feature data layers.
7. Integrate UI wiring.
8. Integrate Edge Functions.
9. Run local validation.
10. Deploy staging.
11. Run staging smoke tests.
12. Close gaps.
13. Prepare production release.

## Validation Evidence

KIMI must include validation evidence or explicitly mark it as missing.

Evidence format:

```text
Check:
Command:
Environment:
Result:
Timestamp:
Relevant output:
Known limitations:
```

## Known Gaps

KIMI must not hide uncertainty.

Every known gap must include:

- Gap ID.
- Severity.
- Module.
- Description.
- Impact.
- Suggested owner.
- Closure route.
- Validation checkpoint.

## Acceptance Criteria For KIMI Package

Codex may begin assembly only when:

- Required package structure exists.
- Every module has a manifest.
- Every required Beta flow has a data-flow map.
- Every public or cross-module API has a contract.
- Every DB change has a migration plan.
- Every failure route has recovery behavior.
- Every test claim has evidence or is marked missing.
- Every known gap has owner and closure route.

If this contract is not met, Codex must run blueprint clarification before assembly.
