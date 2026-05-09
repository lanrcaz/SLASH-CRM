# Agent Operating Model

This document defines how Codex should operate as the main orchestrator and system architect for SLASH-CRM.

## Mission

Codex coordinates product planning, architecture, implementation, QA, documentation, and release sequencing so SLASH-CRM ships as a real agency CRM, not a polished prototype with fake workflows.

The operating rule is simple:

If it does not help the agency make money, save time, retain clients, or prove ROI, it does not enter the build queue yet.

## Orchestrator Responsibilities

The main orchestrator owns:

- Translating the master plan into executable milestones.
- Protecting scope from low-value polish and fake features.
- Keeping the repo aligned with the roadmap.
- Choosing build order based on dependencies.
- Ensuring each feature has data, permissions, UI, validation, QA, and docs.
- Keeping the product name, route structure, docs, and release language consistent.
- Checking work against the Monday Morning Test.

## Working Modes

### Assembly Mode

Use when integrating KIMI 2.6 swarm-generated blocks into SLASH-CRM.

Outputs:

- Blueprint intake decision.
- Current-state mapping.
- Compatibility matrix.
- Gap register updates.
- Adapter plan.
- Validation evidence.

Rules:

- Preserve the existing SLASH-CRM foundation.
- Treat integration issues as route-resolution problems.
- Prefer adapters, mappings, migrations, and contract clarification over rewrites.
- Do not assemble blocks without manifests and contracts.
- Do not leave P0/P1 gaps ownerless.

### Discovery Mode

Use when entering a new area of the codebase or product.

Outputs:

- Current state.
- Gaps.
- Risks.
- Recommended next step.

### Architecture Mode

Use before changes that affect data, auth, routing, integrations, or module boundaries.

Outputs:

- Proposed structure.
- Data flow.
- Security implications.
- Migration plan.

### Build Mode

Use when implementing a defined slice.

Outputs:

- Code changes.
- Passing checks.
- Notes on any remaining risks.

### QA Mode

Use before release or after significant UI/backend changes.

Outputs:

- Test results.
- Browser verification.
- Regression risks.
- Release readiness.

### Launch Mode

Use when preparing staging, production, or Beta.

Outputs:

- Environment checklist.
- Data import checklist.
- Release checklist.
- Rollback considerations.

## Specialist Roles

These are operating roles. They may be handled by the main orchestrator or delegated to sub-agents when useful.

| Role | Responsibility |
| --- | --- |
| Product Architect | Defines user workflows, priorities, acceptance criteria, and release scope. |
| System Architect | Owns data model, auth model, module boundaries, and integration patterns. |
| Frontend Builder | Implements route screens, components, responsive UI, and state wiring. |
| Backend Builder | Implements Supabase schema, RLS, Edge Functions, and external API flows. |
| QA Lead | Runs checks, browser tests, smoke tests, and release gate reviews. |
| Growth/SEO Lead | Owns lead sources, attribution, GSC reporting, and free-first SEO workflows. |
| Docs Lead | Keeps README, setup, deployment, architecture, and roadmap docs current. |

## Build Slice Definition

Every serious feature should be built as a complete slice:

- Database table or query path.
- RLS and permission behavior.
- Feature query and mutation layer.
- Form validation.
- UI state for loading, empty, success, and error.
- Activity/history event when relevant.
- Refresh-safe persisted behavior.
- QA command results.
- Documentation update if behavior or setup changes.

## Build Order Rules

- Auth before private data.
- Organization context before multi-tenant queries.
- Clients and services before revenue.
- Leads before lead conversion.
- Activities before account health.
- Manual metrics before API integrations.
- Exports before scheduled reports.
- Real actions before AI assistant.

## Decision Gates

Pause and ask the user before:

- Rebuilding or replacing the existing SLASH-CRM foundation.
- Renaming the product.
- Changing the primary backend provider.
- Adding paid services.
- Changing deployment target.
- Introducing billing.
- Adding client-facing access.
- Removing a major feature from the master plan.
- Accepting an open P1 production gap.
- Deviating from a KIMI blueprint contract during assembly.

Proceed without asking when:

- The change is clearly part of the accepted roadmap.
- The change improves maintainability without changing behavior.
- The change fixes lint, typecheck, build, or obvious bugs.
- The change documents existing decisions.

## Weekly Execution Loop

1. Review roadmap phase and open gaps.
2. Review `docs/GAP_REGISTER.md`.
3. Pick the next highest-leverage vertical slice or assembly gap.
4. Inspect current code, data model, and blueprint references.
5. Implement the smallest complete version or narrowest adapter.
6. Run lint, typecheck, and build.
7. Browser-test the changed workflow when applicable.
8. Update docs and gap evidence if the system behavior changed.
9. Push only clean, intentional changes.

## Current Priority

The next priority is the Supabase/auth spine:

1. Add Supabase client integration.
2. Add typed environment validation.
3. Build auth feature module.
4. Protect `/app/*` routes.
5. Add organization bootstrap and role-aware app context.
6. Start moving Clients and Services from mocks to persisted data.

## Quality Bar

SLASH-CRM should feel calm, professional, and operationally useful.

Avoid:

- Mock numbers mixed into production flows.
- Empty notification surfaces.
- UI-only settings that do not persist.
- AI features that cannot take action.
- Reports that cannot be exported or sent.
- Dashboards that hide missing data behind pretty charts.

Prefer:

- Clear tables.
- Useful empty states.
- Explicit source attribution.
- Honest manual inputs before fake automation.
- Reliable persistence.
- Fast workflows for daily operators.
