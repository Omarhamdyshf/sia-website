# Spec: PDF Viewer

## ADDED Requirements

### Requirement: PDF Upload for Signing via Refine Data Provider
The system SHALL allow the user to upload a PDF document when creating a signing request. The upload MUST go through the refine data provider, storing the file as a Mujarrad file node associated with the signing request resource. The system SHALL validate that the uploaded file is a valid PDF and MUST reject non-PDF files. For non-PDF documents (DOCX, XLSX, PPTX), the system SHALL convert them to PDF server-side via libreoffice-convert before storing.

#### Scenario: Upload a valid PDF
- **WHEN** the user selects a valid PDF file on the signing request creation form (`@refinedev/react-hook-form`)
- **THEN** the system uploads the file via the refine data provider, creates a file node in Mujarrad, associates it with the signing request resource, and displays the PDF in the viewer

#### Scenario: Upload a non-PDF document
- **WHEN** the user uploads a DOCX, XLSX, or PPTX file
- **THEN** the system converts it to PDF server-side via Gotenberg (Docker sidecar with Chromium/LibreOffice HTTP API), stores the converted PDF as a Mujarrad file node, and displays it in the viewer

#### Scenario: Upload an invalid file type
- **WHEN** the user selects an unsupported file type (e.g., .png, .txt)
- **THEN** the system rejects the upload and displays an error notification via refine notification provider -> sonner

#### Scenario: Upload an oversized file
- **WHEN** the user uploads a file that exceeds the configured maximum file size
- **THEN** the system rejects the upload and displays an error notification via refine notification provider -> sonner with the size limit

### Requirement: In-Browser PDF Rendering
The system SHALL render uploaded PDF documents in the browser using `react-pdf`. The system MUST render one page at a time as a canvas element. The system SHALL display the current page clearly and legibly.

#### Scenario: View a single-page PDF
- **WHEN** the user opens a signing request containing a single-page PDF
- **THEN** the system renders the page via react-pdf in the viewer and displays page indicator "1 / 1"

#### Scenario: View a multi-page PDF
- **WHEN** the user opens a signing request containing a multi-page PDF
- **THEN** the system renders the first page via react-pdf and displays page indicator "1 / N" where N is the total page count

### Requirement: Page Navigation
The system SHALL provide page navigation controls including previous page, next page, and direct page number input. The system MUST NOT allow navigation beyond the first or last page.

#### Scenario: Navigate to the next page
- **WHEN** the user clicks the "next page" control and the current page is not the last page
- **THEN** the system renders the next page and updates the page indicator

#### Scenario: Navigate to the previous page
- **WHEN** the user clicks the "previous page" control and the current page is not the first page
- **THEN** the system renders the previous page and updates the page indicator

#### Scenario: Navigate by page number input
- **WHEN** the user enters a valid page number in the page input field
- **THEN** the system renders the specified page and updates the page indicator

#### Scenario: Attempt to navigate past the last page
- **WHEN** the user clicks "next page" while on the last page
- **THEN** the "next page" control is disabled and the current page remains unchanged

#### Scenario: Attempt to navigate before the first page
- **WHEN** the user clicks "previous page" while on the first page
- **THEN** the "previous page" control is disabled and the current page remains unchanged

### Requirement: Zoom Controls
The system SHALL provide zoom controls including zoom in, zoom out, and fit-to-width. The system MUST maintain legibility at all supported zoom levels.

#### Scenario: Zoom in
- **WHEN** the user clicks the "zoom in" control
- **THEN** the system increases the rendering scale and re-renders the current page at the larger size

#### Scenario: Zoom out
- **WHEN** the user clicks the "zoom out" control
- **THEN** the system decreases the rendering scale and re-renders the current page at the smaller size

#### Scenario: Fit to width
- **WHEN** the user clicks the "fit to width" control
- **THEN** the system adjusts the rendering scale so the page width matches the viewer container width
