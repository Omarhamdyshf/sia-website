# Proposal: Add Organization Locations

## Change ID
`add-organization-locations`

## Problem
Organizations currently have a single optional `country` text field (free-text input). This creates three problems:
1. **No standardization** — users type anything ("SA", "Saudi Arabia", "KSA"), making filtering and grouping unreliable
2. **No city-level granularity** — the map page uses a hardcoded 56-country coordinate lookup, placing all orgs at country centroids regardless of actual city
3. **Single location only** — real B2B organizations operate from multiple offices; there is no way to represent this

## Solution
Replace the single `country` text field with a **locations** system:
- Each organization has one or more **locations** (at least one marked as default)
- Each location has a **country** (selected from a dynamic dropdown) and a **city** (selected from a dependent dropdown filtered by country)
- Coordinates (lat/lng) are derived automatically from the selected city
- The map page reads locations instead of `country`, rendering organizations at city-level precision with support for multiple pins per org

## Approach
Use the `country-state-city` NPM package (ISC license, 150K+ cities with lat/lng, zero API calls, works offline, tree-shakeable) for dynamic country and city data. Locations are stored as a JSON array in the organization's `nodeDetails` in Mujarrad.

## Scope
- Modify: Organization form (country field → locations editor)
- Modify: Organization schema (country string → locations array)
- Modify: Map page (hardcoded coords → location-based coords, multi-pin)
- Modify: Entity registry (requiredFields update)
- Create: LocationEditor component (country/city dropdowns + default toggle)
- No backend changes — locations stored in nodeDetails as before

## Spec Deltas
- `specs/organization-locations/spec.md` — Requirements for location CRUD, dynamic dropdowns, map integration
