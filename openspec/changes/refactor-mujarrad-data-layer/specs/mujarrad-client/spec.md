# Spec: Mujarrad Client

## ADDED Requirements

### Requirement: Typed MujarradClient Class
The system SHALL provide a `MujarradClient` class that encapsulates all HTTP communication with the Mujarrad API, following the pattern established in `mujarrad-cli/task-manager-tutorial/src/client.ts`. The client MUST be the sole point of contact with the Mujarrad API — no other code in the portal SHALL make direct HTTP calls to Mujarrad endpoints. The client MUST support generic typing for node details (`MujarradNode<T>`). The client is a transport layer only — it does not enforce entity structure or business rules.

#### Scenario: Instantiate client with API key auth
- **WHEN** the application creates a MujarradClient with API public key, secret key, and space slug
- **THEN** the client SHALL configure all requests with `X-API-Key` and `X-API-Secret` headers targeting the specified space

#### Scenario: Instantiate client with JWT auth
- **WHEN** the application creates a MujarradClient with a JWT token and space slug
- **THEN** the client SHALL configure all requests with `Authorization: Bearer` header targeting the specified space

### Requirement: Node CRUD Operations
The client SHALL expose typed methods for creating, reading, updating, and deleting Mujarrad nodes. Each method MUST accept and return generically-typed node objects. The `createNode` method MUST require a `nodeType` parameter (`REGULAR`, `CONTEXT`, or `TEMPLATE`).

#### Scenario: Create a node with specific type
- **WHEN** the client calls `createNode("Acme Corp", "CONTEXT", { type: "partner", status: "active" })`
- **THEN** the Mujarrad API SHALL create a node with nodeType CONTEXT and the given nodeDetails, and the client SHALL return the created `MujarradNode<T>`

#### Scenario: Get a single node by ID
- **WHEN** the client calls `getNode(nodeId)`
- **THEN** the client SHALL return the full `MujarradNode<T>` with id, title, slug, nodeType, nodeDetails, timestamps

#### Scenario: List nodes with optional type filter
- **WHEN** the client calls `listNodes({ nodeType: "CONTEXT" })`
- **THEN** the client SHALL return all CONTEXT nodes in the space

#### Scenario: Update a node
- **WHEN** the client calls `updateNode(nodeId, updates)`
- **THEN** the Mujarrad API SHALL update the specified fields and the client SHALL return the updated node

#### Scenario: Delete a node
- **WHEN** the client calls `deleteNode(nodeId)`
- **THEN** the Mujarrad API SHALL remove the node

### Requirement: Attribute Operations
The client SHALL expose methods for creating, reading, and deleting Mujarrad attributes (relationships between nodes).

#### Scenario: Create an attribute
- **WHEN** the client calls `createAttribute(sourceId, targetId, "contains")`
- **THEN** the Mujarrad API SHALL create an attribute linking the source node to the target node

#### Scenario: Create an attribute with metadata
- **WHEN** the client calls `createAttribute(sourceId, targetId, "assigned_to", { role: "primary" })`
- **THEN** the Mujarrad API SHALL create the attribute with metadata in attributeValue

#### Scenario: Get all attributes for a node
- **WHEN** the client calls `getAttributes(nodeId)`
- **THEN** the client SHALL return all `MujarradAttribute` objects for that node

#### Scenario: Delete an attribute
- **WHEN** the client calls `deleteAttribute(attributeId)`
- **THEN** the Mujarrad API SHALL remove the attribute

### Requirement: Traversal Operations
The client SHALL expose methods for traversing Mujarrad's node hierarchy via ancestor and descendant queries.

#### Scenario: Get descendants of a node
- **WHEN** the client calls `getDescendants(nodeId)`
- **THEN** the client SHALL return all nodes connected as descendants of the given node

#### Scenario: Get ancestors of a node
- **WHEN** the client calls `getAncestors(nodeId)`
- **THEN** the client SHALL return all nodes connected as ancestors of the given node

### Requirement: Error Handling and Retry
The client SHALL handle API errors gracefully. On HTTP 401, the client MUST attempt to re-authenticate once before failing. All errors MUST be thrown as typed errors with the HTTP status and Mujarrad error message.

#### Scenario: Token expired during request
- **WHEN** a request returns HTTP 401
- **THEN** the client SHALL re-authenticate, retry the request once, and throw if the retry also fails
