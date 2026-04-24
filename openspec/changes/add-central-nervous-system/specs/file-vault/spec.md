# File Vault Spec Delta

## ADDED Requirements

### Requirement: Resumable File Upload via Uppy
The system SHALL allow uploading files to an organization via drag-and-drop or file picker using Uppy with the tus protocol for resumable, chunked uploads.

#### Scenario: Drag-and-drop upload
- **WHEN** Omar drags a file onto the Uppy upload area on the organization's Files tab
- **THEN** the system validates the file type and size, initiates a resumable tus upload to Cloudflare R2, and displays upload progress

#### Scenario: File picker upload
- **WHEN** Omar clicks the upload area and selects a file from the file picker dialog
- **THEN** the system validates and uploads the file identically to drag-and-drop

#### Scenario: Upload progress
- **WHEN** a file upload is in progress
- **THEN** the system displays a progress indicator showing upload percentage and bytes transferred

#### Scenario: Connection interruption during upload
- **WHEN** the network connection drops during a file upload
- **THEN** Uppy automatically retries and resumes the upload from the last successfully transferred chunk without restarting from zero

#### Scenario: Upload resumes after browser recovery
- **WHEN** Omar returns to the page after a connection failure
- **THEN** the system detects the incomplete upload and offers to resume it

### Requirement: File Type Restriction
The system MUST only accept PDF, DOCX, XLSX, and PPTX files for upload.

#### Scenario: Valid file type
- **WHEN** Omar uploads a file with a .pdf, .docx, .xlsx, or .pptx extension
- **THEN** the system accepts and processes the upload

#### Scenario: Invalid file type
- **WHEN** Omar attempts to upload a file with an unsupported extension
- **THEN** the system rejects the upload and displays a sonner error toast listing the accepted file types

### Requirement: File Size Limit
The system MUST reject files that exceed 100 MB.

#### Scenario: File exceeds size limit
- **WHEN** Omar attempts to upload a file larger than 100 MB
- **THEN** the system rejects the upload and displays a sonner error toast indicating the maximum allowed size

### Requirement: File Storage — Cloudflare R2 for Binaries, Mujarrad for Metadata
The system SHALL store file binaries in Cloudflare R2 and file metadata as Mujarrad nodes linked to the parent organization.

#### Scenario: File persisted
- **WHEN** a file upload completes successfully
- **THEN** the binary is stored in Cloudflare R2 and a FileRecord node is created in Mujarrad with name, mimeType, size, r2ObjectKey, organizationId, uploadedBy, and createdAt

#### Scenario: Upload success notification
- **WHEN** a file upload completes successfully
- **THEN** the refine notification provider triggers a sonner success toast confirming the upload

### Requirement: Text Extraction and Typesense Indexing via Local ETL
The system SHALL make all uploaded file content searchable via Typesense. Text extraction runs as a local ETL process using the Wider Tooling extraction pipeline (not on the server). The ETL process watches for new uploads in R2, pulls files, extracts text using a two-round strategy (Docling fast extraction, then OCR fallback for scanned documents), and indexes the extracted content into Typesense. The indexed document in Typesense SHALL include the extracted text, file name, file type, organization ID, and upload date. Data freshness SHALL be near-continuous when the ETL process is running, with a maximum staleness of 24 hours if the local machine is offline.

#### Scenario: Digital PDF extracted and indexed
- **WHEN** a digital PDF is uploaded and the ETL process is running
- **THEN** the Wider Tooling pipeline extracts text via Docling (Round 1) and indexes it into Typesense with file metadata

#### Scenario: Scanned PDF extracted via OCR fallback
- **WHEN** a scanned PDF is uploaded and Round 1 extracts insufficient text
- **THEN** the Wider Tooling pipeline triggers Round 2 (EasyOCR or vision model) to extract text and indexes it into Typesense

#### Scenario: DOCX/XLSX/PPTX extracted and indexed
- **WHEN** a DOCX, XLSX, or PPTX file is uploaded
- **THEN** the Wider Tooling pipeline extracts text via Docling and indexes it into Typesense

#### Scenario: Indexed content is searchable via Cmd+K
- **WHEN** Omar searches for text that exists inside an uploaded document
- **THEN** the Cmd+K command palette returns the file as a search result with a content snippet

#### Scenario: File deletion removes Typesense index entry
- **WHEN** Omar deletes a file
- **THEN** the Next.js API route calls Typesense's DELETE endpoint directly to remove the corresponding index entry

#### Scenario: ETL catches up after local machine comes online
- **WHEN** the local ETL machine was offline and comes back online
- **THEN** the pipeline processes all pending uploads and updates the Typesense index immediately

### Requirement: File Browser
The system SHALL display all files belonging to an organization in the Files tab using refine `useList` filtered by organization ID.

#### Scenario: View files
- **WHEN** Omar opens the Files tab on an organization detail page
- **THEN** the system lists all files with name, type, size, upload date, and action buttons, fetched via refine `useList`

### Requirement: File Download
The system SHALL allow downloading an uploaded file.

#### Scenario: Download file
- **WHEN** Omar clicks the download action on a file
- **THEN** the browser downloads the file from Cloudflare R2

### Requirement: File Delete
The system SHALL allow deleting an uploaded file via the refine data provider.

#### Scenario: Delete file
- **WHEN** Omar clicks the delete action on a file and confirms the deletion
- **THEN** the system deletes the file from R2 and removes the Mujarrad FileRecord node, and the file disappears from the list
