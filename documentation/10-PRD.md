# SIA Portal — Unified Product Requirements & Implementation Strategy

**Version:** 1.1 — MVP + Implementation
**Date:** April 2026
**Scope:** SIA Portal (siaportal.com) + Wider Labs integration engine

---

## Product Vision

SIA Portal is the bilateral investment gateway connecting GCC capital — primarily Saudi — with Malaysian digital infrastructure. Wider Labs is the AI engine powering matching, analysis, and operational intelligence beneath the portal.

**MVP objective:** Make the first integration happen — reliably, officially, and in a way that generates trust. Every feature serves that objective. Nothing is cosmetic.

| Layer | Role |
|-------|------|
| **SIA Portal** | Front-end experience for investors, companies, government entities, startups. Onboarding, matching, portfolio, integration journey, financial model exposure |
| **Wider Labs** | AI matching intelligence, opportunity scoring, relationship data processing, financial model analysis, integration tier logic |

---

## Users

| User Type | Description | Goal |
|-----------|-------------|------|
| **GCC Investor** | Saudi investors, family offices, sovereign-adjacent capital holders | Deploy into Malaysian digital infrastructure. Visibility, credibility, clear first step |
| **Malaysian Company** | Data centers, AI companies, solar farms, tech manufacturers | Capital partners, strategic alliances, formal MOU relationships |
| **Government Entity** | Malaysian ministries, MDEC, Saudi embassy, government programs | Oversight, formal documentation, structured bilateral engagement record |
| **Startup / Investment Seeker** | Early-stage companies on either side | Expose financial model to investors, get discovered via AI matching |

All four active in MVP. Platform must feel native to all simultaneously.

---

## Architecture

```
Phase 1 (MVP):  Frontend workflows hardcoded, Mujarrad stores all data
Phase 2 (Full): XyOps configures processes dynamically, Wider Labs AI fully integrated
```

**Tech stack:** React + Vite + TypeScript + Tailwind + shadcn/ui + Framer Motion + react-i18next
**Backend:** Mujarrad (graph DB) — stores partners, engagements, documents, relationships
**Auth:** Google OAuth via Mujarrad (`POST /api/auth/oauth/google`)
**State:** Zustand + localStorage for auth, React Query for server state

---

## Module Feature Mesh

### M1 — Partner Registry (MUST HAVE — Sprint 1)

Partner onboarding and profile management. The entry point for all users.

| Feature | MVP | Phase 2 |
|---------|-----|---------|
| Guided multi-step onboarding, differentiated by user type (investor/company/gov/startup) | Yes | Dynamic form builder via XyOps |
| Structured profile: name, entity type, country, sector, stage, investment capacity or funding need, integration tier interest | Yes | Extended fields |
| Document upload: company registration, MDEC status, investment mandates, MOUs, government credentials | Yes | Version history |
| Profile completeness score — gamified indicator with prompts | Yes | — |
| Public-facing partner card (optional) with privacy controls | Yes | Enhanced visibility settings |
| Admin verification layer — SIA team verifies and badges partners | Yes | Automated pre-screening |
| Profile edit with version history | Yes (via Mujarrad versioning) | — |

**Wider Labs role (Phase 2):** Classifies profiles into structured data objects for matching. Flags incomplete/inconsistent data. Assigns initial compatibility index.

**Implementation:** Multi-step form (2-4 fields/step), Framer Motion transitions, progress bar. Form varies by user type selected in step 1. Store as nodes in Mujarrad. Admin verification queue in admin panel.

---

### M2 — AI-Powered Matching (MUST HAVE — Sprint 2)

Core intelligence. Wider Labs analyses every profile and generates ranked match lists.

| Feature | MVP | Phase 2 |
|---------|-----|---------|
| Automated match suggestions within 24h of profile completion | Manual by SIA team (MVP) | Wider Labs automated |
| Match cards: who, why matched, match strength score | Yes (simplified) | Full AI scoring |
| Two-way matching — both parties indicate interest before connection | Yes | — |
| Match filtering by country, sector, investment size, entity type | Yes | + integration tier filter |
| Match history — log of every match shown/accepted/rejected/pending | Yes | Analytics overlay |
| Opportunity board — curated feed of active opportunities ranked by relevance | Phase 2 | Wider Labs powered |
| "Explain this match" — natural language explanation | Phase 2 | Wider Labs generated |

**Wider Labs role (Phase 2):** Matching algorithm using profile vectors, sector taxonomy, integration tier data, historical signals. Scores on compatibility, urgency, strategic fit. Re-ranks as profiles update.

