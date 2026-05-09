# Codex Assembly Protocol

This document defines how Codex agents must integrate KIMI 2.6 blueprint packages into the existing SLASH-CRM repository.

Codex is the assembly and validation force. Codex does not loosely reinterpret the blueprint. Codex maps, connects, adapts, validates, and closes gaps.

## Assembly Mandate

The existing SLASH-CRM repository is the target environment.

Codex must:

- Preserve current foundation.
- Integrate blocks into existing module boundaries.
- Use adapters where needed.
- Keep changes traceable to blueprint references.
- Treat mismatches as route-resolution problems.
- Maintain a gap register.
- Validate every assembled block.

Codex must not:

- Rebuild from scratch.
- Replace the app shell without approval.
- Introduce an alternate backend without approval.
- Duplicate modules because integration is difficult.
- Bypass RLS or org scoping.
- Hide missing features behind mocks.

## Assembly Team Roles

| Codex Role | Responsibility |
| --- | --- |
| Blueprint Intake Agent | Verifies KIMI package completeness and creates intake report. |
| Repo Mapping Agent | Maps KIMI blocks to current SLASH-CRM files, routes, modules, and schema. |
| Schema Assembly Agent | Applies migrations, validates RLS, regenerates types, checks DB compatibility. |
| Module Assembly Agent | Integrates feature blocks into `src/features/*` and route pages. |
| Adapter Agent | Builds narrow compatibility adapters when source and target structures differ. |
| Contract Validation Agent | Verifies API, Edge Function, UI state, and data contracts. |
| Security Validation Agent | Reviews auth, org scope, RLS, secrets, CORS, and public endpoints. |
| QA Release Agent | Runs checks, browser smoke tests, staging validation, and release checklist. |

These roles can be performed by one Codex instance or multiple controlled agents.

## Intake Procedure

Before code assembly:

1. Read `AGENTS.md`.
2. Read `docs/PRODUCTION_ASSEMBLY_PROTOCOL.md`.
3. Read `docs/KIMI_BLUEPRINT_CONTRACT.md`.
4. Read KIMI package `README.md`.
5. Confirm package structure.
6. Confirm module manifests.
7. Confirm contracts.
8. Confirm known gaps.
9. Create or update `docs/GAP_REGISTER.md`.
10. Produce an intake decision:
   - accepted for assembly
   - accepted with gaps
   - blocked pending blueprint clarification

## Current-State Mapping Procedure

Codex must map KIMI output against current repo before integrating.

Map:

- Existing routes in `src/app/routes.tsx`.
- Existing layout in `src/components/layout`.
- Existing pages in `src/pages`.
- Existing feature folders in `src/features`.
- Existing Supabase migration.
- Existing generated types.
- Existing mock data usage.
- Existing docs and release checklist.

Output:

```text
Block ID:
KIMI source path:
Target SLASH-CRM path:
Fit status:
Required adapter:
Required migration:
Risk:
Owner:
Validation:
```

## Fit Status Definitions

| Status | Meaning | Action |
| --- | --- | --- |
| direct-fit | Can map into existing structure with normal edits | Assemble |
| adapter-required | Contract is valid but shape differs | Build adapter |
| migration-required | DB schema must change | Create migration |
| sequence-blocked | Dependency not yet assembled | Wait |
| clarification-required | Blueprint is incomplete or contradictory | Ask for clarification |
| rejected | Conflicts with non-negotiable control | Do not assemble |
| deferred | Valid but outside Beta scope | Register as deferred |

## Controlled Assembly Sequence

Use this order unless a blueprint-approved reason says otherwise:

1. Environment and Supabase integration.
2. Auth and organization context.
3. Database migrations and generated types.
4. Services data layer.
5. Clients data layer.
6. Leads data layer.
7. Activities.
8. Proposals.
9. Lead intake.
10. Lead conversion.
11. Onboarding handoff.
12. Dashboard and revenue calculations.
13. Reports and exports.
14. QA and deployment.

