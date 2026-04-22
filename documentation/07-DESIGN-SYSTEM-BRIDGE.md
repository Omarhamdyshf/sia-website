# 07 - Design System Bridge

## Wider Presentation Visual Language to SIA Website Design Tokens

This document maps every visual element from the Wider Presentation deck to its SIA website equivalent, providing exact hex values, CSS variable names, Tailwind config entries, and implementation notes for each token.

---

## 1. Color Palette Mapping

### Complete Color Translation Table

| Role | Wider Presentation | Hex | SIA Website | Hex | CSS Variable | Tailwind Class | Use Cases |
|------|-------------------|-----|-------------|-----|-------------|----------------|-----------|
| **Primary Brand** | Purple | `#7B2FBE` | Gold | `#C8A951` | `--gold` | `text-gold`, `bg-gold` | Primary accent, CTAs, highlights, hover states |
| **Primary Dark** | Dark Purple | `#5A1F8E` | Gold Dark | `#A08838` | `--gold-dark` | `text-gold-dark`, `bg-gold-dark` | Hover/active states, pressed buttons, borders |
| **Primary Light** | Light Purple/Lavender | `#B88BE5` | Silver | `#C0C0C0` | `--silver` | `text-silver`, `bg-silver` | Metallic accents, secondary elements, dividers |
| **Primary Very Light** | Very Light Purple | `#E8D5F5` | Silver Light | `#E8E8E8` | `--silver-light` | `text-silver-light`, `bg-silver-light` | Subtle backgrounds, border fills, muted badges |
| **Primary Tint** | Purple at 15% opacity | `rgba(123,47,190,0.15)` | Gold at 15% opacity | `rgba(200,169,81,0.15)` | n/a | Inline style | Spotlight glow, card hover radial, overlay tints |
| **Dark Base** | Dark Navy | `#1A1A3E` | Charcoal | `#1C1C1E` | `--charcoal` | `text-charcoal`, `bg-charcoal` | Primary dark backgrounds, text on light, navbar |
| **Deep Dark** | n/a (black) | `#000000` | Navy Deep | `#0A1628` | `--navy` | `bg-navy` | Hero sections, dark section backgrounds, globe BG |
| **White** | White | `#FFFFFF` | White | `#FFFFFF` | `--background` (light) | `bg-white`, `text-white` | Backgrounds, text on dark |
| **Off-White** | Gray Light | `#F5F5F5` | Off-White | `#FAFAFA` | n/a | `bg-[#FAFAFA]` | Alternating section backgrounds, card fills |
| **Secondary Text** | Gray Medium | `#999999` | Muted Foreground | `hsl(0 0% 45%)` | `--muted-foreground` | `text-muted-foreground` | Secondary text, captions, labels |
| **Success/Green** | Green accent | `#4CAF50` | Saudi Green | `#006C35` | n/a | `text-[#006C35]` | Cultural accent (KSA), positive indicators |
| **Alert/Red** | Red accent | `#FF5252` | Destructive | `hsl(0 84% 60%)` | `--destructive` | `text-destructive` | Warnings, errors, negative indicators |
| **Cultural Blue** | n/a | n/a | Malaysian Blue | `#010066` | n/a | `text-[#010066]` | Cultural accent (Malaysia), flag references |
| **Gold Gradient Start** | Purple gradient start | `#7B2FBE` | Gold | `#C8A951` | n/a | `.text-gradient-gold` | Gradient text headings |
| **Gold Gradient Mid** | Lavender gradient mid | `#B88BE5` | Gold Light | `#E8D48B` | n/a | `.text-gradient-gold` | Gradient midpoint |
| **Gold Gradient End** | Dark Purple gradient end | `#5A1F8E` | Gold Dark | `#A08838` | n/a | `.text-gradient-gold` | Gradient endpoint |

### CSS Custom Properties (index.css)

```css
:root {
  /* SIA Brand Tokens */
  --gold: #C8A951;
  --gold-dark: #A08838;
  --gold-light: #E8D48B;
  --charcoal: #1C1C1E;
  --silver: #C0C0C0;
  --silver-light: #E8E8E8;
  --navy: #0A1628;

  /* shadcn/ui Semantic Tokens (HSL) */
  --background: 0 0% 100%;        /* #FFFFFF */
  --foreground: 0 0% 8%;          /* ~#141414 */
  --primary: 0 0% 8%;             /* Dark text */
  --primary-foreground: 0 0% 98%; /* Light text on primary */
  --accent: 43 54% 55%;           /* Gold in HSL */
  --accent-foreground: 0 0% 8%;
  --muted: 220 14% 96%;           /* ~#F4F4F7 */
  --muted-foreground: 0 0% 45%;   /* ~#737373 */
  --border: 0 0% 90%;             /* ~#E5E5E5 */
  --ring: 43 54% 55%;             /* Gold focus ring */
  --radius: 0.625rem;             /* 10px base radius */
}

.dark {
  --background: 240 6% 4%;        /* ~#0A0A0F */
  --foreground: 0 0% 96%;         /* ~#F5F5F5 */
  --primary: 0 0% 96%;
  --primary-foreground: 240 6% 4%;
  --accent: 43 54% 55%;           /* Gold stays consistent */
  --border: 240 4% 16%;           /* ~#272729 */
  --ring: 43 54% 55%;
}
```

