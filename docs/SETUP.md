# Setup

SLASH-CRM is currently a Vite + React app with a Supabase-first production path.

## Requirements

- Node.js 20+
- npm
- Supabase project for production data

## Local App

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and fill in the Supabase client values when the backend is connected.

## Quality Checks

```bash
npm run lint
npm run typecheck
npm run build
```
