# AI/ML Engineer Audit

**Agent Hat:** Senior AI/ML Engineer
**Focus:** Graph intelligence, matching algorithms, embeddings, NLP, the "neuroplasticity" vision
**Thinking Style:** "What AI capabilities can this architecture actually deliver?"

---

## Verdict: SOUND FOUNDATION FOR AI — Build Additive Layers, Not Replacements

Mujarrad's architecture is not an obstacle to AI — it is a reasonable foundation. The JSONB flexibility means structured feature extraction without schema migrations. The `attributes` table gives a traversable graph. PostgreSQL with pgvector can serve as both graph store and vector store for the foreseeable scale.

---

## 1. Graph Intelligence Potential

### How Mujarrad Compares to Formal Graph Models

Mujarrad implements a **property graph** using relational tables — a legitimate and common pattern (LinkedIn, Facebook, Uber all started this way).

| Aspect | Mujarrad | Neo4j / Property Graph |
|--------|----------|------------------------|
| Node storage | Single `nodes` table + JSONB | Native node storage |
| Edge storage | `attributes` table | Native edge storage |
| Schema flexibility | JSONB = fully flexible | Property graph = flexible |
| Traversal performance | Recursive CTEs, O(n) per hop | Index-free adjacency, O(1) per hop |
| Graph algorithms | Must implement manually or export | Built-in (PageRank, community detection) |

**Verdict:** Functionally equivalent for data modeling. The limitation is traversal performance at scale, not expressiveness.

### Graph Algorithm Feasibility on PostgreSQL

- **Shortest path** — Yes, via recursive CTEs. Practical up to ~5-6 hops. Fine for MVP.
- **PageRank** — Impractical in SQL. Export to NetworkX or Spark.
- **Community detection** — Same. Requires iterative computation.
- **Link prediction** — Most relevant for SIA (predicting partner connections). Requires ML, not a graph DB feature.

**Recommendation:** For MVP, PostgreSQL with recursive CTEs handles graph queries. When needing real graph algorithms, export to NetworkX or use Apache AGE (PostgreSQL extension adding openCypher). Do NOT adopt Neo4j until node count exceeds ~100K.

---

## 2. AI-Powered Matching

### Phase 1 (MVP): Rule-Based Matching

Extract structured features from JSONB:
```sql
SELECT n.id,
  n.node_details->>'entity_type' as entity_type,
  n.node_details->>'sector' as sector,
  n.node_details->>'investment_capacity' as capacity
FROM nodes n WHERE n.node_type = 'partner_profile';
```

Build a weighted compatibility score:
- Sector alignment: 30%
- Financial fit (capacity overlaps need): 25%
- Geography alignment: 15%
- Stage match: 15%
- Integration tier compatibility: 15%

**No ML required. Replaces manual matching for 80% of cases.**

### Phase 2: Embedding-Based Semantic Matching

1. **Per-node embeddings** — Concatenate structured fields + free-text description + OKR objectives. Generate via sentence transformer (`all-MiniLM-L6-v2` or `text-embedding-3-small`).
2. **Store in PostgreSQL** — Use `pgvector` extension. Add `vector(384)` column.
3. **Similarity search** — `ORDER BY embedding <=> query_embedding LIMIT 10` gives nearest-neighbor matching.
4. **Hybrid scoring** — Combine vector similarity + rule-based score.

### Recommended Architecture

```
PostgreSQL (Mujarrad)
  ├── pgvector (embeddings alongside nodes)
  └── Structured features (from JSONB)
         ↓
Python Matching Service (FastAPI)
  ├── Rule-based scorer
  ├── Embedding generator
  ├── Hybrid ranker
  └── Match explanation generator (LLM)
         ↓
Results → Match nodes in Mujarrad
```

---

## 3. Multi-Dimensional Information ("Neuroplasticity")

### What It Actually Is

The "multi-dimensional text" concept maps to a **hypergraph** — where a single node exists in multiple contexts simultaneously. Example: an MOU node simultaneously belongs to:
- The relationship context
- The integration journey context (Tier 2)
- The document vault context
- The government oversight context

### How Well Mujarrad Supports This

The `attributes` table with `CONTAINS` and `REFERENCES` supports this directly. A node can have multiple incoming edges from different Contexts. **This is the correct design.**