### Tailwind Config Entries (tailwind.config.js)

```js
colors: {
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
}
```

### Gradient Definitions (index.css)

```css
.text-gradient-gold {
  background: linear-gradient(135deg, #C8A951 0%, #E8D48B 50%, #A08838 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-gradient-silver {
  background: linear-gradient(135deg, #C0C0C0 0%, #E8E8E8 50%, #A0A0A0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## 2. Typography System

### Font Family Mapping

| Wider Presentation | Weight / Style | SIA Website | Weight | CSS Variable / Class |
|-------------------|---------------|-------------|--------|---------------------|
| Rubik Light | 300 | Inter | 300 | `font-sans`, `font-light` |
| Rubik Bold | 700 | Inter | 700 | `font-sans`, `font-bold` |
| Rubik SemiBold | 600 | Inter | 600 | `font-sans`, `font-semibold` |
| Calibri Regular | 400 | Inter | 400 | `font-sans`, `font-normal` |
| Calibri Bold | 700 | Inter | 700 | `font-sans`, `font-bold` |
| Calibri Light | 300 | Inter | 300 | `font-sans`, `font-light` |
| Helvetica (headings) | Various | Playfair Display | Various | `font-serif` |
| Georgia | 400 | Playfair Display | 400 | `font-serif` |
| GillSans | Various | Inter | Various | `font-sans` |
| AlNile / IBMPlexArabic | Various | Inter (Arabic subset) | Various | `font-sans` (future: Noto Naskh Arabic) |
| FontAwesome6Pro | n/a | Lucide React | n/a | `lucide-react` imports |

### Google Fonts Import

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
```

### Font Stack Definitions

```css
body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-feature-settings: "rlig" 1, "calt" 1;
}

h1, h2, h3 {
  font-family: 'Playfair Display', Georgia, serif;
}
```

### Complete Typography Scale

| Token | Size | Line Height | Letter Spacing | Weight | Font | Tailwind Class | Use Case |
|-------|------|-------------|----------------|--------|------|----------------|----------|
| **Display** | 72px / 80px | 1.05 | -0.03em | 700 | Playfair Display | `text-[72px] leading-[80px] tracking-[-0.03em] font-bold font-serif` | Section numbers, hero stats |
| **H1** | clamp(40px, 5vw, 64px) | 1.1 | -0.02em | 700 | Playfair Display | `text-hero font-bold font-serif` | Hero headings |
| **H2** | clamp(32px, 4vw, 48px) | 1.2 | -0.01em | 600 | Playfair Display | `text-section font-semibold font-serif` | Section titles |
| **H3** | 24px - 30px | 1.3 | -0.01em | 600 | Playfair Display | `text-2xl lg:text-[30px] font-semibold font-serif` | Card titles, subsection headers |
| **H4** | 18px - 20px | 1.4 | 0 | 600 | Inter | `text-lg lg:text-xl font-semibold font-sans` | Subsection labels, feature titles |
| **Body Large** | 18px | 1.7 | 0 | 400 | Inter | `text-lg font-sans` | Lead paragraphs, important body text |
| **Body** | 16px | 1.7 | 0 | 400 | Inter | `text-base font-sans` | Standard body text |
| **Body Small** | 14px | 1.6 | 0.01em | 400 | Inter | `text-sm font-sans` | Secondary text, card descriptions |
| **Caption** | 12px | 1.5 | 0.02em | 500 | Inter | `text-xs font-medium font-sans tracking-wide` | Labels, badges, meta info |
| **Overline** | 12px | 1.5 | 0.1em | 600 | Inter | `text-xs font-semibold uppercase tracking-[0.1em]` | Section labels, category tags |
| **Stat Number** | clamp(40px, 4vw, 56px) | 1.1 | -0.02em | 700 | Playfair Display | `text-stat font-bold font-serif` | CountUp numbers, KPIs |
| **Button** | 14px - 16px | 1.0 | 0.02em | 500 | Inter | `text-sm lg:text-base font-medium tracking-wide` | Button labels |
| **Nav Link** | 14px | 1.0 | 0.01em | 500 | Inter | `text-sm font-medium` | Navigation items |

### Tailwind Config Font Size Extensions

