# 08 - Component-to-Section Mapping

> Maps every extractable Wider visual component to a specific SIA website section.
> Defines what to keep, what to adapt, and what to build new for each section.

---

## Table of Contents

1. [Hero Section](#1-hero-section)
2. [Trust Bar / Partners Strip](#2-trust-bar--partners-strip)
3. [Stats / Metrics Section](#3-stats--metrics-section)
4. [About / Who We Are](#4-about--who-we-are)
5. [How It Works / Platform](#5-how-it-works--platform)
6. [Sectors / Industries](#6-sectors--industries)
7. [Investment Bridge / Corridor](#7-investment-bridge--corridor)
8. [Value Propositions / Why SIA](#8-value-propositions--why-sia)
9. [Testimonials / Social Proof](#9-testimonials--social-proof)
10. [CTA Section](#10-cta-section)
11. [Contact / Newsletter](#11-contact--newsletter)
12. [Footer](#12-footer)

---

## 1. Hero Section

### Source Components from Wider
- **Gradient Background / Aurora Effect** from Wider hero slides (aceternity/aurora-background pattern)
- **Flip Words / Rotating Text** component for dynamic headline keywords
- **3D Globe** visualization (dillionverma/globe) showing KSA-Malaysia arc
- **Spotlight Grid** ambient background pattern
- **Badge / Announcement Pill** (rounded pill with pulse dot indicator)

### Visual Adaptation
- **Keep from Wider:** Aurora-style ambient glow blobs, spotlight grid overlay, split-layout (content left / visual right), staggered entry animations, badge pill pattern with animated pulse dot
- **Change for SIA:** Replace any crypto/DeFi imagery with KSA-Malaysia corridor visual. Globe should highlight Riyadh and Kuala Lumpur with an animated arc connecting them
- **Color transformations:** Purple/blue glow -> Gold/charcoal glow (`bg-gold/5` blobs). Blue accent badges -> Gold accent badges (`border-gold/20 bg-gold/5`)
- **Content replacements:** "Bridging Opportunity" headline stays. FlipWords cycles through corridor-relevant terms: "Opportunity", "Investment", "Growth", "Innovation"

### Existing SIA Components to Reuse
- `HeroSection.tsx` -- Already rebuilt with SIA content, 3D Globe, FlipWords, and gold color scheme. Minimal changes needed.
- `Globe.tsx` (components/3d/) -- 3D globe with KSA-Malaysia arc. Keep as-is.
- `FlipWords.tsx` (components/effects/) -- Rotating text effect. Keep as-is.
- `AuroraBackground.tsx` (components/effects/) -- Can be used as alternative hero background if globe has performance issues on mobile.

### New Components Needed
- `HeroParticles.tsx` -- Optional: lightweight particle system connecting two points (KSA/MY) as an alternative to full 3D globe for mobile devices.

### Content Requirements
- **Heading:** "Bridging [FlipWord] Between Saudi Arabia & Malaysia"
- **Subheading:** "Institutional deal facilitation for the $18B+ bilateral investment corridor."
- **Primary CTA:** "Schedule a Conversation"
- **Secondary CTA:** "Learn More"
- **Anchor Stats:** $18B+ (Annual Trade Volume), 6 Mo (Avg Deal Cycle), 8 (Sectors Covered)
- **Badge:** "Now Accepting Partners for Q3 2026"
- **Data sources:** Static content, stats are fixed marketing numbers

### Priority
- **High** -- First impression, must be polished
- **Dependencies:** Design tokens (colors, fonts), Globe component, FlipWords component

---

## 2. Trust Bar / Partners Strip

### Source Components from Wider
- **Logo Marquee** (shadcnblockscom/logos-3 + magicui/marquee pattern)
- **Auto-scrolling horizontal strip** with infinite loop

### Visual Adaptation
- **Keep from Wider:** Infinite marquee scroll behavior, "Aligned With" label prefix, subtle border-y separators, compact layout
- **Change for SIA:** Replace crypto partner logos (BlackRock, Ethereum, Solana) with government/institutional logos. Use actual logo images once available instead of letter-initial placeholders
- **Color transformations:** Blue accent initials -> Gold initials (`text-gold`). Dark border -> `border-white/[0.04]`
- **Content replacements:** Vision 2030, MIDA, SAGIA, Madani Economy, MITI, Bank Negara, CMA

### Existing SIA Components to Reuse
- `TrustBar.tsx` -- Already rebuilt with correct partners list and gold styling. Needs real logo images.
- `Marquee.tsx` (components/effects/) -- Infinite scroll marquee. Keep as-is.

### New Components Needed
- None. Replace placeholder initials with `<img>` tags once partner logos are available.

### Content Requirements
- **Label:** "Aligned With"
- **Partner names:** Vision 2030, MIDA, SAGIA, Madani Economy, MITI, Bank Negara, CMA
- **Logo images:** PNG/SVG files for each partner (currently using letter-initial placeholders)
- **Data sources:** Static

### Priority
- **Medium** -- Important for trust, but functional with placeholders
- **Dependencies:** Partner logo assets (external dependency)

---

## 3. Stats / Metrics Section

### Source Components from Wider
- **Animated Number / Spring Counter** (reuno-ui/animated-number pattern)
- **Stats Grid** with scroll-triggered count-up animations
- **Donut Chart** component (from Wider data visualization slides, if applicable)

### Visual Adaptation
- **Keep from Wider:** Spring-physics animated counters, scroll-trigger (useInView), staggered reveal per stat, centered grid layout, gold accent divider line at top
- **Change for SIA:** Replace any crypto metrics (TVL, APY, chains) with corridor metrics. Consider adding a donut chart or bar visualization for sector distribution
- **Color transformations:** Blue counters -> White counters on navy. Accent line stays gold (`bg-gradient-to-r from-transparent via-gold to-transparent`)
- **Content replacements:** $18B+ (Annual Bilateral Trade), 6 Mo (Average Deal Cycle), 92% (Client Retention), 8 (Sectors Covered)

### Existing SIA Components to Reuse
- `StatsSection.tsx` -- Already rebuilt with SIA metrics and gold accent. Keep as-is.
- `AnimatedCounter.tsx` (components/effects/) -- Spring-physics counter. Keep as-is.

### New Components Needed
- `DonutChart.tsx` -- Optional: sector distribution visualization (Halal 28%, Healthcare 18%, Real Estate 15%, etc.)
- `StatsCard.tsx` -- If stats section evolves to card-based layout with icons per stat

### Content Requirements
- **Stats data:**
  - $18B+ -- Annual Bilateral Trade (KSA-Malaysia corridor)
  - 6 Mo -- Average Deal Cycle (vs 12-18 months typical)
  - 92% -- Client Retention (partners return for repeat deals)
  - 8 -- Sectors Covered (from Halal to FinTech)
- Additional stats for expanded version: 200+ (Mid-Market Deals/Year), 85%+ (Gross Margin), 2 (Jurisdictions)
- **Data sources:** Static marketing numbers. Could become API-driven in future for live deal counts.

### Priority
- **High** -- Core trust signal, data-first messaging principle
- **Dependencies:** Design tokens, AnimatedCounter component

---

## 4. About / Who We Are

### Source Components from Wider
- **World Map** dotted visualization (aceternity/world-map pattern) showing connection arcs
- **Split Layout** (map left / content right) with staggered reveal
- **Fact Grid** (2x2 grid of key facts with borders)

### Visual Adaptation
- **Keep from Wider:** Dotted world map with animated connection arcs, split-layout pattern, staggered content reveal, fact/stat cards grid
- **Change for SIA:** Map should prominently show KSA-Malaysia arc. Content focuses on "Why this corridor?" narrative. Fact cards highlight Islamic Finance Hub, Peak Investment Window, Halal Economy, No Competition
- **Color transformations:** Connection arcs use gold gradient. Fact card borders: `border-white/[0.06]`
- **Content replacements:** Three paragraphs about Vision 2030 capital flows, Madani Economy, and the $18B+ corridor gap

### Existing SIA Components to Reuse
- `WorldMapSection.tsx` -- Already rebuilt as "The Corridor" section with correct content. Keep as-is.
- `WorldMap.tsx` (components/3d/) -- Dotted world map with arcs. Keep as-is.

### New Components Needed
- `TeamGrid.tsx` -- Leadership team photos, names, roles, credentials, LinkedIn links (for full About page, not homepage)
- `MissionVision.tsx` -- Mission statement with gold accent typography (for full About page)
- `TimelineHistory.tsx` -- Optional: company founding story timeline

### Content Requirements
- **Section label:** "The Corridor"
- **Heading:** "Why Saudi Arabia & Malaysia"
- **Body paragraphs:** Vision 2030 investment context, $18B corridor opportunity, Big 4 vs SIA positioning
- **Fact cards:** 4 cards with label + detail
- **Team data:** Names, roles, headshots, LinkedIn URLs, credentials (NOT YET AVAILABLE)
- **Data sources:** Static content

### Priority
- **High** -- Core narrative section
- **Dependencies:** WorldMap component, team photography (external dependency for full About page)

---

## 5. How It Works / Platform

### Source Components from Wider
- **Timeline Animation** (anubra266/timeline-animation pattern) with scroll-triggered steps
- **Vertical timeline** with animated connecting line and step indicators
- **Icon boxes** with spring-scale entrance animation and pulse ring effect

### Visual Adaptation
- **Keep from Wider:** Vertical timeline layout, animated connecting line (gold gradient), spring-scale icon entrances, pulse ring animation on step indicators, duration badges, staggered reveal
- **Change for SIA:** Content is already SIA-specific (Discovery, Due Diligence, Structuring, Execution). Could evolve into a Hub-and-Spoke diagram for platform overview
- **Color transformations:** Already uses gold throughout (`text-gold`, `bg-gold/10`, `border-gold/20`). Connecting line: `from-gold/40 via-gold/20 to-transparent`
- **Content replacements:** 4-step deal lifecycle is correct. Consider adding Step 5: "Post-Deal Support"

### Existing SIA Components to Reuse
- `HowItWorksSection.tsx` -- Already rebuilt with deal lifecycle content. Keep as-is.

### New Components Needed
- `HubSpokeDiagram.tsx` -- Hub-and-spoke SVG visualization showing SIA at center connecting KSA entities to Malaysian entities. Central node = SIA platform. Spokes radiate to: Deal Matching, Compliance, Due Diligence, Structuring, Execution, Post-Deal Support
- `DealFlowSankey.tsx` -- Optional: Sankey-style flow diagram showing deal progression from discovery to close with conversion rates
- `PlatformFeatures.tsx` -- Detailed platform feature cards for dedicated Platform page (AI Matching, Compliance Engine, Document Vault, etc.)

### Content Requirements
- **Section label:** "The Process"
- **Heading:** "From Introduction to Close in 6 Months"
- **Steps:**
  1. Discovery & Matching (2-4 weeks) -- AI-powered entity matching
  2. Due Diligence & Compliance (4-8 weeks) -- Dual-jurisdiction regulatory navigation
  3. Deal Structuring (4-6 weeks) -- Transaction design, legal framework
  4. Execution & Close (2-4 weeks) -- Final documentation, fund transfer
- **Data sources:** Static content

### Priority
- **High** -- Process transparency is a core trust principle (from YC analysis)
- **Dependencies:** Design tokens. Hub-Spoke diagram requires custom SVG work.

---

## 6. Sectors / Industries

### Source Components from Wider
- **3D Card Effect** (aceternity/3d-card-effect) with mouse-tracking perspective tilt
- **Bento Grid** layout pattern for sector cards
- **Icon + Label cards** with hover state transitions

### Visual Adaptation
- **Keep from Wider:** 3D perspective tilt on hover (ThreeDCard wrapper), 4-column responsive grid, icon-centered card design, staggered fade-up entrance, gold icon containers with border
- **Change for SIA:** Content is already SIA-specific (8 sectors). Could evolve to show sector-specific deal volume or opportunity size per card
- **Color transformations:** Already uses `bg-gold/[0.08]`, `border-gold/[0.15]`, `text-gold/70`. Hover: `bg-gold/[0.15]`, `text-gold`
- **Content replacements:** 8 sectors are correct: Halal & Food, Healthcare, Real Estate, Technology, Islamic Finance, Renewable Energy, Tourism, Logistics

### Existing SIA Components to Reuse
- `SectorsSection.tsx` -- Already rebuilt with correct content and 3D cards. Keep as-is.
- `ThreeDCard.tsx` (components/effects/) -- 3D perspective wrapper. Keep as-is.

### New Components Needed
- `SectorDetailCard.tsx` -- Expanded card for dedicated Sectors page with: deal count, market size, key players, opportunity description
- `SectorHeatmap.tsx` -- Optional: visual heatmap showing deal activity intensity across sectors
- `InvestmentBridgeChart.tsx` -- Optional: per-sector bilateral flow visualization

### Content Requirements
- **Section label:** "Sectors"
- **Heading:** "Eight Industries, One Corridor"
- **Sector cards:** Name, icon, one-line description per sector
- **Extended data (for Sectors page):** Market size per sector, number of active deals, key players, regulatory requirements
- **Data sources:** Static for homepage. Could become API-driven for live deal counts.

### Priority
- **Medium** -- Important but already functional
- **Dependencies:** ThreeDCard component, sector detail content (for expanded page)

---

## 7. Investment Bridge / Corridor

### Source Components from Wider
- **World Map** with connection arcs (shared with About section)
- **Split layout** with map + narrative content
- **Gradient text** effect for country name highlights

### Visual Adaptation
- **Keep from Wider:** Dotted world map, animated arc between KSA and Malaysia, gradient-gold text effect on country names, fact grid pattern
- **Change for SIA:** This section is currently merged with the About/WorldMap section. For a dedicated corridor page or expanded homepage, extract this into a standalone Investment Bridge visualization
- **Color transformations:** `text-gradient-gold` for "Saudi Arabia" and "Malaysia" highlights
- **Content replacements:** Corridor-specific narrative about bilateral trade flows

### Existing SIA Components to Reuse
- `WorldMapSection.tsx` -- Currently serves double duty as About + Corridor. Can be reused.
- `WorldMap.tsx` (components/3d/) -- Dotted map with arcs.

### New Components Needed
- `InvestmentBridge.tsx` -- Dedicated corridor visualization: two nodes (KSA flag/icon, MY flag/icon) connected by animated bridge/arc with flow indicators. Shows capital flowing in both directions with labeled amounts per sector.
- `CorridorStats.tsx` -- Bilateral trade statistics panel: total trade volume, top export categories, YoY growth, FDI flows
- `DualJurisdictionMap.tsx` -- Side-by-side regulatory environment comparison (SAGIA requirements vs MIDA requirements)

### Content Requirements
- **Heading:** "The KSA-Malaysia Investment Corridor"
- **Bilateral trade data:** $18B+ total, breakdown by sector
- **FDI flow data:** Saudi investment into Malaysia, Malaysian investment into KSA
- **Regulatory comparison:** SAGIA vs MIDA key requirements
- **Flag/emblem assets:** Saudi Arabia flag/emblem, Malaysia flag/emblem
- **Data sources:** Static for now. Potential for real-time trade data API integration.

### Priority
- **Medium** -- Important differentiator but complex to build well
- **Dependencies:** WorldMap component, SVG illustration work, bilateral trade data

---

## 8. Value Propositions / Why SIA

### Source Components from Wider
- **3D Card Effect** (aceternity/3d-card-effect) with perspective tilt
- **Spotlight Card** (easemize/spotlight-card) with mouse-tracking glow
- **Text Reveal** animation for headlines
- **Stat footer** within cards showing key metric

### Visual Adaptation
- **Keep from Wider:** 3D perspective card wrapper + spotlight glow combination, icon-title-description-stat card structure, 3-column grid, text reveal animation on heading, staggered entrance
- **Change for SIA:** Content is already SIA-specific. Could add comparison table (SIA vs Big 4 vs Investment Banks) below cards
- **Color transformations:** Spotlight glow uses `rgba(200, 169, 81, ...)` (gold tones). Icons: `text-gold`. Stats: `text-gradient-gold`
- **Content replacements:** Deal Facilitation ($2M-$50M range), Regulatory Navigation (2 Jurisdictions), AI-Powered Matching (200+ Deals/Year)

### Existing SIA Components to Reuse
- `ValuePropsSection.tsx` -- Already rebuilt with correct content and visual effects. Keep as-is.
- `SpotlightCard.tsx` (components/effects/) -- Mouse-tracking glow card. Keep as-is.
- `ThreeDCard.tsx` (components/effects/) -- 3D perspective wrapper. Keep as-is.
- `TextReveal.tsx` (components/effects/) -- Word-by-word text reveal. Keep as-is.

### New Components Needed
- `ComparisonTable.tsx` -- "SIA vs Big 4 vs Investment Banks" comparison showing: cost, deal size focus, corridor expertise, technology, timeline. Uses a clean table or card-based comparison layout.
- `DifferentiatorCards.tsx` -- For expanded "Why SIA" section on About page

### Content Requirements
- **Section label:** "Why SIA"
- **Heading:** "We operate where others don't"
- **Subheading:** Gap between Big 4 ($500K+ retainers) and investment banks ($100M+ deals)
- **Cards:** 3 value propositions with icon, title, description, and stat
- **Comparison data:** SIA vs Big 4 vs Investment Banks across multiple dimensions
- **Data sources:** Static content

### Priority
- **High** -- Core conversion section
- **Dependencies:** SpotlightCard, ThreeDCard, TextReveal components

---

## 9. Testimonials / Social Proof

### Source Components from Wider
- **Testimonial Marquee** (sean0205/3d-testimonials + Efferd/testimonials-columns pattern)
- **Dual-row marquee** (one forward, one reverse) with side fade gradients
- **Quote cards** with avatar initial, name, role

### Visual Adaptation
- **Keep from Wider:** Dual-row marquee (forward + reverse), side fade gradients, quote card design with avatar circle and gold initial, hover border transition
- **Change for SIA:** Replace industry commentary quotes with actual client/partner testimonials once available. Current content uses attributed industry analysis quotes as placeholder
- **Color transformations:** Avatar: `bg-gold/10 border-gold/20 text-gold`. Hover border: `border-gold/15`. Side fades: `from-navy`
- **Content replacements:** Real quotes from partners, officials, or clients

### Existing SIA Components to Reuse
- `TestimonialsSection.tsx` -- Already rebuilt with industry commentary quotes. Keep structure, replace content when real testimonials are available.
- `Marquee.tsx` (components/effects/) -- Infinite scroll marquee with reverse option. Keep as-is.

### New Components Needed
- `TestimonialWithPhoto.tsx` -- Upgraded testimonial card with actual headshot photo, company logo, full attribution
- `CaseStudyCard.tsx` -- For deeper social proof: anonymized deal case studies with outcomes

### Content Requirements
- **Section label:** "Perspectives"
- **Heading:** "What Industry Leaders Say"
- **Testimonials:** 6 quotes with name, role/organization
- **CRITICAL DEPENDENCY:** Real testimonials from actual partners/clients (currently using industry commentary as placeholder)
- **Data sources:** Static. Could integrate with CMS for ongoing testimonial management.

### Priority
- **Low** (homepage version is functional) / **High** (when real testimonials become available)
- **Dependencies:** Real testimonial content, headshot photos, partner approval for attribution

---

## 10. CTA Section

### Source Components from Wider
- **Lamp Effect** (aceternity/lamp) -- dramatic glow emanating from top center
- **Border Beam** (magicui/border-beam) -- animated border light traveling around CTA button
- **Centered content** with dual CTA buttons

### Visual Adaptation
- **Keep from Wider:** Lamp glow effect (dramatic top-down illumination), border beam on primary CTA button, centered layout, trust micro-copy below buttons, delayed entrance animation
- **Change for SIA:** Content is already SIA-specific. Ensure "Schedule a Conversation" links to actual booking system (Calendly, Cal.com, or mailto)
- **Color transformations:** Lamp glow uses gold tones. Primary CTA: `bg-gold text-charcoal`. Hover: `bg-gold-light shadow-gold-glow-lg`
- **Content replacements:** "Ready to Explore Cross-Border Opportunities?" + dual CTAs

### Existing SIA Components to Reuse
- `CTASection.tsx` -- Already rebuilt with SIA content, lamp effect, and border beam. Keep as-is.
- `Lamp.tsx` (components/effects/) -- Lamp glow effect. Keep as-is.
- `BorderBeam.tsx` (components/effects/) -- Animated border light. Keep as-is.

### New Components Needed
- `BookingWidget.tsx` -- Embedded Calendly/Cal.com widget for direct scheduling (replaces mailto link)
- `FloatingCTA.tsx` -- Optional: sticky bottom-bar CTA that appears after scrolling past hero

### Content Requirements
- **Heading:** "Ready to Explore Cross-Border Opportunities?"
- **Subtext:** "Start a conversation. No commitment, no minimum deal size required."
- **Primary CTA:** "Schedule a Conversation" (links to booking or mailto)
- **Secondary CTA:** "Download Market Report" (links to PDF)
- **Trust micro-copy:** "Aligned with Saudi Vision 2030 . MIDA Recognized . Dual-Jurisdiction Compliance"
- **Data sources:** Static. Booking link configuration needed.

### Priority
- **High** -- Primary conversion point
- **Dependencies:** Lamp, BorderBeam components. Booking system integration (Calendly/Cal.com).

---

## 11. Contact / Newsletter

### Source Components from Wider
- **Newsletter strip** integrated into footer (Efferd/footer-section pattern)
- **Email input + submit button** inline form
- **Separate newsletter section** component (from original Ondo site -- `NewsletterSection.tsx`)

### Visual Adaptation
- **Keep from Wider:** Inline email input + button pattern, clean horizontal layout, subtle background separation
- **Change for SIA:** Newsletter is currently embedded in footer. Could extract to standalone section above footer for higher visibility. Add contact form for full Contact page.
- **Color transformations:** Input: `bg-white/[0.05] border-white/[0.08]`, focus: `border-gold/30`. Button: `bg-gold text-charcoal`
- **Content replacements:** "Market Intelligence, Delivered Weekly" + KSA-Malaysia corridor insights description

### Existing SIA Components to Reuse
- `Footer.tsx` (newsletter strip section) -- Already has inline newsletter form. Can be extracted.
- `NewsletterSection.tsx` (from original Ondo site) -- Standalone newsletter section, needs content replacement.

### New Components Needed
- `ContactForm.tsx` -- Full contact form for Contact page: name, email, company, deal size range, message, submit. Uses React Hook Form + Zod validation.
- `OfficeLocations.tsx` -- Map or cards showing Riyadh and KL office locations with addresses
- `NewsletterStandalone.tsx` -- Optional: extracted newsletter section for homepage placement above footer

### Content Requirements
- **Newsletter heading:** "Market Intelligence, Delivered Weekly"
- **Newsletter description:** "KSA-Malaysia corridor insights, regulatory updates, and deal flow intelligence."
- **Contact form fields:** Name, Email, Company, Role, Deal Size Range (dropdown), Message
- **Office addresses:** Riyadh (Kingdom Centre District), Kuala Lumpur (KLCC District)
- **Email service integration:** Resend or SendGrid for form submissions
- **Newsletter service:** Mailchimp, ConvertKit, or Resend for subscription management
- **Data sources:** Static content, backend integration for form submission

### Priority
- **Medium** (newsletter in footer is functional) / **High** (dedicated Contact page is P0)
- **Dependencies:** Email service backend (Resend), form validation library (React Hook Form + Zod already in stack)

---

## 12. Footer

### Source Components from Wider
- **Footer Section** (Efferd/footer-section pattern)
- **Multi-column link grid** with category headers
- **Logo + tagline** block
- **Office locations** with map pin icons
- **Bottom bar** with copyright and social links

### Visual Adaptation
- **Keep from Wider:** 6-column grid layout (2-col logo area + 4 link columns), newsletter strip above main footer, office locations with MapPin icons, bottom copyright bar, social links with ArrowUpRight icon
- **Change for SIA:** Content is already SIA-specific. Add Arabic language option in footer. Ensure all links point to correct sections/pages.
- **Color transformations:** Already uses charcoal background, `border-white/[0.04]` separators, gold tagline (`text-gold/60`), gold subscribe button
- **Content replacements:** All footer links, office addresses, social URLs

### Existing SIA Components to Reuse
- `Footer.tsx` -- Already rebuilt with SIA content. Keep as-is, minor updates as pages are added.

### New Components Needed
- `LanguageSwitcher.tsx` -- EN/AR toggle for footer (shared with Navbar)
- `SocialIcons.tsx` -- Branded social media icons (LinkedIn, X/Twitter) with hover states

### Content Requirements
- **Logo:** SIA logo image (`/images/sia-logo.png`)
- **Tagline:** "Potential Unlocked"
- **Link categories:** Services (4 links), Sectors (4 links), Company (4 links), Legal (3 links)
- **Office locations:** Riyadh (Kingdom Centre District), Kuala Lumpur (KLCC District)
- **Social links:** LinkedIn URL, X/Twitter URL
- **Copyright:** "(c) 2026 SIA -- Strategic Integration Agency"
- **Data sources:** Static

### Priority
- **Medium** -- Functional but will need updates as pages are added
- **Dependencies:** SIA logo asset, social media URLs, legal page content

---

## Summary: Component Reuse Matrix

| SIA Section | Existing Components | New Components Needed | Status |
|---|---|---|---|
| Hero | HeroSection, Globe, FlipWords, AuroraBackground | HeroParticles (optional) | Done |
| Trust Bar | TrustBar, Marquee | -- (needs logo images) | Done |
| Stats | StatsSection, AnimatedCounter | DonutChart (optional) | Done |
| About / Who We Are | WorldMapSection, WorldMap | TeamGrid, MissionVision | Partial |
| How It Works | HowItWorksSection | HubSpokeDiagram, PlatformFeatures | Partial |
| Sectors | SectorsSection, ThreeDCard | SectorDetailCard, SectorHeatmap | Partial |
| Investment Bridge | WorldMapSection, WorldMap | InvestmentBridge, CorridorStats | Planned |
| Value Props | ValuePropsSection, SpotlightCard, ThreeDCard, TextReveal | ComparisonTable | Done |
| Testimonials | TestimonialsSection, Marquee | TestimonialWithPhoto, CaseStudyCard | Done (placeholder) |
| CTA | CTASection, Lamp, BorderBeam | BookingWidget, FloatingCTA | Done |
| Contact / Newsletter | Footer (newsletter strip), NewsletterSection | ContactForm, OfficeLocations | Partial |
| Footer | Footer | LanguageSwitcher, SocialIcons | Done |

### New Component Inventory (All sections combined)

| Component | Section | Effort | Priority |
|---|---|---|---|
| HubSpokeDiagram.tsx | How It Works | L | High |
| InvestmentBridge.tsx | Corridor | L | Medium |
| ContactForm.tsx | Contact | M | High |
| ComparisonTable.tsx | Value Props | S | Medium |
| TeamGrid.tsx | About | M | High |
| BookingWidget.tsx | CTA | S | High |
| DonutChart.tsx | Stats | M | Low |
| SectorDetailCard.tsx | Sectors | S | Medium |
| CorridorStats.tsx | Corridor | M | Medium |
| MissionVision.tsx | About | S | Medium |
| DualJurisdictionMap.tsx | Corridor | L | Low |
| SectorHeatmap.tsx | Sectors | L | Low |
| TestimonialWithPhoto.tsx | Testimonials | S | Low |
| CaseStudyCard.tsx | Testimonials | M | Low |
| LanguageSwitcher.tsx | Footer/Navbar | S | High |
| FloatingCTA.tsx | CTA | S | Low |
| OfficeLocations.tsx | Contact | S | Medium |
| HeroParticles.tsx | Hero | M | Low |
| PlatformFeatures.tsx | How It Works | M | Medium |
| DealFlowSankey.tsx | How It Works | L | Low |
| NewsletterStandalone.tsx | Newsletter | S | Low |
| SocialIcons.tsx | Footer | S | Low |
| TimelineHistory.tsx | About | M | Low |

**Effort key:** S = 1-2 hours, M = 3-6 hours, L = 8-16 hours
