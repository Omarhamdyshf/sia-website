# SIA Portal — Feature Mesh & Implementation Strategy

## Software Category

**Deal Flow CRM with Client Portal and Configurable Workflow Engine**

Also known as: B2B Investment Portal, Investor Intake & Deal Management Platform, Client Service Request Portal with Dynamic Process Orchestration.

---

## Architecture Model

```
Admin defines process types & stages in Mujarrad (graph DB)
    ↓
Mujarrad stores: workflow definitions, form schemas, transition rules
    ↓
SIA Frontend fetches workflow config at runtime
    ↓
User logs in (Google OAuth via Mujarrad) → picks request type → fills dynamic forms → tracks status
    ↓
Each request instance traverses the workflow graph stored in Mujarrad
```

**Key principle:** Admin configures everything dynamically. No code deployment needed to add a new process type, change stages, or modify forms.

---

## Module Feature Mesh

| # | Module | Features | Phase | Open Source Reference | SIA Implementation |
|---|--------|----------|-------|----------------------|-------------------|
| **1** | **Authentication** | Google OAuth, email/password, JWT storage, protected routes, role-based access (client vs admin) | 1 | Mujarrad Backend (own), @react-oauth/google | Call `POST /api/auth/oauth/google` with Google ID token → store JWT in Zustand + localStorage |
| **2** | **Process Type Registry** | Admin creates/edits process types (deal inquiry, partnership, consultation, custom). Each type has: name, description, icon, category, workflow definition | 1 | n8n (workflow type registry pattern) | Admin UI: CRUD process types in Mujarrad. Frontend: fetch types from `/api/spaces/{slug}/nodes` |
| **3** | **Dynamic Workflow Engine** | Each process type has configurable stages. Stages are graph nodes in Mujarrad. Transitions are edges (`next`, `triggers`). Guards/conditions on transitions. SLA timers per stage | 1 (hardcoded) → 2 (dynamic) | n8n (node graph), Directus Flows | Phase 1: stages as JSON arrays in frontend. Phase 2: fetch workflow graph from Mujarrad, render with config-driven engine |
| **4** | **Dynamic Form Rendering** | Each workflow stage has a form schema (JSON Schema). Forms render dynamically from config. Conditional fields, validation rules, file uploads. Multi-step wizards | 1 (static) → 2 (dynamic) | react-jsonschema-form (rjsf) + shadcn/ui theme, SurveyJS, Formbricks | Phase 1: Zod schemas + react-hook-form + shadcn inputs. Phase 2: rjsf rendering from Mujarrad-stored JSON Schema |
| **5** | **Request Submission** | User selects process type → fills intake form → submits. Creates a request node in Mujarrad with `current_stage` pointer. Draft save support | 1 | Formbricks (intake flow), Peppermint (ticket creation) | `POST /api/spaces/{slug}/nodes` to create request node. Attribute `has_stage` → first stage node |
| **6** | **Status Dashboard (Client)** | User sees all their requests. Each shows: type, current stage, progress indicator, timeline of events, next action needed. Filter by type/status | 1 | shadcn-admin (data tables), NextCRM (deal pipeline) | Fetch user's requests from Mujarrad. Render with shadcn Table + Badge + Progress components |
| **7** | **Status Timeline & Activity** | Per-request detail view. Vertical timeline showing every stage transition, comment, document upload. Immutable audit trail | 1 | Peppermint (ticket history), NextCRM (change history) | Mujarrad node versioning provides history. Render as shadcn timeline with Framer Motion animations |
| **8** | **Admin Pipeline View** | Admin sees all requests across all types. Kanban board (columns = stages). List view with filters. Assign team members. Bulk actions | 2 | atomic-crm (Kanban pipeline), Plane (issue boards), Kiranism/next-shadcn-dashboard-starter (Kanban) | shadcn Card + dnd-kit for drag-drop Kanban. Fetch all requests from Mujarrad |
| **9** | **Admin Workflow Designer** | Visual drag-and-drop editor for defining workflow stages and transitions. Create new process types. Edit form schemas per stage. Set SLA rules | 2 | ReactFlow (already in Mujarrad-Frontend), n8n (visual workflow builder) | ReactFlow-based editor. Save graph back to Mujarrad nodes/attributes |
| **10** | **Notification System** | Email on stage transitions. In-app notification bell. Configurable templates per event type. Digest mode | 2 | Novu (notification infrastructure) | Phase 1: toast notifications (sonner, already installed). Phase 2: email via backend integration |
| **11** | **Document Management** | Upload files per request/stage. View/download. Version history. Permission controls | 2 | Papermark (document sharing) | Mujarrad node attributes for file references. S3/cloud storage for actual files |
| **12** | **Meeting & Calendar** | Schedule meetings tied to a request stage. Calendar sync. Meeting notes | 3 | Cal.com (scheduling) | Embed Cal.com or build custom with shadcn Calendar component |
| **13** | **Reporting & Analytics** | Admin dashboard: funnel conversion, volume by sector/type, SLA compliance, time-to-close | 3 | shadcn-admin (chart patterns), Recharts (already installed) | Recharts + shadcn Card for KPI dashboard |
| **14** | **Localization (i18n)** | Arabic RTL + English LTR. All UI, forms, workflow labels, notifications | 1 | Already implemented in SIA (react-i18next) | Extend existing i18n. Workflow labels stored bilingual in Mujarrad |
| **15** | **Audit Log** | Immutable record of every action: who, what, when. Required for compliance | 2 | Mujarrad versioning (built-in) | Mujarrad's node versioning = automatic audit trail |

