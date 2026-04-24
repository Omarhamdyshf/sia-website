# Tasks: Operations Dashboard

## Phase 1 — Research
- [ ] 1.1 Study shadcn/ui timeline patterns: vertical layout, custom card rendering, scroll position anchoring
- [ ] 1.2 Study recharts (already in stack): bar charts, donut charts, KPI card patterns, responsive containers
- [ ] 1.3 Study react-email: follow-up and reminder template patterns, attachment handling
- [ ] 1.4 Study atomic-crm (AGPL — UX patterns only): activity timeline UX, deal pipeline patterns, task management
- [ ] 1.5 Review S1/S2 activity event data model: confirm event types available for timeline and SLA calculations
- [ ] 1.6 Document research findings and gaps

## Phase 2 — Design
- [ ] 2.1 Create ERD: Task, SLARule, ActivityEvent, Alert nodes and relationships to Organization, Contact in Mujarrad
- [ ] 2.2 Extend Activity system ERD: add process type and step definition nodes designed in S1 (full implementation in S3)
- [ ] 2.3 Create sequence diagram: SLA calculation flow (fetch entities → apply rules → derive status → rank priority queue)
- [ ] 2.4 Create state diagram: task lifecycle (open → done)
- [ ] 2.5 Create state diagram: SLA status derivation (on_track → at_risk → overdue)
- [ ] 2.6 Design dashboard layout: KPI cards placement, priority queue table, tasks widget arrangement
- [ ] 2.7 Design notification center: alert generation rules, bell icon behavior, popover layout
- [ ] 2.8 Design email compose modal: field layout, attachment picker, send flow
- [ ] 2.9 Define Mujarrad node schemas for Task, SLARule, Alert
- [ ] 2.10 Review and approve all design artifacts before proceeding

## Phase 3 — Design Implementation
- [ ] 3.1 Build custom shadcn/ui vertical timeline component (~50-60 lines)
- [ ] 3.2 Define refine resources: tasks, sla-rules, activity-events (extend), alerts
- [ ] 3.3 Build SLA calculation engine: pure frontend function taking entity lists and SLA rules, returning status per item
- [ ] 3.4 Build KPI card components using shadcn/ui Card + refine `useList` for counts
- [ ] 3.5 Build priority queue table: refine `useTable` with custom overdue-first sort comparator
- [ ] 3.6 Build timeline event cards with event type icons and custom renderers per type
- [ ] 3.7 Build task CRUD form with `@refinedev/react-hook-form`
- [ ] 3.8 Build email compose modal with react-email template preview
- [ ] 3.9 Build notification center: bell icon + shadcn Popover + alert list

## Phase 4 — Design Testing
- [ ] 4.1 Verify SLA engine: given known dates and rules, correct statuses are derived (on_track, at_risk, overdue)
- [ ] 4.2 Verify priority queue: overdue items sort first, then at_risk, then on_track
- [ ] 4.3 Verify KPI cards: counts match actual data from mock provider
- [ ] 4.4 Verify timeline: events from S1/S2 render correctly with proper icons and timestamps
- [ ] 4.5 Verify task CRUD: create, complete, filter, link to org
- [ ] 4.6 Verify email compose: sends email, logs to activity
- [ ] 4.7 Verify notification center: alerts generated from SLA engine, mark as read works
- [ ] 4.8 Document design issues and resolve before proceeding

## Phase 5 — Implementation
- [ ] 5.1 Replace S1 dashboard with operations dashboard: KPI cards + priority queue + tasks widget
- [ ] 5.2 Wire KPI cards to live data via refine `useList`
- [ ] 5.3 Build full priority queue with filtering by org, type, status
- [ ] 5.4 Upgrade org detail Activity tab from simple list to custom shadcn/ui visual timeline with scroll anchoring
- [ ] 5.6 Build Tasks sidebar nav and task list page (refine `useTable` + shadcn-admin table)
- [ ] 5.7 Build task create from org detail page (pre-linked to org)
- [ ] 5.8 Build SLA rules settings page (`@refinedev/react-hook-form` + Zod, default rules pre-configured)
- [ ] 5.9 Wire SLA engine to priority queue and notification center
- [ ] 5.10 Build email compose modal on org/contact detail pages
- [ ] 5.11 Wire email send to activity event logging
- [ ] 5.12 Build bell icon notification center with alert popover
- [ ] 5.13 Unify look and feel: custom timeline, recharts, notification popover all follow SIA design tokens
- [ ] 5.14 Test full end-to-end against all Definition of Done criteria
