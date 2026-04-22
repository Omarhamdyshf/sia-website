# 09 - Implementation Roadmap

> Phased plan for transforming Wider visual components into the SIA website.
> Each phase includes components, dependencies, content requirements, and definition of done.

---

## Phase Overview

| Phase | Name | Duration | Key Deliverable |
|---|---|---|---|
| 1 | Foundation (Design System) | 2-3 days | Updated Tailwind config, fonts, CSS variables |
| 2 | Core Visual Components | 5-7 days | 8 high-impact new components built |
| 3 | Section Assembly | 3-5 days | All homepage sections wired with SIA content |
| 4 | Data Visualizations | 3-5 days | Charts, diagrams, and interactive visuals |
| 5 | Polish & Animation | 3-4 days | Scroll animations, transitions, performance |
| 6 | Content & i18n | 5-7 days | Final copy, Arabic translations, RTL support |

**Total estimated timeline: 21-31 days (4-6 weeks)**

---

## Phase 1: Foundation (Design System)

### Objective
Lock in the SIA design system so all subsequent components use consistent tokens.

### Tasks

#### 1.1 Update Tailwind Config with SIA Color Tokens
- **File:** `app/tailwind.config.ts`
- **Current state:** Uses Ondo-inspired colors (`primary: '#1a1a1a'`, `accent: '#3b82f6'`)
- **Target state:** SIA palette from WEBSITE_PLAN.md
- **Changes:**
  ```
  colors:
    charcoal:      #1C1C1E
    navy:          #0A1628
    silver:        #C0C0C0
    silver-light:  #E8E8E8
    gold:          #C8A951
    gold-dark:     #A08838
    gold-light:    #D4BA6A
    off-white:     #F8F9FA
    saudi-green:   #006C35
    malaysian-blue:#010066
  ```
- **Effort:** S (1-2 hours)

#### 1.2 Add Playfair Display Font
- **File:** `app/index.html` (Google Fonts link) + `app/tailwind.config.ts` (fontFamily)
- **Current state:** Inter only (`font-sans`)
- **Target state:** Playfair Display for headings (`font-serif`) + Inter for body (`font-sans`)
- **Add:** IBM Plex Sans Arabic / Noto Sans Arabic for Arabic typography
- **Changes:**
  ```
  fontFamily:
    serif: ['Playfair Display', 'Georgia', 'serif']
    sans:  ['Inter', 'system-ui', 'sans-serif']
    arabic: ['IBM Plex Sans Arabic', 'Noto Sans Arabic', 'sans-serif']
  ```
- **Effort:** S (1 hour)

#### 1.3 Update CSS Variables
- **File:** `app/src/index.css`
- **Add custom properties:**
  ```
  --color-gold: #C8A951
  --color-charcoal: #1C1C1E
  --color-navy: #0A1628
  --gradient-gold: linear-gradient(135deg, #C8A951, #D4BA6A)
  --shadow-gold-glow: 0 0 20px rgba(200, 169, 81, 0.15)
  --shadow-gold-glow-lg: 0 0 40px rgba(200, 169, 81, 0.25)
  ```
- **Add utility classes:** `.text-gradient-gold`, `.spotlight-grid`, `.bg-navy`
- **Effort:** S (1 hour)

#### 1.4 Typography Scale
- **File:** `app/tailwind.config.ts`
- **Add custom font sizes matching WEBSITE_PLAN.md:**
  ```
  fontSize:
    hero:    ['56px', { lineHeight: '1.1', letterSpacing: '-0.02em' }]
    section: ['48px', { lineHeight: '1.2', letterSpacing: '-0.01em' }]
    stat:    ['40px', { lineHeight: '1.1' }]
  ```
- **Effort:** S (30 minutes)

#### 1.5 Animation Tokens
- **File:** `app/tailwind.config.ts`
- **Verify existing animations are present:** marquee, fade-in, slide-up, count-up
- **Add:** gold-pulse keyframe for badge indicators, border-beam for CTA
- **Effort:** S (30 minutes)

