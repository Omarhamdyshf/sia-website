# Spec: Notification Center

## ADDED Requirements

### Requirement: Bell Icon with Unread Count
The system SHALL display a bell icon in the shadcn-admin header/top navigation bar. The icon MUST show a badge with the count of unread alerts when unread alerts exist. The badge SHALL be hidden when there are zero unread alerts.

#### Scenario: Unread alerts exist
- **WHEN** there are unread alerts
- **THEN** the bell icon SHALL display a numeric badge showing the unread count

#### Scenario: No unread alerts
- **WHEN** all alerts are read or no alerts exist
- **THEN** the bell icon SHALL appear without a badge

### Requirement: Alert Generation from SLA Engine Derived State
The system SHALL generate alerts client-side based on SLA engine derived state (from refine `useList` calculations). The system MUST create alerts for three conditions: items that are overdue, items that are at-risk, and tasks due today. Each alert MUST include: id, type (overdue, at_risk, or due_today), title, description, linkedEntityType, linkedEntityId, isRead, and createdAt. Alerts SHALL be regenerated from SLA engine output on each page load — no persistent alert storage is required for MVP.

#### Scenario: Overdue alert generated
- **WHEN** an entity's SLA-derived status is "overdue"
- **THEN** the system SHALL generate an alert of type "overdue" with the entity name in the title

#### Scenario: At-risk alert generated
- **WHEN** an entity's SLA-derived status is "at-risk"
- **THEN** the system SHALL generate an alert of type "at_risk" with the entity name and days remaining in the description

#### Scenario: Task due today alert
- **WHEN** a task refine resource has dueDate equal to today and status is "open"
- **THEN** the system SHALL generate an alert of type "due_today" with the task title

### Requirement: Notification Popover via shadcn
The system SHALL display a popover using shadcn Popover (not Novu or any third-party notification service) when the operator clicks the bell icon. The popover MUST list alerts in reverse chronological order with unread items visually distinguished from read items. All toast notifications triggered by actions within the notification center MUST go through the refine notification provider (sonner).

#### Scenario: Open notification popover
- **WHEN** the operator clicks the bell icon
- **THEN** the system SHALL open a shadcn Popover showing the list of recent alerts

#### Scenario: Unread vs read styling
- **WHEN** the popover displays alerts
- **THEN** unread alerts SHALL have a distinct background color or visual indicator compared to read alerts

#### Scenario: Empty state
- **WHEN** the operator opens the popover with no alerts
- **THEN** the system SHALL display a message indicating no notifications

### Requirement: Mark as Read
The system SHALL allow the operator to mark individual alerts as read by clicking on them, and mark all alerts as read via a "Mark all as read" action. Read state SHALL be managed in local component state. Read state resets on page reload — alerts are regenerated from SLA engine output on each load, and all start as unread. This is expected behavior for a single-user system.

#### Scenario: Click alert to mark as read
- **WHEN** the operator clicks on an unread alert in the popover
- **THEN** the system SHALL mark that alert as read and update the unread count badge

#### Scenario: Mark all as read
- **WHEN** the operator clicks "Mark all as read"
- **THEN** the system SHALL mark all alerts as read and hide the unread count badge

### Requirement: Alert Navigation
The system SHALL navigate the operator to the linked entity when an alert is clicked.

#### Scenario: Click overdue organization alert
- **WHEN** the operator clicks an alert linked to an organization
- **THEN** the system SHALL navigate to that organization's detail page

#### Scenario: Click task due today alert
- **WHEN** the operator clicks an alert linked to a task
- **THEN** the system SHALL navigate to the tasks page with that task highlighted or filtered
