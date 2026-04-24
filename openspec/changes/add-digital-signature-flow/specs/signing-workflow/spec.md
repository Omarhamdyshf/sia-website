# Spec: Signing Workflow

## ADDED Requirements

### Requirement: Signing Request Creation via Refine Form
The system SHALL allow the user to create a signing request using a form built with `@refinedev/react-hook-form`. The form MUST submit through the refine data provider, creating a `signing-requests` resource as a Mujarrad SigningRequest node. A new signing request MUST be created in `draft` status.

#### Scenario: Create a new signing request
- **WHEN** the user fills in the title and uploads a PDF on the signing request creation form (`@refinedev/react-hook-form`)
- **THEN** the system creates a signing-requests resource with status `draft` via the refine data provider, stores the PDF as a Mujarrad file node, and redirects to the field placement page

#### Scenario: Create form validation error
- **WHEN** the user submits the creation form with missing required fields
- **THEN** the system displays inline validation errors via react-hook-form and does not submit

### Requirement: Send Signing Request
The system SHALL allow the user to send a signing request after all signature fields have been assigned to signers. On send, the system MUST generate a unique cryptographic token for each signer, send an email to each signer via react-email templates, create `signers` resources via the refine data provider, update the signing-requests resource status to `sent`, and display a success notification via refine notification provider -> sonner. The event MUST be logged via refine audit log provider.

#### Scenario: Send a valid signing request
- **WHEN** the user clicks "Send for Signing" and all fields are assigned to signers
- **THEN** the system generates tokens for each signer, sends signing request emails via react-email, creates signers resources with status `pending` via the refine data provider, updates the signing-requests resource status to `sent`, shows a success toast via sonner, and logs the event via refine audit log provider

#### Scenario: Send with missing field assignments
- **WHEN** the user clicks "Send for Signing" and one or more fields are unassigned
- **THEN** the system blocks the action and displays an error notification via refine notification provider -> sonner listing the unassigned fields

### Requirement: Public Signing Page Outside Authenticated Boundary
The system SHALL provide a public page at `/sign/[token]` that lives outside refine's `<Authenticated>` component and requires no authentication. The page MUST validate the token via an API route, load the associated signing request and PDF, and display only the fields assigned to the signer identified by the token.

#### Scenario: Open a valid signing link
- **WHEN** a signer opens a valid, non-expired token link
- **THEN** the system displays the PDF via react-pdf with the signer's assigned fields highlighted and ready for signing

#### Scenario: Open an expired or invalid link
- **WHEN** a signer opens a link with an invalid, expired, or already-used token
- **THEN** the system displays an error page indicating the link is no longer valid

#### Scenario: Open a link for a cancelled request
- **WHEN** a signer opens a link for a signing request with status `cancelled`
- **THEN** the system displays a message that the signing request has been cancelled

### Requirement: Public Signing API Route
The system SHALL expose a server-side API route at `/api/sign/[token]` that handles signature submission from the public signing page. The route MUST validate the token, verify the signer status is `pending`, accept multipart signature image uploads, save signature images to Cloudflare R2, update the signature-fields resource status to `signed`, update the signers resource status to `signed` with a `signedAt` timestamp, check if all fields are signed to trigger PDF assembly, and log the signing event. The route operates outside refine's auth-gated data provider.

#### Scenario: Valid signature submission
- **WHEN** a signer submits signatures via POST to `/api/sign/[token]` with valid token and signature images
- **THEN** the API route saves signatures to R2, updates field and signer statuses, checks completion, and returns success

#### Scenario: Invalid or expired token
- **WHEN** a request hits `/api/sign/[token]` with an invalid or expired token
- **THEN** the API route returns HTTP 401 with an error message

#### Scenario: Signer already signed
- **WHEN** a signer submits to `/api/sign/[token]` but their status is already `signed`
- **THEN** the API route returns HTTP 409 indicating signing is already complete

### Requirement: Signer Submits Signature
The system SHALL allow a signer on the public signing page to sign their assigned fields using draw, type, or upload mode via react-signature-canvas. On submission, the system MUST save the signature image via an API route, update the signature-fields resource status to `signed`, update the signers resource status to `signed`, and log the event via the audit log.

