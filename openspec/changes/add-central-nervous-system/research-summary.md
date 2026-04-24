# Research Summary: Central Nervous System (Sprint 1)

## 1. refine.dev v5

**DataProvider interface** — 6 methods: `getList` (resource, pagination, filters, sorters, meta → data[]+total), `getOne` (resource, id → data), `create` (resource, variables → data), `update` (resource, id, variables → data), `deleteOne` (resource, id → data), `custom` (url, method, payload → data). All return Promises.

**AuthProvider interface** — 6 methods: `login` (params → success/error+redirectTo), `logout` (→ success+redirectTo), `check` (→ authenticated boolean), `getPermissions` (→ permissions), `getIdentity` (→ user object), `onError` (error → logout boolean).

**Resources** — Defined in `<Refine resources={[...]}>`. Each resource has `name`, `list`/`create`/`edit`/`show` route components, `meta` for custom data.

**@refinedev/react-table** — `useTable` wraps TanStack Table with data provider integration. Returns a TanStack Table instance with server-side pagination, sorting, and filtering pre-wired.

**@refinedev/react-hook-form** — `useForm` wraps react-hook-form. On submit, auto-calls `create`/`update` on the data provider. Handles loading/success/error states.

**NotificationProvider** — `open(params)` and `close(key)`. Params: message, description, type (success/error/progress), key.

**I18nProvider** — `translate(key, params, defaultMessage)`, `changeLocale(locale)`, `getLocale()`.

**`<Authenticated>`** — Wraps route content. Calls `authProvider.check()`. Renders children if authenticated, redirects to `fallback` (login) if not.

**Vite setup** — `@refinedev/core`, `@refinedev/react-router`, `@refinedev/react-table`, `@refinedev/react-hook-form`.

**Gap**: refine v5 uses `@refinedev/react-router` (not the v4 `@refinedev/react-router-v6`). Need to confirm exact package version compatibility with React 19.

## 2. shadcn-admin

**Layout** — `authenticated-layout.tsx` (SidebarProvider → AppSidebar + SidebarInset), `app-sidebar.tsx`, `header.tsx`, `main.tsx`, `nav-group.tsx`. Context providers: LayoutProvider, SearchProvider, ThemeProvider.

**Auth pages** — `sign-in/` (email/password + OAuth), `sign-up/`, `otp/`, `forgot-password/`. All use RHF + Zod. `auth-layout.tsx` as shared wrapper.

**Table components** — 6 reusable: DataTableColumnHeader, DataTableToolbar, DataTablePagination, DataTableBulkActions, faceted-filter, view-options. Built on TanStack Table.

**Command palette** — `command-menu.tsx` using `cmdk` + shadcn CommandDialog. Renders sidebar nav items as searchable commands.

**Theme** — `theme-provider.tsx`: light/dark/system. Persists in cookies. CSS variables in `theme.css`.

**Error pages** — 403, 404, 500, 401, 503, general-error.

**Key note**: Uses TanStack Router (file-based). We use React Router — routes are NOT portable. Extract components/features only, not route files.

## 3. Uppy + Cloudflare R2

**Uppy** — `@uppy/core` + `@uppy/tus` + `@uppy/react` + `@uppy/drag-drop`. tus protocol splits files into chunks, resumes on failure.

**R2 tus endpoint** — `https://<ACCOUNT_ID>.r2.cloudflarestorage.com/<BUCKET>/tus`. Requires Bearer token. CORS must expose `Upload-Offset`, `Upload-Length`, `Location` headers.

**R2 bucket setup** — `npx wrangler r2 bucket create <name>`. CORS via `wrangler r2 bucket cors put`. tus enabled per-bucket in dashboard.

**S3-compatible API** — `@aws-sdk/client-s3` with endpoint pointed to R2, region `auto`. ListObjectsV2 for polling.

**React pattern** — Create Uppy instance in `useMemo`/`useRef`, close in cleanup effect. Use `<Dashboard uppy={uppy} />` or custom UI.

## 4. Typesense

**Docker** — `typesense/typesense:27.1`, port 8108, `--data-dir /data --api-key=<key> --enable-cors`.

**Collections** — JSON schema with fields (name, type, facet, sort). Types: string, string[], int64, float, bool.

**Search** — `POST /multi_search`. Params: q, query_by, num_typos (0-2), query_by_weights, prioritize_exact_match.

**Indexing** — Single: `POST /collections/{name}/documents`. Bulk: `POST /collections/{name}/documents/import` with JSONL.

**Client** — `typesense` npm package. `new Typesense.Client({ nodes, apiKey })`.

## 5. Mujarrad API

**REST API** at `https://mujarrad.onrender.com/api`. No npm package.

**Auth** — Google OAuth: `POST /api/auth/oauth/google` with `{ idToken }` → `{ token, user, isNewUser }`. JWT stored in localStorage.

**Nodes** — Types: CONTEXT, REGULAR, ASSUMPTION, TEMPLATE. Data in `node.nodeDetails`. Versioning built-in.

**Relationships** — Modeled as node attributes: `belongs_to`, `has_stage`, `next`.

**Space** — Single space `sia-portal`. Contexts act as collections.

**Status**: Only Google OAuth login implemented in current codebase. Data provider not yet built. Mock data provider is the fallback strategy.

## 6. Wider Tooling ETL Pipeline

External tooling at `Widers_ Tooling/Data Management Tools/` and `ISCO/docling-dubai-case-simple/`. Not in this repo.

**Round 1** — Docling fast extraction (no OCR, CPU-only, 1-5 sec/file). Handles digital PDF, DOCX, XLSX, PPTX.

**Round 2** — EasyOCR or Ollama vision model. Triggers when Round 1 extracts < 100 chars.

**ETL flow** — Watch R2 for new uploads (via Cloudflare Queue or S3 ListObjectsV2 polling) → pull file → extract text → push to Typesense API.

**Transformer** — Maps `extract_file()` output dict to Typesense JSON: id, file_name, organization_id, file_type, uploaded_at, content.

## 7. Overlap Matrix (Doc 18)

Clear ownership boundaries confirmed:
- **refine** owns: data fetching/CRUD, auth logic, access control, routing (resource definitions), CRUD forms, table data layer, audit log
- **shadcn-admin** owns: app shell/sidebar, auth UI pages, command palette, theme, error pages, settings pages, table UI components, standalone forms
- **sonner** owns: toast rendering (via refine notification provider adapter, ~10 lines)
- **react-i18next** owns: translations (via refine i18n provider adapter, ~15 lines)

Total integration glue: ~500 lines of adapter code.

## Gaps & Risks

1. **Mujarrad API docs** — No formal API documentation found. Data provider will need to be developed against the live API or with a mock provider first.
2. **refine v5 + React 19** — Need to verify package compatibility.
3. **R2 tus endpoint** — Must be enabled per-bucket; CORS configuration is critical.
4. **shadcn-admin extraction** — Uses TanStack Router; only component/feature folders are portable.
5. **Wider Tooling location** — External to this repo; ETL integration is a separate process.
