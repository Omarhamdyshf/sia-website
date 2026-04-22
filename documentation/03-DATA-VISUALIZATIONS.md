# 03 - Data Visualizations Component Documentation

Reference: Wider Presentation slides mapped to SIA website components.
Tech stack: React 18 + TypeScript, Recharts, Framer Motion, Tailwind CSS, shadcn/ui chart primitives.

---

## Table of Contents

1. [Donut/Ring Charts](#1-donutring-charts)
2. [Teams Distribution Cards](#2-teams-distribution-cards)
3. [Community Stats Row](#3-community-stats-row)
4. [Skills Heatmap Matrix](#4-skills-heatmap-matrix)
5. [AI Word Cloud](#5-ai-word-cloud)
6. [Problem Cards Layout](#6-problem-cards-layout)

---

## 1. Donut/Ring Charts

### Source Slides

- **Slide 5 (UUID: FAFA59EE)** -- "Market Insights" single donut, 70%/30% split
- **Slide 6 (UUID: 9BEB93DD)** -- "Saudi Market Insights" dual donut layout

### Visual Description

**Single Donut (Slide 5):**
- One centered ring chart with a thick arc stroke
- 70% segment fills clockwise from 12 o'clock in a saturated purple (#7B2FF2 in Wider; maps to gold #C8A951 in SIA)
- 30% segment in dark/near-black (#1C1C1E charcoal)
- Center label: large percentage number "70%" in white, bold
- Subtitle beneath the chart: "SaaS Apocalypse 2026 by IDC"
- Ring thickness: approximately 20% of the chart radius (strokeWidth ~ 28px at 160px radius)
- 4px gap angle between segments (padAngle = 0.04 radians)

**Dual Donut (Slide 6):**
- Two ring charts side by side in a flex row, equal sizing
- Left chart: 50% fill -- "Longer Runway SMEs"
- Right chart: 40% fill -- "SMEs Demand"
- Stats row below charts: "50 per 4 years | Saudi Companies Established" and "Years Average Lifespan 1.5 Years | $10B Waste"
- Same ring proportions and gap styling as the single donut

### Data Structure

```typescript
interface DonutSegment {
  label: string;
  value: number;       // percentage 0-100
  color: string;       // hex color
}

interface DonutChartData {
  id: string;
  title: string;
  subtitle?: string;
  segments: DonutSegment[];
  centerLabel?: string; // text displayed in the ring center
  footnote?: string;
}
```

**SIA sample data:**

```typescript
const siaDonutCharts: DonutChartData[] = [
  {
    id: "corridor-share",
    title: "KSA-Malaysia Corridor Share",
    segments: [
      { label: "Facilitated by SIA", value: 35, color: "#C8A951" },
      { label: "Other Channels", value: 65, color: "#1C1C1E" },
    ],
    centerLabel: "35%",
    footnote: "$18B+ Annual Bilateral Trade",
  },
  {
    id: "deal-success",
    title: "Deal Success Rate",
    segments: [
      { label: "Closed Deals", value: 92, color: "#C8A951" },
      { label: "In Progress", value: 8, color: "#2A2A2E" },
    ],
    centerLabel: "92%",
    subtitle: "Client Retention",
  },
  {
    id: "sector-distribution",
    title: "Sector Distribution",
    segments: [
      { label: "Halal & Food", value: 28, color: "#C8A951" },
      { label: "Technology", value: 22, color: "#A08838" },
      { label: "Healthcare", value: 18, color: "#E8D48B" },
      { label: "Real Estate", value: 15, color: "#C0C0C0" },
      { label: "Other Sectors", value: 17, color: "#1C1C1E" },
    ],
    centerLabel: "8",
    subtitle: "Sectors Covered",
  },
];
```

### Color Palette

| Wider Presentation | Hex       | SIA Mapping      | SIA Hex   |
|--------------------|-----------|------------------|-----------|
| Purple fill (70%)  | #7B2FF2   | Gold (primary)   | #C8A951   |
| Dark fill (30%)    | #1A1A1A   | Charcoal         | #1C1C1E   |
| Purple light       | #A855F7   | Gold light       | #E8D48B   |
| Purple mid         | #6D28D9   | Gold dark        | #A08838   |
| Background         | #000000   | Navy             | #0A1628   |
| Label text         | #FFFFFF   | White            | #FFFFFF   |
| Subtitle text      | #9CA3AF   | Silver           | #C0C0C0   |

### Typography

| Element          | Font               | Size                          | Weight | Color   |
|------------------|--------------------|-------------------------------|--------|---------|
| Section title    | Playfair Display   | clamp(2rem, 4vw, 3rem)        | 700    | #FFFFFF |
| Center number    | Inter              | clamp(2rem, 3.5vw, 3rem)      | 800    | #FFFFFF |
| Segment label    | Inter              | 14px / 0.875rem               | 500    | #C0C0C0 |
| Subtitle         | Inter              | 16px / 1rem                   | 400    | #C0C0C0 |
| Footnote         | Inter              | 13px / 0.8125rem              | 400    | #9CA3AF |

### Animation

1. **Entry**: Ring starts at 0 degrees and fills clockwise to target value over 1.5s
   - Easing: `easeOutQuart` -- `cubic-bezier(0.25, 1, 0.5, 1)`
   - Triggered on scroll into view (`useInView` with `once: true, margin: "-100px"`)
2. **Center number**: Count-up from 0 to target percentage in sync with arc fill
   - Uses `AnimatedCounter` component with `duration={1.5}`
3. **Hover state**: Segment expands outward by 4px (outerRadius increase), opacity of other segments drops to 0.7
   - Transition: `200ms ease-out`
4. **Dual layout stagger**: Second chart entry delayed by 200ms

### SIA Content Mapping

| Wider Content                  | SIA Equivalent                          |
|--------------------------------|-----------------------------------------|
| "SaaS Apocalypse 70%"         | "$18B+ Annual Bilateral Trade"          |
| "Longer Runway SMEs 50%"      | "Deal Success Rate 92%"                 |
| "SMEs Demand 40%"             | "Sector Distribution (8 sectors)"       |
| "$10B Waste" stat             | "6-month avg deal cycle vs 18 typical"  |

### React Implementation

**Library**: Recharts `PieChart` + `Pie` with custom `activeShape` renderer

```tsx
// Component path: src/components/dataviz/DonutChart.tsx
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/effects/AnimatedCounter";

// Uses shadcn/ui ChartContainer for theming consistency
// Wrap in <ChartContainer config={chartConfig}> from @/components/ui/chart
```

**Key props:**

```typescript
interface DonutChartProps {
  data: DonutChartData;
  size?: number;            // default 240
  ringThickness?: number;   // default 28
  padAngle?: number;        // default 0.04
  animationDuration?: number; // default 1.5 (seconds)
  showLegend?: boolean;     // default true
  className?: string;
}
```

### Responsive Design

| Breakpoint   | Behavior                                              |
|--------------|-------------------------------------------------------|
| Mobile (<640px)  | Single column stack; chart size 180px; legend below chart |
| Tablet (640-1024px) | Dual donuts side by side at 200px each; legend inline |
| Desktop (>1024px)   | Full layout as designed; chart size 240px; hover effects active |

### Accessibility

- Each segment has `role="img"` with `aria-label` describing segment name and percentage
- Center label wrapped in `aria-live="polite"` so screen readers announce the count-up result
- Minimum contrast ratio: gold (#C8A951) on navy (#0A1628) = 5.2:1 (passes AA)
- Legend items use distinct color swatches paired with text labels (never color-only)
- `prefers-reduced-motion`: skip arc animation, render at final state immediately

---

## 2. Teams Distribution Cards

### Source Slide

- **Slide 35 (UUID: 31727993)** -- Dark card grid showing team size per department

### Visual Description

- 6 cards arranged in a 2-row x 3-column grid
- Each card: dark background (#111111 in Wider, navy #0A1628 for SIA), subtle 1px border (#2A2A2E)
- Card contents stacked vertically:
  1. Large number (top) -- bold, 48-56px
  2. Department name (middle) -- uppercase, 14px, letter-spacing 0.1em
  3. Subtitle descriptor (bottom) -- muted text, 13px
- The "largest" or featured card (AI & DATA, value 40+) has a purple left border accent (4px) -- maps to gold for SIA
- Cards have subtle hover elevation: `box-shadow` transition from `card` to `card-hover`

**Wider original card data:**

| Number | Department  | Subtitle              |
|--------|-------------|-----------------------|
| 40+    | AI & DATA   | AI Engineers          |
| 6      | PRODUCT     | Product Managers      |
| 10     | ENGINEERING | Web & Mobile          |
| 4      | FINANCE     | Financial/Plan        |
| 5      | MARKETING   | Branding/PR           |
| 3      | STRATEGY    | Top Strategic         |

### Data Structure

```typescript
interface TeamCard {
  id: string;
  value: number | string;   // "40+" allowed as string
  department: string;
  subtitle: string;
  featured?: boolean;        // highlights with gold accent
  icon?: React.ComponentType; // optional Lucide icon
}

interface TeamDistributionData {
  title: string;
  subtitle?: string;
  cards: TeamCard[];
}
```

**SIA sample data:**

```typescript
const siaMetricsDashboard: TeamDistributionData = {
  title: "Deal Metrics Dashboard",
  subtitle: "SIA by the Numbers",
  cards: [
    { id: "deals", value: "150+", department: "DEALS FACILITATED", subtitle: "Cross-border transactions", featured: true },
    { id: "sectors", value: 8, department: "SECTORS", subtitle: "Industry verticals covered" },
    { id: "partners", value: "50+", department: "PARTNERS", subtitle: "Institutional relationships" },
    { id: "countries", value: 2, department: "JURISDICTIONS", subtitle: "KSA & Malaysia" },
    { id: "cycle", value: 6, department: "MONTHS AVG", subtitle: "Deal cycle time" },
    { id: "retention", value: "92%", department: "RETENTION", subtitle: "Client return rate" },
  ],
};
```

### Color Palette

| Element            | Wider Hex   | SIA Hex   | Token            |
|--------------------|-------------|-----------|------------------|
| Card background    | #111111     | #0A1628   | `bg-navy`        |
| Card border        | #2A2A2E     | #1C1C1E   | `border-charcoal`|
| Featured accent    | #7B2FF2     | #C8A951   | `border-gold`    |
| Large number       | #FFFFFF     | #FFFFFF   | `text-white`     |
| Department name    | #A3A3A3     | #C0C0C0   | `text-silver`    |
| Subtitle           | #6B7280     | #9CA3AF   | `text-muted`     |
| Hover border       | #7B2FF2/40  | #C8A951/40| `border-gold/40` |

### Typography

| Element          | Font   | Size                        | Weight | Transform  |
|------------------|--------|-----------------------------|--------|------------|
| Large number     | Inter  | clamp(2.5rem, 4vw, 3.5rem) | 800    | none       |
| Department name  | Inter  | 14px / 0.875rem             | 600    | uppercase  |
| Subtitle         | Inter  | 13px / 0.8125rem            | 400    | none       |
| Section title    | Playfair Display | clamp(2rem, 4vw, 3rem) | 700 | none       |

### Animation

1. **Entry**: Cards stagger in from bottom with `slideUp` animation
   - Stagger delay: 100ms per card (i * 0.1)
   - Duration: 600ms, `easeOut`
   - Triggered by `useInView`
2. **Number count-up**: Each card number animates using `AnimatedCounter`
   - Duration: 2s with spring physics (bounce: 0)
   - String values like "40+" animate the numeric portion, then append suffix
3. **Hover**: Card lifts with `translateY(-4px)` and `box-shadow` transitions to `card-hover`
   - Featured card hover adds gold glow: `shadow-gold-glow`
   - Transition: `300ms ease-out`
4. **Featured card pulse**: Subtle gold border pulse animation on the featured card
   - Uses `pulse-slow` keyframe (3s ease-in-out infinite, opacity 0.7-1.0)

### SIA Content Mapping

| Wider Card       | SIA Equivalent               |
|------------------|------------------------------|
| AI & DATA (40+)  | Deals Facilitated (150+)     |
| PRODUCT (6)      | Sectors (8)                  |
| ENGINEERING (10) | Partners (50+)               |
| FINANCE (4)      | Jurisdictions (2)            |
| MARKETING (5)    | Months Avg Cycle (6)         |
| STRATEGY (3)     | Client Retention (92%)       |

### React Implementation

**Library**: Pure CSS Grid + Framer Motion + AnimatedCounter

```tsx
// Component path: src/components/dataviz/MetricsGrid.tsx
import { motion, useInView } from "framer-motion";
import { AnimatedCounter } from "@/components/effects/AnimatedCounter";

// Grid: CSS Grid with grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6
// Each card: <motion.div> with stagger animation
// Featured card detection: card.featured ? "border-l-4 border-gold" : "border border-charcoal/20"
```

**Key props:**

```typescript
interface MetricsGridProps {
  data: TeamDistributionData;
  columns?: 2 | 3;           // default 3
  animationDuration?: number; // default 2
  staggerDelay?: number;      // default 0.1
  className?: string;
}
```

### Responsive Design

| Breakpoint       | Columns | Card padding | Number size |
|------------------|---------|--------------|-------------|
| Mobile (<640px)  | 2       | 16px         | 2rem        |
| Tablet (640-1024px) | 3    | 20px         | 2.5rem      |
| Desktop (>1024px)  | 3     | 24px         | 3.5rem      |

### Accessibility

- Grid uses `role="list"`, each card `role="listitem"`
- Numbers have `aria-label` with full context: "150+ Deals Facilitated"
- Featured card has `aria-current="true"` to indicate emphasis
- Focus-visible styling: 2px gold outline offset by 2px
- Color contrast: white (#FFF) on navy (#0A1628) = 16.1:1 (passes AAA)

---

## 3. Community Stats Row

### Source Slide

- **Slide 34 (UUID: 8AB46B94)** -- "Wider Community -- 2026" horizontal stats bar

### Visual Description

- Section header: "Wider Community -- 2026" in large serif type
- Subtitle hierarchy text: "Community > Projects > Teams > Skills"
- Three stat blocks in a horizontal row, separated by thin vertical dividers (1px, silver/20%)
- Each stat block:
  - Large number: "70+", "77", "80%"
  - Label beneath: "Total Members", "Concurrent Projects", "Retention"
- Below the stats row: a detailed skills/capabilities list in two columns with bullet points
- Clean horizontal layout with generous spacing between stat blocks

### Data Structure

```typescript
interface StatItem {
  id: string;
  value: number | string;
  label: string;
  prefix?: string;
  suffix?: string;
}

interface DetailItem {
  category: string;
  items: string[];
}

interface StatsRowData {
  title: string;
  subtitle?: string;
  hierarchy?: string;         // e.g., "Community > Projects > Teams > Skills"
  stats: StatItem[];
  details?: DetailItem[];     // two-column detail list below stats
}
```

**SIA sample data:**

```typescript
const siaKeyMetrics: StatsRowData = {
  title: "SIA Performance Metrics",
  subtitle: "KSA-Malaysia Investment Corridor",
  hierarchy: "Pipeline > Deals > Sectors > Impact",
  stats: [
    { id: "trade", value: 18, label: "Annual Bilateral Trade", prefix: "$", suffix: "B+" },
    { id: "deals", value: 150, label: "Deals Facilitated", suffix: "+" },
    { id: "retention", value: 92, label: "Client Retention", suffix: "%" },
    { id: "cycle", value: 6, label: "Month Avg Deal Cycle", suffix: " Mo" },
  ],
  details: [
    {
      category: "Sectors Covered",
      items: [
        "Halal & Food Manufacturing",
        "Healthcare & Pharmaceuticals",
        "Technology & Digital Services",
        "Real Estate & Infrastructure",
      ],
    },
    {
      category: "Capabilities",
      items: [
        "AI-Powered Deal Matching",
        "Regulatory Navigation (KSA & MY)",
        "Due Diligence Support",
        "Cross-border Compliance",
      ],
    },
  ],
};
```

### Color Palette

| Element           | Wider Hex   | SIA Hex   | Token             |
|-------------------|-------------|-----------|-------------------|
| Background        | #000000     | #0A1628   | `bg-navy`         |
| Stat number       | #FFFFFF     | #FFFFFF   | `text-white`      |
| Stat label        | #9CA3AF     | #C0C0C0   | `text-silver`     |
| Divider line      | #FFFFFF/20  | #C0C0C0/20| `border-silver/20`|
| Hierarchy text    | #7B2FF2     | #C8A951   | `text-gold`       |
| Detail bullet     | #7B2FF2     | #C8A951   | `text-gold`       |
| Detail text       | #D1D5DB     | #E8E8E8   | `text-silver-light`|
| Section title     | #FFFFFF     | #FFFFFF   | `text-white`      |

### Typography

| Element          | Font             | Size                          | Weight | Notes             |
|------------------|------------------|-------------------------------|--------|-------------------|
| Section title    | Playfair Display | clamp(2rem, 4vw, 3rem)        | 700    |                   |
| Hierarchy text   | Inter            | 14px                          | 500    | letter-spacing 0.15em, uppercase |
| Stat number      | Inter            | clamp(2.5rem, 4vw, 3.5rem)   | 800    | Uses `text-stat` token |
| Stat label       | Inter            | 14px                          | 500    |                   |
| Detail category  | Inter            | 16px                          | 600    | uppercase         |
| Detail item      | Inter            | 14px                          | 400    | with bullet point |

### Animation

1. **Entry**: Stats row fades in and slides up as a group
   - Duration: 600ms, `easeOut`
   - `useInView` trigger with `once: true, margin: "-100px"`
2. **Number count-up**: Each stat uses `AnimatedCounter` component
   - Duration: 2s with spring physics (bounce: 0)
   - Stagger: 150ms between each stat (left to right)
3. **Divider lines**: Grow from 0 height to full height over 400ms
   - Delay: starts after first stat finishes entry animation
   - Easing: `easeOut`
4. **Details section**: Bullet items stagger in one at a time
   - 80ms delay per item
   - `slideUp` with 400ms duration

### SIA Content Mapping

| Wider Stat         | SIA Equivalent                  |
|--------------------|---------------------------------|
| "70+ Total Members"| "$18B+ Annual Bilateral Trade"  |
| "77 Concurrent Projects" | "150+ Deals Facilitated"  |
| "80% Retention"    | "92% Client Retention"          |
| Skills list        | Sectors + Capabilities list     |

### React Implementation

**Library**: Framer Motion + AnimatedCounter (no chart library needed)

```tsx
// Component path: src/components/dataviz/StatsRow.tsx
// Leverages existing StatsSection pattern from src/sections/StatsSection.tsx
// Layout: flex row with dividers, or CSS grid with border-left on non-first items
// Detail list: CSS grid grid-cols-1 md:grid-cols-2 with <ul> items
```

**Key props:**

```typescript
interface StatsRowProps {
  data: StatsRowData;
  showDividers?: boolean;     // default true
  showDetails?: boolean;      // default true
  counterDuration?: number;   // default 2
  className?: string;
}
```

### Responsive Design

| Breakpoint       | Stat layout          | Detail layout | Stat size |
|------------------|----------------------|---------------|-----------|
| Mobile (<640px)  | 2x2 grid             | Single column | 2rem      |
| Tablet (640-1024px) | Horizontal row    | Two columns   | 2.5rem    |
| Desktop (>1024px)  | Horizontal row     | Two columns   | 3.5rem    |

### Accessibility

- Stats row uses `role="list"` with each stat as `role="listitem"`
- `aria-label` on each stat: "18 billion plus, Annual Bilateral Trade"
- Dividers are decorative: `aria-hidden="true"`
- Detail lists use semantic `<ul>` / `<li>` with heading per category
- `prefers-reduced-motion`: numbers render at final value, no stagger

---

## 4. Skills Heatmap Matrix

### Source Slides

- **Slide 36 (UUID: 2B3ED8A7)** -- "QUD Teams" heatmap
- **Slide 37 (UUID: E5B58C94)** -- "Mujarrad Teams" heatmap

### Visual Description

- A grid/matrix with team members as rows and skill categories as columns
- Cell background intensity indicates proficiency: white (0) through light purple to deep purple (maximum)
- For SIA: white (0) through light gold (#E8D48B) to deep gold (#C8A951) to charcoal (#1C1C1E)
- Row headers (left): team member names or, for SIA, sector/region names
- Column headers (top): skill categories or, for SIA, capability types
- Left side includes a horizontal bar chart showing aggregate proficiency score per row
- Bar chart uses the same gold color scale
- Grid lines: subtle 1px borders in #2A2A2E
- Overall section has a dark/navy background

### Data Structure

```typescript
interface HeatmapCell {
  rowId: string;
  colId: string;
  value: number;       // 0-100 proficiency scale
}

interface HeatmapRow {
  id: string;
  label: string;
  aggregateScore: number;  // sum or average for bar chart
}

interface HeatmapColumn {
  id: string;
  label: string;
  shortLabel?: string;     // for mobile truncation
}

interface HeatmapData {
  title: string;
  subtitle?: string;
  rows: HeatmapRow[];
  columns: HeatmapColumn[];
  cells: HeatmapCell[];
  colorScale: {
    min: string;     // color for value 0
    mid: string;     // color for value 50
    max: string;     // color for value 100
  };
}
```

**SIA sample data:**

```typescript
const siaSectorCapabilityMatrix: HeatmapData = {
  title: "Sector Expertise Matrix",
  subtitle: "Capability Coverage Across Sectors",
  rows: [
    { id: "halal", label: "Halal & Food", aggregateScore: 92 },
    { id: "tech", label: "Technology", aggregateScore: 88 },
    { id: "health", label: "Healthcare", aggregateScore: 78 },
    { id: "realestate", label: "Real Estate", aggregateScore: 85 },
    { id: "finserv", label: "Financial Services", aggregateScore: 82 },
    { id: "energy", label: "Renewable Energy", aggregateScore: 65 },
    { id: "tourism", label: "Tourism", aggregateScore: 58 },
  ],
  columns: [
    { id: "matching", label: "Deal Matching", shortLabel: "Match" },
    { id: "regulatory", label: "Regulatory Nav", shortLabel: "Reg" },
    { id: "duediligence", label: "Due Diligence", shortLabel: "DD" },
    { id: "compliance", label: "Compliance", shortLabel: "Comp" },
    { id: "market", label: "Market Intel", shortLabel: "Intel" },
  ],
  cells: [
    { rowId: "halal", colId: "matching", value: 95 },
    { rowId: "halal", colId: "regulatory", value: 90 },
    { rowId: "halal", colId: "duediligence", value: 88 },
    { rowId: "halal", colId: "compliance", value: 92 },
    { rowId: "halal", colId: "market", value: 85 },
    // ... additional cells for each row x column combination
  ],
  colorScale: {
    min: "#0A1628",    // navy (empty)
    mid: "#A08838",    // gold-dark
    max: "#C8A951",    // gold
  },
};
```

### Color Palette

| Proficiency Level | Wider Hex   | SIA Hex   | Description          |
|-------------------|-------------|-----------|----------------------|
| 0 (none)          | #FFFFFF     | #0A1628   | Navy background      |
| 1-25 (basic)      | #EDE9FE     | #1C1C1E   | Charcoal tint        |
| 26-50 (moderate)  | #C4B5FD     | #A08838   | Gold dark            |
| 51-75 (strong)    | #8B5CF6     | #C8A951   | Gold primary         |
| 76-100 (expert)   | #6D28D9     | #E8D48B   | Gold light (bright)  |
| Grid lines        | #374151     | #2A2A2E   | Subtle dark border   |
| Bar chart fill    | #7B2FF2     | #C8A951   | Gold primary         |
| Bar chart bg      | #1F2937     | #1C1C1E   | Charcoal             |

### Typography

| Element         | Font   | Size    | Weight | Color   |
|-----------------|--------|---------|--------|---------|
| Section title   | Playfair Display | clamp(2rem, 4vw, 3rem) | 700 | #FFFFFF |
| Row header      | Inter  | 13px    | 500    | #C0C0C0 |
| Column header   | Inter  | 11px    | 600    | #C0C0C0 |
| Cell value      | Inter  | 11px    | 700    | #FFFFFF (if value > 50), #9CA3AF (if <= 50) |
| Bar score       | Inter  | 12px    | 600    | #FFFFFF |

### Animation

1. **Entry**: Grid fades in, then cells fill in a wave pattern (top-left to bottom-right)
   - Wave delay: `(rowIndex * 40) + (colIndex * 20)` ms per cell
   - Cell fill: background-color transition from transparent to target, 300ms ease-out
2. **Bar chart**: Bars grow from 0 width to target width over 1s
   - Stagger: 80ms per row
   - Easing: `easeOutQuart`
   - Triggered after grid wave completes (~800ms delay)
3. **Hover on cell**: Tooltip appears with full label: "Halal & Food -- Deal Matching: 95/100"
   - Row and column headers highlight in gold
   - Other cells in same row/column get subtle brightness increase
4. **Hover on bar**: Row highlights, corresponding matrix row brightens

### SIA Content Mapping

| Wider Content           | SIA Equivalent                     |
|-------------------------|------------------------------------|
| QUD/Mujarrad team names | Sector names (Halal, Tech, etc.)   |
| Skill categories        | Capabilities (Matching, Regulatory)|
| Proficiency levels      | Coverage/expertise depth           |
| Aggregate scores        | Overall sector readiness score     |

### React Implementation

**Library**: Custom SVG/CSS Grid + D3 color scale interpolation

```tsx
// Component path: src/components/dataviz/HeatmapMatrix.tsx
import { scaleLinear } from "d3-scale";
import { interpolateRgb } from "d3-interpolate";
import { motion, useInView } from "framer-motion";

// Color scale function:
// const colorScale = scaleLinear<string>()
//   .domain([0, 50, 100])
//   .range(["#0A1628", "#A08838", "#E8D48B"])
//   .interpolate(interpolateRgb);

// Grid: CSS Grid for the matrix, SVG <rect> for bar chart
// Tooltip: shadcn/ui Tooltip or custom positioned div
```

**Key props:**

```typescript
interface HeatmapMatrixProps {
  data: HeatmapData;
  cellSize?: number;          // default 48
  showValues?: boolean;       // show numbers in cells, default false
  showBarChart?: boolean;     // default true
  barChartWidth?: number;     // default 120
  className?: string;
  onCellClick?: (rowId: string, colId: string, value: number) => void;
}
```

### Responsive Design

| Breakpoint       | Behavior                                                 |
|------------------|----------------------------------------------------------|
| Mobile (<640px)  | Horizontal scroll with sticky row headers; bar chart hidden; cell size 36px |
| Tablet (640-1024px) | Full matrix visible; bar chart below instead of left; cell size 40px |
| Desktop (>1024px)  | Full layout with bar chart on left; cell size 48px; hover tooltips active |

### Accessibility

- Matrix uses `role="grid"` with `role="row"` and `role="gridcell"`
- Each cell has `aria-label`: "[Row Label] [Column Label]: [Value] out of 100"
- Color is never the sole indicator -- values can be toggled visible via `showValues`
- Bar chart bars have `role="meter"` with `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`
- High contrast mode: cells use border patterns (dotted/dashed/solid) in addition to color
- Keyboard navigation: arrow keys move between cells, Enter shows tooltip

---

## 5. AI Word Cloud

### Source Slide

- **Slide 32 (UUID: 2C7B7924)** -- Typography-based word cloud

### Visual Description

- Large central text "ARTIFICIAL INTELLIGENCE" in saturated purple (SIA: "STRATEGIC INTEGRATION" in gold)
- Surrounding words scattered at various positions, sizes, and opacity levels
- Words overlap slightly, creating a dense typographic texture
- Color scheme: shades of purple and gray (SIA: shades of gold and silver)
- No connecting lines or shapes -- purely typographic composition
- Dark/navy background

**Original word list with approximate sizing tiers:**

| Tier | Size  | Words (Wider)                              |
|------|-------|--------------------------------------------|
| XL   | 48-64px | ARTIFICIAL INTELLIGENCE                  |
| L    | 28-36px | DATA, CLOUD, TECHNOLOGY, MACHINES        |
| M    | 18-24px | SMART, WORLDWIDE, AUTOMATE, ORGANIZATION, STATISTICS |
| S    | 12-16px | SOLUTIONS, COMPUTER, ROBOT, PROCESS, SEO, IDENTITY, REALITY |

### Data Structure

```typescript
interface WordCloudItem {
  text: string;
  weight: number;        // 1-100, determines size and prominence
  color?: string;        // optional override, else derived from weight
}

interface WordCloudData {
  title?: string;
  centralPhrase: string;
  words: WordCloudItem[];
  colorRange: [string, string];  // [low weight color, high weight color]
}
```

**SIA sample data:**

```typescript
const siaWordCloud: WordCloudData = {
  centralPhrase: "STRATEGIC INTEGRATION",
  words: [
    { text: "DEAL FACILITATION", weight: 95 },
    { text: "KSA-MALAYSIA", weight: 90 },
    { text: "HALAL ECONOMY", weight: 85 },
    { text: "INVESTMENT", weight: 82 },
    { text: "CROSS-BORDER", weight: 78 },
    { text: "AI MATCHING", weight: 75 },
    { text: "DUE DILIGENCE", weight: 70 },
    { text: "REGULATORY", weight: 68 },
    { text: "COMPLIANCE", weight: 65 },
    { text: "VISION 2030", weight: 60 },
    { text: "BILATERAL", weight: 55 },
    { text: "SHARIAH", weight: 50 },
    { text: "FINTECH", weight: 48 },
    { text: "INFRASTRUCTURE", weight: 45 },
    { text: "HEALTHCARE", weight: 42 },
    { text: "TECHNOLOGY", weight: 40 },
    { text: "REAL ESTATE", weight: 38 },
    { text: "TOURISM", weight: 35 },
    { text: "ENERGY", weight: 32 },
    { text: "MANUFACTURING", weight: 30 },
  ],
  colorRange: ["#C0C0C0", "#C8A951"],  // silver to gold
};
```

### Color Palette

| Weight Range | Wider Hex   | SIA Hex   | Description       |
|--------------|-------------|-----------|-------------------|
| 80-100       | #7B2FF2     | #C8A951   | Gold (primary)    |
| 60-79        | #A855F7     | #E8D48B   | Gold light        |
| 40-59        | #C4B5FD     | #C0C0C0   | Silver            |
| 20-39        | #6B7280     | #9CA3AF   | Muted gray        |
| Background   | #000000     | #0A1628   | Navy              |

### Typography

| Element         | Font   | Size calculation                        | Weight |
|-----------------|--------|-----------------------------------------|--------|
| Central phrase  | Inter  | 48-64px (clamp(3rem, 5vw, 4rem))       | 900    |
| Weight 80-100   | Inter  | 28-36px                                 | 700    |
| Weight 60-79    | Inter  | 18-24px                                 | 600    |
| Weight 40-59    | Inter  | 14-18px                                 | 500    |
| Weight 20-39    | Inter  | 12-14px                                 | 400    |

**Size formula:** `fontSize = 12 + (weight / 100) * 52` (px)

### Animation

1. **Entry**: Central phrase fades in first (400ms), then surrounding words appear in random order
   - Each word: fade-in + slight scale (0.8 to 1.0), 300ms, random delay 0-1500ms
   - Easing: `easeOut`
2. **Ambient motion**: Words have subtle floating animation
   - Each word oscillates position by 2-4px on both axes
   - Period: 4-8s (randomized per word)
   - Uses CSS `animation` with randomized `animation-duration` and `animation-delay`
3. **Hover on word**: Word scales to 1.1x, color shifts to pure gold (#C8A951), other words dim to 50% opacity
   - Transition: 200ms ease-out
4. **Scroll parallax**: Words at different z-depths move at slightly different scroll rates (optional enhancement)

### SIA Content Mapping

| Wider Words              | SIA Equivalents                      |
|--------------------------|--------------------------------------|
| ARTIFICIAL INTELLIGENCE  | STRATEGIC INTEGRATION                |
| DATA, CLOUD              | DEAL FACILITATION, KSA-MALAYSIA      |
| TECHNOLOGY, MACHINES     | INVESTMENT, HALAL ECONOMY            |
| SMART, AUTOMATE          | AI MATCHING, CROSS-BORDER            |
| Remaining smaller words  | Sector and capability keywords       |

### React Implementation

**Library**: Custom positioned divs with CSS transforms (no external word cloud library for performance)

```tsx
// Component path: src/components/dataviz/WordCloud.tsx
import { motion, useInView } from "framer-motion";

// Layout algorithm: pre-computed positions (not runtime spiral placement)
// Each word is an absolutely positioned <motion.span> inside a relative container
// Positions defined as percentage offsets from center
// Collision avoidance: manual positioning per breakpoint, or use a simple force-directed
// layout computed once on mount

// Alternative: d3-cloud for automatic placement, rendered to positioned divs
// import cloud from "d3-cloud";
```

**Key props:**

```typescript
interface WordCloudProps {
  data: WordCloudData;
  width?: number;             // container width, default 100%
  height?: number;            // container height, default 400
  enableFloat?: boolean;      // ambient floating animation, default true
  enableHover?: boolean;      // hover interaction, default true
  className?: string;
  onWordClick?: (word: WordCloudItem) => void;
}
```

### Responsive Design

| Breakpoint       | Behavior                                                  |
|------------------|-----------------------------------------------------------|
| Mobile (<640px)  | Reduce to top 10 words; central phrase 2rem; container height 250px |
| Tablet (640-1024px) | Show top 15 words; central phrase 3rem; container height 350px |
| Desktop (>1024px)  | All words; central phrase 4rem; container height 400px; hover + float active |

### Accessibility

- Container has `role="img"` with `aria-label` describing the cloud theme
- Each word is `aria-hidden="true"` (decorative), with a hidden `<p>` providing a text list of all words
- Alternative: render as a styled unordered list for screen readers, visually positioned as cloud
- `prefers-reduced-motion`: disable floating animation, instant fade-in for all words

---

## 6. Problem Cards Layout

### Source Slides

- **Slide 7 (UUID: CBCAFEA0)** -- "Problem" header with three issues and black hole visual
- **Slide 19 (UUID: D396A390)** -- "The Problem: Three Critical Gaps" with three white cards

### Visual Description

**Slide 7 layout:**
- Left side: "Problem" header text + three bullet-pointed issues stacked vertically
- Right side: abstract dark visual (black hole / vortex imagery)
- Dark background, white text
- Simple, text-forward layout

**Slide 19 layout (primary implementation target):**
- Section title: "The Problem: Three Critical Gaps" centered
- Three white/light cards in a horizontal row
- Each card has:
  - Purple/gold top border accent (4px solid)
  - Card number or icon at top
  - Bold card title
  - 2-3 lines of descriptive body text
  - Clean white background with subtle shadow
- Cards are equal width, equal height (flexbox/grid with stretch)
- Generous internal padding (24-32px)

### Data Structure

```typescript
interface ProblemCard {
  id: string;
  number?: number;           // optional numbering (1, 2, 3)
  icon?: React.ComponentType; // optional Lucide icon
  title: string;
  description: string;
  accentColor?: string;      // override per-card accent, default gold
}

interface ProblemSectionData {
  sectionTitle: string;
  subtitle?: string;
  cards: ProblemCard[];
  layout: "row" | "stack";   // row for slide 19 style, stack for slide 7
}
```

**SIA sample data:**

```typescript
const siaProblemCards: ProblemSectionData = {
  sectionTitle: "The Problem: Three Critical Gaps",
  subtitle: "Why cross-border deals between KSA and Malaysia fail",
  cards: [
    {
      id: "inefficiency",
      number: 1,
      title: "Fragmented Deal Infrastructure",
      description:
        "Cross-border transactions between Saudi Arabia and Malaysia rely on disconnected intermediaries, manual processes, and opaque fee structures -- extending deal cycles to 12-18 months.",
    },
    {
      id: "investment",
      number: 2,
      title: "Investment Attraction Crisis",
      description:
        "Despite $18B+ in bilateral trade, most SMEs lack access to structured deal pipelines. 65% of potential cross-border investments never reach the due diligence stage.",
    },
    {
      id: "barriers",
      number: 3,
      title: "Regulatory & Cultural Barriers",
      description:
        "Dual jurisdiction compliance (KSA + Malaysia), Shariah governance requirements, and cultural nuance create barriers that generic advisory firms cannot navigate.",
    },
  ],
  layout: "row",
};
```

### Color Palette

| Element            | Wider Hex   | SIA Hex   | Token             |
|--------------------|-------------|-----------|-------------------|
| Card background    | #FFFFFF     | #FFFFFF   | `bg-white`        |
| Card border-top    | #7B2FF2     | #C8A951   | `border-gold`     |
| Card shadow        | rgba(0,0,0,0.1) | rgba(0,0,0,0.08) | `shadow-card` |
| Card title         | #111111     | #1C1C1E   | `text-charcoal`   |
| Card description   | #4B5563     | #6B7280   | `text-gray-500`   |
| Card number        | #7B2FF2     | #C8A951   | `text-gold`       |
| Section background | #F9FAFB     | #F9FAFB   | `bg-gray-50`      |
| Section title      | #111111     | #1C1C1E   | `text-charcoal`   |

### Typography

| Element          | Font             | Size                         | Weight | Color   |
|------------------|------------------|------------------------------|--------|---------|
| Section title    | Playfair Display | clamp(2rem, 4vw, 3rem)       | 700    | #1C1C1E |
| Section subtitle | Inter            | 18px / 1.125rem              | 400    | #6B7280 |
| Card number      | Inter            | 32px / 2rem                  | 800    | #C8A951 |
| Card title       | Inter            | 20px / 1.25rem               | 700    | #1C1C1E |
| Card description | Inter            | 15px / 0.9375rem             | 400    | #6B7280 |

### Animation

1. **Entry**: Section title fades in, then cards stagger from bottom
   - Title: `fadeIn` 500ms, `easeOut`
   - Cards: `slideUp` with 150ms stagger per card
   - Duration: 600ms each, `easeOut`
   - `useInView` trigger
2. **Hover**: Card lifts with `translateY(-6px)` and shadow transitions to `card-hover`
   - Top border color intensifies (gold -> gold-light: #E8D48B)
   - Transition: 300ms ease-out
3. **Gold accent line**: Top border animates from width 0 to full card width
   - 400ms, easeOut, triggered on card entry

### SIA Content Mapping

| Wider Card                           | SIA Card                            |
|--------------------------------------|-------------------------------------|
| "Inefficiencies of traditional model"| "Fragmented Deal Infrastructure"    |
| "The Investment attraction crisis"   | "Investment Attraction Crisis"      |
| "Barriers to government projects"    | "Regulatory & Cultural Barriers"    |

### React Implementation

**Library**: Pure Tailwind CSS + Framer Motion

```tsx
// Component path: src/components/dataviz/ProblemCards.tsx
import { motion, useInView } from "framer-motion";

// Layout: grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8
// Card: bg-white rounded-xl shadow-card p-6 lg:p-8 border-t-4 border-gold
// Hover: hover:-translate-y-1.5 hover:shadow-card-hover transition-all duration-300
```

**Key props:**

```typescript
interface ProblemCardsProps {
  data: ProblemSectionData;
  accentColor?: string;       // default "#C8A951"
  sectionBackground?: string; // default "bg-gray-50"
  staggerDelay?: number;      // default 0.15
  className?: string;
}
```

### Responsive Design

| Breakpoint       | Columns | Card padding | Card min-height |
|------------------|---------|--------------|-----------------|
| Mobile (<640px)  | 1       | 20px         | auto            |
| Tablet (640-1024px) | 2 (third card spans full) | 24px | 200px |
| Desktop (>1024px)  | 3     | 32px         | 240px           |

### Accessibility

- Section uses `<section>` with `aria-labelledby` pointing to the section title `<h2>`
- Cards are `<article>` elements with their own heading hierarchy (`<h3>`)
- Card numbers are decorative: `aria-hidden="true"`
- Focus-visible: 2px gold outline offset
- Color contrast: charcoal (#1C1C1E) on white (#FFFFFF) = 17.5:1 (passes AAA)
- Gold (#C8A951) on white (#FFFFFF) = 2.8:1 -- used decoratively only, never for essential text

---

## Cross-Cutting Implementation Notes

### Shared Dependencies

All data visualization components share these imports:

```typescript
// Animation
import { motion, useInView } from "framer-motion";
import { AnimatedCounter } from "@/components/effects/AnimatedCounter";

// Theming
import { cn } from "@/lib/utils";

// Charts (where applicable)
import { ChartContainer, ChartConfig } from "@/components/ui/chart";
import * as Recharts from "recharts";
```

### SIA Brand Color Tokens (from tailwind.config.js)

```
gold.DEFAULT:  #C8A951
gold.dark:     #A08838
gold.light:    #E8D48B
charcoal:      #1C1C1E
silver.DEFAULT:#C0C0C0
silver.light:  #E8E8E8
navy:          #0A1628
```

### Font Stack

- Headings: `Playfair Display` (serif) -- 700 weight
- Body/UI: `Inter` (sans) -- 400, 500, 600, 700, 800 weights
- Stats/Numbers: `Inter` -- 800 weight with `text-stat` token

### Global Animation Defaults

| Property         | Value                                  |
|------------------|----------------------------------------|
| Scroll trigger   | `useInView({ once: true, margin: "-100px" })` |
| Entry duration   | 600ms                                  |
| Entry easing     | `easeOut` / `cubic-bezier(0.0, 0.0, 0.2, 1)` |
| Stagger delay    | 100-150ms per item                     |
| Counter duration | 2s with spring (bounce: 0)             |
| Hover transition | 200-300ms ease-out                     |
| Reduced motion   | Respect `prefers-reduced-motion: reduce`|
