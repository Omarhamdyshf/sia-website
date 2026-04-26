# Design: Refactor Mujarrad Data Layer

## Context

Mujarrad is a knowledge-based architecture — an "everything is a node" system that is intentionally loose. It does not enforce entity types, relationships, or data consistency. That is by design. The structure must come from the application.

The current SIA portal has no application-level structure enforcement. The `mujarradDataProvider` is a raw pipe: it stores data in Mujarrad nodes with a `_resourceType` string tag, and retrieves data by fetching ALL nodes and filtering by that tag. There is no entity definition, no relationship management, no validation. The ERD exists only in design documents — it is not expressed in code.

The Mujarrad CLI example application (`mujarrad-cli/task-manager-tutorial`) demonstrates the correct approach: the application defines its own entities and relationships (schema.ts), communicates with Mujarrad through a typed client (client.ts), and maintains structure through application logic (seed.ts, demo.ts).

## Goals

- Build an entity control layer — application logic that defines, enforces, and maintains the structure of SIA entities on top of Mujarrad's loose storage
- Establish `MujarradClient` as the typed API communication layer, following the task-manager-tutorial pattern
- Replace the raw "dump and filter" data provider with a structured pipeline: Refine adapter → entity control layer → MujarradClient → Mujarrad API
- Preserve the Refine DataProvider interface so UI components remain unchanged

## Non-Goals

- Changing UI components or Refine hooks usage (the adapter preserves the same interface)
- Implementing S4 pipeline module (this change only establishes the data layer it requires)
- Making Mujarrad enforce structure (that is the application's job, not Mujarrad's)
- Multi-user or multi-space architecture (single admin, single space for now)

## Decisions

### Architecture: Three-Layer Stack

```
┌─────────────────────────────────────────────────┐
│  Refine DataProvider Adapter                     │
│  (Thin — maps Refine interface to control layer) │
├─────────────────────────────────────────────────┤
│  Entity Control Layer                            │
│  (The backend logic — defines entities,          │
│   enforces relationships, validates structure,   │
│   maintains consistency on every read/write)     │
├─────────────────────────────────────────────────┤
│  MujarradClient                                  │
│  (API transport — typed HTTP calls to Mujarrad,  │
│   auth, response parsing, error handling)        │
├─────────────────────────────────────────────────┤
│  Mujarrad (knowledge-based storage)              │
│  (Loose, flexible, does not enforce structure)   │
└─────────────────────────────────────────────────┘
```

**Why three layers**: The current implementation collapses everything into one file — HTTP calls, auth, normalization, filtering, business logic. Separating transport (MujarradClient), logic (entity control layer), and interface (Refine adapter) makes each layer testable and replaceable. Most importantly, the entity control layer is where ALL structure enforcement lives — it is the piece that is entirely missing today.

### MujarradClient — API Transport

**Decision**: Create a `MujarradClient` class at `lib/mujarrad-client.ts` mirroring `mujarrad-cli/task-manager-tutorial/src/client.ts`.

**Why**: The example app proves this pattern works. It cleanly separates HTTP concerns, auth, and response parsing from application logic.

**Interface**:
```typescript
class MujarradClient {
  constructor(config: { apiUrl: string; auth: ApiKeyAuth | JwtAuth; spaceSlug: string })

  // Node CRUD
  createNode<T>(title: string, nodeType: NodeType, nodeDetails: T): Promise<MujarradNode<T>>
  getNode<T>(nodeId: string): Promise<MujarradNode<T>>
  listNodes<T>(filters?: { nodeType?: NodeType }): Promise<MujarradNode<T>[]>
  updateNode<T>(nodeId: string, updates: Partial<MujarradNode<T>>): Promise<MujarradNode<T>>
  deleteNode(nodeId: string): Promise<void>

  // Attributes (Relationships)
  createAttribute(sourceId: string, targetId: string, name: string, metadata?: Record<string, any>): Promise<MujarradAttribute>
  getAttributes(nodeId: string): Promise<MujarradAttribute[]>
  deleteAttribute(attributeId: string): Promise<void>

  // Traversal
  getAncestors<T>(nodeId: string): Promise<MujarradNode<T>[]>
  getDescendants<T>(nodeId: string): Promise<MujarradNode<T>[]>
}
```