### Components Affected
- All components (design tokens cascade everywhere)

### Dependencies
- None (this is the foundation)

### Content/Data Requirements
- SIA logo files (PNG + SVG) in `app/public/images/`
- Font files (or Google Fonts CDN links)

### Definition of Done
- [ ] Tailwind config has all SIA color tokens
- [ ] Playfair Display loads and renders for `.font-serif` elements
- [ ] Inter renders for `.font-sans` elements
- [ ] CSS variables for gold gradients and glow shadows work
- [ ] Typography scale (hero, section, stat) renders at correct sizes
- [ ] Existing sections render correctly with updated tokens (no visual regressions)
- [ ] SIA logo displays in navbar and footer

---

## Phase 2: Core Visual Components

### Objective
Build the 8 most impactful new components that do not yet exist.

### Components

#### 2.1 HubSpokeDiagram.tsx
- **Section:** How It Works / Platform
- **Description:** SVG diagram with SIA logo at center hub. Spokes radiate to 6 service nodes: Deal Matching, Compliance, Due Diligence, Structuring, Execution, Post-Deal. Nodes pulse on hover. Animated connection lines draw on scroll.
- **Effort:** L (8-16 hours)
- **Dependencies:** Design tokens, Framer Motion
- **Technical approach:** SVG with Framer Motion path animations. useInView triggers draw-on sequence. Each spoke animates sequentially with 0.2s stagger.

#### 2.2 ContactForm.tsx
- **Section:** Contact page
- **Description:** Multi-field form: name, email, company, role (dropdown), deal size range (dropdown: $2M-$5M, $5M-$15M, $15M-$50M, $50M+), message (textarea), submit button. Validation with Zod. Submission via Resend API.
- **Effort:** M (3-6 hours)
- **Dependencies:** React Hook Form, Zod, Resend API key, design tokens
- **Technical approach:** React Hook Form + Zod schema. Controlled dropdowns with shadcn/ui Select. Toast notification on success/error via Sonner.

#### 2.3 InvestmentBridge.tsx
- **Section:** Investment Bridge / Corridor
- **Description:** Two-node visualization: Saudi Arabia (left) and Malaysia (right) connected by animated bridge/arc. Bidirectional flow indicators show capital movement. Labels show trade volume by sector. Responsive: horizontal on desktop, vertical on mobile.
- **Effort:** L (8-16 hours)
- **Dependencies:** Design tokens, flag/emblem assets
- **Technical approach:** SVG with animated dashes (stroke-dasharray animation). Framer Motion for entrance. Data-driven labels positioned along the arc.

#### 2.4 TeamGrid.tsx
- **Section:** About page
- **Description:** Responsive grid of team member cards. Each card: headshot photo, name, role, brief credential line, LinkedIn icon link. Hover: subtle lift + gold border highlight. 3-4 column grid on desktop, 2 on tablet, 1 on mobile.
- **Effort:** M (3-6 hours)
- **Dependencies:** Design tokens, team headshot photos, bio content
- **Technical approach:** CSS Grid + Framer Motion stagger. Image with next-gen format (WebP with PNG fallback). Placeholder avatar component for missing photos.

#### 2.5 ComparisonTable.tsx
- **Section:** Value Props / Why SIA
- **Description:** SIA vs Big 4 vs Investment Banks comparison. Rows: Cost, Deal Size, Corridor Expertise, Technology, Timeline, Compliance. SIA column highlighted with gold accent. Responsive: table on desktop, stacked cards on mobile.
- **Effort:** S (1-2 hours)
- **Dependencies:** Design tokens
- **Technical approach:** HTML table with Tailwind styling. Mobile breakpoint switches to card-based layout via CSS Grid.

