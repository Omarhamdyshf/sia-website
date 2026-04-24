# Non-Functional Requirements: Operations Dashboard

## ADDED Requirements

### Requirement: SLA Calculation Performance

The SLA engine MUST calculate statuses for up to 500 entities within 500ms on the client side.

#### Scenario: Small dataset calculation
- **WHEN** the SLA engine receives 100 organizations with 3 SLA rules each
- **THEN** it SHALL return all calculated statuses in under 200ms

#### Scenario: Large dataset calculation
- **WHEN** the SLA engine receives 500 entities with applicable SLA rules
- **THEN** it SHALL return all calculated statuses in under 500ms

#### Scenario: Recalculation on data refetch
- **WHEN** a relevant data refetch triggers SLA recalculation
- **THEN** the calculation MUST complete without UI jank or frame drops

---

### Requirement: Dashboard Load Time

The operations dashboard MUST render KPI cards and priority queue within 3 seconds on initial load.

#### Scenario: Moderate dataset load
- **WHEN** the dashboard loads with 50 organizations
- **THEN** KPI cards and priority queue SHALL be fully rendered in under 2 seconds

#### Scenario: Large dataset load
- **WHEN** the dashboard loads with 200 organizations
- **THEN** KPI cards and priority queue SHALL be fully rendered in under 3 seconds

---

### Requirement: Timeline Performance

The activity timeline MUST support infinite scroll loading 20 events per page without UI freezing.

#### Scenario: Initial page load
- **WHEN** the activity timeline first renders
- **THEN** the first 20 events SHALL load in under 1 second

#### Scenario: Scroll pagination
- **WHEN** the user scrolls to trigger loading the next page of events
- **THEN** the next 20 events SHALL load in under 500ms

#### Scenario: Large event history
- **WHEN** an organization has 500+ total activity events
- **THEN** scrolling and pagination MUST NOT degrade scroll performance

---

### Requirement: Email Send Reliability

Email compose MUST confirm send success or show a clear failure message. The system MUST NOT silently fail to send.

#### Scenario: Successful send
- **WHEN** an email is sent successfully
- **THEN** the system SHALL show a sonner success toast AND log the email as an activity event

#### Scenario: Failed send
- **WHEN** an email fails to send
- **THEN** the system SHALL show an error toast with a retry option

#### Scenario: Activity logging
- **WHEN** an email is sent successfully
- **THEN** the sent email SHALL appear in the organization's activity timeline

---

### Requirement: Notification Freshness

Alert data in the notification center MUST reflect SLA calculations from the most recent data fetch, not stale cached data.

#### Scenario: Post-fetch alert update
- **WHEN** a new data fetch completes
- **THEN** alerts in the notification center SHALL update within 1 second

#### Scenario: Overdue threshold crossing
- **WHEN** an entity crosses an SLA overdue threshold
- **THEN** an overdue alert MUST appear in the notification center

#### Scenario: Resolved alert dismissal
- **WHEN** an SLA issue is resolved
- **THEN** the corresponding alert SHALL be dismissed

---

### Requirement: Design System Consistency

All S3 components (custom shadcn/ui timeline, recharts charts, KPI cards, notification popover, email compose modal) MUST follow SIA design tokens.

#### Scenario: Timeline styling
- **WHEN** the custom timeline renders completed steps
- **THEN** timeline icons SHALL use the SIA gold color token

#### Scenario: Chart styling
- **WHEN** recharts charts render data visualizations
- **THEN** charts SHALL use the SIA color palette

#### Scenario: Notification badge styling
- **WHEN** the notification bell icon displays an unread count badge
- **THEN** the badge SHALL use the SIA gold accent color
