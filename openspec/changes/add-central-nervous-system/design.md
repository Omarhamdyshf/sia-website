# Design: Central Nervous System (Sprint 1)

## Context
The SIA Portal needs a foundational admin panel where Omar can manage organizations, contacts, files, and notes. This is a single-user system backed by Mujarrad as the data layer. Sprint 1 delivers the minimum viable admin experience end-to-end.

Architecture docs 17-DISTILLED-OSS-STACK.md and 18-OSS-OVERLAP-MATRIX.md establish refine.dev as the foundation framework, which fundamentally changes the implementation approach from manual React Query + Zustand to a provider-driven architecture.

## Goals
- Omar can log in, manage organizations with contacts/files/notes, and search across all data
- All data persists to Mujarrad via the refine data provider (or a mock data provider for early development)
- The UI is responsive, keyboard-friendly, and uses consistent shadcn/ui patterns
- All CRUD operations flow through refine's provider abstraction for consistency and future extensibility

## Non-Goals
- Multi-user access control or role-based permissions
- Public-facing pages or organization profiles
- Automated data import/sync from external sources
- Notifications or activity feeds beyond basic activity tab

## Decisions

### 1. refine.dev as foundation framework
refine.dev owns the entire data and auth lifecycle: data fetching/CRUD (`useList`, `useOne`, `useCreate`, `useUpdate`, `useDelete`), auth provider (login/logout/permissions/identity), access control, resource routing, CRUD forms via `@refinedev/react-hook-form`, notification provider, i18n provider, audit log, and real-time updates. This replaces the manual React Query + Zustand approach entirely. refine's resource definitions drive route generation and provide a unified contract for all data operations.

### 2. Custom Mujarrad data provider implementing refine's DataProvider interface
A custom data provider (~200 lines) maps refine's CRUD methods to Mujarrad's nodes/attributes/relationships API. The interface methods (`getList`, `getOne`, `create`, `update`, `deleteOne`, `custom`) translate refine resource requests into Mujarrad operations. Filtering, sorting, and pagination parameters are mapped to Mujarrad query syntax. A mock data provider can implement the same interface for early development. For organizations with nested contacts, the data provider's `create` and `update` methods handle multi-node creation internally — creating both the organization node and linked contact nodes in a single provider call.

### 3. refine auth provider wrapping Mujarrad auth + Google OAuth
A custom auth provider (~80 lines) implements refine's `AuthProvider` interface: `login` (email/password and Google OAuth flows), `logout`, `check` (token validation), `getPermissions`, `getIdentity`, and `onError` (401 handling). This replaces manual JWT management. refine's `<Authenticated>` component handles route guards declaratively.

### 4. shadcn-admin as UI shell only
shadcn-admin provides: app shell with sidebar and navigation, command palette (cmdk), dark/light theme toggle, error pages (403, 404, 500), settings pages, auth UI pages (sign-in, sign-up, OTP), data table UI components (7 reusable components), and RTL layout support. It does NOT own data fetching, auth logic, or state management — those belong to refine.

### 5. refine `useTable` + shadcn-admin table UI components
The data layer for tables uses `useTable` from `@refinedev/react-table` (TanStack Table adapter) which provides filtering, sorting, pagination, and server-state management. The UI layer uses shadcn-admin's 7 reusable table components (built on TanStack Table + shadcn/ui). Each table requires ~30 lines of wiring code to connect refine's data to shadcn-admin's UI. shadcn-admin table components consume the TanStack Table instance returned by `useTable`.

### 6. Uppy (resumable uploads) + Cloudflare R2 for file storage
Files up to 100MB require resumable, chunked uploads that survive connection interruptions. **Uppy** (`transloadit/uppy`, 30.7k stars, MIT) provides this via the `tus` protocol — if the connection drops mid-upload, it resumes from where it stopped and retries automatically. Uppy includes its own drag-drop UI via `@uppy/react`, replacing react-dropzone. Cloudflare R2 supports the tus protocol natively for receiving chunked uploads. File metadata (name, type, size, R2 key) is stored as a Mujarrad `FileRecord` node linked to the parent organization after upload completes.

### 7. `@refinedev/react-hook-form` for CRUD forms, plain RHF+Zod for settings
Forms connected to CRUD operations use `@refinedev/react-hook-form`'s `useForm`, which auto-calls the data provider on submit, handles loading/success/error states, and integrates with refine's notification provider. Standalone forms (e.g., settings pages) use plain react-hook-form + Zod since they have no data provider backing.

### 8. Notification adapter (refine -> sonner), i18n adapter (refine -> react-i18next)
The refine notification provider is implemented as a thin adapter (~10 lines) that delegates to sonner for toast rendering. The refine i18n provider is implemented as a thin adapter (~15 lines) that delegates to react-i18next for translations. Both adapters are trivial but required to keep the full refine provider contract intact.

### 9. Dynamic Activity & Process Tracking System
The Activity system is NOT a simple event log — it is a **configurable process tracking engine** that ships in S1 and evolves through S3.

**Core model:**
- **Process Types** — Configurable templates (e.g., "Partner Onboarding," "Document Signing," "Deal Negotiation"). Created by the user at any time without code changes.
- **Step Definitions** — Each process type has an ordered set of steps that must be achieved (e.g., Onboarding: Intake → Due Diligence → Board Review → MOU → Signed). Steps can be added, removed, and reordered dynamically.
- **Step Instances** — When a process is started on an org, each step gets a status: pending, in progress, completed, skipped. Progress is tracked per org per process.
- **Automatic Events** — System-generated events from CRUD operations (file uploaded, contact added, note created, status changed) are recorded automatically alongside process steps.