```js
fontSize: {
  'hero': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
  'section': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
  'stat': ['clamp(2.5rem, 4vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
}
```

---

## 3. Spacing & Grid System

### Presentation-to-Web Grid Translation

| Wider Presentation | Dimension | SIA Website Equivalent | CSS/Tailwind |
|-------------------|-----------|----------------------|-------------|
| Slide canvas | 1920 x 1080px | Viewport | `w-screen` |
| Content safe zone | ~1600px wide | Max content width | `max-w-7xl` (1280px) |
| Narrow content | ~1200px wide | Narrow sections | `max-w-5xl` (1024px) |
| Extra narrow (text) | ~900px wide | Text max width | `max-w-3xl` (768px) |
| Slide padding | ~80px sides | Section horizontal padding | `px-6 lg:px-8` (24-32px) |

### Section Spacing

| Token | Value | Tailwind | Use Case |
|-------|-------|----------|----------|
| `section-gap-y` | 96px / 128px | `py-24 lg:py-32` | Space between major sections |
| `section-gap-y-sm` | 64px / 80px | `py-16 lg:py-20` | Compact sections |
| `section-inner` | 48px / 64px | `space-y-12 lg:space-y-16` | Spacing within a section |
| `section-header-gap` | 24px / 32px | `mb-8 lg:mb-12` | Gap between section heading and content |

### Component Spacing

| Token | Value | Tailwind | Use Case |
|-------|-------|----------|----------|
| `card-gap` | 24px / 32px | `gap-6 lg:gap-8` | Space between cards in grid |
| `card-padding` | 24px / 32px | `p-6 lg:p-8` | Internal card padding |
| `card-padding-sm` | 16px / 20px | `p-4 lg:p-5` | Compact card padding |
| `stack-gap-xs` | 8px | `space-y-2` | Tight vertical stacking |
| `stack-gap-sm` | 12px | `space-y-3` | Small vertical stacking |
| `stack-gap-md` | 16px | `space-y-4` | Medium vertical stacking |
| `stack-gap-lg` | 24px | `space-y-6` | Large vertical stacking |
| `inline-gap-sm` | 8px | `gap-2` | Small horizontal spacing |
| `inline-gap-md` | 12px | `gap-3` | Medium horizontal spacing |
| `inline-gap-lg` | 16px | `gap-4` | Large horizontal spacing |

### Grid System

| Breakpoint | Name | Container Width | Columns | Column Gap | Tailwind |
|------------|------|----------------|---------|-----------|----------|
| < 640px | Mobile | 100% - 48px | 1 | 16px | `grid-cols-1 gap-4` |
| 640px | `sm` | 100% - 48px | 2 | 20px | `sm:grid-cols-2 gap-5` |
| 768px | `md` | 100% - 64px | 2 | 24px | `md:grid-cols-2 gap-6` |
| 1024px | `lg` | 100% - 64px | 3 | 24px | `lg:grid-cols-3 gap-6` |
| 1280px | `xl` | 1280px centered | 3-4 | 32px | `xl:grid-cols-4 gap-8` |
| 1536px | `2xl` | 1280px centered | 4 | 32px | `max-w-7xl mx-auto` |

### Recommended Section Layout Pattern

```html
<section class="py-24 lg:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <!-- Section header -->
    <div class="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
      <p class="text-xs font-semibold uppercase tracking-[0.1em] text-gold mb-4">Overline</p>
      <h2 class="text-section font-serif font-semibold">Section Title</h2>
      <p class="mt-4 text-lg text-muted-foreground">Description text.</p>
    </div>
    <!-- Content grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      <!-- Cards -->
    </div>
  </div>
</section>
```

---

## 4. Shadow & Elevation System

### Presentation-to-Web Shadow Translation

| Wider Element | Presentation Effect | SIA Shadow Token | Value | Tailwind |
|--------------|-------------------|-----------------|-------|----------|
| Card base | Subtle drop shadow | `shadow-card` | `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)` | `shadow-card` |
| Card hover | Elevated shadow | `shadow-card-hover` | `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)` | `shadow-card-hover` |
| Micro shadow | Input/button rest | `shadow-xs` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | `shadow-xs` |
| Gold glow (small) | Purple glow on elements | `shadow-gold-glow` | `0 0 40px rgba(200, 169, 81, 0.15)` | `shadow-gold-glow` |
| Gold glow (large) | Purple glow on hero | `shadow-gold-glow-lg` | `0 0 80px rgba(200, 169, 81, 0.2)` | `shadow-gold-glow-lg` |
| Spotlight inner glow | Purple spotlight in card | Radial gradient | `radial-gradient(600px circle at X Y, rgba(200,169,81,0.15), transparent 40%)` | SpotlightCard component |
| GlowCard border | Animated border glow | HSL-based hue shift | Dynamic via `--hue` CSS variable | GlowCard component |

