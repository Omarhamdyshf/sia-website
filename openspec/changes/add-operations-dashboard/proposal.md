# Change: Add Operations Dashboard

## Why
Omar needs a centralized command center to track overdue items, manage tasks, monitor SLA compliance, and communicate with contacts across all organizations — replacing manual tracking with a priority-driven workflow.

## What Changes
- Add SLA/OLA priority dashboard extending the existing shadcn-admin dashboard layout, with KPI cards powered by refine `useList` aggregation and recharts visualizations
- Add per-organization activity timeline fetching activity-event refine resources displayed via custom shadcn/ui vertical timeline with scroll position anchoring
- Add task management system with tasks as refine resources backed by Mujarrad nodes, CRUD via `@refinedev/react-hook-form`
- Add SLA engine as frontend-only derived state from refine `useList` — SLA rules stored as refine resources backed by Mujarrad config nodes
- Add Priority Queue via refine `useTable` with custom sort comparator (overdue-first)
- Add notification center (bell icon with shadcn Popover alerts generated client-side from SLA engine)
- Add email compose modal using react-email templates, sent via email service, logged as activity events through refine data provider

## Impact
- **Methodology**: Tasks follow a strict 5-phase approach (Research → Design → Design Implementation → Design Testing → Implementation) ensuring each component is researched, designed, validated, and then built
- **Non-functional requirements**: Added spec covering SLA calculation performance, dashboard load time, timeline performance, email send reliability, notification freshness, and design system consistency — all with WHEN/THEN scenarios
- **Activity system**: Upgrades the org detail Activity tab from a simple list to a custom shadcn/ui visual timeline. Process types and step definitions are deferred to S4
- **Configurable SLA rules**: SLA rules are stored as Mujarrad config nodes with a dedicated settings page (`@refinedev/react-hook-form` + Zod), with default rules pre-configured for Signature, Onboarding Response, and Document Submission
- Affected specs: sla-engine, task-management, activity-timeline, notification-center, email-compose, non-functional
- Affected code: app/(portal)/dashboard/, app/(portal)/tasks/, components/timeline/, components/notifications/, components/email-compose/, lib/sla/, resources/task, resources/sla-rule, resources/activity-event, resources/alert
