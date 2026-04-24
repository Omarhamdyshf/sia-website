# Non-Functional Requirements: Digital Signature Flow

## ADDED Requirements

### Requirement: Signature Image Quality

The system MUST capture signatures at 2x canvas resolution to prevent pixelation when embedded in high-resolution PDFs.

#### Scenario: Retina display capture
- **WHEN** a signer draws a signature on a retina display
- **THEN** the captured image SHALL be rendered at 2x the visible canvas dimensions

#### Scenario: Embedded signature legibility
- **WHEN** a captured signature is embedded into a PDF
- **THEN** the signature MUST be legible at 100% zoom in any standard PDF viewer

### Requirement: PDF Coordinate Accuracy

The system MUST place signatures within 2px accuracy of the field position defined during placement.

#### Scenario: Field placement accuracy
- **WHEN** a signature field is placed at the top-right of page 2 during document preparation
- **THEN** the embedded signature MUST appear at the top-right of page 2 in the final PDF within 2px tolerance

#### Scenario: Multi-page accuracy
- **WHEN** a document has signature fields across multiple pages
- **THEN** each embedded signature MUST maintain 2px coordinate accuracy on every page

### Requirement: Token Security

Signing tokens MUST be cryptographically random (32+ characters), single-sign per signer per document (invalidated after signature submission, not after page view), and expire when the signing request is cancelled, completed, or declined. Tokens MUST be compared using constant-time comparison (`crypto.timingSafeEqual`). The system MUST store SHA-256 hashes of tokens in Mujarrad, not raw tokens, to prevent exposure in case of data leak.

#### Scenario: Valid token access
- **WHEN** a signer opens a signing link with a valid token
- **THEN** the system SHALL grant access to the signing page for that specific document and signer

#### Scenario: Expired token rejection
- **WHEN** a signer opens a signing link after the signing request has been cancelled or completed
- **THEN** the system MUST show an error page indicating the token is no longer valid

#### Scenario: Reuse prevention
- **WHEN** a signer attempts to reuse a token after already signing
- **THEN** the system MUST reject the token and show a confirmation that signing is already complete

#### Scenario: Token stored as hash
- **WHEN** a signing token is generated
- **THEN** the system stores only the SHA-256 hash of the token in Mujarrad and sends the raw token to the signer via email

### Requirement: Public Page Rate Limiting

The public signing endpoint MUST be rate-limited to prevent abuse.

#### Scenario: Normal signer access
- **WHEN** a signer accesses the public signing page at a normal rate
- **THEN** the system SHALL serve the page without restriction

#### Scenario: Rapid repeated access
- **WHEN** rapid repeated requests are made from the same IP address
- **THEN** the system MUST throttle requests and return a rate limit response

#### Scenario: Rate limit error display
- **WHEN** a signer is rate-limited
- **THEN** the system SHALL display a graceful error message asking them to try again shortly

### Requirement: Large PDF Performance

The system MUST handle PDFs up to 100 pages without UI freezing by rendering one page at a time with lazy loading.

#### Scenario: Initial load time
- **WHEN** a 50-page PDF is loaded in the viewer
- **THEN** the first page MUST render within 2 seconds

#### Scenario: Page navigation speed
- **WHEN** a user navigates to page 30 of a loaded PDF
- **THEN** the target page MUST render within 1 second

#### Scenario: Memory constraint
- **WHEN** a large PDF is open in the viewer
- **THEN** browser memory usage MUST stay below 500MB

### Requirement: Email Deliverability

Signing request emails MUST be sent from a verified domain to maximize inbox placement.

#### Scenario: Inbox placement
- **WHEN** a signing request email is sent to a Gmail or Outlook address
- **THEN** the email SHALL arrive in the primary inbox, not the spam folder

#### Scenario: Email authentication headers
- **WHEN** a signing request email is sent
- **THEN** the email MUST contain valid SPF and DKIM headers

### Requirement: Design System Consistency

All signing-specific components (PDF viewer, signature pad, field overlays, public signing page) MUST follow SIA design tokens (Gold #C8A951, Charcoal #1C1C1E, Silver #C0C0C0).

#### Scenario: Signature field styling
- **WHEN** a signature field is rendered on the PDF canvas
- **THEN** the field border MUST use SIA Gold (#C8A951)

#### Scenario: Public signing page branding
- **WHEN** a signer opens the public signing page
- **THEN** the page header MUST use SIA branding and design tokens

#### Scenario: Modal consistency
- **WHEN** the signature capture modal is displayed
- **THEN** the modal MUST follow shadcn/ui patterns consistent with the rest of the SIA Portal