### Elevation Levels

| Level | Name | Shadow | Backdrop | Use Case |
|-------|------|--------|----------|----------|
| 0 | Flat | none | none | Body content, text areas |
| 1 | Subtle | `shadow-xs` | none | Inputs, inactive buttons |
| 2 | Card | `shadow-card` | none | Cards at rest, containers |
| 3 | Raised | `shadow-card-hover` | none | Cards on hover, dropdowns |
| 4 | Floating | `shadow-lg` + border | `backdrop-blur-xl` | Navbar (scrolled), modals |
| 5 | Glow | `shadow-gold-glow` | none | Featured cards, CTAs |
| 6 | Hero Glow | `shadow-gold-glow-lg` | none | Hero elements, key stat |

### Overlay Gradients

| Wider Overlay | SIA Equivalent | CSS | Use Case |
|--------------|----------------|-----|----------|
| Purple overlay on photos (`rgba(123,47,190,0.6)`) | Gold/charcoal overlay | `linear-gradient(to bottom, rgba(10,22,40,0.7), rgba(28,28,30,0.9))` | Section divider images |
| Purple-to-transparent | Gold-to-transparent | `linear-gradient(to bottom, rgba(200,169,81,0.08), transparent)` | Subtle section top accent |
| Dark vignette | Navy vignette | `radial-gradient(ellipse at center, transparent 40%, rgba(10,22,40,0.6))` | Hero background treatment |
| Glass overlay | Glass effect | `background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08);` | `.glass` utility class |

---

## 5. Border & Radius System

### Border Radius Tokens

| Token | Value | CSS Variable | Tailwind | Use Case |
|-------|-------|-------------|----------|----------|
| `radius-xs` | 4px | `calc(var(--radius) - 6px)` | `rounded-xs` | Small badges, chips |
| `radius-sm` | 6px | `calc(var(--radius) - 4px)` | `rounded-sm` | Inputs, inline tags |
| `radius-md` | 8px | `calc(var(--radius) - 2px)` | `rounded-md` | Buttons, small cards |
| `radius-lg` | 10px | `var(--radius)` | `rounded-lg` | Standard cards, dialogs |
| `radius-xl` | 14px | `calc(var(--radius) + 4px)` | `rounded-xl` | Large cards, containers |
| `radius-2xl` | 16px | `1rem` | `rounded-2xl` | SpotlightCard, GlowCard, Navbar |
| `radius-3xl` | 24px | `1.5rem` | `rounded-3xl` | Hero containers, feature sections |
| `radius-full` | 9999px | n/a | `rounded-full` | Avatars, circular crops, pill buttons |

### Border Styles

| Token | Value | Use Case |
|-------|-------|----------|
| Border default | `1px solid hsl(var(--border))` | Card borders (light mode) |
| Border dark | `1px solid rgba(255,255,255,0.08)` | Card borders (dark mode), Navbar |
| Border gold | `1px solid rgba(200,169,81,0.3)` | Highlighted cards, active states |
| Border subtle | `1px solid rgba(255,255,255,0.04)` | Very subtle separation on dark |
| Border none | `0` | Borderless cards on white backgrounds |

### Image Crop Shapes

| Wider Element | Shape | SIA Implementation |
|--------------|-------|-------------------|
| Team headshots | Circle crop | `rounded-full overflow-hidden aspect-square` |
| Card images | Rounded rect | `rounded-xl overflow-hidden` |
| Logo/icon containers | Rounded square | `rounded-lg overflow-hidden aspect-square` |
| Section divider photos | No radius | `rounded-none` (full-bleed) |

---

## 6. Animation Tokens

### Presentation Transition to Web Animation Mapping

| Wider Transition | Web Animation | Duration | Easing | Delay Pattern | Implementation |
|-----------------|--------------|----------|--------|---------------|----------------|
| Slide fade-in | Scroll-triggered fade | 500ms | `[0.4, 0, 0.2, 1]` | Base + (index * 100ms) | `FadeIn` component |
| Build: slide up | Staggered slide-up | 500ms | `[0.4, 0, 0.2, 1]` | 0, 100, 200ms | `FadeIn direction="up"` |
| Build: slide left/right | Directional entry | 500ms | `[0.4, 0, 0.2, 1]` | 0, 100, 200ms | `FadeIn direction="left/right"` |
| Hub-spoke connections | SVG path draw | 1000-1500ms | `ease-in-out` | Sequential by line | `stroke-dasharray` + `stroke-dashoffset` animation |
| Donut chart fill | Ring stroke animation | 1200ms | `ease-out` | 200ms stagger | SVG `stroke-dasharray` on circle |
| Number count-up | Animated counter | 2000ms | `ease-out` | On viewport entry | `CountUp` component |
| Logo marquee | Infinite scroll | 40s cycle | `linear` | Continuous | `Marquee` component |
| Slide auto-advance | n/a | n/a | n/a | n/a | Not applicable to web |