#### Scenario: Signer signs all assigned fields
- **WHEN** a signer completes signatures for all their assigned fields and submits
- **THEN** the system saves each signature image, updates all signature-fields resource statuses to `signed`, updates the signers resource status to `signed` with a `signedAt` timestamp, logs the signing event, and displays a confirmation

#### Scenario: Signer has multiple fields
- **WHEN** a signer has multiple fields assigned across different pages
- **THEN** the system allows the signer to navigate between pages via react-pdf and sign each field individually before final submission

### Requirement: Signer Declines to Sign
The system SHALL allow a signer to decline signing. The system MUST update the signers resource status to `declined` and log the event via refine audit log provider.

#### Scenario: Signer declines
- **WHEN** a signer clicks "Decline" on the public signing page
- **THEN** the system updates the signers resource status to `declined`, logs the decline event, and displays a confirmation message

#### Scenario: Decline cascades to signing request
- **WHEN** a signer declines
- **THEN** the system updates the signing-requests resource status to `declined`, sends a decline notification email to the sender via react-email, and prevents remaining signers from accessing the signing page

### Requirement: Signing Request Status Tracking via Refine useList
The system SHALL track signing request status using refine `useList` with status filters. The status transitions MUST be: `draft` -> `sent` -> `partially_signed` -> `completed` | `declined` | `cancelled`. When a signer declines, the entire request moves to `declined`. The system SHALL display per-signer status on the request detail page. All status changes MUST be logged via refine audit log provider.

#### Scenario: First signer completes signing
- **WHEN** the first signer (of multiple) signs all their assigned fields
- **THEN** the system updates the signing-requests resource status to `partially_signed` via the refine data provider and logs the event

#### Scenario: All signers complete signing
- **WHEN** the last remaining signer signs all their assigned fields
- **THEN** the system updates the signing-requests resource status to `completed` via the refine data provider, triggers PDF assembly, and logs the event

#### Scenario: View signing progress
- **WHEN** the user opens the signing request detail page
- **THEN** the system displays each signer's name, email, status (pending/signed/declined), and signed-at timestamp if applicable, fetched via refine data hooks

### Requirement: Cancel Signing Request
The system SHALL allow the user to cancel a signing request that is in `sent` or `partially_signed` status. Cancellation MUST update the signing-requests resource status to `cancelled` via the refine data provider, invalidate all outstanding signer tokens, show a notification via sonner, and log the event via refine audit log provider.

#### Scenario: Cancel a sent request
- **WHEN** the user cancels a signing request in `sent` status
- **THEN** the system updates the signing-requests resource status to `cancelled`, invalidates all signer tokens, shows a success notification via sonner, logs the cancellation event, and pending signers can no longer access the signing page

### Requirement: Resend Signing Reminders
The system SHALL allow the user to resend a reminder email to any signer with `pending` status. The system MUST send the email via the react-email reminder template, update the `remindersSent` count and `lastReminderAt` timestamp on the signers resource via the refine data provider, and show a notification via sonner.

#### Scenario: Resend a reminder
- **WHEN** the user clicks "Resend Reminder" for a pending signer
- **THEN** the system sends a reminder email via react-email, increments `remindersSent` and updates `lastReminderAt` on the signers resource via the refine data provider, and shows a success notification via sonner

#### Scenario: Attempt to remind a completed signer
- **WHEN** the user attempts to send a reminder to a signer with status `signed` or `declined`
- **THEN** the system disables the reminder action for that signer

### Requirement: Signing Request Email via react-email
The system SHALL send a signing request email to each signer when the request is sent. The email MUST be built using react-email templates and include the document title, the signer's name, and a unique link to the signing page.

#### Scenario: Signer receives signing request email
- **WHEN** a signing request is sent
- **THEN** each signer receives an email (react-email template) containing the document title, a personalized greeting, and a unique signing link

### Requirement: Reminder Email via react-email
The system SHALL send a reminder email using the react-email reminder template. The email MUST include the document title and the signing link.

#### Scenario: Signer receives reminder email
- **WHEN** the user triggers a reminder for a pending signer
- **THEN** the signer receives a reminder email (react-email template) with the document title and their unique signing link

### Requirement: PDF Assembly with Embedded Signatures via pdf-lib
The system SHALL assemble the final signed PDF by embedding all signature images into the original PDF at the coordinates of their respective signature fields. The system MUST use `pdf-lib` for PDF modification server-side via an API route. The assembled PDF MUST be stored as a new file record via the refine data provider.

