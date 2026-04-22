# Data Architect Audit

**Agent Hat:** Senior Data Architect
**Focus:** Data modeling, schema design, query patterns, data governance
**Thinking Style:** "Is the data model truthful? Does it protect its own integrity?"

---

## Verdict: HYBRID APPROACH REQUIRED

The pure node-attribute model is the Entity-Attribute-Value (EAV) anti-pattern. It works for flexible/user-defined content but is the wrong foundation for transactional business entities with strict integrity requirements. A hybrid approach is mandatory.

---

## 1. This IS the EAV Anti-Pattern

### The Pattern Match

Classic EAV: `(entity_id, attribute_name, attribute_value)`
Mujarrad:    `(source_node_id, attribute_name, attribute_value JSONB)`

The addition of `target_node_id` makes it graph-flavored EAV. The `context_types` add optional schema enforcement. But the core storage pattern is EAV.

### Known EAV Problems — All Apply Here

| Problem | How It Manifests in Mujarrad |
|---------|------------------------------|
| No column-level type safety | A MATCH's `match_score` in JSONB can be `"banana"` |
| No NOT NULL enforcement | PARTNER_PROFILE can lack required `sector_focus` |
| No UNIQUE constraints across attributes | Cannot enforce "one MATCH per org pair" at DB level |
| No FOREIGN KEY on attribute values | A `partner_a` JSONB reference has no real FK |
| Query complexity explosion | 12 JOINs where traditional needs 4 (see below) |
| ORM/tooling incompatibility | BI tools cannot introspect JSONB schemas |

### The "Two Organizations" Problem

**"A MATCH must have exactly TWO organization references"**

Traditional schema:
```sql
CREATE TABLE matches (
    partner_a_id UUID NOT NULL REFERENCES organizations(id),
    partner_b_id UUID NOT NULL REFERENCES organizations(id),
    CHECK (partner_a_id <> partner_b_id)
);
```

In Mujarrad: **Impossible at the database level.** Row-level triggers cannot enforce cross-row cardinality constraints on an EAV table without deferred checking.

### The Immutability Problem

**"SIGNATURE.document_hash is immutable"**

In Mujarrad, the hash is in JSONB. A trigger to prevent mutation must fire on **every single attribute update** across the entire system:

```sql
CREATE TRIGGER trg_immutable_hash
    BEFORE UPDATE ON attributes
    FOR EACH ROW
    EXECUTE FUNCTION prevent_hash_mutation();
```

At scale: thousands of attribute writes/second, all checking if they happen to be `document_hash`.

---

## 2. Query Complexity — The Full Horror

### The Real Query

**Requirement:** "Get all active relationships for Organization X, with current journey tier status and pending signature requests."

**Traditional schema: 4 JOINs**
```sql
SELECT r.*, jt.tier_name, jt.status, sr.id, sr.status
FROM relationships r
JOIN integration_journeys ij ON ij.relationship_id = r.id
JOIN journey_tiers jt ON jt.journey_id = ij.id AND jt.status = 'active'
LEFT JOIN signature_requests sr ON sr.journey_tier_id = jt.id AND sr.status = 'pending'
WHERE (r.org_a_id = $1 OR r.org_b_id = $1)
  AND r.current_stage IN ('active','engaged','negotiating','formalised');
```

**Mujarrad: 12 JOINs, 5 CTEs, 8 JSONB accesses**

The full query requires:
1. Find RELATIONSHIP nodes linked to org (2 JOINs)
2. Filter by stage attribute (2 JOINs)
3. Find INTEGRATION_JOURNEY nodes for each relationship (2 JOINs)
4. Find active JOURNEY_TIER nodes (3 JOINs)
5. Find pending SIGNATURE_REQUEST nodes (3 JOINs)

### Performance Delta