#### 2.6 BookingWidget.tsx
- **Section:** CTA
- **Description:** Embedded Calendly or Cal.com scheduling widget. Opens in modal or inline embed. Fallback to mailto link if widget fails to load.
- **Effort:** S (1-2 hours)
- **Dependencies:** Calendly/Cal.com account setup
- **Technical approach:** Script tag embed or React component wrapper. Dialog/Sheet from shadcn/ui for modal container.

#### 2.7 LanguageSwitcher.tsx
- **Section:** Navbar + Footer
- **Description:** EN/AR toggle button. Switches i18next locale, updates document direction (ltr/rtl), persists preference to localStorage.
- **Effort:** S (1-2 hours)
- **Dependencies:** i18next setup (Phase 6), design tokens
- **Technical approach:** Button component that calls `i18n.changeLanguage()`. Sets `document.dir` and `document.lang`. Stores preference in localStorage.

#### 2.8 DonutChart.tsx
- **Section:** Stats
- **Description:** Animated donut chart showing sector distribution of deal activity. 8 segments for 8 sectors. Center shows total number. Segments animate in on scroll with sequential draw. Hover shows sector label + percentage tooltip.
- **Effort:** M (3-6 hours)
- **Dependencies:** Design tokens
- **Technical approach:** SVG circles with stroke-dasharray/dashoffset. Framer Motion for animated drawing. Custom tooltip on hover via pointer events.

### Build Order (respecting dependencies)
1. ComparisonTable.tsx (S, no deps beyond tokens)
2. BookingWidget.tsx (S, external service setup)
3. LanguageSwitcher.tsx (S, i18n foundation)
4. ContactForm.tsx (M, needs form libraries)
5. TeamGrid.tsx (M, needs photo assets)
6. DonutChart.tsx (M, SVG work)
7. HubSpokeDiagram.tsx (L, complex SVG animation)
8. InvestmentBridge.tsx (L, complex SVG + data)

### Definition of Done
- [ ] All 8 components render without errors
- [ ] Each component is responsive (mobile, tablet, desktop)
- [ ] Animations trigger correctly on scroll (useInView)
- [ ] Components use SIA design tokens consistently
- [ ] TypeScript types are clean (no `any`)
- [ ] Components are exported and importable from their directories

---

## Phase 3: Section Assembly

### Objective
Wire all components into website sections. Replace any remaining crypto/Ondo content with SIA content.

### Tasks

#### 3.1 Verify Homepage Section Order
Confirm `App.tsx` renders sections in correct order:
```
Navbar
HeroSection
TrustBar
ValuePropsSection
StatsSection
WorldMapSection (About/Corridor)
HowItWorksSection
SectorsSection
TestimonialsSection
CTASection
Footer (includes Newsletter)
```
**Status:** Already correct in current `App.tsx`. No changes needed.

#### 3.2 Content Replacement Audit
Sweep all sections for any remaining Ondo/crypto content:

| File | Status | Action |
|---|---|---|
| HeroSection.tsx | Clean | No crypto content |
| TrustBar.tsx | Clean | Uses SIA partners |
| ValuePropsSection.tsx | Clean | SIA value props |
| StatsSection.tsx | Clean | SIA metrics |
| WorldMapSection.tsx | Clean | KSA-MY corridor |
| HowItWorksSection.tsx | Clean | Deal lifecycle |
| SectorsSection.tsx | Clean | 8 SIA sectors |
| TestimonialsSection.tsx | Clean | Industry commentary |
| CTASection.tsx | Clean | SIA CTA |
| Footer.tsx | Clean | SIA footer |
| InstitutionalSection.tsx | **NEEDS UPDATE** | Still has Ondo crypto content (asset managers, BlackRock, smart contracts). Repurpose for SIA institutional trust messaging. |
| AnnouncementsSection.tsx | **REMOVE or REPURPOSE** | Ondo announcements. Could become SIA news/insights. |
| GlobalMarketsSection.tsx | **REMOVE** | Flux + token scrolling. Not applicable to SIA. |
| OndoChainSection.tsx | **REMOVE** | SIA Chain network visualization. Not applicable. |
| EcosystemSection.tsx | **REMOVE or REPURPOSE** | Partner ecosystem. Could become SIA partner showcase. |
| ResourcesSection.tsx | **REPURPOSE** | Resource cards with tabs. Could become Insights section. |
| PartnerLogos.tsx | **REDUNDANT** | Replaced by TrustBar.tsx |