### Keyframe Definitions (index.css)

```css
/* Core entry animations */
@keyframes fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes slide-up {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* Background effects */
@keyframes aurora {
  0% { background-position: 50% 50%, 50% 50%; }
  100% { background-position: 350% 50%, 350% 50%; }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Continuous motion */
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-100%); }
}

@keyframes marquee-reverse {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(0%); }
}

@keyframes border-beam {
  0% { offset-distance: 0%; }
  100% { offset-distance: 100%; }
}
```

### Animation Timing Tokens

| Token | Duration | Easing | Tailwind | Use Case |
|-------|----------|--------|----------|----------|
| `duration-fast` | 150ms | `ease-out` | `duration-150` | Button hover, toggle |
| `duration-normal` | 300ms | `ease-out` | `duration-300` | Dropdown open, tooltip |
| `duration-medium` | 500ms | `cubic-bezier(0.4, 0, 0.2, 1)` | `duration-500` | FadeIn, card transitions |
| `duration-slow` | 1000ms | `ease-in-out` | `duration-1000` | Path drawing, ring fill |
| `duration-counter` | 2000ms | `ease-out` | Via CountUp prop | Number animations |
| `duration-ambient` | 3000ms | `ease-in-out` | Custom | Pulse glow, breathing |
| `duration-aurora` | 60s | `linear` | Custom | Aurora background cycle |
| `duration-marquee` | 40s | `linear` | `--speed: 40s` | Logo/text marquee |

### Stagger Pattern

```
Item 0: delay 0ms
Item 1: delay 100ms
Item 2: delay 200ms
Item 3: delay 300ms
...
Item N: delay (N * 100ms), max 600ms
```

Implemented via the `StaggerContainer` component or manually with `FadeIn delay={index * 0.1}`.

### Framer Motion Defaults (FadeIn Component)

```ts
const fadeInDefaults = {
  initial: { opacity: 0, y: 20 },       // "up" direction
  whileInView: { opacity: 1, x: 0, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: {
    duration: 0.5,
    delay: 0,
    ease: [0.4, 0, 0.2, 1],             // Material Design standard easing
  },
};
```

---

## 7. Iconography

### Icon Library Migration

| Wider Presentation | SIA Website | Notes |
|-------------------|-------------|-------|
| FontAwesome 6 Pro Light | Lucide React | Primary icon set, MIT licensed, tree-shakable |
| FontAwesome 6 Pro Duotone | Lucide React (single tone) | Duotone effect achieved with opacity/color |
| Custom hub diagrams | Custom SVG components | Built as React components |

### Icon Size Scale

| Token | Size | Stroke Width | Tailwind | Use Case |
|-------|------|-------------|----------|----------|
| `icon-xs` | 16px | 1.5px | `w-4 h-4` | Inline text, badges |
| `icon-sm` | 20px | 1.5px | `w-5 h-5` | Buttons, form elements |
| `icon-md` | 24px | 2px | `w-6 h-6` | Default icon size, nav items |
| `icon-lg` | 32px | 2px | `w-8 h-8` | Card feature icons |
| `icon-xl` | 40px | 2px | `w-10 h-10` | Section feature icons |
| `icon-2xl` | 48px | 2px | `w-12 h-12` | Hero feature icons, large callouts |

### Icon Color Application

| Context | Color | Example |
|---------|-------|---------|
| On dark background | `text-white` or `text-gold` | Navbar, hero, dark sections |
| On light background | `text-charcoal` or `text-gold` | Cards on white |
| Muted/secondary | `text-muted-foreground` | Supporting info |
| Interactive (hover) | `text-gold` (transition) | Links, buttons |
| Feature icons on dark cards | `text-gold` | SpotlightCard icons |

### Lucide React Import Pattern

```tsx
import { ArrowRight, Globe, Shield, Zap } from "lucide-react";

// Usage
<ArrowRight className="w-5 h-5 text-gold" />
<Globe className="w-8 h-8 text-gold" strokeWidth={1.5} />
```

---

## 8. Image Treatment

### Photo Overlay Techniques

| Wider Treatment | SIA Equivalent | CSS |
|----------------|----------------|-----|
| Purple gradient overlay on section divider | Dark navy gradient overlay | `background: linear-gradient(180deg, rgba(10,22,40,0.85) 0%, rgba(28,28,30,0.95) 100%);` placed over `<img>` |
| Purple tint on photos | Gold-tinted treatment | `mix-blend-mode: multiply` on a `bg-gold/10` overlay |
| Grayscale + color overlay | Grayscale + gold warmth | `filter: grayscale(100%) brightness(0.9); mix-blend-mode: luminosity;` on image, gold overlay behind |
| Full-bleed section photo | Parallax or fixed background | `background-attachment: fixed; background-size: cover;` with overlay div |

