# SLASH-CRM

SLASH-CRM is a modern CRM prototype for client-service businesses that need a cleaner way to manage the full customer lifecycle, from prospecting and onboarding to revenue visibility, reporting, retention, and offboarding.

The current build presents a polished front-end experience for an agency-focused CRM product, with dashboard workflows, client views, onboarding flows, earnings tracking, and reporting screens designed to validate the product direction before backend implementation.

## Overview

This repository contains a React and TypeScript application built with Vite. The product experience is designed around agency operations and client lifecycle management, with an emphasis on:

- prospect and pipeline visibility
- structured onboarding workflows
- client records and client detail views
- earnings and revenue tracking
- reporting and performance summaries
- service management
- offboarding workflows
- settings and integration surfaces

The app currently uses mock data and front-end flows to demonstrate the intended product behavior and UI direction.

## Current Product Scope

The prototype includes the following major sections:

- Landing page for the CRM product experience
- Dashboard with KPI cards, charts, activity feed, onboarding preview, and AI-style quick actions
- Clients directory with filtering, pagination, and detailed client drill-down
- Client detail workspace with overview, earnings, onboarding, services, activity, and documents tabs
- Prospects pipeline views
- Onboarding workspace with phased setup flows and task tracking
- Offboarding workflow management
- Earnings and revenue reporting screens
- Services management views
- Reports generation and scheduling experience
- Settings area for team, roles, notifications, API, and integration concepts

## Tech Stack

- React 19
- TypeScript
- Vite 7
- React Router 7
- Tailwind CSS 3
- Radix UI
- shadcn-style component patterns
- Framer Motion
- Recharts
- Lucide React

## Project Structure

```text
SLASH-CRM/
├── public/                 Static assets and product imagery
├── src/
│   ├── app/                App shell, providers, and route definitions
│   ├── components/         Shared layout and UI building blocks
│   ├── features/           Market-critical workflow modules
│   ├── hooks/              Utility hooks
│   ├── lib/                Shared helpers
│   ├── mocks/              Mock data powering the prototype
│   ├── pages/              Route-level screens
│   ├── types/              Shared generated/project types
│   ├── App.css             App-specific styles
│   ├── index.css           Global styles
│   └── main.tsx            App bootstrap
├── docs/                   Setup, deployment, release, and import notes
├── supabase/               Database migrations and Edge Function scaffolds
├── MASTER_PLAN.md          Product and architecture planning document
├── info.md                 Environment and generated component notes
└── package.json            Scripts and dependencies
```

## Routes Included

The app currently ships with these primary routes:

- `/` - product landing page
- `/app` - main dashboard
- `/app/clients`
- `/app/clients/:id`
- `/app/prospects`
- `/app/onboarding`
- `/app/offboarding`
- `/app/earnings`
- `/app/services`
- `/app/reports`
- `/app/settings`

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Install

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Create a production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Development Notes

- This is currently a front-end prototype and product exploration build.
- The application is powered by mock data in `src/mocks/`.
- No production authentication, database, billing, or third-party integrations are wired yet.
- `MASTER_PLAN.md` captures the broader vision for evolving this prototype into a production-ready CRM platform.

## Product Direction

The long-term goal of SLASH-CRM is to become an operations-focused CRM for agencies and service businesses that need more than a traditional sales pipeline. The product direction centers on unifying:

- lead and client management
- service delivery workflows
- client onboarding and offboarding
- revenue attribution and ROI visibility
- reporting automation
- retention and account health tracking

## Repository Status

Current status: active prototype / UI foundation

Recommended next steps:

- connect the UI to a real backend and database
- define authentication and user roles
- convert mock data into live services
- add form persistence and validation workflows
- introduce deployment and CI

## License

No license has been added yet. If this repository is intended for public reuse, add a license before accepting outside contributions or redistribution.
