# SIA Website -- Visual Component Extraction Master Index

> **Source:** Wider Company Profile - Final.key (Keynote export, 40 slides, 1920x1080)
> **Target:** SIA Website (React 19 + Vite + Tailwind + shadcn/ui)
> **Purpose:** Extract, adapt, and rebrand visual components from the Wider presentation for use across the SIA website
> **Created:** 2026-04-17
> **Last Updated:** 2026-04-17

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Documentation File Index](#2-documentation-file-index)
3. [Slide-by-Slide Inventory](#3-slide-by-slide-inventory)
4. [Component-to-Website Mapping](#4-component-to-website-mapping)
5. [Color Palette Comparison](#5-color-palette-comparison)
6. [Typography Comparison](#6-typography-comparison)
7. [Documentation Structure Overview](#7-documentation-structure-overview)

---

## 1. Executive Summary

### What Is the Wider Presentation?

The "Wider Company Profile - Final" is a 40-slide Keynote presentation (exported to HTML) that represents the company formerly known as "Wider" -- a B2B platform operating in the KSA-Malaysia investment corridor. Wider is being rebranded as **SIA (Strategic Integration Agency)**. The presentation contains a rich library of visual components -- diagrams, data visualizations, layouts, photo treatments, team grids, and process flows -- that can be extracted, adapted, and implemented as React components on the SIA website.

### What Wider Does (as Depicted in the Presentation)

Wider positions itself as a **systemic integration platform** that bridges investment, talent, and operational gaps between Saudi Arabia and Malaysia. The deck covers:

- **Market problem:** SaaS apocalypse projections, short company lifespans in Saudi Arabia, and three critical gaps (investment, talent, operational)
- **Solution model:** A hub-and-spoke "Wider Model" where the platform sits at the center, connecting industries, investors, projects, and teams across both countries
- **Project facilitation:** Bilateral investment bridge between Malaysia and Saudi Arabia, with structured deal flow models and a circular economy framework
- **Platform architecture:** A layered system called "Wider Machines & Tools" with 9+ modules spanning AI, engineering, finance, marketing, and strategy
- **Team and scale:** 70+ community members across 6 countries, distributed teams with skill heatmaps, and named leadership with photos

### Visual Language Summary

The presentation employs a **premium corporate aesthetic** built around:

- **Deep purple (#3B0764 to #7C3AED range)** as the dominant brand color, used in gradients, overlays, section dividers, and diagram nodes
- **White card layouts** with generous padding for content-heavy slides
- **Full-bleed photography** with colored overlays (purple, blue) for section dividers
- **Hub-and-spoke diagrams** as the signature visual motif (slides 8-16)
- **Donut charts** for market data visualization
- **Card grids** for industries, team members, system modules
- **Flag iconography** (Malaysia/Saudi) for bilateral flow diagrams
- **Dark-on-light and light-on-dark** alternating sections
- **Circular/infinity loop** graphics for process flows

### Rebranding Direction

All purple-dominant visuals must be translated to the SIA brand palette:

| Role | Wider (Current) | SIA (Target) |
|------|-----------------|--------------|
| Primary accent | Purple #7C3AED | Gold #C8A951 |
| Dark backgrounds | Deep purple #3B0764 | Charcoal #1C1C1E |
| Light backgrounds | White #FFFFFF | White #FFFFFF / Off-white #F8F9FA |
| Metallic/secondary | Gray tones | Silver #C0C0C0 |
| Dark sections | Purple overlays | Navy #0A1628 |
| Gradient direction | Purple-to-dark | Gold-to-charcoal or navy-to-charcoal |

---

## 2. Documentation File Index

The following documentation files provide detailed extraction guides for each category of visual component. Files are numbered for reading order and grouped by component type.

| File | Title | Status | Description |
|------|-------|--------|-------------|
| `00-INDEX.md` | **Master Index** (this file) | Complete | Overview, inventory, mappings, and color/type comparisons |
| `01-SECTION-DIVIDERS.md` | Section Divider Slides | Planned | Full-bleed photo + overlay pattern for section headers (slides 1, 2, 4, 18, 24, 29, 33, 40) |
| `02-HUB-SPOKE-DIAGRAMS.md` | Hub-and-Spoke Diagrams | Planned | The signature Wider Model diagram and its variations (slides 8-16) |
| `03-DATA-VISUALIZATIONS.md` | Charts and Data Displays | Planned | Donut charts, stat cards, skill heatmaps (slides 5, 6, 34, 35, 36, 37) |
| `04-CARD-GRID-LAYOUTS.md` | Card and Grid Layouts | Planned | Industry cards, team grids, module grids (slides 17, 31, 38, 39) |
| `05-FLOW-DIAGRAMS.md` | Process and Flow Diagrams | Planned | Investment bridge, circular economy, value chain S-curve (slides 20, 21, 22, 23, 28) |
| `06-CONTENT-SLIDES.md` | Text-Heavy Content Slides | Planned | Problem statements, about us, mission/vision layouts (slides 3, 7, 19, 25) |
| `07-MAP-AND-GEOGRAPHY.md` | Map and Geographic Visuals | Planned | World map with team locations, bilateral flag flows (slides 20, 21, 26) |
| `08-TEAM-COMPONENTS.md` | Team Display Components | Planned | Circular photo grids, community stats, distribution cards (slides 34, 35, 38, 39) |
| `09-PARTNER-LOGOS.md` | Partner and Logo Displays | Planned | Logo grid layout and trust bar patterns (slide 27) |
| `10-PLATFORM-ARCHITECTURE.md` | Platform Architecture Visuals | Planned | Layered platform diagram, module cards, AI word cloud (slides 30, 31, 32) |
| `11-COLOR-MIGRATION-GUIDE.md` | Color Migration Reference | Planned | Detailed purple-to-gold/charcoal/silver conversion rules with CSS variable mappings |
| `12-ANIMATION-SPECS.md` | Animation and Transition Specs | Planned | Keynote transition patterns translated to Framer Motion specifications |
| `13-IMPLEMENTATION-PRIORITY.md` | Implementation Priority Matrix | Planned | Ordered build plan with dependencies and effort estimates |

---

## 3. Slide-by-Slide Inventory

### Legend

- **Visual Type:** The dominant visual pattern on the slide
- **Extractable Component:** The React component(s) that can be built from this slide
- **Priority:** High = needed for launch (P0 pages), Medium = needed for P1 pages, Low = nice-to-have or reference only

### Inventory Table

| # | UUID | Title / Content | Visual Type | Extractable Component | Priority | Target Doc |
|---|------|----------------|-------------|----------------------|----------|------------|
| 1 | `EA11388C` | Cover: "Company Profile" -- person on beach, purple gradient overlay | Full-bleed photo + gradient overlay + centered text | `HeroSection` -- dark photo background with gradient overlay, large centered heading, subtitle | **High** | 01 |
| 2 | `ADC21B69` | "Who Are We?" -- wind turbines photo, purple overlay, inspirational quote | Full-bleed photo + overlay + pull quote | `SectionHero` -- reusable section intro with photo bg, overlay, quote block | **High** | 01 |
| 3 | `EA4F7BC4` | About Us: Mission / Vision / Values -- clean white layout, three-column content | White background + three content blocks + headings | `MissionVisionValues` -- three-column card/text layout with icon headers | **High** | 06 |
| 4 | `2F2FCB35` | Section 1: "Value Proposition" -- glass globe photo, section title | Section divider: photo + large text + section number | `SectionDivider` -- reusable numbered section header component | **High** | 01 |
| 5 | `FAFA59EE` | Market Insights: donut chart (70%/30%), "SaaS Apocalypse 2026" stats | Donut chart + stat callouts + supporting text | `DonutChart` + `StatCard` -- animated donut chart with percentage, stat highlight cards | **High** | 03 |
| 6 | `9BEB93DD` | Saudi Market Insights: two donut charts (50%, 40%), company lifespan statistics | Dual donut charts + stat rows | `DonutChartGroup` -- side-by-side donut charts with legend and stat annotations | **High** | 03 |
| 7 | `CBCAFEA0` | Problem: "Three Critical Gaps" -- black hole visual, three gap descriptions | Dark background + dramatic image + three-column text | `ProblemStatement` -- dark-themed three-column problem layout with dramatic background | **Medium** | 06 |
| 8 | `134C8CA0` | Solution: hub diagram with purple nodes, "Systemic Platform" label | Hub-and-spoke diagram with labeled nodes | `HubDiagram` -- central node with orbiting/connected nodes, animated connections | **High** | 02 |
| 9 | `01EB92F3` | Wider Model: full hub-and-spoke diagram (all nodes visible) | Hub-and-spoke, full view | `HubDiagram` variant -- complete model with all connections visible | **High** | 02 |
| 10 | `F767063D` | Wider Model: colored connection lines between nodes | Hub-and-spoke with color-coded links | `HubDiagram` variant -- connection lines use distinct colors per category | **Medium** | 02 |
| 11 | `8F190D2A` | Wider Model: variation (emphasis on specific nodes) | Hub-and-spoke variation | `HubDiagram` state -- specific highlight configuration | **Low** | 02 |
| 12 | `0CF19167` | Wider Model: variation | Hub-and-spoke variation | `HubDiagram` state -- specific highlight configuration | **Low** | 02 |
| 13 | `E3F6D492` | Wider Model: variation | Hub-and-spoke variation | `HubDiagram` state -- specific highlight configuration | **Low** | 02 |
| 14 | `180D4A1E` | Wider Model: focused view -- 3 nodes flowing inward | Hub-and-spoke, partial (inflow) | `HubDiagram` animation state -- inflow animation showing 3 nodes connecting to center | **Medium** | 02 |
| 15 | `72997EF3` | Wider Model: reverse flow -- 3 nodes flowing outward | Hub-and-spoke, partial (outflow) | `HubDiagram` animation state -- outflow animation showing center distributing to 3 nodes | **Medium** | 02 |
| 16 | `0B25D6B0` | Wider Model: complete with all connections shown | Hub-and-spoke, fully connected | `HubDiagram` final state -- all connections rendered simultaneously | **High** | 02 |
| 17 | `CB1E6AD6` | Industries grid: 6 cards with images (Real Estate, Tech, Healthcare, etc.) | Image card grid, 2x3 or 3x2 | `SectorsGrid` -- image cards with overlay text, hover effects, icons | **High** | 04 |
| 18 | `CCA69815` | Section 2: "Propose Project" -- lightbulbs photo, section title | Section divider: photo + title | `SectionDivider` reuse -- different photo, same layout pattern | **Medium** | 01 |
| 19 | `D396A390` | "The Problem: Three Critical Gaps" -- white cards layout | White card layout, three cards side-by-side | `ProblemCards` -- white background, three elevated cards with icon + title + description | **High** | 06 |
| 20 | `0AEA1EDE` | Investment Bridge: Malaysia-Saudi bilateral flow with flags and arrows | Bilateral flow diagram with flag icons and directional arrows | `BilateralBridge` -- two-sided flow diagram with country flags, arrows, labels | **High** | 05, 07 |
| 21 | `6503C2BA` | The Bridge: circular flow Malaysia flag -> steps -> Saudi flag | Circular/arc flow diagram with stepped process | `CircularBridge` -- arc-shaped process flow connecting two endpoints (countries) | **High** | 05, 07 |
| 22 | `2F332CB8` | Propose Project Models: side-by-side Malaysia/Saudi house diagrams | Split comparison layout with structured diagrams | `DualModelComparison` -- two parallel structures showing equivalent models per country | **Medium** | 05 |
| 23 | `B8DD6780` | Circular Economy: infinity loop graphic (purple to gray gradient) | Infinity/figure-8 loop diagram | `CircularEconomyLoop` -- animated infinity symbol with labeled stages along the path | **High** | 05 |
| 24 | `2FBC2552` | Section 3: "Our Scale" -- star trails photo, section title | Section divider: photo + title | `SectionDivider` reuse | **Low** | 01 |
| 25 | `4838DD22` | "How Wider we are?" -- text-heavy slide | Large text / statement slide | `StatementSlide` -- large typography statement with supporting body text | **Low** | 06 |
| 26 | `B2B12FB7` | Our Team world map: purple-shaded map with location markers (Saudi Arabia, Egypt, Jordan, Malaysia, Australia, Germany) | World map with labeled location pins | `WorldMap` -- interactive/animated world map showing office/team locations | **High** | 07 |
| 27 | `573FC13B` | Our Partners: logo grid (NoviraHealth, SILK, B&P, homains, ISC, EGRO9075, HTU, UNSW) | Logo grid, evenly spaced | `PartnerLogoGrid` -- responsive grid of partner logos with consistent sizing | **High** | 09 |
| 28 | `01D22156` | Value Chains: 7-step S-curve process flow | Curved/stepped process diagram | `ValueChainFlow` -- S-curve or stepped process visualization with 7 labeled stages | **Medium** | 05 |
| 29 | `4199FA79` | Section 5: "Our Projects" -- trucks photo, blue overlay | Section divider: photo + overlay + title | `SectionDivider` reuse -- blue overlay variant | **Low** | 01 |
| 30 | `D0D3C463` | Wider Machines & Tools: layered platform architecture diagram | Layered/stacked architecture diagram | `PlatformArchitecture` -- layered diagram showing platform components stacked vertically | **High** | 10 |
| 31 | `2868625F` | System architecture: 9 module cards in 3x3 grid | Card grid, 3x3, icon + title + description per card | `ModuleGrid` -- 3x3 grid of feature/module cards with icons and short descriptions | **High** | 04, 10 |
| 32 | `2C7B7924` | AI Word Cloud: "Artificial Intelligence" typography cloud | Word/tag cloud with varied sizes | `WordCloud` -- typographic word cloud with size-weighted terms, animated appearance | **Low** | 10 |
| 33 | `CEB4DFC5` | Section 6: "Our Team" -- silhouettes, purple overlay | Section divider: photo + overlay + title | `SectionDivider` reuse | **Low** | 01 |
| 34 | `8AB46B94` | Wider Community 2026: stats (70+ members, 77 projects, 80% retention) + skill list | Stat highlight + skill tag list | `CommunityStats` -- large stat numbers with supporting skill/tag badges | **High** | 03, 08 |
| 35 | `31727993` | Teams Distribution: dark cards (AI & Data: 40+, Product: 6, Engineering: 10, Finance: 4, Marketing: 5, Strategy: 3) | Dark-themed stat cards in grid | `TeamDistribution` -- dark card grid showing team/department sizes with numbers | **Medium** | 03, 08 |
| 36 | `2B3ED8A7` | QUD Teams skills heatmap (purple matrix) | Heatmap / matrix chart | `SkillsHeatmap` -- matrix visualization with color intensity mapping | **Low** | 03 |
| 37 | `E5B58C94` | Mujarrad Teams skills heatmap (purple matrix) | Heatmap / matrix chart | `SkillsHeatmap` reuse -- different data set | **Low** | 03 |
| 38 | `43C3B9F6` | Team grid page 1: 12 members with circular photos + roles | Photo card grid, 4x3 or 3x4, circular avatars | `TeamGrid` -- responsive grid of team member cards with circular photos, name, role | **High** | 04, 08 |
| 39 | `CB7E1B09` | Team grid page 2: 12 more members with circular photos + roles | Photo card grid (continuation) | `TeamGrid` reuse / pagination -- same layout, additional members | **High** | 04, 08 |
| 40 | `F8642B23` | Thank You slide: contact information, closing | Centered text + contact details | `ContactCTA` -- closing CTA with contact information display | **Medium** | 01 |

### Priority Summary

| Priority | Count | Slides |
|----------|-------|--------|
| **High** | 22 | 1, 2, 3, 4, 5, 6, 8, 9, 16, 17, 19, 20, 21, 23, 26, 27, 30, 31, 34, 38, 39 |
| **Medium** | 10 | 7, 10, 14, 15, 18, 22, 28, 35, 40 |
| **Low** | 8 | 11, 12, 13, 24, 25, 29, 32, 33, 36, 37 |

---

## 4. Component-to-Website Mapping

This section maps extractable presentation components to their target locations on the SIA website. Reference: `WEBSITE_PLAN.md` defines 5 launch pages (Home, About, Services, Insights, Contact) and 3 post-launch pages (Sectors, Partners, Platform).

### Homepage (/)

| Website Section | Source Slide(s) | Component | Adaptation Notes |
|----------------|----------------|-----------|-----------------|
| Hero | Slide 1 (EA11388C) | `HeroSection` | Replace beach photo with KSA-Malaysia corridor imagery. Purple overlay becomes navy/charcoal gradient. "Company Profile" becomes "Bridging Opportunity Between Saudi Arabia & Malaysia" |
| Trust Bar | Slide 27 (573FC13B) | `PartnerLogoGrid` | Adapt logo grid into a horizontal scrolling trust bar. Replace Wider partners with SIA-relevant logos (MIDA, SAGIA, Vision 2030 alignment) |
| Value Proposition | Slide 3 (EA4F7BC4) | `MissionVisionValues` adapted as `ValuePropsSection` | Three-column layout preserved. Content changes to: Deal Facilitation / Regulatory Navigation / AI-Powered Matching |
| Stats | Slides 5-6 (FAFA59EE, 9BEB93DD) | `DonutChart` + `StatCard` | Donut charts repurposed for corridor statistics ($18B+ trade volume, deal metrics). Purple becomes gold |
| How It Works | Slide 28 (01D22156) | `ValueChainFlow` adapted | S-curve process flow adapted for 4-5 step deal lifecycle |
| Sectors Grid | Slide 17 (CB1E6AD6) | `SectorsGrid` | 6-card image grid preserved. Industries updated to: Halal & Food, Healthcare, Real Estate, Technology, Finance, Energy |
| World Map | Slide 26 (B2B12FB7) | `WorldMap` | Purple-shaded map becomes charcoal/navy. Markers focus on Riyadh + KL as primary, with other locations as team presence |
| CTA | Slide 40 (F8642B23) | `ContactCTA` | "Thank You" becomes "Ready to explore cross-border opportunities?" with CTA button |

### About Page (/about)

| Website Section | Source Slide(s) | Component | Adaptation Notes |
|----------------|----------------|-----------|-----------------|
| Section Hero | Slide 2 (ADC21B69) | `SectionHero` | Photo + overlay + quote pattern. Content becomes SIA origin story |
| Mission/Vision/Values | Slide 3 (EA4F7BC4) | `MissionVisionValues` | Direct adaptation with SIA mission, vision, and values content |
| Team Grid | Slides 38-39 (43C3B9F6, CB7E1B09) | `TeamGrid` | Circular photo grid for SIA leadership. Replace Wider team with SIA team |
| Team Map | Slide 26 (B2B12FB7) | `WorldMap` | Reuse world map showing SIA team distribution |
| Community Stats | Slide 34 (8AB46B94) | `CommunityStats` | Adapt stat display for SIA team/community metrics |

### Services Page (/services)

| Website Section | Source Slide(s) | Component | Adaptation Notes |
|----------------|----------------|-----------|-----------------|
| Hero | Slide 4 (2F2FCB35) | `SectionDivider` | Globe photo with "Value Proposition" becomes services hero |
| Problem Statement | Slides 7, 19 (CBCAFEA0, D396A390) | `ProblemCards` | Three critical gaps layout adapted for SIA client pain points |
| Solution Hub | Slides 8-9 (134C8CA0, 01EB92F3) | `HubDiagram` | Hub-and-spoke shows SIA at center connecting services |
| Investment Bridge | Slides 20-21 (0AEA1EDE, 6503C2BA) | `BilateralBridge` / `CircularBridge` | Key service visualization -- bilateral investment flow with flags |
| Circular Economy | Slide 23 (B8DD6780) | `CircularEconomyLoop` | Infinity loop adapted for SIA deal lifecycle / value creation loop |
| Pricing/Models | Slide 22 (2F332CB8) | `DualModelComparison` | Side-by-side country models adapted for service tier comparison |

### Platform Page (/platform) -- Post-Launch

| Website Section | Source Slide(s) | Component | Adaptation Notes |
|----------------|----------------|-----------|-----------------|
| Architecture | Slide 30 (D0D3C463) | `PlatformArchitecture` | Layered platform diagram -- core visual for platform page |
| Module Grid | Slide 31 (2868625F) | `ModuleGrid` | 3x3 module cards showing platform capabilities |
| AI Capabilities | Slide 32 (2C7B7924) | `WordCloud` | Decorative AI word cloud for platform tech section |
| Team Distribution | Slide 35 (31727993) | `TeamDistribution` | Show engineering/product team scale behind the platform |

### Sectors Page (/sectors) -- Post-Launch

| Website Section | Source Slide(s) | Component | Adaptation Notes |
|----------------|----------------|-----------|-----------------|
| Sectors Grid | Slide 17 (CB1E6AD6) | `SectorsGrid` | Expanded version of homepage sectors grid with more detail |
| Market Data | Slides 5-6 (FAFA59EE, 9BEB93DD) | `DonutChart` | Per-sector market data visualizations |

### Partners Page (/partners) -- Post-Launch

| Website Section | Source Slide(s) | Component | Adaptation Notes |
|----------------|----------------|-----------|-----------------|
| Partner Grid | Slide 27 (573FC13B) | `PartnerLogoGrid` | Full partner grid (expanded from trust bar) with categories |

---

## 5. Color Palette Comparison

### Wider Presentation Palette (Extracted)

The Wider presentation uses a purple-dominant palette with the following observed roles:

| Role | Wider Color | Hex (Approximate) | Usage in Deck |
|------|-------------|-------------------|---------------|
| Primary brand | Deep purple | `#3B0764` - `#581C87` | Slide backgrounds, overlays, gradient bases |
| Accent / highlights | Vivid purple | `#7C3AED` - `#8B5CF6` | Diagram nodes, chart fills, connection lines, headings |
| Light purple | Lavender | `#C4B5FD` - `#DDD6FE` | Secondary fills, heatmap mid-tones, card borders |
| Dark background | Near-black purple | `#1E0533` - `#0F0318` | Section divider backgrounds, dark slides |
| Light background | White | `#FFFFFF` | Content slides, card backgrounds |
| Text (light bg) | Dark gray / black | `#1F2937` - `#111827` | Body text on white slides |
| Text (dark bg) | White | `#FFFFFF` - `#F3F4F6` | Headings and body on dark/purple slides |
| Chart accent 1 | Blue | `#3B82F6` | Some diagram connections, secondary data |
| Chart accent 2 | Teal/green | `#14B8A6` | Tertiary data points |
| Photo overlays | Purple gradient | `#3B0764` at 70-80% opacity | Section divider photos |
| Gray (supporting) | Medium gray | `#6B7280` - `#9CA3AF` | Secondary text, borders, dividers |

### SIA Target Palette

| Role | SIA Color | Hex | CSS Variable | Usage on Website |
|------|-----------|-----|-------------|-----------------|
| Primary accent | Gold | `#C8A951` | `--sia-gold` | CTAs, highlights, premium indicators, chart fills |
| Primary accent (hover) | Gold Dark | `#A08838` | `--sia-gold-dark` | Hover states, pressed states |
| Primary accent (light) | Gold Light | `#E8D48B` | `--sia-gold-light` | Subtle highlights, light fills |
| Dark background | Charcoal | `#1C1C1E` | `--sia-charcoal` | Dark sections, footer, hero overlay |
| Deep dark | Navy | `#0A1628` | `--sia-navy` | Page background, deepest dark sections |
| Metallic secondary | Silver | `#C0C0C0` | `--sia-silver` | Borders, metallic accents, secondary elements |
| Metallic light | Silver Light | `#E8E8E8` | `--sia-silver-light` | Light backgrounds, subtle borders |
| Light background | White | `#FFFFFF` | `--sia-white` | Content sections, cards |
| Alt light background | Off-white | `#F8F9FA` | `--sia-off-white` | Alternating section backgrounds |
| Text (light bg) | Charcoal | `#1C1C1E` | (use charcoal) | Body text on white sections |
| Text (dark bg) | White / Silver light | `#FFFFFF` / `#E8E8E8` | -- | Text on dark sections |
| Cultural accent 1 | Saudi Green | `#006C35` | `--sia-saudi-green` | Subtle cultural nods, Saudi-related elements |
| Cultural accent 2 | Malaysian Blue | `#010066` | `--sia-malaysian-blue` | Subtle cultural nods, Malaysia-related elements |

### Color Translation Rules

When converting any Wider purple element to SIA:

| Wider Element | SIA Replacement | Rule |
|--------------|-----------------|------|
| Purple gradient overlay on photos | Charcoal/navy gradient at 75% opacity | `linear-gradient(135deg, rgba(28,28,30,0.85), rgba(10,22,40,0.75))` |
| Vivid purple node/accent | Gold `#C8A951` | Direct swap for primary accents |
| Deep purple background | Charcoal `#1C1C1E` or Navy `#0A1628` | Use charcoal for sections, navy for full-page backgrounds |
| Lavender/light purple fill | Silver light `#E8E8E8` or Gold light `#E8D48B` | Use silver for neutral, gold-light for emphasis |
| Purple heatmap gradient | Gold gradient (`#1C1C1E` -> `#A08838` -> `#C8A951` -> `#E8D48B`) | Four-stop gradient replacing purple intensity scale |
| Purple chart fill | Gold `#C8A951` | Primary data series |
| Blue chart accent | Saudi Green `#006C35` or Silver `#C0C0C0` | Secondary data series |
| Purple text headings on dark bg | Gold `#C8A951` or White `#FFFFFF` | Gold for emphasis headings, white for standard |
| Purple-shaded world map | Charcoal-shaded with gold location pins | Replace purple fill with `#1C1C1E` tones, pins in gold |

---

## 6. Typography Comparison

### Wider Presentation Fonts (from header.json)

The presentation uses a broad set of fonts. Key families extracted from the `fonts` array:

| Font | Weight/Style | Role in Presentation |
|------|-------------|---------------------|
| **Rubik** | Light, Regular, SemiBold, Bold | Primary sans-serif for headings and body text |
| **Helvetica Neue** | Light, Medium, Bold, Italic | Secondary sans-serif, used in labels and captions |
| **Calibri** | Light, Regular, Bold | Tertiary sans-serif, likely from imported content |
| **Carlito** | Regular | Open-source Calibri substitute |
| **Georgia** | Regular, Bold | Serif accent for quotes or editorial text |
| **Gill Sans** | Regular | Additional sans-serif |
| **IBM Plex Arabic** | Text weight | Arabic language content |
| **Al Nile** | Regular | Arabic decorative/display |
| **Beirut** | Regular | Arabic display typeface |
| **Galvji** | Regular | System sans-serif (Apple) |
| **Font Awesome 6** | Pro Light, Duotone Light | Icon font for symbols and diagrams |
| **Arial Black** | Black | Heavy display weight |
| **Times Roman** | Regular | Serif fallback |

### SIA Website Typography (from tailwind.config.js and WEBSITE_PLAN.md)

| Role | Font Family | Weights | Notes |
|------|------------|---------|-------|
| **Headings** | Inter (sans) or Playfair Display (serif) | 600, 700 | WEBSITE_PLAN recommends serif/sans pairing a la McKinsey. Current tailwind config has both defined |
| **Body** | Inter | 400, 500 | Clean, highly legible, excellent language support |
| **Arabic** | IBM Plex Sans Arabic or Noto Sans Arabic | 400, 500, 600 | IBM Plex Arabic already present in presentation -- good continuity |
| **Monospace** | JetBrains Mono | 400 | Data/stats display only |

### Typography Translation Rules

| Wider Usage | SIA Equivalent | Notes |
|-------------|---------------|-------|
| Rubik headings | Playfair Display (serif) for H1/H2, Inter (sans) for H3+ | Adds editorial authority per McKinsey model |
| Rubik body text | Inter 400/500 | Cleaner, more professional than Rubik |
| Helvetica Neue labels | Inter 500 at smaller sizes | Consistent family across all sans-serif uses |
| Georgia quotes | Playfair Display italic | Serif consistency |
| IBM Plex Arabic | IBM Plex Sans Arabic | Direct carry-over -- same family, already validated in presentation |
| Font Awesome 6 icons | Lucide React icons | Already in SIA stack. Consistent open-source icon set |
| Calibri / Carlito | Not used | These were artifacts of imported content |

### Type Scale (SIA Website)

Already defined in `tailwind.config.js`:

```
Hero:     clamp(2.5rem, 5vw, 4rem)    -- line-height 1.1, tracking -0.02em
Section:  clamp(2rem, 4vw, 3rem)      -- line-height 1.2, tracking -0.01em
Stat:     clamp(2.5rem, 4vw, 3.5rem)  -- line-height 1.1, tracking -0.02em
```

Full planned scale from WEBSITE_PLAN.md:

```
Hero:    56px / 48px / 40px (desktop / tablet / mobile)
H1:      48px / 40px / 32px
H2:      36px / 32px / 28px
H3:      24px / 22px / 20px
Body:    16px / 16px / 15px
Small:   14px / 13px / 12px
Caption: 12px / 11px / 11px
```

---

## 7. Documentation Structure Overview

### How to Use This Documentation

1. **Start here** (`00-INDEX.md`) to understand the full scope and find what you need.
2. **Use the inventory table** (Section 3) as a quick reference to identify which slides contain the visual you are looking for.
3. **Use the mapping table** (Section 4) to find which presentation components feed into which website sections.
4. **Consult individual component docs** (files 01-10) for detailed extraction instructions, including:
   - Screenshot/thumbnail references for each slide
   - DOM structure analysis of the Keynote HTML export
   - Recommended React component API (props, variants, states)
   - Tailwind CSS class recipes
   - Framer Motion animation specifications
   - Responsive behavior notes
5. **Use the color migration guide** (`11-COLOR-MIGRATION-GUIDE.md`) when implementing any color values.
6. **Use the animation specs** (`12-ANIMATION-SPECS.md`) for transition and entrance animation patterns.
7. **Follow the implementation priority** (`13-IMPLEMENTATION-PRIORITY.md`) for build order.

### File Locations

- **Wider Presentation HTML export:** `/Users/omarhamdy/Downloads/Wider Presentation HTML/Wider Company Profile - Final/`
- **Slide assets by UUID:** `/Users/omarhamdy/Downloads/Wider Presentation HTML/Wider Company Profile - Final/assets/{UUID}/`
- **Presentation metadata:** `/Users/omarhamdy/Downloads/Wider Presentation HTML/Wider Company Profile - Final/assets/header.json`
- **SIA website root:** `/Users/omarhamdy/Developer/sia-website/`
- **SIA app source:** `/Users/omarhamdy/Developer/sia-website/app/src/`
- **SIA existing sections:** `/Users/omarhamdy/Developer/sia-website/app/src/sections/`
- **SIA Tailwind config:** `/Users/omarhamdy/Developer/sia-website/app/tailwind.config.js`
- **SIA website plan:** `/Users/omarhamdy/Developer/sia-website/WEBSITE_PLAN.md`
- **This documentation:** `/Users/omarhamdy/Developer/sia-website/documentation/`

### Existing SIA Website Sections (Current State)

The site currently renders these sections in `App.tsx`, which are the crypto/DeFi holdovers being replaced:

```
Navbar -> HeroSection -> TrustBar -> ValuePropsSection -> StatsSection ->
WorldMapSection -> HowItWorksSection -> SectorsSection -> TestimonialsSection ->
CTASection -> Footer
```

Several of these section names align with components extractable from the Wider deck (HeroSection, TrustBar, ValuePropsSection, StatsSection, WorldMapSection, SectorsSection). The existing React component shells can be gutted and refilled with Wider-derived designs and SIA content. New components (HubDiagram, BilateralBridge, CircularEconomyLoop, TeamGrid, etc.) will be added as new files.

### Keynote HTML Export Structure

Each slide in the export is stored as:

```
assets/{UUID}/
  {UUID}.json       -- Slide layer tree, animations, positions, transforms
  {UUID}.jsonp      -- Same data wrapped in JSONP callback
  assets/
    {UUID}.pdf      -- Rendered slide as vector PDF (1920x1080)
    {UUID}.pdfp     -- JSONP-wrapped PDF reference
  thumbnail.jpeg    -- Low-res preview thumbnail
```

The `{UUID}.json` files contain the full layer hierarchy with:
- Layer positions (pointX, pointY), dimensions (width, height)
- Affine transforms and sublayer transforms
- Opacity, rotation, scale values
- Asset references (textures rendered as PDFs)
- Animation keyframes and timing

These JSON files are the primary source for extracting exact positions, sizes, and spatial relationships when rebuilding components in React.

### Cross-Reference: Presentation Sections to Deck Structure

| Presentation Section | Slides | Deck Purpose | SIA Website Page |
|---------------------|--------|-------------|-----------------|
| Cover + Identity | 1-3 | Who Wider is, mission/vision | Home hero, About page |
| Value Proposition | 4-17 | Market problem, solution model, industries | Home (value props, stats), Services |
| Propose Project | 18-23 | Investment bridge, bilateral models | Services, Platform |
| Our Scale | 24-28 | Team reach, partners, value chains | About (team), Partners, Home (map) |
| Our Projects | 29-32 | Platform architecture, AI capabilities | Platform page |
| Our Team | 33-39 | Community stats, team grids, skills | About (team section), Home (team) |
| Close | 40 | Contact information | Contact page, footer |

---

## Appendix A: UUID Quick Reference

For fast lookup when working with slide asset directories:

```
EA11388C  = Slide 1   (Cover)
ADC21B69  = Slide 2   (Who Are We)
EA4F7BC4  = Slide 3   (About Us)
2F2FCB35  = Slide 4   (Section: Value Proposition)
FAFA59EE  = Slide 5   (Market Insights - donut chart)
9BEB93DD  = Slide 6   (Saudi Market Insights - dual donuts)
CBCAFEA0  = Slide 7   (Problem - black hole)
134C8CA0  = Slide 8   (Solution - hub diagram)
01EB92F3  = Slide 9   (Wider Model - full)
F767063D  = Slide 10  (Wider Model - colored lines)
8F190D2A  = Slide 11  (Wider Model - variation)
0CF19167  = Slide 12  (Wider Model - variation)
E3F6D492  = Slide 13  (Wider Model - variation)
180D4A1E  = Slide 14  (Wider Model - inflow)
72997EF3  = Slide 15  (Wider Model - outflow)
0B25D6B0  = Slide 16  (Wider Model - complete)
CB1E6AD6  = Slide 17  (Industries grid)
CCA69815  = Slide 18  (Section: Propose Project)
D396A390  = Slide 19  (Problem - white cards)
0AEA1EDE  = Slide 20  (Investment Bridge)
6503C2BA  = Slide 21  (The Bridge - circular)
2F332CB8  = Slide 22  (Project Models - dual)
B8DD6780  = Slide 23  (Circular Economy loop)
2FBC2552  = Slide 24  (Section: Our Scale)
4838DD22  = Slide 25  (How Wider we are - text)
B2B12FB7  = Slide 26  (World map - team)
573FC13B  = Slide 27  (Partners logo grid)
01D22156  = Slide 28  (Value Chains - S-curve)
4199FA79  = Slide 29  (Section: Our Projects)
D0D3C463  = Slide 30  (Platform architecture)
2868625F  = Slide 31  (Module cards 3x3)
2C7B7924  = Slide 32  (AI Word Cloud)
CEB4DFC5  = Slide 33  (Section: Our Team)
8AB46B94  = Slide 34  (Community stats)
31727993  = Slide 35  (Teams distribution)
2B3ED8A7  = Slide 36  (QUD heatmap)
E5B58C94  = Slide 37  (Mujarrad heatmap)
43C3B9F6  = Slide 38  (Team grid p1)
CB7E1B09  = Slide 39  (Team grid p2)
F8642B23  = Slide 40  (Thank You / Contact)
```

---

## Appendix B: Unique Extractable Component List

Deduplicated list of all React components to be built from this presentation, in recommended build order:

| # | Component Name | Source Slides | Reuse Count | Priority |
|---|---------------|--------------|-------------|----------|
| 1 | `SectionDivider` | 1, 2, 4, 18, 24, 29, 33 | 7 | High |
| 2 | `HeroSection` | 1 | 1 (but central) | High |
| 3 | `MissionVisionValues` | 3 | 1-2 | High |
| 4 | `DonutChart` | 5, 6 | 2+ | High |
| 5 | `StatCard` | 5, 6, 34 | 3+ | High |
| 6 | `ProblemCards` | 7, 19 | 2 | High |
| 7 | `HubDiagram` | 8, 9, 10, 11, 12, 13, 14, 15, 16 | 9 (states) | High |
| 8 | `SectorsGrid` | 17 | 1-2 | High |
| 9 | `BilateralBridge` | 20 | 1 | High |
| 10 | `CircularBridge` | 21 | 1 | High |
| 11 | `CircularEconomyLoop` | 23 | 1 | High |
| 12 | `WorldMap` | 26 | 1-2 | High |
| 13 | `PartnerLogoGrid` | 27 | 1-2 | High |
| 14 | `PlatformArchitecture` | 30 | 1 | High |
| 15 | `ModuleGrid` | 31 | 1 | High |
| 16 | `CommunityStats` | 34 | 1 | High |
| 17 | `TeamGrid` | 38, 39 | 2 | High |
| 18 | `ContactCTA` | 40 | 1 | Medium |
| 19 | `DualModelComparison` | 22 | 1 | Medium |
| 20 | `ValueChainFlow` | 28 | 1 | Medium |
| 21 | `TeamDistribution` | 35 | 1 | Medium |
| 22 | `ProblemStatement` | 7 | 1 | Medium |
| 23 | `StatementSlide` | 25 | 1 | Low |
| 24 | `WordCloud` | 32 | 1 | Low |
| 25 | `SkillsHeatmap` | 36, 37 | 2 | Low |

**Total: 25 unique components** (17 High, 5 Medium, 3 Low)

---

*End of master index. Proceed to individual documentation files (01-13) for detailed extraction guides.*
