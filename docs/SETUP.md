# Setup

SLASH-CRM is a Vite, React, TypeScript, Tailwind, and Supabase-first CRM project.

Use this document to set up a local development environment from a fresh clone.

## Requirements

- Node.js 20 or newer.
- npm.
- Git.
- Supabase account for backend work.
- Vercel account for deployment work.

Recommended optional tools:

- Supabase CLI.
- GitHub CLI.
- A browser for local UI verification.

## Fresh Clone Setup

```bash
git clone https://github.com/lanrcaz/SLASH-CRM.git
cd SLASH-CRM
npm install
cp .env.example .env.local
```

Do not commit `.env.local`.

## Local Environment Variables

Client-safe values:

```bash
VITE_APP_ENV=local
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Server-only values:

```bash
SUPABASE_PROJECT_REF=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
SENTRY_DSN=
POSTHOG_KEY=
```

Rules:

- Values prefixed with `VITE_` are exposed to the browser.
- Service role keys and provider secrets must never use the `VITE_` prefix.
- Leave Supabase values empty only while working on UI-only areas.
- Backend and auth tasks require real Supabase values.

## Run The App Locally

Port `3000` is reserved on the owner machine. Use a high Vite port.

```bash
npm run dev -- --host 127.0.0.1 --port 5180 --strictPort
```

If `5180` is busy, use another high port:

```bash
npm run dev -- --host 127.0.0.1 --port 5181 --strictPort
```

Open:

```text
http://127.0.0.1:5180/#/app
```

## Quality Checks

Run these before reporting a coding task complete:

```bash
npm run lint
npm run typecheck
npm run build
```

If a task changes UI behavior, also browser-test the affected route.

## Supabase Setup

1. Create a Supabase project.
2. Copy project URL into `VITE_SUPABASE_URL`.
3. Copy anon key into `VITE_SUPABASE_ANON_KEY`.
4. Copy project ref into `SUPABASE_PROJECT_REF`.
5. Keep service role key server-side only.
6. Run migrations from `supabase/migrations`.
7. Configure auth redirect URLs.
8. Seed the six agency services when seed data is ready.

Local redirect URLs to allow in Supabase Auth:

```text
http://127.0.0.1:5180
http://localhost:5180
```

Add staging and production URLs after Vercel setup.

## Database Types

Generated database types should live at:

```text
src/types/database.ts
```

When schema changes, regenerate types and update imports that depend on them.

The exact generation command depends on whether the Supabase CLI is installed and authenticated. A typical command is:

```bash
supabase gen types typescript --project-id "$SUPABASE_PROJECT_REF" > src/types/database.ts
```

## Development Workflow

1. Read `AGENTS.md`.
2. Pick a task from `docs/BETA_EXECUTION_PLAN.md`.
3. Confirm file ownership.
4. Implement the smallest complete vertical slice.
5. Run quality checks.
6. Browser-test if UI changed.
7. Update docs if setup, env vars, architecture, or behavior changed.
8. Commit only the intended files.

## Troubleshooting

### Port Is Already In Use

Use another high port and keep `--strictPort`:

```bash
npm run dev -- --host 127.0.0.1 --port 5182 --strictPort
```

### Supabase Env Missing

UI-only routes may still run, but auth and persistence tasks require:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Typecheck Fails After Schema Change

Regenerate `src/types/database.ts`, then update feature query/mutation types.

### Build Passes But App Is Blank

Check:

- Browser console errors.
- Missing env values.
- Route path.
- Lazy route import errors.
- Global CSS conflicts.
