# SIA Portal — Open Source Resource Registry

**Version:** 2.0
**Date:** April 2026
**Purpose:** Curated open source repos matching our stack (React + Vite + TypeScript + Tailwind + shadcn/ui) with permissive licenses for safe commercial use. Each resource maps to one or more PRD modules.

**Stack:** React 19 · Vite · TypeScript · Tailwind CSS · shadcn/ui · Framer Motion · Zustand · React Query · Zod · react-hook-form · react-i18next · Recharts

> **License Policy:** Only repos with **MIT**, **Apache 2.0**, **ISC**, or **BSD** licenses are recommended for direct code use. AGPL/GPL repos are listed as **inspiration only** — do not copy code from them into our codebase.

---

## Table of Contents

1. [Admin Dashboard Shells](#1-admin-dashboard-shells)
2. [CRM & Relationship Management](#2-crm--relationship-management)
3. [Kanban & Drag-and-Drop](#3-kanban--drag-and-drop)
4. [Data Tables](#4-data-tables)
5. [Charts & Analytics](#5-charts--analytics)
6. [Digital Signatures](#6-digital-signatures)
7. [Document Management](#7-document-management)
8. [Multi-Step Forms & Onboarding](#8-multi-step-forms--onboarding)
9. [Authentication & OAuth](#9-authentication--oauth)
10. [Internationalization & RTL](#10-internationalization--rtl)
11. [File Upload](#11-file-upload)
12. [Notifications & Announcements](#12-notifications--announcements)
13. [Onboarding Tours](#13-onboarding-tours)
14. [Collaborative Document Editor](#14-collaborative-document-editor)
15. [Legal Document Templates](#15-legal-document-templates)
16. [OKR & Goal Management](#16-okr--goal-management)
17. [Chat & Deal Rooms](#17-chat--deal-rooms)
18. [AI Chat Interface](#18-ai-chat-interface)
19. [Business Model Canvas](#19-business-model-canvas)
20. [Subscription, Paywall & Pricing](#20-subscription-paywall--pricing)
21. [PDF Generation & Report Export](#21-pdf-generation--report-export)
22. [Timeline & Activity Feed](#22-timeline--activity-feed)
23. [Email Service](#23-email-service)
24. [Gantt Charts & Milestones](#24-gantt-charts--milestones)
25. [Compliance Checklists](#25-compliance-checklists)
26. [Financial Charts](#26-financial-charts)
27. [Portfolio & Finance (Inspiration Only)](#27-portfolio--finance-inspiration-only)

---

## 1. Admin Dashboard Shells

**Maps to:** Admin Panel, Partner Home Dashboard, all layout/navigation

### satnaing/shadcn-admin ★ TOP PICK

- **URL:** https://github.com/satnaing/shadcn-admin
- **Stars:** ~11,800 · **License:** MIT
- **Stack:** React 19, Vite 8, TypeScript, Tailwind CSS 4, shadcn/ui, TanStack Router, TanStack Table, Zustand, Recharts, Zod, react-hook-form, Lucide icons
- **Modules:**
  - Collapsible sidebar with nested navigation
  - Light/dark mode toggle
  - Global search command palette (cmdk)
  - 10+ pre-built pages (dashboard, auth, errors, settings, users)
  - Data tables with sorting, filtering, pagination (TanStack Table)
  - Charts and analytics widgets (Recharts)
  - Forms with validation (react-hook-form + Zod)
  - Auth pages (sign-in, sign-up, forgot password, OTP)
  - RTL (right-to-left) support
  - Toast notifications (Sonner)
  - Fully responsive and accessible
- **Why:** Exact stack match. Most mature Vite-based shadcn admin dashboard. Actively maintained.

### shadcnstore/shadcn-dashboard-landing-template

- **URL:** https://github.com/shadcnstore/shadcn-dashboard-landing-template
- **Stars:** ~663 · **License:** MIT
- **Stack:** React 19, TypeScript, Vite (has `vite-version/` directory), Tailwind CSS v4, shadcn/ui v3, Recharts
- **Modules:**
  - 30+ pages total
  - 2 dashboard variants (overview + analytics)
  - App demos: Mail, Tasks, Chat, Calendar, Users
  - Auth pages (login, signup)
  - Settings and error pages
  - FAQ and pricing pages
  - Data tables with sorting, filtering, pagination
  - Multiple sidebar layout variants
  - Live theme customizer (tweakcn)
  - Landing page template included
- **Why:** More pages than shadcn-admin. Ships both Vite and Next.js versions — use the `vite-version/` directory.

### yluiop123/orange

- **URL:** https://github.com/yluiop123/orange
- **Stars:** ~491 · **License:** MIT
- **Stack:** React 19, Vite 6, Zustand, shadcn/ui, Tailwind CSS, React Router v7, react-intl, MSW
- **Modules:**
  - Dashboard page with charts
  - Forms
  - Internationalization (react-intl)
  - Mock Service Worker for API mocking during development
- **Why:** Has i18n built in. Useful as a reference for multi-language Vite + Zustand setup.

---

## 2. CRM & Relationship Management

**Maps to:** M2 (Matching), M3 (Relationship Management), M6 (Integration Journey)

### marmelab/atomic-crm ★ TOP PICK

- **URL:** https://github.com/marmelab/atomic-crm
- **Stars:** ~936 · **License:** MIT
- **Stack:** React, TypeScript, shadcn/ui, Tailwind CSS, react-admin, TanStack Query, Supabase, PostgreSQL
- **Modules:**
  - Contact management (Contacts, Companies)
  - Deal pipeline with Kanban board
  - Notes and Tasks with reminders
  - Activity timeline / aggregated activity logs
  - Email capture (CC the CRM to auto-save emails as notes)
  - Contact enrichment (auto-pulls avatars)
  - Tags system
  - Import/Export
  - AI assistant integration for natural language queries
  - Multilingual support
  - Custom fields on all entities
- **Why:** Exact stack match (shadcn/ui + Tailwind). Small codebase (~15k lines) — easy to study and extract patterns. Deal pipeline + activity timeline directly maps to M3.

### pdovhomilja/nextcrm-app

- **URL:** https://github.com/pdovhomilja/nextcrm-app
- **Stars:** ~579 · **License:** MIT
- **Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, shadcn/ui, Prisma 7, PostgreSQL, Better Auth
- **Modules:**
  - CRM with contacts and companies
  - Deal/opportunity management
  - Project management
  - Invoicing system (multi-currency, tax rates, PDF generation)
  - Document storage (S3-compatible)
  - Email client
  - Activity feed (notes, calls, emails, meetings, tasks) linked to CRM entities
  - Audit log and history with soft delete and field-level change trail
  - AI enrichment for contact/company data
- **Why:** Also shadcn/ui + Tailwind + TypeScript. The audit trail and activity feed patterns map directly to M3 relationship timeline.

### refinedev/refine

- **URL:** https://github.com/refinedev/refine
- **Stars:** ~34,500 · **License:** MIT
- **Stack:** React, TypeScript, Vite, supports multiple UI frameworks, GraphQL and REST data providers
- **Modules (CRM template):**
  - Dashboard with key metrics
  - Sales pipeline (Kanban-style)
  - Contact management (Companies, Contacts)
  - Calendar / appointment scheduling
  - Scrumboard / project management
  - Quotes generation
  - Swappable UI library and API layer
- **Why:** Massive community. Data provider abstraction pattern is excellent for building backend-agnostic features. CRM template demonstrates complete pipeline architecture.

### harryho/react-crm

- **URL:** https://github.com/harryho/react-crm
- **Stars:** ~522 · **License:** MIT
- **Stack:** React, TypeScript, Redux, Material-UI
- **Modules:**
  - Contact management
  - Lead management
  - Opportunity/deal tracking
  - Dashboard
- **Why:** Simple CRM data models and entity relationship patterns. Good lightweight reference.

---

## 3. Kanban & Drag-and-Drop

**Maps to:** M3 (Relationship status kanban), M6 (Integration journey tracking)

### Georgegriff/react-dnd-kit-tailwind-shadcn-ui ★ TOP PICK

- **URL:** https://github.com/Georgegriff/react-dnd-kit-tailwind-shadcn-ui
- **Stars:** ~809 · **License:** MIT
- **Stack:** React, TypeScript, @dnd-kit, Tailwind CSS, shadcn/ui
- **Modules:**
  - Accessible kanban board with drag-and-drop columns and cards
  - Built specifically with @dnd-kit + shadcn/ui
  - Live demo on GitHub Pages
- **Why:** Exact stack match (dnd-kit + shadcn/ui + Tailwind). Clean, reference-quality kanban implementation.

### hello-pangea/dnd

- **URL:** https://github.com/hello-pangea/dnd
- **Stars:** ~3,900 · **License:** Apache 2.0
- **Stack:** TypeScript, React
- **Modules:**
  - Maintained fork of react-beautiful-dnd (drop-in replacement)
  - Vertical, horizontal, and cross-list movement
  - Virtual list support (10,000 items at 60fps)
  - Multi-drag, keyboard/screen-reader accessibility
  - Auto-scrolling, custom drag handles, SSR support
- **Why:** Battle-tested library with 2M+ weekly npm downloads. Use if you need virtual list support for large datasets.

### mehrdadrafiee/recursive-dnd-kanban-board

- **URL:** https://github.com/mehrdadrafiee/recursive-dnd-kanban-board
- **Stars:** ~80 · **License:** MIT
- **Stack:** Next.js, TypeScript, @dnd-kit, Tailwind CSS, shadcn/ui
- **Modules:**
  - Recursively-generated column structure (dynamic, flexible layout)
  - Full accessibility support
- **Why:** Good reference for deeply nested task hierarchies and dynamic column structures.

---

## 4. Data Tables

**Maps to:** Admin Panel (verification queue, partner lists), M2 (match history), M4 (portfolio asset lists)

### sadmann7/tablecn ★ TOP PICK

- **URL:** https://github.com/sadmann7/tablecn
- **Stars:** ~6,100 · **License:** MIT
- **Stack:** Next.js, TanStack Table, shadcn/ui, Tailwind CSS, Drizzle ORM, Zod
- **Modules:**
  - Server-side pagination, sorting, and filtering
  - Auto-generated filters from column definitions
  - Dynamic toolbar with search, filters, and actions
  - Advanced Notion/Airtable-style filtering
  - Linear-style command palette filter menu
  - Action bar triggered by row selection
  - Customizable columns
- **Why:** Most-starred shadcn data table implementation. Comprehensive feature set for admin panel tables.

### openstatusHQ/data-table-filters

- **URL:** https://github.com/openstatusHQ/data-table-filters
- **Stars:** ~2,000 · **License:** MIT
- **Stack:** React, TypeScript, TanStack Table, TanStack Query, shadcn/ui, Zustand, nuqs, dnd-kit, Zod, Recharts
- **Modules:**
  - Declarative schema system with `col.*` factories
  - Four filter types with command palette + keyboard shortcuts
  - Infinite scroll with server-side filtering
  - Multiple state adapters (URL-based, client-side, in-memory)
  - Cell renderers for common data types
  - Row detail panels + drag-and-drop
  - AI-powered natural language filter inference
  - Installable as shadcn registry blocks
- **Why:** Uses Zustand (matches our state management). Infinite scroll pattern useful for large partner/match lists.

---

## 5. Charts & Analytics

**Maps to:** Admin analytics dashboard, M4 (portfolio analytics), Partner Home dashboard

### recharts/recharts

- **URL:** https://github.com/recharts/recharts
- **Stars:** ~27,000 · **License:** MIT
- **Stack:** TypeScript, React, D3
- **Modules:**
  - Composable chart components (Line, Bar, Area, Pie, Radar, Scatter, Treemap)
  - Responsive containers
  - Customizable tooltips and legends
  - Animation support
- **Why:** Already in our stack. The charting library that shadcn/ui chart components wrap.

### tremorlabs/tremor

- **URL:** https://github.com/tremorlabs/tremor
- **Stars:** ~3,400 · **License:** Apache 2.0
- **Stack:** TypeScript, React, Tailwind CSS, Radix UI
- **Modules:**
  - Dashboard-specific components (AreaChart, BarChart, DonutChart, LineChart)
  - KPI cards and stat trackers
  - Progress bars
  - Designed specifically for analytics dashboards
- **Why:** Works alongside shadcn/ui. Provides higher-level dashboard components (KPI cards, stat trackers) that complement raw Recharts.

---

## 6. Digital Signatures

**Maps to:** M6 (Integration journey sign-offs), Digital Signature Flow

### szimek/signature_pad ★ TOP PICK

- **URL:** https://github.com/szimek/signature_pad
- **Stars:** ~11,900 · **License:** MIT
- **Stack:** TypeScript, vanilla JS (framework-agnostic)
- **Modules:**
  - Smooth Bezier curve-based signature rendering
  - Export to PNG/SVG/data URL
  - Undo support
  - Responsive canvas
  - Touch + mouse support
  - Zero dependencies
- **Why:** The core drawing engine. Wrap it in our own shadcn/ui styled component.

### agilgur5/react-signature-canvas

- **URL:** https://github.com/agilgur5/react-signature-canvas
- **Stars:** ~650 · **License:** Apache 2.0
- **Stack:** TypeScript, React
- **Modules:**
  - Thin React wrapper for szimek/signature_pad (<150 LoC)
  - Canvas trimming (removes whitespace)
  - All signature_pad methods exposed
  - TypeScript types included
- **Why:** Ready-to-use React component. Lightweight wrapper — easy to style with our design system.

### michaeldzjap/react-signature-pad-wrapper

- **URL:** https://github.com/michaeldzjap/react-signature-pad-wrapper
- **Stars:** ~230 · **License:** MIT
- **Stack:** TypeScript, React
- **Modules:**
  - React wrapper for signature_pad
  - Automatic canvas resizing
  - TypeScript support
- **Why:** Alternative React wrapper with auto-resizing canvas.

---

## 7. Document Management

**Maps to:** Document vault per org/engagement, M6 (journey document vault)

> **Note:** The major open source document platforms (Documenso, Papermark) use **AGPL-3.0** licenses, which are copyleft and incompatible with proprietary use without purchasing a commercial license. Listed below as architectural inspiration only.

### AGPL — Inspiration Only

| Repo | Stars | License | Use For |
|------|-------|---------|---------|
| [documenso/documenso](https://github.com/documenso/documenso) | ~12,700 | AGPL-3.0 | Document signing flow UX, multi-recipient patterns, audit trail design |
| [OpenSignLabs/OpenSign](https://github.com/OpenSignLabs/OpenSign) | ~6,200 | AGPL-3.0 | PDF signing UX, template system |
| [papermark/papermark](https://github.com/papermark/papermark) | ~8,200 | AGPL-3.0 | Document sharing analytics, page-by-page tracking, data room patterns, NDA/email capture before viewing |

### Recommended Approach

Build a custom document vault using permissive-licensed building blocks:
- **react-dropzone** for upload UI (see [File Upload](#11-file-upload))
- **react-signature-canvas** for signature capture (see [Digital Signatures](#6-digital-signatures))
- **Mujarrad** for document node storage and versioning
- Study Papermark and Documenso for UX patterns but implement from scratch

---

## 8. Multi-Step Forms & Onboarding

**Maps to:** M1 (Partner onboarding), M5 (Financial model builder)

### jcmcneal/react-step-wizard

- **URL:** https://github.com/jcmcneal/react-step-wizard
- **Stars:** ~590 · **License:** MIT
- **Stack:** JavaScript, React
- **Modules:**
  - Hash-based routing for steps
  - Animated transitions
  - Named step navigation
  - No UI opinion (bring your own styling — pairs with shadcn/ui)
  - Lazy-mountable steps
- **Why:** Flexible, unstyled step wizard that we can wrap with shadcn/ui components and Framer Motion transitions.

### srdjan/react-multistep

- **URL:** https://github.com/srdjan/react-multistep
- **Stars:** ~670 · **License:** MIT
- **Stack:** TypeScript, React
- **Modules:**
  - Simple step-based navigation
  - Progress indicator
  - Configurable step titles
  - Lightweight
- **Why:** Simple and quick to integrate. Good for straightforward linear flows.

### martiserra99/formity

- **URL:** https://github.com/martiserra99/formity
- **Stars:** ~405 · **License:** MIT
- **Stack:** TypeScript, React
- **Modules:**
  - Conditional step logic and branching flows
  - Form state management across steps
  - Validation per step
  - Dynamic step ordering
- **Why:** Perfect for SIA onboarding where different user types (investor/company/gov/startup) see different form paths.

### damianricobelli/stepperize

- **URL:** https://github.com/damianricobelli/stepperize
- **Stars:** ~1,600 · **License:** Check repo
- **Stack:** TypeScript, React
- **Modules:**
  - Type-safe step definitions
  - Hooks-based API
  - Works with any UI library (pairs with shadcn/ui)
  - Step validation and navigation guards
- **Why:** Type-safe stepper designed to compose with shadcn/ui. Hooks-based API integrates cleanly with react-hook-form + Zod validation.

---

## 9. Authentication & OAuth

**Maps to:** Auth (Google OAuth), Org/Team model, protected routes

### better-auth/better-auth ★ TOP PICK

- **URL:** https://github.com/better-auth/better-auth
- **Stars:** ~27,900 · **License:** MIT
- **Stack:** TypeScript (100%)
- **Modules:**
  - Framework-agnostic (works with React, Vite)
  - Google, GitHub, Apple, Discord social providers built-in
  - 2FA, multi-tenancy (teams, roles, invitations, access control)
  - SSO, SAML 2.0, SCIM, directory sync
  - Plugin ecosystem (Stripe, passkeys, magic links, API keys, JWTs)
  - React client: `createAuthClient` from `better-auth/react`
- **Why:** Comprehensive, TypeScript-first. Built-in multi-tenancy with teams/roles/invitations maps directly to SIA's Org/Team model.

### MomenSherif/react-oauth

- **URL:** https://github.com/MomenSherif/react-oauth
- **Stars:** ~1,300 · **License:** MIT
- **Stack:** TypeScript, React
- **Modules:**
  - `@react-oauth/google` — Google Identity Services SDK wrapper
  - Sign In With Google button, One-tap sign-up, auto sign-in
  - Implicit and Authorization Code flows
  - Built-in CSRF protection
  - Zero runtime dependencies
- **Why:** Lightweight Google-only client-side SDK. If Mujarrad handles backend auth, this provides the frontend Google OAuth button.

### wpcodevo/google-github-oath2-reactjs

- **URL:** https://github.com/wpcodevo/google-github-oath2-reactjs
- **Stars:** ~28 · **License:** Not specified
- **Stack:** TypeScript, React, Vite, Tailwind CSS, Zustand
- **Modules:**
  - Google OAuth2 + GitHub OAuth implementation
  - Zustand store for auth state management
  - Protected page access
  - Token-based auth flow
- **Why:** Reference for wiring Zustand + OAuth together — matches our exact state management pattern (Zustand + localStorage for auth).

---

## 10. Internationalization & RTL

**Maps to:** English + Arabic (MVP), Bahasa Malaysia (Phase 2)

### i18next/react-i18next ★ ALREADY IN STACK

- **URL:** https://github.com/i18next/react-i18next
- **Stars:** ~10,000 · **License:** MIT
- **Stack:** JavaScript, TypeScript, React
- **Modules:**
  - Hooks-based API (`useTranslation`)
  - ICU message syntax (interpolation, plurals, rich text)
  - Trans component for JSX-embedded translations
  - Massive plugin ecosystem (language detection, backend loaders, caching)
  - RTL support via `dir` attribute detection based on active language
- **Why:** Already in our dependencies. Industry standard for React i18n.

### RTL Implementation Pattern

For Arabic RTL support with Tailwind CSS:
- Use Tailwind's `rtl:` variant for directional styles
- Toggle `dir="rtl"` on `<html>` based on active i18next language
- Reference: [saifabusaleh/react-i18n-rtl-demo](https://github.com/saifabusaleh/react-i18n-rtl-demo) for wiring pattern

---

## 11. File Upload

**Maps to:** M1 (document upload), M6 (document vault), profile/org documents

### transloadit/uppy ★ TOP PICK

- **URL:** https://github.com/transloadit/uppy
- **Stars:** ~30,700 · **License:** MIT
- **Stack:** TypeScript, JavaScript, React (`@uppy/react` package)
- **Modules:**
  - Drag-and-drop with file previews (images/video/audio)
  - Upload progress bars
  - Resumable uploads (tus protocol)
  - Webcam capture
  - Import from Dropbox/Google Drive/URL
  - Image editing/cropping
  - Modular plugin architecture
- **Why:** Most full-featured upload library. Plugin architecture means we only include what we need.

### react-dropzone/react-dropzone

- **URL:** https://github.com/react-dropzone/react-dropzone
- **Stars:** ~11,000 · **License:** MIT
- **Stack:** JavaScript, React (hooks-based)
- **Modules:**
  - Drag-and-drop zone
  - File type/size validation
  - Multiple file support
  - Accessible, hooks-based (`useDropzone`)
  - Lightweight and composable
- **Why:** Minimal drop zone — pairs perfectly with shadcn/ui for custom styled upload areas. Build our own preview/progress UI on top.

### pqina/filepond

- **URL:** https://github.com/pqina/filepond
- **Stars:** ~16,400 · **License:** MIT
- **Stack:** JavaScript (React adapter: `react-filepond`)
- **Modules:**
  - Drag-and-drop with image preview
  - File validation
  - Upload progress
  - Image editing/cropping/resizing
  - Plugin-based architecture (preview, size validation, type validation, image transform)
- **Why:** Plugin-based like Uppy but with a different UI approach. Good middle ground between Uppy (heavy) and react-dropzone (minimal).

---

## 12. Notifications & Announcements

**Maps to:** Relationship alerts, journey notifications, admin announcement broadcaster

### novuhq/novu ★ TOP PICK

- **URL:** https://github.com/novuhq/novu
- **Stars:** ~38,800 · **License:** MIT (core) + Commercial Enterprise
- **Stack:** TypeScript
- **Modules:**
  - Embeddable In-App Inbox component with real-time support
  - Multi-channel: Email (14+ providers), SMS (15+), Push (5), Chat (4)
  - Digest engine (combines multiple notifications into one)
  - No-code email block editor
  - Notification workflow engine
  - User preference management component
  - React, Vue, Angular components + headless JS SDK
- **Why:** Full notification center with inbox, multi-channel delivery, and workflow engine. Ideal for investor portal announcement system + relationship alerts.

### emilkowalski/sonner ★ ALREADY IN STACK

- **URL:** https://github.com/emilkowalski/sonner
- **Stars:** ~12,300 · **License:** MIT
- **Stack:** TypeScript, React
- **Modules:**
  - Opinionated toast component for React
  - Official shadcn/ui integration
  - Simple API: place `<Toaster />`, call `toast()` anywhere
  - Beautiful animations, swipe-to-dismiss
- **Why:** Already in our dependencies. Use for ephemeral in-app toasts. Novu handles persistent notification center.

---

## 13. Onboarding Tours

**Maps to:** First-time user experience, feature discovery

### gilbarbara/react-joyride

- **URL:** https://github.com/gilbarbara/react-joyride
- **Stars:** ~7,700 · **License:** MIT
- **Stack:** TypeScript, React
- **Modules:**
  - Step-by-step guided tours
  - Spotlight/overlay effects
  - Tooltip positioning
  - Scroll-to-step
  - Callback events
  - Custom styling
  - Controlled/uncontrolled modes
- **Why:** Industry standard for React guided tours. Perfect for walking new partners through the dashboard after onboarding.

---

## 14. Collaborative Document Editor

**Maps to:** Deal document lifecycle (LOI → NDA → MoU → Contract), collaborative editing, tracked changes, comments

### udecode/plate ★ TOP PICK

- **URL:** https://github.com/udecode/plate
- **Stars:** ~16,200 · **License:** MIT
- **Stack:** TypeScript, React, Slate.js, shadcn/ui, Tailwind CSS
- **Modules:**
  - Rich-text editor framework built on Slate.js with AI integration
  - ~50+ plugins: comments, suggestions (track changes), mentions, tables, media embeds
  - **Built-in comments plugin and suggestions/track-changes plugin** — key differentiator
  - Deep shadcn/ui integration — ready-made UI components
  - Real-time collaboration via Yjs
  - AI autocompletion via Vercel AI SDK
- **Why:** Only major editor with OSS track changes + comments. Native shadcn/ui integration means it fits our design system perfectly.

### ueberdosis/tiptap

- **URL:** https://github.com/ueberdosis/tiptap
- **Stars:** ~36,400 · **License:** MIT
- **Stack:** TypeScript, ProseMirror core
- **Modules:**
  - Headless (renderless) rich text editor framework
  - Built on ProseMirror; works with React, Vue, Svelte
  - Extension-based architecture (bold, italic, tables, mentions, code blocks)
  - Real-time collaboration via Yjs integration (`@tiptap/extension-collaboration`)
  - Extensive community extensions ecosystem
- **Note:** Track changes and comments are in Tiptap Pro (paid). Core editor + Yjs collab remain MIT.

### facebook/lexical

- **URL:** https://github.com/facebook/lexical
- **Stars:** ~23,300 · **License:** MIT
- **Stack:** TypeScript, framework-agnostic (React bindings provided)
- **Modules:**
  - Extensible text editor framework by Meta
  - Plugin system for comments, mentions, tables, code highlighting, embeds
  - Collaboration plugin (Yjs-based)
  - Custom node system for extending the editor model
- **Why:** Excellent reliability and performance. Lower-level than Plate — more DIY but maximum control.

### steven-tey/novel

- **URL:** https://github.com/steven-tey/novel
- **Stars:** ~16,200 · **License:** Apache 2.0
- **Stack:** TypeScript, Next.js, Tiptap/ProseMirror, Vercel AI SDK
- **Modules:**
  - Notion-style WYSIWYG editor with AI-powered autocompletion
  - Slash commands, bubble menus, drag handles
  - Drop-in component
- **Why:** Beautiful UX for simple editing. No built-in collab/track changes — layer on top via Tiptap extensions + Yjs.

### yjs/yjs (Collaboration Layer)

- **URL:** https://github.com/yjs/yjs
- **Stars:** ~21,700 · **License:** MIT
- **Stack:** JavaScript, CRDT-based
- **Modules:**
  - Shared data types (Y.Text, Y.Array, Y.Map) for collaborative software
  - CRDT-based — no central server required for conflict resolution
  - Offline-first, peer-to-peer capable
  - Bindings for ProseMirror, Slate, Lexical, CodeMirror, Monaco
  - Awareness protocol for cursors/presence
- **Why:** The collaboration layer for any editor. Pair with Plate or Tiptap.

### ueberdosis/hocuspocus (Collaboration Server)

- **URL:** https://github.com/ueberdosis/hocuspocus
- **Stars:** ~2,200 · **License:** MIT
- **Stack:** TypeScript, Node.js, WebSocket
- **Modules:**
  - Yjs CRDT WebSocket backend for real-time collaboration
  - Self-hostable (no vendor lock-in)
  - Extension system: authentication, database persistence, Redis scaling, webhooks
  - Horizontal scaling via Redis
- **Why:** Self-hosted collab server that works with any Yjs-compatible editor.

---

## 15. Legal Document Templates

**Maps to:** Deal document lifecycle (LOI, NDA, MoU, Term Sheet, Contract), template library with variable substitution

### accordproject/template-archive ★ TOP PICK

- **URL:** https://github.com/accordproject/template-archive
- **Stars:** ~340 · **License:** Apache 2.0
- **Stack:** JavaScript, Node.js
- **Modules:**
  - Smart legal contract templating system by the Accord Project (Linux Foundation)
  - Natural language templates with embedded variables
  - Model-driven: Concerto schema language for contract data models
  - Template library includes NDA, LOI, purchase orders, service level agreements
  - Parse and execute clauses programmatically
- **Related repos:**
  - [accordproject/cicero-template-library](https://github.com/accordproject/cicero-template-library) (~84 stars, Apache 2.0) — actual template collection
  - [accordproject/concerto](https://github.com/accordproject/concerto) (~178 stars, Apache 2.0) — schema/data modeling language
  - [accordproject/web-components](https://github.com/accordproject/web-components) (~128 stars, Apache 2.0) — React components for rendering
- **Why:** Purpose-built for legal documents. Pre-built templates for LOI, NDA, SLA. Apache 2.0 is fully permissive.

### open-xml-templating/docxtemplater

- **URL:** https://github.com/open-xml-templating/docxtemplater
- **Stars:** ~3,560 · **License:** MIT
- **Stack:** JavaScript, Node.js, browser-compatible
- **Modules:**
  - Generate .docx from templates with `{variable}` substitution
  - Supports loops, conditionals, images, tables
  - Works in Node.js and browser
- **Why:** Generate Word documents from templates for LOI/NDA/MoU export. MIT licensed.

### guigrpa/docx-templates

- **URL:** https://github.com/guigrpa/docx-templates
- **Stars:** ~1,070 · **License:** MIT
- **Stack:** TypeScript, Node.js
- **Modules:**
  - Template-based .docx creation with `{tags}` substitution
  - Supports loops, conditionals, images, links
  - Lightweight and focused
- **Why:** Simpler alternative to docxtemplater. Good for generating final export documents.

### dolanmiu/docx

- **URL:** https://github.com/dolanmiu/docx
- **Stars:** ~5,650 · **License:** MIT
- **Stack:** TypeScript, Node.js, browser-compatible
- **Modules:**
  - Programmatic .docx generation with declarative API
  - Full control over paragraphs, tables, headers, footers, numbering, styles
  - Works in Node.js and browser
- **Why:** Build a template engine on top. Maximum control over document structure.

---

## 16. OKR & Goal Management

**Maps to:** OKR system (objectives, key results, joint OKRs), OKR flywheel GTM, CAPEX/OPEX estimation

### oslokommune/okr-tracker ★ TOP PICK

- **URL:** https://github.com/oslokommune/okr-tracker
- **Stars:** ~87 · **License:** MIT
- **Stack:** Vue.js, Firebase (Firestore), Google Cloud Functions
- **Modules:**
  - Create Objectives with linked Key Results and KPIs
  - Progress tracking with percentage completion
  - Dashboard views per organization/department/product
  - Google and Microsoft authentication
  - Team/department hierarchy (Organizations > Departments > Products)
  - Import/export, mock data generation
- **Why:** Most complete production-ready OKR tool with MIT license. Multi-team hierarchy maps to SIA's org structure. Study for data model + UX patterns.

### btallitsch/Micro-OKR-Tracker

- **URL:** https://github.com/btallitsch/Micro-OKR-Tracker
- **Stars:** ~1 · **License:** MIT
- **Stack:** React 18, TypeScript, Vite, Tailwind CSS, Supabase
- **Modules:**
  - Objectives with owner, quarter, year
  - Key Results with start/target values and units
  - Real-time progress % tracking with automatic status derivation
  - Weekly update logs with historical snapshots
  - Status indicators: On Track / At Risk / Off Track / Completed
  - Dashboard stats bar
- **Why:** Closest stack match (React + TS + Vite + Tailwind + Supabase). Clean, modern code. Easy to fork and extend.

### yamitzky/okr-agent

- **URL:** https://github.com/yamitzky/okr-agent
- **Stars:** ~5 · **License:** MIT
- **Stack:** React, TypeScript, Next.js, Apollo (GraphQL), Prisma
- **Modules:**
  - OKR creation and management via GraphQL API
  - Prisma database layer (supports PostgreSQL, MySQL, SQLite)
- **Why:** React + TypeScript + Prisma foundation. GraphQL API is extensible for joint OKR matching.

### lidi-team/okrs-v2

- **URL:** https://github.com/lidi-team/okrs-v2
- **Stars:** ~1 · **License:** MIT
- **Stack:** Nuxt.js (Vue), Element UI, NestJS (backend API), PostgreSQL
- **Modules:**
  - Enterprise OKR tool with role-based access (Admin, HR, Leader, Staff)
  - Full frontend + backend architecture
  - Companion API: NestJS + PostgreSQL
- **Why:** Enterprise-grade role system. The NestJS API patterns are useful for cross-org OKR collaboration.

> **Note:** No existing OSS repo supports joint/shared objectives between organizations — that feature will be custom-built for SIA.

---

## 17. Chat & Deal Rooms

**Maps to:** Secure deal rooms, stakeholder messaging, action items

### chatscope/chat-ui-kit-react ★ TOP PICK

- **URL:** https://github.com/chatscope/chat-ui-kit-react
- **Stars:** ~1,740 · **License:** MIT
- **Stack:** JavaScript, React
- **Modules:**
  - Pre-built chat UI components (message list, message input, conversation list, sidebar, avatars, typing indicators)
  - Headless design — pure UI kit with no backend coupling
  - Conversation feeds, comments, social/messenger patterns
  - Wire to any backend (Socket.io, WebSocket, REST)
- **Why:** Best pure UI library for building a custom deal room chat. No vendor lock-in. MIT licensed.

### socketio/socket.io

- **URL:** https://github.com/socketio/socket.io
- **Stars:** ~63,000 · **License:** MIT
- **Stack:** TypeScript, Node.js
- **Modules:**
  - Real-time bidirectional event-based communication
  - Rooms and namespaces (maps to deal rooms)
  - Automatic reconnection, binary streaming
  - Scales with Redis adapter for multi-server
- **Why:** The transport layer for real-time messaging. Rooms concept maps directly to deal rooms.

### asseinfo/react-kanban

- **URL:** https://github.com/asseinfo/react-kanban
- **Stars:** ~650 · **License:** MIT
- **Stack:** JavaScript, React
- **Modules:**
  - Drop-in Kanban/Trello-style board component
  - Controlled and uncontrolled modes
  - Card/column add, remove, move
  - Customizable rendering
- **Why:** Quick prototype for action item tracking within deal rooms.

---

## 18. AI Chat Interface

**Maps to:** AI Advisory Agent, AI Canvas Builder, Partnership Value Simulator chat

### vercel/ai (AI SDK) ★ TOP PICK

- **URL:** https://github.com/vercel/ai
- **Stars:** ~23,700 · **License:** Apache 2.0
- **Stack:** TypeScript, React/Svelte/Vue/Next.js
- **Modules:**
  - `useChat` and `useCompletion` hooks for streaming AI responses
  - Multi-provider support (OpenAI, Anthropic Claude, Gemini, etc.)
  - Generative UI (render React components from AI)
  - Tool calling, structured output, agents
  - Edge runtime compatible
- **Why:** The standard for AI chat in React. Handles streaming, tool use, multi-model support.

### assistant-ui/assistant-ui ★ TOP PICK

- **URL:** https://github.com/assistant-ui/assistant-ui
- **Stars:** ~9,630 · **License:** MIT
- **Stack:** TypeScript, React, Radix UI, shadcn/ui compatible
- **Modules:**
  - Pre-built AI chat UI components (message bubbles, thread view, composer, markdown rendering)
  - Direct integration with Vercel AI SDK
  - Branching conversations, suggested prompts
  - Copilot-style inline assistance patterns
  - Customizable via Radix primitives + Tailwind
- **Why:** Pairs with vercel/ai — provides the UI layer it lacks. MIT license. Built for shadcn/Tailwind ecosystem.

### Inspiration Only (Full Apps)

| Repo | Stars | License | Use For |
|------|-------|---------|---------|
| [ChatGPTNextWeb/NextChat](https://github.com/ChatGPTNextWeb/NextChat) | ~87,770 | MIT | AI chat UX patterns, conversation management |
| [mckaywrigley/chatbot-ui](https://github.com/mckaywrigley/chatbot-ui) | ~33,180 | MIT | AI chatbot patterns, multi-model support |

---

## 19. Business Model Canvas

**Maps to:** Business Canvas Model (9 sections + SIA extended canvas), free manual forms + paid AI builder

### 221geek/react-bmc

- **URL:** https://github.com/221geek/react-bmc
- **Stars:** Small · **License:** Check repo
- **Stack:** React
- **Modules:**
  - Drop-in React component for interactive Business Model Canvas
  - Create, edit, and visualize business models directly in React apps
- **Why:** Ready-made React BMC component. Evaluate for direct use or forking.

### fpudo/business_canvas

- **URL:** https://github.com/fpudo/business_canvas
- **Stars:** Small · **License:** Check repo
- **Stack:** React, CSS Grid
- **Modules:**
  - Business Canvas Model using CSS Grid layout
  - Clean visual representation of the 9-block BMC
- **Why:** CSS Grid approach for the canvas layout — study for our own implementation.

### joelparkerhenderson/business-model-canvas

- **URL:** https://github.com/joelparkerhenderson/business-model-canvas
- **Stars:** Moderate · **License:** Check repo
- **Stack:** Markdown/documentation
- **Modules:**
  - Templates and documentation for all 9 BMC sections
  - Value propositions, customer relationships, partner collaborations
- **Why:** Content reference for BMC section definitions, prompts, and examples.

> **Recommended approach:** Build custom BMC using CSS Grid + shadcn/ui cards for the 9-section layout. Use Plate editor (see [Section 14](#14-collaborative-document-editor)) for rich text within each section. Use vercel/ai + assistant-ui (see [Section 18](#18-ai-chat-interface)) for the paid AI canvas builder.

---

## 20. Subscription, Paywall & Pricing

**Maps to:** Free/Trial/Paid tiers, product-led growth, upgrade CTAs, Stripe billing

### mickasmt/next-saas-stripe-starter ★ TOP PICK

- **URL:** https://github.com/mickasmt/next-saas-stripe-starter
- **Stars:** ~3,000 · **License:** MIT
- **Stack:** Next.js 14, Prisma, Neon, Auth.js v5, shadcn/ui, Stripe, Tailwind CSS
- **Modules:**
  - User roles and admin panel
  - Stripe billing integration (subscriptions, webhooks, customer portal)
  - Email with Resend
  - Auth with Auth.js v5
  - Database with Prisma/Neon
- **Why:** shadcn/ui + Stripe + TypeScript. Patterns for subscription management, webhook handling, and role-based gating.

### ixartz/SaaS-Boilerplate

- **URL:** https://github.com/ixartz/SaaS-Boilerplate
- **Stars:** ~6,900 · **License:** MIT
- **Stack:** Next.js, Tailwind CSS, shadcn/ui, TypeScript, Drizzle ORM, Clerk
- **Modules:**
  - Auth (Clerk), multi-tenancy, RBAC
  - i18n
  - Landing page + user dashboard
  - Stripe subscription management
  - Sentry error tracking
  - Testing (Vitest + Playwright)
- **Why:** Most feature-complete SaaS boilerplate with multi-tenancy. Stripe patterns for free/paid tier gating.

### danmindru/shadcn-pricing-page-generator

- **URL:** https://github.com/danmindru/shadcn-pricing-page-generator
- **Stars:** Moderate · **License:** Free to use
- **Stack:** React, Next.js, shadcn/ui, Tailwind CSS, Radix UI
- **Modules:**
  - Visual generator for pricing pages
  - Outputs copy-paste code for shadcn/ui + Tailwind
  - Supports plain Tailwind with no dependencies
- **Why:** Quickly generate pricing page UI for free/trial/paid tiers.

### vercel/nextjs-subscription-payments

- **URL:** https://github.com/vercel/nextjs-subscription-payments
- **Stars:** ~7,600 · **License:** MIT
- **Stack:** Next.js, Supabase, Stripe, TypeScript
- **Modules:**
  - Full Stripe subscription flow
  - Webhook handling, product sync, customer portal
  - One-click Vercel deploy
- **Note:** Archived Jan 2025 — still usable as reference/fork but no longer maintained.

---

## 21. PDF Generation & Report Export

**Maps to:** Government corridor reports, MOU/contract PDF export, financial model summary cards

### diegomura/react-pdf (@react-pdf/renderer) ★ TOP PICK

- **URL:** https://github.com/diegomura/react-pdf
- **Stars:** ~15,900 · **License:** MIT
- **Stack:** React, TypeScript
- **Modules:**
  - Create PDF files using React components (JSX syntax)
  - Works in browser and server (Node.js)
  - Flexbox layout, custom fonts, images, SVG support
  - Streaming PDF generation
- **Why:** Build PDFs as React components — natural fit for our stack. Use for corridor reports and financial model exports.

### pdfme/pdfme

- **URL:** https://github.com/pdfme/pdfme
- **Stars:** ~4,300 · **License:** MIT
- **Stack:** TypeScript, React
- **Modules:**
  - WYSIWYG template designer (drag-and-drop)
  - PDF viewer component
  - JSON-based templates
  - Fast generation (tens to hundreds of ms)
  - Browser and Node.js support
- **Why:** Visual template designer for government reports. JSON-based templates = configurable output.

### MrRio/jsPDF

- **URL:** https://github.com/MrRio/jsPDF
- **Stars:** ~30,400 · **License:** MIT
- **Stack:** JavaScript (framework-agnostic)
- **Modules:**
  - Client-side PDF generation in pure JavaScript
  - HTML-to-PDF export
  - Text, images, vector graphics, tables
  - Plugin architecture (autoTable for tables)
- **Why:** Lightweight client-side option for quick exports. autoTable plugin useful for data-heavy reports.

### bpampuch/pdfmake

- **URL:** https://github.com/bpampuch/pdfmake
- **Stars:** ~12,000 · **License:** MIT
- **Stack:** JavaScript (framework-agnostic)
- **Modules:**
  - Declarative document definition (JSON-based)
  - Tables, lists, columns, headers/footers, watermarks, TOC
  - Client and server-side
- **Why:** JSON-based document definition pairs well with structured data from Mujarrad.

### Hopding/pdf-lib

- **URL:** https://github.com/Hopding/pdf-lib
- **Stars:** ~8,400 · **License:** MIT
- **Stack:** TypeScript, any JS environment
- **Modules:**
  - Create and modify PDF documents programmatically
  - Fill PDF forms, add text/images, merge/split PDFs
  - No external dependencies
  - Works in Node.js, browser, Deno, React Native
- **Why:** Modify existing PDFs (fill forms, add signatures). Use for final document processing after signing.

### wojtekmaj/react-pdf (PDF Viewer)

- **URL:** https://github.com/wojtekmaj/react-pdf
- **Stars:** ~9,000+ · **License:** MIT
- **Stack:** React, TypeScript
- **Modules:**
  - Display/render existing PDFs in React apps
  - Pagination, zoom, text selection
- **Why:** Preview PDFs before signing. Display uploaded documents in the document vault.

---

## 22. Timeline & Activity Feed

**Maps to:** M3 (relationship timeline), deal room audit trail, relationship event log

### prabhuignoto/react-chrono ★ TOP PICK

- **URL:** https://github.com/prabhuignoto/react-chrono
- **Stars:** ~4,200 · **License:** MIT
- **Stack:** React, TypeScript
- **Modules:**
  - Horizontal, vertical, and vertical-alternating modes
  - Media support (images/video)
  - Slideshow mode
  - Nested timelines
  - Keyboard navigation
  - Custom content via render props
  - Tree view
- **Why:** Best-in-class React timeline component. Vertical mode is perfect for relationship event logs and audit trails.

### stephane-monnot/react-vertical-timeline

- **URL:** https://github.com/stephane-monnot/react-vertical-timeline
- **Stars:** ~1,160 · **License:** MIT
- **Stack:** React, CSS
- **Modules:**
  - Vertical timeline with customizable icons, colors, animations
  - Responsive design
  - Lightweight
- **Why:** Simple and lightweight. Good for basic activity log/audit trail UIs.

---

## 23. Email Service

**Maps to:** Invitation emails, notification emails, signature request emails, MOU expiry alerts

### resend/react-email ★ TOP PICK

- **URL:** https://github.com/resend/react-email
- **Stars:** ~18,900 · **License:** MIT
- **Stack:** React, TypeScript
- **Modules:**
  - Build emails using React components
  - Preview in browser
  - Compatible with any email provider (Resend, SendGrid, Postmark, AWS SES)
  - Tailwind CSS support
  - Components: Button, Column, Heading, Html, Image, Link, Section, Text
- **Why:** Build email templates as React components using our existing stack. Render to HTML for any SMTP provider.

### eleith/emailjs

- **URL:** https://github.com/eleith/emailjs
- **Stars:** ~2,200 · **License:** MIT
- **Stack:** Node.js, TypeScript
- **Modules:**
  - SMTP client for Node.js
  - HTML emails, attachments
  - SSL/TLS, OAuth2 auth
  - UTF-8 support, TypeScript declarations
- **Why:** Clean MIT-licensed SMTP transport. Pair with react-email for templates + emailjs for sending.

### forwardemail/email-templates

- **URL:** https://github.com/forwardemail/email-templates
- **Stars:** ~3,730 · **License:** MIT
- **Stack:** Node.js
- **Modules:**
  - Create, preview, and send custom email templates
  - Supports Pug/EJS/any template engine
  - Automatic inline CSS
  - i18n support
  - Preview in browser
- **Why:** Alternative if you prefer traditional template engines over React components.

---

## 24. Gantt Charts & Milestones

**Maps to:** M6 (Integration journey milestones), program management KPIs, project timelines

### MaTeMaTuK/gantt-task-react ★ TOP PICK

- **URL:** https://github.com/MaTeMaTuK/gantt-task-react
- **Stars:** ~1,080 · **License:** MIT
- **Stack:** React, TypeScript
- **Modules:**
  - Interactive Gantt chart with task dependencies
  - Drag-and-drop resize/move
  - Multiple view modes (Hour, Day, Week, Month, Quarter, Year)
  - Progress tracking
  - Custom task bar styling, tooltip support
- **Why:** Purpose-built React Gantt with TypeScript. Clean API for integration journey milestone tracking.

### frappe/gantt

- **URL:** https://github.com/frappe/gantt
- **Stars:** ~5,940 · **License:** MIT
- **Stack:** Vanilla JavaScript (framework-agnostic)
- **Modules:**
  - SVG-based Gantt chart
  - Task dependencies, drag-and-drop
  - Multiple view modes, popup details
  - Lightweight
- **Why:** Most popular Gantt library. Needs React wrapper — use [hustcc/gantt-for-react](https://github.com/hustcc/gantt-for-react) (~325 stars, MIT).

---

## 25. Compliance Checklists

**Maps to:** Tier 4A regulatory checklists, sector-specific compliance requirements

### surveyjs/survey-library ★ TOP PICK

- **URL:** https://github.com/surveyjs/survey-library
- **Stars:** ~4,730 · **License:** MIT
- **Stack:** React, Angular, Vue, Vanilla JS
- **Modules:**
  - JSON-driven form builder with drag-and-drop designer
  - Multi-step wizards, conditional logic, branching
  - 30+ question types (including checkbox/checklist)
  - Validation, themes, PDF export
- **Why:** JSON-driven approach means compliance checklists are defined as configuration. Checkbox question types + conditional logic + validation = configurable regulatory checklists per sector/country.

> **Alternative:** Build custom using shadcn/ui checkbox + accordion primitives with JSON schema definitions (~200-400 lines). This is small enough that a library may not be necessary.

---

## 26. Financial Charts

**Maps to:** M5 (Financial model summary cards), Partnership Value Simulator projections

### react-financial/react-financial-charts

- **URL:** https://github.com/react-financial/react-financial-charts
- **Stars:** ~1,400 · **License:** MIT
- **Stack:** React, TypeScript, D3
- **Modules:**
  - Candlestick, OHLC, Area, Line, Heiken Ashi, Renko, Kagi, Point & Figure charts
  - Interactive zoom/pan
  - Technical indicators
  - TypeScript fork of react-stockcharts
- **Why:** Specialized financial visualizations beyond what Recharts offers. Use for revenue projections and scenario modeling charts.

> **Note:** No turnkey "financial projection builder" exists in OSS. Build custom calculation logic with projections rendered via Recharts (already in stack) or react-financial-charts.

---

## 27. Portfolio & Finance (Inspiration Only)

**Maps to:** M4 (Portfolio Management), M5 (Financial Model Deployment)

> These repos use **AGPL** licenses. Study their UX patterns and data models but do **not** copy code.

| Repo | Stars | License | Inspiration For |
|------|-------|---------|-----------------|
| [maybe-finance/maybe](https://github.com/maybe-finance/maybe) | ~54,000 | AGPL-3.0 | Portfolio dashboard UI, net worth tracking, asset allocation visualizations |
| [ghostfolio/ghostfolio](https://github.com/ghostfolio/ghostfolio) | ~8,200 | AGPL-3.0 | Portfolio performance tracking, benchmark comparison, multi-currency, dividend tracking |
| [twentyhq/twenty](https://github.com/twentyhq/twenty) | ~45,000 | AGPL-3.0 | Custom objects, workflow automation, permissions model — architectural inspiration |
| [makeplane/plane](https://github.com/makeplane/plane) | ~48,300 | AGPL-3.0 | Project/program management patterns, sprint tracking, analytics dashboards |

---

## Quick Reference Matrix

| PRD Module / Feature | Primary Resource | Secondary Resources |
|----------------------|-----------------|---------------------|
| **M1 — Partner Registry** | formity, stepperize | react-step-wizard, react-dropzone |
| **M2 — AI Matching** | atomic-crm (match cards) | tablecn (match filtering/history) |
| **M3 — Relationship Mgmt** | atomic-crm (timeline, pipeline) | react-dnd-kit-tailwind-shadcn-ui (kanban), react-chrono (timeline) |
| **M4 — Portfolio** | recharts, tremor (analytics) | maybe/ghostfolio (UX inspiration) |
| **M5 — Financial Model** | formity (structured form) | react-financial-charts, recharts (projections) |
| **M6 — Integration Journey** | stepperize (tier stepper) | react-signature-canvas, gantt-task-react (milestones) |
| **Admin Panel** | satnaing/shadcn-admin (shell) | tablecn (verification queue), novu (announcements) |
| **Auth** | react-oauth (Google button) | better-auth (full auth + teams) |
| **i18n / RTL** | react-i18next (already installed) | Tailwind `rtl:` variant |
| **Dashboard Home** | satnaing/shadcn-admin | recharts, sonner |
| **OKR System** | oslokommune/okr-tracker (patterns) | Micro-OKR-Tracker (React+Vite fork base) |
| **Business Canvas** | Custom (CSS Grid + shadcn cards) | react-bmc, joelparkerhenderson/bmc (content ref) |
| **Document Editor** | udecode/plate (track changes + comments) | yjs + hocuspocus (real-time collab) |
| **Legal Templates** | accordproject/template-archive | docxtemplater, docx-templates |
| **Deal Rooms** | chatscope/chat-ui-kit-react (UI) | socket.io (transport) |
| **AI Advisory** | vercel/ai (backend) | assistant-ui (UI components) |
| **Paywall / Pricing** | next-saas-stripe-starter | SaaS-Boilerplate, shadcn-pricing-page-generator |
| **PDF / Reports** | @react-pdf/renderer | pdfme (template designer), pdf-lib (modify PDFs) |
| **Email Service** | resend/react-email (templates) | eleith/emailjs (SMTP transport) |
| **Compliance Checklists** | surveyjs/survey-library | Custom shadcn checkbox + JSON schema |
| **Gantt / Milestones** | gantt-task-react | frappe/gantt |

---

## License Summary

| License | Repos | Safe for SIA? |
|---------|-------|---------------|
| **MIT** | shadcn-admin, atomic-crm, nextcrm-app, refine, tablecn, data-table-filters, recharts, signature_pad, react-signature-canvas, react-step-wizard, react-multistep, formity, react-i18next, react-joyride, uppy, react-dropzone, filepond, sonner, novu (core), react-oauth, better-auth, react-dnd-kit-tailwind-shadcn-ui, orange, react-crm, plate, tiptap, lexical, yjs, hocuspocus, docxtemplater, docx-templates, docx, chatscope, socket.io, react-kanban, assistant-ui, okr-tracker, Micro-OKR-Tracker, react-chrono, react-vertical-timeline, react-email, emailjs, gantt-task-react, frappe/gantt, surveyjs, jsPDF, @react-pdf/renderer, pdfmake, pdfme, pdf-lib, react-pdf (viewer), next-saas-stripe-starter, SaaS-Boilerplate, react-financial-charts | Yes — full commercial use |
| **Apache 2.0** | hello-pangea/dnd, tremor, react-signature-canvas, novel, vercel/ai, accordproject (all repos) | Yes — full commercial use |
| **ISC** | next-auth (Auth.js) | Yes — full commercial use |
| **BSD-3** | GetStream/react-activity-feed | Yes — full commercial use |
| **AGPL-3.0** | documenso, OpenSign, papermark, maybe, ghostfolio, twenty, erxes, frappe/crm, plane, AppFlowy | **No** — inspiration only |