#### Scenario: Assemble a completed PDF
- **WHEN** all signature-fields resources in a signing request have status `signed`
- **THEN** the API route (server-side) checks the signed field count atomically, loads the original PDF, embeds each signature image at the correct page and coordinates using pdf-lib, saves the assembled PDF as a new file record via the refine data provider, and links it to the signing-requests resource; if assembly is already in progress the route returns HTTP 409

#### Scenario: Signature positioning accuracy
- **WHEN** the system embeds a signature into the PDF via pdf-lib
- **THEN** the signature image MUST appear at the same visual position and size as the signature field displayed during placement

### Requirement: Download Signed PDF
The system SHALL allow the user to download the assembled signed PDF for completed signing requests.

#### Scenario: Download a completed signed PDF
- **WHEN** the user clicks "Download" on a signing request with status `completed`
- **THEN** the system serves the assembled signed PDF file for download

#### Scenario: Attempt to download an incomplete request
- **WHEN** the user attempts to download a PDF for a signing request that is not `completed`
- **THEN** the system disables the download action and indicates signing is not yet complete

### Requirement: Rate Limiting on Public Signing Endpoint
The system SHALL apply rate limiting to the `/sign/[token]` endpoint to prevent abuse.

#### Scenario: Excessive requests to signing page
- **WHEN** a client makes more requests to the signing endpoint than the configured rate limit allows
- **THEN** the system returns an HTTP 429 response and blocks further requests until the rate limit window resets

### Requirement: Signing Request Dashboard via Refine useTable
The system SHALL display a list of all signing requests using refine `useTable` with shadcn-admin table UI. The table MUST show status, title, creation date, and number of signers. The table MUST support sorting by most recently updated and filtering by status. Status badges MUST visually indicate the current state.

#### Scenario: View the signing dashboard
- **WHEN** the user navigates to the signing requests page
- **THEN** the system displays all signing-requests resources via refine `useTable` with shadcn-admin table UI showing title, status badge, creation date, and signer count, sorted by most recently updated

#### Scenario: Filter by status
- **WHEN** the user selects a status filter (e.g., "sent", "completed")
- **THEN** the system filters the signing-requests table via refine `useList` filters and displays only matching requests

### Requirement: Audit Trail via Refine Audit Log Provider
The system SHALL log all significant signing events via refine's audit log provider. Events MUST include: signing request created, sent, viewed, signed, declined, cancelled, and completed. Each event MUST capture the actor, action, resource, and timestamp.

#### Scenario: Signing event is logged
- **WHEN** a signing event occurs (e.g., signer signs a field, request is sent, request is cancelled)
- **THEN** the system records the event via refine audit log provider with actor, action, resource identifier, and timestamp

#### Scenario: View audit trail
- **WHEN** the user opens the signing request detail page
- **THEN** the system displays a chronological list of audit events for that signing request

### Requirement: Completion Notification Email
The system SHALL send a completion email to the sender and all signers when all signatures are collected and the PDF is assembled.

#### Scenario: Completion email sent
- **WHEN** a signing request reaches `completed` status
- **THEN** the system sends a completion email via react-email + Resend to the sender and all signers with a link to download the signed PDF

### Requirement: Decline Notification Email
The system SHALL send a decline notification email to the sender when a signer declines.

#### Scenario: Decline notification sent
- **WHEN** a signer declines to sign
- **THEN** the system sends a decline email via react-email + Resend to the sender with the signer's name and the document title

### Requirement: Cancellation Notification Email
The system SHALL send a cancellation email to all pending signers when the sender cancels a signing request.

#### Scenario: Cancellation email sent
- **WHEN** the sender cancels a signing request
- **THEN** the system sends a cancellation email via react-email + Resend to all signers whose status is still `pending`

### Requirement: Email Bounce Handling
The system SHALL handle email bounces via Resend webhook events. When a signing request email bounces, the system MUST update the signer's status to `bounced` and display the bounce status in the signing request detail page.

#### Scenario: Email bounces
- **WHEN** Resend reports a bounce webhook for a signer's email
- **THEN** the system updates the signers resource status to `bounced` and displays the bounce indicator on the signing request detail page

#### Scenario: Resend reminder to bounced signer blocked
- **WHEN** the sender attempts to resend a reminder to a signer with `bounced` status
- **THEN** the system blocks the action and suggests updating the signer's email address
