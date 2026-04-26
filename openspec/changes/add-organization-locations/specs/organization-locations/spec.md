## ADDED Requirements

### Requirement: Multiple locations per organization
An organization MUST support one or more locations. Each location consists of a country (ISO code + display name), a city, and geographic coordinates (latitude, longitude). Exactly one location MUST be marked as the default.

#### Scenario: Create organization with one location
- **WHEN** the user selects "Saudi Arabia" from the country dropdown and "Riyadh" from the city dropdown
- **THEN** the location is added with isDefault=true and lat/lng auto-populated from city data
- **AND** the organization is saved with a `locations` array containing one entry

#### Scenario: Add multiple locations
- **WHEN** the user clicks "Add location" and selects "Malaysia" then "Kuala Lumpur"
- **THEN** two locations exist with the first remaining default
- **AND** saving stores both locations in the organization nodeDetails

#### Scenario: Enforce at least one location
- **WHEN** the user attempts to remove the last remaining location
- **THEN** the remove button SHALL be disabled

### Requirement: Dynamic country dropdown
The country selection MUST be populated dynamically from the country-state-city package. The dropdown MUST be searchable to handle approximately 250 countries.

#### Scenario: Search for a country
- **WHEN** the user types "Sau" in the country dropdown search
- **THEN** "Saudi Arabia" SHALL appear in the filtered results

### Requirement: Dynamic city dropdown dependent on country
The city dropdown MUST show only cities belonging to the selected country. It MUST be disabled until a country is selected. Changing the country MUST reset the city selection.

#### Scenario: Select city after country
- **WHEN** the user has selected "Saudi Arabia" and opens the city dropdown
- **THEN** only Saudi Arabian cities SHALL be shown

#### Scenario: Change country resets city
- **WHEN** the user changes the country from "Saudi Arabia" to "Malaysia"
- **THEN** the city field SHALL be cleared and show Malaysian cities

### Requirement: Default location toggle
Exactly one location MUST be the default at all times. Toggling default on a location MUST remove default from the previous one.

#### Scenario: Toggle default
- **WHEN** the user marks Kuala Lumpur as default instead of Riyadh
- **THEN** Kuala Lumpur SHALL become default and Riyadh SHALL lose default status

## MODIFIED Requirements

### Requirement: Map renders from locations
The map page MUST read the locations array from each organization instead of the country string field. Each location with valid coordinates SHALL render as a marker at city-level precision.

#### Scenario: Organization with two locations appears as two markers
- **WHEN** the map page loads for an organization with locations in Riyadh and Kuala Lumpur
- **THEN** two markers SHALL appear at the respective city coordinates
- **AND** hovering each marker SHALL show the org name and city name

#### Scenario: Organization with no locations
- **WHEN** the map page loads and an organization has no locations array
- **THEN** that organization SHALL not appear on the map

## REMOVED Requirements

### Requirement: Remove hardcoded country coordinates
The COUNTRY_COORDS lookup table and the country text input field SHALL be removed, replaced by the dynamic location system.

#### Scenario: Hardcoded coordinates no longer used
- **WHEN** the map page renders organization markers
- **THEN** coordinates SHALL come from location lat/lng fields, not from a hardcoded lookup table
