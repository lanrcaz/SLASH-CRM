# CLIENTVAULT MASTER PLAN
## From Prototype to Shippable CRM — Function-by-Function Architecture

**Date:** 2026-04-27  
**For:** Digital Marketing Agency with 6 Core Services  
**Status:** Research Complete → Planning Phase

---

# SECTION 1: THE REALITY CHECK

## What You Actually Sell (From Your Screenshot)

| Service | Price | Clients | Monthly Revenue | What "Earnings" Actually Means |
|---------|-------|---------|-----------------|-------------------------------|
| Ad Management | $2,500/mo | 24 | $60K | Client's ad ROAS + your management fee |
| SEO Optimization | $1,800/mo | 18 | $32.4K | Client's organic traffic value + your fee |
| Content Marketing | $3,200/mo | 12 | $38.4K | Client's content-driven revenue + your fee |
| Social Media Mgmt | $1,500/mo | 15 | $22.5K | Client's social engagement value + your fee |
| Web Development | $4,000/mo | 8 | $32K | Client's conversion lift from new site + your fee |
| Consulting | $5,000/mo | 10 | $50K | Client's business growth attributed to strategy |
| **TOTAL** | — | **87** | **$235.3K/mo** | **$2.82M ARR** |

## The Critical Insight

Your "earnings tracking" isn't about tracking how much money YOU make from clients.  
**It's about proving to clients that the money THEY spend on you generates ROI.**

When a client pays you $2,500/mo for ads, they need to see:
- "You spent $2,500/mo on our service"
- "Your ads generated $12,000 in revenue"
- "Your ROAS is 4.8x"
- "Without us, you would have lost $12,000"

**This is retention. This is renewals. This is upsells.**

Without this proof, you're just another line item they can cut.

---

# SECTION 2: WHAT MAKES A CRM SHIPPABLE VS PROTOTYPE

## Research Finding: 6 Platforms Analyzed

| Platform | Why Agencies Use It | What Actually Works | What's Just UI Noise |
|----------|-------------------|--------------------|--------------------|
| **HubSpot** | Marketing automation + CRM combined | Email tracking, pipeline, workflows | Overwhelming dashboard, features you pay for but don't use |
| **Pipedrive** | Simple visual pipeline | Drag-drop deals, activity tracking | No project mgmt, no invoicing — just sales |
| **GoHighLevel** | White-label for resellers | Multi-client dashboards, automations | Overbuilt if you don't white-label |
| **Productive.io** | All-in-one (lead → invoice) | Time tracking, budgets, resourcing | Complex setup, steep learning |
| **Zoho CRM** | Cheap + customizable | AI lead scoring, multi-currency | Interface feels dated, setup time |
| **Monday.com** | Visual boards for everything | Kanban + timeline + workload | Not CRM-native, feels like project tool |

## The Production-Ready Checklist

### MUST HAVE (non-negotiable for daily use):

| # | Feature | Why It Must Work | What "Working" Means |
|---|---------|------------------|---------------------|
| 1 | **User Authentication** | Multiple team members, role-based access | Login with email/password, password reset, session management |
| 2 | **Real Database** | Data must persist, not mock | PostgreSQL/Supabase with actual tables, not JSON files |
| 3 | **Client CRUD** | Add, edit, archive clients | Create client → edit details → archive (not delete) → view history |
| 4 | **Service Assignment** | Track which client has which service | One client can have multiple services, each with start date, price, status |
| 5 | **Revenue Tracking** | See MRR per client per service | Sum of all active service prices per client per month |
| 6 | **Lead Pipeline** | Track prospects from inquiry to close | Stages: Lead → Qualified → Proposal Sent → Negotiation → Won/Lost |
| 7 | **Proposal Tracking** | Know what was sent, when, outcome | Proposal value, date sent, status, win/loss reason |
| 8 | **Activity Logging** | Who did what, when | Every call, email, meeting logged with timestamp and user |
| 9 | **Ad Account Integration** | Pull real ad performance data | OAuth to Google Ads/Meta → fetch campaigns → show impressions, clicks, CTR, spend, conversions |
| 10 | **SEO Rank Tracking** | Track keyword positions over time | Daily/weekly keyword position checks for each client |
| 11 | **ROI Calculator** | Show client "you paid X, got Y" | Input: service cost. Output: attributed revenue. Formula: (attributed revenue / service cost) |
| 12 | **Churn Risk Scoring** | Predict who might leave | Algorithm: days since last activity + overdue invoices + support tickets + NPS score |
| 13 | **Team Time Tracking** | Hours spent per client per service | Start/stop timer, manual entry, billable vs non-billable hours |
| 14 | **Invoice Generation** | Bill clients for services rendered | Auto-generate monthly invoices from service assignments + time entries + ad spend |
| 15 | **Export / Reports** | Send data to clients/stakeholders | PDF reports with charts, CSV exports for accounting |

### SHOULD HAVE (adds real value):

| # | Feature | Value Add | Complexity |
|---|---------|-----------|------------|
| 16 | AI Assistant | Natural language queries to data | Medium (OpenAI API + function calling) |
| 17 | Automated Reports | Weekly/monthly client reports emailed | Medium (scheduled jobs + email service) |
| 18 | Client Portal | Clients log in to see their own data | Medium (separate auth role + filtered views) |
| 19 | Goal Setting | Set monthly targets per client per metric | Low (target fields + variance calculation) |
| 20 | Competitor Tracking | Monitor competitor ad spend/keywords | High (3rd party data providers) |
| 21 | Call Recording Integration | Log calls from dialer | Medium (Twilio/RingCentral API) |
| 22 | Email Integration | Sync Gmail/Outlook conversations | High (Google/Microsoft OAuth + email parsing) |
| 23 | Slack Notifications | Alert channel when pipeline moves | Low (webhook integration) |
| 24 | Calendar Integration | Schedule meetings from CRM | Medium (Google/Outlook calendar API) |

### NICE TO HAVE (differentiators):

| # | Feature | When to Build | Why Not Now |
|---|---------|---------------|-------------|
| 25 | AI Content Generation | Scale content marketing offering | Requires content strategy first |
| 26 | Automated A/B Test Runner | For ad management service | Requires ad API integration first |
| 27 | Predictive Revenue Forecasting | 3-month revenue predictions | Need 6+ months of real data |
| 28 | White-Label Portal | Rebrand for agency resellers | Need client portal proven first |
| 29 | Mobile App | Field sales / on-the-go | Web app responsive is enough for v1 |
| 30 | Multi-Currency | International clients | Current clients likely USD only |

---

# SECTION 3: THE "HANGING FEATURES" DEATH LIST

## Features That Look Good But Add Zero Value (DO NOT BUILD)

| Feature | Why It Looks Good | Why It's Useless | Our Decision |
|---------|-------------------|-----------------|-------------|
| Animated confetti on milestones | "Celebrates success" | No one cares. It's a distraction. | **CUT** |
| 3D tilt effects on cards | "Premium feel" | Wastes dev time, breaks on mobile | **CUT** |
| Fake "AI projections" with no real data | "Looks smart" | Random numbers = distrust | **CUT** until we have real prediction model |
| ChatGPT wrapper that can't take actions | "AI powered" | If it can't update a record, it's just a chatbot | **CUT** until function calling is implemented |
| "Prospect pipeline" without real lead sources | "We have a CRM" | If leads come from manual entry only, it's a spreadsheet | **FIX** — must integrate with website forms |
| "Earnings chart" with mock data | "Visual dashboard" | Fake data on demo = lying to yourself | **FIX** — must pull from real integrations |
| "Onboarding wizard" with no document upload | "Streamlined" | If client can't upload assets, it's broken | **FIX** — file storage required |
| "Reports" that can't be emailed | "We have reporting" | If you can't send it, you don't have reporting | **FIX** — email delivery required |
| Settings page with non-persistent changes | "Customizable" | Changes lost on refresh = waste of time | **FIX** — all settings must save to DB |
| Notification bell with no real notifications | "Users get alerts" | Empty notification panel = disappointment | **FIX** — only add when events trigger notifications |

## The Golden Rule

> **If a feature can't survive the "Monday Morning Test," don't build it.**
> 
> The Monday Morning Test: *"On Monday at 9am, would a team member use this feature to make money, save time, or keep a client?"*
> 
> If the answer is no or "maybe," it's a hanging feature.

---

# SECTION 4: FUNCTION-BY-FUNCTION ARCHITECTURE

## 4.1 CLIENT MANAGEMENT MODULE

### Purpose
The core record of every person/company that pays you or might pay you.

### Data Model

```
CLIENT
├── id (UUID)
├── name (string, required)
├── company_name (string)
├── email (string, unique, required)
├── phone (string)
├── website (string)
├── industry (enum: tech/healthcare/ecommerce/real_estate/other)
├── status (enum: lead/prospect/active/paused/churned)
├── health_score (integer 0-100, computed)
├── created_at (timestamp)
├── updated_at (timestamp)
├── assigned_to (user_id, FK)
├── notes (text)
├── tags (array of strings)
└── custom_fields (JSONB — for flexibility)

CLIENT_SERVICE (junction table — many-to-many with attributes)
├── id (UUID)
├── client_id (FK)
├── service_id (FK)
├── status (enum: pending/active/paused/cancelled)
├── monthly_price (decimal)
├── start_date (date)
├── end_date (date, nullable)
├── contract_type (enum: month-to-month/3-month/6-month/12-month)
├── auto_renew (boolean)
└── created_at (timestamp)
```