#### 3.3 Integrate New Components into Sections
- Add `ComparisonTable` below `ValuePropsSection` cards
- Add `DonutChart` alongside or below `StatsSection`
- Add `HubSpokeDiagram` to a new "Platform" subsection or page
- Wire `BookingWidget` into `CTASection` primary button

#### 3.4 Build Core Pages (React Router)
Set up routing for the 5 launch pages:

| Page | Route | Sections Included |
|---|---|---|
| Home | `/` | All homepage sections |
| About | `/about` | MissionVision, WorldMap, TeamGrid, Timeline |
| Services | `/services` | ValueProps, HowItWorks, ComparisonTable, HubSpoke |
| Contact | `/contact` | ContactForm, OfficeLocations, BookingWidget |
| Insights | `/insights` | ResourcesSection (repurposed) |

### Content Requirements Checklist
- [ ] Hero: Headline, subheading, badge text, CTA labels
- [ ] Trust Bar: Partner names (done), partner logos (pending)
- [ ] Value Props: 3 card descriptions (done)
- [ ] Stats: 4 primary metrics (done), extended metrics
- [ ] About: 3 paragraphs of corridor narrative (done)
- [ ] How It Works: 4 steps with descriptions (done)
- [ ] Sectors: 8 sectors with descriptions (done)
- [ ] Testimonials: 6 industry quotes (done, need real ones)
- [ ] CTA: Heading, subtext, trust micro-copy (done)
- [ ] Footer: All link labels, office addresses (done)
- [ ] Team: Names, roles, headshots, credentials (PENDING)
- [ ] Contact: Form fields, office addresses, booking link (PARTIAL)

### Dependencies
- Phase 1 complete (design system)
- Phase 2 complete (new components built)
- React Router installed and configured

### Definition of Done
- [ ] Homepage renders all 10 sections in correct order
- [ ] No crypto/Ondo content remains anywhere in rendered output
- [ ] All SIA content is in place (or marked with clear placeholders)
- [ ] React Router serves 5 pages
- [ ] Navigation links work for all pages
- [ ] Mobile responsive on all pages

---

## Phase 4: Data Visualizations

### Objective
Build data-driven visual components that communicate SIA's value through numbers.

### Components

#### 4.1 Donut Chart - Sector Distribution
- **Data:** Halal 28%, Healthcare 18%, Real Estate 15%, Technology 12%, Islamic Finance 10%, Energy 8%, Tourism 5%, Logistics 4%
- **Animation:** Segments draw sequentially on scroll, 0.15s stagger per segment
- **Interaction:** Hover shows tooltip with sector name + percentage + deal count
- **Effort:** M

#### 4.2 Animated Stats Cards
- **Enhancement to existing StatsSection**
- **Add:** Icon per stat, progress bar indicator, "vs industry" comparison line
- **Data:** Same 4 core metrics with added context
- **Effort:** S

#### 4.3 Corridor Flow Visualization
- **Data:** Bilateral trade flows by category (goods, services, FDI)
- **Visual:** Animated paths showing flow direction and volume
- **Integrated into:** InvestmentBridge component
- **Effort:** M (integrated into Phase 2 InvestmentBridge)

#### 4.4 Deal Pipeline Funnel
- **Data:** Leads -> Qualified -> Due Diligence -> Structuring -> Closed
- **Visual:** Horizontal funnel with conversion percentages
- **For:** Services page or Platform page
- **Effort:** M