---

## Mujarrad Graph Mapping

```
Mujarrad Concept          →  Portal Concept
──────────────────────────────────────────────
Space                     →  "sia-portal" (the portal workspace)
Context Node              →  Process Type Definition (e.g., "Deal Inquiry")
Child Nodes of Context    →  Workflow Stages (ordered by 'next' edges)
Node.nodeDetails          →  Stage config: { formSchema, assignedRole, sla, label }
Attribute (next)          →  Sequential stage transition
Attribute (triggers)      →  Conditional/branching transition
Regular Node (separate)   →  Request Instance (user submission)
Attribute (has_stage)     →  Current stage pointer on a request
Attribute (submitted_by)  →  User who created the request
Node Versions             →  Automatic audit trail / history
```

Admin creates a new process type = creates a new Context Node in Mujarrad with child stage nodes.

---

## Phase 1 — MVP Implementation (Frontend-First)

What to build NOW with hardcoded workflows:

### Pages to Add to SIA
1. `/login` — Google OAuth login (via Mujarrad)
2. `/dashboard` — User's request list + status
3. `/request/new` — Select process type → multi-step form
4. `/request/:id` — Request detail + timeline + status

### Components Needed
| Component | Source/Reference | shadcn Components Used |
|-----------|-----------------|----------------------|
| GoogleLoginButton | Copy pattern from Mujarrad-Frontend | Button |
| AuthProvider (Zustand) | Copy pattern from Mujarrad-Frontend | — |
| ProtectedRoute | Copy pattern from Mujarrad-Frontend | — |
| ProcessTypeSelector | New (grid of cards) | Card, Badge |
| MultiStepForm | New (wizard pattern) | Form, Input, Select, Textarea, Progress, Button |
| RequestList | New (data table) | Table, Badge, Button |
| RequestDetail | New (detail + timeline) | Card, Badge, Separator, Progress |
| StatusTimeline | New (vertical timeline) | — (custom with Framer Motion) |
| DashboardLayout | Reference shadcn-admin | Sidebar, ScrollArea, Separator |

