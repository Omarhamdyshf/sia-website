# Integration & API Audit

**Agent Hat:** Senior Integration Architect
**Focus:** API completeness, business logic layer, external systems, platform gap
**Thinking Style:** "Is this a platform or a database with a REST API?"

---

## Verdict: MUJARRAD IS A GRAPH CRUD API, NOT YET AN INTEGRATION PLATFORM

The current API covers ~20-25% of SIA Portal backend needs. The remaining 75-80% must be custom-built. The gap between "graph CRUD API" and "integration platform" is ~6-12 months of focused platform engineering.

---

## 1. API Completeness — The Gap

### What Exists (20-25%)
Authentication, multi-tenant spaces, schema-defined node types, CRUD on nodes/attributes, version history, batch import, API keys, cycle detection, schema validation.

### What's Missing (75-80%)

| Capability | SIA Need | Gap Severity |
|------------|----------|-------------|
| File storage | Documents, contracts, due diligence | **CRITICAL** |
| Real-time events | Notifications, chat, dashboards | **CRITICAL** |
| Workflow/state machines | 5-tier journey, signature flow | **CRITICAL** |
| Computed fields | Completeness scores, match scores | **HIGH** |
| Aggregation queries | Dashboard KPIs, portfolio summaries | **HIGH** |
| Full-text search | Partner search, document search | **HIGH** |
| Node-level permissions | Tier-based access, document visibility | **HIGH** |
| Scheduled jobs | Reminders, SLA monitoring | **MEDIUM** |
| Email/SMS triggers | Notification delivery | **MEDIUM** |

---

## 2. The Business Logic Gap — Core Problem

Mujarrad enforces: schema shape, cycle detection, version tracking.

Mujarrad does NOT enforce:

### Cross-Node Invariants
"A Match must have exactly 2 partner links." Today: a client can create a Match with 0, 1, 3, or 50 links.

### State Transition Rules
"A Journey can only advance to Tier 3 when all docs uploaded, both signed MOU, completeness >80%." Today: any caller can set `tier: 3` at any time.

### Computed Data
"Partner completeness score = weighted sum of filled fields." Today: must be computed client-side or by separate service.

### Side Effects
"When signature collected → check all complete → generate PDF → advance tier → notify parties." Today: client must orchestrate 4+ API calls. If any fails = inconsistent state.

### Where Logic Must Live — Three Options

**Option A: Frontend** — All rules in Refine.dev. Problem: any API client bypasses rules. Race conditions.

**Option B: Middleware/BFF** — New service between frontend and Mujarrad. Problem: you just built a traditional backend. Mujarrad becomes a fancy ORM.

**Option C: Extend Mujarrad** — Add hooks, computed attributes, state machines. Problem: significant R&D. You're building a platform, not an application.

**Recommendation:** Option B short-term, selective Option C patterns over time.

---

## 3. External System Integration

### Refine.dev
Needs a custom data provider (~2-3 days). Would be unnecessary with Supabase/Hasura/Strapi (all have existing Refine providers).

### n8n Workflow Automation
Needs triggers on node changes. The outbox_events table exists but no relay process is wired up. Without webhooks, limited to polling.

### File Storage
No file handling exists. Entire subsystem needed: S3 presigned uploads, metadata nodes, version tracking, access-controlled downloads.

### Email/Notifications
No outbound integration. Without webhooks/events, notifications only fire when someone is using the app.

---

## 4. Comparison to Alternatives

| Dimension | Mujarrad | Strapi/Directus | Hasura | Supabase |
|-----------|----------|-----------------|--------|----------|
| Schema | Context types (API) | Visual builder + migrations | PostgreSQL tables | PostgreSQL tables |
| API | Generic node CRUD | Auto-generated per content type | Full GraphQL with subscriptions | Auto-REST + GraphQL + Realtime |
| File handling | None | Built-in media library | Via storage integrations | Built-in with RLS |
| Webhooks | Outbox (unimplemented?) | Built-in with UI config | Event triggers | Built-in |
| Permissions | Space-level | Field-level RBAC | Row-level security | Row-level security |
| Custom logic | None | Lifecycle hooks, policies | Actions, event triggers | Edge functions |
| Admin UI | None | Full admin panel | Hasura console | Supabase dashboard |
| Real-time | None | Via plugins | Built-in subscriptions | Built-in |

**What Mujarrad does better:** Graph-native relationships with cycle detection. First-class versioning. More flexible for highly interconnected data.

**What Mujarrad does worse:** Everything else. Strapi/Directus gives 60-70% of SIA backend out of the box.

---

## 5. What Makes Mujarrad a Platform

### What Exists Today
```
Auth (OAuth + Email) → Schema Registry (Context Types) → Graph CRUD → Versioning → Batch Import
```

### What's Needed for "Integration Platform"
- Event bus (pub/sub on mutations)
- Webhook/SSE delivery (outbox relay, retry, dead letter)
- Computed attributes (formulas, rollups)
- Lifecycle hooks (pre/post create/update/delete)
- File attributes (S3-backed)
- Query engine (aggregations, graph traversals, full-text)
- Cross-space references and queries
- Granular permissions (per context type, per node, per field)
- State machine definitions on context types

### Platform Roadmap

**Phase 1 (4-6 weeks):** Event system + file attributes + basic computed attributes
**Phase 2 (6-10 weeks):** Lifecycle hooks + granular permissions + query enhancements
**Phase 3 (10-16 weeks):** State machines + cross-space references + real-time + plugin system

---

## 6. The Bottom Line

> Calling Mujarrad an "integration technology" today is **aspirational, not descriptive**. It is a schema-driven graph storage API with versioning. That is legitimate and useful, but it is not yet an integration platform.

The foundation is reasonable. The architecture is not wrong. The gap is ~6-12 months of focused platform engineering. Build the event bus, the hook system, and the file layer — then the claim starts to hold.

**For SIA Portal specifically:** Build a SIA-specific BFF (Backend For Frontend) that exposes domain endpoints, enforces business rules, and uses Mujarrad internally for storage. Or use proven tools (Supabase, Strapi) for structured CRUD and reserve Mujarrad for the graph/linking layer where it genuinely excels.

**References:**
- Strapi lifecycle hooks documentation
- Hasura event triggers architecture
- Supabase realtime architecture
- Transactional outbox pattern (Chris Richardson, microservices.io)
- PostgREST (the pattern Supabase uses)