### Circular Team Photo Crops

```html
<div class="w-24 h-24 rounded-full overflow-hidden border-2 border-gold/20">
  <img src="..." alt="..." class="w-full h-full object-cover" />
</div>
```

Sizes: `w-16 h-16` (small), `w-24 h-24` (medium), `w-32 h-32` (large), `w-40 h-40` (hero/about page).

### Card Image Aspect Ratios

| Card Type | Aspect Ratio | Tailwind |
|-----------|-------------|----------|
| Blog/Insight card | 16:9 | `aspect-video` |
| Case study card | 4:3 | `aspect-[4/3]` |
| Team member card | 1:1 (circular) | `aspect-square rounded-full` |
| Sector card | 3:2 | `aspect-[3/2]` |
| Hero background | Full viewport | `aspect-auto w-full h-full object-cover` |

### Image Placeholder / Loading States

```html
<!-- Skeleton placeholder -->
<div class="animate-pulse bg-silver-light rounded-xl aspect-video" />

<!-- Shimmer placeholder -->
<div class="bg-gradient-to-r from-silver-light via-white to-silver-light
            bg-[length:200%_100%] animate-shimmer rounded-xl aspect-video" />
```

---

## 9. Component Token Summary

### Cards

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| Background | `bg-white` / `bg-card` | `bg-[#0A0A0F]` / `hsl(var(--card))` |
| Border | `border border-border` | `border border-white/[0.08]` |
| Shadow (rest) | `shadow-card` | `shadow-none` (border only) |
| Shadow (hover) | `shadow-card-hover` | `shadow-gold-glow` |
| Border radius | `rounded-2xl` (16px) | `rounded-2xl` (16px) |
| Padding | `p-6 lg:p-8` | `p-6 lg:p-8` |
| Title color | `text-charcoal` / `text-foreground` | `text-white` / `text-foreground` |
| Body color | `text-muted-foreground` | `text-muted-foreground` |
| Accent | `text-gold` | `text-gold` |

### Buttons

| Variant | Background | Text | Border | Hover BG | Hover Text | Padding | Radius |
|---------|-----------|------|--------|----------|-----------|---------|--------|
| Primary | `bg-gold` | `text-charcoal` | none | `bg-gold-dark` | `text-charcoal` | `px-6 py-3` | `rounded-lg` |
| Primary Dark | `bg-charcoal` | `text-white` | none | `bg-charcoal/90` | `text-gold` | `px-6 py-3` | `rounded-lg` |
| Secondary | `bg-transparent` | `text-gold` | `border border-gold/30` | `bg-gold/10` | `text-gold` | `px-6 py-3` | `rounded-lg` |
| Ghost | `bg-transparent` | `text-foreground` | none | `bg-accent/10` | `text-accent-foreground` | `px-4 py-2` | `rounded-md` |
| Link | `bg-transparent` | `text-gold` | none | n/a | `text-gold-dark` underline | `px-0 py-0` | none |

### Badges

| Variant | Background | Text | Padding | Radius |
|---------|-----------|------|---------|--------|
| Default | `bg-gold/10` | `text-gold` | `px-3 py-1` | `rounded-full` |
| Muted | `bg-muted` | `text-muted-foreground` | `px-3 py-1` | `rounded-full` |
| Outline | `bg-transparent` | `text-foreground` | `px-3 py-1` | `rounded-full` + `border` |
| Saudi | `bg-[#006C35]/10` | `text-[#006C35]` | `px-3 py-1` | `rounded-full` |
| Malaysia | `bg-[#010066]/10` | `text-[#010066]` | `px-3 py-1` | `rounded-full` |

### Charts (for data visualization sections)

| Token | Value | Notes |
|-------|-------|-------|
| Primary fill | `#C8A951` (gold) | Main chart segments |
| Secondary fill | `#A08838` (gold dark) | Secondary segments |
| Tertiary fill | `#C0C0C0` (silver) | Tertiary segments |
| Background fill | `#E8E8E8` (silver light) | Unfilled track, background ring |
| Stroke width | 2-3px | Consistent line weight |
| Label font | Inter, 12px, `#737373` | Chart axis labels |
| Value font | Playfair Display, 24-32px, `#C8A951` | Center stat in donut |
| Grid lines | `rgba(200,169,81,0.08)` | Subtle gold-tinted grid |

### Sections

