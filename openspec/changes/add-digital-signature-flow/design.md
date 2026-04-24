# Design: Digital Signature Flow

## Context
Sprint 2 (Weeks 3-4) adds a complete document signing workflow to the SIA Portal. This builds on top of Sprint 1's refine.dev foundation. All signing data models are refine resources backed by Mujarrad nodes. Data fetching, forms, tables, and notifications use refine primitives — unique signing-specific tools (react-pdf, pdf-lib, @dnd-kit, react-signature-canvas, react-email) integrate alongside refine without overlap.

## Goals
- Signing requests, signature fields, and signers as refine resources with CRUD via the refine data provider
- Full in-browser PDF viewing with page navigation and zoom (react-pdf)
- Drag-and-drop signature field placement on any page/position of a PDF (@dnd-kit overlays on react-pdf canvas)
- Multiple signature capture modes: draw, type, upload (react-signature-canvas wrapping signature_pad)
- Signing request forms via `@refinedev/react-hook-form`
- Signing request list/table via refine `useTable` + shadcn-admin table UI
- Token-based public signing page outside refine's `<Authenticated>` boundary
- PDF assembly embedding all signatures server-side via pdf-lib (API route with atomic completion check)
- HTML-to-PDF conversion via Gotenberg (Docker sidecar with Chromium HTTP API) for web-generated documents
- Email-based signing request delivery and reminders via react-email templates
- Status tracking via refine `useList` with status filters
- Audit trail of signing events via refine audit log provider
- Notifications (send success, errors) via refine notification provider -> sonner

## Non-Goals
- Multi-party sequential/ordered signing (all signers can sign in any order)
- Legal audit trail or compliance with specific e-signature regulations (eIDAS, ESIGN)
- Template management for reusable signature field layouts
- In-app notifications beyond sonner toasts (email for external communication)
- Mobile-optimized signing experience

## Decisions

### Signing Resources as Refine Resources
Signing requests, signature fields, and signers are defined as refine resources. Each maps to a Mujarrad node type. All CRUD operations go through the refine data provider — no raw React Query or direct API calls. This ensures consistent caching, optimistic updates, and integration with refine's audit log and notification providers.

### Forms: @refinedev/react-hook-form
Signing request create/edit forms use `@refinedev/react-hook-form`, which wires react-hook-form to the refine data provider. Field validation, submission, and error handling follow the same pattern as Sprint 1 forms.

### Tables: refine useTable + shadcn-admin
The signing request list page uses refine `useTable` for data fetching, pagination, sorting, and filtering. The UI layer uses shadcn-admin table components for rendering, matching the existing portal table pattern.

### Notifications: refine notification provider -> sonner
All success/error feedback (e.g., "Signing request sent", "Failed to send email") routes through refine's notification provider, which delegates to sonner toasts. No direct sonner calls.

### File Storage: Cloudflare R2
All document binaries (uploaded PDFs, converted PDFs from DOCX/XLSX/PPTX, and final signed PDFs) are stored in Cloudflare R2. Mujarrad nodes hold metadata and R2 object keys. Implementation details (presigned URLs vs backend proxy) decided at build time.

### PDF Rendering: wojtekmaj/react-pdf
React wrapper around PDF.js. Renders PDF pages as canvas elements. Supports page-by-page navigation and zoom. The PDF is uploaded via the refine data provider (file upload to Mujarrad) and rendered client-side.

### PDF Assembly: Hopding/pdf-lib
Pure JavaScript library for creating and modifying PDFs. PDF assembly runs server-side via an API route. When the last signer completes, the API route checks the signed field count atomically, assembles the PDF via pdf-lib, and stores the result in R2. If assembly is already in progress, the route returns HTTP 409. No native dependencies for pdf-lib itself.

### Signature Capture: szimek/signature_pad via react-signature-canvas
Canvas-based signature drawing. Supports draw mode natively. Type and upload modes are implemented as custom UI that produces an image passed to the same pipeline. Output is a PNG data URL stored as the signature image on the signature-field resource.

### Field Placement: @dnd-kit
Drag-and-drop library for React. Signature fields are draggable/resizable overlays positioned absolutely on top of the react-pdf canvas. Coordinates are stored as percentages relative to the page's CropBox (or MediaBox if no CropBox) in PDF points. At placement time, page dimensions are read from react-pdf's `onLoadSuccess` callback. At embedding time, dimensions are read from pdf-lib's `page.getSize()`. If CropBox differs from MediaBox, the offset is accounted for. Field CRUD (create on drop, update on move/resize, delete) goes through the refine data provider for the `signature-fields` resource.

### Email: react-email + Resend
react-email for templates: signing request, reminder, completion notification, decline notification, and cancellation notification. Tokens are cryptographically random, single-use per signer per document, stored as SHA-256 hashes in Mujarrad (raw tokens sent to signers via email only). Token comparison uses constant-time `crypto.timingSafeEqual`. Resend is the email delivery service with native react-email support. Resend bounce webhooks update signer status to `bounced`.

### Public Signing Page: Outside Authenticated Boundary
Route `/sign/[token]` lives outside refine's `<Authenticated>` wrapper. The token identifies the signer and signing request. The page loads the PDF, highlights assigned fields, and allows signing. On submission, the signature is saved via an API route (not through refine's auth-gated data provider). Rate limiting protects the public endpoint.

### Status Tracking: refine useList with Filters
The signing request dashboard uses `useList` with status filters to show requests by state (draft, sent, partially_signed, completed, declined, cancelled). When a signer declines, the entire request moves to `declined` status and remaining signers can no longer access the signing page. The sender is notified and can create a new request. Status badges and signer progress indicators use shadcn-admin UI components.

### Audit Trail: refine Audit Log Provider
Signing events (created, sent, viewed, signed, declined, cancelled, completed) are recorded via refine's audit log provider. Each event captures the actor (user or signer token), action, resource, and timestamp.

## Public Signing Page Architecture
- Route: `/sign/[token]`
- Outside refine's `<Authenticated>` component — no auth required
- The token identifies the signer and signing request via an API lookup
- The page loads the PDF, highlights the fields assigned to this signer, and allows signing
- On submission, the signature image is saved, the field and signer status are updated, and if all fields are signed the PDF is assembled
- Tokens expire when the signing request is cancelled or completed
- Rate limiting on the public endpoint to prevent abuse

## Risks and Trade-offs
- **Large PDF performance**: react-pdf renders one page at a time which mitigates memory issues, but very large documents (100+ pages) may still be slow. Mitigation: lazy page rendering.
- **Signature image quality**: Canvas-based signatures may appear pixelated when embedded in high-resolution PDFs. Mitigation: capture at 2x resolution.
- **Token security**: Token-only access means anyone with the link can sign. Mitigation: tokens are long (32+ chars), single-use, and expire.
- **PDF assembly concurrency**: If multiple signers submit simultaneously, assembly is server-side with atomic field count check — only triggers when all fields are signed. Returns HTTP 409 if assembly already in progress.
- **Email deliverability**: Signing request emails may land in spam. Mitigation: use verified domain sending via Resend with SPF/DKIM.
- **HTML-to-PDF conversion**: Gotenberg Docker sidecar handles conversion. Future: LibreOffice routes in Gotenberg can handle DOCX/XLSX/PPTX conversion when needed.
- **Public page outside refine**: The signing page cannot use refine hooks directly. Mitigation: API routes handle data access, and the page uses standard React for rendering.

## Open Questions
1. Should completed signing requests be archived automatically after a period?