The limitation: querying across contexts requires joins on `attributes`. With composite indexes, manageable at MVP scale.

### Embeddings for Multi-Context Nodes

Standard embeddings (one vector per node) lose context-dependent meaning. Solution: **context-aware embeddings** — separate embeddings for each (node, context) pair. Not needed at MVP. Relevant when AI Advisory agent reasons about entities from different perspectives.

---

## 4. Natural Language Processing

### Community Content Pipeline (Phase 2)

1. **NER** — Extract org names, sectors, deal sizes from posts
2. **Relationship extraction** — "We're looking for a partner in data centers" → need edge
3. **Map to graph** — Create candidate nodes with extracted attributes
4. **Auto-suggest** — When post mentions needs matching existing profiles, surface notification

### RAG with Graph Structure

```
User query: "What regulations apply to data centers in Malaysia?"
  → Embed query → vector search pgvector
  → Graph traversal: follow REFERENCES edges from matched nodes
  → Collect node details + connected documents + relationship context
  → Feed to LLM as context
  → Answer with citations to specific nodes
```

The graph adds **relational context** over flat RAG — documents + their neighborhood (who owns them, what deal they belong to). This makes LLM responses more accurate.

---

## 5. Scalability for AI Workloads

| Challenge | Solution |
|-----------|---------|
| JSONB extraction for ML features | Materialized views with extracted fields |
| Embedding generation latency | Async job queue (Celery/BullMQ) |
| Training on graph data | Export to Parquet for training |
| Real-time inference | Pre-compute + cache match scores |

**Can PostgreSQL serve real-time inference?** Yes, at SIA's scale. pgvector nearest-neighbor across 10K embeddings takes <50ms. At 50K+, add Qdrant/Weaviate as read replica.

---

## 6. The "Data Speaks to Data" Vision

### Gap Analysis

| Capability | Current | Needed |
|------------|---------|--------|
| Data connects to data | Manual (admin creates matches) | Embeddings + inference rules |
| Inferred relationships | None | "If A invests in sector X and B operates in X, infer potential match" |
| Autonomous agents | None | LLM agents traversing graph to answer queries |
| Self-organizing graph | None | Event-driven edge suggestions on new nodes |

### What Would Make It Work

**Tier 1 (buildable now):** Event-driven suggestions — new partner → compute embeddings → find top-10 similar → create suggested match nodes.

**Tier 2 (Phase 2):** Inference rules in application layer. "If Partner A needs funding AND Partner B deploys capital in A's sector AND both verified → high-confidence match suggestion."

**Tier 3 (Phase 2-3):** LLM agents traversing graph via API. Achievable with LangGraph/CrewAI + Mujarrad's API as toolset.

---

## 7. Concrete Priority Order for AI Features

| Priority | Feature | Effort | Impact |
|----------|---------|--------|--------|
| 1 | pgvector + profile embeddings | 1 day setup | Foundational for all AI |
| 2 | Rule-based match scoring | 1-2 weeks | Replaces 80% of manual matching |
| 3 | Hybrid match scoring (rules + embeddings) | 1 week | Better match quality |
| 4 | OKR similarity matching | 1 week | Core PLG flywheel |
| 5 | Match explanations (LLM) | 2-3 days | Makes matches trustworthy |
| 6 | AI Advisory agent (RAG) | 3-4 weeks | Paid tier differentiator |
| 7 | Community NLP | 2-3 weeks | Depends on community launch |
| 8 | Graph analytics (community detection) | 1-2 weeks | Government dashboards |

---

## Key Takeaway

> **The single most impactful investment right now: add pgvector to PostgreSQL and start generating embeddings for every partner profile on creation. Everything else in the AI roadmap builds on that foundation.**

The "neuroplasticity" vision is not science fiction — it maps to well-understood patterns in knowledge graphs and embedding-based retrieval. The gap is not in the data model but in the **inference layer** (rules, embeddings, LLM agents) that sits on top. That layer is additive, not replacement.

**References:**
- pgvector documentation — vector similarity search in PostgreSQL
- Sentence Transformers (all-MiniLM-L6-v2) — embedding generation
- TransR/RotatE — multi-relational knowledge graph embeddings
- LangChain/LlamaIndex — graph-aware RAG pipelines
- NetworkX — graph algorithm library for Python
- Apache AGE — openCypher for PostgreSQL
