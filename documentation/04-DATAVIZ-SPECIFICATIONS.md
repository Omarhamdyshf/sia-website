# 04 - Data Visualization Technical Specifications

Implementation-level specifications for all chart, stats, and data visual components.
Stack: React 18 + TypeScript, Recharts, D3 (scales/interpolation), Framer Motion, Tailwind CSS.

---

## Table of Contents

1. [TypeScript Data Interfaces](#1-typescript-data-interfaces)
2. [SVG/Canvas Rendering Approach](#2-svgcanvas-rendering-approach)
3. [Animation Timing & Easing](#3-animation-timing--easing)
4. [Color Scale Functions](#4-color-scale-functions)
5. [Responsive Breakpoint Behaviors](#5-responsive-breakpoint-behaviors)
6. [Sample Data for SIA Context](#6-sample-data-for-sia-context)
7. [Component API Design](#7-component-api-design)

---

## 1. TypeScript Data Interfaces

### Shared Base Types

```typescript
// src/types/dataviz.ts

/** Base interface for all data visualization components */
export interface DataVizBaseProps {
  className?: string;
  animationDuration?: number;   // seconds, default varies per component
  disableAnimation?: boolean;   // respects prefers-reduced-motion automatically
}

/** Prefix/suffix formatting for stat values */
export interface StatFormat {
  prefix?: string;    // e.g., "$"
  suffix?: string;    // e.g., "B+", "%", " Mo"
  decimals?: number;  // decimal places, default 0
}
```

### Donut/Ring Chart Types

```typescript
// src/types/donut-chart.ts

export interface DonutSegment {
  id: string;
  label: string;
  value: number;          // percentage 0-100
  color: string;          // hex color
}

export interface DonutChartData {
  id: string;
  title: string;
  subtitle?: string;
  segments: DonutSegment[];
  centerLabel?: string;
  centerSubLabel?: string;
  footnote?: string;
}

export interface DonutChartProps extends DataVizBaseProps {
  data: DonutChartData;
  size?: number;                // outer diameter in px, default 240
  ringThickness?: number;       // stroke width in px, default 28
  padAngle?: number;            // gap between segments in radians, default 0.04
  innerRadiusRatio?: number;    // inner/outer radius ratio, default 0.65
  showLegend?: boolean;         // default true
  legendPosition?: "bottom" | "right";  // default "bottom"
  onSegmentClick?: (segment: DonutSegment) => void;
  onSegmentHover?: (segment: DonutSegment | null) => void;
}

export interface DonutChartGroupProps extends DataVizBaseProps {
  charts: DonutChartData[];
  layout?: "row" | "grid";      // default "row"
  gap?: number;                  // gap in px, default 48
  statsRow?: StatsRowItem[];     // optional stats beneath the charts
}

interface StatsRowItem {
  label: string;
  value: string;
}
```

### Metrics Grid (Teams Distribution) Types

```typescript
// src/types/metrics-grid.ts

export interface MetricCard {
  id: string;
  value: number | string;
  department: string;
  subtitle: string;
  featured?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface MetricsGridData {
  title: string;
  subtitle?: string;
  cards: MetricCard[];
}

export interface MetricsGridProps extends DataVizBaseProps {
  data: MetricsGridData;
  columns?: 2 | 3 | 4;           // default 3
  staggerDelay?: number;          // seconds between card entries, default 0.1
  enableHover?: boolean;          // default true
  counterDuration?: number;       // seconds, default 2
  onCardClick?: (card: MetricCard) => void;
}
```

### Stats Row Types

```typescript
// src/types/stats-row.ts

export interface StatItem extends StatFormat {
  id: string;
  value: number;
  label: string;
  description?: string;
}

export interface DetailItem {
  category: string;
  items: string[];
}

export interface StatsRowData {
  title: string;
  subtitle?: string;
  hierarchy?: string;
  stats: StatItem[];
  details?: DetailItem[];
}

export interface StatsRowProps extends DataVizBaseProps {
  data: StatsRowData;
  showDividers?: boolean;         // default true
  showDetails?: boolean;          // default true
  dividerColor?: string;          // default "silver/20"
  counterDuration?: number;       // default 2
  staggerDelay?: number;          // default 0.15
}
```

### Heatmap Matrix Types

```typescript
// src/types/heatmap.ts

export interface HeatmapCell {
  rowId: string;
  colId: string;
  value: number;             // 0-100
}

export interface HeatmapRow {
  id: string;
  label: string;
  aggregateScore: number;    // 0-100
}

export interface HeatmapColumn {
  id: string;
  label: string;
  shortLabel?: string;
}

export interface HeatmapColorScale {
  min: string;       // hex for value 0
  mid: string;       // hex for value 50
  max: string;       // hex for value 100
}

export interface HeatmapData {
  title: string;
  subtitle?: string;
  rows: HeatmapRow[];
  columns: HeatmapColumn[];
  cells: HeatmapCell[];
  colorScale: HeatmapColorScale;
}

export interface HeatmapMatrixProps extends DataVizBaseProps {
  data: HeatmapData;
  cellSize?: number;              // px, default 48
  cellGap?: number;               // px, default 1
  showValues?: boolean;           // show numbers in cells, default false
  showBarChart?: boolean;         // aggregate bar chart, default true
  barChartWidth?: number;         // px, default 120
  barChartPosition?: "left" | "right";  // default "left"
  enableTooltip?: boolean;        // default true
  onCellClick?: (rowId: string, colId: string, value: number) => void;
  onRowHover?: (rowId: string | null) => void;
}
```

### Word Cloud Types

```typescript
// src/types/word-cloud.ts

export interface WordCloudItem {
  text: string;
  weight: number;            // 1-100
  color?: string;            // optional per-word override
  url?: string;              // optional link target
}

export interface WordCloudData {
  centralPhrase: string;
  words: WordCloudItem[];
  colorRange: [string, string];   // [low, high] weight colors
}

export interface WordCloudProps extends DataVizBaseProps {
  data: WordCloudData;
  width?: number | string;        // default "100%"
  height?: number;                // default 400
  fontFamily?: string;            // default "Inter"
  minFontSize?: number;           // default 12
  maxFontSize?: number;           // default 64
  enableFloat?: boolean;          // ambient animation, default true
  enableHover?: boolean;          // hover effects, default true
  rotationRange?: [number, number]; // degrees, default [0, 0] (no rotation)
  onWordClick?: (word: WordCloudItem) => void;
}
```

### Problem Cards Types

```typescript
// src/types/problem-cards.ts

export interface ProblemCard {
  id: string;
  number?: number;
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  accentColor?: string;
}

export interface ProblemSectionData {
  sectionTitle: string;
  subtitle?: string;
  cards: ProblemCard[];
  layout: "row" | "stack";
}

export interface ProblemCardsProps extends DataVizBaseProps {
  data: ProblemSectionData;
  accentColor?: string;           // default "#C8A951"
  sectionBackground?: string;     // Tailwind class, default "bg-gray-50"
  staggerDelay?: number;          // default 0.15
  enableHover?: boolean;          // default true
  cardVariant?: "elevated" | "flat" | "bordered";  // default "elevated"
}
```

---

## 2. SVG/Canvas Rendering Approach

### Decision Matrix

| Component         | Renderer      | Rationale                                    |
|-------------------|---------------|----------------------------------------------|
| Donut Chart       | SVG (Recharts)| Recharts PieChart renders SVG; smooth arc animations via Recharts `animationBegin`/`animationDuration` |
| Metrics Grid      | HTML/CSS      | Simple card layout, no graphical rendering needed |
| Stats Row         | HTML/CSS      | Text and dividers only                       |
| Heatmap Matrix    | HTML/CSS Grid + SVG bars | CSS Grid for the matrix cells (background-color driven), SVG `<rect>` for the bar chart |
| Word Cloud        | HTML (absolute positioned) | DOM elements for text rendering quality; CSS transforms for positioning |
| Problem Cards     | HTML/CSS      | Standard card layout                         |

### SVG Specifics (Donut Chart)

```tsx
// Recharts PieChart configuration
<PieChart width={size} height={size}>
  <Pie
    data={transformedSegments}
    cx="50%"
    cy="50%"
    innerRadius={size / 2 - ringThickness}
    outerRadius={size / 2}
    paddingAngle={padAngle * (180 / Math.PI)}  // convert radians to degrees
    dataKey="value"
    startAngle={90}       // start from 12 o'clock
    endAngle={-270}       // clockwise
    animationBegin={0}
    animationDuration={1500}
    animationEasing="ease-out"
  >
    {segments.map((seg) => (
      <Cell key={seg.id} fill={seg.color} stroke="none" />
    ))}
  </Pie>
</PieChart>
```

Custom center label rendered as an overlay `<div>` positioned absolutely at the chart center, not as an SVG `<text>` element (better typography control).

### SVG Specifics (Heatmap Bar Chart)

```tsx
// Bar chart rendered as inline SVG next to the CSS grid
<svg width={barChartWidth} height={rows.length * (cellSize + cellGap)}>
  {rows.map((row, i) => (
    <g key={row.id}>
      {/* Background track */}
      <rect
        x={0}
        y={i * (cellSize + cellGap)}
        width={barChartWidth}
        height={cellSize}
        fill="#1C1C1E"
        rx={4}
      />
      {/* Filled bar */}
      <motion.rect
        x={0}
        y={i * (cellSize + cellGap)}
        width={0}
        height={cellSize}
        fill="#C8A951"
        rx={4}
        animate={{ width: (row.aggregateScore / 100) * barChartWidth }}
        transition={{ duration: 1, delay: i * 0.08, ease: "easeOut" }}
      />
      {/* Score label */}
      <text
        x={(row.aggregateScore / 100) * barChartWidth - 8}
        y={i * (cellSize + cellGap) + cellSize / 2}
        fill="#FFFFFF"
        fontSize={12}
        fontWeight={600}
        dominantBaseline="central"
        textAnchor="end"
      >
        {row.aggregateScore}
      </text>
    </g>
  ))}
</svg>
```

### Canvas Considerations

Canvas is not used for any component. Rationale:
- All components have fewer than 200 visual elements; SVG/HTML performance is sufficient
- SVG/HTML provides better accessibility (DOM nodes for screen readers)
- Recharts renders to SVG natively
- If the heatmap grows beyond 50x20 cells (1000+), consider migrating to Canvas with `OffscreenCanvas` for paint performance

---

## 3. Animation Timing & Easing

### Global Animation Constants

```typescript
// src/constants/animation.ts

export const ANIMATION = {
  /** Scroll-trigger IntersectionObserver config */
  inView: {
    once: true,
    margin: "-100px",      // trigger 100px before element enters viewport
  },

  /** Standard entry animation */
  entry: {
    duration: 0.6,         // seconds
    ease: [0.0, 0.0, 0.2, 1.0],  // easeOut (CSS cubic-bezier)
  },

  /** Slide-up variant */
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    duration: 0.6,
    ease: [0.0, 0.0, 0.2, 1.0],
  },

  /** Fade-in variant */
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    duration: 0.5,
    ease: "easeOut",
  },

  /** Stagger children */
  stagger: {
    default: 0.1,          // seconds between children
    fast: 0.06,
    slow: 0.15,
  },

  /** Counter animation (AnimatedCounter) */
  counter: {
    duration: 2,           // seconds
    springConfig: {
      bounce: 0,
      duration: 2000,      // ms (Framer Motion spring)
    },
  },

  /** Hover transitions */
  hover: {
    duration: 0.2,         // seconds
    ease: "easeOut",
  },

  /** Reduced motion: instant render */
  reducedMotion: {
    duration: 0,
    delay: 0,
  },
} as const;
```

### Per-Component Timing

| Component      | Entry     | Stagger  | Counter  | Hover    | Special                    |
|----------------|-----------|----------|----------|----------|----------------------------|
| Donut Chart    | 600ms     | 200ms    | 1500ms   | 200ms    | Arc fill synced with counter |
| Metrics Grid   | 600ms     | 100ms    | 2000ms   | 300ms    | Featured card pulse: 3s loop |
| Stats Row      | 600ms     | 150ms    | 2000ms   | --       | Divider grow: 400ms          |
| Heatmap        | 500ms     | wave*    | --       | 200ms    | Bar grow: 1000ms, 80ms stagger |
| Word Cloud     | 400ms(central) | random 0-1500ms | -- | 200ms | Float: 4-8s per word |
| Problem Cards  | 600ms     | 150ms    | --       | 300ms    | Border width: 400ms          |

*Heatmap wave: `delay = (rowIndex * 40) + (colIndex * 20)` ms

### Easing Functions Reference

```typescript
// Named easing curves used across components
export const EASING = {
  /** Standard deceleration - most entry animations */
  easeOut: [0.0, 0.0, 0.2, 1.0],

  /** Emphasized deceleration - counters, arc fills */
  easeOutQuart: [0.25, 1.0, 0.5, 1.0],

  /** Standard acceleration - exit animations */
  easeIn: [0.4, 0.0, 1.0, 1.0],

  /** Standard symmetrical - hover transitions */
  easeInOut: [0.4, 0.0, 0.2, 1.0],

  /** Spring (Framer Motion config, not CSS) */
  spring: { type: "spring", bounce: 0, duration: 2 },
} as const;
```

### Reduced Motion Handling

```typescript
// src/hooks/useReducedMotion.ts
import { useReducedMotion } from "framer-motion";

export function useAnimationConfig(overrides?: Partial<typeof ANIMATION.entry>) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return {
      initial: {},
      animate: {},
      transition: { duration: 0 },
    };
  }

  return {
    initial: ANIMATION.slideUp.initial,
    animate: ANIMATION.slideUp.animate,
    transition: {
      duration: ANIMATION.entry.duration,
      ease: ANIMATION.entry.ease,
      ...overrides,
    },
  };
}
```

---

## 4. Color Scale Functions

### Brand Color Tokens

```typescript
// src/constants/colors.ts

export const SIA_COLORS = {
  gold: {
    DEFAULT: "#C8A951",
    dark: "#A08838",
    light: "#E8D48B",
  },
  charcoal: "#1C1C1E",
  silver: {
    DEFAULT: "#C0C0C0",
    light: "#E8E8E8",
  },
  navy: "#0A1628",
  white: "#FFFFFF",
  muted: "#9CA3AF",
  grayDark: "#2A2A2E",
} as const;
```

### Heatmap Color Scale

```typescript
// src/utils/color-scale.ts
import { scaleLinear } from "d3-scale";
import { interpolateRgb } from "d3-interpolate";

/**
 * Creates a color interpolation function for heatmap cells.
 * Input: value 0-100
 * Output: hex color string
 */
export function createHeatmapColorScale(
  colorScale: { min: string; mid: string; max: string }
) {
  return scaleLinear<string>()
    .domain([0, 50, 100])
    .range([colorScale.min, colorScale.mid, colorScale.max])
    .interpolate(interpolateRgb)
    .clamp(true);
}

// Default SIA heatmap scale
export const siaHeatmapScale = createHeatmapColorScale({
  min: "#0A1628",    // navy
  mid: "#A08838",    // gold-dark
  max: "#E8D48B",    // gold-light
});

// Usage: siaHeatmapScale(75) => "#C8A951" (approx)
```

### Word Cloud Color Scale

```typescript
/**
 * Creates a color interpolation function for word cloud weights.
 * Input: weight 1-100
 * Output: hex color string
 */
export function createWordColorScale(
  colorRange: [string, string]
): (weight: number) => string {
  const scale = scaleLinear<string>()
    .domain([1, 100])
    .range(colorRange)
    .interpolate(interpolateRgb)
    .clamp(true);

  return (weight: number) => scale(weight);
}

// Default SIA word cloud scale
export const siaWordColorScale = createWordColorScale(["#C0C0C0", "#C8A951"]);
```

### Donut Segment Colors

```typescript
/**
 * Default color palette for multi-segment donut charts.
 * Used when individual segment colors are not specified.
 */
export const DONUT_PALETTE = [
  "#C8A951",   // gold
  "#A08838",   // gold-dark
  "#E8D48B",   // gold-light
  "#C0C0C0",   // silver
  "#1C1C1E",   // charcoal
  "#E8E8E8",   // silver-light
  "#0A1628",   // navy
] as const;

/**
 * Returns a color from the palette by index, cycling if needed.
 */
export function getDonutColor(index: number): string {
  return DONUT_PALETTE[index % DONUT_PALETTE.length];
}
```

### Opacity Utilities

```typescript
/**
 * Appends alpha channel to a hex color.
 * hexToRgba("#C8A951", 0.4) => "rgba(200, 169, 81, 0.4)"
 */
export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
```

---

## 5. Responsive Breakpoint Behaviors

### Breakpoint Definitions

Aligned with Tailwind CSS defaults:

| Token | Min Width | Typical Devices          |
|-------|-----------|--------------------------|
| `sm`  | 640px     | Large phones, landscape  |
| `md`  | 768px     | Tablets, portrait        |
| `lg`  | 1024px    | Tablets landscape, small laptops |
| `xl`  | 1280px    | Desktops                 |
| `2xl` | 1536px    | Large desktops           |

### Donut Chart Responsive

```typescript
const donutResponsive = {
  base: {    // < 640px
    size: 180,
    ringThickness: 22,
    legendPosition: "bottom" as const,
    groupLayout: "stack",      // single column
  },
  sm: {      // >= 640px
    size: 200,
    ringThickness: 24,
    legendPosition: "bottom" as const,
    groupLayout: "row",
  },
  lg: {      // >= 1024px
    size: 240,
    ringThickness: 28,
    legendPosition: "right" as const,
    groupLayout: "row",
  },
};
```

### Metrics Grid Responsive

```typescript
const metricsResponsive = {
  base: {    // < 640px
    columns: 2,
    cardPadding: "16px",
    numberSize: "2rem",
    gap: "12px",
  },
  sm: {      // >= 640px
    columns: 3,
    cardPadding: "20px",
    numberSize: "2.5rem",
    gap: "16px",
  },
  lg: {      // >= 1024px
    columns: 3,
    cardPadding: "24px",
    numberSize: "3.5rem",
    gap: "24px",
  },
};

// Tailwind implementation:
// grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6
```

### Stats Row Responsive

```typescript
const statsRowResponsive = {
  base: {    // < 640px
    layout: "grid-2x2",          // 2x2 grid instead of horizontal
    statFontSize: "2rem",
    showDividers: false,
    detailColumns: 1,
  },
  sm: {      // >= 640px
    layout: "horizontal",
    statFontSize: "2.5rem",
    showDividers: true,
    detailColumns: 2,
  },
  lg: {      // >= 1024px
    layout: "horizontal",
    statFontSize: "3.5rem",
    showDividers: true,
    detailColumns: 2,
  },
};

// Tailwind implementation:
// Stats: grid grid-cols-2 sm:flex sm:flex-row sm:justify-between
// Details: grid grid-cols-1 sm:grid-cols-2 gap-6
```

### Heatmap Responsive

```typescript
const heatmapResponsive = {
  base: {    // < 640px
    cellSize: 36,
    showBarChart: false,
    showValues: false,
    horizontalScroll: true,    // overflow-x-auto with sticky headers
    stickyRowHeaders: true,
  },
  md: {      // >= 768px
    cellSize: 40,
    showBarChart: true,
    barChartPosition: "bottom" as const,  // below instead of left
    showValues: false,
    horizontalScroll: false,
  },
  lg: {      // >= 1024px
    cellSize: 48,
    showBarChart: true,
    barChartPosition: "left" as const,
    showValues: false,          // shown on hover via tooltip
    horizontalScroll: false,
  },
};

// Mobile scroll container:
// <div className="overflow-x-auto -mx-6 px-6 md:overflow-visible md:mx-0 md:px-0">
```

### Word Cloud Responsive

```typescript
const wordCloudResponsive = {
  base: {    // < 640px
    height: 250,
    maxWords: 10,
    centralFontSize: "2rem",
    enableFloat: false,
    enableHover: false,
  },
  md: {      // >= 768px
    height: 350,
    maxWords: 15,
    centralFontSize: "3rem",
    enableFloat: true,
    enableHover: false,    // no hover on tablet touch
  },
  lg: {      // >= 1024px
    height: 400,
    maxWords: 20,          // all words
    centralFontSize: "4rem",
    enableFloat: true,
    enableHover: true,
  },
};
```

### Problem Cards Responsive

```typescript
const problemCardsResponsive = {
  base: {    // < 640px
    columns: 1,
    cardPadding: "20px",
    cardMinHeight: "auto",
    gap: "16px",
  },
  md: {      // >= 768px
    columns: 2,              // third card spans full width below
    cardPadding: "24px",
    cardMinHeight: "200px",
    gap: "20px",
  },
  lg: {      // >= 1024px
    columns: 3,
    cardPadding: "32px",
    cardMinHeight: "240px",
    gap: "32px",
  },
};

// Tailwind implementation:
// grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-8
// Third card on tablet: md:col-span-2 lg:col-span-1
```

### Responsive Hook

```typescript
// src/hooks/useBreakpoint.ts
import { useState, useEffect } from "react";

type Breakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

const breakpoints: Record<Breakpoint, number> = {
  base: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("base");

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1536) setBp("2xl");
      else if (w >= 1280) setBp("xl");
      else if (w >= 1024) setBp("lg");
      else if (w >= 768) setBp("md");
      else if (w >= 640) setBp("sm");
      else setBp("base");
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return bp;
}
```

---

## 6. Sample Data for SIA Context

### Complete Sample Dataset

```typescript
// src/data/sample-dataviz.ts

import type { DonutChartData } from "@/types/donut-chart";
import type { MetricsGridData } from "@/types/metrics-grid";
import type { StatsRowData } from "@/types/stats-row";
import type { HeatmapData } from "@/types/heatmap";
import type { WordCloudData } from "@/types/word-cloud";
import type { ProblemSectionData } from "@/types/problem-cards";

// ─── DONUT CHARTS ────────────────────────────────────────────

export const corridorShareChart: DonutChartData = {
  id: "corridor-share",
  title: "KSA-Malaysia Trade Corridor",
  subtitle: "SIA-Facilitated Share",
  segments: [
    { id: "sia", label: "SIA Facilitated", value: 35, color: "#C8A951" },
    { id: "other", label: "Other Channels", value: 65, color: "#1C1C1E" },
  ],
  centerLabel: "35%",
  centerSubLabel: "SIA Share",
  footnote: "Of $18B+ Annual Bilateral Trade",
};

export const dealSuccessChart: DonutChartData = {
  id: "deal-success",
  title: "Deal Outcomes",
  segments: [
    { id: "closed", label: "Successfully Closed", value: 78, color: "#C8A951" },
    { id: "progress", label: "In Progress", value: 14, color: "#A08838" },
    { id: "withdrawn", label: "Withdrawn", value: 8, color: "#1C1C1E" },
  ],
  centerLabel: "78%",
  centerSubLabel: "Close Rate",
};

export const sectorDistributionChart: DonutChartData = {
  id: "sector-distribution",
  title: "Deal Distribution by Sector",
  segments: [
    { id: "halal", label: "Halal & Food", value: 28, color: "#C8A951" },
    { id: "tech", label: "Technology", value: 22, color: "#A08838" },
    { id: "health", label: "Healthcare", value: 18, color: "#E8D48B" },
    { id: "realestate", label: "Real Estate", value: 15, color: "#C0C0C0" },
    { id: "other", label: "Other Sectors", value: 17, color: "#2A2A2E" },
  ],
  centerLabel: "8",
  centerSubLabel: "Sectors",
};

// ─── METRICS GRID ────────────────────────────────────────────

export const siaMetrics: MetricsGridData = {
  title: "SIA by the Numbers",
  subtitle: "KSA-Malaysia Investment Corridor Performance",
  cards: [
    {
      id: "deals",
      value: "150+",
      department: "DEALS FACILITATED",
      subtitle: "Cross-border transactions since inception",
      featured: true,
    },
    {
      id: "sectors",
      value: 8,
      department: "SECTORS",
      subtitle: "Industry verticals covered",
    },
    {
      id: "partners",
      value: "50+",
      department: "PARTNERS",
      subtitle: "Institutional relationships active",
    },
    {
      id: "jurisdictions",
      value: 2,
      department: "JURISDICTIONS",
      subtitle: "KSA & Malaysia dual coverage",
    },
    {
      id: "cycle",
      value: 6,
      department: "MONTHS AVG",
      subtitle: "Deal cycle time (vs 18 typical)",
    },
    {
      id: "retention",
      value: "92%",
      department: "RETENTION",
      subtitle: "Clients return for repeat deals",
    },
  ],
};

// ─── STATS ROW ───────────────────────────────────────────────

export const siaStatsRow: StatsRowData = {
  title: "Performance Metrics",
  subtitle: "KSA-Malaysia Investment Corridor",
  hierarchy: "Pipeline > Deals > Sectors > Impact",
  stats: [
    { id: "trade", value: 18, label: "Annual Bilateral Trade", prefix: "$", suffix: "B+" },
    { id: "deals", value: 150, label: "Deals Facilitated", suffix: "+" },
    { id: "retention", value: 92, label: "Client Retention", suffix: "%" },
    { id: "cycle", value: 6, label: "Month Avg Deal Cycle" },
  ],
  details: [
    {
      category: "Sectors Covered",
      items: [
        "Halal & Food Manufacturing",
        "Healthcare & Pharmaceuticals",
        "Technology & Digital Services",
        "Real Estate & Infrastructure",
        "Financial Services (Islamic Finance)",
        "Renewable Energy",
        "Tourism & Hospitality",
        "Education & Training",
      ],
    },
    {
      category: "Core Capabilities",
      items: [
        "AI-Powered Deal Matching",
        "Regulatory Navigation (Dual Jurisdiction)",
        "Due Diligence & Compliance Support",
        "Market Intelligence & Research",
        "Shariah Governance Advisory",
        "Cross-border Legal Structuring",
        "Post-deal Integration Support",
        "Government Relations (MIDA/SAGIA)",
      ],
    },
  ],
};

// ─── HEATMAP ─────────────────────────────────────────────────

export const siaHeatmap: HeatmapData = {
  title: "Sector Expertise Matrix",
  subtitle: "Capability depth across sectors and services",
  rows: [
    { id: "halal", label: "Halal & Food", aggregateScore: 92 },
    { id: "tech", label: "Technology", aggregateScore: 88 },
    { id: "health", label: "Healthcare", aggregateScore: 78 },
    { id: "realestate", label: "Real Estate", aggregateScore: 85 },
    { id: "finserv", label: "Financial Services", aggregateScore: 82 },
    { id: "energy", label: "Renewable Energy", aggregateScore: 65 },
    { id: "tourism", label: "Tourism & Hospitality", aggregateScore: 58 },
  ],
  columns: [
    { id: "matching", label: "Deal Matching", shortLabel: "Match" },
    { id: "regulatory", label: "Regulatory Navigation", shortLabel: "Reg" },
    { id: "duediligence", label: "Due Diligence", shortLabel: "DD" },
    { id: "compliance", label: "Compliance", shortLabel: "Comp" },
    { id: "market", label: "Market Intel", shortLabel: "Intel" },
  ],
  cells: [
    // Halal & Food (strongest sector)
    { rowId: "halal", colId: "matching", value: 95 },
    { rowId: "halal", colId: "regulatory", value: 90 },
    { rowId: "halal", colId: "duediligence", value: 88 },
    { rowId: "halal", colId: "compliance", value: 92 },
    { rowId: "halal", colId: "market", value: 95 },

    // Technology
    { rowId: "tech", colId: "matching", value: 92 },
    { rowId: "tech", colId: "regulatory", value: 82 },
    { rowId: "tech", colId: "duediligence", value: 90 },
    { rowId: "tech", colId: "compliance", value: 85 },
    { rowId: "tech", colId: "market", value: 90 },

    // Healthcare
    { rowId: "health", colId: "matching", value: 80 },
    { rowId: "health", colId: "regulatory", value: 85 },
    { rowId: "health", colId: "duediligence", value: 75 },
    { rowId: "health", colId: "compliance", value: 78 },
    { rowId: "health", colId: "market", value: 72 },

    // Real Estate
    { rowId: "realestate", colId: "matching", value: 88 },
    { rowId: "realestate", colId: "regulatory", value: 90 },
    { rowId: "realestate", colId: "duediligence", value: 85 },
    { rowId: "realestate", colId: "compliance", value: 82 },
    { rowId: "realestate", colId: "market", value: 80 },

    // Financial Services
    { rowId: "finserv", colId: "matching", value: 85 },
    { rowId: "finserv", colId: "regulatory", value: 88 },
    { rowId: "finserv", colId: "duediligence", value: 80 },
    { rowId: "finserv", colId: "compliance", value: 90 },
    { rowId: "finserv", colId: "market", value: 68 },

    // Renewable Energy
    { rowId: "energy", colId: "matching", value: 70 },
    { rowId: "energy", colId: "regulatory", value: 65 },
    { rowId: "energy", colId: "duediligence", value: 60 },
    { rowId: "energy", colId: "compliance", value: 62 },
    { rowId: "energy", colId: "market", value: 68 },

    // Tourism & Hospitality
    { rowId: "tourism", colId: "matching", value: 62 },
    { rowId: "tourism", colId: "regulatory", value: 55 },
    { rowId: "tourism", colId: "duediligence", value: 58 },
    { rowId: "tourism", colId: "compliance", value: 52 },
    { rowId: "tourism", colId: "market", value: 65 },
  ],
  colorScale: {
    min: "#0A1628",
    mid: "#A08838",
    max: "#E8D48B",
  },
};

// ─── WORD CLOUD ──────────────────────────────────────────────

export const siaWordCloud: WordCloudData = {
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
  colorRange: ["#C0C0C0", "#C8A951"],
};

// ─── PROBLEM CARDS ───────────────────────────────────────────

export const siaProblemCards: ProblemSectionData = {
  sectionTitle: "The Problem: Three Critical Gaps",
  subtitle: "Why cross-border deals between KSA and Malaysia fail",
  cards: [
    {
      id: "inefficiency",
      number: 1,
      title: "Fragmented Deal Infrastructure",
      description:
        "Cross-border transactions rely on disconnected intermediaries, manual processes, and opaque fee structures -- extending deal cycles to 12-18 months and inflating costs by 30-40%.",
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
        "Dual jurisdiction compliance (KSA + Malaysia), Shariah governance requirements, and cultural nuances create barriers that generic advisory firms cannot effectively navigate.",
    },
  ],
  layout: "row",
};
```

---

## 7. Component API Design

### Component File Structure

```
src/
  components/
    dataviz/
      DonutChart.tsx           # Single donut ring
      DonutChartGroup.tsx      # Side-by-side donut layout
      MetricsGrid.tsx          # Cards grid with counters
      StatsRow.tsx             # Horizontal stats bar
      HeatmapMatrix.tsx        # Grid matrix with bar chart
      WordCloud.tsx            # Typography word cloud
      ProblemCards.tsx          # Problem statement cards
      index.ts                 # Barrel export
  types/
    dataviz.ts                 # Shared base types
    donut-chart.ts
    metrics-grid.ts
    stats-row.ts
    heatmap.ts
    word-cloud.ts
    problem-cards.ts
  constants/
    animation.ts               # Animation timing constants
    colors.ts                  # Brand color tokens
  utils/
    color-scale.ts             # D3 color scale functions
  data/
    sample-dataviz.ts          # Sample SIA data
  hooks/
    useBreakpoint.ts           # Responsive breakpoint hook
    useCountUp.ts              # Existing count-up hook
    useReducedMotion.ts        # Motion preference hook (wraps Framer)
```

### Component Usage Examples

#### DonutChart

```tsx
import { DonutChart } from "@/components/dataviz";
import { corridorShareChart } from "@/data/sample-dataviz";

<DonutChart
  data={corridorShareChart}
  size={240}
  ringThickness={28}
  showLegend
  legendPosition="bottom"
  animationDuration={1.5}
  onSegmentClick={(seg) => console.log("Clicked:", seg.label)}
/>
```

#### DonutChartGroup

```tsx
import { DonutChartGroup } from "@/components/dataviz";
import { corridorShareChart, dealSuccessChart } from "@/data/sample-dataviz";

<DonutChartGroup
  charts={[corridorShareChart, dealSuccessChart]}
  layout="row"
  gap={48}
/>
```

#### MetricsGrid

```tsx
import { MetricsGrid } from "@/components/dataviz";
import { siaMetrics } from "@/data/sample-dataviz";

<MetricsGrid
  data={siaMetrics}
  columns={3}
  counterDuration={2}
  staggerDelay={0.1}
  enableHover
/>
```

#### StatsRow

```tsx
import { StatsRow } from "@/components/dataviz";
import { siaStatsRow } from "@/data/sample-dataviz";

<StatsRow
  data={siaStatsRow}
  showDividers
  showDetails
  counterDuration={2}
/>
```

#### HeatmapMatrix

```tsx
import { HeatmapMatrix } from "@/components/dataviz";
import { siaHeatmap } from "@/data/sample-dataviz";

<HeatmapMatrix
  data={siaHeatmap}
  cellSize={48}
  showBarChart
  barChartWidth={120}
  barChartPosition="left"
  enableTooltip
  onCellClick={(row, col, val) => console.log(`${row}/${col}: ${val}`)}
/>
```

#### WordCloud

```tsx
import { WordCloud } from "@/components/dataviz";
import { siaWordCloud } from "@/data/sample-dataviz";

<WordCloud
  data={siaWordCloud}
  height={400}
  enableFloat
  enableHover
  onWordClick={(word) => console.log("Clicked:", word.text)}
/>
```

#### ProblemCards

```tsx
import { ProblemCards } from "@/components/dataviz";
import { siaProblemCards } from "@/data/sample-dataviz";

<ProblemCards
  data={siaProblemCards}
  accentColor="#C8A951"
  sectionBackground="bg-gray-50"
  staggerDelay={0.15}
  enableHover
/>
```

### Events & Callbacks

All interactive components expose optional callback props:

| Component     | Callback              | Signature                                         |
|---------------|-----------------------|---------------------------------------------------|
| DonutChart    | `onSegmentClick`      | `(segment: DonutSegment) => void`                 |
| DonutChart    | `onSegmentHover`      | `(segment: DonutSegment \| null) => void`         |
| MetricsGrid   | `onCardClick`         | `(card: MetricCard) => void`                      |
| HeatmapMatrix | `onCellClick`         | `(rowId: string, colId: string, value: number) => void` |
| HeatmapMatrix | `onRowHover`          | `(rowId: string \| null) => void`                 |
| WordCloud     | `onWordClick`         | `(word: WordCloudItem) => void`                   |

### Barrel Export

```typescript
// src/components/dataviz/index.ts
export { DonutChart } from "./DonutChart";
export { DonutChartGroup } from "./DonutChartGroup";
export { MetricsGrid } from "./MetricsGrid";
export { StatsRow } from "./StatsRow";
export { HeatmapMatrix } from "./HeatmapMatrix";
export { WordCloud } from "./WordCloud";
export { ProblemCards } from "./ProblemCards";
```

### Required Dependencies

```json
{
  "dependencies": {
    "recharts": "^2.12.0",
    "d3-scale": "^4.0.2",
    "d3-interpolate": "^3.0.1",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.400.0"
  },
  "devDependencies": {
    "@types/d3-scale": "^4.0.8",
    "@types/d3-interpolate": "^3.0.4"
  }
}
```

Note: `recharts` is already available via the shadcn/ui chart component (`src/components/ui/chart.tsx`). `framer-motion` is already installed. Only `d3-scale` and `d3-interpolate` may need to be added for the heatmap and word cloud color scales.

---

## Appendix: Wider-to-SIA Color Mapping Quick Reference

| Wider (Purple Theme)  | SIA (Gold/Navy Theme)  | Usage                  |
|-----------------------|------------------------|------------------------|
| #7B2FF2 (purple)      | #C8A951 (gold)         | Primary accent         |
| #6D28D9 (purple dark) | #A08838 (gold dark)    | Secondary accent       |
| #A855F7 (purple mid)  | #E8D48B (gold light)   | Tertiary / highlight   |
| #C4B5FD (purple light)| #C0C0C0 (silver)       | Muted accents          |
| #EDE9FE (purple faint)| #E8E8E8 (silver light) | Backgrounds / subtle   |
| #000000 (black)       | #0A1628 (navy)         | Primary background     |
| #111111 (near-black)  | #1C1C1E (charcoal)     | Card backgrounds       |
| #1A1A1A               | #2A2A2E                | Borders / dividers     |
| #FFFFFF               | #FFFFFF                | Text on dark           |
| #9CA3AF               | #9CA3AF                | Muted text (shared)    |