**Auth**: Support both API key pair (`X-API-Key` / `X-API-Secret`) and JWT bearer token. API key auth is the pattern used in the example app. JWT remains as fallback for user-facing auth flows.

### Entity Control Layer — Application Structure Logic

**Decision**: Create an entity control layer at `lib/entity-control-layer.ts` with an entity registry at `lib/entity-registry.ts`.

**Why**: This is the missing piece. Mujarrad is loose by design. The application must act like a backend engineer — defining entities, enforcing rules, and maintaining structure. Without this layer, data degrades over time because nothing prevents inconsistency.

**Entity registry** — the single source of truth for SIA's data model:

```typescript
const ENTITY_REGISTRY = {
  organizations: {
    nodeType: 'CONTEXT',
    titleField: 'name',
    requiredFields: ['name', 'type', 'status'],
    relationships: {
      contacts: { type: 'contains', direction: 'outgoing' },
      files: { type: 'contains', direction: 'outgoing' },
      notes: { type: 'contains', direction: 'outgoing' },
      'activity-events': { type: 'contains', direction: 'outgoing' },
    },
  },
  contacts: {
    nodeType: 'CONTEXT',
    titleField: 'firstName',
    requiredFields: ['firstName', 'lastName'],
    relationships: {
      organizations: { type: 'contains', direction: 'incoming' },
    },
  },
  tasks: {
    nodeType: 'REGULAR',
    titleField: 'title',
    requiredFields: ['title', 'dueDate', 'status', 'priority'],
    relationships: {
      organizations: { type: 'relates_to', direction: 'outgoing' },
      contacts: { type: 'relates_to', direction: 'outgoing' },
    },
  },
  files: {
    nodeType: 'REGULAR',
    titleField: 'name',
    requiredFields: ['name', 'mimeType', 'r2ObjectKey'],
    relationships: {
      organizations: { type: 'contains', direction: 'incoming' },
    },
  },
  notes: {
    nodeType: 'REGULAR',
    titleField: 'content',
    requiredFields: ['content'],
    relationships: {
      organizations: { type: 'contains', direction: 'incoming' },
    },
  },
  'signing-requests': {
    nodeType: 'REGULAR',
    titleField: 'title',
    requiredFields: ['title', 'status', 'pdfUrl'],
    relationships: {
      'signature-fields': { type: 'contains', direction: 'outgoing' },
      signers: { type: 'contains', direction: 'outgoing' },
    },
  },
  'signature-fields': {
    nodeType: 'REGULAR',
    titleField: 'page',
    requiredFields: ['signingRequestId', 'page', 'xPct', 'yPct'],
    relationships: {
      'signing-requests': { type: 'contains', direction: 'incoming' },
      signers: { type: 'assigned_to', direction: 'outgoing' },
    },
  },
  signers: {
    nodeType: 'REGULAR',
    titleField: 'name',
    requiredFields: ['name', 'email', 'status'],
    relationships: {
      'signing-requests': { type: 'contains', direction: 'incoming' },
    },
  },
  'activity-events': {
    nodeType: 'REGULAR',
    titleField: 'action',
    requiredFields: ['action', 'entityType', 'entityId'],
    relationships: {
      organizations: { type: 'contains', direction: 'incoming' },
    },
  },
  'sla-rules': {
    nodeType: 'TEMPLATE',
    titleField: 'name',
    requiredFields: ['name', 'entityType', 'thresholdDays'],
    relationships: {},
  },
  alerts: {
    nodeType: 'REGULAR',
    titleField: 'title',
    requiredFields: ['type', 'title', 'message'],
    relationships: {},
  },
  users: {
    nodeType: 'CONTEXT',
    titleField: 'name',
    requiredFields: ['email', 'name', 'role'],
    relationships: {},
  },
};
```

**Control layer operations** — what the layer does on each action:

| Operation | What the control layer does |
|---|---|
| **Create entity** | 1. Look up entity definition in registry. 2. Validate required fields. 3. Call `client.createNode()` with the correct nodeType. 4. For each relationship field in the variables (e.g., `organizationId`), call `client.createAttribute()` to create the relationship. 5. Remove relationship FK fields from nodeDetails (they live as attributes, not data). 6. Return the structured entity. |
| **Read entity** | 1. Call `client.getNode()`. 2. Call `client.getAttributes()` to read the node's relationships. 3. Reconstruct the full entity by injecting relationship IDs (e.g., `organizationId`) from attributes into the record. 4. Return the structured entity. |
| **List entities (global)** | 1. Call `client.listNodes()`. 2. Filter by nodeType matching the entity's registry definition. 3. For each node, resolve relationships from attributes. 4. Apply client-side filters, sort, paginate. 5. Return structured list. |
| **List entities (under parent)** | 1. Detect parent filter (e.g., `organizationId: "abc"`). 2. Call `client.getDescendants("abc")`. 3. Filter descendants by entity type. 4. Resolve relationships. 5. Return structured list. |
| **Update entity** | 1. Validate updated fields. 2. Call `client.updateNode()`. 3. If a relationship field changed, delete old attribute and create new one. 4. Return the structured entity. |
| **Delete entity** | 1. Clean up outgoing attributes. 2. Call `client.deleteNode()`. |

**Key principle**: The control layer is where ALL business logic about data structure lives. If tomorrow we add a new entity type or a new relationship, we add it to the registry and the control layer handles the rest. The MujarradClient doesn't change. The Refine adapter doesn't change.

### Node Type Mapping

| SIA Entity | Mujarrad NodeType | Why |
|---|---|---|
| Organization | CONTEXT | Identity entity — other entities relate to it, it is a reference point |
| Contact | CONTEXT | Identity entity — represents a person |
| User | CONTEXT | Identity entity — portal operator |
| Task | REGULAR | Data entity — work item with lifecycle |
| File | REGULAR | Data entity — uploaded document |
| Note | REGULAR | Data entity — internal text |
| ActivityEvent | REGULAR | Data entity — audit trail entry |
| SigningRequest | REGULAR | Data entity — signing workflow instance |
| SignatureField | REGULAR | Data entity — field position on PDF |
| Signer | REGULAR | Data entity — signing participant |
| Alert | REGULAR | Data entity — notification |
| SLARule | TEMPLATE | Blueprint — reusable configuration |

### Refine DataProvider Adapter

**Decision**: The adapter becomes a thin translation layer (~80-100 lines) that maps Refine's interface to entity control layer calls.

**Why**: Currently the provider is 250+ lines mixing HTTP, auth, normalization, and filtering. By pushing all logic into the control layer and transport into MujarradClient, the adapter has one job: translate Refine method signatures to control layer method calls.

```typescript
// Pseudo-code — the entire adapter
const dataProvider: DataProvider = {
  getList({ resource, filters, sorters, pagination }) {
    return entityLayer.listEntities(resource, { filters, sorters, pagination });
  },
  getOne({ resource, id }) {
    return entityLayer.getEntity(resource, id);
  },
  create({ resource, variables }) {
    return entityLayer.createEntity(resource, variables);
  },
  update({ resource, id, variables }) {
    return entityLayer.updateEntity(resource, id, variables);
  },
  deleteOne({ resource, id }) {
    return entityLayer.deleteEntity(resource, id);
  },
};
```

### Migration Strategy

**Decision**: Automated migration script + toggle rollback.

**Phase 1**: Create Mujarrad context types for all SIA entities (seeds the schema in Mujarrad).

**Phase 2**: Read all existing nodes in `sia-portal-platform`, re-type them (REGULAR→CONTEXT for orgs/contacts/users, REGULAR→TEMPLATE for SLA rules), and convert FK fields in nodeDetails into real Mujarrad attributes.

**Rollback**: `VITE_USE_MOCK=true` reverts to the localStorage mock provider. Safe to test incrementally.

### Authentication

**Decision**: Support both API key auth and JWT. Determine primary method in Phase 1 research.

The example app uses API key pairs. The current implementation uses JWT with email/password login. Phase 1 will verify which method is recommended for production and whether API key auth works for the SIA use case.

## Risks and Trade-offs