**What the Activity tab shows:**
- A unified stream of both automatic events AND process step completions
- Process progress indicators showing where each active process stands
- Timestamped, chronological, filterable by event type or process

**Phased delivery:**
- **S1** — Design the full ERD and behavior diagrams (process types, step definitions, step instances, events). Implement only automatic event logging (every CRUD action creates an event node). Display a simple chronological list on the Activity tab. The data model supports the full vision from day one.
- **S3** — Upgrade Activity tab to custom shadcn/ui vertical timeline with infinite scroll and SLA calculations. Configurable process types and step definitions deferred to S4.

**Design prerequisite:** ERD and system behavior diagrams (sequence diagrams, state machine for step transitions) MUST be produced and reviewed before any implementation begins. This ensures the Mujarrad node/relationship model for the full activity system is correct upfront — even though S1 only implements the event logging subset.

### 10. Typesense for full-text search + local ETL extraction pipeline
All document content must be searchable. **Typesense** (typesense/typesense, 22k+ stars, GPL-3) is deployed via Docker on the server as the search engine.

**Architecture split — server stays thin:**
- **Server** (2-core / 4GB): Next.js + Typesense (Docker). No extraction processing on the server.
- **Local / DGX Spark**: Wider Tooling extraction pipeline runs as an ETL process — watches for new uploads in R2, pulls files, extracts text, and pushes indexed content to Typesense via API.

**Wider Tooling ETL pipeline** (existing internal tooling at `Widers_ Tooling/Data Management Tools/` and `ISCO/docling-dubai-case-simple/`):
- **Round 1**: Docling fast extraction (no OCR, CPU-only, ~1-5 sec/file) — handles digital PDFs, DOCX, XLSX, PPTX
- **Round 2**: EasyOCR or Ollama vision model fallback — triggers only when Round 1 extracts insufficient text (< 100 chars), handling scanned documents
- Running locally means GPU-accelerated models (minicpm-v, qwen2.5vl:72b) are available when needed

**Data freshness**: The ETL process keeps the Typesense index up to date on a near-continuous basis. If the local machine is offline, staleness equals the downtime — the process catches up immediately on all pending files when it comes back online. Organization and contact data is also synced to Typesense by the ETL process.

The ETL detects new uploads via Cloudflare R2 Event Notifications pushed to a Cloudflare Queue. The ETL consumer polls the queue for new file events. Fallback: polling R2 via S3-compatible ListObjectsV2 against Wider Tooling's FileTracker index (.extraction_index.json).

A transformer maps Wider Tooling's extraction output (the dict from `extract_file()`, not the markdown from `create_output_content()`) to Typesense's JSON document schema with fields: id, file_name, organization_id, file_type, uploaded_at, content.

The Cmd+K command palette queries Typesense for full-text content search (file contents, org descriptions, contact details) with typo tolerance and relevance ranking. Structured CRUD operations continue to go through the refine data provider (Mujarrad). Typesense is the read-optimized search layer; Mujarrad remains the source of truth.

This indexing pipeline is the foundation for future agent-driven opportunity matching (Kimi K2 agent swarm querying Typesense to surface deal matches across indexed documents and organizations).

## Integration Points

| Adapter | Lines | Description |
|---------|-------|-------------|
| Mujarrad data provider | ~200 | Maps refine CRUD to Mujarrad nodes/attributes/relationships |
| Mujarrad auth provider | ~80 | Wraps Mujarrad JWT + Google OAuth into refine AuthProvider |
| Notification adapter | ~10 | refine notification provider -> sonner |
| i18n adapter | ~15 | refine i18n provider -> react-i18next |
| Auth pages wiring | ~50 | shadcn-admin sign-in/sign-up pages call refine `useLogin`/`useRegister` |
| Table wiring | ~30/table | shadcn-admin table components wired to refine `useTable` |
| Typesense search adapter | ~60 | Cmd+K queries routed to Typesense API |
| **Total** | **~500+** | Core adapter code (excludes page-level components) |

## Risks and Trade-offs

| Risk | Mitigation |
|------|------------|
| Mujarrad API not ready | Mock data provider implements the same refine DataProvider interface; swap when ready |
| refine version churn | Pin refine version; adapter interfaces are stable across minor versions |
| shadcn-admin fork diverges from upstream | Accept divergence; the fork is a starting point for UI components, not a maintained dependency |
| Single-user assumption baked in | refine auth provider supports `getPermissions`; adding multi-user means extending the provider, not rewriting it |
| R2 bucket configuration | Bucket must be created via wrangler CLI; CORS policy must allow uploads from the app domain |
| Over-abstraction through providers | The ~500 lines of adapter code is the cost; benefit is clean separation and swappable backends |
| Typesense Docker availability | Typesense must run alongside the app; use Docker Compose for local dev, container sidecar for production |
| Local ETL machine offline | Typesense index becomes stale; staleness equals downtime, ETL catches up immediately on reconnect |
| Text extraction quality | Wider Tooling's two-round strategy (Docling + OCR fallback) handles digital and scanned documents; GPU models available locally for complex layouts |

## Open Questions
1. ~~Should file content be indexed for full-text search, or only file metadata?~~ — **Resolved: Both. Typesense indexes extracted file content + structured metadata. Full-text search from day one.**
2. What is the maximum practical number of organizations before the table needs server-side pagination?
3. ~~Should contacts be standalone entities (shared across orgs) or always scoped to one organization?~~ — **Resolved: Contacts are standalone Mujarrad nodes linked to organizations via relationships. One contact node can be linked to multiple organizations with no duplication.**