| Metric | Traditional | Mujarrad EAV |
|--------|------------|--------------|
| JOINs | 4 | 12 |
| Index types | B-tree on FK UUIDs | B-tree + GIN on JSONB |
| WHERE predicates | Column = value | JSONB->>key = value |
| Estimated cost (relative) | 1x | **8-15x** |
| Query plan stability | Predictable | Highly variable |

**Critical:** GIN indexes help `@>` containment but do NOT help `->>` extraction comparisons. You'd need expression indexes per attribute, which is combinatorially explosive.

---

## 3. Schema Evolution

### Adding a Field: ALTER TABLE vs JSONB Update

**Add `compliance_status` to JOURNEY_TIER:**

Traditional: `ALTER TABLE journey_tiers ADD COLUMN compliance_status VARCHAR(20) DEFAULT 'pending';`
- Runs in milliseconds on PG 11+ (metadata only, no table rewrite)

Mujarrad:
1. Update context_type schema definition (1 UPDATE)
2. **Backfill all existing nodes** — INSERT a new attribute row for every existing journey tier node
3. No transactional atomicity between schema and data
4. If backfill fails halfway, half the data violates the new schema

**The "cheaper to change data than code" claim breaks down when the change requires backfilling.**

### JSONB Schema Versioning — Missing

No mechanism tracks which schema version a node was created under. Nodes created under v1 have different structures than v3 nodes. Every query must defensively handle all historical shapes:

```sql
COALESCE(
    a.attribute_value->>'sector_codes',   -- v3 format
    a.attribute_value->>'sector_focus'     -- v1 format
) AS sector_info
```

**Recommendation:** Add `schema_version` integer to `nodes` table.

---

## 4. Reporting & Analytics

### Dashboard: "Total Deals by Stage"

Traditional: `SELECT current_stage, COUNT(*) FROM relationships GROUP BY current_stage;`

Mujarrad:
```sql
SELECT stage_attr.attribute_value->>'value', COUNT(DISTINCT n.id)
FROM nodes n
JOIN attributes stage_attr ON stage_attr.source_node_id = n.id
    AND stage_attr.attribute_name = 'current_stage'
WHERE n.node_details->>'context_type' = 'RELATIONSHIP'
GROUP BY stage_attr.attribute_value->>'value';
```

Problems:
1. `COUNT(DISTINCT)` more expensive than `COUNT(*)`
2. JSONB extraction defeats PostgreSQL column statistics → suboptimal query plans
3. **BI tools (Metabase, Looker) cannot introspect JSONB schemas** — need views or semantic layer

### Aggregation on JSONB

`AVG((score_attr.attribute_value->>'value')::numeric)` — the `::numeric` cast on every row prevents hardware-accelerated aggregation.

---

## 5. Data Governance

### GDPR/PDPA Right to Erasure — HIGH RISK

Traditional: Delete from each table by user_id. Auditable, complete.

Mujarrad: PII can exist anywhere in JSONB. A field might be `contact_email` in one context type and `primary_email` in another. **GDPR Article 17 compliance becomes a search problem, not a delete problem.**

```sql
-- Must scan EVERY JSONB field for PII patterns
UPDATE nodes SET node_details = node_details - 'email' - 'phone' - 'name'
WHERE node_details ? 'email' AND node_details->>'email' = $user_email;
```

### Selective Backup/Restore — IMPOSSIBLE

"Restore all PARTNER_PROFILEs from yesterday's backup" — partner profiles are interleaved with every other entity in the `nodes` table. Standard `pg_restore --table` cannot help.

---

## 6. Concrete Recommendations

### Entity Classification: What Should Be a Node vs. a Table

