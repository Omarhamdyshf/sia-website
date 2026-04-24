# Spec: Signature Capture and Field Placement

## ADDED Requirements

### Requirement: Signature Field Placement via Drag-and-Drop
The system SHALL allow the user to place signature fields on any page of the PDF by dragging a new field onto the react-pdf viewer. The system SHALL use `@dnd-kit` for drag-and-drop interactions. Fields MUST be positioned as overlays on top of the rendered react-pdf canvas. On drop, the system MUST create a new `signature-fields` resource record via the refine data provider, persisting as a Mujarrad SignatureField node.

#### Scenario: Place a new signature field
- **WHEN** the user drags a signature field from the toolbar and drops it onto a location on the current PDF page
- **THEN** the system creates a new signature-fields resource via the refine data provider at the drop position, displayed as a visible overlay on the PDF

#### Scenario: Place fields on different pages
- **WHEN** the user navigates to a different page and places a signature field
- **THEN** the system creates the signature-fields resource associated with that page number, and the field is visible only when that page is displayed

### Requirement: Signature Field Positioning and Resizing
The system SHALL allow the user to reposition and resize placed signature fields via @dnd-kit. On move or resize, the system MUST update the `signature-fields` resource via the refine data provider. Field coordinates MUST be stored as percentages relative to page dimensions to ensure resolution independence.

#### Scenario: Move an existing field
- **WHEN** the user drags an existing signature field to a new position on the same page
- **THEN** the system updates the signature-fields resource coordinates via the refine data provider

#### Scenario: Resize a field
- **WHEN** the user drags a resize handle on a signature field
- **THEN** the system updates the signature-fields resource dimensions via the refine data provider

### Requirement: Signature Field Deletion
The system SHALL allow the user to delete a placed signature field. Deletion MUST go through the refine data provider, removing the Mujarrad SignatureField node.

#### Scenario: Delete a field
- **WHEN** the user selects a signature field and clicks the delete action
- **THEN** the system deletes the signature-fields resource via the refine data provider and removes the overlay from the page

### Requirement: Signer Assignment to Fields
The system SHALL allow the user to assign each signature field to a signer from the address book. The address book contacts MUST be fetched via refine `useList`. Each field MUST be assigned to exactly one signer before the signing request can be sent. Assignment MUST update the signature-fields resource via the refine data provider.

#### Scenario: Assign a signer to a field
- **WHEN** the user selects a signature field and chooses a contact from the signer assignment dropdown (populated via refine `useList` on contacts resource)
- **THEN** the system updates the signature-fields resource with the assigned signer via the refine data provider and updates the field display with the signer identity

#### Scenario: Visual differentiation by signer
- **WHEN** multiple fields are assigned to different signers
- **THEN** the system displays each signer's fields in a distinct color to visually differentiate them

#### Scenario: Attempt to send with unassigned fields
- **WHEN** the user attempts to send the signing request and one or more fields have no signer assigned
- **THEN** the system blocks sending and displays an error notification via refine notification provider -> sonner indicating which fields are unassigned

### Requirement: Signature Capture -- Draw Mode
The system SHALL provide a draw mode for signature capture using `react-signature-canvas` (wrapping `signature_pad`). The signer MUST be able to draw their signature using a mouse or touch input. The system SHALL output the drawn signature as a PNG image.

#### Scenario: Draw a signature
- **WHEN** the signer selects draw mode and draws their signature on the react-signature-canvas
- **THEN** the system displays the drawn signature in real-time on the canvas

#### Scenario: Clear and redraw
- **WHEN** the signer clicks the "Clear" button while in draw mode
- **THEN** the system clears the canvas and allows the signer to draw again

#### Scenario: Submit drawn signature
- **WHEN** the signer completes their drawn signature and clicks "Submit"
- **THEN** the system captures the canvas content as a PNG image and saves it as the signature for the assigned field

### Requirement: Signature Capture -- Type Mode
The system SHALL provide a type mode where the signer types their name and the system renders it as a signature-style image. The system MUST offer at least two font options.

#### Scenario: Type a signature
- **WHEN** the signer selects type mode and enters their name
- **THEN** the system renders the typed name in a signature-style font as a preview

#### Scenario: Select a font
- **WHEN** the signer selects a different font option
- **THEN** the system re-renders the typed name in the selected font

#### Scenario: Submit typed signature
- **WHEN** the signer confirms their typed signature and clicks "Submit"
- **THEN** the system converts the rendered text to a PNG image and saves it as the signature for the assigned field

### Requirement: Signature Capture -- Upload Mode
The system SHALL provide an upload mode where the signer uploads an image of their signature. The system MUST accept PNG and JPEG formats.

#### Scenario: Upload a signature image
- **WHEN** the signer selects upload mode and uploads a valid PNG or JPEG image
- **THEN** the system displays a preview of the uploaded image

#### Scenario: Upload an invalid file
- **WHEN** the signer uploads a file that is not a PNG or JPEG
- **THEN** the system rejects the upload and displays an error message

#### Scenario: Submit uploaded signature
- **WHEN** the signer confirms the uploaded signature image and clicks "Submit"
- **THEN** the system saves the uploaded image as the signature for the assigned field