| Variant | Background | Text | Padding | Max Width |
|---------|-----------|------|---------|-----------|
| White | `bg-white` | `text-charcoal` | `py-24 lg:py-32` | `max-w-7xl` |
| Off-White | `bg-[#FAFAFA]` | `text-charcoal` | `py-24 lg:py-32` | `max-w-7xl` |
| Dark (charcoal) | `bg-charcoal` | `text-white` | `py-24 lg:py-32` | `max-w-7xl` |
| Dark (navy) | `bg-navy` | `text-white` | `py-24 lg:py-32` | `max-w-7xl` |
| Hero | `bg-navy` + AuroraBackground | `text-white` | `pt-32 pb-24 lg:pt-40 lg:pb-32` | `max-w-7xl` |
| Spotlight | `bg-[#0A0A0F]` + spotlight-grid | `text-white` | `py-24 lg:py-32` | `max-w-7xl` |

---

## 10. Current SIA Components to Update

### Component Audit & Token Alignment

#### AuroraBackground (`app/src/components/effects/AuroraBackground.tsx`)

**Status:** Using correct SIA gold/charcoal palette.

| Property | Current Value | Expected Value | Status |
|----------|--------------|----------------|--------|
| Aurora gradient colors | `#C8A951`, `#1C1C1E`, `#A08838` | `#C8A951`, `#1C1C1E`, `#A08838` | Correct |
| Animation duration | 60s linear infinite | 60s linear infinite | Correct |
| Blur | `blur-[10px]` | `blur-[10px]` | Correct |
| Mask | radial-gradient ellipse | radial-gradient ellipse | Correct |

No changes needed. Fully aligned.

---

#### GradientBackground (`app/src/components/effects/GradientBackground.tsx`)

**Status:** Using correct SIA gold/charcoal palette.

| Property | Current Value | Expected Value | Status |
|----------|--------------|----------------|--------|
| Circle 1 fill | `#C8A951` (opacity 0.4) | `#C8A951` (opacity 0.4) | Correct |
| Circle 2 fill | `#1C1C1E` (opacity 0.6) | `#1C1C1E` (opacity 0.6) | Correct |
| Circle 3 fill | `#A08838` (opacity 0.3) | `#A08838` (opacity 0.3) | Correct |
| SVG filter blur | `stdDeviation="60"` | `stdDeviation="60"` | Correct |
| Overall opacity | `opacity-30` | `opacity-30` | Correct |

No changes needed. Fully aligned.

---

#### SpotlightCard (`app/src/components/effects/SpotlightCard.tsx`)

**Status:** Using correct gold spotlight color.

| Property | Current Value | Expected Value | Status |
|----------|--------------|----------------|--------|
| Default spotlight color | `rgba(200, 169, 81, 0.15)` | `rgba(200, 169, 81, 0.15)` | Correct |
| Background | `bg-[#0A0A0F]` | `bg-[#0A0A0F]` (near navy) | Correct |
| Border | `border-white/[0.08]` | `border-white/[0.08]` | Correct |
| Border radius | `rounded-2xl` | `rounded-2xl` | Correct |
| Padding | `p-8` | `p-8` | Correct |

No changes needed. Fully aligned.

---

#### GlowCard / spotlight-card.tsx (`app/src/components/ui/spotlight-card.tsx`)

**Status:** Uses HSL-based hue system, NOT SIA gold tokens. Needs update.

| Property | Current Value | Expected Value | Action Required |
|----------|--------------|----------------|-----------------|
| `glowColor` options | `blue`, `purple`, `green`, `red`, `orange` | Add `gold` option | Add `gold: { base: 43, spread: 30 }` |
| Default `glowColor` | `blue` (hue 220) | `gold` (hue 43) | Change default |
| `--backdrop` | `hsl(215 60% 97% / 0.72)` | `hsl(43 20% 97% / 0.72)` | Update for gold warmth |
| Border radius | `rounded-2xl` (via `--radius: 14`) | `rounded-2xl` | Correct |

**Recommended changes:**

```tsx
// Add gold to glowColorMap
const glowColorMap = {
  gold: { base: 43, spread: 30 },     // NEW: SIA primary
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
};

// Change default
glowColor = 'gold',
```

---

#### Globe (`app/src/components/3d/Globe.tsx`)

**Status:** Using correct gold marker color.

| Property | Current Value | Expected Value | Status |
|----------|--------------|----------------|--------|
| `baseColor` | `[0.15, 0.15, 0.18]` (charcoal-ish) | `[0.15, 0.15, 0.18]` | Correct |
| `markerColor` | `[0.78, 0.66, 0.32]` (gold RGB) | `[0.78, 0.66, 0.32]` = `#C7A852` | Correct (matches `#C8A951`) |
| `glowColor` | `[0.12, 0.12, 0.15]` | `[0.12, 0.12, 0.15]` | Correct |
| Glow overlay | `from-gold/5` | `from-gold/5` | Correct |
| Default markers | Riyadh, KL, Dubai, Singapore, Jakarta | KSA-MY corridor | Correct |