| Risk | Mitigation |
|------|------------|
| Mujarrad attribute API may not work as expected (example seed.ts skipped attribute creation) | Phase 1 verifies attribute CRUD against live API. If attributes don't work, control layer manages relationships via nodeDetails conventions as a fallback — but still enforces structure |
| `getDescendants()` may return mixed node types | Control layer filters by entity type after retrieval |
| Migration script may break existing data | Dry-run mode first, batch processing, mock provider as rollback |
| Existing UI code references `organizationId` directly | Control layer injects FK fields into normalized records from relationship data — backward compatible |
| Three layers adds complexity vs. current single file | Each layer is simple and testable in isolation. The complexity is in the current approach where everything is tangled together |

## Research Findings (Phase 1 — 2026-04-25)

### Resolved Questions

1. **Attribute CRUD**: Full CRUD works. Attribute endpoints are split across two URL patterns:
   - **Node-scoped** (create/list): `POST /nodes/{id}/attributes`, `GET /nodes/{id}/attributes`
   - **Top-level** (update/delete): `PUT /attributes/{id}`, `DELETE /attributes/{id}`
   - Initial testing used wrong URL for delete (`/nodes/{id}/attributes/{attrId}` → 500). Correct endpoint is `/attributes/{id}` → 204.
   - `attributeValue` must be an object, not a string.
   - **Implication**: Full attribute CRUD is available. Relationships can be stored as Mujarrad attributes. FK fields in nodeDetails kept for backward compatibility and fast reads; attributes provide the graph structure for traversal and future queries.

2. **Auth**: Both API key and JWT work. **Decision: API key auth for data provider** (simpler, no token refresh needed, matches official SDK pattern). JWT stays for user-facing auth flows.

3. **Descendants/Ancestors**: These endpoints are **UNRELIABLE**. Worked once in testing, returned empty arrays in 4+ subsequent tests with identical setup (different nodeTypes, attributeTypes, timing delays of 2s-8s). **Cannot depend on for parent-scoped listing.** The control layer uses `listNodes()` + client-side `_resourceType` filter for ALL listing, with FK fields in nodeDetails for parent-scoped filtering.

### Critical Discovery: Official Mujarrad SDK

An official SDK exists at `mujarrad-cli/packages/sdk/` with a mature `Mujarrad` class:
- Namespaced resources: `client.nodes`, `client.attributes`, `client.spaces`, `client.batch`
- Built-in retry with exponential backoff (3 attempts, respects Retry-After)
- Typed error classes: AuthenticationError, NotFoundError, ValidationError, RateLimitError, ServerError, NetworkError
- `withSchema()` + `createEntity()` for schema-validated creation
- `link()` convenience for attribute creation
- Batch upload support

**Decision**: Use the official SDK as the transport layer instead of building MujarradClient from scratch. This eliminates ~200 lines of HTTP boilerplate and gets us retry logic, typed errors, and batch operations for free.

### Revised Architecture

Given the findings, the three-layer architecture becomes:

```
┌─────────────────────────────────────────────────┐
│  Refine DataProvider Adapter                     │
│  (Thin — maps Refine interface to control layer) │
├─────────────────────────────────────────────────┤
│  Entity Control Layer + Registry                 │
│  (Defines entities, validates, manages FK fields │
│   in nodeDetails, enforces structure)            │
├─────────────────────────────────────────────────┤
│  Official Mujarrad SDK (Mujarrad class)          │
│  (Transport with retry, typed errors, batch)     │
├─────────────────────────────────────────────────┤
│  Mujarrad API                                    │
└─────────────────────────────────────────────────┘
```

**Key changes from original design**:
- Transport layer: Thin MujarradClient in-repo (SDK not published to npm) with API key auth, retry, typed errors
- Relationship strategy: FK fields in nodeDetails as PRIMARY storage (descendants unreliable, client-side filter is the only reliable path). Mujarrad attributes created as SUPPLEMENTARY graph edges (fire-and-forget) for future graph queries.
- All listing: `listNodes()` + client-side `_resourceType` filter. Parent-scoped filtering by FK field in nodeDetails (e.g., `organizationId === "org-1"`).
- Attribute operations: Fire-and-forget on create/update/delete. Not awaited, not depended on for reads.
