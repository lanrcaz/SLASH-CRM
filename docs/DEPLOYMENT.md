# Deployment

Recommended launch stack:

- Vercel for the Vite frontend
- Supabase for auth, Postgres, storage, row-level security, and Edge Functions
- GitHub Actions for quality checks before deploy

## Environments

- `local`: developer machine
- `staging`: main branch preview / internal testing
- `production`: market-facing app

## Required Vercel Environment Variables

- `VITE_APP_ENV`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Server-only secrets belong in Supabase or deployment secrets, not in Vite client code.
