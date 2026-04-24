# Non-Functional Requirements: Central Nervous System (Sprint 1)

## ADDED Requirements

### Requirement: Resumable File Upload

The system MUST support resumable, chunked file uploads via the tus protocol. Uploads up to 100MB MUST survive connection interruptions and resume from the last transferred chunk without restarting.

#### Scenario: Connection drop mid-upload resumes
- **WHEN** a user is uploading a 50MB file and the network connection drops at 60% progress
- **THEN** the upload pauses, and when the connection is restored, the upload resumes from the last transferred chunk without restarting from the beginning

#### Scenario: Auto-retry on transient failure
- **WHEN** a transient network error occurs during a chunk upload
- **THEN** the system automatically retries the failed chunk without user intervention

#### Scenario: Progress persists across page reload
- **WHEN** a user reloads the page during an active upload
- **THEN** the upload state is recoverable and the upload can resume from the last completed chunk

---

### Requirement: Upload Reliability

The system MUST automatically retry failed upload chunks without user intervention.

#### Scenario: Transient network error triggers automatic retry
- **WHEN** a chunk upload fails due to a transient network error
- **THEN** the system retries the chunk automatically within 5 seconds

#### Scenario: Retry succeeds after connection restored
- **WHEN** a retry is attempted after the network connection is restored
- **THEN** the chunk upload completes successfully and the overall upload continues

#### Scenario: Max retries exceeded shows error with manual retry option
- **WHEN** the maximum number of automatic retries is exceeded
- **THEN** the system displays an error message with a manual retry button

---

### Requirement: Responsive Layout

The system MUST render correctly on desktop (1280px+), tablet (768px-1279px), and mobile (320px-767px) viewports.

#### Scenario: Sidebar collapses on mobile
- **WHEN** the viewport width is below 768px
- **THEN** the sidebar collapses into a hamburger menu

#### Scenario: Tables scroll horizontally on narrow screens
- **WHEN** a data table is viewed on a viewport narrower than 768px
- **THEN** the table scrolls horizontally while keeping the first column visible

#### Scenario: Forms stack vertically on mobile
- **WHEN** a form is viewed on a viewport narrower than 768px
- **THEN** form fields stack vertically in a single column layout

---

### Requirement: Keyboard Accessibility

The system MUST support full keyboard navigation for all interactive elements.

#### Scenario: Tab through form fields
- **WHEN** a user presses Tab in a form
- **THEN** focus moves sequentially through all form fields in logical order

#### Scenario: Cmd+K opens search
- **WHEN** a user presses Cmd+K (or Ctrl+K) anywhere in the application
- **THEN** the command palette opens with the search input focused

#### Scenario: Arrow keys navigate table rows and search results
- **WHEN** a user presses arrow keys in a table or search results list
- **THEN** the selection moves in the corresponding direction

#### Scenario: Enter activates selection
- **WHEN** a user presses Enter on a focused item
- **THEN** the item is activated (navigated to, selected, or submitted)

#### Scenario: Escape closes modals and command palette
- **WHEN** a user presses Escape while a modal or command palette is open
- **THEN** the overlay closes and focus returns to the previous element

---

### Requirement: Dark Mode

The system MUST support light and dark themes with persisted preference.

#### Scenario: Toggle switches theme
- **WHEN** a user clicks the theme toggle
- **THEN** the entire application switches between light and dark themes immediately

#### Scenario: Preference persists across sessions
- **WHEN** a user selects dark mode and returns to the application later
- **THEN** the application loads in dark mode

#### Scenario: All pages render correctly in both themes
- **WHEN** any page is viewed in dark mode
- **THEN** all text is legible, contrast ratios meet WCAG AA, and no elements are invisible or unreadable

---

### Requirement: Loading States

The system MUST display loading skeletons during data fetching and disable submit buttons during mutations.

#### Scenario: Table shows skeleton while loading
- **WHEN** the organization list page is loading data
- **THEN** a skeleton placeholder matching the table layout is displayed

#### Scenario: Form submit button shows spinner during save
- **WHEN** a user submits a create or edit form
- **THEN** the submit button is disabled and shows a loading spinner until the mutation completes

#### Scenario: Error state shown if fetch fails
- **WHEN** a data fetch request fails
- **THEN** an error message is displayed with a retry option

---

### Requirement: Performance

The system MUST render the organization list page in under 2 seconds on a standard connection.

#### Scenario: Initial page load
- **WHEN** a user navigates to the organization list page for the first time
- **THEN** the page is fully interactive within 2 seconds

#### Scenario: Table re-render after filter change
- **WHEN** a user applies a filter on the organization list
- **THEN** the table re-renders with filtered results within 1 second

#### Scenario: Command palette opens within 200ms
- **WHEN** a user presses Cmd+K
- **THEN** the command palette is visible and ready for input within 200ms

---

### Requirement: Search Index Freshness

The Typesense search index MUST stay up to date, maintained by the local ETL process. When the ETL is running, indexing is near-continuous. Staleness equals ETL downtime — the process catches up immediately on reconnect, processing all pending files.

#### Scenario: ETL running — near-real-time indexing
- **WHEN** the local ETL process is running and a new file is uploaded
- **THEN** the file content SHALL be extracted and indexed in Typesense within minutes

#### Scenario: ETL offline — staleness equals downtime
- **WHEN** the local ETL machine is offline
- **THEN** the Typesense index remains searchable with existing data, and staleness equals the duration the ETL machine is offline — all pending uploads are processed immediately on reconnect

#### Scenario: ETL catch-up after downtime
- **WHEN** the local ETL machine comes back online after being offline
- **THEN** all pending uploads SHALL be processed and indexed without manual intervention

---

### Requirement: Design System Consistency

All integrated OSS components MUST be styled to match the SIA design system: Gold #C8A951, Charcoal #1C1C1E, Silver #C0C0C0, Playfair Display headings, Inter body, IBM Plex Arabic for RTL.

#### Scenario: Uppy upload area matches SIA colors
- **WHEN** the file upload area is rendered
- **THEN** it uses SIA design tokens for borders, buttons, and progress indicators

#### Scenario: shadcn-admin components use SIA tokens
- **WHEN** any shadcn-admin component is rendered
- **THEN** it uses the SIA color palette, typography, and spacing tokens

#### Scenario: Error pages follow SIA branding
- **WHEN** a 403, 404, or 500 error page is displayed
- **THEN** it follows SIA branding with correct colors, fonts, and logo placement
