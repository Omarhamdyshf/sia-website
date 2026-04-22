# 05 - Layout Patterns & Content Grids

Reference documentation for all layout patterns, grids, and content display components derived from the Wider Presentation, adapted for the SIA website.

---

## Table of Contents

1. [Section Divider Slides](#1-section-divider-slides)
2. [Industries/Sectors Grid](#2-industriessectors-grid)
3. [Team Member Grid](#3-team-member-grid)
4. [Partners Logo Grid](#4-partners-logo-grid)
5. [Who Are We / Quote Layout](#5-who-are-we--quote-layout)
6. [Mission/Vision/Values Layout](#6-missionvisionvalues-layout)
7. ["How Wide We Are" Scale Slide](#7-how-wide-we-are-scale-slide)
8. [World Map with Locations](#8-world-map-with-locations)
9. [Thank You / Contact Slide](#9-thank-you--contact-slide)

---

## 1. Section Divider Slides

**Source Slides:** 1 (EA11388C), 4 (2F2FCB35), 18 (CCA69815), 24 (2FBC2552), 29 (4199FA79), 33 (CEB4DFC5)

### Visual Description

Full-viewport panels that serve as section transitions. Each features:
- A full-bleed cinematic photograph as the background (reflective water, glass globe, lightbulbs, star trails, highway trucks, mountain silhouettes)
- A color gradient overlay (purple, dark blue, or blue-teal depending on section)
- A large translucent section number rendered as a watermark (1-6), occupying roughly 40-60% of the viewport height
- Section title text positioned at the bottom-left quadrant
- On the cover slide (Slide 1): "COMPANY PROFILE" in large white uppercase text with the Wider logo in the top-right

### Grid/Spacing System

| Property | Value |
|---|---|
| Container | Full viewport width and height (`100vw x 100vh`) |
| Content padding | `48px` left/bottom on desktop, `24px` on mobile |
| Section number position | Centered or right-aligned, vertically centered |
| Title text position | Bottom-left, `64px` from bottom edge, `48px` from left edge |
| Logo position (cover) | Top-right, `32px` inset |

### Color Treatment

**Wider Original Overlays:**
- Slides 1, 4, 18, 33: Purple gradient `rgba(88, 28, 135, 0.70)` to `rgba(88, 28, 135, 0.40)`
- Slide 24: Dark blue `rgba(10, 22, 40, 0.75)` to `rgba(10, 22, 40, 0.50)`
- Slide 29: Blue-teal `rgba(13, 71, 95, 0.70)` to `rgba(13, 71, 95, 0.45)`

**SIA Palette Mapping:**
- Primary overlay: `rgba(28, 28, 30, 0.80)` to `rgba(28, 28, 30, 0.50)` (charcoal `#1C1C1E`)
- Accent overlay: `rgba(10, 22, 40, 0.75)` to `rgba(10, 22, 40, 0.45)` (navy `#0A1628`)
- Gold highlight: Section number rendered in `rgba(200, 169, 81, 0.08)` (gold `#C8A951` at low opacity)
- Text: Pure white `#FFFFFF` for titles, `rgba(255, 255, 255, 0.90)` for subtitles

### Typography

| Element | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Section number watermark | Playfair Display | `clamp(200px, 30vw, 400px)` | 700 | Opacity 0.06-0.10 |
| Section title | Playfair Display | `clamp(2rem, 4vw, 3.5rem)` | 600 | White, uppercase tracking `0.05em` |
| Subtitle text | Inter | `clamp(1rem, 2vw, 1.25rem)` | 400 | White at 80% opacity |
| "COMPANY PROFILE" (cover) | Inter | `clamp(0.875rem, 1.5vw, 1.125rem)` | 600 | Uppercase, letter-spacing `0.2em` |

### Content Structure

```
[Full-bleed background image]
  [Gradient overlay layer]
    [Large translucent section number - z-index: 1]
    [Section title block - z-index: 2]
      - Section number label (e.g., "1")
      - Section name (e.g., "Value Proposition")
    [Logo - z-index: 2, top-right on cover only]
```

### Animation Potential

- **Parallax scroll**: Background image moves at 0.3x scroll speed while overlay stays fixed
- **Number reveal**: Section number fades in and scales from 0.8 to 1.0 over 800ms
- **Title slide-up**: Text slides up 30px with fade, 500ms duration, 200ms delay after number
- **Image ken-burns**: Subtle 10% scale zoom over 20 seconds on background image
- **Intersection Observer trigger**: Animations fire when section enters viewport at 30% threshold

### SIA Adaptation

- Replace purple gradients with charcoal-to-transparent or navy-to-transparent
- Section number watermark in gold at very low opacity (`rgba(200, 169, 81, 0.08)`)
- SIA logo (metallic silver with gold swoosh) replaces Wider logo in top-right of cover
- Background images should reflect KSA-Malaysia corridor themes: skylines, architecture, business corridors
- Section names for SIA: "About SIA", "Our Sectors", "Our Scale", "Strategic Partners", "Our Projects", "Leadership"

### Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| Desktop (1280px+) | Full viewport height, large number watermark, generous padding |
| Tablet (768-1279px) | 80vh minimum height, number scaled to 60%, padding reduced to 32px |
| Mobile (< 768px) | 60vh minimum height, number scaled to 40%, padding 24px, title font reduced |

### Existing SIA Components

- **`FadeIn`** (`app/src/components/animations/FadeIn.tsx`): Reuse for title and subtitle entry animations
- **`StaggerContainer`** / **`StaggerItem`** (`app/src/components/animations/StaggerContainer.tsx`): For staggered multi-element reveals
- New component needed: `SectionDivider` or `CinematicHero`

---

## 2. Industries/Sectors Grid

**Source Slide:** 17 (CB1E6AD6)

### Visual Description

A 2-row by 3-column grid of image cards, each representing an industry sector. Each card features a full-bleed background photograph with a dark gradient overlay from bottom, and the industry name overlaid as white text at the bottom of the card. The "Industries" header is right-aligned above the grid.

### Grid/Spacing System

| Property | Value |
|---|---|
| Container | `max-width: 1280px`, centered with `auto` margins |
| Grid | `grid-template-columns: repeat(3, 1fr)` |
| Grid gap | `24px` (1.5rem) |
| Card aspect ratio | `4:3` (approximately 400px x 300px on desktop) |
| Section padding | `80px` top/bottom, `16px-32px` horizontal |
| Header margin-bottom | `48px` |

### Color Treatment

- Card image overlay: Linear gradient from `rgba(0, 0, 0, 0)` at top to `rgba(0, 0, 0, 0.65)` at bottom
- Card hover overlay: Darkens to `rgba(0, 0, 0, 0.75)` with optional gold accent border
- Card border: `1px solid rgba(255, 255, 255, 0.10)` (subtle light edge)
- SIA mapping: Hover state adds `box-shadow: 0 0 40px rgba(200, 169, 81, 0.15)` (gold-glow from tailwind config)

### Typography

| Element | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Section header "Industries" | Playfair Display | `text-section` (clamp 2rem-3rem) | 500 | Right-aligned |
| Card industry name | Inter | `1.125rem` (18px) | 600 | White, bottom-left of card, `16px` padding |
| Card subtitle (optional) | Inter | `0.875rem` (14px) | 400 | White at 70% opacity |

### Content Structure

```
[Section container]
  [Header: "Industries" - right-aligned]
  [Grid 3x2]
    [Card]
      [Background image - object-fit: cover]
      [Bottom gradient overlay]
      [Text overlay at bottom]
        - Industry name
        - Optional: brief descriptor
    [/Card]
    ... (6 cards total in Wider, 8 for SIA)
```

**SIA Sectors (8 cards):**
1. Halal Industry
2. Healthcare & Biotech
3. Real Estate & Infrastructure
4. Technology & AI
5. Islamic Finance
6. Energy & Renewables
7. Tourism & Hospitality
8. Logistics & Trade

### Animation Potential

- **Staggered reveal**: Cards appear one by one with 100ms delay using `StaggerContainer`
- **Hover scale**: Card scales to `1.03` on hover with `transition-transform duration-300`
- **Hover overlay shift**: Gradient overlay lightens, gold border appears
- **Image zoom**: Background image scales to `1.08` on hover within overflow-hidden container
- **Card flip** (optional): On click, card flips to reveal sector description on back

### SIA Adaptation

- Expand to 8 cards: Use `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4` for 2x4 or `grid-cols-2 md:grid-cols-3 xl:grid-cols-4` layout
- Header changes to "Our Sectors" or "Strategic Sectors", left-aligned to match SIA style
- Images sourced from KSA-Malaysia context (halal food production, Kuala Lumpur skyline, Saudi infrastructure, etc.)
- Gold accent on hover states using `shadow-gold-glow` from Tailwind config

### Responsive Behavior

| Breakpoint | Columns | Card Height |
|---|---|---|
| Desktop (1280px+) | 4 columns | ~280px |
| Large tablet (1024px) | 3 columns | ~260px |
| Tablet (768px) | 2 columns | ~240px |
| Mobile (< 768px) | 1 column, horizontal scroll or stacked | ~200px |

### Existing SIA Components

- **`Card`** (`app/src/components/ui/card.tsx`): Base card component, needs image overlay variant
- **`StaggerContainer` / `StaggerItem`**: Already used in `EcosystemSection.tsx` for grid animations
- **`FadeIn`**: For section header reveal
- New variant needed: `ImageCard` or `SectorCard` with background image + overlay pattern

---

## 3. Team Member Grid

**Source Slides:** 38 (43C3B9F6), 39 (CB7E1B09)

### Visual Description

A dense team grid displaying 12 members per slide (3 rows x 4 columns). Each member card features a circular portrait photo centered above the member's name and role. The cards sit on a dark navy background with white text. Photos are consistently sized with circular crops.

### Grid/Spacing System

| Property | Value |
|---|---|
| Container | `max-width: 1280px`, centered |
| Grid | `grid-template-columns: repeat(4, 1fr)` |
| Grid gap | `32px` horizontal, `48px` vertical |
| Card width | Flexible, approximately `260px` each |
| Photo diameter | `120px` (7.5rem) on desktop |
| Photo-to-name spacing | `16px` |
| Name-to-role spacing | `4px` |
| Section padding | `80px` top/bottom |

### Color Treatment

- Background: Navy `#0A1628` or Charcoal `#1C1C1E`
- Card background: `rgba(255, 255, 255, 0.03)` (very subtle card surface) or transparent
- Photo border: `2px solid rgba(200, 169, 81, 0.30)` (subtle gold ring for SIA)
- Name text: White `#FFFFFF`
- Role text: `rgba(255, 255, 255, 0.60)` (muted white)
- Hover: Card gets `rgba(255, 255, 255, 0.05)` background, photo border brightens to gold

### Typography

| Element | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Section header "Our Team" | Playfair Display | `text-section` | 500 | Centered, white |
| Member name | Inter | `1rem` (16px) | 600 | White, centered |
| Member role/title | Inter | `0.875rem` (14px) | 400 | Muted white, centered |
| Department (optional) | Inter | `0.75rem` (12px) | 400 | Gold accent color |

### Content Structure

```
[Section - dark background]
  [Header: "Our Team" or "Leadership" - centered]
  [Subheading: optional descriptor]
  [Grid 4x3]
    [Member Card]
      [Circular photo - centered]
      [Name - centered below photo]
      [Role/Title - centered below name]
      [Optional: department tag]
    [/Member Card]
    ... (12 members per page)
```

**SIA Team (from Slide 38):**
- Omar Hamdy - Founder & CEO
- Youssef - Infrastructure Strategy
- Mohamed Yasser - [Role]
- Ahmed - Public Relations
- Plus additional members from Slide 39

### Animation Potential

- **Staggered grid entrance**: Each card appears with 80ms stagger using `StaggerContainer`
- **Photo reveal**: Circular photo scales from 0 to 1 with slight bounce easing
- **Hover lift**: Card translates Y by -8px with shadow increase
- **Photo glow**: On hover, gold glow ring appears around photo (`shadow-gold-glow`)
- **Scroll-triggered rows**: Each row of 4 animates independently as it enters viewport

### SIA Adaptation

- Dark section background using `bg-navy` or `bg-charcoal`
- Gold accent ring around photos instead of plain border
- Add LinkedIn/social icons on hover (slide up from bottom of card)
- Consider a "Leadership" tier (larger cards, 3-column) for C-suite, followed by "Team" tier (4-column, smaller)
- Photo placeholder: Gold-gradient initials circle for members without photos

### Responsive Behavior

| Breakpoint | Columns | Photo Size |
|---|---|---|
| Desktop (1280px+) | 4 columns | 120px diameter |
| Large tablet (1024px) | 3 columns | 110px diameter |
| Tablet (768px) | 2 columns | 100px diameter |
| Mobile (< 768px) | 2 columns (compact) or 1 column | 80px diameter |

### Existing SIA Components

- **`Avatar`** (`app/src/components/ui/avatar.tsx`): Circular image component with fallback
- **`Card`**: Base card for wrapping member info
- **`StaggerContainer` / `StaggerItem`**: Grid animation
- **`FadeIn`**: Section header animation
- New component needed: `TeamMemberCard` with photo, name, role slots

---

## 4. Partners Logo Grid

**Source Slide:** 27 (573FC13B)

### Visual Description

A clean, minimal layout with "Our Partners" as a centered header, followed by 2 rows of partner logos on a white background. Logos are presented at consistent heights with grayscale treatment, becoming full-color on hover. Partners include NoviraHealth, SILK, B&P, homains, ISC, EGRO9075, HTU, UNSW.

### Grid/Spacing System

| Property | Value |
|---|---|
| Container | `max-width: 1120px`, centered |
| Grid | `grid-template-columns: repeat(4, 1fr)` per row |
| Grid gap | `48px` horizontal, `32px` vertical |
| Logo max-height | `48px` |
| Logo container height | `80px` (flex center alignment) |
| Section padding | `80px` top/bottom |
| Header margin-bottom | `56px` |

### Color Treatment

- Background: White `#FFFFFF` (light mode) or card background (dark mode)
- Logo default: Grayscale filter with 60% opacity
- Logo hover: Full color, 100% opacity
- Optional gold accent: Thin bottom border on hover `border-bottom: 2px solid #C8A951`
- Section border: Optional top/bottom border in `border-border` color

### Typography

| Element | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Section header | Playfair Display | `text-section` | 500 | Centered |
| Subtitle (optional) | Inter | `1rem` | 400 | Muted foreground, centered |

### Content Structure

```
[Section - white/light background]
  [Header: "Our Partners" or "Strategic Partners" - centered]
  [Optional subtitle]
  [Logo Grid]
    Row 1: [Logo] [Logo] [Logo] [Logo]
    Row 2: [Logo] [Logo] [Logo] [Logo]
  [/Logo Grid]
```

**SIA Partners:** To be populated with actual KSA-Malaysia corridor partners (government bodies, investment firms, industry associations, etc.)

### Animation Potential

- **Fade-in stagger**: Logos appear one by one with 100ms delay
- **Grayscale to color**: `filter: grayscale(100%)` transitions to `filter: grayscale(0%)` on hover
- **Marquee alternative**: For many partners, use the existing `Marquee` component for continuous scroll
- **Scale on hover**: Gentle `scale(1.08)` transform on hover with `transition-all duration-300`

### SIA Adaptation

- The existing `PartnerLogos.tsx` uses a marquee of text-based partner names -- this pattern offers an alternative static grid for actual logo images
- For SIA, consider a hybrid: static grid on desktop, marquee on mobile
- Replace Wider partners with SIA strategic partners
- Add "Powered by" or "Trusted by" variant for government/institutional partners
- Gold hover accent matches SIA brand

### Responsive Behavior

| Breakpoint | Columns | Logo Height |
|---|---|---|
| Desktop (1280px+) | 4 columns | 48px |
| Tablet (768-1279px) | 3 columns | 40px |
| Mobile (< 768px) | 2 columns or marquee scroll | 36px |

### Existing SIA Components

- **`PartnerLogos`** (`app/src/sections/PartnerLogos.tsx`): Existing marquee-based partner display -- can be extended with a grid mode
- **`Marquee`** (`app/src/components/animations/Marquee.tsx`): For mobile/overflow fallback
- **`EcosystemSection`** (`app/src/sections/EcosystemSection.tsx`): Uses a 3x4 grid of partner boxes -- good structural reference
- **`StaggerContainer` / `StaggerItem`**: Grid animation

---

## 5. Who Are We / Quote Layout

**Source Slide:** 2 (ADC21B69)

### Visual Description

A dramatic full-bleed layout with wind turbines photograph as background, overlaid with a purple gradient. A large decorative opening quotation mark serves as a visual anchor. Below/beside it, a long descriptive paragraph in white text explains the company's identity. The company logo appears in the top-left corner.

### Grid/Spacing System

| Property | Value |
|---|---|
| Container | Full viewport width, height `80vh` minimum |
| Content max-width | `800px` for text area |
| Content positioning | Centered vertically, left-aligned horizontally |
| Left padding | `80px` desktop, `32px` mobile |
| Right padding | `80px` desktop (text does not extend past 60% of viewport) |
| Quote mark size | `120px` font-size, positioned `-20px` top offset from text |
| Logo position | Top-left, `32px` inset |

### Color Treatment

- Background image overlay: `linear-gradient(135deg, rgba(88, 28, 135, 0.80), rgba(88, 28, 135, 0.50))`
- **SIA mapping:** `linear-gradient(135deg, rgba(10, 22, 40, 0.85), rgba(28, 28, 30, 0.60))` (navy to charcoal)
- Quote mark color: `rgba(200, 169, 81, 0.25)` (gold at low opacity for SIA)
- Body text: White `#FFFFFF` at 90% opacity
- Decorative accent line (optional): Gold `#C8A951`, `2px` width, `80px` length above text

### Typography

| Element | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Decorative quote mark | Playfair Display | `8rem` (128px) | 700 | Gold at 25% opacity |
| Body paragraph | Inter | `clamp(1rem, 1.5vw, 1.25rem)` | 400 | White, `line-height: 1.8`, max-width `680px` |
| Attribution (optional) | Inter | `0.875rem` | 500 | Gold, uppercase tracking |

### Content Structure

```
[Full-bleed background image]
  [Gradient overlay]
    [Logo - top-left]
    [Content area - vertically centered, left-aligned]
      [Decorative quotation mark]
      [Body paragraph - company description]
      [Optional: attribution or CTA]
```

### Animation Potential

- **Quote mark draw-in**: Quote mark scales from 0.5 to 1.0 with opacity 0 to 0.25 over 600ms
- **Text reveal**: Paragraph text fades in with slide-up, 400ms delay after quote mark
- **Background parallax**: Image moves at 0.4x scroll rate
- **Accent line grow**: A horizontal gold line grows from 0 to 80px width

### SIA Adaptation

- Replace wind turbines with relevant imagery (KSA-Malaysia business landscape, skyline, or abstract corporate photography)
- Purple overlay becomes navy/charcoal gradient
- Quote mark in gold at low opacity
- Content describes SIA's mission: B2B deal facilitation platform for the KSA-Malaysia corridor
- SIA metallic silver logo in top-left
- Add a subtle gold accent line as a divider element

### Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| Desktop (1280px+) | Full layout, text left-aligned, 60% max-width |
| Tablet (768-1279px) | Text area widens to 80%, quote mark scales to 6rem |
| Mobile (< 768px) | Text centered, quote mark scaled to 4rem, min-height 70vh, padding 24px |

### Existing SIA Components

- **`FadeIn`**: For text and quote mark entrance animations
- New component needed: `QuoteHero` or `StatementSection` with background image + overlay + quote text

---

## 6. Mission/Vision/Values Layout

**Source Slide:** 3 (EA4F7BC4)

### Visual Description

A clean white-background two-column layout. The left column contains a large, impactful tagline sentence ("The preeminent leader in marketing, accelerating, and managing public development opportunities..."). The right column has an "About Us" header with three stacked content boxes: "Our Mission", "Our Vision", and "Our Values", each containing a title and descriptive paragraph.

### Grid/Spacing System

| Property | Value |
|---|---|
| Container | `max-width: 1280px`, centered |
| Grid | `grid-template-columns: 5fr 7fr` (approx 42% / 58%) |
| Column gap | `64px` (4rem) |
| Section padding | `80px` top/bottom |
| Box stack gap | `24px` between mission/vision/values boxes |
| Box internal padding | `24px` |

### Color Treatment

- Background: White `#FFFFFF`
- Left tagline text: Charcoal `#1C1C1E` with optional gold highlight on key words
- Right "About Us" header: Charcoal `#1C1C1E`
- Box borders: `1px solid` border color (`hsl(var(--border))`)
- Box titles: Charcoal, or gold `#C8A951` for accent
- Box body text: Muted foreground (`hsl(var(--muted-foreground))`)
- Optional: Left border accent on each box using gold `#C8A951`, `3px` width

### Typography

| Element | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Left tagline | Playfair Display | `clamp(1.5rem, 3vw, 2.25rem)` | 500 | Leading `1.4`, charcoal |
| "About Us" header | Playfair Display | `text-section` | 500 | Right column |
| Box title (Mission, etc.) | Inter | `1.125rem` (18px) | 600 | Charcoal or gold |
| Box body text | Inter | `0.9375rem` (15px) | 400 | Muted foreground, `line-height: 1.7` |

### Content Structure

```
[Section - white background]
  [Two-column grid]
    [Left column - 42%]
      [Large tagline/statement text]
      [Optional: decorative element or icon]
    [Right column - 58%]
      [Header: "About Us"]
      [Box stack]
        [Box: "Our Mission"]
          [Title]
          [Description paragraph]
        [Box: "Our Vision"]
          [Title]
          [Description paragraph]
        [Box: "Our Values"]
          [Title]
          [Description paragraph]
```

### Animation Potential

- **Left column**: `FadeIn` with direction `right` (slides in from left)
- **Right column boxes**: `StaggerContainer` with 150ms stagger, each box slides up
- **Box border accent**: Gold left-border grows from 0 to full height on viewport entry
- **Keyword highlight**: Key words in tagline get gold underline animation

### SIA Adaptation

- Tagline: Describe SIA's position as the premier B2B deal facilitation platform for KSA-Malaysia corridor
- Mission: Bridging KSA-Malaysia trade and investment
- Vision: Premier platform for cross-border deal origination
- Values: Integrity, strategic alignment, cultural understanding, institutional excellence
- Gold left-border accent on boxes matches SIA brand
- Optional: Add an icon or small illustration to each box (handshake, globe, shield)

### Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| Desktop (1280px+) | Two columns side by side |
| Tablet (768-1279px) | Columns stack, tagline full-width above boxes, gap reduces to 40px |
| Mobile (< 768px) | Single column, tagline at top, boxes below, reduced padding |

### Existing SIA Components

- **`Card`** (`app/src/components/ui/card.tsx`): For mission/vision/values boxes
- **`FadeIn`**: Column entrance animations
- **`StaggerContainer` / `StaggerItem`**: For staggered box reveals
- The two-column grid pattern is already used in `EcosystemSection.tsx` and `TechnologySection.tsx` (`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`)

---

## 7. "How Wide We Are" Scale Slide

**Source Slide:** 25 (4838DD22)

### Visual Description

A minimalist, impactful single-statement slide. White background with centered text that reads "How Wider|------| we are?" where the Wider logo is integrated inline with the text. The horizontal rule/dash element spans between the logo and the surrounding words. Clean, bold, and focused on a single message.

### Grid/Spacing System

| Property | Value |
|---|---|
| Container | Full viewport width, `60vh` minimum height |
| Content | Centered both horizontally and vertically (flexbox) |
| Text + logo alignment | Inline, vertically baseline-aligned |
| Padding | `48px` all sides |

### Color Treatment

- Background: White `#FFFFFF`
- Text: Charcoal `#1C1C1E`
- Logo: Original brand colors (for SIA: metallic silver + gold swoosh)
- Dash/rule element: `#1C1C1E` or gold `#C8A951`
- Optional decorative: Subtle radial gradient from center `rgba(200, 169, 81, 0.03)`

### Typography

| Element | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Statement text | Playfair Display | `clamp(2.5rem, 6vw, 5rem)` | 700 | Centered |
| Dash element | N/A | `2px` height, `80px` width | N/A | Inline decorative |

### Content Structure

```
[Section - white background, full center]
  [Statement text with inline logo]
    "How [SIA Logo] bridges worlds"
    or "The SIA [---] Advantage"
```

### Animation Potential

- **Text reveal**: Words appear one by one with 200ms stagger
- **Logo pop**: Logo scales from 0 to 1 with bounce easing at the midpoint of the text reveal
- **Dash grow**: Horizontal line grows from center outward
- **Counter integration**: Could pair with `CountUp` component for impact metrics

### SIA Adaptation

- Transform into a bold statement section: "Bridging two of the world's most dynamic markets"
- Or: "The SIA Advantage" with logo inline
- Could serve as a scroll-triggered interstitial between major content sections
- Use as a data-impact statement: e.g., "$2.4B in facilitated deals"

### Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| Desktop (1280px+) | Large text, centered, generous whitespace |
| Tablet (768-1279px) | Text scales down via clamp, min-height 50vh |
| Mobile (< 768px) | Text wraps naturally, min-height 40vh, logo scales proportionally |

### Existing SIA Components

- **`CountUp`** (`app/src/components/animations/CountUp.tsx`): For numeric impact versions
- **`FadeIn`**: Basic reveal animation
- New component: `ImpactStatement` or `BoldInterstitial`

---

## 8. World Map with Locations

**Source Slide:** 26 (B2B12FB7)

### Visual Description

A "Our Team" (or "Global Presence") header above a full-width world map rendered in purple/violet shading. Location markers or highlights indicate presence in Saudi Arabia, Egypt, Jordan, Malaysia, Australia, and Germany. A bulleted list of countries appears alongside (or overlaid on) the map.

### Grid/Spacing System

| Property | Value |
|---|---|
| Container | `max-width: 1280px`, centered |
| Map width | 100% of container |
| Map aspect ratio | Approximately `2:1` (standard world map projection) |
| Location list | Positioned right-side or bottom, `24px` gap from map |
| Section padding | `80px` top/bottom |
| Marker size | `12px` diameter dot + `24px` pulse ring |

### Color Treatment

- Background: White or very light gray
- Map fill: `rgba(10, 22, 40, 0.08)` (navy at low opacity) for land masses
- Map highlighted countries: `rgba(200, 169, 81, 0.40)` (gold fill for active countries)
- Marker dots: Gold `#C8A951` solid
- Marker pulse ring: `rgba(200, 169, 81, 0.20)` animated expanding ring
- Connection lines (optional): Gold at 30% opacity, dashed

### Typography

| Element | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Section header | Playfair Display | `text-section` | 500 | Left-aligned |
| Country names | Inter | `1rem` | 500 | Dark text |
| City/office detail | Inter | `0.875rem` | 400 | Muted foreground |

### Content Structure

```
[Section]
  [Header: "Global Presence" or "Where We Operate"]
  [Two-column layout]
    [Left/Main: World map SVG/component]
      - Highlighted regions: KSA, Malaysia (primary, gold)
      - Secondary markers: Egypt, Jordan, etc.
      - Optional: animated connection arc between KSA and Malaysia
    [Right/Sidebar: Location list]
      - Saudi Arabia - Riyadh
      - Malaysia - Kuala Lumpur
      - Egypt - Cairo
      - (etc.)
```

### Animation Potential

- **Map fade-in**: Map fades in with slight scale from 0.95 to 1.0
- **Marker pulse**: Gold dots pulse with expanding ring animation (keyframe: scale 1 to 2.5, opacity 1 to 0)
- **Connection arc**: Animated SVG arc between KSA and Malaysia drawn over 1.5 seconds
- **Country highlight**: Countries fill with gold sequentially with 200ms stagger
- **Count-up stats**: Location count animates (e.g., "6 Countries" with CountUp)

### SIA Adaptation

- Focus on KSA-Malaysia corridor as the primary visual emphasis with a bold arc connection
- Secondary presence markers for partner countries
- Replace purple map tones with navy/gold
- Consider using the existing Globe component (3D) alongside this flat map option
- Add office details and contact info per location

### Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| Desktop (1280px+) | Map with side panel for location list |
| Tablet (768-1279px) | Map full-width, location list below |
| Mobile (< 768px) | Simplified map or region zoom, location list as cards below |

### Existing SIA Components

- The SIA website already references a Globe component concept in `GlobalMarketsSection.tsx` -- this flat map is a complementary option
- **`FadeIn`**: Section entry animation
- **`CountUp`**: For stats alongside the map
- New component needed: `WorldMap` (SVG-based or using a library like `react-simple-maps`)

---

## 9. Thank You / Contact Slide

**Source Slide:** 40 (F8642B23)

### Visual Description

A minimal closing slide with white background. Features large "Thank You" text with a translucent section number "6" watermark behind it. Below the thank-you text, two contact items are displayed with icons: an email address (with mail icon) and a website URL (with globe icon). The company logo appears in the top-left.

### Grid/Spacing System

| Property | Value |
|---|---|
| Container | Full viewport width, `60vh` minimum height |
| Content | Centered horizontally, vertically offset slightly above center |
| "Thank You" text margin-bottom | `48px` |
| Contact items gap | `24px` between items |
| Icon-to-text gap | `12px` |
| Watermark number position | Center, behind content |
| Logo position | Top-left, `32px` inset |

### Color Treatment

- Background: White `#FFFFFF`
- "Thank You" text: Charcoal `#1C1C1E`
- Watermark number: `rgba(28, 28, 30, 0.04)` (barely visible)
- Contact icons: Gold `#C8A951`
- Contact text: Charcoal `#1C1C1E`
- Contact links hover: Gold `#C8A951`

### Typography

| Element | Font | Size | Weight | Notes |
|---|---|---|---|---|
| "Thank You" | Playfair Display | `clamp(3rem, 6vw, 5rem)` | 700 | Centered |
| Watermark number | Playfair Display | `clamp(200px, 30vw, 400px)` | 700 | Opacity 0.04 |
| Contact label ("E-mail") | Inter | `0.75rem` (12px) | 500 | Uppercase, muted, tracking `0.1em` |
| Contact value | Inter | `1rem` (16px) | 400 | Charcoal |

### Content Structure

```
[Section - white background]
  [Logo - top-left]
  [Watermark number - centered, behind]
  [Content - centered]
    [Large "Thank You" text]
    [Contact items row]
      [Email icon + label + address]
      [Globe icon + label + URL]
    [Optional: Social media icons row]
    [Optional: CTA button "Get in Touch"]
```

### Animation Potential

- **Text scale-in**: "Thank You" scales from 0.9 to 1.0 with fade over 600ms
- **Contact items slide-up**: Each contact item slides up with 150ms stagger
- **Icon animation**: Icons have subtle pulse or rotate-in effect
- **CTA button**: Gold-filled button with shimmer animation on hover (using existing `shimmer` keyframe)

### SIA Adaptation

- Transform into a website footer/contact section rather than a standalone slide
- "Thank You" could become "Let's Connect" or "Start a Conversation"
- Contact details: SIA email, website, office addresses in Riyadh and Kuala Lumpur
- Add a contact form CTA button
- Social media links row (LinkedIn, Twitter/X)
- Gold icon accents match SIA brand
- Consider splitting into a pre-footer CTA section and the actual footer

### Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| Desktop (1280px+) | Centered layout, contact items in a row |
| Tablet (768-1279px) | Same centered layout, slightly reduced text |
| Mobile (< 768px) | Contact items stack vertically, text scaled down, watermark hidden |

### Existing SIA Components

- **`NewsletterSection`** (`app/src/sections/NewsletterSection.tsx`): Existing CTA/contact section -- could be extended
- **`FadeIn`**: Entry animations
- **`Button`** (`app/src/components/ui/button.tsx`): For CTA buttons
- New component needed: `ContactFooter` or adaptation of existing newsletter section

---

## Cross-Cutting Layout Principles

### Consistent Section Container

All sections in the Wider presentation follow a consistent container pattern:

```
Section padding: py-20 (80px vertical)
Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
```

This matches the existing SIA codebase pattern seen in `InstitutionalSection`, `EcosystemSection`, `TechnologySection`, and `GlobalMarketsSection`.

### Z-Index Strategy for Overlays

| Layer | Z-Index | Purpose |
|---|---|---|
| Background image | `z-0` | Base layer |
| Gradient overlay | `z-10` | Color treatment |
| Watermark number | `z-10` | Decorative, same layer as overlay |
| Content text/cards | `z-20` | Interactive content |
| Navigation | `z-50` | Always on top |

### Animation Timing Conventions

| Animation | Duration | Easing | Delay Pattern |
|---|---|---|---|
| Section entrance | 500ms | `[0.4, 0, 0.2, 1]` (ease-out-cubic) | 0ms base |
| Stagger children | 500ms each | `[0.4, 0, 0.2, 1]` | 80-150ms between items |
| Hover transitions | 300ms | `ease` | 0ms |
| Background parallax | Continuous | Linear | N/A |
| Number/watermark | 800ms | `ease-out` | 200ms after section enters |

These timings align with the existing `FadeIn` (500ms, `[0.4, 0, 0.2, 1]`) and `StaggerContainer` (100ms default stagger) components in the SIA codebase.