### Functional Requirements

| # | Function | Priority | Beta | v1 | v2 |
|---|----------|----------|------|-----|-----|
| 1 | Create client with basic info | P0 | ✅ | ✅ | ✅ |
| 2 | Assign multiple services to client | P0 | ✅ | ✅ | ✅ |
| 3 | Edit client details | P0 | ✅ | ✅ | ✅ |
| 4 | Archive client (soft delete, keep history) | P0 | ✅ | ✅ | ✅ |
| 5 | View client timeline (all activities) | P0 | ✅ | ✅ | ✅ |
| 6 | Client health score (computed from activity) | P1 | — | ✅ | ✅ |
| 7 | Custom fields per client | P2 | — | — | ✅ |
| 8 | Client portal login (separate role) | P2 | — | — | ✅ |

### What "Working" Means
- I can add "Acme Corp" as a client
- I can assign them "Ad Management" at $2,500/mo starting today
- I can change it to paused if they stop paying
- Their history is always visible even if they churn
- The dashboard shows "$2,500/mo from Acme Corp"

---

## 4.2 SERVICE CATALOG MODULE

### Purpose
Define what you sell, for how much, and track performance of each offering.

### Data Model

```
SERVICE
├── id (UUID)
├── name (string, required)
├── description (text)
├── category (enum: ads/seo/content/social/web/consulting)
├── base_price (decimal, monthly retainer)
├── billing_type (enum: flat_fee/hourly/percentage_of_spend)
├── deliverables (array of strings — what client gets)
├── expected_hours_per_month (integer — for cost calc)
├── is_active (boolean)
├── created_at (timestamp)
└── updated_at (timestamp)

SERVICE_METRIC_TEMPLATE
├── id (UUID)
├── service_id (FK)
├── metric_name (string — e.g., "ROAS", "Organic Traffic", "Keyword Rankings")
├── metric_type (enum: currency/percentage/number/count)
├── target_value (decimal — what's "good")
├── data_source (enum: manual/google_ads/meta_ads/google_analytics/semrush)
└── is_required (boolean — must have this to show "healthy")
```

### Your 6 Services Defined

| Service | Billing Type | Key Metrics to Track | Data Source |
|---------|-------------|---------------------|-------------|
| Ad Management | Flat fee + % of spend | ROAS, CTR, CPC, Conversions, Spend | Google Ads API, Meta Marketing API |
| SEO | Flat fee | Query visibility, Average position, Organic traffic, CTR, Pages indexed | Google Search Console API, GA4 |
| Content Marketing | Flat fee | Blog traffic, Social shares, Email open rate, Leads generated | GA4, Mailchimp/ConvertKit API |
| Social Media Mgmt | Flat fee | Follower growth, Engagement rate, Reach, Conversions | Meta API, LinkedIn API, GA4 |
| Web Development | Hourly or project | Page load speed, Conversion rate, Uptime, Bug count | GTmetrix, GA4, Uptime monitors |
| Consulting | Hourly | Strategic milestones completed, Revenue impact, NPS | Manual + client-reported |

### Functional Requirements

| # | Function | Priority | Beta | v1 | v2 |
|---|----------|----------|------|-----|-----|
| 1 | Define service with price and description | P0 | ✅ | ✅ | ✅ |
| 2 | Track how many clients per service | P0 | ✅ | ✅ | ✅ |
| 3 | Calculate total MRR per service | P0 | ✅ | ✅ | ✅ |
| 4 | Define metrics each service should track | P1 | — | ✅ | ✅ |
| 5 | Show service "health" (are metrics hitting targets?) | P1 | — | ✅ | ✅ |
| 6 | Service profitability (revenue minus delivery cost) | P2 | — | — | ✅ |

---

## 4.3 LEAD & PIPELINE MODULE

### Purpose
Track every potential client from first contact to signed contract (or lost).

### Research Finding: B2B Agency Lead Sources

| Source | Typical % of Leads | Win Rate | CAC | Notes |
|--------|-------------------|----------|-----|-------|
| Referrals | 30-40% | 50-70% | Low | Best quality, trust already established |
| Website / Inbound | 20-30% | 15-25% | Medium | Content, SEO, forms |
| Paid Ads (your own) | 10-15% | 10-20% | High | Google/Meta ads for your agency |
| Cold Outreach | 10-15% | 5-15% | High | LinkedIn, email, cold calling |
| Events / Networking | 5-10% | 20-35% | Medium | Conferences, meetups |
| Partnerships | 5-10% | 25-40% | Low | Referral partners, agencies |

### Data Model

```
LEAD (also called Prospect)
├── id (UUID)
├── client_id (FK, nullable — if converted)
├── contact_name (string, required)
├── company_name (string, required)
├── contact_email (string)
├── contact_phone (string)
├── website (string)
├── source (enum: referral/website/ads/cold_outreach/event/partnership/other)
├── source_detail (string — e.g., "John Smith referral", "Google search", "LinkedIn cold email")
├── source_campaign (string, nullable — ad campaign / landing page / UTM campaign)
├── source_channel (string, nullable — e.g., linkedin/google/partner/webinar)
├── first_contact_date (date)
├── first_contact_method (enum: form/phone/email/meeting)
├── service_interest (array of service_ids or service categories)
├── estimated_close_date (date, nullable)
├── status (enum: new/contacted/qualified/proposal_sent/negotiation/won/lost/nurture)
├── estimated_value (decimal — potential monthly retainer)
├── probability (integer 0-100)
├── assigned_to (user_id, FK)
├── last_activity_date (date)
├── next_follow_up_date (date)
├── qualification_score (integer 0-100, nullable)
├── qualification_status (enum: unqualified/working/qualified/disqualified)
├── disqualified_reason (enum: no_budget/no_authority/no_need/no_timeline/bad_fit/spam/other)
├── is_stale (boolean, computed)
├── converted_at (timestamp, nullable)
├── lost_reason (enum: price/competitor/no_budget/timing/no_fit/other)
├── duplicate_of_lead_id (FK, nullable)
├── notes (text)
├── created_at (timestamp)
└── updated_at (timestamp)

PROPOSAL
├── id (UUID)
├── lead_id (FK)
├── services (array of service_ids)
├── total_monthly_value (decimal)
├── one_time_fees (decimal)
├── status (enum: draft/sent/accepted/rejected/expired)
├── sent_date (date)
├── accepted_date (date, nullable)
├── rejected_date (date, nullable)
├── expiry_date (date)
├── document_url (string)
└── notes (text)

LEAD_ACTIVITY
├── id (UUID)
├── lead_id (FK)
├── activity_type (enum: note/call/email/meeting/task/stage_change/proposal_sent)
├── summary (string)
├── activity_date (timestamp)
├── created_by (user_id, FK)
├── next_step (string, nullable)
└── next_step_due_date (date, nullable)
```

### Functional Requirements

| # | Function | Priority | Beta | v1 | v2 |
|---|----------|----------|------|-----|-----|
| 1 | Add lead manually | P0 | ✅ | ✅ | ✅ |
| 2 | Capture lead from website form | P0 | — | ✅ | ✅ |
| 3 | Track lead source and attribution | P0 | — | ✅ | ✅ |
| 4 | Move lead through pipeline stages | P0 | ✅ | ✅ | ✅ |
| 5 | Log every interaction (call, email, meeting) | P0 | ✅ | ✅ | ✅ |
| 6 | Set follow-up reminders | P0 | ✅ | ✅ | ✅ |
| 7 | Create and track proposals | P1 | — | ✅ | ✅ |
| 8 | Win rate by source / service / rep | P1 | — | ✅ | ✅ |
| 9 | Prevent duplicate leads on import/form capture | P1 | — | ✅ | ✅ |
| 10 | Mark stale leads automatically if no next action / no recent activity | P1 | — | ✅ | ✅ |
| 11 | Convert won lead into client + onboarding record in one action | P0 | — | ✅ | ✅ |
| 12 | Qualification scoring (manual first, automated later) | P1 | — | ✅ | ✅ |
| 13 | Lead scoring (automated) | P2 | — | — | ✅ |
| 14 | Automated follow-up sequences | P2 | — | — | ✅ |

### Qualification Rule (Recommended)

Use a simple qualification system in v1 before adding "AI scoring":

```text
BANT-lite for agencies
- Budget: Can they afford the minimum service package?
- Authority: Are we talking to a decision-maker?
- Need: Is there a real service problem to solve?
- Timeline: Is there a live buying window?

Qualified = at least 3 of 4 are true
Disqualified = clear bad fit, no budget, or no timeline
Nurture = good fit, but not ready now
```

### Pipeline Operating Rules

- Every open lead must have an `owner`, `next_follow_up_date`, and `next_step`.
- A lead becomes `stale` if no activity is logged for 7 business days.
- A proposal cannot move to `won` unless at least one service is attached.
- Converting a lead to `won` should automatically:
  - create the client record if it does not exist
  - create the initial client-service assignments
  - create the onboarding record
  - preserve the full lead activity history