No changes needed. Fully aligned.

---

#### CountUp (`app/src/components/animations/CountUp.tsx`)

**Status:** Animation-only component, no color tokens embedded.

| Property | Expected Token | Notes |
|----------|---------------|-------|
| Font | `font-serif` (Playfair Display) | Apply at usage site |
| Color | `text-gold` or `text-foreground` | Apply at usage site |
| Duration | 2000ms default | Correct |

No component changes needed. Style at usage site.

---

#### FadeIn (`app/src/components/animations/FadeIn.tsx`)

**Status:** Correctly configured.

| Property | Current Value | Expected Value | Status |
|----------|--------------|----------------|--------|
| Default duration | 0.5s | 0.5s | Correct |
| Default delay | 0 | 0 | Correct |
| Easing | `[0.4, 0, 0.2, 1]` | `[0.4, 0, 0.2, 1]` | Correct |
| Viewport margin | `-50px` | `-50px` | Correct |
| `once` | `true` | `true` | Correct |

No changes needed. Fully aligned.

---

#### Marquee (`app/src/components/effects/Marquee.tsx`)

**Status:** Animation-only, uses CSS variable `--speed`.

| Property | Current Value | Expected Value | Status |
|----------|--------------|----------------|--------|
| Default speed | `40s` | `40s` | Correct |
| Pause on hover | `.marquee-container:hover` | Yes | Correct |

No changes needed.

---

#### Navbar (`app/src/components/navigation/Navbar.tsx`)

**Status:** Using correct SIA palette.

| Property | Current Value | Expected Value | Status |
|----------|--------------|----------------|--------|
| Scrolled BG | `bg-charcoal/80 backdrop-blur-xl` | `bg-charcoal/80 backdrop-blur-xl` | Correct |
| Border (scrolled) | `border-white/[0.08]` | `border-white/[0.08]` | Correct |
| Border radius | `rounded-2xl` | `rounded-2xl` | Correct |
| Un-scrolled BG | `bg-transparent` | `bg-transparent` | Correct |

No changes needed. Fully aligned.

---

#### Spotlight Grid (CSS utility in index.css)

**Status:** Correct gold-tinted grid.

```css
.spotlight-grid {
  background-image:
    linear-gradient(rgba(200, 169, 81, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(200, 169, 81, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}
```

No changes needed.

---

### Summary: Components Requiring Updates

| Component | File | Change Required | Priority |
|-----------|------|----------------|----------|
| **GlowCard** | `app/src/components/ui/spotlight-card.tsx` | Add `gold` glow option, set as default | High |
| All others | Various | No changes needed | n/a |

---

## Appendix A: Quick Reference - All Hex Values

| Name | Hex | HSL | RGB |
|------|-----|-----|-----|
| Gold | `#C8A951` | `43, 54%, 55%` | `200, 169, 81` |
| Gold Dark | `#A08838` | `43, 48%, 42%` | `160, 136, 56` |
| Gold Light | `#E8D48B` | `43, 65%, 73%` | `232, 212, 139` |
| Charcoal | `#1C1C1E` | `240, 5%, 11%` | `28, 28, 30` |
| Silver | `#C0C0C0` | `0, 0%, 75%` | `192, 192, 192` |
| Silver Light | `#E8E8E8` | `0, 0%, 91%` | `232, 232, 232` |
| Navy Deep | `#0A1628` | `217, 60%, 10%` | `10, 22, 40` |
| Off-White | `#FAFAFA` | `0, 0%, 98%` | `250, 250, 250` |
| White | `#FFFFFF` | `0, 0%, 100%` | `255, 255, 255` |
| Saudi Green | `#006C35` | `150, 100%, 21%` | `0, 108, 53` |
| Malaysian Blue | `#010066` | `240, 99%, 20%` | `1, 0, 102` |

## Appendix B: Quick Reference - All CSS Variables

```css
--gold: #C8A951;
--gold-dark: #A08838;
--charcoal: #1C1C1E;
--silver: #C0C0C0;
--silver-light: #E8E8E8;
--navy: #0A1628;
--background: 0 0% 100%;
--foreground: 0 0% 8%;
--primary: 0 0% 8%;
--primary-foreground: 0 0% 98%;
--secondary: 220 14% 96%;
--secondary-foreground: 0 0% 8%;
--muted: 220 14% 96%;
--muted-foreground: 0 0% 45%;
--accent: 43 54% 55%;
--accent-foreground: 0 0% 8%;
--destructive: 0 84% 60%;
--border: 0 0% 90%;
--input: 0 0% 90%;
--ring: 43 54% 55%;
--radius: 0.625rem;
```
