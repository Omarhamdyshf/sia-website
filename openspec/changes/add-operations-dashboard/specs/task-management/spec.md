# Spec: Task Management

## ADDED Requirements

### Requirement: Task as Refine Resource
The system SHALL define tasks as a refine resource backed by Mujarrad nodes, accessed through the Mujarrad data provider. Each task MUST include fields: id, title, description, dueDate, priority, status, organizationId, contactId, createdBy, createdAt, completedAt. The task resource MUST be registered in the refine resource configuration.

#### Scenario: Task resource available
- **WHEN** the application initializes
- **THEN** the task resource SHALL be registered with refine and accessible via the Mujarrad data provider

### Requirement: Task Creation via Refine Form
The system SHALL allow the operator to create tasks using `@refinedev/react-hook-form` with Zod validation. Required fields: title, due date, priority (high, medium, or low). Optional fields: description, linked organization, linked contact.

#### Scenario: Create task from tasks page
- **WHEN** the operator clicks "Create Task" on the tasks page and submits a valid `@refinedev/react-hook-form` form
- **THEN** the system SHALL create a new task via the refine data provider with status "open" and display it in the tasks table

#### Scenario: Create task from organization detail page
- **WHEN** the operator clicks "Create Task" from an organization detail page
- **THEN** the system SHALL open the task creation form with the organizationId pre-filled

#### Scenario: Create task with missing required fields
- **WHEN** the operator submits the form without title, due date, or priority
- **THEN** the system SHALL display Zod validation errors and prevent creation

### Requirement: Task List via Refine useTable
The system SHALL display tasks using refine `useTable` with shadcn-admin table UI. Columns: title, due date, priority, status, linked organization, and actions. The system MUST support filtering by status (open/done), priority (high/medium/low), linked organization, and due date range.

#### Scenario: View all open tasks
- **WHEN** the operator navigates to the tasks page
- **THEN** the system SHALL display all tasks via refine `useTable` defaulting to the "open" status filter

#### Scenario: Filter by priority
- **WHEN** the operator selects a priority filter value
- **THEN** the system SHALL pass the filter to refine `useTable` and display only matching tasks

#### Scenario: Filter by organization
- **WHEN** the operator selects an organization from the filter
- **THEN** the system SHALL display only tasks linked to that organization

#### Scenario: Filter by due date range
- **WHEN** the operator sets a start and end date in the due date filter
- **THEN** the system SHALL display only tasks with due dates within that range

### Requirement: Task Edit via Refine Form
The system SHALL allow the operator to edit existing tasks using `@refinedev/react-hook-form`. The edit form MUST pre-populate all current field values.

#### Scenario: Edit task
- **WHEN** the operator clicks edit on a task and modifies fields
- **THEN** the system SHALL update the task via the refine data provider and refresh the table

### Requirement: Task Completion
The system SHALL allow the operator to mark a task as complete. Completing a task MUST set the status to "done" and record the completedAt timestamp via the refine data provider.

#### Scenario: Mark task as complete
- **WHEN** the operator clicks the complete action on an open task
- **THEN** the system SHALL update status to "done" via refine, record completedAt, display a success toast via refine notification provider (sonner), and update the display

#### Scenario: Reopen a completed task
- **WHEN** the operator clicks reopen on a completed task
- **THEN** the system SHALL set status back to "open" via refine and clear the completedAt field

### Requirement: Overdue Task Surfacing in Priority Queue
The system SHALL automatically surface overdue tasks (status "open" with dueDate before today) in the Priority Queue on the dashboard. Overdue tasks MUST be ranked alongside SLA-derived overdue items using the same refine `useTable` custom sort.

#### Scenario: Overdue task appears in Priority Queue
- **WHEN** a task is open and its due date has passed
- **THEN** the system SHALL include it in the Priority Queue with item type "Task" and the number of days overdue

#### Scenario: Completed task removed from Priority Queue
- **WHEN** an overdue task is marked as complete
- **THEN** the system SHALL remove it from the Priority Queue immediately

### Requirement: Task Activity Logging
The system SHALL log task creation and task completion as activity events via the refine data provider on the linked organization's timeline.

#### Scenario: Task creation logged
- **WHEN** a task linked to an organization is created
- **THEN** the system SHALL create an activity-event resource of type "task_created" on that organization's timeline via refine

#### Scenario: Task completion logged
- **WHEN** a task linked to an organization is completed
- **THEN** the system SHALL create an activity-event resource of type "task_completed" on that organization's timeline via refine