**Implementation (MVP):** SIA admin manually creates matches from admin panel. Both parties see match card and can accept/decline. On mutual accept → relationship created in M3.

---

### M3 — Relationship Management (MUST HAVE — Sprint 2)

Dynamic relationship tracking once a match is accepted. Every relationship has status, history, next steps, health score.

| Feature | MVP | Phase 2 |
|---------|-----|---------|
| Relationship dashboard — grouped by status: new, in conversation, MOU stage, active, dormant | Yes | Kanban view |
| Relationship timeline — chronological log of interactions, documents, status changes | Yes | — |
| Status progression: introduced → engaged → negotiating → formalised → active (both parties confirm) | Yes | Configurable via XyOps |
| Meeting logger: date, attendees, summary, outcome → appended to timeline | Yes | Calendar integration |
| Document exchange — private document space per relationship | Yes | — |
| Relationship health score | Phase 2 | Wider Labs calculated |
| Notes and tags — internal notes + quick-filter tags | Yes | — |
| Relationship alerts — inactivity, document shared, profile updated | Yes (in-app) | + email alerts |

**Wider Labs role (Phase 2):** Dynamic health scores. Identifies at-risk relationships. Suggests re-engagement actions. Extracts data from meetings/documents to enrich records.

**Implementation:** Relationship as a Mujarrad node linking two partner nodes. Timeline via Mujarrad versioning. Status as node attribute with defined transitions.

---

### M4 — Portfolio Management (MUST HAVE — Sprint 3)

Every partner has a portfolio — structured representation of what they bring to the ecosystem.

| Feature | MVP | Phase 2 |
|---------|-----|---------|
| Portfolio dashboard — visual summary of everything partner owns/manages in ecosystem | Yes | Enhanced analytics |
| Asset entries: name, type (company/project/asset/program), status, sector, valuation range, description | Yes | — |
| For investors: deal tracker — active investments, committed capital, pipeline, exits | Yes | — |
| For companies: project/asset registry — live projects, infrastructure, revenue products, partnerships | Yes | — |
| For government: program registry — national programs, bilateral agreements, MOUs, open mandates | Yes | — |
| Portfolio analytics — total value, sector diversification, tier coverage, activity level | Simplified | Full Wider Labs analytics |
| Portfolio sharing — permission-controlled view for specific match or external party | Yes | — |
| Portfolio history | Yes (via Mujarrad versioning) | — |

**Wider Labs role (Phase 2):** Analyses composition, identifies gaps. Generates health insights: overconcentration, underutilised assets. Enriches with market data/benchmarks.

**Implementation:** Portfolio items as child nodes under partner node in Mujarrad. Type-specific fields via `nodeDetails`. Shareable view generates a read-only token-protected link.

---

### M5 — Financial Model Deployment (MUST HAVE — Sprint 3)

Startups/companies publish structured financial models — visible to matched investors only.

| Feature | MVP | Phase 2 |
|---------|-----|---------|
| Financial model builder — structured form: revenue model, current/projected revenue, funding ask, use of funds, runway, team size, traction | Yes | — |
| Model types: pre-revenue startup, revenue-stage company, infrastructure co-investment, government program seeking private capital | Yes | Custom types |
| Standardised output — financial summary card for quick investor consumption/comparison | Yes | Wider Labs enhanced |
| Visibility controls — only visible to matched + accepted investors, never publicly searchable | Yes | — |
| Investor interest signals — one-action interest → notifies company → initiates M3 relationship | Yes | — |
| Model versioning — updates notify interested investors of material changes | Yes | — |
| AI commentary — strengths, risks, comparable opportunities | Phase 2 | Wider Labs generated |

**Wider Labs role (Phase 2):** Validates inputs for consistency. Generates commentary and risk flags. Scores investor attractiveness. Auto-matches models to investor profiles.

**Implementation:** Financial model as structured Mujarrad node with typed attributes. Summary card rendered from node data. Visibility enforced by relationship check before serving data.

---

### M6 — Integration Journey (MUST HAVE — Sprint 3: Tiers 1-2 only)

The differentiator. Matched pairs begin a formal, structured integration journey through five tiers.

| Tier | Name | MVP | Description |
|------|------|-----|-------------|
| **1** | Service Level | Yes | Define first action/service exchange. Both parties sign off digitally. First formal commitment |
| **2** | Business Level | Yes | Upload/initiate MOU, define project scope, assign project lead, set milestones. SIA facilitates |
| **3** | Company Level | Phase 2 | Co-founder matching. Equity split, roles, country of incorporation. Term sheet template. Legal review required |
| **4A** | Regulatory (Existing) | Phase 2 | SIA allocates relevant regulations/compliance. Country+sector-specific checklist generated |
| **4B** | Regulatory (New Frontier) | Phase 2 | New regulatory pathways flagged for escalation to SIA government relations |
| **5** | Diplomatic | Phase 2 | National program-level partnerships. SIA admin approval. Formal bilateral program entry |