#### 4.5 Team Distribution Map
- **Data:** Team members by location (Riyadh, KL, remote)
- **Visual:** Mini world map with dots at team locations + count labels
- **For:** About page
- **Effort:** S (reuse WorldMap component with different markers)

#### 4.6 Sector Heatmap (Optional)
- **Data:** Deal activity intensity by sector x quarter
- **Visual:** Color-coded grid (gold intensity = activity level)
- **For:** Sectors page or Insights page
- **Effort:** L

### Dependencies
- Phase 1 complete (color tokens for chart theming)
- SVG animation patterns established in Phase 2

### Definition of Done
- [ ] Donut chart renders with correct data and animates on scroll
- [ ] Stats cards have enhanced layout with icons and context
- [ ] All charts use SIA gold color palette consistently
- [ ] Charts are responsive (scale down gracefully on mobile)
- [ ] Tooltips/interactions work on both mouse and touch

---

## Phase 5: Polish & Animation

### Objective
Elevate visual quality with scroll-triggered animations, transitions, micro-interactions, and performance optimization.

### Tasks

#### 5.1 Scroll-Triggered Animations
- **Audit all sections** for consistent `whileInView` behavior
- **Standard pattern:** `initial={{ opacity: 0, y: 20 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, margin: "-100px" }}`
- **Stagger children** within sections at 0.1-0.15s intervals
- **Section headers** reveal before content (0.2s lead)
- **Effort:** M

#### 5.2 Section Divider Transitions
- **Between sections:** Gradient fades (dark -> light or light -> dark)
- **Gold accent lines** at section boundaries (already on StatsSection, extend pattern)
- **Subtle parallax** on background elements (ambient glow blobs move at 0.5x scroll rate)
- **Effort:** S

#### 5.3 Micro-Interactions
- **Buttons:** Scale 1.02 + shadow on hover, scale 0.98 on press
- **Cards:** Lift (-translate-y-1) + shadow-lg on hover (already on most cards)
- **Links:** Animated underline (width from 0 to 100% on hover)
- **Navigation:** Active section highlight updates on scroll (Intersection Observer)
- **Gold pulse:** Badge dot animation (already on hero badge)
- **Effort:** S

#### 5.4 Page Transitions
- **Route transitions:** Fade + slight vertical shift using `AnimatePresence` + `motion.div` wrapper on each page
- **Duration:** 0.3s ease-out
- **Effort:** S

#### 5.5 Performance Optimization
- **Lazy load below-fold sections** with React.lazy + Suspense
- **Defer 3D Globe** rendering until hero is in viewport
- **Image optimization:** WebP format, srcset for responsive images, lazy loading attribute
- **Font loading:** `display: swap` to prevent FOIT
- **Code splitting:** Per-route chunks via React Router lazy loading
- **Bundle analysis:** Identify and tree-shake unused shadcn/ui components
- **Target:** Lighthouse 90+ on all metrics (Performance, Accessibility, Best Practices, SEO)
- **Effort:** M

#### 5.6 Mobile-Specific Polish
- **Globe component:** Hide on mobile (already done: `hidden lg:flex`), show fallback illustration or gradient
- **Touch interactions:** Ensure all hover effects have touch equivalents
- **Marquee sections:** Verify smooth scrolling on iOS Safari
- **Form inputs:** Proper input types for mobile keyboards (email, tel)
- **Effort:** S

### Dependencies
- Phase 3 complete (all sections assembled)
- Phase 4 complete (data visualizations in place)

### Definition of Done
- [ ] All sections animate consistently on scroll entry
- [ ] Section dividers provide smooth visual flow
- [ ] All interactive elements have hover/active/focus states
- [ ] Page transitions work smoothly between routes
- [ ] Lighthouse Performance score >= 90
- [ ] Lighthouse Accessibility score >= 90
- [ ] No layout shifts (CLS < 0.1)
- [ ] First Contentful Paint < 1.5s
- [ ] Mobile experience is smooth on iOS Safari and Chrome Android

