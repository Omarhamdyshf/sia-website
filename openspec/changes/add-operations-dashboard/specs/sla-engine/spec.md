# Spec: SLA Engine

## ADDED Requirements

### Requirement: SLA Rule Management
The system SHALL allow the operator to create, read, update, and delete SLA rules. Each SLA rule MUST have a name, trigger event, expected completion days, and at-risk threshold days. SLA rules SHALL be stored as refine resources backed by Mujarrad config nodes. The system SHALL provide default rules on first use: Signature SLA (14 days, at-risk at 10 days), Onboarding Response (7 days, at-risk at 5 days), and Document Submission (21 days, at-risk at 14 days). The SLA configuration form MUST use `@refinedev/react-hook-form` with Zod validation, consistent with all other refine resource forms in the portal.

#### Scenario: View SLA rules
- **WHEN** the operator navigates to the SLA Configuration page under Settings
- **THEN** the system SHALL display a table of all SLA rules showing name, trigger event, expected days, and at-risk days

#### Scenario: Create a new SLA rule
- **WHEN** the operator clicks "Add Rule" and submits a valid form with name, trigger event, expected days, and at-risk days
- **THEN** the system SHALL persist the new rule via the refine data provider and display it in the rules table

#### Scenario: Edit an existing SLA rule
- **WHEN** the operator clicks edit on a rule row and modifies any field
- **THEN** the system SHALL update the rule and recalculate all derived SLA statuses

#### Scenario: Delete an SLA rule
- **WHEN** the operator clicks delete on a rule row and confirms the action
- **THEN** the system SHALL remove the rule and recalculate all derived SLA statuses

#### Scenario: Validation of at-risk threshold
- **WHEN** the operator sets the at-risk days to a value greater than or equal to expected days
- **THEN** the system SHALL display a Zod validation error and prevent saving

### Requirement: SLA Status Calculation (Pure Frontend Derived State)
The system SHALL calculate the SLA status of each trackable entity as pure frontend derived state. The system MUST use refine `useList` to fetch all relevant entities from the Mujarrad data provider, then compute elapsed days since the trigger event and classify each entity as "on-track", "at-risk", or "overdue" based on the rule thresholds. There SHALL be no backend cron or server-side SLA logic.

#### Scenario: Entity is on-track
- **WHEN** the elapsed days since the trigger event is less than the at-risk threshold days
- **THEN** the system SHALL classify the entity as "on-track" and display a green status badge

#### Scenario: Entity is at-risk
- **WHEN** the elapsed days is greater than or equal to the at-risk threshold days but less than the expected completion days
- **THEN** the system SHALL classify the entity as "at-risk" and display an amber status badge

#### Scenario: Entity is overdue
- **WHEN** the elapsed days is greater than or equal to the expected completion days
- **THEN** the system SHALL classify the entity as "overdue" and display a red status badge

#### Scenario: Completed entity excluded from calculation
- **WHEN** the trigger event has a corresponding completion event recorded
- **THEN** the system SHALL exclude that entity from SLA status calculation

### Requirement: Priority Queue with Client-Side Sort
The system SHALL render a Priority Queue by fetching all entities via refine `useList`, computing SLA status as derived state, sorting client-side, and rendering with shadcn-admin DataTable components. The queue MUST display all entities with non-completed SLA obligations, sorted by: overdue items first (ordered by days overdue descending), then at-risk items (ordered by days until expected completion ascending). Sorting is client-side because SLA status is computed, not stored in Mujarrad.

#### Scenario: Display Priority Queue on dashboard
- **WHEN** the operator views the dashboard home screen
- **THEN** the system SHALL display the Priority Queue table with columns: organization name, item type, days overdue or days remaining, status badge, and a link to the entity detail page

#### Scenario: Overdue item ranks above at-risk item
- **WHEN** the queue contains both overdue and at-risk items
- **THEN** all overdue items SHALL appear above all at-risk items in the list

#### Scenario: Multiple overdue items sorted by severity
- **WHEN** the queue contains multiple overdue items
- **THEN** they SHALL be sorted with the most overdue (highest days overdue) at the top

### Requirement: KPI Dashboard Cards via Refine useList
The system SHALL display KPI cards on the dashboard home screen (extending the shadcn-admin dashboard layout). Each KPI card MUST use refine `useList` with count aggregation to derive its value. Cards SHALL show: total organizations, pending signatures, total overdue items, and tasks due today. Dashboard charts MUST use recharts (already available via shadcn-admin).

#### Scenario: KPI cards reflect current state
- **WHEN** the operator loads the dashboard
- **THEN** each KPI card SHALL display an up-to-date count derived from refine `useList` queries

#### Scenario: KPI card click-through
- **WHEN** the operator clicks on a KPI card
- **THEN** the system SHALL navigate to the relevant filtered view (e.g., clicking "Overdue Items" scrolls to or filters the Priority Queue)

#### Scenario: Dashboard chart renders overdue breakdown
- **WHEN** the operator views the dashboard
- **THEN** the system SHALL display a recharts bar chart showing overdue item counts grouped by organization