- Lost and disqualified leads should never be deleted; they are reporting data.

### Key Formulas

```
Win Rate = (Won Proposals / Total Proposals) × 100
Target: 25-35% overall, 50%+ for referrals

Average Contract Value (ACV) = Total Monthly Revenue from Won / Number of Won

Pipeline Value = Sum of (Estimated Value × Probability) for all open leads

Sales Cycle Length = Average days from Lead Created → Proposal Won

Lead Response Time = First Sales Activity - Lead Created
Target: <1 business day for inbound leads

Stale Lead Rate = Leads with is_stale = true / Total Open Leads
Target: <10%
```

---

## 4.4 AD MANAGEMENT & TRACKING MODULE

### Purpose
Pull real ad performance data from Google Ads and Meta to show clients ROI.

### Research: API Reality

| Platform | API Cost | Rate Limits | Setup Complexity | Data Freshness |
|----------|----------|-------------|-------------------|----------------|
| **Google Ads API** | Free | 10,000 ops/day per account | Medium — needs Manager Account + OAuth | Near real-time |
| **Meta Marketing API** | Free | 200 calls/hr (dev), 9,000 pts (standard) | Medium — needs Business Manager + App Review | 15-min delay |
| **LinkedIn Campaign Manager** | Free | 100 calls/day (basic), 500 (standard) | High — needs partner program approval | Hourly |
| **Google Analytics 4** | Free | 1,200 requests/hour per property | Low — simple API key | Hourly |

### Data Model

```
AD_ACCOUNT
├── id (UUID)
├── client_id (FK)
├── platform (enum: google_ads/meta_ads/linkedin_ads)
├── external_account_id (string — the platform's ID)
├── account_name (string)
├── currency (string)
├── timezone (string)
├── status (enum: active/paused/disconnected/error)
├── oauth_token (encrypted string)
├── token_expires_at (timestamp)
├── last_sync_at (timestamp)
└── created_at (timestamp)

AD_CAMPAIGN (synced from platform APIs)
├── id (UUID)
├── ad_account_id (FK)
├── external_campaign_id (string)
├── campaign_name (string)
├── status (enum: active/paused/removed)
├── start_date (date)
├── end_date (date, nullable)
├── budget_type (enum: daily/lifetime)
├── budget_amount (decimal)
└── created_at (timestamp)

AD_METRIC (daily snapshots)
├── id (UUID)
├── campaign_id (FK)
├── date (date)
├── impressions (integer)
├── clicks (integer)
├── spend (decimal)
├── conversions (decimal)
├── conversion_value (decimal)
├── ctr (decimal)
├── cpc (decimal)
├── roas (decimal) -- calculated: conversion_value / spend
└── created_at (timestamp)
```

### Functional Requirements

| # | Function | Priority | Beta | v1 | v2 |
|---|----------|----------|------|-----|-----|
| 1 | Connect Google Ads account via OAuth | P0 | — | ✅ | ✅ |
| 2 | Connect Meta Ads account via OAuth | P0 | — | ✅ | ✅ |
| 3 | Sync campaigns list | P1 | — | ✅ | ✅ |
| 4 | Sync daily metrics (spend, clicks, conversions) | P1 | — | ✅ | ✅ |
| 5 | Calculate ROAS per campaign | P1 | — | ✅ | ✅ |
| 6 | Show trend charts (spend vs revenue) | P1 | — | ✅ | ✅ |
| 7 | Alert when ROAS drops below target | P2 | — | — | ✅ |
| 8 | Compare period-over-period | P2 | — | — | ✅ |
| 9 | Connect LinkedIn Ads | P3 | — | — | ✅ |
| 10 | Automated budget pacing alerts | P3 | — | — | ✅ |

### Technical Implementation

```javascript
// Google Ads API — Simplified Flow
1. User clicks "Connect Google Ads"
2. Redirect to Google OAuth (scope: https://www.googleapis.com/auth/adwords)
3. Google redirects back with authorization code
4. Exchange code for access_token + refresh_token
5. Store refresh_token (encrypted) in database
6. Use refresh_token to get new access_token every hour
7. Call Google Ads API with developer token + access_token
8. Pull campaign data: CustomerService → CampaignService → AdGroupService
9. Pull metrics: ReportService with date range
10. Store in your database
11. Schedule daily sync via cron job / background worker
```

**Critical Note:** Google Ads API requires a **Developer Token** that takes 1-2 weeks to get approved. Apply early.

---

## 4.5 SEO TRACKING MODULE

### Purpose
Track keyword rankings and organic traffic to prove SEO value.

### Data Model

```
SEO_PROJECT
├── id (UUID)
├── client_id (FK)
├── domain (string)
├── target_location (string — e.g., "United States")
├── search_engine (enum: google/bing)
├── status (enum: active/paused)
└── created_at (timestamp)

KEYWORD
├── id (UUID)
├── seo_project_id (FK)
├── keyword (string)
├── search_volume (integer, monthly)
├── difficulty_score (integer 0-100)
├── current_position (integer)
├── previous_position (integer)
├── position_change (integer)
├── url_ranking (string)
├── last_checked (date)
└── created_at (timestamp)

SEO_METRIC (weekly snapshots)
├── id (UUID)
├── seo_project_id (FK)
├── date (date)
├── organic_traffic (integer)
├── organic_keywords_count (integer)
├── domain_authority (integer)
├── backlinks_count (integer)
├── pages_indexed (integer)
└── created_at (timestamp)

GSC_QUERY_SNAPSHOT (daily snapshots from Google Search Console)
├── id (UUID)
├── seo_project_id (FK)
├── date (date)
├── query (string)
├── page_url (string, nullable)
├── country (string, nullable)
├── device (enum: desktop/mobile/tablet, nullable)
├── clicks (integer)
├── impressions (integer)
├── ctr (decimal)
├── average_position (decimal)
└── created_at (timestamp)

SEO_TARGET_KEYWORD
├── id (UUID)
├── seo_project_id (FK)
├── keyword (string)
├── target_page_url (string, nullable)
├── target_country (string, nullable)
├── target_device (enum: desktop/mobile/tablet, nullable)
├── priority (enum: low/medium/high)
├── source (enum: manual/gsc/serpbear/import)
└── created_at (timestamp)
```

### API Options

| Provider | Price | Keyword Limit | Update Frequency | Accuracy |
|----------|-------|--------------|------------------|----------|
| **SEMrush** | $120/mo (API plan) | 10,000/day | Daily | High |
| **Ahrefs** | $99/mo (API plan) | 25,000/day | Daily | High |
| **SerpAPI** | $50/mo | 5,000/mo | On-demand | Medium |
| **DataForSEO** | Pay-per-use (~$0.001/keyword) | Unlimited | On-demand | Medium |
| **Google Search Console** | Free | All your keywords | Daily | High (your own data only) |

### Free-First SEO Decision

Do not start SEO tracking with SEMrush/Ahrefs. Start with Google Search Console because it is official, free, and good enough for the first market version when clients can grant access to their properties.

Google Search Console gives:

- queries
- pages
- clicks
- impressions
- CTR
- average position
- country/device breakdowns
- sitemap and URL inspection data

What it does not give:

- competitor keyword rankings
- backlink index quality like Ahrefs
- keyword difficulty scores
- search volume for arbitrary non-ranking keywords
- exact clean-room rank checks for keywords where the client site has no impressions

### Open-Source / GitHub Options Reviewed

| Tool | Free? | What It Can Do | Limitation | Decision |
|------|-------|----------------|------------|----------|
| **Google Search Console API** | Free | Official query/page performance, clicks, impressions, CTR, average position | Only verified properties; not competitor research | **Primary SEO source for Beta/v1** |
| **thenguyenvn90/claude-search-console** | Free/open source | Google Search Console CLI + Claude Code skills for SEO analysis workflows | Useful for agent/report workflows, not a production SaaS backend by itself | **Use as implementation inspiration / internal analysis skill** |
| **jakenuts/agent-skills/google-search-console** | Free/open source | Claude skill for Search Console analysis, URL inspection, sitemap workflows | Assistant workflow, not persistent product infrastructure | **Useful for operator analysis, not core product** |
| **SerpBear** | Free/open source MIT | Self-hosted rank tracker, unlimited keywords, email alerts, SERP API, GSC integration | Exact rank tracking still relies on scraping services or proxies; free scraping is limited and fragile | **Optional add-on for exact rank checks** |
| **SerpLynx** | Free/open source claim | Self-hostable SERP rank tracking, notifications, multi-location checks | Newer project; needs production validation before relying on it | **Research later, not v1 core** |
| **Serposcope** | Free/open source | Legacy rank tracker | Archived/read-only and self-described legacy code | **Do not use for production** |
| **claude-seo-audit-skill** | Free skill | SEO audit workflow using GSC + SerpAPI | Requires SerpAPI for keyword research, so not truly free end-to-end | **Do not use as free replacement** |

### Recommended Free SEO Architecture

Use a two-layer SEO model:

1. **Official performance layer:** Google Search Console API pulls daily query/page/device/country snapshots into `GSC_QUERY_SNAPSHOT`.
2. **Target keyword layer:** `SEO_TARGET_KEYWORD` lets the agency choose important keywords and map them to pages.

For each target keyword, show:

- latest average position from GSC when available
- clicks and impressions trend
- CTR trend
- target page performance
- movement over 7/30/90 days
- "missing opportunity" flag when impressions are high but CTR is low
- "ranking opportunity" flag when average position is 8-20 and impressions are meaningful

Only add exact SERP rank checking later with SerpBear if a client specifically needs independent rank checks by city/device. Treat this as an optional module because scraping Google search results is operationally fragile and may require proxies or paid scraping services.

### SEO MVP Output Without Paid APIs

The CRM can still produce valuable SEO reports for free:

- "Top growing queries"
- "Top declining queries"
- "Pages losing impressions"
- "High impression / low CTR opportunities"
- "Keywords ranking positions 8-20"
- "Keyword-to-page map"
- "Organic traffic value estimate"
- "SEO ROI estimate"

This is enough for retention reporting in Beta/v1 because it proves whether SEO work is producing visibility, traffic, and opportunity.

### Functional Requirements

| # | Function | Priority | Beta | v1 | v2 |
|---|----------|----------|------|-----|-----|
| 1 | Connect Google Search Console property | P1 | — | ✅ | ✅ |
| 2 | Pull daily query/page performance snapshots | P1 | — | ✅ | ✅ |
| 3 | Add target keywords per client | P1 | — | ✅ | ✅ |
| 4 | Show GSC average position history chart | P1 | — | ✅ | ✅ |
| 5 | Track organic traffic from GA4 | P1 | — | ✅ | ✅ |
| 6 | Calculate traffic value (what would this cost in ads?) | P2 | — | — | ✅ |
| 7 | Optional exact SERP rank checks via SerpBear | P2 | — | — | ✅ |
| 8 | Competitor keyword gap analysis | P3 | — | — | ✅ |

### The "SEO Value" Formula

```
Organic Traffic Value = Organic Traffic × Average CPC for those keywords

Example:
- Client gets 5,000 organic visits/month
- If bought through Google Ads, would cost $2.50/click
- Organic Traffic Value = 5,000 × $2.50 = $12,500/month
- Client pays you $1,800/month for SEO
- SEO ROI = $12,500 / $1,800 = 6.9x
```

This is the number that keeps SEO clients paying.

---

## 4.6 CONTENT & SOCIAL METRICS MODULE

### Purpose
Track content performance and social media growth.

### Data Model

```
CONTENT_PIECE
├── id (UUID)
├── client_id (FK)
├── title (string)
├── type (enum: blog/video/podcast/email/infographic)
├── url (string)
├── publish_date (date)
├── platform (enum: website/youtube/linkedin/instagram/twitter)
└── created_at (timestamp)

CONTENT_METRIC (weekly)
├── id (UUID)
├── content_piece_id (FK)
├── date (date)
├── views (integer)
├── unique_visitors (integer)
├── engagement_count (integer — likes + shares + comments)
├── leads_generated (integer)
├── conversion_rate (decimal)
└── created_at (timestamp)

SOCIAL_ACCOUNT
├── id (UUID)
├── client_id (FK)
├── platform (enum: instagram/facebook/linkedin/twitter/tiktok)
├── handle (string)
├── followers_count (integer)
├── follower_growth_30d (integer)
├── engagement_rate (decimal)
├── posts_per_week (integer)
└── last_synced (timestamp)
```

### API Reality

| Platform | API Available? | What You Can Pull | Difficulty |
|----------|---------------|-------------------|------------|
| Instagram | Yes (Basic Display + Graph API) | Followers, engagement, posts | Medium |
| Facebook | Yes (Graph API) | Page insights, posts, engagement | Medium |
| LinkedIn | Yes (Marketing API) | Company page stats, posts | High (need partner) |
| Twitter/X | Yes (API v2) | Followers, tweets, engagement | Medium |
| TikTok | Limited (Research API) | Followers, video views | High |
| YouTube | Yes (Data API) | Subscribers, views, engagement | Low |

### Functional Requirements

| # | Function | Priority | Beta | v1 | v2 |
|---|----------|----------|------|-----|-----|
| 1 | Log content pieces with URLs | P2 | — | ✅ | ✅ |
| 2 | Track content views/engagement from GA4 | P2 | — | ✅ | ✅ |
| 3 | Track social follower growth | P2 | — | ✅ | ✅ |
| 4 | Calculate engagement rate | P2 | — | ✅ | ✅ |
| 5 | Link content to leads generated | P2 | — | — | ✅ |
| 6 | Content calendar view | P3 | — | — | ✅ |

---

## 4.7 WEB DEVELOPMENT TRACKING MODULE

### Purpose
Track website performance metrics for web dev clients.

### Data Model

```
WEBSITE_PROJECT
├── id (UUID)
├── client_id (FK)
├── domain (string)
├── hosting_provider (string)
├── cms (enum: wordpress/webflow/custom/nextjs/other)
├── status (enum: development/live/maintenance)
├── launch_date (date, nullable)
└── created_at (timestamp)

WEB_METRIC (daily snapshots)
├── id (UUID)
├── website_project_id (FK)
├── date (date)
├── page_load_time_ms (integer)
├── uptime_percentage (decimal)
├── pagespeed_score_mobile (integer)
├── pagespeed_score_desktop (integer)
├── organic_traffic (integer)
├── conversion_rate (decimal)
├── revenue_attributed (decimal)
└── created_at (timestamp)
```

### Data Sources

| Metric | Source | Frequency | Cost |
|--------|--------|-----------|------|
| Page load time | GTmetrix API, PageSpeed API | Daily | Free |
| Uptime | UptimeRobot, Pingdom | Every 5 min | Free tier available |
| PageSpeed score | Google PageSpeed Insights API | Daily | Free |
| Organic traffic | Google Analytics 4 | Daily | Free |
| Conversion rate | Google Analytics 4 + your platform | Daily | Free |
| Revenue | Client-reported or e-commerce integration | Daily | Free |

---

## 4.8 CONSULTING / TIME TRACKING MODULE

### Purpose
Track hours spent per client per service. Critical for hourly services (Consulting, Web Dev).

### Data Model

```
TIME_ENTRY
├── id (UUID)
├── client_id (FK)
├── service_id (FK)
├── user_id (FK — who logged the time)
├── description (text — what was done)
├── date (date)
├── hours (decimal — e.g., 2.5)
├── billable (boolean)
├── hourly_rate (decimal — what client pays per hour)
├── total_value (decimal — hours × rate, computed)
├── task_type (enum: strategy/execution/meeting/research/reporting)
└── created_at (timestamp)
```

### The Utilization Formula

```
Billable Utilization Rate = Billable Hours / Total Available Hours
Target: 70-80% for client-facing roles

Average Hourly Rate (AHR) = Total Revenue / Total Billable Hours
Target: Must exceed fully-loaded labor cost per hour

Example:
- Consultant works 160 hours/month
- 120 hours are billable to clients
- Utilization = 120/160 = 75% ✅
- Revenue from those 120 hours = $15,000
- AHR = $15,000/120 = $125/hour
- Consultant fully-loaded cost = $60/hour
- Margin = ($125-$60)/$125 = 52%
```

### Functional Requirements

| # | Function | Priority | Beta | v1 | v2 |
|---|----------|----------|------|-----|-----|
| 1 | Log time manually (hours + description) | P0 | ✅ | ✅ | ✅ |
| 2 | Start/stop timer | P1 | — | ✅ | ✅ |
| 3 | Weekly timesheet view | P1 | — | ✅ | ✅ |
| 4 | Billable vs non-billable breakdown | P1 | — | ✅ | ✅ |
| 5 | Utilization rate per team member | P1 | — | ✅ | ✅ |
| 6 | Auto-suggest hourly rate per client | P2 | — | — | ✅ |

---

## 4.9 REVENUE & INVOICING MODULE

### Purpose
Know exactly how much money you're making and get paid.

### Data Model

```
INVOICE
├── id (UUID)
├── client_id (FK)
├── invoice_number (string, unique)
├── issue_date (date)
├── due_date (date)
├── status (enum: draft/sent/paid/overdue/cancelled)
├── subtotal (decimal)
├── tax_amount (decimal)
├── total (decimal)
├── paid_amount (decimal)
├── paid_date (date, nullable)
├── payment_method (enum: bank_transfer/check/stripe/paypal)
├── notes (text)
└── created_at (timestamp)

INVOICE_LINE_ITEM
├── id (UUID)
├── invoice_id (FK)
├── service_id (FK)
├── description (string)
├── quantity (decimal — usually 1 for monthly)
├── unit_price (decimal)
├── total (decimal — quantity × unit_price)
└── period_start / period_end (date)

PAYMENT
├── id (UUID)
├── invoice_id (FK)
├── amount (decimal)
├── payment_date (date)
├── payment_method (string)
├── transaction_reference (string)
└── created_at (timestamp)

REVENUE_SNAPSHOT (computed monthly)
├── id (UUID)
├── month (date — first of month)
├── client_id (FK)
├── service_id (FK)
├── planned_revenue (decimal — what should be billed)
├── actual_revenue (decimal — what was paid)
├── is_paid (boolean)
└── created_at (timestamp)
```

