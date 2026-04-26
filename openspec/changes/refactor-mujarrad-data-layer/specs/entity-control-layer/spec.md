# Spec: Entity Control Layer

## ADDED Requirements

### Requirement: Entity Registry as Single Source of Truth
The system SHALL maintain an entity registry that declares every SIA entity type, the Mujarrad node type it maps to (CONTEXT, REGULAR, or TEMPLATE), its required fields, and its relationship rules. The registry MUST be the single source of truth consulted by the control layer for all create, read, update, and delete operations. Adding a new entity type to SIA MUST require only adding an entry to the registry — no changes to the MujarradClient or the Refine adapter.

#### Scenario: Registry defines an Organization
- **WHEN** the entity registry is consulted for "organizations"
- **THEN** it SHALL return nodeType CONTEXT, titleField "name", required fields [name, type, status], and relationship rules declaring it contains contacts, files, notes, and activity-events

#### Scenario: Registry defines a Task
- **WHEN** the entity registry is consulted for "tasks"
- **THEN** it SHALL return nodeType REGULAR, titleField "title", required fields [title, dueDate, status, priority], and relationship rules declaring it relates_to organizations and contacts

#### Scenario: Registry defines an SLA Rule
- **WHEN** the entity registry is consulted for "sla-rules"
- **THEN** it SHALL return nodeType TEMPLATE, titleField "name", required fields [name, entityType, thresholdDays], and no relationship rules

### Requirement: Structure Enforcement on Create
The control layer SHALL enforce structure on every entity creation. It MUST look up the entity definition in the registry, validate that all required fields are present, create the Mujarrad node with the correct nodeType, and create Mujarrad attributes for any relationships specified in the variables. Relationship foreign key fields (e.g., organizationId) MUST NOT be stored in nodeDetails — they MUST be expressed as Mujarrad attributes.

#### Scenario: Create a contact under an organization
- **WHEN** the control layer creates a contact with variables `{ firstName: "John", lastName: "Smith", organizationId: "org-1" }`
- **THEN** it SHALL create a CONTEXT node with nodeDetails `{ firstName: "John", lastName: "Smith" }` (no organizationId), then create a `contains` attribute from "org-1" to the new contact node

#### Scenario: Create a task linked to an organization
- **WHEN** the control layer creates a task with variables `{ title: "Follow up", organizationId: "org-1" }`
- **THEN** it SHALL create a REGULAR node, then create a `relates_to` attribute from the task to "org-1"

#### Scenario: Create with missing required fields
- **WHEN** the control layer attempts to create an organization without a "name" field
- **THEN** it SHALL reject the operation with a validation error

#### Scenario: Create with correct nodeType
- **WHEN** the control layer creates any entity
- **THEN** the Mujarrad node MUST be created with the nodeType specified in the entity registry — Organizations as CONTEXT, Tasks as REGULAR, SLA Rules as TEMPLATE

### Requirement: Structure Reconstruction on Read
The control layer SHALL reconstruct structured entities on every read. It MUST fetch the Mujarrad node, read its attributes to discover relationships, and inject relationship IDs (e.g., organizationId) into the flattened record. The UI MUST receive the same record shape it receives today — the control layer adds the structure transparently.

#### Scenario: Read a contact with organization relationship
- **WHEN** the control layer reads a contact node that has a `contains` attribute from an organization
- **THEN** it SHALL return a record with `organizationId: "<org-node-id>"` injected from the attribute, so the UI sees the same field it expects

#### Scenario: Read a signature field with signing request relationship
- **WHEN** the control layer reads a signature field node that has a `contains` attribute from a signing request
- **THEN** it SHALL return a record with `signingRequestId: "<request-node-id>"` injected from the attribute

### Requirement: Parent-Scoped Listing via Traversal
The control layer SHALL detect when a list request includes a parent filter (e.g., `organizationId: "org-1"`) and use Mujarrad's `getDescendants()` to fetch only the children of that parent, then filter by entity type. When no parent filter is present, the control layer SHALL use `listNodes()` filtered by nodeType.

#### Scenario: List contacts for a specific organization
- **WHEN** the control layer lists contacts with filter `organizationId: "org-1"`
- **THEN** it SHALL call `getDescendants("org-1")`, filter the results to nodes matching the contact entity definition, and return the structured list

#### Scenario: List all tasks globally
- **WHEN** the control layer lists tasks with no parent filter
- **THEN** it SHALL call `listNodes()` and filter by nodeType REGULAR matching the task entity definition

### Requirement: Relationship Management on Update
The control layer SHALL detect when an update changes a relationship field and manage the corresponding Mujarrad attributes. It MUST delete the old attribute and create a new one when a parent reference changes.

#### Scenario: Reassign task to different organization
- **WHEN** the control layer updates a task, changing organizationId from "org-1" to "org-2"
- **THEN** it SHALL delete the `relates_to` attribute pointing to "org-1" and create a new `relates_to` attribute pointing to "org-2"

### Requirement: Cleanup on Delete
The control layer SHALL clean up outgoing attributes before deleting an entity node.

#### Scenario: Delete a contact
- **WHEN** the control layer deletes a contact
- **THEN** it SHALL remove any attributes where the contact is a source or target, then delete the contact node

### Requirement: Fallback if Attributes Unavailable
If Mujarrad's attribute API is not functional (to be verified in Phase 1), the control layer SHALL fall back to managing relationships via conventions in nodeDetails (e.g., storing `organizationId` in nodeDetails). The control layer MUST still enforce structure — it just uses a different storage mechanism for relationships. The entity registry and validation logic remain the same regardless of which mechanism is used.

#### Scenario: Attribute API unavailable
- **WHEN** the control layer detects that Mujarrad's attribute endpoints return errors
- **THEN** it SHALL store relationship references in nodeDetails using the FK field convention, while still enforcing the entity registry's relationship rules and required fields