**Features (all tiers):**
| Feature | MVP (Tier 1-2) | Phase 2 (Tier 3-5) |
|---------|----------------|---------------------|
| Integration journey launcher — both parties opt in from 'engaged' status | Yes | — |
| Journey progress tracker — visual stepper with completion % and next action | Yes | Extended for 5 tiers |
| Document vault per journey — structured, auditable storage | Yes | — |
| Digital signatures — sign-off at each tier gate (single/multi-signer) | Yes | — |
| Journey notifications — step-by-step prompts | Yes | — |

**Wider Labs role (Phase 2):** Recommends starting tier. Analyses tier documents for gaps. Generates compliance checklists (4A). Tracks velocity and flags stalled journeys.

**Implementation:** Integration journey as a Mujarrad context node. Tier stages as child nodes with `next` edges. Each partnership creates a journey instance node with `current_tier` attribute. Document vault = child document nodes. Signatures use canvas-based capture with audit trail.

---

## Admin & Operations Panel (Sprint 1)

SIA internal operations. Day-one requirement.

| Feature | MVP |
|---------|-----|
| Partner verification queue — review documents, approve/reject badges | Yes |
| Relationship oversight — all active relationships, health scores, current tier | Yes |
| Integration escalation queue — Tier 4B and 5 flagged partnerships | Phase 2 |
| Analytics dashboard — active partners, matches, relationships by tier, models published, journeys in progress | Simplified |
| Manual match override — suggest match not surfaced by algorithm | Yes |
| Announcement broadcaster — platform-wide or targeted notifications | Yes |

---

## Organization & Team Model (MVP)

```
Partner Organization (shared workspace)
├── Owner (created the org)
├── Member (invited, same access)
├── Member
└── Member

All members: same access to org profile, engagements, documents, signatures, portfolio.
No roles in MVP — everyone has equal access.
Phase 2: teams under org with role-based access.
```

**Invitation flow:**
1. Owner → Settings → Invite Member → enters email
2. Invitee receives email with link
3. Signs up or logs in with Gmail (Google OAuth)
4. Automatically joins the org with full access

---

## Digital Signature Flow

```
1. Document uploaded to an engagement/journey tier (by SIA or partner)
2. Signers selected (one or multiple from org(s))
3. Each signer notified (in-app + email)
4. Signer opens doc → reviews → draws/types signature → submits
5. All required signers complete → document finalized
6. Audit trail stored: timestamp, IP, signer identity, document hash
7. If signature is a tier/stage gate → journey/engagement advances automatically
```

---

## Partner Home (Dashboard)

```
┌─────────────────────────────────────────────────────┐
│  Welcome back, [Company Name]                       │
│  [Entity Type] · Partner since [date] · [sector]    │
│  Profile completeness: ████████░░ 80%  [Complete]   │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ⚡ Action Required                                 │
│  ┌──────────────────────────────────────┐           │
│  │ Sign MOU for Integration #3  [Sign]  │           │
│  │ New match suggestion         [View]  │           │
│  │ Complete financial model      [Edit] │           │
│  └──────────────────────────────────────┘           │
│                                                     │
│  🤝 Active Relationships                           │
│  ┌────────────────────────────────────────────────┐ │
│  │ Acme Corp — Engaged       Tier 1  ██░░░  20%  │ │
│  │ GovTech MY — Negotiating  Tier 2  ████░  60%  │ │
│  │ AlFaisal — Active Partner Tier 2  █████ 100%  │ │
│  └────────────────────────────────────────────────┘ │
│                                                     │
│  📊 Portfolio: 3 assets · $12M total · 2 sectors    │
│                                                     │
│  📋 Recent Activity                                 │
│  • New match: DataVault MY (95% fit) — 2h ago       │
│  • MOU uploaded for Integration #3 — 1d ago         │
│  • You signed NDA for Acme Corp — 3d ago            │
│                                                     │
│  [+ New Engagement]  [View Matches]  [View Portfolio]│
│                                                     │
│  👥 Team: Omar, Sarah, Ahmed          [Manage Team] │
└─────────────────────────────────────────────────────┘
```

---

## Pages (MVP)

