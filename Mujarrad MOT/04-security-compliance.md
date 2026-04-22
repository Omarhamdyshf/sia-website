# Security & Compliance Audit

**Agent Hat:** Security Engineer & Compliance Specialist
**Focus:** Authentication, data isolation, compliance (PDPA/PDPL), digital signatures
**Thinking Style:** "What can go wrong? What has legal consequences?"

---

## Verdict: CRITICAL FIXES NEEDED BEFORE ANY PRODUCTION DATA

Two CRITICAL findings, three HIGH, four MEDIUM. The system cannot handle real partner data in its current state.

---

## Finding Summary

| # | Finding | Severity | Status |
|---|---------|----------|--------|
| 1 | Secret API key in frontend env file | **CRITICAL** | Not yet leaked but one import away |
| 2 | Authentication is entirely fake/bypassable | **CRITICAL** | Anyone can bypass via DevTools |
| 3 | No backend API integration exists | **HIGH** | All data is static/mock |
| 4 | Single-table multi-tenant data isolation risk | **HIGH** | Every query must be ownership-scoped |
| 5 | Lock state TOCTOU race condition | **MEDIUM** | Mode should be server-canonical |
| 6 | Digital signatures lack cryptographic binding | **MEDIUM** | Signatures are forensic, not non-repudiable |
| 7 | No rate limiting, CORS, input validation | **MEDIUM** | Standard API hardening missing |
| 8 | PDPA/PDPL compliance gaps | **MEDIUM** | Consent, erasure, residency, retention |
| 9 | Invitation token security unspecified | **LOW** | Standard secure token practices needed |

---

## CRITICAL: Finding 1 — Secret Key Exposed

**Location:** `app/.env.local`, line 9

```
VITE_MUJARRAD_SECRET_KEY=sk_live_PkFVQlBoDGKj0TALgQseZSnEdwoKN_h-qg30Bph5Jn6pd2pGi4ye4Nsp6AKJGdCM
```

The `VITE_` prefix means Vite **bakes this into the JavaScript bundle** shipped to every browser. The `sk_live_` prefix denotes a secret key.

**Mitigating factor:** The variable is defined but not yet referenced in any source file. The `.env.local` is properly gitignored. The key has NOT been leaked to production yet.

**Immediate actions:**
1. Rotate the secret key immediately — assume compromised
2. Remove `VITE_MUJARRAD_SECRET_KEY` from `.env.local` entirely
3. Secret keys must ONLY exist server-side (BFF/proxy)
4. Add pre-commit hook rejecting `VITE_.*SECRET` patterns

---

## CRITICAL: Finding 2 — Fake Authentication

**Location:** `LoginPage.tsx` and `ProtectedRoute.tsx`

The Google login button writes a hardcoded JSON to localStorage:
```js
localStorage.setItem("sia-investor-session", JSON.stringify({ role: "investor", email: "investor@example.com" }));
```

`ProtectedRoute` reads this localStorage key — no JWT, no server verification. Anyone can gain full access:
```js
localStorage.setItem("sia-investor-session", JSON.stringify({ role: "investor" }));
```

**Action:** Implement real Google OAuth + JWT as specified in the sequence diagrams.

---

## HIGH: Finding 4 — Multi-Tenant Isolation in Single Table

All business entities are generic "nodes" in one table, scoped by Space. Risks:
- Cross-context data leakage if queries lack context filtering
- No row-level security — Organization A could see Organization B's data
- JSONB nodeDetails has no database-level type isolation

**Actions:**
- Every query must include `space_id` AND entity-ownership filters
- Implement middleware that auto-injects ownership scoping
- Consider PostgreSQL Row-Level Security (RLS) policies

---

## MEDIUM: Finding 5 — Lock State Race Condition

The `X-Space-Mode` header is client-controlled. If the client sends `X-Space-Mode: CONFIGURATION`, it could bypass production protections.

Between mode check and operation execution, the mode could change (TOCTOU vulnerability).

**Actions:**
- Mode should be read from DB, not from client header
- Use `SELECT FOR UPDATE` when checking mode
- Issue separate API keys for CONFIGURATION vs PRODUCTION access

---

## MEDIUM: Finding 6 — Digital Signature Integrity

The signature flow captures: signature_data (base64), ip_address, document_hash, timestamp.

**Concerns:**
- **Replay attack** — Same signature_data can be submitted to different documents
- **Client-generated hash** — Malicious client could hash a different document
- **No cryptographic non-repudiation** — IP + timestamp is forensic, not legally binding
- **Stage gate bypass** — If frontend triggers tier advancement, client could skip signature check

**Actions:**
- Server must compute document hash, not client
- Bind signature cryptographically: `sign(hash(document + signer_id + timestamp), server_key)`
- Stage gate enforcement must be server-side
- Consider integrating qualified digital signature provider for KSA/MY jurisdictions

---

## MEDIUM: Finding 8 — PDPA/PDPL Compliance

The platform operates in the KSA-Malaysia corridor, requiring compliance with:
- **PDPL** (Saudi Personal Data Protection Law)
- **PDPA** (Malaysia Personal Data Protection Act 2010)

**Gaps:**
1. **No consent management** — No documented consent capture at onboarding
2. **Right to erasure** — With JSONB and versioning, deleting all user data requires purging across nodes, versions, attributes, and JSONB references in other nodes
3. **Data residency** — Render uses AWS. Both laws have localization preferences
4. **Data retention** — Node versioning creates ever-growing audit trails. Both laws prohibit indefinite retention
5. **Cross-border transfers** — Saudi data flowing to Malaysian host requires safeguards

---

## Priority Actions (Immediate)

1. **Rotate** the Mujarrad secret key
2. **Remove** `VITE_MUJARRAD_SECRET_KEY` from `.env.local`
3. **Replace** fake localStorage auth with real Google OAuth + JWT
4. **Architect** the API integration layer with server-side secret storage, proper CORS, rate limiting, and ownership-scoped queries from day one

**References:**
- OWASP API Security Top 10
- Saudi PDPL (Royal Decree M/19, effective September 2023)
- Malaysian PDPA 2010
- NIST Digital Signature Standard (FIPS 186-5)
- Vite Environment Variables documentation (VITE_ prefix behavior)
