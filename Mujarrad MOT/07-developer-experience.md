# Developer Experience Audit

**Agent Hat:** DX (Developer Experience) Engineer
**Focus:** Cognitive load, type safety, frontend integration, testing, documentation
**Thinking Style:** "Can a team actually ship features on this, or will they drown in translation?"

---

## Verdict: A TYPED DOMAIN SDK IS NON-NEGOTIABLE — BUILD IT BEFORE ANY FEATURE CODE

Without a domain SDK layer, every React component becomes a data orchestration exercise. 18 domain entities flattened into 2 primitives (nodes, attributes) with ~120 untyped JSONB fields = runtime errors everywhere.

---

## 1. Cognitive Load — HIGH

Every developer holds two mental models simultaneously:
- **Business domain:** "Partner A is negotiating with Partner B on a Tier 2 journey"
- **Storage model:** "Node abc has attribute PARTNER_WITH pointing to node def, and node ghi has HAS_STAGE pointing to node jkl"

**Onboarding estimate:** 2-3 weeks for a senior developer (not because Mujarrad is hard, but because they must internalize the mapping between 18 domain concepts and the node/attribute primitives).

**Debugging cost:** A "Start Integration Journey" action triggers 6 Mujarrad API calls. When step 4 fails, the developer sees "Failed to create node" — not "Failed to create journey tier for the Acme-Beta partnership."

---

## 2. Type Safety — CRITICAL

The Partner Profile has ~10 fields in `nodeDetails` JSONB. If a developer writes `entityType` instead of `entity_type`, or `"completeness_score": "75"` instead of `75`, nothing catches it at compile time.

**Scale:** ~120 distinct fields across all entity types, all in untyped JSONB. Each is a potential runtime type mismatch.

Context types provide runtime validation (error on submit), but compile-time validation (error on write) has a 10-100x faster feedback loop.

---

## 3. Frontend Integration — HIGH

The Partner Home dashboard needs data from 7 Mujarrad contexts: partner profiles, matches, relationships, journeys, notifications, documents, portfolios. That's 7 separate API calls returning untyped JSON.

Each call requires: fetch → parse JSONB → cast to expected shape → follow attribute chains.

**Compare to typed REST:** One call to `GET /relationships?include=parties,journey.currentTier&status=active` returns everything, fully typed.

---

## 4. Testing — MEDIUM

"Test that completing all signatures advances the journey tier" touches 5+ node types and requires 7 sequential API calls. Testing this means:
- Creating and wiring 8-10 nodes before the actual test
- Mocking 7+ API calls per scenario
- Business logic (which lives where?) orchestrating the entire sequence

The 788 tests in Mujarrad backend test the graph engine, not SIA business logic.

---

## 5. Documentation — HIGH

No OpenAPI/Swagger. The sequence diagrams use pseudo-code. A developer asking "what fields does a partner profile need?" must read domain model markdown, mentally map to Mujarrad schema, and hope they got it right.

A generic graph API cannot have domain-specific documentation by definition. "POST /nodes" serves every domain.

---

## 6. SDK — THE MUST-BUILD

### Minimum Viable SDK Surface

```typescript
// Partners
sia.partners.create(data: PartnerProfile): Promise<Partner>
sia.partners.list(filters?: PartnerFilters): Promise<Partner[]>

// Matches
sia.matches.create(data: CreateMatch): Promise<Match>
sia.matches.respond(id, action: 'accept' | 'decline'): Promise<Match>

// Relationships
sia.relationships.get(id): Promise<RelationshipDetail>
sia.relationships.proposeStatus(id, newStatus): Promise<void>

// Journeys
sia.journeys.start(relationshipId): Promise<Journey>

// Signatures
sia.signatures.sign(requestId, data: SignatureData): Promise<void>
```

### SDK Structure

```
src/lib/sia-sdk/
  types/     — TypeScript interfaces for all 18 entity types
  schemas/   — Zod schemas matching those interfaces
  api/       — Thin wrappers: sia.partners.create() → POST /nodes
  hooks/     — React Query hooks: usePartner(id), useRelationships()
  utils/     — Graph traversal helpers, nodeDetails parsers
```

**Effort:** 2-3 weeks for one developer. Includes TypeScript interfaces (~120 fields), Zod schemas, React Query hooks, graph traversal helpers.

---

## 7. Recommendations by Tier

### TIER 1 — Before any feature code (Week 1-2)
- **Build typed domain SDK** — non-negotiable
- **Create schema registry** — one source of truth mapping context types to TypeScript + Zod
- **Define error boundaries** — when JSONB fails Zod, throw typed error with exact field

### TIER 2 — Alongside Sprint 1 (Week 2-4)
- **React Query hook library** — one hook per page (e.g., `usePartnerHome()` aggregates 7 contexts)
- **Form schema generation** — Zod schemas generate react-hook-form configs

### TIER 3 — Sprint 2+ (Week 4+)
- **Business logic service layer** — move orchestration out of React. `sia.signatures.completeAndAdvance()` = 1 call, not 7

### What NOT to Build
- Code generator from context types (18 entities = hand-written is fine)
- Generic admin UI generator (SIA has highly custom UX)
- Complete Mujarrad abstraction (developers need to understand the graph for debugging)

---

## Impact Summary

| Dimension | Without SDK | With SDK |
|-----------|------------|----------|
| Cognitive load | Map 18 entities to 2 primitives on every task | Work with domain types |
| Type safety | Zero on ~120 fields | Full TypeScript + Zod |
| Frontend DX | 7+ raw API calls per page | One hook per page |
| Testing | Mock 7 API calls per scenario | Mock 1 SDK call |
| Debugging | "Node abc failed" | "Partner Acme failed: missing sector_focus" |
| Onboarding | 2-3 weeks | 2-3 days |

**References:**
- React Query / TanStack Query documentation
- Zod schema validation library
- Martin Fowler on "Data Transfer Object" pattern
- Domain-Driven Design — bounded contexts and anti-corruption layers