| Entity | Recommendation | Reason |
|--------|---------------|--------|
| USER | **Dedicated table** | Auth, GDPR subject. Column-level constraints, unique email. |
| ORGANIZATION | **Dedicated table** | Core FK target. UNIQUE on registration numbers. |
| ORG_MEMBERSHIP | **Dedicated table** | Junction table with role enum. Simple FK constraints. |
| MATCH | **Dedicated table** | Hard cardinality (exactly 2 partners). Status machine. |
| RELATIONSHIP | **Dedicated table** | 6-stage lifecycle. Referenced by everything. CHECK constraints. |
| INTEGRATION_JOURNEY | **Dedicated table** | Tier tracking, strict ordering. NOT NULL on current_tier. |
| JOURNEY_TIER | **Dedicated table** | Completion conditions. Ordered. CHECK constraints. |
| SIGNATURE_REQUEST/SIGNATURE | **Dedicated table** | Immutability. Document hash integrity. Legal audit trail. |
| NOTIFICATION | **Dedicated table** | High volume, bulk operations (mark-all-read). |
| PARTNER_PROFILE | **Node** | Semi-structured, evolving schema. Completeness computed. |
| RELATIONSHIP_EVENT | **Node** | Append-only audit trail. Variable event types. |
| PORTFOLIO_ASSET | **Node** | Variable asset types, flexible valuation data. |
| FINANCIAL_MODEL | **Node** | Highly variable structure. Schema changes frequently. |
| COMMUNITY/DISCUSSION/POST | **Node** | Perfect for Mujarrad. User-generated, evolving. |
| PROJECT MANAGEMENT | **Node** | Flexible, user-defined fields. Classic Mujarrad use case. |

### The Hybrid Architecture

```
PostgreSQL Database
├── RELATIONAL CORE (Dedicated Tables)
│   ├── users, organizations, org_memberships
│   ├── matches, relationships
│   ├── integration_journeys, journey_tiers
│   ├── documents, signature_requests, signatures
│   └── notifications
│
├── MUJARRAD GRAPH LAYER (Nodes + Attributes)
│   ├── partner_profiles, portfolio_assets
│   ├── financial_models, relationship_events
│   ├── communities, discussions, posts
│   ├── opportunities, project_items
│   └── investor_interests
│
└── BRIDGE (node_entity_links table)
    └── Nodes can reference relational entities via typed FK
```

### Missing Indexes (Add Immediately)

```sql
CREATE INDEX idx_attributes_source_name ON attributes (source_node_id, attribute_name);
CREATE INDEX idx_attributes_target_name ON attributes (target_node_id, attribute_name) WHERE target_node_id IS NOT NULL;
CREATE INDEX idx_nodes_context_type ON nodes ((node_details->>'context_type'), space_id);
CREATE INDEX idx_attributes_value_text ON attributes ((attribute_value->>'value')) WHERE attribute_value ? 'value';
CREATE INDEX idx_nodes_created_by ON nodes (created_by);
CREATE INDEX idx_attributes_created_by ON attributes (created_by);
```

### Materialized Views (Essential for Reporting)

Create materialized views that "flatten" EAV back into queryable tables for common access patterns. This transforms 12-JOIN queries into simple index scans.

---

## Final Statement

> **The core issue is not performance — it is correctness.** You cannot enforce business invariants (match cardinality, stage transitions, signature immutability, GDPR deletion completeness) at the database level with an EAV model.

Application-level enforcement is always weaker than database-level enforcement because:
1. Every API endpoint must independently enforce the same rules
2. Direct database access bypasses all application constraints
3. Race conditions in concurrent writes can violate sequential checks

**Recommended path:** Hybrid model. Relational core for transactional entities. Mujarrad graph for flexible/content entities.

**References & Prior Art:**
- Martin Fowler, "EAV and Open Schema" — warnings about loss of integrity
- Magento 1.x → 2.x migration — moved away from pure EAV due to query performance
- Clinical data systems (OpenMRS, i2b2) — EAV for research data, relational for patient demographics
- WordPress `wp_posts` + `wp_postmeta` — the most successful EAV-on-relational system, still struggles with complex queries
- PostgreSQL JSONB documentation — GIN index limitations for extraction operators
