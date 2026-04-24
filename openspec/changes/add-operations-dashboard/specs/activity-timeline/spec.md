# Spec: Activity Timeline

## ADDED Requirements

### Requirement: Activity Event as Refine Resource
The system SHALL define activity events as a refine resource fetched via the Mujarrad data provider. Each event MUST include: id, organizationId, type, title, description, metadata (JSON), actorId, and createdAt. Supported event types SHALL include: org_created, contact_added, file_uploaded, note_added, signing_request_sent, signing_completed, email_sent, task_created, and task_completed. The activity-event resource MUST be registered in the refine resource configuration.

#### Scenario: Activity event resource available
- **WHEN** the application initializes
- **THEN** the activity-event resource SHALL be registered with refine and accessible via the Mujarrad data provider

#### Scenario: File upload creates event
- **WHEN** a file is uploaded to an organization
- **THEN** the system SHALL create an activity-event resource of type "file_uploaded" via the refine data provider with the file name in the title and file metadata in the metadata field

#### Scenario: Contact added creates event
- **WHEN** a new contact is added to an organization
- **THEN** the system SHALL create an activity-event resource of type "contact_added" via the refine data provider with the contact name in the title

#### Scenario: Email sent creates event
- **WHEN** an email is sent from the compose modal for an organization's contact
- **THEN** the system SHALL create an activity-event resource of type "email_sent" via the refine data provider with the subject in the title and recipient in the metadata

### Requirement: Vertical Timeline Display via Custom shadcn/ui Component
The system SHALL display the activity timeline on each organization's detail page using a custom vertical timeline component built with shadcn/ui primitives (~50-60 lines). Events MUST be fetched as refine resources and displayed in reverse chronological order (newest first). All event type labels MUST be internationalized via the refine i18n provider (react-i18next).

#### Scenario: View organization timeline
- **WHEN** the operator navigates to an organization detail page
- **THEN** the system SHALL fetch activity events via refine `useList` and display a custom shadcn/ui vertical timeline of all events for that organization

#### Scenario: Timeline card content
- **WHEN** a timeline event is rendered
- **THEN** the system SHALL display the event type icon, title, description, actor name, and formatted timestamp

#### Scenario: Different event types have distinct styling
- **WHEN** events of different types appear on the timeline
- **THEN** each event type SHALL have a distinct icon and color to differentiate it visually

#### Scenario: Scroll position anchoring on append
- **WHEN** older events are appended to the timeline via infinite scroll
- **THEN** the system SHALL record scrollTop and scrollHeight before append, then adjust scrollTop by the height difference after render so the viewport stays pinned to the same content

### Requirement: Infinite Scroll via Refine Pagination
The system SHALL load timeline events in pages using refine pagination and support infinite scroll to load older events on demand. The initial page size MUST be 20 events.

#### Scenario: Initial load
- **WHEN** the timeline is first rendered
- **THEN** the system SHALL load and display the 20 most recent events via refine `useList` with pagination

#### Scenario: Scroll to load more
- **WHEN** the operator scrolls to the bottom of the currently loaded events and older events exist
- **THEN** the system SHALL fetch the next page of 20 events via refine and append them to the timeline

#### Scenario: All events loaded
- **WHEN** the operator has scrolled to load all available events
- **THEN** the system SHALL display an end-of-timeline indicator and stop requesting further pages

### Requirement: Custom Timeline Card Renderer
The system SHALL use custom card renderers per event type to display event-type-specific content. The renderers MUST handle all supported event types with appropriate layouts.

#### Scenario: File upload card shows file details
- **WHEN** a "file_uploaded" event is rendered
- **THEN** the card SHALL show the file name, file type, and a link to view/download the file

#### Scenario: Email sent card shows recipient
- **WHEN** an "email_sent" event is rendered
- **THEN** the card SHALL show the recipient email, subject line, and a preview of the body
