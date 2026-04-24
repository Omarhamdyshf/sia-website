# Spec: Email Compose

## ADDED Requirements

### Requirement: Compose Modal
The system SHALL provide an email compose modal accessible from organization detail and contact detail pages. The modal MUST include fields for: To (email address), Subject, Body (with basic rich text formatting), and optional file attachments.

#### Scenario: Open compose from contact detail
- **WHEN** the operator clicks "Send Email" on a contact detail page
- **THEN** the system SHALL open the compose modal with the To field pre-filled with the contact's email address

#### Scenario: Open compose from organization detail
- **WHEN** the operator clicks "Send Email" on an organization detail page
- **THEN** the system SHALL open the compose modal with the organization context available and the To field empty for manual entry

#### Scenario: Close modal without sending
- **WHEN** the operator closes the compose modal without sending
- **THEN** the system SHALL discard the draft and return to the previous view

### Requirement: Pre-filled Fields
The system SHALL pre-fill compose fields based on context. When opened from a contact, the To field MUST be pre-filled with the contact's email. The Subject field MAY be pre-filled based on the action context (e.g., "Follow-up: [Organization Name]").

#### Scenario: Pre-filled To from contact
- **WHEN** the compose modal opens from a contact with email "user@example.com"
- **THEN** the To field SHALL contain "user@example.com"

#### Scenario: Pre-filled subject from context
- **WHEN** the compose modal opens from an organization named "Acme Corp"
- **THEN** the Subject field SHALL be pre-filled with "Follow-up: Acme Corp" which the operator can edit

### Requirement: File Attachments
The system SHALL allow the operator to attach files to the email. The operator MUST be able to select from previously uploaded files on the organization or attach new files from the local filesystem.

#### Scenario: Attach existing file
- **WHEN** the operator clicks "Attach File" and selects a file from the organization's uploaded files
- **THEN** the system SHALL generate an R2 presigned URL for the file and add it to the email attachments list

#### Scenario: Attach new file
- **WHEN** the operator clicks "Attach File" and uploads a new file from their filesystem
- **THEN** the system SHALL upload the file to R2, generate a presigned URL, and add it to the email attachments list

#### Scenario: Remove attachment
- **WHEN** the operator clicks the remove icon on an attachment
- **THEN** the system SHALL remove that file from the attachments list

### Requirement: Email Sending with react-email Templates
The system SHALL send the composed email via the configured email service provider. The system MUST use react-email for email template rendering. The send action SHALL be asynchronous with loading state feedback. All success and error notifications MUST go through the refine notification provider (sonner).

#### Scenario: Successful send
- **WHEN** the operator clicks "Send" with valid To, Subject, and Body fields
- **THEN** the system SHALL send the email using a react-email template, display a success toast via refine notification provider (sonner), and close the compose modal

#### Scenario: Send with missing required fields
- **WHEN** the operator clicks "Send" without a To address or Subject
- **THEN** the system SHALL display validation errors and prevent sending

#### Scenario: Send failure
- **WHEN** the email service returns an error
- **THEN** the system SHALL display an error toast via refine notification provider (sonner) with the failure reason and keep the compose modal open for retry

### Requirement: Activity Log Entry on Send via Refine Data Provider
The system SHALL log every sent email as an activity-event refine resource on the linked organization's timeline via the refine data provider. The event MUST include the recipient, subject, and a body preview in the metadata.

#### Scenario: Sent email logged
- **WHEN** an email is successfully sent to a contact belonging to an organization
- **THEN** the system SHALL create an activity-event resource of type "email_sent" via the refine data provider with recipient, subject, and body preview in metadata

#### Scenario: Email without organization link
- **WHEN** an email is sent to a contact not linked to any organization
- **THEN** the system SHALL log the event but not attach it to any organization timeline
