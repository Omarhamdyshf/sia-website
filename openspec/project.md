# Project Context

## Purpose
SIA Platform — a bilingual (EN/AR) B2B deal facilitation platform for the Saudi Arabia-Malaysia investment corridor ($2M-$50M deals). Two-part system:
1. **SIA Website** (siaportal.com) — Public marketing site converting visitors to portal users
2. **SIA Portal** — Private application for partner matching, OKR alignment, deal rooms, document workflows (LOI→NDA→MoU→Contract), and financial modeling

Strategic positioning: Between Big 4 consulting (expensive, enterprise) and generic platforms (no corridor expertise). Mid-market deals, 6-month cycles vs 12-18 months, bilingual, corridor-expert.

## Tech Stack

### Foundation Framework
- **refine.dev** — Headless React meta-framework for data-intensive B2B apps. Owns: data provider (CRUD), auth provider, access control, resource routing, `@refinedev/react-hook-form` for CRUD forms, notification provider, i18n provider, audit log, real-time updates

### Frontend
- React 19 + TypeScript
- Vite 7 (build tool)
- React Router (routing, driven by refine resource definitions)
- Tailwind CSS 3.4 (styling)
- shadcn/ui (60+ pre-installed components)
- Framer Motion (animations)
- Three.js + Drei (3D: Globe, WorldMap — website only)
- Lucide React (icons)

### State & Data
- refine data provider → Mujarrad (custom adapter, ~200 lines)
- refine auth provider → Mujarrad JWT + Google OAuth (custom adapter, ~80 lines)
- Zustand (ephemeral UI state: sidebar, modals, theme)
- react-i18next (translations, via refine i18n provider adapter)
- sonner (toasts, via refine notification provider adapter)

### UI Shell (from shadcn-admin)
- App shell, sidebar, navigation, command palette (cmdk)
- Dark/light theme, error pages, settings pages
- Auth UI pages (sign-in, sign-up, OTP)
- Data table UI components (7 reusable, wired to refine `useTable`)
- RTL layout support

## Project Conventions

### Code Style
- TypeScript strict mode
- Functional components with hooks
- shadcn/ui component library as the base UI layer
- Tailwind utility classes, SIA design tokens: Gold #C8A951, Charcoal #1C1C1E, Silver #C0C0C0
- Playfair Display (headings) + Inter (body) typography
- IBM Plex Arabic for Arabic sections

### Architecture Patterns
- Component-based React architecture
- Section components compose into pages (Hero, TrustBar, ValueProps, Stats, etc.)
- Mujarrad SDK for all data operations (nodes + relationships)
- API key authentication (X-API-Key / X-API-Secret headers)
- Node types: CONTEXT (identity), REGULAR (data), ASSUMPTION (drafts), TEMPLATE (blueprints)

### Testing Strategy
- Component testing with React Testing Library
- Lighthouse performance targets: 90+ score
- Bilingual testing: both EN and AR layouts must be verified
- RTL layout validation for Arabic

### Git Workflow
- Feature branches off main
- PRs with clear descriptions
- Conventional commits

## Domain Context
- **Investment Corridor:** $18B+ annual bilateral trade between Saudi Arabia and Malaysia
- **Four User Personas:** GCC Investor, Malaysian Company, Government Entity, Startup/Investment Seeker
- **Deal Lifecycle:** Introduction → Engagement → Negotiation → Formalization → Active Partnership
- **Integration Tiers:** Tier 1 (Service) → Tier 2 (Business) → Tier 3 (Company) → Tier 4 (Regulatory) → Tier 5 (Diplomatic)
- **OKR Flywheel:** Free OKR module attracts users → OKRs create data → Data reveals matches → Matches drive conversion
- **Seven Superpowers:** Find, Align, Document, Sign, Audit, Communicate, Project

## Important Constraints
- Bilingual day 1 (Arabic not bolted on later) — RTL support mandatory
- 3-color discipline: Gold, Charcoal, Silver only
- Institutional tone: professional, data-driven, no startup-casual language
- Must position away from crypto/DeFi (prior site was an Ondo Finance clone)
- Mujarrad SDK stability gates portal development

## External Dependencies
- Mujarrad API: `https://mujarrad.onrender.com/api` (knowledge-based backend)
- Google OAuth (via Mujarrad auth)
- Resend or SendGrid (contact forms)
- Google Analytics 4 (tracking)
- Vercel or similar (hosting)
