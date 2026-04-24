# Design: Operations Dashboard

## Context

Sprint 3 (Weeks 5-6) builds on the refine.dev foundation established in Sprints 1-2. Currently there is no way to see which organizations are overdue, no task tracking, no activity history, and no in-app email capability. Omar must manually check each organization and track deadlines externally. All new features MUST integrate with refine as the foundation framework — resources, data providers, hooks, and notification providers.

## Goals

- Provide a single dashboard (extending shadcn-admin dashboard) showing all overdue and at-risk items ranked by urgency
- Display KPI cards using refine `useList` with count aggregation
- Show a full activity timeline per organization using refine resources + react-chrono
- Enable task CRUD via `@refinedev/react-hook-form` with tasks as refine resources backed by Mujarrad nodes
- Allow configurable SLA rules as refine resources backed by Mujarrad config nodes driving derived status calculations
- Support manual email sending using react-email templates, logged via refine data provider
- Surface alerts via a shadcn Popover notification center driven by SLA engine output

## Non-Goals

- Backend SLA engine or cron-based monitoring (SLA logic is frontend-only derived state)
- Third-party notification services like Novu (single user, shadcn Popover suffices)
- Automated email sequences or drip campaigns
- Multi-user task assignment (Omar is the sole operator)
- Standalone React Query hooks — all data fetching goes through refine data provider

## Decisions

### Tasks as Refine Resources
Tasks are refine resources backed by Mujarrad nodes, accessed through the Mujarrad data provider. CRUD operations use `@refinedev/react-hook-form` for create/edit forms and refine `useTable` + shadcn-admin table UI for list views. Fields: id, title, description, dueDate, priority, status, organizationId, contactId, createdBy, createdAt, completedAt.

### SLA Engine: Derived State from Refine useList
SLA rules are stored as refine resources backed by Mujarrad config nodes — same data provider pattern as all other resources. The SLA calculation is pure frontend logic: refine `useList` fetches all relevant entities, then derived state computes elapsed days vs. rule thresholds to classify each entity as on-track, at-risk, or overdue. No backend cron needed.

### Priority Queue: Client-Side Sort on Derived SLA Status
The Priority Queue fetches all entities via refine `useList`, computes SLA status as derived state, then sorts client-side: overdue items first (by days overdue descending), then at-risk items (by days remaining ascending). Rendered using shadcn-admin DataTable components. Note: refine `useTable`'s built-in sorters send params to the server, but Mujarrad has no knowledge of SLA status — sorting must be client-side on the computed values. Dashboard `useList` queries execute in parallel, not sequentially, to meet the 3s load target.

### Dashboard KPIs: Refine useList with Aggregation
KPI cards (total orgs, pending signatures, overdue items, tasks due today) use refine `useList` queries with count aggregation. Recharts (already in stack via shadcn-admin) provides bar charts for overdue counts by org and trend lines for SLA compliance.

### Activity Events: Refine Resources + Custom shadcn/ui Timeline
Activity events are refine resources fetched via the data provider. A custom vertical timeline component built with shadcn/ui (~50-60 lines) replaces react-chrono, which has known bugs with dynamic item updates (GitHub issues #133, #161, #376). Custom card renderers per event type. Infinite scroll appends older events via refine pagination with scroll position anchoring — before append, record scrollTop and scrollHeight; after render, adjust scrollTop by the height difference so the viewport stays pinned.

### Notification Center: shadcn Popover
A bell icon in the shadcn-admin header opens a shadcn Popover listing alerts. Alerts are generated client-side from SLA engine derived state (pure function: `(entities, rules) => StatusMap`) — no external notification service. Mark-as-read persists read alert IDs in localStorage keyed by entity ID + type. Navigate on click.

### Email Compose: react-email + Resend + refine data provider
react-email templates render email content. A compose modal supports To, Subject, Body, and attachments. Send goes through Resend (same provider as S2 signing emails). Sent emails are logged as activity events via the refine data provider.

### Forms Strategy
- Task CRUD: `@refinedev/react-hook-form` (refine-integrated forms)
- SLA rule CRUD: `@refinedev/react-hook-form` + Zod validation (SLA rules are refine resources backed by Mujarrad config nodes, same pattern as other resources)

### Notifications/Toasts
All toast notifications go through refine notification provider, which delegates to sonner.

### i18n
All user-facing strings go through refine i18n provider (react-i18next).

## Risks and Trade-offs

| Risk | Mitigation |
|------|------------|
| Frontend SLA calculations may lag with many organizations | Refine query caching and memoization; revisit if >500 orgs |
| Alert read-state in localStorage may be cleared | Acceptable; alerts regenerate from SLA state, only read markers are lost |
| Custom timeline scroll anchoring edge cases | Test with large event histories; fallback to simple list if anchoring breaks |
| Email send errors are not retried automatically | Show error toast via refine notification provider and allow manual retry |
| SLA rule misconfiguration breaks priority queue | Default rules pre-configured; Zod validation prevents invalid thresholds |

## Open Questions

1. Should SLA rules support per-organization overrides, or are global defaults sufficient for now?
2. ~~What email service credentials/provider will be used for sending?~~ — **Resolved: Resend. Same provider as S2, native react-email support.**
3. Should completed tasks be archived or remain visible with a "done" filter?
