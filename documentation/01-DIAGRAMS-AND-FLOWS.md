# SIA Website -- Diagrams and Flows Documentation

> Derived from the Wider Presentation deck. Each diagram is documented with its original design, SIA adaptation strategy, and web implementation guidance.

---

## Table of Contents

1. [Hub-and-Spoke Model](#1-hub-and-spoke-model)
2. [Investment Bridge](#2-investment-bridge)
3. [The Bridge Circular Flow](#3-the-bridge-circular-flow)
4. [Circular Economy Infinity Loop](#4-circular-economy-infinity-loop)
5. [Value Chain S-Curve](#5-value-chain-s-curve)
6. [Project Models Comparison](#6-project-models-comparison)
7. [Platform Architecture](#7-platform-architecture)
8. [System Architecture Grid](#8-system-architecture-grid)

---

## 1. Hub-and-Spoke Model

**Source:** Slides 9--16 | UUIDs: 01EB92F3, F767063D, 8F190D2A, 0CF19167, E3F6D492, 180D4A1E, 72997EF3, 0B25D6B0

### Visual Description

A radial network diagram with a central "matching engine" hub surrounded by satellite nodes. The central element is a purple circle labeled "Wider Model" with concentric rings radiating outward (2--3 rings), giving a pulsing/radar appearance. Eight to twelve satellite nodes (smaller purple circles with white text labels) are arranged evenly around the perimeter at equal angular intervals.

Connection lines radiate from the center to each satellite node. Across multiple slides, specific connection paths are highlighted in different colors:
- **Purple lines** -- default/inactive connections
- **Green lines** -- active/matched deal paths
- **Red lines** -- flagged/pending connections

The progressive build across 8 slides works as follows:
1. Central hub appears alone
2. Satellite nodes fade in around the perimeter
3. All connection lines appear in default purple
4. Specific paths highlight green to show a matched deal flowing through the network
5. Additional paths highlight to show multiple simultaneous deal flows
6. Data/deal packet animations travel along highlighted paths (small circles moving along the lines)
7. Full network view with all connections active
8. Summary state with key metrics overlaid

Satellite node labels include categories such as: Government, SMEs, Investors, Industries, Trade, Manufacturing, Advisory, Technology.

### Geometry and Layout

- **Central hub:** Circle with radius ~80px at 1440px viewport, positioned at exact center of the diagram area
- **Concentric rings:** 2 rings at radii 100px and 120px, stroke-only (no fill), 1px stroke, 20% opacity
- **Satellite nodes:** Circles with radius ~35px, positioned on an invisible ring at radius ~280px from center
- **Angular distribution:** Nodes spaced at equal intervals (360 / nodeCount degrees), first node at 0 degrees (12 o'clock)
- **Connection lines:** Straight lines from center circle edge to satellite circle edge, 2px stroke width
- **Overall diagram area:** 640px x 640px square, centered in its container
- **Padding:** Minimum 40px from diagram edge to any node label

### Color Specification

**Original (Wider):**
| Element | Color | Hex |
|---------|-------|-----|
| Central hub fill | Deep purple | #7B2FBE |
| Central hub stroke | Lighter purple | #9B59D0 |
| Concentric rings | Purple, 20% opacity | #7B2FBE33 |
| Satellite node fill | Medium purple | #6C2AA5 |
| Satellite node stroke | Light purple | #A066CC |
| Default connection line | Purple, 40% opacity | #7B2FBE66 |
| Active connection (green) | Bright green | #2ECC71 |
| Flagged connection (red) | Alert red | #E74C3C |
| Node label text | White | #FFFFFF |
| Hub label text | White | #FFFFFF |

**SIA Adaptation:**
| Element | Color | Hex |
|---------|-------|-----|
| Central hub fill | Deep charcoal | #1C1C1E |
| Central hub stroke | Gold | #C8A951 |
| Concentric rings | Gold, 15% opacity | #C8A95126 |
| Satellite node fill | Charcoal | #2A2A2E |
| Satellite node stroke | Silver | #C0C0C0 |
| Default connection line | Silver, 30% opacity | #C0C0C04D |
| Active connection | Gold | #C8A951 |
| Flagged connection | Gold-light | #E8D48B |
| Node label text | White | #FFFFFF |
| Hub label text | Gold | #C8A951 |

### Typography

- **Hub label ("SIA Match Engine"):** Inter 16px / 600 weight, centered
- **Satellite node labels:** Inter 12px / 500 weight, centered within node circle
- **Extended labels (below nodes):** Inter 11px / 400 weight, centered below node, max-width 80px, word-wrap

### Animation Potential

This diagram benefits heavily from animation on the web:

1. **Entrance animation (on scroll into view):**
   - Central hub scales from 0 to 1 with spring easing (0.6s)
   - Concentric rings pulse outward from center (staggered 0.2s delay)
   - Satellite nodes fade in + scale up with stagger (0.1s per node, starting 0.4s after hub)
   - Connection lines draw from center to nodes (stroke-dasharray animation, 0.3s per line, staggered)

2. **Idle state animation (continuous):**
   - Concentric rings pulse with slow opacity oscillation (3s cycle)
   - Small glowing dots travel along 2--3 connection lines simultaneously, representing deals in motion
   - Dots: 4px circles with gold glow, travel time 2--3s per path, staggered starts

3. **Interactive hover states:**
   - Hovering a satellite node highlights its connection to center (line color shifts to gold, 0.3s)
   - Tooltip appears with deal category details
   - Other connections dim to 15% opacity

4. **State transitions (if used in a stepper/carousel):**
   - Connections animate between highlight states (0.5s crossfade)
   - Deal packets animate along newly highlighted paths

### SIA Adaptation

- **Hub label:** "Wider Model" becomes "SIA Match Engine" or "AI Deal Matching"
- **Satellite labels:** Rebrand to SIA deal categories: "Saudi Investors," "Malaysian SMEs," "Government (SAGIA)," "Government (MIDA)," "Trade & Logistics," "Manufacturing," "Advisory Partners," "Technology"
- **Color palette:** Purple-based palette shifts entirely to charcoal/gold/silver (see table above)
- **Content framing:** Position as "Your deal connects through our AI-powered matching engine to the right counterparty across the corridor"

### React Implementation Notes

```
Component: <HubAndSpokeModel />
Library dependencies: framer-motion, react (SVG-based)

Structure:
- Outer <motion.svg> with viewBox="0 0 640 640"
- <CentralHub /> -- circle + label group
- <ConcentricRings /> -- animated circles
- <SatelliteNode /> x N -- mapped from data array
- <ConnectionLine /> x N -- SVG lines with stroke-dasharray
- <DealPacket /> x N -- animated circles along paths

Props:
- nodes: Array<{ id, label, category, angle? }>
- activeConnections: string[] (node IDs currently highlighted)
- animationState: 'entrance' | 'idle' | 'interactive'
- onNodeHover: (nodeId: string) => void
- onNodeClick: (nodeId: string) => void

State management: useReducer for animation states
```

### Responsive Considerations

| Breakpoint | Behavior |
|------------|----------|
| Desktop (1024px+) | Full 640px diagram, all labels visible, hover interactions |
| Tablet (768--1023px) | Scaled to 480px, labels remain, reduced glow effects |
| Mobile (< 768px) | Scaled to 320px, satellite labels hidden (icons only), tap to reveal tooltip, connection animations simplified to 2 active paths max |

---

## 2. Investment Bridge

**Source:** Slide 20 | UUID: 0AEA1EDE

### Visual Description

A bilateral bridge visualization connecting Malaysia (left) and Saudi Arabia (right). Each country is represented by its national flag rendered as a rounded rectangle or shield shape. Between the flags, two large directional arrows form the bridge:

- **Top arrow (pointing up/right):** Labeled "Importing" -- represents goods/investment flowing from Malaysia to Saudi Arabia
- **Bottom arrow (pointing down/left):** Labeled "Exporting" -- represents goods/investment flowing from Saudi Arabia to Malaysia

Numbered step indicators (01, 02) appear alongside each arrow with descriptive text:
- Step 01: "Sustaining value chain" -- associated with the export flow
- Step 02: "Stimulating commercial activity" -- associated with the import flow

The overall composition is horizontally balanced with the two flags anchoring each side and the arrow bridge spanning the center.

### Geometry and Layout

- **Container:** Full-width section, max-width 1200px, height ~400px
- **Malaysia flag:** Positioned at left edge, 120px x 80px, vertically centered
- **Saudi flag:** Positioned at right edge, 120px x 80px, vertically centered
- **Top arrow:** Originates from Malaysia side (~180px from left), curves gently upward to peak at center, descends to Saudi side (~180px from right). Arrow body height ~40px, arrowhead ~30px
- **Bottom arrow:** Mirrors top arrow but inverted, curves downward
- **Vertical gap between arrows:** ~60px at center
- **Step indicators:** "01" and "02" in large bold text (48px), positioned above/below their respective arrows at the midpoint
- **Step descriptions:** Positioned adjacent to the step numbers, 16px text

### Color Specification

**Original (Wider):**
| Element | Color | Hex |
|---------|-------|-----|
| Top arrow (Import) | Deep purple | #7B2FBE |
| Bottom arrow (Export) | Medium purple | #9B59D0 |
| Step number | Dark text | #1A1A2E |
| Step description | Medium gray | #6B7280 |
| Background | White / off-white | #FAFAFA |
| Arrow gradient start | Light purple | #A066CC |
| Arrow gradient end | Deep purple | #7B2FBE |

**SIA Adaptation:**
| Element | Color | Hex |
|---------|-------|-----|
| Top arrow (Import) | Gold | #C8A951 |
| Bottom arrow (Export) | Charcoal | #1C1C1E |
| Step number | Charcoal | #1C1C1E |
| Step description | Medium gray | #6B7280 |
| Background | White | #FFFFFF |
| Arrow gradient start | Gold-light | #E8D48B |
| Arrow gradient end | Gold | #C8A951 |

### Typography

- **Step numbers ("01", "02"):** Playfair Display 48px / 700 weight
- **Step descriptions:** Inter 16px / 400 weight, max-width 200px
- **Arrow labels ("Importing", "Exporting"):** Inter 14px / 600 weight, uppercase, letter-spacing 0.05em, positioned inside arrow body
- **Country labels (if shown):** Inter 18px / 600 weight, below flags

### Animation Potential

1. **Entrance:**
   - Flags slide in from their respective sides (Malaysia from left, Saudi from right), 0.5s
   - Arrows draw from their origin flag toward the destination (stroke-dasharray or clip-path reveal), 0.8s each, 0.3s stagger
   - Step numbers count up from 00 to their value, 0.4s
   - Step descriptions fade in, 0.3s after number completes

2. **Idle state:**
   - Subtle gradient shimmer along arrows (background-position animation, 4s loop)
   - Small cargo/deal icons travel along arrows in the flow direction (2s travel time, looping)

3. **Interaction:**
   - Hovering an arrow expands its description area with additional detail text
   - Arrows glow slightly brighter on hover

### SIA Adaptation

- **Label changes:** "Importing/Exporting" becomes "Investment Flow" and "Trade Flow" (or "Capital In" / "Goods Out")
- **Step descriptions:** Adapted to SIA value propositions: "Connecting Saudi capital with Malaysian opportunity" and "Enabling Malaysian goods access to Saudi markets"
- **Flag treatment:** Retain actual national flags but add subtle gold border/frame consistent with SIA branding
- **Additional element:** Small "SIA" badge at the center crossing point of the two arrows

### React Implementation Notes

```
Component: <InvestmentBridge />
Library dependencies: framer-motion, SVG flags (inline or imported)

Structure:
- <motion.div> container with flex layout
- <FlagCard country="malaysia" /> (left)
- <BridgeArrows /> -- SVG containing both arrow paths
  - <ArrowPath direction="import" />
  - <ArrowPath direction="export" />
  - <FlowParticle /> x N (animated dots along paths)
- <StepIndicator number="01" description="..." />
- <StepIndicator number="02" description="..." />
- <FlagCard country="saudi" /> (right)

Props:
- importLabel: string
- exportLabel: string
- steps: Array<{ number: string, title: string, description: string }>
- animated: boolean
- onStepClick?: (stepNumber: string) => void
```

### Responsive Considerations

| Breakpoint | Behavior |
|------------|----------|
| Desktop (1024px+) | Full horizontal layout, both flags and arrows visible, all text shown |
| Tablet (768--1023px) | Slightly compressed, flags scale to 100px x 66px, step descriptions wrap to 2 lines |
| Mobile (< 768px) | Vertical stack: Malaysia flag top, downward arrow, Saudi flag bottom. Arrows become vertical. Step indicators repositioned beside their arrows. Min-height 500px |

---

## 3. The Bridge Circular Flow

**Source:** Slide 21 | UUID: 6503C2BA

### Visual Description

An oval/elliptical pipeline connecting Malaysia (left anchor) and Saudi Arabia (right anchor) in a continuous circular flow. The oval is oriented horizontally, with the Malaysia flag positioned at the leftmost point and the Saudi flag at the rightmost point.

Along the oval path, six step nodes are positioned at regular intervals, each consisting of:
- A circular icon container (40px diameter)
- An icon representing the step function
- A text label below or beside the icon

**The six steps, clockwise from Malaysia:**
1. **Stakeholder Connections** -- handshake/network icon
2. **Operating Capital / Investment** -- dollar/money icon
3. **Execution Plan** -- clipboard/checklist icon
4. **Saudi Stakeholder SMEs** -- building/business icon
5. **Local Value Chain & Manufacturing** -- factory/gear icon
6. **Impact Repository** -- chart/database icon

The pipeline path uses a thick stroke (6--8px) with gradient coloring that transitions as it moves around the oval. Directional arrows or flow indicators along the path show clockwise movement.

### Geometry and Layout

- **Oval dimensions:** ~900px wide x ~400px tall (at 1440px viewport)
- **Oval stroke:** 6px solid, with gradient
- **Flag positions:** Malaysia at (50, 200) -- leftmost point; Saudi at (850, 200) -- rightmost point
- **Step nodes:** Distributed at approximately 60-degree intervals along the oval perimeter
  - Step 1 (top-left): ~135 degrees
  - Step 2 (top-center): ~90 degrees (12 o'clock)
  - Step 3 (top-right): ~45 degrees
  - Step 4 (bottom-right): ~315 degrees
  - Step 5 (bottom-center): ~270 degrees (6 o'clock)
  - Step 6 (bottom-left): ~225 degrees
- **Icon containers:** 44px diameter circles with filled background
- **Labels:** Positioned radially outward from the oval, 16px from the icon container edge
- **Flow arrows:** Small chevrons (8px) every ~120px along the oval path, pointing clockwise

### Color Specification

**Original (Wider):**
| Element | Color | Hex |
|---------|-------|-----|
| Oval path stroke | Purple gradient | #7B2FBE to #9B59D0 |
| Step icon background | Deep purple | #6C2AA5 |
| Step icon foreground | White | #FFFFFF |
| Step label text | Dark | #1A1A2E |
| Flow arrow chevrons | Purple, 60% | #7B2FBE99 |
| Background | White | #FFFFFF |

**SIA Adaptation:**
| Element | Color | Hex |
|---------|-------|-----|
| Oval path stroke | Gold gradient | #A08838 to #C8A951 to #E8D48B |
| Step icon background | Charcoal | #1C1C1E |
| Step icon foreground | Gold | #C8A951 |
| Step label text | Charcoal | #1C1C1E |
| Flow arrow chevrons | Gold, 50% | #C8A95180 |
| Background | White | #FFFFFF |

### Typography

- **Step labels:** Inter 14px / 500 weight, max-width 120px, text-align center
- **Flag country names:** Inter 16px / 600 weight, positioned below flags
- **Section heading (above diagram):** Playfair Display 36px / 700 weight

### Animation Potential

1. **Entrance (scroll-triggered):**
   - Oval path draws from Malaysia flag clockwise (stroke-dasharray, 1.5s)
   - As the path passes each step node position, the node pops in (scale 0 to 1, 0.2s each)
   - Flags slide in from their sides simultaneously with path draw

2. **Continuous flow animation:**
   - A glowing dot (6px, gold with blur) travels the oval path continuously (6s per loop)
   - Flow chevrons pulse in sequence to suggest movement (opacity 0.3 to 1.0, staggered)
   - Optional: multiple dots at different positions for a busier feel

3. **Interactive:**
   - Clicking/hovering a step node expands a detail card with description
   - The path segment leading to that node highlights

### SIA Adaptation

- **Step relabeling for SIA deal lifecycle:**
  1. "Deal Discovery" (was Stakeholder Connections)
  2. "Capital Matching" (was Operating Capital/Investment)
  3. "Due Diligence" (was Execution Plan)
  4. "Counterparty Alignment" (was Saudi Stakeholder SMEs)
  5. "Deal Execution" (was Local Value Chain & Manufacturing)
  6. "Impact Tracking" (was Impact Repository)
- **Flag treatment:** Same national flags with SIA gold border
- **Added element:** "SIA" logo at the very center of the oval

### React Implementation Notes

```
Component: <CircularDealFlow />
Library dependencies: framer-motion, lucide-react (icons)

Structure:
- <motion.svg> with viewBox for the oval
- <OvalPath /> -- the main elliptical path
- <FlowChevrons /> -- animated directional indicators
- <FlowDot /> -- animated glowing circle on path
- <StepNode /> x 6 -- positioned along path
  - <IconCircle icon={...} />
  - <StepLabel text={...} />
- <FlagAnchor country="malaysia" position="left" />
- <FlagAnchor country="saudi" position="right" />
- <CenterLogo /> (SIA logo at center)

Props:
- steps: Array<{ id, label, icon, description }>
- activeStep?: string
- animationSpeed: number (seconds per full loop)
- showFlowDots: boolean
- onStepClick?: (stepId: string) => void
```

### Responsive Considerations

| Breakpoint | Behavior |
|------------|----------|
| Desktop (1024px+) | Full oval at ~900px width, all labels external |
| Tablet (768--1023px) | Oval compressed to ~700px, labels may overlap -- switch to tooltip-on-hover for labels |
| Mobile (< 768px) | Convert oval to a vertical list/timeline. Flags at top and bottom. Steps listed vertically with connecting line. Flow direction indicated by downward arrows |

---

## 4. Circular Economy Infinity Loop

**Source:** Slide 23 | UUID: B8DD6780

### Visual Description

An infinity symbol (lemniscate) rendered as a thick, smooth curve. The left loop is filled with a purple gradient and labeled "Circular Economy." The right loop is filled with a gray/dark gradient and labeled "Wider." At the crossing point in the center, the two colors blend via a gradient transition.

The shape is clean and geometric, using a smooth Bezier-based infinity path rather than two overlapping circles. The overall feel is modern and minimal.

### Geometry and Layout

- **Overall dimensions:** ~800px wide x ~350px tall
- **Infinity path:** Thick stroke (no fill on path itself; the loops are filled regions)
  - Mathematical basis: lemniscate of Bernoulli, scaled
  - Practical SVG: Two connected Bezier curves forming the figure-eight
  - Stroke width: 60--80px (the "ribbon" width)
- **Left loop center:** ~(200, 175)
- **Right loop center:** ~(600, 175)
- **Crossing point:** ~(400, 175) -- exact center
- **Left loop radius (approximate):** 160px
- **Right loop radius (approximate):** 160px
- **Text positions:**
  - "Circular Economy" centered in left loop, slightly above vertical center
  - "Wider" centered in right loop, slightly above vertical center

### Color Specification

**Original (Wider):**
| Element | Color | Hex |
|---------|-------|-----|
| Left loop fill | Purple gradient | #7B2FBE to #9B59D0 |
| Right loop fill | Dark gray gradient | #2D2D3A to #4A4A5A |
| Crossing gradient | Purple to gray blend | transition zone |
| Left text | White | #FFFFFF |
| Right text | White | #FFFFFF |
| Background | White or dark | contextual |

**SIA Adaptation:**
| Element | Color | Hex |
|---------|-------|-----|
| Left loop fill | Gold gradient | #A08838 to #C8A951 |
| Right loop fill | Charcoal gradient | #1C1C1E to #2A2A2E |
| Crossing gradient | Gold to charcoal blend | transition zone |
| Left text | White | #FFFFFF |
| Right text | Gold | #C8A951 |
| Background | Navy | #0A1628 |

### Typography

- **"Circular Economy" label:** Inter 20px / 700 weight, uppercase, letter-spacing 0.03em
- **"Wider" label:** Inter 24px / 700 weight, uppercase
- **SIA versions:** "Sustainable Deals" (left), "SIA Platform" (right)

### Animation Potential

1. **Entrance:**
   - Infinity path draws from the crossing point outward in both directions simultaneously (1s)
   - Fill colors flood in after path is drawn (0.5s gradient reveal)
   - Text fades in last (0.3s)

2. **Continuous:**
   - A glowing dot traces the infinity path continuously (8s per loop)
   - Subtle gradient shift -- colors slowly oscillate along the path (10s cycle)
   - At the crossing point, a brief pulse/glow effect each time the dot passes (suggesting synergy)

3. **Interaction:**
   - Hovering left loop slightly enlarges it and shows "Circular Economy" detail
   - Hovering right loop does the same for "SIA Platform"

### SIA Adaptation

- **Left loop:** "Sustainable Deals" or "Circular Economy" (retain if the concept aligns with SIA ESG angle)
- **Right loop:** "SIA Platform" or "Deal Engine"
- **Conceptual reframe:** The infinity loop represents the self-sustaining nature of the SIA deal ecosystem -- completed deals generate data and relationships that fuel new deals
- **Sub-labels (optional):** Small text along the path: "Match -> Execute -> Learn -> Match" flowing around the loop

### React Implementation Notes

```
Component: <InfinityLoop />
Library dependencies: framer-motion (path animation)

Structure:
- <motion.svg> with viewBox="0 0 800 350"
- <InfinityPath /> -- the main SVG path with gradient fill
- <LeftLoopLabel text="..." />
- <RightLoopLabel text="..." />
- <FlowDot /> -- animated circle on path
- <CrossingPulse /> -- glow effect at center

Props:
- leftLabel: string
- rightLabel: string
- leftColor: string (gradient start)
- rightColor: string (gradient start)
- animated: boolean
- flowSpeed: number

SVG Path (approximate):
"M 400,175 C 400,50 650,50 650,175 C 650,300 400,300 400,175 C 400,50 150,50 150,175 C 150,300 400,300 400,175 Z"
```

### Responsive Considerations

| Breakpoint | Behavior |
|------------|----------|
| Desktop (1024px+) | Full 800px width, text inside loops |
| Tablet (768--1023px) | Scaled to 600px, text scales proportionally |
| Mobile (< 768px) | Scaled to 320px width, text may need to move outside/below the loops as labels. Consider a simplified vertical "two circles stacked" layout if readability suffers |

---

## 5. Value Chain S-Curve

**Source:** Slide 28 | UUID: 01D22156

### Visual Description

Seven numbered steps arranged in an S-shaped (serpentine) layout, reading left-to-right then right-to-left in alternating rows. Each step consists of a large numbered circle connected to the next step by a gray chain/line.

**The 7 steps in order:**
1. Project Design
2. Delivery Integration
3. Digital Environment
4. Digitize Execution
5. Transaction
6. Feasibility
7. Availability of Projects

The S-curve reads:
- Row 1 (left to right): Steps 1 --> 2 --> 3
- Row 2 (right to left): Steps 4 --> 5
- Row 3 (left to right): Steps 6 --> 7

Connection lines curve to create the S-shape, turning back at the end of each row.

### Geometry and Layout

- **Container:** ~1000px wide x ~600px tall
- **Step circles:** 56px diameter, numbered inside
- **Row spacing:** ~180px vertical gap between rows
- **Horizontal spacing:** ~200px between steps in the same row
- **Row 1 (y=100):** Steps 1, 2, 3 at x = 150, 400, 650
- **Row 2 (y=300):** Steps 4, 5 at x = 650, 400 (reversed direction)
- **Row 3 (y=500):** Steps 6, 7 at x = 400, 650
- **Connection lines:** 3px stroke, curved at row transitions (quarter-circle arcs with radius ~90px)
- **Step labels:** Positioned below each circle, centered

### Color Specification

**Original (Wider):**
| Element | Color | Hex |
|---------|-------|-----|
| Step circle fill | Deep purple | #7B2FBE |
| Step number text | White | #FFFFFF |
| Step label text | Dark | #1A1A2E |
| Connection line | Gray | #D1D5DB |
| Active step circle | Bright purple | #9B59D0 |
| Background | White | #FFFFFF |

**SIA Adaptation:**
| Element | Color | Hex |
|---------|-------|-----|
| Step circle fill | Charcoal | #1C1C1E |
| Step circle border | Gold | #C8A951 |
| Step number text | Gold | #C8A951 |
| Step label text | Charcoal | #1C1C1E |
| Connection line | Silver | #C0C0C0 |
| Active step circle fill | Gold | #C8A951 |
| Active step number text | Charcoal | #1C1C1E |
| Background | White | #FFFFFF |

### Typography

- **Step numbers:** Inter 24px / 700 weight, centered in circle
- **Step labels:** Inter 14px / 500 weight, max-width 140px, text-align center, positioned 12px below circle
- **Section heading:** Playfair Display 36px / 700 weight, above the diagram

### Animation Potential

1. **Entrance (scroll-triggered):**
   - Connection line draws the entire S-path first (1.5s, stroke-dasharray)
   - Step circles pop in sequentially as the line "reaches" them (0.2s each, scale spring)
   - Labels fade in 0.1s after their circle appears

2. **Progressive reveal (stepper mode):**
   - Steps illuminate one at a time as user scrolls
   - Active step: gold fill, enlarged by 10%
   - Completed steps: gold outline, normal size
   - Upcoming steps: gray/muted

3. **Idle:**
   - A subtle pulse on the "current" step (if used as a progress indicator)
   - Small particle traveling the S-path (6s per full traverse)

### SIA Adaptation

- **Step relabeling for SIA deal pipeline:**
  1. "Deal Sourcing" (was Project Design)
  2. "AI Matching" (was Delivery Integration)
  3. "Virtual Data Room" (was Digital Environment)
  4. "Due Diligence" (was Digitize Execution)
  5. "Deal Execution" (was Transaction)
  6. "Compliance Review" (was Feasibility)
  7. "Portfolio Tracking" (was Availability of Projects)
- **Conceptual framing:** "From discovery to closing -- your deal journey through the SIA platform"

### React Implementation Notes

```
Component: <SCurvePipeline />
Library dependencies: framer-motion

Structure:
- <motion.svg> with viewBox for the full S-curve
- <SCurvePath /> -- the connecting S-shaped line
- <StepNode /> x 7 -- circles with numbers
  - <StepCircle number={n} active={boolean} />
  - <StepLabel text={...} />
- <FlowParticle /> -- optional animated dot

Props:
- steps: Array<{ number: number, label: string, description?: string }>
- activeStep?: number
- completedSteps?: number[]
- onStepClick?: (step: number) => void
- variant: 'static' | 'progressive' | 'animated'
```

### Responsive Considerations

| Breakpoint | Behavior |
|------------|----------|
| Desktop (1024px+) | Full S-curve layout |
| Tablet (768--1023px) | Compressed S-curve, 3 steps per row still works at smaller spacing |
| Mobile (< 768px) | Convert to vertical timeline. Steps listed top-to-bottom with a single vertical connecting line on the left. Numbers on the line, labels to the right. S-shape is lost but readability is preserved |

---

## 6. Project Models Comparison

**Source:** Slide 22 | UUID: 2F332CB8

### Visual Description

Two house/building-shaped diagrams placed side by side, creating a visual comparison between Malaysian and Saudi project categories. Each "building" has:

- **Roof/header:** A triangular or angled top section containing the country flag
- **Body:** Rectangular area divided into horizontal rows, each representing a project category
- **Base:** A shared bottom bar spanning both buildings labeled "Proposed Deal/Match"

**Left building (Malaysia) rows:**
- Development Projects
- Trading & Industries
- Manufacturing
- (additional rows as applicable)

**Right building (Saudi Arabia) rows:**
- Matching categories mirroring the Malaysian side
- Each row aligns horizontally with its Malaysian counterpart

The layout implies that rows at the same vertical position represent matching/compatible sectors.

### Geometry and Layout

- **Overall container:** ~1000px wide x ~500px tall
- **Each building:** ~420px wide x ~380px tall, separated by 60px gap
- **Roof section:** Trapezoidal or peaked shape, 60px tall, contains flag (48px x 32px)
- **Body rows:** Each row ~50px tall, full width of building, alternating backgrounds
- **Row padding:** 16px horizontal, 12px vertical
- **Bottom bar:** Spans full 1000px width, 56px tall, below both buildings
- **Connecting indicators:** Dashed horizontal lines or arrows between matching rows across the gap

### Color Specification

**Original (Wider):**
| Element | Color | Hex |
|---------|-------|-----|
| Building outline | Gray | #D1D5DB |
| Roof fill | Light purple | #EDE4F7 |
| Row (even) | White | #FFFFFF |
| Row (odd) | Very light gray | #F9FAFB |
| Row text | Dark | #1A1A2E |
| Bottom bar fill | Deep purple | #7B2FBE |
| Bottom bar text | White | #FFFFFF |
| Connection lines | Purple dashed | #7B2FBE |

**SIA Adaptation:**
| Element | Color | Hex |
|---------|-------|-----|
| Building outline | Silver | #C0C0C0 |
| Roof fill | Light gold | #F5EDD3 |
| Row (even) | White | #FFFFFF |
| Row (odd) | Off-white | #FAFAF7 |
| Row text | Charcoal | #1C1C1E |
| Bottom bar fill | Charcoal | #1C1C1E |
| Bottom bar text | Gold | #C8A951 |
| Connection lines | Gold dashed | #C8A951 |

### Typography

- **Country label (in roof):** Inter 16px / 600 weight
- **Row labels:** Inter 14px / 400 weight
- **Bottom bar text:** Inter 18px / 700 weight, uppercase
- **Section heading:** Playfair Display 36px / 700 weight

### Animation Potential

1. **Entrance:**
   - Buildings slide in from their respective sides (0.5s)
   - Rows fill in top-to-bottom (staggered 0.1s per row)
   - Connection lines draw between matching rows (0.3s each, staggered)
   - Bottom bar slides up from below (0.4s)

2. **Interactive:**
   - Hovering a row on one building highlights the matching row on the other
   - Connection line between the pair becomes solid and gold
   - A "match score" or deal type appears in the gap between buildings

3. **Match animation:**
   - When a deal match is demonstrated, both rows glow briefly and a connecting beam animates across

### SIA Adaptation

- **Malaysian categories:** Adjusted to SIA-relevant sectors (Halal Food Manufacturing, Palm Oil & Commodities, Technology & Digital, Construction & Infrastructure, Healthcare)
- **Saudi categories:** Mirroring Saudi Vision 2030 priorities (Entertainment & Tourism, NEOM & Mega Projects, Logistics & Trade, Energy Diversification, Health & Biotech)
- **Bottom bar:** "Proposed Deal/Match" becomes "SIA Match -- Connecting Complementary Sectors"
- **Interactive enhancement:** Allow users to click matching rows to see example deals

### React Implementation Notes

```
Component: <ProjectComparison />
Library dependencies: framer-motion

Structure:
- <div> flex container
- <BuildingCard country="malaysia" flag={...}>
  - <BuildingRoof />
  - <SectorRow /> x N
- </BuildingCard>
- <ConnectionLines /> (absolutely positioned SVG overlay)
- <BuildingCard country="saudi" flag={...}>
  - <BuildingRoof />
  - <SectorRow /> x N
- </BuildingCard>
- <MatchBar label="..." /> (full width below)

Props:
- leftCountry: { name, flag, sectors: string[] }
- rightCountry: { name, flag, sectors: string[] }
- matches: Array<{ leftIndex, rightIndex, dealType? }>
- matchBarLabel: string
- onMatchClick?: (match) => void
```

### Responsive Considerations

| Breakpoint | Behavior |
|------------|----------|
| Desktop (1024px+) | Side-by-side buildings with connection lines |
| Tablet (768--1023px) | Buildings slightly narrower (~350px each), connection lines shortened |
| Mobile (< 768px) | Stack vertically. Malaysia building on top, Saudi below. Connection lines become downward arrows between matching items. Bottom bar fixed at bottom |

---

## 7. Platform Architecture

**Source:** Slide 30 | UUID: D0D3C463

### Visual Description

A layered horizontal bar diagram showing the technology platform stack. The header reads "Wider Machines & Tools." Below it, stacked horizontal bars represent different layers of the platform, from top (user-facing) to bottom (infrastructure). Each bar spans the full width and is color-coded in shades of purple.

The layers (top to bottom) represent capabilities such as:
- User Interface / Dashboard
- AI/ML Processing Layer
- Data Management & Analytics
- Security & Compliance
- Infrastructure / Cloud

Each layer bar has a label and potentially sub-labels or icons indicating specific tools within that layer.

### Geometry and Layout

- **Container:** ~1000px wide x ~450px tall
- **Header:** Full width, 60px tall, dark background with white text
- **Layer bars:** Each ~60px tall, full width, 8px vertical gap between layers
- **Layer count:** 5--7 horizontal bars
- **Layer label:** Left-aligned, 24px from left edge
- **Sub-labels/icons:** Right-aligned or distributed within the bar
- **Color intensity:** Darkest at top (most user-facing), lightening toward bottom, or gradient across all layers

### Color Specification

**Original (Wider):**
| Element | Color | Hex |
|---------|-------|-----|
| Header bar | Very dark purple | #3D1560 |
| Layer 1 (top) | Deep purple | #7B2FBE |
| Layer 2 | Medium purple | #8B45C8 |
| Layer 3 | Light purple | #9B59D0 |
| Layer 4 | Lighter purple | #A66DD6 |
| Layer 5 (bottom) | Lightest purple | #B88ADE |
| Layer text | White | #FFFFFF |
| Background | White | #FFFFFF |

**SIA Adaptation:**
| Element | Color | Hex |
|---------|-------|-----|
| Header bar | Navy | #0A1628 |
| Layer 1 (top) | Charcoal | #1C1C1E |
| Layer 2 | Dark charcoal | #2A2A2E |
| Layer 3 | Medium gray | #3A3A3E |
| Layer 4 | Silver-dark | #5A5A5E |
| Layer 5 (bottom) | Silver | #7A7A7E |
| Layer text | White/Gold mix | #FFFFFF / #C8A951 for emphasis |
| Accent line (left edge of each bar) | Gold | #C8A951 |
| Background | White | #FFFFFF |

### Typography

- **Header text:** Inter 20px / 700 weight, uppercase
- **Layer labels:** Inter 16px / 600 weight
- **Sub-labels:** Inter 12px / 400 weight

### Animation Potential

1. **Entrance:**
   - Layers slide in from the left, staggered 0.15s each, starting from top
   - A gold accent line draws along the left edge of each layer (0.3s after slide-in)
   - Text fades in 0.1s after layer slides in

2. **Interactive:**
   - Hovering a layer expands it slightly (height 60px to 80px) and reveals sub-detail
   - Other layers compress proportionally
   - Accordion-style expansion

### SIA Adaptation

- **Header:** "Wider Machines & Tools" becomes "SIA Technology Platform"
- **Layer relabeling:**
  1. "Deal Dashboard & Portfolio Manager"
  2. "AI Matching Engine & Recommendation"
  3. "Secure Data Room & Document Management"
  4. "Compliance, KYC/AML & Regulatory"
  5. "Cloud Infrastructure & API Layer"
- **Left edge accent:** 4px gold bar on the left edge of each layer for SIA brand identity

### React Implementation Notes

```
Component: <PlatformStack />
Library dependencies: framer-motion

Structure:
- <div> vertical flex container
- <StackHeader title="..." />
- <StackLayer /> x N -- each a full-width bar
  - <LayerLabel primary={...} />
  - <LayerDetail /> (expandable content)
  - <GoldAccent /> (left edge bar)

Props:
- title: string
- layers: Array<{ label, sublabel?, detail?, icon? }>
- expandable: boolean
- onLayerClick?: (index: number) => void
```

### Responsive Considerations

| Breakpoint | Behavior |
|------------|----------|
| Desktop (1024px+) | Full-width bars, all labels visible |
| Tablet (768--1023px) | Same layout, text wraps if needed |
| Mobile (< 768px) | Same stacked layout works well on mobile -- bars become full viewport width. Text size reduces to 14px. Expand-on-tap interaction |

---

## 8. System Architecture Grid

**Source:** Slide 31 | UUID: 2868625F

### Visual Description

A 3x3 grid of module cards, each representing a system capability. Each card contains:
- An icon (top area, centered)
- A module title
- A brief description (1--2 lines)

The cards have a connected/flowing layout, suggesting they work as an integrated system. Subtle connection lines or shared borders between adjacent cards reinforce this.

### Geometry and Layout

- **Grid container:** ~960px wide x ~720px tall
- **Grid:** 3 columns x 3 rows
- **Card dimensions:** ~300px wide x ~220px tall
- **Gap between cards:** 12--16px
- **Card internal padding:** 24px
- **Icon area:** Centered, 48px x 48px icon, 20px below card top
- **Title:** Centered, 16px below icon
- **Description:** Centered, 12px below title, max-width 260px

### Color Specification

**Original (Wider):**
| Element | Color | Hex |
|---------|-------|-----|
| Card background | White | #FFFFFF |
| Card border | Light gray | #E5E7EB |
| Card shadow | Subtle | rgba(0,0,0,0.05) |
| Icon color | Purple | #7B2FBE |
| Title text | Dark | #1A1A2E |
| Description text | Medium gray | #6B7280 |
| Grid background | Light gray | #F3F4F6 |
| Hover card border | Purple | #7B2FBE |

**SIA Adaptation:**
| Element | Color | Hex |
|---------|-------|-----|
| Card background | White | #FFFFFF |
| Card border | Silver-light | #E8E8E8 |
| Card shadow | Subtle gold | rgba(200,169,81,0.08) |
| Icon color | Gold | #C8A951 |
| Title text | Charcoal | #1C1C1E |
| Description text | Medium gray | #6B7280 |
| Grid background | Off-white | #FAFAF7 |
| Hover card border | Gold | #C8A951 |
| Hover card shadow | Gold glow | rgba(200,169,81,0.15) |

### Typography

- **Card title:** Inter 16px / 600 weight
- **Card description:** Inter 13px / 400 weight, line-height 1.5
- **Section heading:** Playfair Display 36px / 700 weight, above grid

### Animation Potential

1. **Entrance (scroll-triggered):**
   - Cards fade in + slide up with stagger (0.1s per card, reading order: left-to-right, top-to-bottom)
   - Icons animate individually (e.g., gear rotates, chart draws, etc.) after card appears

2. **Hover:**
   - Card lifts (translateY -4px), shadow deepens, border color shifts to gold (0.2s)
   - Icon scales up slightly (1.1x)

3. **Connection animation (optional):**
   - Subtle animated dots traveling between adjacent cards along the grid lines
   - Represents data/integration flowing between modules

### SIA Adaptation

**Module cards (9 capabilities):**
1. **Deal Matching Engine** -- AI-powered counterparty discovery
2. **Secure Data Room** -- Document sharing and due diligence
3. **KYC/AML Compliance** -- Automated regulatory checks
4. **Communication Hub** -- Encrypted messaging and video
5. **Financial Modeling** -- Deal valuation and term sheets
6. **Project Management** -- Milestone and deliverable tracking
7. **Analytics Dashboard** -- Portfolio and pipeline insights
8. **Government Liaison** -- SAGIA/MIDA integration
9. **Impact Reporting** -- ESG and outcome measurement

### React Implementation Notes

```
Component: <SystemGrid />
Library dependencies: framer-motion, lucide-react

Structure:
- <div> grid container (CSS Grid 3x3)
- <ModuleCard /> x 9
  - <CardIcon icon={...} />
  - <CardTitle text={...} />
  - <CardDescription text={...} />
- Optional: <ConnectionOverlay /> (SVG positioned absolutely)

Props:
- modules: Array<{ id, title, description, icon: LucideIcon }>
- columns: 2 | 3 (responsive override)
- onModuleClick?: (id: string) => void
- animated: boolean
```

### Responsive Considerations

| Breakpoint | Behavior |
|------------|----------|
| Desktop (1024px+) | 3x3 grid, all cards equal size |
| Tablet (768--1023px) | 2-column grid (last card spans full width or centered) |
| Mobile (< 768px) | Single column stack, cards become full-width list items. Consider horizontal scroll carousel as alternative. Card height reduces to ~160px |

---

## Global Implementation Notes

### Shared Dependencies
- **framer-motion:** Used across all 8 diagram components for entrance, idle, and interactive animations
- **lucide-react:** Icon library for step icons, module icons, and flow indicators
- **SVG (inline):** All geometric diagrams (hub-spoke, infinity loop, S-curve, circular flow) should be SVG-based for resolution independence and animation control
- **Intersection Observer (useInView from framer-motion):** All entrance animations triggered on scroll into viewport

### Shared Color Tokens (SIA Palette)

```typescript
const SIA_DIAGRAM_COLORS = {
  gold: {
    DEFAULT: '#C8A951',
    dark: '#A08838',
    light: '#E8D48B',
    glow: 'rgba(200, 169, 81, 0.15)',
  },
  charcoal: '#1C1C1E',
  silver: {
    DEFAULT: '#C0C0C0',
    light: '#E8E8E8',
  },
  navy: '#0A1628',
  text: {
    primary: '#1C1C1E',
    secondary: '#6B7280',
    onDark: '#FFFFFF',
    accent: '#C8A951',
  },
} as const;
```

### Performance Considerations
- SVG diagrams should use `will-change: transform` sparingly (only during active animations)
- Animated dots/particles should be limited to 3--5 concurrent per diagram
- Use `prefers-reduced-motion` media query to disable continuous animations
- Lazy-load diagram components below the fold with React.lazy + Suspense
- Consider using CSS animations for simple transforms and framer-motion only for orchestrated sequences

### Accessibility
- All diagrams must have `role="img"` and `aria-label` describing the visualization
- Interactive diagrams need keyboard navigation (Tab through nodes, Enter to select)
- Screen reader text should describe the flow/relationship as a list when the visual cannot be perceived
- Color alone should never be the only indicator -- use patterns, labels, or shape differences as secondary signals
