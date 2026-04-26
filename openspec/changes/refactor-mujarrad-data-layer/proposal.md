# Change: Refactor Mujarrad Data Layer

## Why
Mujarrad is a knowledge-based architecture — an intentionally loose, "everything is a node" system. It stores nodes flexibly and does not enforce structure. **The application is responsible for maintaining structure.** The application's control layer must act like a backend engineer: defining entities, enforcing relationships, validating data on every read/write, and keeping things consistent over time — even though the underlying storage is loose.

The current `mujarradDataProvider` has no control layer. It is a raw pipe: nodes go in with a `_resourceType` string in nodeDetails, nodes come out, and nobody enforces anything. There is no entity definition. There is no relationship management. No validation that a contact actually belongs to an organization. Every `getList` call fetches ALL nodes in the entire space and filters client-side by a string tag. The ERD designed in Sprints 1-3 exists only on paper — it is not enforced anywhere in code.

The Mujarrad CLI example application (`mujarrad-cli/task-manager-tutorial`) demonstrates the correct approach: a typed `MujarradClient` that handles API communication, a schema definition that declares entities and their relationships, and application logic that maintains structure by using the right node types and creating real Mujarrad attributes when entities are related.

## What Changes

### 1. MujarradClient — API Communication Layer
- Create a typed `MujarradClient` class following the `mujarrad-cli/task-manager-tutorial/src/client.ts` pattern
- Encapsulates all HTTP communication with the Mujarrad API
- Node operations: `createNode()`, `getNode()`, `listNodes()`, `updateNode()`, `deleteNode()`
- Attribute operations: `createAttribute()`, `getAttributes()`, `deleteAttribute()`
- Traversal operations: `getAncestors()`, `getDescendants()`
- Space operations: `getSpaceBySlug()`, `createSpace()`
- Supports both API key auth (public/secret key pair) and JWT auth
- All methods are typed with generics (`MujarradNode<T>`, `MujarradAttribute`)
- This is NOT the control layer — it is the transport layer. It talks to Mujarrad. The control layer sits above it.

### 2. Entity Control Layer — The Application's Structure Enforcement
- Create a control layer that defines SIA's entities and the rules governing them
- **Entity registry**: declares each entity type (Organization, Contact, Task, File, etc.), which Mujarrad node type it maps to (CONTEXT/REGULAR/TEMPLATE), what fields it requires, and what relationships it participates in
- **Relationship rules**: declares that an Organization contains Contacts, contains Files, contains Notes; that a SigningRequest contains SignatureFields and Signers; that Tasks relate to Organizations — and enforces these rules on every create/update
- **Structure validation**: on create, validates the entity type is correct, required fields are present, and parent relationships are established. On read, reconstructs the structured entity from Mujarrad's loose nodes by reading attributes and resolving relationships
- **Consistency maintenance**: every read/write passes through this layer, which ensures the data going into Mujarrad is structured correctly and the data coming out is assembled into the entities the UI expects
- This is the backend logic that the current implementation is missing entirely

### 3. Refine DataProvider — Thin Adapter
- Rewrite `mujarradDataProvider` as a thin adapter that delegates to the entity control layer
- The provider maps Refine's interface (`getList`, `getOne`, `create`, `update`, `delete`) to control layer operations
- The provider itself has no business logic — it just translates between Refine's conventions and the control layer's entity operations
- Normalization still flattens nodeDetails into Refine-compatible records for UI consumption

### 4. Data Migration
- Migration script to convert existing flat nodes (everything stored as generic REGULAR with `_resourceType` string) into properly typed nodes (CONTEXT/REGULAR/TEMPLATE) with real Mujarrad attributes for relationships
- Existing `organizationId` foreign keys in nodeDetails become real `contains` attributes between nodes
- Rollback: `VITE_USE_MOCK=true` still works via mock provider

### 5. Remove Raw Patterns
- Remove `_resourceType` discriminator from nodeDetails — the entity control layer identifies entities by node type + entity registry
- Remove client-side "fetch ALL nodes then filter by string tag" pattern — the control layer queries specifically for what it needs
- Remove scattered foreign key fields from nodeDetails — relationships are managed as Mujarrad attributes by the control layer
- Remove raw `fetch()` calls from the data provider — all API communication goes through MujarradClient

## Impact
- Affected specs: `mujarrad-client` (NEW), `entity-control-layer` (NEW), `refine-adapter` (NEW)
- Affected code: `providers/mujarrad-data-provider.ts` (rewrite), `schemas.ts` (restructure), new `lib/mujarrad-client.ts`, new `lib/entity-control-layer.ts`, new `lib/entity-registry.ts`, new `scripts/migrate-to-structured.ts`
- **Prerequisite for S4**: The pipeline module requires structured entity management — configurable stages, checklists, hierarchies. These are entities with relationships that must be maintained by application logic, which does not exist today.
- **Non-breaking to UI**: The Refine DataProvider interface contract is preserved — components continue using `useList`, `useOne`, `useCreate`, etc. unchanged
- **5-phase methodology**: Research → Design → Design Implementation → Design Testing → Implementation