Do not assemble downstream blocks until upstream contracts pass.

## Adapter Strategy

Use adapters to preserve both blueprint intent and current repo structure.

Adapter examples:

- Map KIMI DTO names to current database table names.
- Map KIMI route assumptions to current `/app/*` routes.
- Wrap Supabase responses into feature-level domain types.
- Convert Edge Function payload shape into current form state shape.
- Normalize legacy mock object shapes during migration only.

Adapter rules:

- Keep adapters small.
- Put adapters near feature boundaries.
- Document why adapter exists.
- Add tests or validation for critical adapters.
- Do not let adapters become hidden rewrites.

## Route-Resolution Workflow

When integration fails:

1. Stop broad editing.
2. Identify failing route or contract.
3. Find blueprint reference.
4. Find current repo reference.
5. Classify mismatch.
6. Create gap if not already registered.
7. Choose recovery path.
8. Apply narrow fix.
9. Run validation.
10. Update gap evidence.

Mismatch classes:

- file-path mismatch
- route mismatch
- type mismatch
- DB schema mismatch
- RLS/permission mismatch
- payload mismatch
- state lifecycle mismatch
- env/config mismatch
- UI composition mismatch
- deployment mismatch

## Recovery Path Matrix

| Mismatch | Preferred Recovery | Avoid |
| --- | --- | --- |
| File path | Move into current repo structure | Creating duplicate root app |
| Route | Route adapter or page wrapper | Replacing route system |
| Type | Domain mapper or type regeneration | `any` everywhere |
| DB schema | Forward migration | Editing old migration after deployment |
| RLS | Policy correction | Disabling RLS |
| Payload | Contract adapter | Changing public contract silently |
| Env | Document and validate env var | Hardcoding values |
| UI | Feature component wrapper | Global CSS rewrite |
| Deployment | Config update | Manual undocumented deploy |

## Gap Register Procedure

Every unresolved mismatch becomes a gap.

Gap record:

```text
Gap ID:
Severity:
Status:
Owner:
Blueprint reference:
Repo reference:
Blocked route:
Description:
Impact:
Closure path:
Validation checkpoint:
Evidence:
Decision:
```

No P0 or P1 gap may remain ownerless.

## Validation Requirements

For every assembled block:

- Lint result.
- Typecheck result.
- Build result.
- Route smoke result if UI changed.
- Contract validation result.
- Data persistence result if feature writes data.
- Security review if auth, RLS, env, Edge Function, or public endpoint changed.

## Merge Criteria

A block can merge only when:

- It maps to an accepted blueprint manifest.
- Target files match assembly plan.
- No unrelated code was changed.
- Checks pass.
- Gaps are closed or registered.
- No P0 gap remains.
- Orchestrator review accepts evidence.

## Staging Criteria

A suite can deploy to staging only when:

- All assembled blocks pass local validation.
- Supabase migrations are applied to staging.
- Generated types are current.
- Edge Functions deploy successfully.
- Auth redirects are configured.
- Browser smoke paths pass locally.
- Gap register contains no open P0.

## Production Criteria

Production release requires:

- `docs/RELEASE_CHECKLIST.md` critical gates pass.
- `docs/GAP_REGISTER.md` has no open P0.
- All P1 gaps closed or explicitly accepted.
- Security review passed.
- Data isolation review passed.
- Staging smoke test passed.
- Rollback path documented.

## Codex Final Assembly Report

Final report format:

```text
Assembly package:
Blueprint version:
SLASH-CRM commit:
Blocks assembled:
Blocks deferred:
Migrations applied:
Edge Functions deployed:
Checks run:
Smoke tests:
Open gaps:
Accepted risks:
Production-success score:
Release recommendation:
```

## Final Rule

If the blueprint and current repo disagree, Codex does not guess. Codex maps the disagreement, classifies it, registers the gap, and resolves it through the narrowest safe path.