---

## Phase 6: Content & i18n

### Objective
Finalize all copy, implement Arabic translations, and add RTL layout support.

### Tasks

#### 6.1 i18n Infrastructure Setup
- **Install:** `i18next`, `react-i18next`, `i18next-browser-languagedetector`
- **Create translation files:**
  ```
  src/i18n/
    en/
      common.json    (nav, footer, CTAs)
      home.json      (all homepage section content)
      about.json
      services.json
      contact.json
    ar/
      common.json
      home.json
      about.json
      services.json
      contact.json
  ```
- **Wrap App in I18nextProvider**
- **Effort:** M

#### 6.2 Extract All Hardcoded Strings
- **Sweep all section files** and replace hardcoded English strings with `t('key')` calls
- **Files to update:** All 10+ section files, Navbar, Footer
- **Effort:** M

#### 6.3 Arabic Translations
- **Translate all content** to Arabic (professional translation, not machine)
- **Cultural adaptation:** Ensure messaging resonates with Gulf audience
- **Numerical formatting:** Arabic-Indic numerals option, or keep Western Arabic numerals
- **Effort:** L (depends on translation vendor timeline)

#### 6.4 RTL Layout Support
- **CSS logical properties:** Replace `left/right` with `start/end`, `margin-left` with `margin-inline-start`
- **Tailwind RTL plugin:** Consider `tailwindcss-rtl` or manual `[dir=rtl]` overrides
- **Flex direction:** Reverse horizontal layouts in RTL
- **Icons:** Mirror directional icons (arrows, chevrons) in RTL
- **Typography:** Switch to IBM Plex Sans Arabic / Noto Sans Arabic when locale is `ar`
- **Testing:** Visual regression testing for all sections in RTL mode
- **Effort:** L

#### 6.5 Final Copy Review
- **Tone check:** Professional, confident, data-driven. Not salesy.
- **Reading level:** Aim for 7th-8th grade (plain language)
- **Fact check:** Verify all statistics ($18B, 6 months, etc.) have sources
- **Legal review:** Ensure no misleading claims about partnerships or performance
- **Effort:** S (editorial review)

#### 6.6 SEO Content
- **Meta titles and descriptions** for all 5 pages
- **Open Graph tags** with SIA logo and page-specific images
- **Structured data:** Organization schema, Service schema
- **Sitemap.xml** generation
- **Effort:** S

### Dependencies
- Phase 3 complete (all sections with final English content)
- Professional Arabic translator (external dependency)
- Legal review (external dependency)

### Definition of Done
- [ ] i18next is configured and working
- [ ] Language switcher toggles between EN and AR
- [ ] All sections render correctly in both languages
- [ ] RTL layout works without visual bugs
- [ ] Arabic typography renders with correct font
- [ ] SEO meta tags are present on all pages
- [ ] No hardcoded strings remain in component files
- [ ] Content passes editorial and legal review

---

## Component Dependency Graph

