# Organization Registry Spec Delta

## ADDED Requirements

### Requirement: Organization List Table
The system SHALL display all organizations in a searchable, filterable, sortable data table using refine `useTable` for the data layer and shadcn-admin table UI components for rendering.

#### Scenario: View organization list
- **WHEN** Omar navigates to the Organizations page
- **THEN** the system displays a data table with columns: Name, Type, Country, Status, Contacts count, Files count, and Updated date, powered by refine `useTable`

#### Scenario: Filter by type and status
- **WHEN** Omar selects filter values for type, status, or country
- **THEN** the refine `useTable` filter parameters update and the table shows only matching organizations

#### Scenario: Sort by column
- **WHEN** Omar clicks a sortable column header
- **THEN** the refine `useTable` sorter updates and the table re-sorts by that column, toggling between ascending and descending

#### Scenario: Search within table
- **WHEN** Omar types in the table search input
- **THEN** the refine `useTable` filters update to match organizations whose name or description contains the search text

#### Scenario: Pagination
- **WHEN** the organization count exceeds the page size
- **THEN** the refine `useTable` pagination controls appear and Omar can navigate between pages

### Requirement: Create Organization
The system SHALL allow creating a new organization via a slide-over panel using `@refinedev/react-hook-form` `useForm`.

#### Scenario: Open create form
- **WHEN** Omar clicks the "New Organization" button on the organization list page
- **THEN** a slide-over panel opens with an empty organization form backed by refine `useForm` in create mode

#### Scenario: Submit valid organization
- **WHEN** Omar fills in the required fields (name, type, status) and submits the form
- **THEN** the refine `useForm` calls the data provider's `create` method, closes the panel, and the new organization appears in the table

#### Scenario: Validation errors
- **WHEN** Omar submits the form with missing required fields or invalid data
- **THEN** Zod validation integrated with `@refinedev/react-hook-form` displays inline field-level errors and prevents submission

### Requirement: Edit Organization
The system SHALL allow editing an existing organization via the same slide-over panel using `@refinedev/react-hook-form` `useForm`.

#### Scenario: Open edit form
- **WHEN** Omar clicks the edit action on an organization row
- **THEN** the slide-over panel opens with refine `useForm` in edit mode, pre-populated with that organization's data fetched via the data provider

#### Scenario: Save changes
- **WHEN** Omar modifies fields and submits the edit form
- **THEN** the refine `useForm` calls the data provider's `update` method and reflects the changes in the table

### Requirement: Delete Organization
The system SHALL allow deleting an organization with confirmation.

#### Scenario: Delete with confirmation
- **WHEN** Omar clicks the delete action on an organization row and confirms the deletion
- **THEN** the system calls the refine data provider's `deleteOne` method and the organization disappears from the table

### Requirement: Organization Detail Page
The system SHALL display a detail page for each organization with tabbed sections, fetching data via refine `useOne`.

#### Scenario: Navigate to detail page
- **WHEN** Omar clicks an organization name in the table
- **THEN** the system navigates to the organization detail page showing tabs: Overview, Contacts, Files, Notes, Activity

#### Scenario: Overview tab
- **WHEN** Omar views the Overview tab
- **THEN** the system displays the organization's name, type, country, website, description, status, and tags fetched via refine `useOne`

### Requirement: Contacts Management
The system SHALL allow adding, editing, and removing contacts on an organization. Contacts are stored as Mujarrad nodes linked to the organization via the refine data provider.

#### Scenario: Add contact inline
- **WHEN** Omar clicks "Add Contact" on the create/edit form or the Contacts tab
- **THEN** a new contact row appears with fields for first name, last name, email, phone, and role

#### Scenario: Remove contact
- **WHEN** Omar clicks the remove button on a contact row
- **THEN** the contact row is removed from the form (and deleted via the data provider on save)

#### Scenario: View contacts tab
- **WHEN** Omar views the Contacts tab on the organization detail page
- **THEN** the system lists all contacts associated with that organization via refine `useList` filtered by organization ID

### Requirement: Notes Management
The system SHALL allow adding and viewing notes on an organization via the refine data provider.

#### Scenario: Add a note
- **WHEN** Omar types a note in the Notes tab text input and submits
- **THEN** the refine data provider's `create` method persists the note and it appears in the notes list with a timestamp

#### Scenario: View notes
- **WHEN** Omar views the Notes tab on the organization detail page
- **THEN** the system displays all notes for that organization in reverse chronological order via refine `useList`

### Requirement: Data Validation
The system MUST validate all organization and contact data using Zod schemas integrated with `@refinedev/react-hook-form` before submission.

#### Scenario: Organization schema validation
- **WHEN** the form data does not match the Organization Zod schema
- **THEN** the system displays field-level error messages and prevents submission

#### Scenario: Contact schema validation
- **WHEN** a contact row has invalid data (e.g., malformed email)
- **THEN** the system displays an inline error on that contact field and prevents form submission
