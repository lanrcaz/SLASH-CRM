# Documentation Index

This folder contains the operating system for building SLASH-CRM from prototype to Beta and then to market.

## Start Here

Read in this order when onboarding a new human or agent:

1. `../AGENTS.md`
2. `PRODUCTION_ASSEMBLY_PROTOCOL.md`
3. `KIMI_BLUEPRINT_CONTRACT.md`
4. `CODEX_ASSEMBLY_PROTOCOL.md`
5. `GAP_REGISTER.md`
6. `BUILD_ROADMAP.md`
7. `SWARM_ORCHESTRATION.md`
8. `BETA_EXECUTION_PLAN.md`
9. `KIMI_AGENT_PROMPTS.md`
10. `ARCHITECTURE.md`
11. `SUPABASE_DB_MAPPING.md`
12. `FEATURE_ACCEPTANCE_CRITERIA.md`
13. `THIRD_PARTY_SERVICE_MAP.md`
14. `SETUP.md`
15. `RELEASE_CHECKLIST.md`

## Core Planning

| Document | Purpose |
| --- | --- |
| `PRODUCTION_ASSEMBLY_PROTOCOL.md` | Mission-critical no-rebuild assembly model and 99%+ readiness gates. |
| `KIMI_BLUEPRINT_CONTRACT.md` | Required KIMI 2.6 blueprint package structure and artifact contract. |
| `CODEX_ASSEMBLY_PROTOCOL.md` | Codex integration, adapter, route-resolution, and validation protocol. |
| `GAP_REGISTER.md` | Live measurable delta register for gaps, owners, closure routes, and evidence. |
| `BUILD_ROADMAP.md` | Roadmap from platform spine to Beta, v1, and market launch. |
| `ARCHITECTURE.md` | App architecture, module boundaries, data flow, and quality gates. |
| `AGENT_OPERATING_MODEL.md` | How Codex acts as project orchestrator and system architect. |
| `SWARM_ORCHESTRATION.md` | Multi-agent rules, role boundaries, waves, dependencies, and review flow. |
| `BETA_EXECUTION_PLAN.md` | Task-level Beta backlog with IDs, dependencies, file scopes, and acceptance criteria. |
| `KIMI_AGENT_PROMPTS.md` | Prompt templates for assigning KIMI 2.6 agents and reviewing their work. |

## Implementation References

| Document | Purpose |
| --- | --- |
| `SUPABASE_DB_MAPPING.md` | Database table map, RLS model, Edge Function map, missing table plan. |
| `THIRD_PARTY_SERVICE_MAP.md` | Required and deferred third-party services, env vars, and rollout order. |
| `FEATURE_ACCEPTANCE_CRITERIA.md` | Feature definitions of done for Beta workflows. |
| `SETUP.md` | Local setup, environment setup, Supabase setup, and troubleshooting. |
| `DEPLOYMENT.md` | Vercel, Supabase, staging, production, and post-deploy checks. |
| `DATA_IMPORT.md` | Import order, CSV requirements, validation, and rollback strategy. |
| `RELEASE_CHECKLIST.md` | Beta release gates across product, data, security, QA, and launch. |

## Source Of Truth Rules

- `MASTER_PLAN.md` is the long-form product vision.
- `BUILD_ROADMAP.md` is the execution roadmap.
- `BETA_EXECUTION_PLAN.md` is the agent task board.
- `SUPABASE_DB_MAPPING.md` is the database planning source.
- `PRODUCTION_ASSEMBLY_PROTOCOL.md` is the mission-critical assembly source.
- `GAP_REGISTER.md` is the measurable delta source.
- `AGENTS.md` is the root instruction file for autonomous coding agents.

If documents conflict, follow this priority:

1. User instructions in the current task.
2. `AGENTS.md`.
3. `PRODUCTION_ASSEMBLY_PROTOCOL.md`.
4. `CODEX_ASSEMBLY_PROTOCOL.md`.
5. `KIMI_BLUEPRINT_CONTRACT.md`.
6. `GAP_REGISTER.md`.
7. `BETA_EXECUTION_PLAN.md`.
8. `SUPABASE_DB_MAPPING.md`.
9. `ARCHITECTURE.md`.
10. `BUILD_ROADMAP.md`.
11. `MASTER_PLAN.md`.

## Current Build Priority

The immediate build priority is:

1. Supabase client and env validation.
2. Auth module and protected routes.
3. Organization context and role helpers.
4. Services persistence.
5. Clients persistence.
6. Leads persistence.
7. Lead intake and lead conversion Edge Functions.

Do not start AI, client portal, paid SEO APIs, Google Ads, or Meta Ads until the Beta core passes the release checklist.
