# UX Gaps — Consolidated Requirements

**Date:** May 2, 2026
**Source:** 6-agent UX completeness audit + founder feedback
**Status:** REQUIREMENTS ONLY — no code written

---

## From Audit: Critical (C1-C7)

### REQ-C1: Task Detail/Edit/Delete Pages
Tasks currently have no detail page, no edit form, and no delete action. Users cannot view, modify, or remove individual tasks.

**Required:**
- TaskDetailPage at `/portal/tasks/:id` showing title, description, org, engagement, due date, priority, status, timestamps
- TaskEditPage (or shared form) at `/portal/tasks/edit/:id`
- Delete button with AlertDialog confirmation on both detail and list pages
- Task resource in PortalApp needs `show` and `edit` paths
- Task list rows need `cursor-pointer` + `onClick` navigate to detail

### REQ-C2: Engagements Sidebar Link
Engagements entity has full CRUD pages but no sidebar navigation entry. Users can only reach it via org detail or pipeline.

**Required:**
- Add "Engagements" to PortalSidebar navItems with Layers icon
- Position between Organizations and Contacts (or after Pipeline)

### REQ-C3: Signing Flow Toast Spam
Multi-mutation signing flows (create request + create signers + create fields) produce 5-10 sequential auto-toasts, overwhelming the user.

**Required:**
- Suppress intermediate toasts during signing creation workflow
- Show single summary toast on completion ("Signing request sent to 3 signers")
- Same for PublicSigningPage submission

### REQ-C4: Error Handling
No global error boundary. Signing workflows log errors to console only. useOne/useList failures show blank content.

**Required:**
- React ErrorBoundary wrapping portal routes with fallback UI
- User-facing error toast in NewSigningRequestPage and PublicSigningPage submit flows
- Error state rendering when useOne returns not-found or useList fails

### REQ-C5: Contact Form Org Pre-fill
"Add Contact" from org detail passes `organizationId` in URL but ContactFormPage does not read `useSearchParams`.

**Required:**
- ContactFormPage reads `organizationId` and `organizationName` from search params
- Pre-selects org in dropdown when present

### REQ-C6: Clickable Contact Rows in Org Detail
Contact rows in the org detail Contacts tab are not clickable. Users cannot navigate to contact detail from the org page.

**Required:**
- Each contact row navigates to `/portal/contacts/:id` on click
- Add `cursor-pointer` class

### REQ-C7: Clickable Org/Engagement in Task List
Organization and engagement name columns in the task list are plain text.

**Required:**
- Both columns render as clickable `<Link>` components
- Org links to `/portal/organizations/:id`
- Engagement links to `/portal/engagements/:id`

---

## From Audit: High (H1-H9)

### REQ-H1: Global Error Boundary
No React error boundary wrapping portal pages. Unhandled errors crash the entire app.

### REQ-H2: Engagement Detail Notes Tab
Notes tab on engagement detail is a hardcoded EmptyState placeholder. Should query notes filtered by engagementId and allow adding notes inline.

### REQ-H3: Signing Request Org/Engagement Link
Schema has organizationId and engagementId fields on signing-requests but the UI never sets or displays them. No way to link a signing request to an org or engagement.

### REQ-H4: Task Board Cards Clickable
Task cards on the task board have no onClick handler. Cannot navigate to task detail from the board.

### REQ-H5: Engagements + Signing in Cmd+K
Command palette dynamic search only covers orgs, contacts, and tasks. Engagements and signing requests are not searchable.

### REQ-H6: Contact List AlertDialog
Contact list page uses native `confirm()` for delete instead of AlertDialog. Inconsistent with the rest of the app.

### REQ-H7: Schema Consolidation
OrganizationFormPage, TaskCreatePage have local Zod schemas that diverge from shared schemas.ts. Should use shared schemas.

### REQ-H8: Cascade Delete Protection
Deleting an org or engagement orphans all child records (contacts, tasks, notes, files). Should either prevent delete when children exist or cascade cleanup.