### The Revenue Formulas

```
MRR (Monthly Recurring Revenue) = Sum of all active service monthly prices
ARR (Annual Recurring Revenue) = MRR × 12

Net MRR Growth = New MRR + Expansion MRR - Churned MRR

Example:
- Start of month: $200K MRR
- New client: +$5K
- Existing client upgraded: +$2K
- Client churned: -$3K
- End of month: $204K MRR
- Net MRR Growth: +$4K (2%)

Revenue Churn Rate = Churned MRR / MRR at start of period
Target: <5% monthly, <10% annually
```

### Functional Requirements

| # | Function | Priority | Beta | v1 | v2 |
|---|----------|----------|------|-----|-----|
| 1 | Calculate MRR automatically | P0 | ✅ | ✅ | ✅ |
| 2 | Generate monthly invoices from service assignments | P1 | — | ✅ | ✅ |
| 3 | Mark invoice as paid | P1 | — | ✅ | ✅ |
| 4 | Track overdue invoices | P1 | — | ✅ | ✅ |
| 5 | Revenue dashboard (MRR, ARR, growth) | P1 | — | ✅ | ✅ |
| 6 | Stripe integration for payments | P2 | — | — | ✅ |
| 7 | Automated payment reminders | P2 | — | — | ✅ |

---

## 4.10 ROI & CLIENT REPORTING MODULE

### Purpose
The most important module — prove value to clients or lose them.

### Data Model

```
CLIENT_REPORT
├── id (UUID)
├── client_id (FK)
├── report_type (enum: weekly/monthly/quarterly)
├── period_start (date)
├── period_end (date)
├── generated_at (timestamp)
├── sent_at (timestamp, nullable)
├── email_opened (boolean)
└── created_at (timestamp)

CLIENT_METRIC_SUMMARY (denormalized for fast reporting)
├── id (UUID)
├── client_id (FK)
├── date (date)
├── service_id (FK)
├── service_cost (decimal — what client paid you)
├── attributed_revenue (decimal — what client earned from your work)
├── roi_multiple (decimal — attributed_revenue / service_cost)
├── key_metrics (JSONB — service-specific metrics)
└── created_at (timestamp)
```

### Per-Service ROI Formulas

| Service | Cost | Attributed Revenue | ROI Formula |
|---------|------|-------------------|-------------|
| Ad Management | Your monthly fee + ad spend | Conversion value from ads | ROAS = Revenue / Ad Spend |
| SEO | Your monthly fee | Organic traffic value (traffic × avg CPC) | SEO Value / Fee |
| Content | Your monthly fee | Leads from content × avg deal value | Content Revenue / Fee |
| Social Media | Your monthly fee | Social-driven conversions × value | Social Revenue / Fee |
| Web Dev | Project fee or hourly | Conversion lift × avg order value | Lift Value / Fee |
| Consulting | Hourly rate × hours | Revenue growth attributed to strategy | Growth / Fee |

### Functional Requirements

| # | Function | Priority | Beta | v1 | v2 |
|---|----------|----------|------|-----|-----|
| 1 | Calculate ROI per client per service | P0 | — | ✅ | ✅ |
| 2 | Generate monthly client report (PDF) | P1 | — | ✅ | ✅ |
| 3 | Email report to client automatically | P1 | — | — | ✅ |
| 4 | Client can view report in portal | P2 | — | — | ✅ |
| 5 | Compare ROI across clients (benchmarking) | P2 | — | — | ✅ |

---

## 4.11 CHURN RISK & HEALTH MODULE

### Purpose
Predict which clients are likely to leave before they actually do.

### Research Finding: Why Agency Clients Churn

| Reason | % of Churn | Early Warning Sign |
|--------|-----------|-------------------|
| Poor results / no ROI | 35% | ROAS declining for 3+ weeks |
| Price / budget cuts | 25% | Late payments, asking about scope reduction |
| Switched to competitor | 20% | Competitor mentioned in calls |
| Internal team hired | 12% | Client asking about "training" or "handover" |
| Business closed / pivoted | 8% | Industry news, social signals |

### Health Score Algorithm (v1 — Simple)

```
Health Score (0-100) = 
  Base: 100
  - Days since last activity × 2 (max -30)
  - Days since last invoice paid × 3 (max -30)
  - ROAS below target: -20
  - No campaign activity 7+ days: -15
  - Support tickets open > 3 days: -10
  - Client NPS < 7: -15
  + Renewal conversation scheduled: +10
  + Upsell discussion active: +10

  Green: 80-100
  Yellow: 50-79
  Red: 0-49 (intervention required)
```

### Functional Requirements

| # | Function | Priority | Beta | v1 | v2 |
|---|----------|----------|------|-----|-----|
| 1 | Calculate health score per client | P1 | — | ✅ | ✅ |
| 2 | Alert when health drops below threshold | P1 | — | ✅ | ✅ |
| 3 | Churn reason tracking (post-cancellation) | P1 | — | ✅ | ✅ |
| 4 | NPS survey sending + collection | P2 | — | — | ✅ |
| 5 | Predictive churn model (ML) | P3 | — | — | ✅ |

---

## 4.12 TEAM & USER MANAGEMENT MODULE

### Purpose
Who can see what, who did what.

### Data Model

```
USER
├── id (UUID)
├── email (string, unique, required)
├── password_hash (string — bcrypt)
├── first_name (string)
├── last_name (string)
├── role (enum: owner/admin/manager/consultant/viewer)
├── department (enum: sales/delivery/seo/ads/content/web)
├── hourly_cost (decimal — fully loaded cost for utilization calc)
├── is_active (boolean)
├── last_login (timestamp)
├── created_at (timestamp)
└── updated_at (timestamp)

PERMISSION_MATRIX (role-based)
├── role (enum)
├── can_view_all_clients (boolean)
├── can_edit_all_clients (boolean)
├── can_view_assigned_clients_only (boolean)
├── can_create_invoices (boolean)
├── can_view_financials (boolean)
├── can_manage_team (boolean)
├── can_access_settings (boolean)
└── can_delete_data (boolean)
```

### Functional Requirements

| # | Function | Priority | Beta | v1 | v2 |
|---|----------|----------|------|-----|-----|
| 1 | User login with email/password | P0 | ✅ | ✅ | ✅ |
| 2 | Role-based access control | P0 | ✅ | ✅ | ✅ |
| 3 | Invite team member | P0 | ✅ | ✅ | ✅ |
| 4 | Deactivate user | P0 | ✅ | ✅ | ✅ |
| 5 | Audit log (who changed what) | P1 | — | ✅ | ✅ |
| 6 | Password reset | P1 | — | ✅ | ✅ |
| 7 | Two-factor authentication | P2 | — | — | ✅ |
| 8 | Single Sign-On (SSO) | P3 | — | — | ✅ |

---

# SECTION 5: THE PHASED DEVELOPMENT PLAN

## Phase 0: Foundation (Weeks 1-2) — BEFORE Beta

**Goal:** Get infrastructure ready. No features yet.

| Task | Deliverable | Owner | Time |
|------|-----------|-------|------|
| Set up database (PostgreSQL + Supabase) | Running DB with tables | Dev | 2 days |
| Set up auth system (Supabase Auth) | Login/signup working | Dev | 2 days |
| Set up backend functions (Supabase Edge Functions) | Lead intake and workflow endpoints scaffolded | Dev | 2 days |
| Set up deployment (Vercel + Supabase) | Staging environment live | Dev | 1 day |
| Define all database schemas | Migration files written | Dev | 2 days |
| Set up error tracking (Sentry) | Errors logged to dashboard | Dev | 1 day |

**Exit Criteria:** Team can log in, database is queryable, API responds.

### Phase 0 Build Principle

Build the system in this order:

1. data model
2. auth and permissions
3. CRUD flows
4. workflow automation
5. third-party integrations
6. client-facing polish

If a screen looks finished but does not save real data, it is not complete.

---

## Phase 1: BETA — "Get Your First 5 Clients In" (Weeks 3-8)

**Goal:** You and your team can use this daily to manage your actual clients.
**Users:** Internal team only. No client portal.
**Motto:** "If it's not in the CRM, it didn't happen."

### Beta Must-Have Features (6 weeks)

| Module | Feature | Week | Status |
|--------|---------|------|--------|
| Auth | Login, invite team, roles | 3 | Required |
| Clients | Add/edit/archive clients | 3 | Required |
| Services | Define your 6 services with prices | 3 | Required |
| Services | Assign services to clients | 4 | Required |
| Revenue | Auto-calculate MRR dashboard | 4 | Required |
| Pipeline | Add leads, move stages | 4 | Required |
| Pipeline | Website form capture into CRM | 4 | Required |
| Pipeline | Track proposals (won/lost) | 5 | Required |
| Pipeline | Convert won lead into client + onboarding | 5 | Required |
| Activity | Log calls, emails, meetings | 5 | Required |
| Time | Log hours per client per service | 5 | Required |
| Time | Weekly timesheet view | 6 | Required |
| Invoicing | Generate monthly invoices | 6 | Required |
| Ad Tracking | Manual entry of ad metrics | 6 | Required |
| Reporting | Export client list, revenue CSV | 6 | Required |

