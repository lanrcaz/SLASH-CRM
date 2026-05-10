# Gap Register

This register tracks the measurable delta between current SLASH-CRM state and the 99%+ production-success threshold.

Every unresolved mismatch, missing dependency, failed validation, blocked route, or accepted risk must be recorded here.

## Status Values

| Status | Meaning |
| --- | --- |
| open | Gap exists and work has not started |
| in-progress | Owner is actively closing the gap |
| blocked | Cannot proceed without external input or dependency |
| validation | Fix exists and is being verified |
| closed | Gap is resolved and evidence is recorded |
| accepted | Gap remains but owner accepted risk for current release |
| deferred | Valid gap, but outside current release scope |

## Severity Values

| Severity | Meaning | Release Impact |
| --- | --- | --- |
| P0 | Blocks auth, data integrity, security, build, deployment, or critical workflow | Must close |
| P1 | Material workflow/reliability gap with possible workaround | Must close or accept |
| P2 | Non-blocking improvement | Can defer |
| P3 | Future roadmap item | Can defer |

## Gap Record Template

```text
Gap ID:
Severity:
Status:
Owner:
Created:
Updated:
Blueprint reference:
Repo reference:
Affected module:
Blocked route:
Description:
Impact:
Root cause:
Closure path:
Validation checkpoint:
Evidence:
Decision:
```

## Current Baseline Gaps

These baseline gaps are known before receiving the KIMI 2.6 blueprint package.

| Gap ID | Severity | Status | Owner | Affected Area | Description | Closure Path | Validation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| GAP-P0-001 | P0 | open | Platform Agent | Auth | Supabase auth is not wired into the app. | Implement `P0-AUTH-001`. | Sign in/out smoke test passes. |
| GAP-P0-002 | P0 | open | Platform Agent | Organization context | App does not yet resolve organization membership and role context. | Implement `P0-ORG-001`. | Feature queries receive `organizationId` and role. |
| GAP-P0-003 | P0 | open | Platform Agent | Supabase client | App does not yet have a typed Supabase client integration. | Implement `P0-SUPABASE-001`. | Supabase client imports and build passes. |
| GAP-P0-004 | P0 | open | Feature Agents | Persistence | Core pages still rely on mock data. | Wire services, clients, leads, proposals, and activities to Supabase. | Refresh-safe CRUD smoke tests pass. |
| GAP-P0-005 | P0 | open | Backend Agent | Lead intake | Public lead intake function is documented but not implemented. | Implement `P2-LEADINTAKE-001`. | Public form creates lead with attribution. |
| GAP-P0-006 | P0 | open | Backend Agent | Lead conversion | Convert lead function is documented but not implemented. | Implement `P2-CONVERT-001`. | Won lead creates client, services, onboarding. |
| GAP-P1-001 | P1 | open | Revenue Agent | Dashboard | Dashboard metrics are not fully database-derived. | Implement `P1-DASHBOARD-001`. | MRR and pipeline values match records. |
| GAP-P1-002 | P1 | open | Reports Agent | Exports | CSV exports are not implemented for Beta operations. | Implement `P3-EXPORTS-001`. | Exported CSV matches current org records. |
| GAP-P1-003 | P1 | open | Platform Agent | Deployment | Staging deployment is not verified. | Implement `P4-DEPLOY-001`. | Staging smoke test passes. |

## KIMI Blueprint Intake Gaps

Add KIMI-specific gaps here after blueprint package intake.

| Gap ID | Severity | Status | Owner | Blueprint Reference | Repo Reference | Description | Closure Path | Validation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| GAP-KIMI-A0-001 | P0 | closed | KIMI Swarm / Blueprint Intake Agent | `FROM KIMI SWARM/SLASH-CRM-Beta.tar.gz` | `docs/KIMI_INTAKE_AUDIT_2026-05-10.md` | Original zip fails integrity checks, but replacement tarball extracts cleanly and excludes `node_modules_old_*`. | Use tarball as source artifact and ignore corrupt zip for assembly. | `tar tzf` lists successfully and quarantine extraction succeeds. |
| GAP-KIMI-A0-002 | P0 | closed | KIMI Swarm / Blueprint Intake Agent | `FROM KIMI SWARM/SLASH-CRM-Beta.tar.gz` | `/tmp/slash-crm-kimi-intake-tar` | Original zip extraction missed critical source files; tarball includes clients queries, dashboard hooks/queries, and full leads module files. | Use tarball as source artifact. | Previously missing files are present with real content and imports can be mapped. |
| GAP-KIMI-A0-003 | P0 | blocked | KIMI Swarm / QA Agent | Latest tar quarantine package | `/tmp/slash-crm-kimi-intake-latest` | KIMI latest tar package still fails `npm run typecheck` and `npm run build` on `src/pages/Offboarding.tsx(1193,11): error TS1005: ')' expected`. Any package-internal claim that this gap is closed is rejected until commands pass in quarantine. | Fix syntax error and provide passing quality-gate evidence, or authorize Codex salvage before assembly. | `npm run typecheck` and `npm run build` pass in quarantine. |
| GAP-KIMI-A0-004 | P1 | open | KIMI Swarm / QA Agent | Latest tar quarantine package | `/tmp/slash-crm-kimi-intake-latest` | KIMI latest tar package fails lint with 55 problems, including 37 errors and 18 warnings. | Fix lint errors or provide approved rule-adjustment rationale. | `npm run lint` passes. |
| GAP-KIMI-A0-005 | P1 | open | Security Validation Agent | Edge Function package | `supabase/functions/*/index.ts` | Edge Function CORS behavior requires review before production assembly; `convert-lead` uses wildcard CORS and `lead-intake` can become permissive when no allowlist is configured. | Enforce explicit staging/production allowlists and document env requirements. | Security review passes and function smoke tests pass. |

## Closure Evidence Rules

A gap can be marked closed only when evidence is recorded.

Evidence examples:

- Commit SHA.
- Test command output.
- Browser route tested.
- Migration applied.
- Supabase policy reviewed.
- Staging URL verified.
- Screenshot or report path.
- Orchestrator approval note.

## Production-Success Scoring

Use this scoring model during final assembly review:

```text
Production-success score =
  gate_pass_score
  - open_p0_penalty
  - unaccepted_p1_penalty
  - security_penalty
  - data_integrity_penalty
  - deployment_penalty
```

Automatic below-threshold conditions:

- Any open P0 gap.
- Any critical security gap.
- Any known cross-organization data leak.
- Build failure.
- Staging cannot deploy.
- Operator smoke path fails.

99%+ threshold requires:

- No open P0 gaps.
- No unaccepted P1 gaps.
- No undocumented deviations.
- Release checklist critical gates pass.