### REQ-H9: No Cancel Confirmation on Signing Requests
"Cancel Request" on SigningDetailPage is a destructive action with no confirmation dialog.

---

## From Audit: Medium (M1-M20)

### REQ-M1: Note Edit/Delete
Notes can be created but never edited or deleted.

### REQ-M2: SLA Rule Create Button
No manual "Add New Rule" button. Only auto-seeded defaults.

### REQ-M3: Alerts Entity UI
Registered in entity registry but no UI anywhere. Either implement notification center or remove.

### REQ-M4: Dashboard EmptyState Components
Dashboard uses plain `<p>` for empty states instead of EmptyState component.

### REQ-M5: Activity Tab Empty State
Org and engagement detail activity tabs render empty VerticalTimeline with no message.

### REQ-M6: Contact Edit Not-Found Guard
Navigating to `/portal/contacts/edit/nonexistent` shows empty form instead of "Not found."

### REQ-M7: Pipeline List Tab Empty State
Pipeline list view renders empty table with no message.

### REQ-M8: TaskBoardPage Loading Skeleton
Loading state is plain "Loading..." text, not skeleton.

### REQ-M9: TaskCreatePage Loading State
No loading indicator on the task create form page.

### REQ-M10: Signing Request Zod Validation
NewSigningRequestPage has no Zod validation — only disables buttons.

### REQ-M11: SLA Settings Validation
Inline edit on SlaSettingsPage doesn't use slaRuleSchema.

### REQ-M12: Task Board Drag Denormalized Names
Dragging a task between engagement columns updates engagementId but not engagementName.

### REQ-M13: Engagement Tags Field Type
Tags field is a text input but schema expects string[]. Need comma parse.

### REQ-M14: Org Detail Tasks Tab
No tasks tab on org detail page. Cannot see tasks related to an org without navigating away.

### REQ-M15: Date Picker Consistency
All date fields use native input[type=date]. Functional but inconsistent with design system.

### REQ-M16: Contact List Pagination
Contact list loads all contacts without pagination.

### REQ-M17: Engagement List Delete
No delete from engagement list page (only from detail).

### REQ-M18: SLA Settings backTo
SlaSettingsPage PageHeader missing backTo prop.

### REQ-M19: Google OAuth Hook Import
Dynamic import of useGoogleLogin hook won't work — hooks can't be dynamically imported.

### REQ-M20: Mutation Error Feedback
Most pages lack onError callbacks on mutations.

---

## From Founder Feedback

### REQ-F1: Task Board Multiple Group-By Modes
Currently the task board only groups by engagement (assigned/unassigned). Need multiple Kanban views:
- **Group by status** — columns: Open | Done (or more granular if status expands)
- **Group by engagement** — current view, but needs all engagement columns visible (not just assigned/unassigned)
- **Group by priority** — columns: Critical | High | Medium | Low
- Toggle between group-by modes via dropdown or tabs

### REQ-F2: Task Board Engagement Columns Incomplete
The current board only shows "Unassigned" column. If there are no tasks assigned to engagements, there are no engagement columns. User has no target to drag tasks to.

**Required:**
- Always show all active engagement columns (even if empty) so users can drag tasks into them
- Show engagement columns for all active engagements, not just those with tasks

### REQ-F3: Create Engagement from Pipeline
There is no way to create a new engagement from the pipeline page. The pipeline shows existing engagements as cards but has no "+" button or "New Engagement" action.

**Required:**
- Add "New Engagement" button on the pipeline page
- Or add "+" in empty column to create engagement at that stage

### REQ-F4: Lucid Universal Quick-Add (Separate Proposal)
See `openspec/changes/lucid-universal-add/proposal.md` — universal "+" button that creates tasks, engagements, notes, contacts, or documents from any page.

---

## Summary Counts

| Priority | Count |
|----------|-------|
| Critical | 7 |
| High | 9 |
| Medium | 20 |
| Founder feedback | 4 |
| **Total** | **40** |
