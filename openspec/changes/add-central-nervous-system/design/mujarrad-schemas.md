# Mujarrad Node Schemas & Typesense Collection Schemas

## Mujarrad Node Schemas

All nodes live in space `sia-portal`. Each node type maps to a Mujarrad context.

### Organization Node
- **Context**: `organizations`
- **Node type**: REGULAR
- **Attributes**: `name` (string, required), `type` (string, required), `status` (string, required), `country` (string), `website` (string), `description` (string), `tags` (string[])
- **Relationships**: `has_contact` → Contact[], `has_file` → FileRecord[], `has_note` → Note[], `has_activity` → ActivityEvent[]

### Contact Node
- **Context**: `contacts`
- **Node type**: REGULAR
- **Attributes**: `firstName` (string, required), `lastName` (string, required), `email` (string), `phone` (string), `role` (string)
- **Relationships**: `belongs_to` → Organization[]

### FileRecord Node
- **Context**: `files`
- **Node type**: REGULAR
- **Attributes**: `name` (string, required), `mimeType` (string, required), `size` (number, required), `r2ObjectKey` (string, required), `uploadedBy` (string, required)
- **Relationships**: `belongs_to` → Organization

### Note Node
- **Context**: `notes`
- **Node type**: REGULAR
- **Attributes**: `content` (string, required), `createdBy` (string, required)
- **Relationships**: `belongs_to` → Organization

### ActivityEvent Node
- **Context**: `activity-events`
- **Node type**: REGULAR
- **Attributes**: `action` (string, required), `entityType` (string, required), `entityId` (string, required), `entityName` (string), `details` (object), `performedBy` (string, required)
- **Relationships**: `belongs_to` → Organization

---

## Typesense Collection Schemas

### `organizations` Collection
```json
{
  "name": "organizations",
  "fields": [
    { "name": "id", "type": "string" },
    { "name": "name", "type": "string" },
    { "name": "type", "type": "string", "facet": true },
    { "name": "status", "type": "string", "facet": true },
    { "name": "country", "type": "string", "facet": true, "optional": true },
    { "name": "description", "type": "string", "optional": true },
    { "name": "tags", "type": "string[]", "facet": true, "optional": true },
    { "name": "created_at", "type": "int64", "sort": true }
  ],
  "default_sorting_field": "created_at"
}
```

### `contacts` Collection
```json
{
  "name": "contacts",
  "fields": [
    { "name": "id", "type": "string" },
    { "name": "first_name", "type": "string" },
    { "name": "last_name", "type": "string" },
    { "name": "full_name", "type": "string" },
    { "name": "email", "type": "string", "optional": true },
    { "name": "phone", "type": "string", "optional": true },
    { "name": "role", "type": "string", "optional": true },
    { "name": "organization_ids", "type": "string[]" },
    { "name": "created_at", "type": "int64", "sort": true }
  ],
  "default_sorting_field": "created_at"
}
```

### `files` Collection
```json
{
  "name": "files",
  "fields": [
    { "name": "id", "type": "string" },
    { "name": "file_name", "type": "string" },
    { "name": "organization_id", "type": "string", "facet": true },
    { "name": "file_type", "type": "string", "facet": true },
    { "name": "content", "type": "string" },
    { "name": "uploaded_at", "type": "int64", "sort": true }
  ],
  "default_sorting_field": "uploaded_at"
}
```

### Search Query Configuration
- **query_by** (organizations): `name,description,tags`
- **query_by** (contacts): `full_name,email,role`
- **query_by** (files): `content,file_name`
- **query_by_weights** (files): `content:1,file_name:2` (boost filename matches)
- **num_typos**: 2 (default)
- **per_page**: 5 (per collection, max 15 total in Cmd+K)