### Beta Anti-Goals (DO NOT build yet)
- ❌ No Google Ads API integration (manual entry only)
- ❌ No Meta API integration
- ❌ No SEO rank tracking
- ❌ No automated reports
- ❌ No client portal
- ❌ No AI assistant
- ❌ No fancy charts (simple tables + basic numbers)

### Beta Definition Clarification

Beta is not just for existing clients. Beta must also prove that a real lead can:

1. come in from a website form
2. land in the CRM with source attribution
3. be assigned to an owner
4. move through pipeline stages
5. convert into a client
6. start onboarding without retyping data

### Beta Success Criteria
- [ ] All 87 current clients are in the system
- [ ] All 6 services are defined
- [ ] Every client has correct services assigned with prices
- [ ] Dashboard shows true MRR ($235.3K)
- [ ] Website forms create leads automatically in the CRM
- [ ] Every open lead has owner + next follow-up date
- [ ] Team logs time weekly
- [ ] Invoices generated match actual billing
- [ ] Proposal tracking shows actual win rate

**Exit Criteria:** Team uses it daily for 2 weeks without reverting to spreadsheets.

---

## Phase 2: v1.0 — "Pull Real Data" (Weeks 9-18)

**Goal:** Replace manual data entry with real API integrations.
**Users:** Internal team + client portal (read-only).
**Motto:** "The data is always fresh."

### v1.0 Features (10 weeks)

| Module | Feature | Week | Complexity |
|--------|---------|------|------------|
| Auth | Password reset, audit log | 9 | Low |
| Ad Tracking | Google Ads OAuth + campaign sync | 9-11 | High |
| Ad Tracking | Meta Ads OAuth + campaign sync | 10-12 | High |
| Ad Tracking | Daily metric sync (automated) | 11-13 | High |
| Ad Tracking | ROAS calculation + alerts | 13 | Medium |
| SEO | Google Search Console OAuth + query/page sync | 11-13 | Medium |
| SEO | GSC average position and opportunity charts | 13 | Low |
| Content | GA4 integration for blog traffic | 12 | Medium |
| Social | Manual entry + follower tracking | 12 | Low |
| Web | PageSpeed + uptime monitoring | 13 | Low |
| ROI | Auto-calculate from real data | 14 | Medium |
| ROI | Monthly PDF report generation | 14-15 | Medium |
| Client Portal | Read-only dashboard per client | 15-16 | Medium |
| Client Portal | Client can view their reports | 16 | Low |
| Notifications | Email alerts (low ROAS, overdue) | 16 | Medium |
| Pipeline | Lead scoring (automated) | 17 | Medium |
| Integrations | Slack notifications | 18 | Low |
| Integrations | Calendar sync (Google/Outlook) | 18 | Medium |

### v1.0 Technical Requirements
- [ ] Background job system (BullMQ / Inngest / QStash)
- [ ] API credential encryption (AWS KMS or similar)
- [ ] Rate limit handling for Google/Meta APIs
- [ ] Error retry logic with exponential backoff
- [ ] Data caching layer (Redis)
- [ ] Webhook endpoints for real-time updates

### v1.0 Success Criteria
- [ ] Ad metrics update automatically every 6 hours
- [ ] Search Console query/page snapshots update daily
- [ ] Client portal shows real data
- [ ] Monthly reports generate and email automatically
- [ ] Health scores reflect real metrics
- [ ] System handles all 87 clients without performance issues

**Exit Criteria:** 80% of data in system comes from APIs, not manual entry.

---

## Shipping Sequence (Recommended Execution Order)

This is the practical order to ship from start to finish without painting ourselves into a corner:

### Step 1: Core platform spine

- Supabase project, auth, roles, migrations, environment setup
- Shared TypeScript types from database schema
- Basic audit fields on all important records

### Step 2: CRM operating system

- Clients
- Services
- Client-service assignments
- Activities
- Leads / prospects
- Proposals

This is the minimum set that makes the CRM real.

### Step 3: Lead capture and conversion

- Website form endpoint
- UTM/source attribution capture
- duplicate checking
- owner assignment
- next follow-up enforcement
- one-click convert lead to client + onboarding

This is where the CRM stops being a passive database and starts feeding the business.

### Step 4: Financial and delivery workflows

- MRR dashboard
- time tracking
- invoice generation
- onboarding
- offboarding
- CSV exports

### Step 5: Real proof-of-value integrations

- Google Ads
- Meta Ads
- GA4
- SEO provider
- reporting engine

### Step 6: Client-facing layer

- client portal
- scheduled reports
- notifications
- account health

### Step 7: Intelligence and automation

- lead scoring
- churn prediction
- AI assistant with real actions
- workflow automation

### Ship Rule

Do not start advanced integrations, AI, or a client portal until Steps 1-4 are stable in real daily use.

---

## GitHub Cross-Check: Current Repo vs Market-Ready Structure

Current repository: `lanrcaz/SLASH-CRM`

| Area | Current State | Market-Ready Gap | Improvement |
|------|---------------|------------------|-------------|
| App shell | React + Vite app with full route surface | No authenticated route protection | Add auth guard, tenant context, and role-based navigation |
| Data | All pages read from `src/data/*Mock.ts` | No persisted records | Replace mocks with Supabase queries/mutations behind feature APIs |
| Pages | Large route files, many 600-1,200+ lines | Hard to maintain and test | Split into feature modules, components, hooks, and data adapters |
| Backend | None in repo | No lead capture, CRUD, jobs, or integrations | Add Supabase schema, RLS policies, Edge Functions, and migrations |
| Lead capture | UI-only prospects board | No real source of leads | Add public lead intake endpoint, UTM capture, duplicate detection, assignment rules |
| Testing | No test setup | No confidence before deploy | Add typecheck, lint, unit tests for domain logic, Playwright smoke tests |
| CI/CD | No GitHub Actions | Manual quality gate | Add GitHub workflow for lint, typecheck, build, and smoke tests |
| Deployment | No deployment config | Not market-accessible | Add Vercel deployment, environment docs, and preview deploy flow |
| Product identity | `package.json` still named `my-app` | Weak project identity | Rename package to `slash-crm` and add project metadata |
| Docs | README + master plan | No operator setup docs | Add `.env.example`, setup guide, deployment guide, and data import guide |

### Recommended Repo Structure

Keep the current Vite + React app for Beta. It is already working as a front-end shell, and Supabase can provide auth, database, storage, row-level security, lead capture functions, and scheduled jobs without forcing a framework migration.

Recommended structure:

```text
SLASH-CRM/
├── .github/
│   └── workflows/
│       └── ci.yml
├── docs/
│   ├── SETUP.md
│   ├── DEPLOYMENT.md
│   ├── DATA_IMPORT.md
│   └── RELEASE_CHECKLIST.md
├── public/
├── supabase/
│   ├── functions/
│   │   ├── lead-intake/
│   │   ├── convert-lead/
│   │   └── scheduled-sync/
│   ├── migrations/
│   └── seed.sql
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── routes.tsx
│   │   └── providers.tsx
│   ├── components/
│   │   ├── layout/
│   │   └── ui/
│   ├── features/
│   │   ├── activities/
│   │   ├── auth/
│   │   ├── clients/
│   │   ├── dashboard/
│   │   ├── leads/
│   │   ├── onboarding/
│   │   ├── reports/
│   │   ├── revenue/
│   │   └── services/
│   ├── integrations/
│   │   ├── supabase/
│   │   ├── google-ads/
│   │   ├── meta-ads/
│   │   └── ga4/
│   ├── lib/
│   ├── mocks/
│   ├── pages/
│   └── types/
│       └── database.ts
├── .env.example
├── README.md
└── MASTER_PLAN.md
```

### Feature Module Shape

Each market-critical feature should be structured the same way:

```text
src/features/clients/
├── api/
│   ├── clients.queries.ts
│   └── clients.mutations.ts
├── components/
├── hooks/
├── pages/
├── schemas/
│   └── client.schema.ts
├── types.ts
└── utils.ts
```

Use this shape for `clients`, `leads`, `services`, `activities`, `revenue`, `onboarding`, and `reports`. The goal is to make each business workflow independently understandable and shippable.

### Market Shipping Gates

Do not call the product "Beta" until these gates pass:

| Gate | Requirement |
|------|-------------|
| Auth gate | Users can sign in, sign out, reset password, and have roles |
| Data gate | Clients, services, leads, activities, and proposals persist in Supabase |
| Lead gate | A public website form creates a lead in the CRM with source attribution |
| Conversion gate | A won lead can become a client with service assignments and onboarding |
| Revenue gate | MRR is computed from client-service assignments, not hardcoded data |
| Workflow gate | Activities and follow-ups are required on open leads |
| Quality gate | `lint`, `typecheck`, and `build` pass in GitHub Actions |
| Deployment gate | Main branch deploys to a live staging URL |
| Operator gate | One real operator can use the app for one week without spreadsheets |

### Recommended Technical Decisions