```
Design Tokens (Phase 1)
  |
  +---> ALL Components
  |
  +---> Playfair Display Font
  |       |
  |       +---> Hero headline
  |       +---> Section headings
  |       +---> Stats numbers
  |
  +---> Gold Color System
          |
          +---> CTAs, badges, accents, icons
          +---> Gradient text effects
          +---> Glow shadows

Animation Library (Framer Motion) -- already installed
  |
  +---> FadeIn, SlideUp, StaggerContainer
  |       |
  |       +---> Every section uses scroll reveal
  |
  +---> AnimatedCounter
  |       |
  |       +---> StatsSection
  |
  +---> Marquee
  |       |
  |       +---> TrustBar
  |       +---> TestimonialsSection
  |
  +---> FlipWords
  |       |
  |       +---> HeroSection
  |
  +---> TextReveal
          |
          +---> ValuePropsSection heading

3D Components
  |
  +---> Globe.tsx
  |       |
  |       +---> HeroSection (right panel)
  |
  +---> WorldMap.tsx
          |
          +---> WorldMapSection (About/Corridor)
          +---> Team Distribution Map (Phase 4)

Effect Components
  |
  +---> SpotlightCard.tsx
  |       |
  |       +---> ValuePropsSection cards
  |
  +---> ThreeDCard.tsx
  |       |
  |       +---> ValuePropsSection cards
  |       +---> SectorsSection cards
  |       +---> SectorDetailCard (new)
  |
  +---> Lamp.tsx
  |       |
  |       +---> CTASection
  |
  +---> BorderBeam.tsx
          |
          +---> CTASection primary button

New Components (Phase 2)
  |
  +---> HubSpokeDiagram.tsx
  |       |
  |       +---> HowItWorksSection (enhancement)
  |       +---> Services page
  |       Depends on: Design tokens, Framer Motion
  |
  +---> InvestmentBridge.tsx
  |       |
  |       +---> WorldMapSection (enhancement) or standalone Corridor section
  |       Depends on: Design tokens, flag assets, trade data
  |
  +---> ContactForm.tsx
  |       |
  |       +---> Contact page
  |       Depends on: React Hook Form, Zod, Resend API, shadcn/ui Select
  |
  +---> TeamGrid.tsx
  |       |
  |       +---> About page
  |       Depends on: Team photo assets, design tokens
  |
  +---> ComparisonTable.tsx
  |       |
  |       +---> ValuePropsSection (below cards) or Services page
  |       Depends on: Design tokens only
  |
  +---> BookingWidget.tsx
  |       |
  |       +---> CTASection
  |       Depends on: Calendly/Cal.com account
  |
  +---> DonutChart.tsx
  |       |
  |       +---> StatsSection (enhancement) or standalone
  |       Depends on: Design tokens, sector distribution data
  |
  +---> LanguageSwitcher.tsx
          |
          +---> Navbar
          +---> Footer
          Depends on: i18next (Phase 6)

i18n System (Phase 6)
  |
  +---> LanguageSwitcher.tsx
  |
  +---> All section files (string extraction)
  |
  +---> RTL CSS overrides
  |
  +---> Arabic font loading
```

---

## Risk Register

### Asset Risks

| Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|
| **Team photos unavailable** | TeamGrid renders with placeholder avatars only | High | Design attractive initial-based avatar component. Prompt founder for photos early. |
| **Partner logos not approved** | TrustBar uses text-only or initial placeholders | Medium | Current initial-based placeholders are acceptable. Request logo usage permission from MIDA, SAGIA, etc. |
| **SIA logo resolution issues** | Blurry logo in navbar/footer | Low | Request SVG version of logo. Current PNG may suffice at small sizes. |
| **Flag/emblem assets for InvestmentBridge** | Cannot build corridor visualization | Medium | Use open-source flag SVGs (flagicons, country-flags). Government emblems may need permission. |

### Content Risks

| Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|
| **No real testimonials** | Social proof section uses industry commentary indefinitely | High | Current industry quotes are credible. Actively collect real testimonials from early partners/advisors. |
| **Statistics unverifiable** | Credibility damage if challenged | Medium | Source all stats: $18B from MITI bilateral trade reports, deal cycle from internal benchmarks. Add source footnotes. |
| **Arabic translation quality** | Poor translation damages credibility with Gulf audience | Medium | Use professional translator with financial/legal domain expertise, not machine translation. Have native speaker review. |
| **Legal copy missing** | Privacy Policy, Terms of Service pages empty | Medium | Use template legal documents adapted for dual-jurisdiction (KSA + Malaysia). Engage legal counsel. |
| **Case studies not available** | No deep social proof beyond quotes | High | Create anonymized deal narratives based on corridor research. Label clearly as "illustrative example" until real cases exist. |

