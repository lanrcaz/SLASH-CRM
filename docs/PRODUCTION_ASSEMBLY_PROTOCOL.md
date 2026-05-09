# Production Assembly Protocol

This document defines the mission-critical deployment model for integrating KIMI 2.6 swarm-generated system blocks into the existing SLASH-CRM production structure.

## Executive Principle

SLASH-CRM is not being rebuilt.

SLASH-CRM is the target operating structure. KIMI 2.6 provides hardened architecture, system blocks, contracts, dependency intelligence, and validation evidence. Codex acts as the disciplined assembly and validation force that maps, adapts, connects, tests, and closes gaps inside the current SLASH-CRM repository.

No agent is authorized to treat friction as permission to drift, rewrite, or replace the foundation.

## Deployment Objective

Integrate a fully orchestrated, production-grade Beta suite into the existing SLASH-CRM codebase while preserving:

- Architectural consistency.
- Current route structure unless a blueprint-approved change requires otherwise.
- Supabase-first backend direction.
- React/Vite frontend foundation.
- Existing visual language and workspace UI.
- Security model based on organization scoping and RLS.
- GitHub repository continuity.
- Traceability from blueprint to implementation.

The only acceptable gap is the measured delta between current state and a 99%+ production-success threshold.

## Non-Negotiable Controls

- No chaotic rebuild.
- No experimental migration.
- No direct replacement of the existing foundation.
- No unreviewed architecture reinterpretation.
- No redundant code generation when a mapping or adapter will solve the mismatch.
- No weakening of security controls.
- No unowned gap.
- No unvalidated merge.
- No undocumented deviation.
- No production claim without evidence.

## Role Separation

### KIMI 2.6 Swarm

KIMI is responsible for producing the hardened construction kit:

- Full architecture blueprint.
- Module manifests.
- Dependency graph.
- Data-flow map.
- API contracts.
- Database mapping and migration requirements.
- Integration logic.
- Fallback and failure routes.
- Testing requirements.
- Validation evidence.
- Deployment sequence.
- Known gaps and assumptions.

KIMI output is treated as a blueprint and block package, not as an automatic replacement for the current repo.

### Codex Assembly Layer

Codex is responsible for controlled integration:

- Receive and verify KIMI blueprint package.
- Map KIMI blocks to current SLASH-CRM structure.
- Identify mismatches before touching code.
- Adapt system blocks through approved boundaries.
- Preserve current architecture unless blueprint and orchestrator approve a change.
- Run validation gates.
- Maintain gap register.
- Close measurable deltas.
- Prepare staging and production readiness evidence.

Codex is not authorized to recreate the system loosely when integration friction appears.

## Assembly Lifecycle

```text
KIMI Blueprint Package
  -> Blueprint Intake
  -> Completeness Gate
  -> Current-State Mapping
  -> Compatibility Matrix
  -> Gap Register
  -> Controlled Assembly Plan
  -> Block Integration
  -> Contract Validation
  -> Security Validation
  -> System Testing
  -> Staging Deployment
  -> 99%+ Production-Success Review
```

## Stage Gates

### Gate A0: Blueprint Intake

Purpose:

- Confirm KIMI output is complete enough to assemble.

Required evidence:

- Architecture map.
- Module manifest.
- Dependency graph.
- API contract map.
- DB schema and migration plan.
- Test matrix.
- Deployment sequence.
- Failure route map.
- Known assumptions.

Exit criteria:

- No missing critical blueprint section.
- All system blocks have owners and target paths.
- All required services and env vars are documented.

### Gate A1: Current-State Mapping

Purpose:

- Compare KIMI output against current SLASH-CRM repo.

Required evidence:

- Current route map.
- Current feature module map.
- Current Supabase schema map.
- Existing mock-data usage map.
- Existing UI structure map.
- Compatibility matrix.

Exit criteria:

- Every KIMI module has one of these statuses:
  - direct fit
  - adapter required
  - schema migration required
  - deferred
  - rejected with reason

### Gate A2: Gap Registration

Purpose:

- Convert all mismatches into owned gaps.

Required evidence:

- Gap ID.
- Severity.
- Owner.
- Affected module.
- Blocked route.
- Closure path.
- Validation checkpoint.

Exit criteria:

- No unowned P0 or P1 gap.
- No vague gap descriptions.
- No gap without closure criteria.

### Gate A3: Controlled Assembly

Purpose:

- Integrate blocks into the current repo with minimum necessary change.

Rules:

- Prefer adapters over rewrites.
- Prefer feature modules over large page expansion.
- Prefer migrations over direct schema edits.
- Prefer typed contracts over implicit assumptions.
- Preserve current UI shell unless an approved blueprint change requires modification.

Exit criteria:

- Integrated block compiles.
- Contract tests or equivalent validations pass.
- Existing routes still work.
- No unrelated files modified.

### Gate A4: Security And Data Validation

Purpose:

- Verify data isolation, auth, secrets, and failure behavior.

Required evidence:

- RLS review.
- Organization scoping review.
- Env var review.
- Service role key review.
- Public Edge Function validation.
- Auth route protection review.

Exit criteria:

- No critical security gap.
- No server secret in client bundle.
- No cross-organization data leakage path.

### Gate A5: System QA

Purpose:

- Prove the assembled system works as a whole.

Required checks:

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- Browser smoke test.
- Auth smoke test.
- Lead-to-client conversion smoke test.
- Dashboard MRR validation.
- Export validation.

Exit criteria:

- All P0 smoke paths pass.
- No critical console errors.
- No critical build warnings ignored.

### Gate A6: Staging Deployment

Purpose:

- Validate the assembled system in staging.

Required evidence:

- Vercel staging deploy.
- Supabase staging configuration.
- Auth redirect validation.
- Edge Function deployment validation.
- Staging smoke test results.

Exit criteria:

- Staging is operational.
- Known gaps are documented and non-blocking.
- Rollback path is documented.

### Gate A7: 99%+ Production-Success Review

Purpose:

- Confirm measurable readiness before production claim.

Exit criteria:

- Zero open P0 gaps.
- Zero open unaccepted P1 gaps.
- All release checklist critical gates pass.
- Security gates pass.
- Data gates pass.
- Deployment gates pass.
- Operator smoke path passes.
- Residual gap register has owner, severity, and accepted risk.

## 99%+ Production-Success Threshold

The threshold is not a feeling. It is a measurable readiness standard.

Required:

- 100% P0 gate pass rate.
- 100% security critical pass rate.
- 100% data isolation critical pass rate.
- 100% build pipeline pass rate.
- 100% operator smoke path pass rate.
- 95%+ P1 gate pass rate, with remaining P1 gaps explicitly accepted.
- 0 unowned gaps.
- 0 undocumented deviations.
- 0 fake production flows in Beta-critical paths.

If any P0 gap remains, the readiness score is automatically below threshold.

## Gap Severity Model

| Severity | Meaning | Release Impact |
| --- | --- | --- |
| P0 | Blocks auth, data integrity, security, build, core workflow, or deployment | Must close before Beta/prod |
| P1 | Material workflow, UX, data, or reliability gap with workaround | Must close or explicitly accept |
| P2 | Non-blocking improvement or polish gap | Can defer with owner |
| P3 | Future roadmap item | Not part of current release |

## Route-Resolution Principle

Every integration issue must be treated as a route-resolution problem.

When Codex encounters a major integration issue:

1. Trace the intended route from KIMI blueprint.
2. Identify the exact blocked edge.
3. Classify the mismatch:
   - path mismatch
   - schema mismatch
   - type mismatch
   - contract mismatch
   - permission mismatch
   - lifecycle mismatch
   - UI boundary mismatch
   - environment mismatch
4. Choose the narrowest recovery path.
5. Validate the route after the fix.
6. Record the gap and closure evidence.

The default recovery path is adapter, mapping, migration, or contract clarification. The default is not rewrite.

## Deviation Control

Any deviation from blueprint or current architecture requires a deviation record.

Deviation record format:

```text
Deviation ID:
Requested by:
Date:
Affected module:
Blueprint reference:
Current repo reference:
Reason:
Options considered:
Chosen path:
Risk:
Rollback path:
Approval:
Validation evidence:
```

Automatic rejection criteria:

- Weakens security.
- Deletes historical business records.
- Introduces paid dependency without approval.
- Replaces foundational architecture without approval.
- Removes required Beta workflow.
- Hides missing functionality behind mock data.

## Production Assembly Evidence

Every assembled block must produce evidence:

- Source blueprint reference.
- Target files changed.
- Contracts implemented.
- Tests run.
- Browser routes tested.
- Security impact.
- Data impact.
- Known gaps.
- Rollback path.

No block is complete without evidence.

## Final Assembly Rule

The assembly team is not designing while stacking floors.

KIMI creates and validates the engineered blueprint. Codex assembles against that blueprint inside SLASH-CRM with disciplined control. Any gap is isolated, owned, measured, closed, and validated.