- Keep Vite + React for the internal CRM Beta.
- Use Supabase Auth, Postgres, Storage, RLS, and Edge Functions as the backend foundation.
- Use Supabase Edge Functions for website lead capture, lead conversion, and scheduled sync jobs.
- Use generated database types as the source of truth for front-end data types.
- Keep mock data only under `src/mocks/` for demos and tests, never mixed into production feature modules.
- Add CI before adding more features.
- Add a deployment target before adding integrations.
- Reconsider Next.js only if the product needs server-rendered public marketing pages, advanced server routing, or a heavier API layer than Supabase Edge Functions can comfortably handle.

### First Market-Focused Refactor

Before adding new functionality, refactor in this order:

1. Move `src/App.tsx` route definitions into `src/app/routes.tsx`.
2. Move `Layout` and `Navbar` into `src/components/layout/`.
3. Create `src/features/clients`, `src/features/leads`, and `src/features/services`.
4. Move current page-specific components into their feature folders without changing behavior.
5. Move mock data from `src/data/` to `src/mocks/`.
6. Add `.env.example`.
7. Add `supabase/migrations/0001_initial_schema.sql`.
8. Add GitHub Actions for lint, typecheck, and build.

This keeps the visual prototype intact while preparing the codebase for real persistence and production workflows.

---

## Phase 3: v2.0 — "Smart & Automated" (Weeks 19-30)

**Goal:** Add intelligence, automation, and scale.
**Users:** Internal team, clients, potentially white-label partners.
**Motto:** "It knows before you do."

### v2.0 Features (12 weeks)

| Module | Feature | Week | Complexity |
|--------|---------|------|------------|
| AI | Natural language queries to data | 19-20 | High |
| AI | Automated insight generation | 20-21 | High |
| AI | Predictive churn model | 21-22 | High |
| Automation | Automated budget pacing alerts | 22 | Medium |
| Automation | Auto-pause underperforming ads | 23 | High |
| SEO | Competitor tracking | 23-24 | Medium |
| SEO | Content gap analysis | 24 | Medium |
| Reporting | Custom report builder | 24-25 | Medium |
| Reporting | Scheduled report delivery | 25 | Low |
| Financial | Stripe payment integration | 25-26 | Medium |
| Financial | Automated payment reminders | 26 | Low |
| Financial | Revenue forecasting | 26-27 | Medium |
| Team | Goal setting per team member | 27 | Low |
| Team | Performance dashboard | 27-28 | Medium |
| Scale | Multi-currency support | 28 | Low |
| Scale | White-label client portal | 28-29 | High |
| Scale | API for external integrations | 29 | Medium |
| Scale | Mobile app (responsive web first) | 30 | Medium |

---

## Phase 4: Scale — "Enterprise Ready" (Month 7+)

**Goal:** Handle 500+ clients, 50+ team members, international.

- Database sharding / read replicas
- CDN for client portal
- Advanced security (SOC 2 compliance)
- Dedicated support infrastructure
- Marketplace for 3rd party integrations

---

# SECTION 6: TECHNICAL ARCHITECTURE

## Stack Recommendation

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | Vite + React + Tailwind + shadcn-style UI | Current repo already uses this successfully |
| **Backend API** | Supabase Edge Functions | Lead capture, conversions, webhooks, scheduled jobs |
| **Database** | Supabase Postgres | Reliable relational data, migrations, row-level security |
| **Auth** | Supabase Auth | One auth layer for users, roles, and database security |
| **Background Jobs** | Supabase scheduled functions first; Inngest/QStash later | Start simple, add heavier job tooling when integrations need it |
| **File Storage** | Supabase Storage | Client assets, reports, onboarding documents |
| **Email** | Resend or SendGrid | Transactional + marketing emails |
| **Error Tracking** | Sentry | Production error monitoring |
| **Analytics** | PostHog or Mixpanel | Product analytics |
| **Hosting** | Vercel + Supabase | Fast preview deploys with managed backend infrastructure |

## Database Schema Overview

```
users
├── clients (87 records)
│   ├── client_services (120+ records)
│   ├── leads (200+ records)
│   │   └── proposals (80+ records)
│   ├── time_entries (2,000+/month)
│   ├── invoices (100+/month)
│   ├── ad_accounts (50+ records)
│   │   └── ad_campaigns (300+ records)
│   │       └── ad_metrics (10,000+/month)
│   ├── seo_projects (30+ records)
│   │   └── keywords (500+ records)
│   │       └── keyword_positions (3,500+/week)
│   └── activities (5,000+/month)
└── services (6 records)
```

## API Integration Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SLASH-CRM (Vite + React)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Dashboard   │  │   Reports    │  │   Client     │     │
│  │   UI         │  │    UI        │  │   Portal     │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
└─────────┼─────────────────┼─────────────────┼───────────────┘
          │                 │                 │
          └─────────────────┴─────────────────┘
                            │
                    ┌───────▼───────┐
                    │ Supabase Edge  │
                    │   Functions    │
                    └───────┬───────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
   ┌────▼────┐       ┌─────▼─────┐      ┌──────▼──────┐
   │Supabase │      │ Scheduled │      │ External APIs│
   │Postgres │      │ Functions │      └─────────────┘
   └──────────┘      └─────┬─────┘             │
                           │         ┌──────────┼──────────┐
                           │    ┌────▼────┐ ┌──▼───┐ ┌────▼─────┐
                           │    │Google  │ │Meta  │ │GSC       │
                           │    │Ads API │ │API   │ │API       │
                           │    └─────────┘ └──────┘ └──────────┘
                           │
                    ┌──────▼──────┐
                    │  Sync Jobs   │
                    │  (Every 6hrs)│
                    └──────────────┘
```

---

# SECTION 7: DATA FLOW & METRICS TRACKING

## How "Earnings" Actually Flows

```
┌────────────────────────────────────────────────────────────────────────────┐
│                         THE COMPLETE EARNINGS FLOW                         │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  CLIENT PAYS YOU → YOUR PLATFORM TRACKS → CLIENT SEES ROI                │
│                                                                            │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                   │
│  │   SERVICE    │    │    COST      │    │   VALUE      │                   │
│  │              │    │  (Input)     │    │  (Output)    │                   │
│  ├──────────────┤    ├──────────────┤    ├──────────────┤                   │
│  │ Ad Mgmt      │ →  │ $2,500/mo    │ →  │ ROAS from    │                   │
│  │              │    │ + ad spend   │    │ Google/Meta  │                   │
│  │              │    │              │    │ APIs         │                   │
│  ├──────────────┤    ├──────────────┤    ├──────────────┤                   │
│  │ SEO          │ →  │ $1,800/mo    │ →  │ Organic      │                   │
│  │              │    │              │    │ traffic val  │                   │
│  │              │    │              │    │ (GSC + GA4)  │                   │
│  ├──────────────┤    ├──────────────┤    ├──────────────┤                   │
│  │ Content      │ →  │ $3,200/mo    │ →  │ Leads from   │                   │
│  │              │    │              │    │ content ×    │                   │
│  │              │    │              │    │ deal value   │                   │
│  ├──────────────┤    ├──────────────┤    ├──────────────┤                   │
│  │ Social Media │ →  │ $1,500/mo    │ →  │ Social       │                   │
│  │              │    │              │    │ conversions  │                   │
│  │              │    │              │    │ × value      │                   │
│  ├──────────────┤    ├──────────────┤    ├──────────────┤                   │
│  │ Web Dev      │ →  │ $4,000/mo    │ →  │ Conversion   │                   │
│  │              │    │ or project   │    │ lift × AOV   │                   │
│  ├──────────────┤    ├──────────────┤    ├──────────────┤                   │
│  │ Consulting   │ →  │ $5,000/mo    │ →  │ Revenue      │                   │
│  │              │    │ or hourly    │    │ growth       │                   │
│  │              │    │              │    │ attributed   │                   │
│  └──────────────┘    └──────────────┘    └──────────────┘                   │
│                                                                            │
│  DASHBOARD SHOWS:                                                          │
│  ┌────────────────────────────────────────────────────────────────┐       │
│  │ "Acme Corp pays $8,300/mo for 3 services                        │       │
│  │  Their attributed revenue from our work: $47,200/mo             │       │
│  │  Their ROI: 5.7x                                               │       │
│  │  Without us, they lose $47,200/mo"                              │       │
│  └────────────────────────────────────────────────────────────────┘       │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

## Lead Attribution Flow

