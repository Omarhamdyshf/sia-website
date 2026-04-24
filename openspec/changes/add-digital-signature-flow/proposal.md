# Change: Add Digital Signature Flow

## Why
Omar needs a DocuSign-like workflow so he can upload documents, place signature fields, send signing requests to contacts, and receive legally-captured signatures — all within the SIA Portal. Sprint 2 builds on top of Sprint 1's refine.dev foundation, treating signing requests, signature fields, and signers as first-class refine resources backed by Mujarrad nodes.

## What Changes
- Signing requests, signature fields, and signers defined as refine resources with full CRUD via the refine data provider (Mujarrad nodes as backend)
- PDF viewer component with in-browser rendering, page navigation, and zoom (react-pdf)
- Signature field placement via drag-and-drop on PDF pages (@dnd-kit overlays on react-pdf canvas)
- Signature capture supporting draw, type, and upload modes (react-signature-canvas wrapping signature_pad)
- Signing request creation and editing via `@refinedev/react-hook-form`
- Signing request list/table using refine `useTable` + shadcn-admin table UI
- Notifications (success, errors) through refine notification provider -> sonner
- Public signing page at `/sign/[token]` outside refine's `<Authenticated>` boundary (no auth, token-based access)
- Email integration for sending signing requests and reminders (react-email templates)
- PDF assembly: embed captured signatures into the final PDF server-side via pdf-lib (API route with atomic completion check); HTML-to-PDF conversion via Gotenberg (Docker sidecar)
- Status tracking via refine `useList` with filters
- Audit trail for signing events via refine audit log provider

## Impact
- Affected specs: `pdf-viewer`, `signature-capture`, `signing-workflow`, `non-functional`
- Affected code: `app/signing/`, `components/pdf-viewer/`, `components/signature-pad/`, `components/signature-field/`, `lib/pdf-assembly.ts`, `lib/signing-emails.ts`, `app/api/signing/`, `app/sign/[token]/`
- New refine resources: `signing-requests`, `signature-fields`, `signers`
- **5-phase methodology**: Tasks follow a strict Research → Design → Design Implementation → Design Testing → Implementation sequence to reduce rework
- **Non-functional requirements**: Added spec covering signature image quality, PDF coordinate accuracy, token security, public page rate limiting, large PDF performance, email deliverability, and design system consistency
- **Cloudflare R2**: All document storage (uploaded PDFs, captured signature images, assembled signed PDFs) uses Cloudflare R2
- **Activity event logging**: All signing events (request created, sent, viewed, signed, declined, completed) are logged to the activity system for full audit trail
- **Typesense indexing**: Signed/assembled PDFs stored in R2 are indexed into Typesense by the S1 ETL pipeline — signed document content is searchable via Cmd+K
- **Email notifications**: Five react-email templates via Resend: signing request, reminder, completion, decline, and cancellation. Bounce handling via Resend webhooks.
