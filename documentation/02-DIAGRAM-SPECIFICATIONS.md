# SIA Website -- Diagram Technical Specifications

> Implementation-ready specifications for each diagram component. All values use the SIA color palette. Components are React + TypeScript with Framer Motion animations and inline SVG.

---

## Table of Contents

1. [Shared Types and Constants](#shared-types-and-constants)
2. [Hub-and-Spoke Model](#1-hub-and-spoke-model)
3. [Investment Bridge](#2-investment-bridge)
4. [The Bridge Circular Flow](#3-the-bridge-circular-flow)
5. [Circular Economy Infinity Loop](#4-circular-economy-infinity-loop)
6. [Value Chain S-Curve](#5-value-chain-s-curve)
7. [Project Models Comparison](#6-project-models-comparison)
8. [Platform Architecture](#7-platform-architecture)
9. [System Architecture Grid](#8-system-architecture-grid)

---

## Shared Types and Constants

### Color Palette Constants

```typescript
// src/lib/diagram-colors.ts

export const DIAGRAM_COLORS = {
  // Primary brand
  gold: '#C8A951',
  goldDark: '#A08838',
  goldLight: '#E8D48B',
  goldGlow: 'rgba(200, 169, 81, 0.15)',
  goldGlowStrong: 'rgba(200, 169, 81, 0.3)',

  // Neutrals
  charcoal: '#1C1C1E',
  charcoalLight: '#2A2A2E',
  charcoalMid: '#3A3A3E',
  silver: '#C0C0C0',
  silverLight: '#E8E8E8',
  navy: '#0A1628',

  // Text
  textPrimary: '#1C1C1E',
  textSecondary: '#6B7280',
  textOnDark: '#FFFFFF',
  textAccent: '#C8A951',

  // Backgrounds
  bgWhite: '#FFFFFF',
  bgOffWhite: '#FAFAF7',
  bgLight: '#F9FAFB',
  bgDark: '#0A1628',

  // Borders
  borderDefault: '#E8E8E8',
  borderHover: '#C8A951',

  // Status (for hub-spoke active states)
  statusActive: '#C8A951',
  statusPending: '#E8D48B',
  statusInactive: 'rgba(192, 192, 192, 0.3)',
} as const;

export type DiagramColorKey = keyof typeof DIAGRAM_COLORS;
```

### Shared Animation Constants

```typescript
// src/lib/diagram-animations.ts

export const ANIMATION_TIMING = {
  // Entrance
  entranceDuration: 0.6,
  entranceStagger: 0.1,
  entranceDelay: 0.2,

  // Idle / continuous
  flowDotSpeed: 3,       // seconds per full path traverse
  pulseSpeed: 3,         // seconds per pulse cycle
  shimmerSpeed: 8,       // seconds per shimmer cycle

  // Interaction
  hoverDuration: 0.2,
  expandDuration: 0.3,
  highlightDuration: 0.3,

  // Spring config for pop-in effects
  spring: { type: 'spring' as const, stiffness: 300, damping: 20 },
  springGentle: { type: 'spring' as const, stiffness: 200, damping: 25 },
} as const;

export const EASING = {
  easeOut: [0.0, 0.0, 0.2, 1.0] as const,
  easeInOut: [0.42, 0.0, 0.58, 1.0] as const,
  spring: [0.175, 0.885, 0.32, 1.275] as const,
};
```

### Shared TypeScript Interfaces

```typescript
// src/types/diagrams.ts

export interface DiagramNode {
  id: string;
  label: string;
  description?: string;
  icon?: string; // lucide icon name
}

export interface DiagramConnection {
  from: string;
  to: string;
  status?: 'active' | 'pending' | 'inactive';
}

export interface DiagramStep {
  number: number;
  label: string;
  description?: string;
  icon?: string;
}

export interface CountryData {
  name: string;
  code: 'MY' | 'SA';
  flagSrc: string;
  sectors: string[];
}

export interface PlatformLayer {
  label: string;
  sublabel?: string;
  detail?: string;
  icon?: string;
}

export interface SystemModule {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name
}

export interface BaseDiagramProps {
  animated?: boolean;
  className?: string;
  ariaLabel: string;
}
```

### Reduced Motion Hook

```typescript
// src/hooks/useReducedMotion.ts

import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
}
```

---

## 1. Hub-and-Spoke Model

### Component Interface

```typescript
// src/components/diagrams/HubAndSpokeModel.tsx

interface HubAndSpokeProps extends BaseDiagramProps {
  nodes: Array<DiagramNode & { angle?: number }>;
  activeConnections?: string[];    // node IDs with active connections
  highlightedNode?: string;        // node ID currently hovered/selected
  onNodeHover?: (nodeId: string | null) => void;
  onNodeClick?: (nodeId: string) => void;
  hubLabel?: string;               // default: "SIA Match Engine"
  showFlowDots?: boolean;          // default: true
  size?: 'sm' | 'md' | 'lg';      // responsive size override
}
```

### SVG Geometry

```typescript
// ViewBox and core measurements
const VIEWBOX = '0 0 640 640';
const CENTER = { x: 320, y: 320 };

// Size variants
const SIZE_CONFIG = {
  sm: { viewWidth: 320, hubRadius: 40, nodeRadius: 18, orbitRadius: 140 },
  md: { viewWidth: 480, hubRadius: 60, nodeRadius: 26, orbitRadius: 210 },
  lg: { viewWidth: 640, hubRadius: 80, nodeRadius: 35, orbitRadius: 280 },
};

// Concentric ring radii (relative to hub)
const RING_OFFSETS = [20, 40]; // px beyond hub radius

// Calculate node position from angle
function getNodePosition(angle: number, radius: number, center: { x: number; y: number }) {
  const rad = (angle - 90) * (Math.PI / 180); // -90 so 0deg = 12 o'clock
  return {
    x: center.x + radius * Math.cos(rad),
    y: center.y + radius * Math.sin(rad),
  };
}

// Default node angles for N nodes
function distributeNodes(count: number): number[] {
  return Array.from({ length: count }, (_, i) => (360 / count) * i);
}
```

### SVG Path Data

```xml
<!-- Central hub -->
<circle cx="320" cy="320" r="80" fill="#1C1C1E" stroke="#C8A951" stroke-width="2" />

<!-- Concentric rings -->
<circle cx="320" cy="320" r="100" fill="none" stroke="#C8A951" stroke-width="1" opacity="0.15" />
<circle cx="320" cy="320" r="120" fill="none" stroke="#C8A951" stroke-width="1" opacity="0.10" />

<!-- Example satellite node at 0 degrees (12 o'clock) -->
<circle cx="320" cy="40" r="35" fill="#2A2A2E" stroke="#C0C0C0" stroke-width="1.5" />

<!-- Connection line (center to node) -->
<line x1="320" y1="240" x2="320" y2="75" stroke="rgba(192,192,192,0.3)" stroke-width="2" />

<!-- Active connection line -->
<line x1="320" y1="240" x2="320" y2="75" stroke="#C8A951" stroke-width="2.5" />

<!-- Flow dot (animated along path) -->
<circle r="4" fill="#C8A951" filter="url(#goldGlow)">
  <animateMotion dur="3s" repeatCount="indefinite" path="M320,240 L320,75" />
</circle>

<!-- Gold glow filter -->
<defs>
  <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
    <feMerge>
      <feMergeNode />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
</defs>
```

### Animation Keyframes

```typescript
// Entrance sequence
const hubEntrance = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { ...ANIMATION_TIMING.spring, delay: 0 },
};

const ringPulse = (index: number) => ({
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 0.15 },
  transition: { duration: 0.4, delay: 0.2 + index * 0.15 },
});

const nodeEntrance = (index: number, total: number) => ({
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { ...ANIMATION_TIMING.spring, delay: 0.4 + index * 0.1 },
});

const connectionDraw = (index: number) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { duration: 0.3, delay: 0.5 + index * 0.08, ease: 'easeOut' },
});

// Idle pulse on concentric rings
const idlePulse = {
  animate: {
    opacity: [0.15, 0.25, 0.15],
    scale: [1, 1.02, 1],
  },
  transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
};

// Flow dot along connection path
const flowDot = (pathId: string) => ({
  animate: { offsetDistance: ['0%', '100%'] },
  transition: { duration: 3, repeat: Infinity, ease: 'linear' },
  style: { offsetPath: `path('...')`, offsetRotate: '0deg' },
});

// Hover state
const nodeHover = {
  scale: 1.15,
  transition: { duration: 0.2 },
};

const connectionHighlight = {
  stroke: DIAGRAM_COLORS.gold,
  strokeWidth: 2.5,
  opacity: 1,
  transition: { duration: 0.3 },
};

const connectionDim = {
  opacity: 0.1,
  transition: { duration: 0.3 },
};
```

### Responsive Breakpoints

```typescript
const useHubSize = () => {
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('lg');

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setSize(w < 768 ? 'sm' : w < 1024 ? 'md' : 'lg');
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return SIZE_CONFIG[size];
};

// Mobile: hide text labels, show icon-only nodes
// Tablet: show abbreviated labels
// Desktop: full labels with descriptions on hover
```

### Accessibility

```typescript
const hubA11y = {
  role: 'img' as const,
  'aria-label': 'SIA AI-powered deal matching engine visualization showing connected deal categories including Saudi Investors, Malaysian SMEs, Government agencies, and industry sectors',
};

// Each node should have:
// - role="button" if interactive
// - aria-label with full category name and description
// - tabIndex={0} for keyboard navigation
// - onKeyDown handler for Enter/Space activation

// Screen reader alternative (visually hidden):
const srDescription = `
  SIA Match Engine connects 8 deal categories:
  1. Saudi Investors
  2. Malaysian SMEs
  3. Government (SAGIA)
  4. Government (MIDA)
  5. Trade & Logistics
  6. Manufacturing
  7. Advisory Partners
  8. Technology
  Active connections show deals being matched in real time.
`;
```

---

## 2. Investment Bridge

### Component Interface

```typescript
interface InvestmentBridgeProps extends BaseDiagramProps {
  steps: Array<{
    number: string;     // "01", "02"
    title: string;
    description: string;
  }>;
  importLabel?: string;   // default: "Investment Flow"
  exportLabel?: string;   // default: "Trade Flow"
  showFlowParticles?: boolean;
  onStepClick?: (stepNumber: string) => void;
}
```

### SVG Geometry

```typescript
const VIEWBOX = '0 0 1200 400';

// Flag positions
const MALAYSIA_FLAG = { x: 40, y: 160, width: 120, height: 80 };
const SAUDI_FLAG = { x: 1040, y: 160, width: 120, height: 80 };

// Arrow paths (cubic bezier curves)
const IMPORT_ARROW_PATH = 'M 200,220 C 400,140 800,140 1000,220';
const EXPORT_ARROW_PATH = 'M 1000,250 C 800,330 400,330 200,250';

// Arrow body width: 40px (achieved via stroke-width on the path)
// Arrowhead: triangle polygon at the path endpoint

// Step indicator positions
const STEP_01_POS = { x: 600, y: 110 }; // above import arrow, centered
const STEP_02_POS = { x: 600, y: 340 }; // below export arrow, centered
```

### SVG Path Data

```xml
<!-- Import arrow (Malaysia to Saudi) -->
<path
  d="M 200,220 C 400,140 800,140 1000,220"
  fill="none"
  stroke="#C8A951"
  stroke-width="40"
  stroke-linecap="round"
  opacity="0.9"
/>
<!-- Arrowhead -->
<polygon points="1000,200 1040,220 1000,240" fill="#C8A951" />

<!-- Export arrow (Saudi to Malaysia) -->
<path
  d="M 1000,250 C 800,330 400,330 200,250"
  fill="none"
  stroke="#1C1C1E"
  stroke-width="40"
  stroke-linecap="round"
  opacity="0.9"
/>
<!-- Arrowhead -->
<polygon points="200,230 160,250 200,270" fill="#1C1C1E" />

<!-- Arrow label (inside arrow body) -->
<text x="600" y="175" text-anchor="middle" fill="white" font-size="14" font-weight="600" letter-spacing="0.05em">
  INVESTMENT FLOW
</text>
<text x="600" y="295" text-anchor="middle" fill="white" font-size="14" font-weight="600" letter-spacing="0.05em">
  TRADE FLOW
</text>

<!-- Shimmer gradient overlay -->
<defs>
  <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="rgba(255,255,255,0)" />
    <stop offset="40%" stop-color="rgba(255,255,255,0)" />
    <stop offset="50%" stop-color="rgba(255,255,255,0.3)" />
    <stop offset="60%" stop-color="rgba(255,255,255,0)" />
    <stop offset="100%" stop-color="rgba(255,255,255,0)" />
    <animate attributeName="x1" from="-100%" to="100%" dur="4s" repeatCount="indefinite" />
  </linearGradient>
</defs>
```

### Animation Keyframes

```typescript
// Entrance
const flagSlideIn = (side: 'left' | 'right') => ({
  initial: { x: side === 'left' ? -150 : 150, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.5, ease: EASING.easeOut },
});

const arrowDraw = (index: number) => ({
  initial: { pathLength: 0 },
  animate: { pathLength: 1 },
  transition: { duration: 0.8, delay: 0.3 + index * 0.3, ease: 'easeInOut' },
});

const stepCountUp = (target: string) => ({
  // Animate text from "00" to target ("01" or "02")
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4, delay: 1.0 },
});

// Idle shimmer
const arrowShimmer = {
  animate: { backgroundPosition: ['-200% 0', '200% 0'] },
  transition: { duration: 4, repeat: Infinity, ease: 'linear' },
};

// Flow particles
const flowParticle = (pathD: string, duration: number = 2) => ({
  animate: { offsetDistance: ['0%', '100%'] },
  transition: { duration, repeat: Infinity, ease: 'linear' },
  style: { offsetPath: `path('${pathD}')` },
});
```

### Responsive Breakpoints

```typescript
// Desktop: horizontal layout as designed
// Tablet: same but scaled down, flags 100x66
// Mobile: vertical layout

const mobileConfig = {
  viewBox: '0 0 400 600',
  flagPositions: {
    malaysia: { x: 140, y: 20, width: 120, height: 80 },
    saudi: { x: 140, y: 500, width: 120, height: 80 },
  },
  arrowPaths: {
    import: 'M 170,120 C 100,250 100,350 170,480',  // left vertical arc
    export: 'M 230,480 C 300,350 300,250 230,120',   // right vertical arc
  },
  stepPositions: {
    step01: { x: 60, y: 300 },
    step02: { x: 310, y: 300 },
  },
};
```

### Accessibility

```typescript
const bridgeA11y = {
  role: 'img' as const,
  'aria-label': 'Investment bridge between Malaysia and Saudi Arabia showing bidirectional investment and trade flows',
};

// Screen reader text:
const srDescription = `
  Bilateral investment bridge:
  Step 1 - Investment Flow: Saudi capital flows to Malaysian opportunities, connecting investors with vetted projects.
  Step 2 - Trade Flow: Malaysian goods and services access Saudi markets through SIA facilitation.
`;
```

---

## 3. The Bridge Circular Flow

### Component Interface

```typescript
interface CircularDealFlowProps extends BaseDiagramProps {
  steps: DiagramStep[];           // 6 steps
  activeStep?: number;
  flowSpeed?: number;             // seconds per loop, default 6
  showFlowDot?: boolean;
  onStepClick?: (stepIndex: number) => void;
}
```

### SVG Geometry

```typescript
const VIEWBOX = '0 0 960 480';

// Ellipse parameters
const ELLIPSE = {
  cx: 480,
  cy: 240,
  rx: 400,    // horizontal radius
  ry: 180,    // vertical radius
};

// Ellipse path (SVG)
const ELLIPSE_PATH = `
  M ${ELLIPSE.cx - ELLIPSE.rx},${ELLIPSE.cy}
  A ${ELLIPSE.rx},${ELLIPSE.ry} 0 1,1 ${ELLIPSE.cx + ELLIPSE.rx},${ELLIPSE.cy}
  A ${ELLIPSE.rx},${ELLIPSE.ry} 0 1,1 ${ELLIPSE.cx - ELLIPSE.rx},${ELLIPSE.cy}
  Z
`;

// Flag positions
const FLAGS = {
  malaysia: { x: ELLIPSE.cx - ELLIPSE.rx - 10, y: ELLIPSE.cy, anchor: 'right' },
  saudi: { x: ELLIPSE.cx + ELLIPSE.rx + 10, y: ELLIPSE.cy, anchor: 'left' },
};

// Step node positions (parametric on ellipse, clockwise from top-left)
function getEllipsePoint(angle: number): { x: number; y: number } {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: ELLIPSE.cx + ELLIPSE.rx * Math.cos(rad),
    y: ELLIPSE.cy + ELLIPSE.ry * Math.sin(rad),
  };
}

const STEP_ANGLES = [300, 0, 60, 120, 180, 240]; // degrees, starting top-left clockwise
// Results in positions distributed around the ellipse

// Icon container: 44px diameter circle
// Label offset: 20px radially outward from ellipse

// Flow chevrons: every 60px along the path, 8px tall, pointing clockwise
const CHEVRON_COUNT = 16;
const CHEVRON_SPACING = 100 / CHEVRON_COUNT; // percentage of path length
```

### SVG Path Data

```xml
<!-- Main ellipse path -->
<ellipse
  cx="480" cy="240" rx="400" ry="180"
  fill="none"
  stroke="url(#goldGradientOval)"
  stroke-width="6"
/>

<!-- Gold gradient for oval -->
<defs>
  <linearGradient id="goldGradientOval" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#A08838" />
    <stop offset="50%" stop-color="#C8A951" />
    <stop offset="100%" stop-color="#E8D48B" />
  </linearGradient>
</defs>

<!-- Step node (example at angle 0 = right/3 o'clock position) -->
<g transform="translate(880, 240)">
  <circle r="22" fill="#1C1C1E" stroke="#C8A951" stroke-width="1.5" />
  <!-- Icon inside (lucide SVG inlined, 20x20, white) -->
  <text y="40" text-anchor="middle" fill="#1C1C1E" font-size="14" font-weight="500">
    Capital Matching
  </text>
</g>

<!-- Flow chevron -->
<path d="M -4,-4 L 0,0 L -4,4" stroke="#C8A951" stroke-width="1.5" fill="none" opacity="0.5" />

<!-- Animated flow dot -->
<circle r="5" fill="#C8A951" filter="url(#goldGlow)">
  <animateMotion dur="6s" repeatCount="indefinite">
    <mpath href="#ovalPath" />
  </animateMotion>
</circle>

<!-- SIA logo at center -->
<text x="480" y="245" text-anchor="middle" fill="#C8A951" font-size="24" font-weight="700" opacity="0.3">
  SIA
</text>
```

### Animation Keyframes

```typescript
// Entrance
const ovalDraw = {
  initial: { pathLength: 0 },
  animate: { pathLength: 1 },
  transition: { duration: 1.5, ease: 'easeInOut' },
};

const stepNodePop = (index: number) => ({
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: {
    ...ANIMATION_TIMING.spring,
    delay: (1.5 / 6) * index, // appears as path reaches its position
  },
});

// Continuous flow dot
const flowDotMotion = (speed: number) => ({
  animate: { offsetDistance: ['0%', '100%'] },
  transition: { duration: speed, repeat: Infinity, ease: 'linear' },
});

// Chevron pulse (sequential opacity)
const chevronPulse = (index: number, total: number) => ({
  animate: { opacity: [0.3, 0.8, 0.3] },
  transition: {
    duration: 2,
    repeat: Infinity,
    delay: (2 / total) * index,
    ease: 'easeInOut',
  },
});

// Step highlight on click/hover
const stepHighlight = {
  scale: 1.2,
  filter: 'drop-shadow(0 0 8px rgba(200,169,81,0.4))',
  transition: { duration: 0.2 },
};
```

### Responsive Breakpoints

```typescript
const responsiveConfig = {
  desktop: {
    viewBox: '0 0 960 480',
    layout: 'oval',
    showLabels: true,
  },
  tablet: {
    viewBox: '0 0 720 400',
    layout: 'oval',
    showLabels: 'tooltip', // labels on hover only
    ellipse: { rx: 300, ry: 150 },
  },
  mobile: {
    viewBox: '0 0 360 800',
    layout: 'vertical-timeline',
    // Convert to vertical list:
    // Malaysia flag at top
    // Steps 1-6 in vertical list with connecting line
    // Saudi flag at bottom
    stepSpacing: 100, // px vertical gap between steps
  },
};
```

### Accessibility

```typescript
const circularFlowA11y = {
  role: 'img' as const,
  'aria-label': 'Deal lifecycle flow connecting Malaysia and Saudi Arabia through 6 stages: Deal Discovery, Capital Matching, Due Diligence, Counterparty Alignment, Deal Execution, and Impact Tracking',
};

// Interactive mode: each step node is a button
const stepA11y = (step: DiagramStep) => ({
  role: 'button' as const,
  'aria-label': `Step ${step.number}: ${step.label}. ${step.description || ''}`,
  tabIndex: 0,
});
```

---

## 4. Circular Economy Infinity Loop

### Component Interface

```typescript
interface InfinityLoopProps extends BaseDiagramProps {
  leftLabel: string;        // default: "Sustainable Deals"
  rightLabel: string;       // default: "SIA Platform"
  leftSubtext?: string;
  rightSubtext?: string;
  showFlowDot?: boolean;
  flowSpeed?: number;       // default: 8
}
```

### SVG Geometry

```typescript
const VIEWBOX = '0 0 800 350';

// Infinity path control points
// The infinity curve is two mirrored cubic bezier loops connected at center
const INFINITY_PATH = `
  M 400,175
  C 400,60  620,60  620,175
  C 620,290 400,290 400,175
  C 400,60  180,60  180,175
  C 180,290 400,290 400,175
  Z
`;

// Simplified: the path traces right loop first, then left loop

// Loop centers
const LEFT_LOOP_CENTER = { x: 200, y: 175 };
const RIGHT_LOOP_CENTER = { x: 600, y: 175 };

// Ribbon width: achieved by stroking the path at 60px width
// Or: use two offset paths (inner and outer) to create a filled ribbon shape

// For gradient fill, the ribbon needs to be a closed shape:
const RIBBON_OUTER = '...'; // offset path +30px from center
const RIBBON_INNER = '...'; // offset path -30px from center
// Combined: path goes along outer, returns along inner (reversed)

// Text positions
const LEFT_TEXT = { x: 200, y: 170 };
const RIGHT_TEXT = { x: 600, y: 170 };
```

### SVG Path Data

```xml
<!-- Infinity path as thick stroke -->
<path
  d="M 400,175 C 400,60 620,60 620,175 C 620,290 400,290 400,175 C 400,60 180,60 180,175 C 180,290 400,290 400,175 Z"
  fill="none"
  stroke="url(#infinityGradient)"
  stroke-width="60"
  stroke-linecap="round"
  stroke-linejoin="round"
/>

<!-- Gradient: gold on left, charcoal on right, blending at center -->
<defs>
  <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#C8A951" />
    <stop offset="35%" stop-color="#C8A951" />
    <stop offset="50%" stop-color="#5A5040" />  <!-- blend point -->
    <stop offset="65%" stop-color="#1C1C1E" />
    <stop offset="100%" stop-color="#1C1C1E" />
  </linearGradient>

  <!-- Alternative: use clip paths for each loop half -->
  <clipPath id="leftClip">
    <rect x="0" y="0" width="400" height="350" />
  </clipPath>
  <clipPath id="rightClip">
    <rect x="400" y="0" width="400" height="350" />
  </clipPath>
</defs>

<!-- Alternative approach: two separate paths with clips -->
<path d="..." stroke="#C8A951" stroke-width="60" clip-path="url(#leftClip)" />
<path d="..." stroke="#1C1C1E" stroke-width="60" clip-path="url(#rightClip)" />

<!-- Crossing point glow -->
<circle cx="400" cy="175" r="10" fill="#C8A951" opacity="0.3">
  <animate attributeName="opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite" />
  <animate attributeName="r" values="8;14;8" dur="3s" repeatCount="indefinite" />
</circle>

<!-- Labels -->
<text x="200" y="170" text-anchor="middle" fill="#FFFFFF" font-size="18" font-weight="700" letter-spacing="0.03em">
  SUSTAINABLE
</text>
<text x="200" y="192" text-anchor="middle" fill="#FFFFFF" font-size="18" font-weight="700" letter-spacing="0.03em">
  DEALS
</text>

<text x="600" y="170" text-anchor="middle" fill="#C8A951" font-size="20" font-weight="700" letter-spacing="0.03em">
  SIA
</text>
<text x="600" y="192" text-anchor="middle" fill="#C8A951" font-size="20" font-weight="700" letter-spacing="0.03em">
  PLATFORM
</text>

<!-- Flow dot tracing infinity path -->
<circle r="5" fill="#E8D48B" filter="url(#goldGlow)">
  <animateMotion dur="8s" repeatCount="indefinite" rotate="auto">
    <mpath href="#infinityMotionPath" />
  </animateMotion>
</circle>
```

### Animation Keyframes

```typescript
// Entrance: draw from center outward
const infinityDraw = {
  initial: { pathLength: 0 },
  animate: { pathLength: 1 },
  transition: { duration: 1.2, ease: 'easeInOut' },
};

const labelFadeIn = (side: 'left' | 'right') => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4, delay: side === 'left' ? 1.0 : 1.2 },
});

// Continuous flow dot
const infinityFlowDot = (speed: number) => ({
  // Use offset-path with the infinity SVG path
  animate: { offsetDistance: ['0%', '100%'] },
  transition: { duration: speed, repeat: Infinity, ease: 'linear' },
});

// Crossing pulse
const crossingPulse = {
  animate: {
    opacity: [0.1, 0.4, 0.1],
    scale: [0.8, 1.2, 0.8],
  },
  transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
};

// Gradient oscillation (subtle)
const gradientShift = {
  // Animate gradient stop positions slightly
  // This requires manipulating SVG gradient stops via JS
  animate: {
    stopOffset35: ['35%', '40%', '35%'],
    stopOffset65: ['65%', '60%', '65%'],
  },
  transition: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
};
```

### Responsive Breakpoints

```typescript
const responsiveConfig = {
  desktop: { viewBox: '0 0 800 350', strokeWidth: 60, fontSize: { label: 18 } },
  tablet: { viewBox: '0 0 600 280', strokeWidth: 48, fontSize: { label: 15 } },
  mobile: {
    viewBox: '0 0 340 300',
    strokeWidth: 36,
    fontSize: { label: 13 },
    // On very small screens, labels move below the loops
    labelsBelow: true,
  },
};
```

### Accessibility

```typescript
const infinityA11y = {
  role: 'img' as const,
  'aria-label': 'Infinity loop showing the self-sustaining relationship between sustainable deals and the SIA platform. Completed deals generate data and relationships that fuel new deal opportunities.',
};
```

---

## 5. Value Chain S-Curve

### Component Interface

```typescript
interface SCurvePipelineProps extends BaseDiagramProps {
  steps: DiagramStep[];           // 7 steps
  activeStep?: number;
  completedSteps?: number[];
  variant?: 'static' | 'progressive' | 'animated';
  onStepClick?: (stepNumber: number) => void;
}
```

### SVG Geometry

```typescript
const VIEWBOX = '0 0 1000 600';

// Step positions in the S-curve layout
// Row 1: left to right (steps 1, 2, 3)
// Row 2: right to left (steps 4, 5)
// Row 3: left to right (steps 6, 7)

const STEP_POSITIONS = [
  { x: 150, y: 100 },  // Step 1
  { x: 400, y: 100 },  // Step 2
  { x: 650, y: 100 },  // Step 3
  { x: 650, y: 300 },  // Step 4
  { x: 400, y: 300 },  // Step 5
  { x: 400, y: 500 },  // Step 6
  { x: 650, y: 500 },  // Step 7
];

const STEP_RADIUS = 28;

// S-curve connecting path
// Straight segments between same-row steps
// Curved segments at row transitions
const S_CURVE_PATH = `
  M 150,100
  L 400,100
  L 650,100
  C 750,100 750,300 650,300
  L 400,300
  C 300,300 300,500 400,500
  L 650,500
`;

// Connection line: 3px stroke, silver
// Curve radius at turns: ~100px
```

### SVG Path Data

```xml
<!-- S-curve connecting line -->
<path
  d="M 150,100 L 400,100 L 650,100 C 760,100 760,300 650,300 L 400,300 C 290,300 290,500 400,500 L 650,500"
  fill="none"
  stroke="#C0C0C0"
  stroke-width="3"
  stroke-linecap="round"
  stroke-linejoin="round"
/>

<!-- Step circle (default state) -->
<g transform="translate(150, 100)">
  <circle r="28" fill="#1C1C1E" stroke="#C8A951" stroke-width="2" />
  <text y="7" text-anchor="middle" fill="#C8A951" font-size="22" font-weight="700">1</text>
</g>
<text x="150" y="148" text-anchor="middle" fill="#1C1C1E" font-size="14" font-weight="500">
  Deal Sourcing
</text>

<!-- Active step (gold fill) -->
<g transform="translate(400, 100)">
  <circle r="30" fill="#C8A951" stroke="#A08838" stroke-width="2" />
  <text y="7" text-anchor="middle" fill="#1C1C1E" font-size="22" font-weight="700">2</text>
</g>

<!-- Completed step (gold outline only) -->
<g transform="translate(150, 100)">
  <circle r="28" fill="none" stroke="#C8A951" stroke-width="2" />
  <text y="7" text-anchor="middle" fill="#C8A951" font-size="22" font-weight="700">1</text>
  <!-- Checkmark overlay -->
  <path d="M -8,2 L -3,7 L 8,-5" stroke="#C8A951" stroke-width="2" fill="none" />
</g>

<!-- Flow particle on S-curve path -->
<circle r="4" fill="#C8A951" filter="url(#goldGlow)">
  <animateMotion dur="6s" repeatCount="indefinite">
    <mpath href="#sCurvePath" />
  </animateMotion>
</circle>
```

### Animation Keyframes

```typescript
// Entrance: line draws first, then nodes pop in
const sCurveDraw = {
  initial: { pathLength: 0 },
  animate: { pathLength: 1 },
  transition: { duration: 1.5, ease: 'easeInOut' },
};

const stepPop = (index: number) => {
  // Calculate delay based on approximate position along path
  const pathPercentages = [0, 0.15, 0.30, 0.45, 0.58, 0.74, 0.90];
  return {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: {
      ...ANIMATION_TIMING.spring,
      delay: 1.5 * pathPercentages[index], // synced with path draw
    },
  };
};

const labelFadeIn = (index: number) => ({
  initial: { opacity: 0, y: 5 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, delay: stepPop(index).transition.delay + 0.15 },
});

// Progressive mode (scroll-driven)
const progressiveStep = (stepNum: number, activeStep: number) => ({
  fill: stepNum < activeStep ? 'none' :
        stepNum === activeStep ? DIAGRAM_COLORS.gold :
        DIAGRAM_COLORS.charcoal,
  stroke: stepNum <= activeStep ? DIAGRAM_COLORS.gold : DIAGRAM_COLORS.silver,
  scale: stepNum === activeStep ? 1.1 : 1,
  transition: { duration: 0.3 },
});

// Idle particle
const flowParticle = {
  animate: { offsetDistance: ['0%', '100%'] },
  transition: { duration: 6, repeat: Infinity, ease: 'linear' },
};
```

### Responsive Breakpoints

```typescript
const responsiveConfig = {
  desktop: {
    viewBox: '0 0 1000 600',
    layout: 's-curve',
  },
  tablet: {
    viewBox: '0 0 800 500',
    layout: 's-curve',
    positions: [
      // Tighter spacing
      { x: 120, y: 80 }, { x: 330, y: 80 }, { x: 540, y: 80 },
      { x: 540, y: 250 }, { x: 330, y: 250 },
      { x: 330, y: 420 }, { x: 540, y: 420 },
    ],
  },
  mobile: {
    viewBox: '0 0 360 900',
    layout: 'vertical-timeline',
    // Vertical list with line on left
    lineX: 40,
    stepStartY: 60,
    stepSpacing: 110,
    labelPosition: 'right', // label to the right of the circle
  },
};

// Mobile vertical timeline structure:
// <line x1="40" y1="60" x2="40" y2="830" stroke="#C0C0C0" stroke-width="2" />
// Steps at y = 60, 170, 280, 390, 500, 610, 720
// Circle at (40, y), label at (80, y)
```

### Accessibility

```typescript
const sCurveA11y = {
  role: 'img' as const,
  'aria-label': 'SIA deal pipeline with 7 stages: Deal Sourcing, AI Matching, Virtual Data Room, Due Diligence, Deal Execution, Compliance Review, and Portfolio Tracking',
};

// When interactive (progressive mode), use role="list"
const interactiveA11y = {
  role: 'list' as const,
  'aria-label': 'Deal pipeline progress',
};

const stepItemA11y = (step: DiagramStep, isActive: boolean, isCompleted: boolean) => ({
  role: 'listitem' as const,
  'aria-label': `Step ${step.number}: ${step.label}${isCompleted ? ' (completed)' : isActive ? ' (current)' : ''}`,
  'aria-current': isActive ? ('step' as const) : undefined,
});
```

---

## 6. Project Models Comparison

### Component Interface

```typescript
interface ProjectComparisonProps extends BaseDiagramProps {
  leftCountry: CountryData;
  rightCountry: CountryData;
  matches?: Array<{
    leftIndex: number;
    rightIndex: number;
    matchType?: string;
  }>;
  highlightedMatch?: number;
  matchBarLabel?: string;
  onMatchClick?: (leftIndex: number, rightIndex: number) => void;
  onRowHover?: (side: 'left' | 'right', index: number) => void;
}
```

### SVG / HTML Geometry

```typescript
// This component is better implemented as HTML/CSS rather than pure SVG
// due to the text-heavy nature and table-like layout

const LAYOUT = {
  containerWidth: 1000,
  containerHeight: 500,
  buildingWidth: 420,
  gap: 60,
  roofHeight: 60,
  rowHeight: 50,
  rowPadding: { x: 16, y: 12 },
  bottomBarHeight: 56,
  flagSize: { width: 48, height: 32 },
};

// Building positions
const LEFT_BUILDING = {
  x: 0,
  y: 0,
  width: LAYOUT.buildingWidth,
};

const RIGHT_BUILDING = {
  x: LAYOUT.buildingWidth + LAYOUT.gap,
  y: 0,
  width: LAYOUT.buildingWidth,
};

// Connection lines between matching rows
// Each line: from right edge of left building row to left edge of right building row
// Using SVG overlay for the dashed connection lines
```

### CSS Specification

```css
/* Building card */
.building-card {
  width: 420px;
  border: 1.5px solid #E8E8E8;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
}

/* Roof */
.building-roof {
  height: 60px;
  background: #F5EDD3;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border-bottom: 2px solid #C8A951;
}

/* Sector row */
.sector-row {
  height: 50px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #1C1C1E;
  border-bottom: 1px solid #F0F0F0;
  transition: background-color 0.2s, color 0.2s;
}

.sector-row:nth-child(even) { background: #FFFFFF; }
.sector-row:nth-child(odd) { background: #FAFAF7; }

.sector-row.highlighted {
  background: rgba(200, 169, 81, 0.1);
  border-left: 3px solid #C8A951;
}

/* Match bar */
.match-bar {
  width: 100%;
  height: 56px;
  background: #1C1C1E;
  color: #C8A951;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 0 0 8px 8px;
}

/* Connection line (SVG overlay) */
.connection-line {
  stroke: #C8A951;
  stroke-width: 2;
  stroke-dasharray: 6 4;
  opacity: 0.5;
  transition: opacity 0.3s, stroke-width 0.3s;
}

.connection-line.active {
  stroke-dasharray: none;
  stroke-width: 3;
  opacity: 1;
}
```

### Animation Keyframes

```typescript
// Entrance
const buildingSlide = (side: 'left' | 'right') => ({
  initial: { x: side === 'left' ? -100 : 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.5, ease: EASING.easeOut },
});

const rowFillIn = (index: number) => ({
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.2, delay: 0.3 + index * 0.1 },
});

const connectionLineDraw = (index: number) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 0.5 },
  transition: { duration: 0.3, delay: 0.8 + index * 0.15 },
});

const matchBarReveal = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.4, delay: 1.2 },
};

// Hover interaction
const rowHighlight = {
  backgroundColor: 'rgba(200, 169, 81, 0.1)',
  borderLeft: '3px solid #C8A951',
  transition: { duration: 0.2 },
};

const matchBeam = {
  // Animated pulse along connection line
  animate: { opacity: [0.5, 1, 0.5] },
  transition: { duration: 1, repeat: 2 },
};
```

### Responsive Breakpoints

```typescript
const responsiveConfig = {
  desktop: {
    layout: 'side-by-side',
    buildingWidth: 420,
    gap: 60,
    showConnections: true,
  },
  tablet: {
    layout: 'side-by-side',
    buildingWidth: 340,
    gap: 40,
    showConnections: true,
    fontSize: 13,
  },
  mobile: {
    layout: 'stacked',
    // Malaysia building on top, Saudi below
    buildingWidth: '100%',
    gap: 24, // vertical gap
    showConnections: false, // replaced with match indicators
    // Matching rows get a colored dot indicator instead of lines
    matchIndicator: 'dot', // colored dot on matching row pairs
  },
};
```

### Accessibility

```typescript
const comparisonA11y = {
  role: 'table' as const,
  'aria-label': 'Cross-border project matching between Malaysia and Saudi Arabia sectors',
};

const buildingA11y = (country: string) => ({
  role: 'rowgroup' as const,
  'aria-label': `${country} project sectors`,
});

const rowA11y = (sector: string, hasMatch: boolean, matchSector?: string) => ({
  role: 'row' as const,
  'aria-label': `${sector}${hasMatch ? `. Matches with ${matchSector}` : ''}`,
});
```

---

## 7. Platform Architecture

### Component Interface

```typescript
interface PlatformStackProps extends BaseDiagramProps {
  title: string;                    // default: "SIA Technology Platform"
  layers: PlatformLayer[];          // 5-7 layers
  expandable?: boolean;             // default: true
  expandedLayer?: number;
  onLayerClick?: (index: number) => void;
}
```

### CSS Specification

```typescript
// Layer heights and layout
const LAYOUT = {
  containerMaxWidth: 1000,
  headerHeight: 60,
  layerHeight: 60,
  layerGap: 8,
  layerPadding: { x: 24, y: 16 },
  goldAccentWidth: 4,
  expandedLayerHeight: 120,
};

// Layer colors (top to bottom, darkest to lightest)
const LAYER_COLORS = [
  '#1C1C1E', // Layer 1 - darkest
  '#2A2A2E', // Layer 2
  '#3A3A3E', // Layer 3
  '#5A5A5E', // Layer 4
  '#7A7A7E', // Layer 5 - lightest
];
```

### CSS

```css
.platform-header {
  height: 60px;
  background: #0A1628;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  padding: 0 24px;
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 8px 8px 0 0;
}

.platform-layer {
  position: relative;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 24px 0 32px; /* extra left padding for gold accent */
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: height 0.3s ease, background-color 0.2s;
  overflow: hidden;
}

.platform-layer::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background: #C8A951;
  transform: scaleY(0);
  transition: transform 0.3s ease;
  transform-origin: top;
}

.platform-layer:hover::before,
.platform-layer.expanded::before {
  transform: scaleY(1);
}

.platform-layer.expanded {
  height: 120px;
}

.platform-layer .sublabel {
  font-size: 12px;
  font-weight: 400;
  opacity: 0.7;
  margin-left: 16px;
}

.platform-layer .detail {
  font-size: 13px;
  font-weight: 400;
  opacity: 0;
  position: absolute;
  bottom: 16px;
  left: 32px;
  right: 24px;
  transition: opacity 0.3s;
  color: #C8A951;
}

.platform-layer.expanded .detail {
  opacity: 1;
}
```

### Animation Keyframes

```typescript
// Entrance
const headerEntrance = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.4, ease: EASING.easeOut },
};

const layerSlideIn = (index: number) => ({
  initial: { x: -80, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.3, delay: 0.15 + index * 0.12, ease: EASING.easeOut },
});

const goldAccentDraw = (index: number) => ({
  initial: { scaleY: 0 },
  animate: { scaleY: 1 },
  transition: { duration: 0.3, delay: 0.3 + index * 0.12, ease: 'easeOut' },
});

// Expand/collapse
const layerExpand = {
  animate: { height: 120 },
  transition: { duration: 0.3, ease: EASING.easeInOut },
};

const layerCollapse = {
  animate: { height: 60 },
  transition: { duration: 0.3, ease: EASING.easeInOut },
};

const detailReveal = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2, delay: 0.15 },
};
```

### Responsive Breakpoints

```typescript
const responsiveConfig = {
  desktop: {
    maxWidth: 1000,
    layerHeight: 60,
    expandedHeight: 120,
    fontSize: 16,
  },
  tablet: {
    maxWidth: '100%',
    layerHeight: 56,
    expandedHeight: 110,
    fontSize: 15,
  },
  mobile: {
    maxWidth: '100%',
    layerHeight: 52,
    expandedHeight: 140, // taller to fit wrapped text
    fontSize: 14,
    // Full bleed: layers extend to viewport edges
    // Tap to expand (no hover)
  },
};
```

### Accessibility

```typescript
const stackA11y = {
  role: 'list' as const,
  'aria-label': 'SIA Technology Platform architecture layers',
};

const layerA11y = (layer: PlatformLayer, isExpanded: boolean) => ({
  role: 'listitem' as const,
  'aria-expanded': isExpanded,
  'aria-label': `${layer.label}${layer.sublabel ? `: ${layer.sublabel}` : ''}`,
  tabIndex: 0,
  onKeyDown: (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // toggle expand
    }
  },
});
```

---

## 8. System Architecture Grid

### Component Interface

```typescript
interface SystemGridProps extends BaseDiagramProps {
  modules: SystemModule[];        // 9 modules for 3x3
  columns?: 2 | 3;               // responsive override
  highlightedModule?: string;
  onModuleClick?: (id: string) => void;
}
```

### CSS Specification

```css
.system-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  max-width: 960px;
  margin: 0 auto;
  padding: 24px;
  background: #FAFAF7;
  border-radius: 12px;
}

@media (max-width: 1023px) {
  .system-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767px) {
  .system-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}

.module-card {
  background: #FFFFFF;
  border: 1.5px solid #E8E8E8;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.module-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(200, 169, 81, 0.12);
  border-color: #C8A951;
}

.module-card:focus-visible {
  outline: 2px solid #C8A951;
  outline-offset: 2px;
}

.module-icon {
  width: 48px;
  height: 48px;
  color: #C8A951;
  transition: transform 0.2s;
}

.module-card:hover .module-icon {
  transform: scale(1.1);
}

.module-title {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #1C1C1E;
  line-height: 1.3;
}

.module-description {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: #6B7280;
  line-height: 1.5;
  max-width: 260px;
}
```

### Animation Keyframes

```typescript
// Entrance: staggered fade-in + slide-up
const cardEntrance = (index: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.4,
    delay: index * 0.08,
    ease: EASING.easeOut,
  },
});

// Hover
const cardHover = {
  y: -4,
  boxShadow: '0 8px 24px rgba(200, 169, 81, 0.12)',
  borderColor: DIAGRAM_COLORS.gold,
  transition: { duration: 0.2 },
};

const iconHover = {
  scale: 1.1,
  transition: { duration: 0.2 },
};

// Optional: connection dots between cards
// Small dots that travel along grid lines between adjacent cards
const connectionDot = (fromCard: number, toCard: number, speed: number) => {
  // Calculate grid positions
  const fromCol = fromCard % 3;
  const fromRow = Math.floor(fromCard / 3);
  const toCol = toCard % 3;
  const toRow = Math.floor(toCard / 3);

  // Only animate between adjacent cards (horizontal or vertical)
  const isHorizontal = fromRow === toRow && Math.abs(fromCol - toCol) === 1;
  const isVertical = fromCol === toCol && Math.abs(fromRow - toRow) === 1;

  if (!isHorizontal && !isVertical) return null;

  return {
    animate: { offsetDistance: ['0%', '100%'] },
    transition: { duration: speed, repeat: Infinity, ease: 'linear' },
  };
};
```

### Lucide Icon Mapping

```typescript
import {
  Search,
  FolderLock,
  ShieldCheck,
  MessageSquareMore,
  Calculator,
  GanttChart,
  BarChart3,
  Landmark,
  Leaf,
} from 'lucide-react';

const MODULE_ICONS = {
  'deal-matching': Search,
  'data-room': FolderLock,
  'compliance': ShieldCheck,
  'communication': MessageSquareMore,
  'financial-modeling': Calculator,
  'project-management': GanttChart,
  'analytics': BarChart3,
  'government': Landmark,
  'impact': Leaf,
} as const;
```

### Responsive Breakpoints

```typescript
const responsiveConfig = {
  desktop: {
    columns: 3,
    cardMinHeight: 220,
    gap: 16,
    showDescription: true,
  },
  tablet: {
    columns: 2,
    cardMinHeight: 200,
    gap: 14,
    showDescription: true,
    // 9th card spans full width or is centered
    lastCardStyle: { gridColumn: '1 / -1', maxWidth: 300, margin: '0 auto' },
  },
  mobile: {
    columns: 1,
    cardMinHeight: 120,
    gap: 12,
    showDescription: true,
    // Cards become horizontal layout (icon left, text right)
    cardLayout: 'horizontal',
    // Alternative: horizontal scroll carousel
    alternativeLayout: 'carousel',
  },
};
```

### Accessibility

```typescript
const gridA11y = {
  role: 'grid' as const,
  'aria-label': 'SIA platform capabilities - 9 integrated system modules',
};

const moduleA11y = (module: SystemModule) => ({
  role: 'gridcell' as const,
  'aria-label': `${module.title}: ${module.description}`,
  tabIndex: 0,
  onKeyDown: (e: React.KeyboardEvent) => {
    // Arrow key navigation between grid cells
    const currentIndex = parseInt(e.currentTarget.getAttribute('data-index') || '0');
    const cols = 3; // or dynamic based on breakpoint

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        focusCard(currentIndex + 1);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        focusCard(currentIndex - 1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        focusCard(currentIndex + cols);
        break;
      case 'ArrowUp':
        e.preventDefault();
        focusCard(currentIndex - cols);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        // trigger module click
        break;
    }
  },
});
```

---

## Global SVG Definitions

All diagrams that use SVG should share a common `<defs>` block. This can be rendered once at the app level or duplicated per diagram (SVG defs are scoped).

```xml
<defs>
  <!-- Gold glow filter -->
  <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
    <feFlood flood-color="#C8A951" flood-opacity="0.6" result="color" />
    <feComposite in="color" in2="blur" operator="in" result="glow" />
    <feMerge>
      <feMergeNode in="glow" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>

  <!-- Gold glow (strong) -->
  <filter id="goldGlowStrong" x="-100%" y="-100%" width="300%" height="300%">
    <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
    <feFlood flood-color="#C8A951" flood-opacity="0.8" result="color" />
    <feComposite in="color" in2="blur" operator="in" result="glow" />
    <feMerge>
      <feMergeNode in="glow" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>

  <!-- Charcoal shadow -->
  <filter id="charcoalShadow" x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#1C1C1E" flood-opacity="0.15" />
  </filter>

  <!-- Gold gradient (horizontal) -->
  <linearGradient id="goldGradientH" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#A08838" />
    <stop offset="50%" stop-color="#C8A951" />
    <stop offset="100%" stop-color="#E8D48B" />
  </linearGradient>

  <!-- Gold gradient (vertical) -->
  <linearGradient id="goldGradientV" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="#E8D48B" />
    <stop offset="100%" stop-color="#A08838" />
  </linearGradient>

  <!-- Charcoal gradient (horizontal) -->
  <linearGradient id="charcoalGradientH" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#1C1C1E" />
    <stop offset="100%" stop-color="#2A2A2E" />
  </linearGradient>

  <!-- Gold-to-charcoal gradient (for infinity loop) -->
  <linearGradient id="goldToCharcoal" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#C8A951" />
    <stop offset="40%" stop-color="#C8A951" />
    <stop offset="50%" stop-color="#5A5040" />
    <stop offset="60%" stop-color="#1C1C1E" />
    <stop offset="100%" stop-color="#1C1C1E" />
  </linearGradient>
</defs>
```

---

## Performance Budget

| Diagram | Max SVG Nodes | Max Animated Elements | Target FPS | Bundle Size Target |
|---------|---------------|----------------------|------------|-------------------|
| Hub-and-Spoke | 50 | 5 (dots) + 12 (connections) | 60 | < 8KB gzipped |
| Investment Bridge | 20 | 3 (particles) + 2 (arrows) | 60 | < 5KB gzipped |
| Circular Flow | 30 | 1 (dot) + 16 (chevrons) | 60 | < 7KB gzipped |
| Infinity Loop | 10 | 2 (dot + pulse) | 60 | < 4KB gzipped |
| S-Curve | 25 | 1 (particle) + 7 (step states) | 60 | < 6KB gzipped |
| Project Comparison | 20 (HTML) | 10 (row highlights) | 60 | < 6KB gzipped |
| Platform Stack | 8 (HTML) | 5 (layer expands) | 60 | < 4KB gzipped |
| System Grid | 9 (HTML) | 9 (card hovers) | 60 | < 5KB gzipped |

### Optimization Guidelines

- Use `transform` and `opacity` for animations only (GPU-composited properties)
- Apply `will-change: transform` only during active animation, remove after
- Use `requestAnimationFrame` for any JS-driven animations
- Debounce resize handlers at 100ms
- Use `IntersectionObserver` (via framer-motion `useInView`) to pause off-screen animations
- Limit concurrent `animateMotion` elements to 5 per diagram
- Use CSS `contain: layout style paint` on diagram containers
- For `prefers-reduced-motion: reduce`, disable all continuous animations and reduce entrance animations to simple fade-in
