# Global Search Spec Delta

## ADDED Requirements

### Requirement: Command Palette Trigger
The system SHALL open a global search command palette (cmdk from shadcn-admin) when the user presses Cmd+K (or Ctrl+K on non-Mac).

#### Scenario: Open via keyboard shortcut
- **WHEN** Omar presses Cmd+K from any authenticated page
- **THEN** the shadcn-admin cmdk command palette appears with a focused search input

#### Scenario: Open via sidebar button
- **WHEN** Omar clicks the search entry in the sidebar navigation
- **THEN** the command palette opens identically to the keyboard shortcut

#### Scenario: Close command palette
- **WHEN** Omar presses Escape or clicks outside the command palette
- **THEN** the command palette closes

### Requirement: Full-Text Search via Typesense
The system SHALL search across organizations, contacts, and file contents by querying Typesense. Organization names/descriptions, contact names/emails, and extracted file text content are all indexed in Typesense. Search results SHALL include typo tolerance and relevance ranking. Search results SHALL be limited to 5 results per collection (organizations, contacts, files) for a maximum of 15 results in the command palette.

#### Scenario: Search with results
- **WHEN** Omar types a query into the command palette search input
- **THEN** the system queries Typesense across all indexed collections (organizations, contacts, files) and displays matching results grouped by category with relevance ranking

#### Scenario: Search file contents
- **WHEN** Omar types a query that matches text inside an uploaded PDF or document
- **THEN** the system returns the matching file with a snippet of the matched content highlighted

#### Scenario: Typo-tolerant search
- **WHEN** Omar types a query with a minor typo (e.g., "organzation" instead of "organization")
- **THEN** the system returns relevant results via Typesense's built-in typo tolerance

#### Scenario: No results
- **WHEN** Omar types a query that matches nothing in Typesense
- **THEN** the system displays an empty state message

#### Scenario: Debounced search
- **WHEN** Omar types rapidly in the search input
- **THEN** the system debounces requests to Typesense to avoid excessive API calls

#### Scenario: Result limit per category
- **WHEN** a search query matches more than 5 items in any category
- **THEN** the system displays the top 5 most relevant results per category with a total maximum of 15 results

### Requirement: Grouped Results Display
The system SHALL display search results grouped by entity type with clear section headers.

#### Scenario: Result grouping
- **WHEN** search results include matches across multiple entity types
- **THEN** results appear under section headers (Organizations, Contacts, Files) with the most relevant matches first

### Requirement: Keyboard Navigation
The system SHALL support full keyboard navigation within the cmdk command palette.

#### Scenario: Navigate results with arrow keys
- **WHEN** Omar presses the up/down arrow keys in the command palette
- **THEN** the selection highlight moves between results

#### Scenario: Select result with Enter
- **WHEN** Omar presses Enter on a highlighted result
- **THEN** the system navigates to that entity's detail page and closes the command palette

### Requirement: Navigate to Entity on Selection
The system SHALL navigate to the appropriate detail page when a search result is selected.

#### Scenario: Select an organization result
- **WHEN** Omar selects an organization from the search results
- **THEN** the system navigates to that organization's detail page

#### Scenario: Select a contact result
- **WHEN** Omar selects a contact from the search results
- **THEN** the system navigates to the parent organization's detail page with the Contacts tab active

#### Scenario: Select a file result
- **WHEN** Omar selects a file from the search results
- **THEN** the system navigates to the parent organization's detail page with the Files tab active
