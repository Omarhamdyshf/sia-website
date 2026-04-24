# Change: Add Central Nervous System (Sprint 1)

## Why
Omar needs a single-user admin panel to manage SIA organizations, contacts, files, and notes from one place. This is the foundational sprint that stands up the entire portal skeleton and core CRUD workflows.

## What Changes
- Scaffold a **refine.dev** application with React Router as the routing layer
- Integrate **shadcn-admin** as the UI shell (sidebar, header, theme, error pages, auth UI pages)
- Implement a custom **Mujarrad data provider** conforming to refine's `DataProvider` interface (~200 lines)
- Implement a **refine auth provider** wrapping Mujarrad JWT + Google OAuth (~80 lines)
- Wire **notification adapter** (refine notification provider -> sonner, ~10 lines) and **i18n adapter** (refine i18n provider -> react-i18next, ~15 lines)
- Define organization, contact, file, and note as **refine resources** with full CRUD via `useList`, `useOne`, `useCreate`, `useUpdate`, `useDelete`
- Build organization registry with refine `useTable` + shadcn-admin table UI components, and `@refinedev/react-hook-form` for CRUD forms
- Add file upload (PDF/DOCX/XLSX/PPTX) via Uppy with tus protocol for resumable chunked uploads to Cloudflare R2, metadata stored as Mujarrad nodes through the refine data provider
- Deploy **Typesense** (Docker) on the server as the search engine
- Run **Wider Tooling extraction pipeline** locally as an ETL process: watches R2 for new uploads, extracts text (Docling + OCR fallback), indexes into Typesense. Max 24h staleness if local machine is offline.
- Add global Cmd+K search via cmdk (shadcn-admin command palette) querying Typesense for full-text content search (including file contents) with typo tolerance

## Impact
- Affected specs: admin-shell, organization-registry, file-vault, global-search, non-functional requirements
- Non-functional requirements spec added covering: resumable upload, reliability, responsive layout, keyboard accessibility, dark mode, loading states, performance, design system consistency
- Activity tracking capability added: automatic event logging for all CRUD operations with chronological Activity tab
- Implementation follows a 5-phase methodology: Research → Design → Design Implementation → Design Testing → Implementation
- Uppy replaces react-dropzone for file uploads (tus protocol support for resumable, chunked uploads to Cloudflare R2)
- Affected code: refine providers (data, auth, notification, i18n), shadcn-admin app shell integration, refine resource definitions, organization pages, file upload components, search command palette
- **Server** (2-core / 4GB): Next.js + Typesense (Docker). No extraction on server.
- **Local ETL**: Wider Tooling extraction pipeline runs on local machine / DGX Spark, indexes into Typesense. Foundation for future Kimi K2 agent-driven opportunity matching.
- Key adapter code: ~500+ lines total across Mujarrad data provider, auth provider, sonner adapter, react-i18next adapter, and Typesense search adapter