```
┌────────────────────────────────────────────────────────────────────────────┐
│                         LEAD ATTRIBUTION FLOW                              │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  TOUCHPOINT 1          TOUCHPOINT 2          TOUCHPOINT 3                 │
│  ┌──────────┐         ┌──────────┐         ┌──────────┐                   │
│  │ LinkedIn │         │ Blog     │         │ Contact  │                   │
│  │ Ad       │   →     │ Post     │   →     │ Form     │   →   CONVERTED  │
│  │ (UTM:    │         │ (UTM:    │         │ (UTM:    │        CLIENT     │
│  │ li-ads)  │         │ blog-seo)│         │ organic) │                   │
│  └──────────┘         └──────────┘         └──────────┘                   │
│                                                                            │
│  ATTRIBUTION MODELS:                                                       │
│  ┌────────────────────────────────────────────────────────────────┐       │
│  │ First-Touch: LinkedIn gets 100% credit                         │       │
│  │ Last-Touch: Contact Form gets 100% credit                      │       │
│  │ Linear: 33% each                                              │       │
│  │ U-Shaped: LinkedIn 40%, Blog 20%, Form 40%                   │       │
│  └────────────────────────────────────────────────────────────────┘       │
│                                                                            │
│  WHAT WE TRACK:                                                            │
│  - UTM parameters on every URL                                             │
│  - Referral source from form submission                                     │
│  - GCLID (Google Click ID) for paid search                                │
│  - FBCLID (Facebook Click ID) for Meta ads                                │
│  - First touch timestamp                                                   │
│  - All touchpoints in journey (stored in lead.touchpoints JSONB)           │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

# SECTION 8: THE BETA LAUNCH PLAN

## Beta Week-by-Week

| Week | Focus | Tasks | Deliverable |
|------|-------|-------|-------------|
| 1 | Foundation | Set up project, database, auth | Team can log in |
| 2 | Clients & Services | Build client CRUD, service catalog | Can add all 87 clients |
| 3 | Revenue & Pipeline | MRR calc, lead pipeline, proposal flow | Dashboard shows real MRR |
| 4 | Lead Capture & Conversion | Website forms, source attribution, lead-to-client conversion | Real inbound leads land in CRM |
| 5 | Activity & Time | Activity logging, time tracking | Team can log daily work |
| 6 | Invoicing & Reports | Invoice generation, CSV export | Can generate monthly invoices |
| 7 | Polish & Internal Test | Fix bugs, onboard team | Team uses it for 1 week |

## Internal Rollout Checklist

- [ ] Import all 87 clients from your current system (spreadsheet/QuickBooks/HubSpot)
- [ ] Define exact prices for each client per service
- [ ] Connect every website/contact form to CRM lead capture
- [ ] Train team on logging activities (30-min session)
- [ ] Set expectation: "All client communication goes in the CRM"
- [ ] Weekly check-in: What's working? What's missing?
- [ ] After 2 weeks: Decide if Beta is successful → proceed to v1

## Beta Success Metrics

| Metric | Target | How to Measure |
|--------|--------|---------------|
| Team adoption | 100% of client-facing team uses daily | Login logs |
| Data completeness | 100% of clients in system | Client count = 87 |
| Activity logging | 5+ activities per client per week | Activity count |
| Time tracking | 80% of hours logged | Time entry count |
| Invoice accuracy | 100% match with QuickBooks/Stripe | Invoice total vs actual |

---

# SECTION 9: COST ESTIMATES

## Infrastructure (Monthly)

| Service | Beta | v1 | v2 |
|---------|------|-----|-----|
| Vercel Pro | $20 | $20 | $50 |
| Supabase Pro | $25 | $25 | $75 |
| Inngest / QStash | Free tier | $20 | $50 |
| Resend Email | Free tier | $20 | $50 |
| Sentry | Free tier | $26 | $80 |
| Google Search Console API | Free | Free | Free |
| Optional paid SEO provider | — | — | $120+ |
| Google Ads API | Free | Free | Free |
| Meta Marketing API | Free | Free | Free |
| **Total** | **~$45/mo** | **~$131/mo** | **~$425/mo if paid SEO is added** |

## Development (One-Time)

| Phase | Effort | Cost (if hiring) |
|-------|--------|-----------------|
| Foundation (Weeks 1-2) | 80 hours | $4,000-8,000 |
| Beta (Weeks 3-8) | 240 hours | $12,000-24,000 |
| v1.0 (Weeks 9-18) | 400 hours | $20,000-40,000 |
| v2.0 (Weeks 19-30) | 480 hours | $24,000-48,000 |
| **Total** | **1,200 hours** | **$60K-120K** |

*(Assumes $50-100/hr for senior full-stack developer)*

---

# SECTION 10: RISK REGISTER

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Team doesn't adopt CRM | Medium | High | Mandate usage, show time savings weekly |
| Google Ads API approval delayed | Medium | Medium | Apply early, have manual fallback |
| Meta API rate limits hit | Low | Medium | Implement caching, request batching |
| Data import is messy | High | Medium | Clean data before import, validate |
| Scope creep | High | High | Strict phase gates, "defer to v2" policy |
| Security breach | Low | Critical | Supabase Auth, RLS policies, encrypted tokens, audit logs |
| Client portal confuses clients | Medium | Medium | Simple UI, onboarding call, FAQ |

---

# APPENDIX A: THE COMPLETE ENTITY RELATIONSHIP DIAGRAM

```
┌─────────────┐       ┌─────────────────┐       ┌─────────────┐
│    USER     │       │  CLIENT_SERVICE │       │   SERVICE   │
├─────────────┤       ├─────────────────┤       ├─────────────┤
│ id          │◄──────┤ client_id       │──────►│ id          │
│ email       │       │ service_id      │       │ name        │
│ role        │       │ monthly_price   │       │ category    │
│ hourly_cost │       │ status          │       │ base_price  │
└─────────────┘       │ start_date      │       └─────────────┘
                      └─────────────────┘
                            │
                            │
┌─────────────┐       ┌─────▼─────┐       ┌─────────────┐
│   INVOICE   │◄──────┤   CLIENT  │──────►│    LEAD     │
├─────────────┤       ├───────────┤       ├─────────────┤
│ id          │       │ id        │       │ id          │
│ client_id   │       │ name      │       │ client_id   │
│ total       │       │ email     │       │ source      │
│ status      │       │ status    │       │ status      │
│ due_date    │       │ health    │       │ value       │
└─────────────┘       │ score     │       │ probability │
                      └───────────┘       └─────────────┘
                            │                   │
                            │                   │
                      ┌─────▼─────┐       ┌────▼────┐
                      │  ACTIVITY │       │ PROPOSAL│
                      ├───────────┤       ├─────────┤
                      │ id        │       │ id      │
                      │ client_id │       │ lead_id │
                      │ user_id   │       │ value   │
                      │ type      │       │ status  │
                      │ timestamp │       │ sent_at │
                      └───────────┘       └─────────┘
                            │
                            │
                      ┌─────▼─────┐       ┌─────────────┐
                      │ TIME_ENTRY│       │  AD_ACCOUNT │
                      ├───────────┤       ├─────────────┤
                      │ id        │       │ id          │
                      │ client_id │       │ client_id   │
                      │ hours     │       │ platform    │
                      │ billable  │       │ external_id │
                      │ rate      │       │ status      │
                      └───────────┘       └─────────────┘
                                                │
                                          ┌─────▼─────┐
                                          │ AD_CAMPAIGN│
                                          ├───────────┤
                                          │ id          │
                                          │ account_id  │
                                          │ external_id │
                                          │ name        │
                                          │ status      │
                                          └─────────────┘
                                                │
                                          ┌─────▼─────┐
                                          │ AD_METRIC  │
                                          ├───────────┤
                                          │ id          │
                                          │ campaign_id │
                                          │ date        │
                                          │ spend       │
                                          │ conversions │
                                          │ roas        │
                                          └─────────────┘
```

---

# APPENDIX B: COMPETITIVE POSITIONING

## What Makes ClientVault Different

| Competitor | Their Strength | Their Weakness | How We Win |
|------------|---------------|---------------|-----------|
| **HubSpot** | Marketing automation | No project delivery, expensive at scale | Built for agencies, includes time tracking + invoicing |
| **Pipedrive** | Simple pipeline | No service delivery features | Service-centric, not just sales |
| **Productive.io** | All-in-one | Expensive, complex | Focused on marketing agency metrics (ROAS, SEO, etc.) |
| **GoHighLevel** | White-label | Overbuilt for non-resellers | Built for direct agency use, not resale |
| **AgencyAnalytics** | Client reporting | Not a CRM, no pipeline | CRM + reporting in one, not two tools |
| **Databox** | Dashboards | Not a CRM, expensive connectors | Native integrations, built-in data |

---

# APPENDIX C: GLOSSARY

| Term | Definition |
|------|-----------|
| **MRR** | Monthly Recurring Revenue — sum of all active monthly retainers |
| **ARR** | Annual Recurring Revenue — MRR × 12 |
| **ROAS** | Return on Ad Spend — revenue from ads divided by ad spend |
| **CAC** | Customer Acquisition Cost — total sales/marketing cost divided by new clients |
| **LTV** | Lifetime Value — average revenue per client × average client lifespan |
| **Churn** | Clients who cancel services in a period |
| **Utilization** | % of available hours that are billable to clients |
| **AHR** | Average Hourly Rate — total revenue divided by billable hours |
| **Attribution** | Which marketing touchpoint gets credit for a conversion |
| **Health Score** | 0-100 score predicting likelihood of client churn |
| **Pipeline** | Visual stages a lead moves through from inquiry to close |
| **Proposal Win Rate** | % of proposals that result in signed deals |
| **QBR** | Quarterly Business Review — scheduled client check-in |

---

**END OF MASTER PLAN**

*This document is a living artifact. Update as research and implementation progress.*