### Technical Risks

| Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|
| **3D Globe performance on mobile** | Janky rendering, battery drain, high FCP | High | Globe is already hidden on mobile (`hidden lg:flex`). Ensure no offscreen rendering. Consider replacing with static illustration on tablet. |
| **Complex SVG animations (HubSpoke, InvestmentBridge) cause jank** | Poor scroll performance, dropped frames | Medium | Use `will-change: transform` sparingly. Profile with Chrome DevTools. Simplify animations if FPS drops below 30. Use CSS transforms over layout-triggering properties. |
| **Bundle size bloat from 60+ shadcn/ui components** | Slow initial load, poor Lighthouse score | Medium | Audit which shadcn/ui components are actually imported. Tree-shaking should handle unused ones, but verify. Code-split per route. |
| **RTL layout breaks existing components** | Visual bugs in Arabic mode | High | Build RTL support incrementally. Test each component in isolation before section-level testing. Use CSS logical properties from the start. |
| **i18next bundle size** | Adds 20-40KB to initial bundle | Low | Use dynamic imports for translation files. Load only active locale. |
| **Framer Motion bundle size** | Already in bundle, but watch for growth | Low | Import only needed functions (`motion`, `useInView`, `AnimatePresence`). Avoid importing entire library. |
| **Vercel/Netlify deployment configuration** | SPA routing fails (404 on page refresh) | Medium | Add `_redirects` (Netlify) or `vercel.json` rewrite rules for SPA fallback. |

### Timeline Risks

| Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|
| **Arabic translation delays** | Phase 6 blocked, launch delayed | High | Start translation in parallel with Phase 4. Provide translator with final English copy from Phase 3. |
| **Scope creep on data visualizations** | Phase 4 takes 2-3x estimated time | Medium | Prioritize DonutChart and StatsCards. Defer Heatmap and Sankey to post-launch. |
| **Booking system selection delays** | CTA section has no functional booking | Medium | Default to mailto link. BookingWidget is a progressive enhancement. |
| **Content revisions after "final" copy** | Rework across all sections and translations | High | Establish content freeze date. After freeze, only typo fixes, no structural changes. |

---

## Quick Reference: What Exists vs What Needs Building

### Already Built (SIA Content)
- HeroSection (Globe + FlipWords + gold theme)
- TrustBar (partner marquee)
- ValuePropsSection (3D cards + spotlight)
- StatsSection (animated counters)
- WorldMapSection (corridor narrative)
- HowItWorksSection (deal lifecycle timeline)
- SectorsSection (8 sector cards)
- TestimonialsSection (industry commentary marquee)
- CTASection (lamp effect + border beam)
- Footer (newsletter + links + offices)
- Navbar (scroll behavior + mobile menu)

### Needs Building (New)
- HubSpokeDiagram (platform visualization)
- InvestmentBridge (corridor flow visualization)
- ContactForm (lead capture)
- TeamGrid (leadership display)
- ComparisonTable (SIA vs competitors)
- BookingWidget (scheduling embed)
- DonutChart (sector distribution)
- LanguageSwitcher (EN/AR toggle)
- React Router setup (5 pages)
- i18n infrastructure
- RTL layout support

### Needs Cleanup (Remove/Repurpose)
- InstitutionalSection.tsx (Ondo content -> SIA institutional trust)
- AnnouncementsSection.tsx (Ondo news -> SIA insights or remove)
- GlobalMarketsSection.tsx (token scrolling -> remove)
- OndoChainSection.tsx (blockchain CTA -> remove)
- EcosystemSection.tsx (crypto partners -> SIA partners or remove)
- ResourcesSection.tsx (resources tabs -> SIA insights)
- PartnerLogos.tsx (redundant with TrustBar)
