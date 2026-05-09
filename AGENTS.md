# SLASH-CRM Agent Instructions

This repository is being prepared for autonomous multi-agent execution. Agents should treat this file as the first briefing before reading task-specific docs.

## Product Identity

- Product name: `SLASH-CRM`
- Legacy planning name: `ClientVault`
- Rule: use `SLASH-CRM` in code, README, UI copy, docs, commits, and release language unless a historical quote requires `ClientVault`.

## Mission

Build the Beta of SLASH-CRM: an agency CRM that captures leads, manages clients, tracks services, calculates true MRR, converts won deals into onboarding, and prepares proof-of-value reporting.

The Beta is not a mock demo. A Beta feature must save real data, reload correctly, respect organization permissions, and pass quality checks.

## Mission-Critical Assembly Principle

SLASH-CRM is not being rebuilt.

The existing repository is the target production structure. KIMI 2.6 swarm output must be treated as a hardened blueprint and block package. Codex agents act as the disciplined assembly layer that maps, adapts, integrates, validates, and closes gaps inside the current SLASH-CRM foundation.

If integration friction appears, agents must trace the blueprint, identify the blocked route, register the gap, and apply the narrowest safe recovery path. Friction is not permission to rewrite, duplicate, or drift.

## Required Reading Order

1. `README.md`
2. `docs/PRODUCTION_ASSEMBLY_PROTOCOL.md`
3. `docs/KIMI_BLUEPRINT_CONTRACT.md`
4. `docs/CODEX_ASSEMBLY_PROTOCOL.md`
5. `docs/GAP_REGISTER.md`
6. `docs/BUILD_ROADMAP.md`
7. `docs/SWARM_ORCHESTRATION.md`
8. `docs/BETA_EXECUTION_PLAN.md`
9. `docs/ARCHITECTURE.md`
10. `docs/SUPABASE_DB_MAPPING.md`
11. `docs/FEATURE_ACCEPTANCE_CRITERIA.md`
12. `docs/THIRD_PARTY_SERVICE_MAP.md`
13. `docs/RELEASE_CHECKLIST.md`
14. `MASTER_PLAN.md` for full product background

## Non-Negotiable Rules

- Do not rebuild SLASH-CRM from scratch.
- Do not replace the existing foundation with a generated alternative.
- Do not reinterpret KIMI architecture loosely when a contract exists.
- Do not build fake production features.
- Do not mix mock data into production feature modules.
- Do not introduce paid services without explicit approval.
- Do not hard-delete clients, leads, proposals, activities, or invoices.
- Do not weaken Supabase RLS policies to make UI work.
- Do not store service role keys, OAuth secrets, API keys, or private tokens in Vite client code.
- Do not touch unrelated files.
- Do not revert changes from other agents unless explicitly assigned to resolve a conflict.
- Do not use port `3000`; it is reserved on the owner machine.
- Do register every unresolved P0/P1 mismatch in `docs/GAP_REGISTER.md`.
- Do treat integration failures as route-resolution problems, not rewrite invitations.

## Local Commands

Use these commands from the repository root:

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 5180 --strictPort
npm run lint
npm run typecheck
npm run build
```

If port `5180` is already busy, choose another high port, for example `5181`, `5182`, or `5190`, and use `--strictPort`.

## Quality Gate

Before reporting a coding task as complete, run:

```bash
npm run lint
npm run typecheck
npm run build
```

If the task touches UI behavior, also browser-test the changed route.

If a check cannot be run, report exactly why and what risk remains.

## File Ownership

Agents must respect task file ownership from `docs/BETA_EXECUTION_PLAN.md`.

Default ownership:

| Area | Owner |
| --- | --- |
| `src/features/auth` | Auth agent |
| `src/features/clients` | Clients agent |
| `src/features/services` | Services agent |
| `src/features/leads` | Leads agent |
| `src/features/revenue` | Revenue agent |
| `src/features/onboarding` | Onboarding agent |
| `src/features/reports` | Reports agent |
| `src/integrations/supabase` | Platform or backend agent |
| `supabase/migrations` | Database agent |
| `supabase/functions` | Backend agent |
| `docs` | Orchestrator or docs agent |

If a task needs to edit outside its ownership area, the agent must state the reason in its final report.

## Task Report Format

Every agent final report must include:

- Task ID
- Blueprint reference, when assembling KIMI output
- Gap IDs opened or closed
- Files changed
- What was implemented
- What was intentionally not implemented
- Commands run and results
- Manual browser routes tested, if any
- Risks or follow-up tasks

## Definition Of Done

A task is done only when:

- Implementation matches the task acceptance criteria.
- Data persists when required.
- Loading, empty, error, and success states are handled.
- RLS and organization scoping are respected for data tasks.
- Lint, typecheck, and build pass or a blocker is documented.
- Docs are updated when setup, behavior, env vars, or architecture changes.

## Current Highest Priority

Start with the platform spine:

1. Supabase client and environment validation.
2. Auth module and route protection.
3. Organization bootstrap and role-aware context.
4. Clients and services persistence.
5. Leads persistence and lead intake.

Do not start AI, client portal, Google Ads, Meta Ads, or paid SEO APIs until the Beta core is persistent and usable.
