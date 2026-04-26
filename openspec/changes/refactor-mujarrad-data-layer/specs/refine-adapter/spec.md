# Spec: Refine Data Provider Adapter

## ADDED Requirements

### Requirement: DataProvider Delegates to Entity Control Layer
The Refine DataProvider SHALL be a thin adapter that delegates all operations to the entity control layer. The provider SHALL NOT contain business logic, structure enforcement, HTTP calls, or normalization — all of that lives in the layers below. The provider's sole responsibility is translating Refine's DataProvider interface methods to entity control layer method calls.

#### Scenario: Provider delegates getList
- **WHEN** Refine calls `dataProvider.getList({ resource: "contacts", filters, sorters, pagination })`
- **THEN** the provider SHALL call `entityLayer.listEntities("contacts", { filters, sorters, pagination })` and return the result in Refine's expected format

#### Scenario: Provider delegates getOne
- **WHEN** Refine calls `dataProvider.getOne({ resource: "organizations", id: "abc" })`
- **THEN** the provider SHALL call `entityLayer.getEntity("organizations", "abc")` and return the result

#### Scenario: Provider delegates create
- **WHEN** Refine calls `dataProvider.create({ resource: "tasks", variables })`
- **THEN** the provider SHALL call `entityLayer.createEntity("tasks", variables)` and return the result

#### Scenario: Provider delegates update
- **WHEN** Refine calls `dataProvider.update({ resource: "tasks", id: "xyz", variables })`
- **THEN** the provider SHALL call `entityLayer.updateEntity("tasks", "xyz", variables)` and return the result

#### Scenario: Provider delegates deleteOne
- **WHEN** Refine calls `dataProvider.deleteOne({ resource: "tasks", id: "xyz" })`
- **THEN** the provider SHALL call `entityLayer.deleteEntity("tasks", "xyz")` and return the result

### Requirement: Backward-Compatible Record Shape
The adapter SHALL return records in the same shape that existing UI components expect. The entity control layer reconstructs structured entities (with relationship IDs injected from attributes), and the adapter passes them through. No UI component changes are required.

#### Scenario: Contact record includes organizationId
- **WHEN** the adapter returns a contact record
- **THEN** the record SHALL include `organizationId` as a top-level field (injected by the control layer from relationship data), maintaining the same shape the UI currently consumes

#### Scenario: Task record includes all expected fields
- **WHEN** the adapter returns a task record
- **THEN** the record SHALL include all nodeDetails fields flattened to top-level, plus `id`, `createdAt`, `updatedAt`, matching the current record shape
