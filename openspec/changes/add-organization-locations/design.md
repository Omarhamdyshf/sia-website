# Design: Add Organization Locations

## Data Model

### Location shape
```typescript
interface OrgLocation {
  id: string;           // crypto.randomUUID()
  country: string;      // ISO2 code from country-state-city (e.g., "SA")
  countryName: string;  // Display name (e.g., "Saudi Arabia")
  city: string;         // City name from country-state-city
  lat: number;          // From country-state-city City.latitude
  lng: number;          // From country-state-city City.longitude
  isDefault: boolean;   // Exactly one must be true
}
```

### Storage
Organizations store `locations: OrgLocation[]` in nodeDetails (same as all other fields). The old `country` string field is removed from the schema. Migration: orgs with an existing `country` value get a single location entry with that country and its capital city as a reasonable default.

## Dynamic Country/City Data

### Package: `country-state-city`
- **License**: ISC (permissive, no GPL concerns)
- **Size**: ~2MB raw, tree-shakeable — only import `Country`, `City` (skip `State`)
- **API**:
  - `Country.getAllCountries()` → `{ name, isoCode, latitude, longitude }[]`
  - `City.getCitiesOfCountry(isoCode)` → `{ name, latitude, longitude, stateCode }[]`
- **Zero network calls** — all data bundled, works offline

### Why not an API?
- Adds latency, rate limits, and a runtime dependency for static geographic data
- `country-state-city` has 150K+ cities with coordinates — sufficient for B2B org locations
- If more granularity is ever needed, can swap to API later without changing the data model

## Component: LocationEditor

A form section that replaces the old country text input. Renders a list of location rows, each with:
1. **Country dropdown** — searchable combobox populated from `Country.getAllCountries()`
2. **City dropdown** — searchable combobox populated from `City.getCitiesOfCountry(selectedCountry)`, disabled until country is selected
3. **Default toggle** — radio-style, exactly one location is default
4. **Remove button** — disabled if only one location remains

"Add location" button appends a new empty row. Minimum one location required for form submission.

### UX
- Country dropdown: ~250 items, needs search/filter (use shadcn Combobox with Command)
- City dropdown: up to ~5000 items for large countries, needs search/filter + virtual scrolling or lazy filter
- On country change: reset city, clear lat/lng
- On city select: auto-populate lat/lng from city data
- Default location: first added location is auto-default; toggling default on another removes it from the previous

## Map Page Changes

### Current
- Reads `org.country` string
- Looks up `COUNTRY_COORDS[country]` (hardcoded 56-entry map)
- Renders one marker per org at country centroid

### New
- Reads `org.locations` array
- For each location with valid lat/lng, renders a marker
- Multiple markers per org (one per location)
- Marker tooltip shows org name + city name
- Remove `COUNTRY_COORDS` entirely
- Fallback: if org has no locations, skip (no marker)

### Clustering
- With city-level precision and multi-location, markers may overlap
- Use simple proximity-based clustering or just render all markers (MVP)
- Clustering can be a follow-up enhancement

## Schema Changes

### Before
```typescript
organizationSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  status: z.string().min(1),
  country: z.string().optional(),
  website: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});
```

### After
```typescript
const locationSchema = z.object({
  id: z.string(),
  country: z.string().min(1),
  countryName: z.string().min(1),
  city: z.string().min(1),
  lat: z.number(),
  lng: z.number(),
  isDefault: z.boolean(),
});

organizationSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  status: z.string().min(1),
  locations: z.array(locationSchema).min(1).refine(
    locs => locs.filter(l => l.isDefault).length === 1,
    { message: "Exactly one location must be default" }
  ),
  website: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});
```

## Entity Registry Update

```typescript
organizations: {
  nodeType: "CONTEXT",
  titleField: "name",
  requiredFields: ["name", "type", "status", "locations"],
  relationships: [],
},
```

## Migration

Existing organizations with `country` field:
- Create one location: `{ country: isoCode, countryName, city: capital, lat, lng, isDefault: true }`
- Best-effort country string → ISO code mapping via `Country.getAllCountries().find(c => c.name === org.country)`
- Orgs without country: no locations added (form will prompt on next edit)