| Route | Page | Auth | Sprint |
|-------|------|------|--------|
| `/` | Marketing landing page (current site) | No | — |
| `/login` | Google OAuth login | No | 1 |
| `/onboarding` | Multi-step partner registration (varies by user type) | Yes | 1 |
| `/home` | Partner Home dashboard | Yes | 1 |
| `/matches` | Match suggestions + history | Yes | 2 |
| `/matches/:id` | Match detail + accept/decline | Yes | 2 |
| `/relationships` | All relationships list | Yes | 2 |
| `/relationships/:id` | Relationship detail, timeline, documents, status | Yes | 2 |
| `/portfolio` | Portfolio dashboard + asset list | Yes | 3 |
| `/portfolio/new` | Add portfolio asset | Yes | 3 |
| `/financial-model` | Financial model builder/editor | Yes | 3 |
| `/integrations` | Active integration journeys | Yes | 3 |
| `/integrations/:id` | Journey detail, tier progress, docs, signatures | Yes | 3 |
| `/documents` | Org document vault | Yes | 1 |
| `/settings` | Org profile, team members, invitations | Yes | 1 |
| `/admin` | SIA admin panel (verification, matches, oversight) | Admin only | 1 |

---

## Non-Functional Requirements

| Requirement | Specification |
|-------------|--------------|
| **Data residency** | Malaysian entity data on Malaysia-based infra (Cyberjaya). Saudi data PDPL compliant |
| **Security** | E2E encryption for documents. RBAC across modules. Audit log for all admin actions |
| **Performance** | Match generation < 24h. Page load < 2s. Mobile-responsive all core modules |
| **Languages** | English + Arabic (MVP). Bahasa Malaysia (Phase 2) |
| **Authentication** | Google OAuth (MVP). Email + password with 2FA (Phase 2). Microsoft SSO (Phase 2) |
| **Compliance** | PDPA (Malaysia), PDPL (Saudi Arabia). GDPR-compatible data handling |
| **Uptime** | 99.5% availability. Incident response < 4 hours |
| **Scale** | MVP: 500 concurrent partners. Architecture supports 10x without redesign |

---

## Sprint Plan

| Sprint | Weeks | Modules | Goal |
|--------|-------|---------|------|
| **1** | 1-4 | M1 (Partner Registry) + Admin Panel + Auth + Org/Team | First 10 partners onboarded and verified |
| **2** | 5-8 | M2 (Matching) + M3 (Relationship Mgmt) | First matches made, first relationships initiated |
| **3** | 9-12 | M4 (Portfolio) + M5 (Financial Model) + M6 (Integration Tiers 1-2) | First financial model published, first integration journey started |

---

## Success Metrics

| Metric | Target | Timeframe |
|--------|--------|-----------|
| Partners onboarded | 50 verified across all 4 types | 60 days post-launch |
| Match acceptance rate | 40%+ of matches → mutual accept | Ongoing |
| Relationships initiated | 20+ active | 30 days post-launch |
| Integration journeys started | 5+ | 90 days |
| Financial models published | 10+ | 60 days |
| MOUs facilitated | 2+ initiated/signed via platform | 90 days |
| User retention | 60%+ return within 30 days | Ongoing |

---

## Open Source Reference Matrix

| What | From | Stack Match |
|------|------|-------------|
| Dashboard shell (sidebar, tables, cards) | satnaing/shadcn-admin | **Exact** (Vite + React + TS + shadcn) |
| Auth (Google OAuth, store, protected routes) | Mujarrad-Frontend (own) | **Exact** |
| Multi-step form UX | Tally.so | UX inspiration (simplified) |
| Relationship/engagement lifecycle | Peppermint | Medium (Next.js) |
| Digital signatures | Documenso | High (Next.js + TS, MIT) |
| Document vault/sharing | Papermark | High (Next.js + TS) |
| CRM deal pipeline patterns | NextCRM | High (Next.js + shadcn) |
| Kanban boards | Kiranism/next-shadcn-dashboard-starter | High (shadcn + dnd-kit) |

---

## Implementation Path (Sprint 1 Focus)

1. **Auth** — Google OAuth via Mujarrad, Zustand store, protected routes
2. **Routing** — react-router-dom, all Sprint 1 pages
3. **Partner onboarding** — Multi-step form differentiated by user type (4 paths)
4. **Org creation + invitations** — Create org, invite by email, join on Gmail signup
5. **Partner Home** — Action required + relationships + portfolio summary + activity feed
6. **Profile completeness** — Score + prompts to fill missing sections
7. **Document vault** — Upload/download per org, tied to engagements
8. **Admin panel** — Partner verification queue, manual match, announcements
9. **Digital signatures** — Canvas capture, multi-signer, audit trail
10. **Replace CTAs** — "Schedule a Conversation" → "Get Started" → login → onboarding → Partner Home