### Hardcoded Workflow Types (Phase 1)
```typescript
// 3 initial process types, each with stages
const PROCESS_TYPES = [
  {
    id: 'deal-inquiry',
    name: 'Deal Inquiry',
    icon: 'Handshake',
    stages: ['Submission', 'SIA Review', 'Initial Assessment', 'Meeting Scheduled', 'In Progress', 'Completed']
  },
  {
    id: 'partnership',
    name: 'Partnership Request',
    icon: 'Users',
    stages: ['Application', 'Review', 'Due Diligence', 'Approval', 'Onboarding']
  },
  {
    id: 'consultation',
    name: 'General Consultation',
    icon: 'MessageSquare',
    stages: ['Request Submitted', 'Under Review', 'Consultation Scheduled', 'Completed']
  }
]
```

### Request Form Fields (Phase 1 — per type)

**Deal Inquiry:**
- Company name, website, country
- Sector (dropdown: 8 SIA sectors)
- Deal type (investment, JV, M&A, trade)
- Estimated deal size ($2M-$50M range)
- Target market (KSA → Malaysia or Malaysia → KSA)
- Brief description (textarea)
- Supporting documents (file upload)

**Partnership Request:**
- Company name, registration number, country
- Type of partnership (advisory, referral, co-facilitation)
- Areas of expertise (multi-select: sectors)
- Track record / portfolio summary (textarea)
- References (textarea)

**General Consultation:**
- Full name, company, role
- Topic of interest (dropdown)
- Preferred language (English / Arabic)
- Message (textarea)

---

## Phase 2 — Dynamic Configuration

- Admin workflow designer (ReactFlow-based visual editor)
- Form schemas stored as JSON Schema in Mujarrad `nodeDetails`
- react-jsonschema-form (rjsf) renders forms dynamically
- Admin can create new process types, add/remove/reorder stages, edit forms — all without code

---

## Phase 3 — Full Platform

- Document management with versioning
- Calendar/meeting integration
- Email notification templates
- Analytics dashboard
- E-signatures (Documenso integration)

---

## Open Source Reference Matrix

| What to Extract | From Which Project | Stars | Stack Match |
|-----------------|-------------------|-------|-------------|
| Dashboard layout, tables, sidebar | satnaing/shadcn-admin | 11.8k | Exact (Vite + React + TS + shadcn) |
| Multi-step form patterns | Formbricks | 12.1k | High (Next.js + TS + Tailwind) |
| CRM deal lifecycle (leads → pipeline) | NextCRM | 579 | High (Next.js + shadcn) |
| Ticket submission → status flow | Peppermint | 3.1k | Medium (Next.js + React) |
| Kanban pipeline board | atomic-crm | 936 | Medium (React + shadcn) |
| Kanban with drag-drop | Kiranism/next-shadcn-dashboard-starter | 6.3k | High (Next.js + shadcn + dnd-kit) |
| Visual workflow builder | ReactFlow | 25k | Already in Mujarrad-Frontend |
| Dynamic form from JSON Schema | react-jsonschema-form (rjsf) | 15.7k | Has official shadcn/ui theme |
| Workflow state machine | XState v5 | 27k | React hooks via @xstate/react |
| Auth patterns (Google OAuth) | Mujarrad-Frontend (own) | — | Exact reference |

---

## Fastest Implementation Path

1. **Copy auth patterns** from Mujarrad-Frontend (GoogleLoginButton, auth store, protected routes)
2. **Copy dashboard shell** from shadcn-admin (sidebar layout, data tables, cards)
3. **Build request forms** using existing shadcn Form + Input + Select + Textarea
4. **Hardcode 3 workflows** as TypeScript objects (upgrade to Mujarrad-backed later)
5. **Store requests** in Mujarrad via API (`POST /api/spaces/sia-portal/nodes`)
6. **Build status dashboard** with shadcn Table + Badge + Progress
7. **Replace "Schedule a Conversation" CTAs** with "Get Started" → login → request flow
