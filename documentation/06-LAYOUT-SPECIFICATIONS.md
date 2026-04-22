# 06 - Layout Technical Specifications

Implementation-ready CSS Grid, Flexbox, Tailwind recipes, React component patterns, and responsive specifications for all layout patterns documented in `05-LAYOUT-PATTERNS.md`.

---

## Table of Contents

1. [Global Layout System](#1-global-layout-system)
2. [Section Divider / Cinematic Hero](#2-section-divider--cinematic-hero)
3. [Industries/Sectors Grid](#3-industriessectors-grid)
4. [Team Member Grid](#4-team-member-grid)
5. [Partners Logo Grid](#5-partners-logo-grid)
6. [Quote / Statement Layout](#6-quote--statement-layout)
7. [Mission/Vision/Values Two-Column](#7-missionvisionvalues-two-column)
8. [Impact Statement Interstitial](#8-impact-statement-interstitial)
9. [World Map Section](#9-world-map-section)
10. [Contact / Footer Section](#10-contact--footer-section)
11. [Overlay & Gradient System](#11-overlay--gradient-system)
12. [Z-Index Layering System](#12-z-index-layering-system)
13. [Responsive Breakpoint Reference](#13-responsive-breakpoint-reference)

---

## 1. Global Layout System

### Base Container Pattern

All SIA sections use this consistent container:

```tsx
// Standard section wrapper used across the codebase
<section className="py-20 bg-background">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {children}
  </div>
</section>
```

**Tailwind class breakdown:**
- `py-20` = `padding-top: 5rem; padding-bottom: 5rem` (80px)
- `max-w-7xl` = `max-width: 80rem` (1280px)
- `mx-auto` = horizontal centering
- `px-4 sm:px-6 lg:px-8` = responsive horizontal padding (16px / 24px / 32px)

### Full-Bleed Section Pattern

For section dividers and cinematic sections that break out of the container:

```tsx
<section className="relative w-full min-h-screen overflow-hidden">
  {/* Background layer */}
  <div className="absolute inset-0 z-0">
    <img src={bgImage} className="w-full h-full object-cover" alt="" />
  </div>
  {/* Overlay layer */}
  <div className="absolute inset-0 z-10 bg-gradient-to-br from-navy/80 to-charcoal/60" />
  {/* Content layer */}
  <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
    {children}
  </div>
</section>
```

### CSS Custom Properties (from index.css)

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 8%;
  --muted: 220 14% 96%;
  --muted-foreground: 0 0% 45%;
  --border: 0 0% 90%;
  --radius: 0.625rem;
  --gold: #C8A951;
  --gold-dark: #A08838;
  --charcoal: #1C1C1E;
  --silver: #C0C0C0;
  --navy: #0A1628;
}
```

---

## 2. Section Divider / Cinematic Hero

### CSS Grid Configuration

```css
.section-divider {
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-columns: 1fr;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.section-divider__content {
  grid-row: 2;
  align-self: end;
  padding: 3rem;
  z-index: 20;
}

.section-divider__watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}
```

### Tailwind Recipe

```tsx
// SectionDivider component
interface SectionDividerProps {
  backgroundImage: string;
  sectionNumber: string;
  title: string;
  subtitle?: string;
  overlayVariant?: 'navy' | 'charcoal' | 'dark';
}

function SectionDivider({
  backgroundImage,
  sectionNumber,
  title,
  subtitle,
  overlayVariant = 'navy',
}: SectionDividerProps) {
  const overlayClasses = {
    navy: 'from-[rgba(10,22,40,0.85)] to-[rgba(10,22,40,0.45)]',
    charcoal: 'from-[rgba(28,28,30,0.80)] to-[rgba(28,28,30,0.50)]',
    dark: 'from-black/80 to-black/40',
  };

  return (
    <section className="relative w-full min-h-screen flex items-end overflow-hidden">
      {/* Background Image */}
      <img
        src={backgroundImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
        loading="lazy"
      />

      {/* Gradient Overlay */}
      <div
        className={cn(
          'absolute inset-0 z-10 bg-gradient-to-br',
          overlayClasses[overlayVariant]
        )}
      />

      {/* Watermark Number */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <span className="font-serif text-[clamp(200px,30vw,400px)] font-bold text-gold/[0.08] select-none">
          {sectionNumber}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20 lg:pb-24 w-full">
        <FadeIn>
          <span className="text-gold text-lg font-medium tracking-wider">
            {sectionNumber}
          </span>
          <h2 className="text-white font-serif text-[clamp(2rem,4vw,3.5rem)] font-semibold mt-2 tracking-[0.05em] uppercase">
            {title}
          </h2>
          {subtitle && (
            <p className="text-white/80 text-[clamp(1rem,2vw,1.25rem)] mt-4 max-w-xl">
              {subtitle}
            </p>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
```

### Image Overlay Gradient CSS

```css
/* Navy overlay - primary for SIA */
.overlay-navy {
  background: linear-gradient(135deg,
    rgba(10, 22, 40, 0.85) 0%,
    rgba(10, 22, 40, 0.45) 100%
  );
}

/* Charcoal overlay */
.overlay-charcoal {
  background: linear-gradient(135deg,
    rgba(28, 28, 30, 0.80) 0%,
    rgba(28, 28, 30, 0.50) 100%
  );
}

/* Gold-tinted overlay (for special emphasis) */
.overlay-gold {
  background: linear-gradient(135deg,
    rgba(10, 22, 40, 0.80) 0%,
    rgba(160, 136, 56, 0.30) 100%
  );
}
```

### Responsive Breakpoints

```css
/* Desktop: full viewport */
.section-divider { min-height: 100vh; }

/* Tablet */
@media (max-width: 1279px) {
  .section-divider { min-height: 80vh; }
  .section-divider__watermark { font-size: clamp(120px, 20vw, 240px); }
}

/* Mobile */
@media (max-width: 767px) {
  .section-divider { min-height: 60vh; }
  .section-divider__watermark { font-size: clamp(80px, 25vw, 160px); }
  .section-divider__content { padding: 1.5rem; }
}
```

---

## 3. Industries/Sectors Grid

### CSS Grid Configuration

```css
.sectors-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem; /* 24px */
}

@media (max-width: 1279px) {
  .sectors-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 767px) {
  .sectors-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 479px) {
  .sectors-grid { grid-template-columns: 1fr; }
}
```

### Tailwind Recipe

```tsx
// SectorsGrid component
const sectors = [
  { name: 'Halal Industry', image: '/sectors/halal.jpg' },
  { name: 'Healthcare & Biotech', image: '/sectors/healthcare.jpg' },
  { name: 'Real Estate & Infrastructure', image: '/sectors/real-estate.jpg' },
  { name: 'Technology & AI', image: '/sectors/technology.jpg' },
  { name: 'Islamic Finance', image: '/sectors/finance.jpg' },
  { name: 'Energy & Renewables', image: '/sectors/energy.jpg' },
  { name: 'Tourism & Hospitality', image: '/sectors/tourism.jpg' },
  { name: 'Logistics & Trade', image: '/sectors/logistics.jpg' },
];

function SectorsGrid() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-serif text-section text-foreground mb-12">
            Our Sectors
          </h2>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sectors.map((sector) => (
            <StaggerItem key={sector.name}>
              <SectorCard name={sector.name} image={sector.image} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
```

### Sector Card Component

```tsx
function SectorCard({ name, image }: { name: string; image: string }) {
  return (
    <div className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer">
      {/* Background Image */}
      <img
        src={image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />

      {/* Bottom Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent transition-all duration-300 group-hover:from-black/75" />

      {/* Hover Gold Border */}
      <div className="absolute inset-0 rounded-xl border border-transparent transition-all duration-300 group-hover:border-gold/40 group-hover:shadow-gold-glow" />

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <h3 className="text-white font-semibold text-lg leading-snug">
          {name}
        </h3>
      </div>
    </div>
  );
}
```

### Card Aspect Ratio CSS

```css
.sector-card {
  aspect-ratio: 4 / 3;
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
}

/* Image zoom on hover */
.sector-card:hover .sector-card__image {
  transform: scale(1.10);
}

/* Gradient overlay */
.sector-card__overlay {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.65) 0%,
    rgba(0, 0, 0, 0.20) 40%,
    transparent 100%
  );
}

.sector-card:hover .sector-card__overlay {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0.30) 40%,
    transparent 100%
  );
}
```

---

## 4. Team Member Grid

### CSS Grid Configuration

```css
.team-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem 2rem; /* 32px horizontal, 32px vertical */
}

@media (max-width: 1023px) {
  .team-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 767px) {
  .team-grid { grid-template-columns: repeat(2, 1fr); }
}
```

### Tailwind Recipe

```tsx
function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <section className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-serif text-section text-white text-center mb-4">
            Our Team
          </h2>
          <p className="text-white/60 text-center max-w-2xl mx-auto mb-16">
            A diverse team of experts bridging the KSA-Malaysia corridor
          </p>
        </FadeIn>

        <StaggerContainer
          staggerDelay={0.08}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {members.map((member) => (
            <StaggerItem key={member.name}>
              <TeamMemberCard member={member} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
```

### Team Member Card Component

```tsx
interface TeamMember {
  name: string;
  role: string;
  department?: string;
  photo?: string;
  linkedin?: string;
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="group flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300 hover:bg-white/[0.05] hover:-translate-y-2">
      {/* Photo Circle */}
      <div className="relative mb-4">
        <div className="w-[120px] h-[120px] lg:w-[120px] lg:h-[120px] md:w-[110px] md:h-[110px] rounded-full overflow-hidden border-2 border-gold/30 transition-all duration-300 group-hover:border-gold group-hover:shadow-gold-glow">
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gold/40 to-gold-dark/40 flex items-center justify-center">
              <span className="text-white text-2xl font-serif font-bold">
                {member.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Name */}
      <h3 className="text-white font-semibold text-base mb-1">
        {member.name}
      </h3>

      {/* Role */}
      <p className="text-white/60 text-sm">
        {member.role}
      </p>

      {/* Department Tag (optional) */}
      {member.department && (
        <span className="mt-2 text-xs text-gold font-medium">
          {member.department}
        </span>
      )}

      {/* LinkedIn on hover */}
      {member.linkedin && (
        <a
          href={member.linkedin}
          className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white/40 hover:text-gold"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} LinkedIn`}
        >
          <LinkedInIcon className="w-4 h-4" />
        </a>
      )}
    </div>
  );
}
```

### Leadership Tier Variant (Larger Cards)

```tsx
// For C-suite / founders - 3-column, larger photos
<StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
  {leaders.map((leader) => (
    <StaggerItem key={leader.name}>
      <div className="flex flex-col items-center text-center">
        <div className="w-[160px] h-[160px] rounded-full overflow-hidden border-3 border-gold/40 mb-6 shadow-gold-glow">
          <img src={leader.photo} alt={leader.name} className="w-full h-full object-cover" />
        </div>
        <h3 className="text-white font-serif text-xl font-semibold mb-1">{leader.name}</h3>
        <p className="text-gold text-sm font-medium mb-2">{leader.role}</p>
        <p className="text-white/50 text-sm max-w-xs">{leader.bio}</p>
      </div>
    </StaggerItem>
  ))}
</StaggerContainer>
```

---

## 5. Partners Logo Grid

### CSS Grid Configuration

```css
.partners-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem 3rem; /* 48px */
  align-items: center;
  justify-items: center;
}

@media (max-width: 1023px) {
  .partners-grid { grid-template-columns: repeat(3, 1fr); gap: 2rem; }
}

@media (max-width: 767px) {
  .partners-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
}
```

### Tailwind Recipe

```tsx
function PartnersGrid({ partners }: { partners: Partner[] }) {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-serif text-section text-foreground text-center mb-4">
            Strategic Partners
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-14">
            Trusted by leading institutions across the KSA-Malaysia corridor
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12 items-center justify-items-center">
          {partners.map((partner) => (
            <StaggerItem key={partner.name}>
              <div className="h-20 flex items-center justify-center px-4 transition-all duration-300 grayscale opacity-60 hover:grayscale-0 hover:opacity-100">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-12 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
```

### Grayscale-to-Color Filter CSS

```css
.partner-logo {
  filter: grayscale(100%);
  opacity: 0.6;
  transition: all 300ms ease;
  max-height: 48px;
  width: auto;
}

.partner-logo:hover {
  filter: grayscale(0%);
  opacity: 1;
}
```

**Tailwind equivalent:**
```
grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300
```

### Hybrid Grid + Marquee Pattern

For responsive behavior (grid on desktop, marquee on mobile):

```tsx
function PartnersSection({ partners }: { partners: Partner[] }) {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-serif text-section text-foreground text-center mb-14">
            Strategic Partners
          </h2>
        </FadeIn>

        {/* Desktop: Static Grid */}
        <div className="hidden md:block">
          <PartnersGrid partners={partners} />
        </div>

        {/* Mobile: Marquee Scroll */}
        <div className="md:hidden">
          <Marquee speed="slow" pauseOnHover>
            <div className="flex items-center gap-12 px-6">
              {partners.map((partner) => (
                <img
                  key={partner.name}
                  src={partner.logo}
                  alt={partner.name}
                  className="h-10 w-auto object-contain opacity-70"
                />
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </section>
  );
}
```

---

## 6. Quote / Statement Layout

### CSS Grid Configuration

```css
.quote-section {
  display: flex;
  align-items: center;
  min-height: 80vh;
  position: relative;
  overflow: hidden;
}

.quote-section__content {
  max-width: 680px;
  padding-left: 5rem;
}

@media (max-width: 767px) {
  .quote-section {
    min-height: 70vh;
    text-align: center;
  }
  .quote-section__content {
    max-width: 100%;
    padding: 1.5rem;
  }
}
```

### Tailwind Recipe

```tsx
function QuoteHero({
  backgroundImage,
  quote,
  attribution,
}: {
  backgroundImage: string;
  quote: string;
  attribution?: string;
}) {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <img
        src={backgroundImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
        loading="lazy"
      />

      {/* Navy/Charcoal Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-[rgba(10,22,40,0.85)] to-[rgba(28,28,30,0.60)]" />

      {/* Logo - top-left */}
      <div className="absolute top-8 left-8 z-20">
        <SIALogo className="h-10 w-auto" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <FadeIn>
          <div className="max-w-2xl">
            {/* Decorative Quote Mark */}
            <span className="block font-serif text-[8rem] leading-none text-gold/25 -mb-16 select-none">
              {'\u201C'}
            </span>

            {/* Quote Text */}
            <p className="text-white/90 text-[clamp(1rem,1.5vw,1.25rem)] leading-[1.8] font-light">
              {quote}
            </p>

            {/* Optional Gold Accent Line */}
            <div className="w-20 h-0.5 bg-gold mt-8" />

            {/* Attribution */}
            {attribution && (
              <p className="text-gold text-sm font-medium uppercase tracking-widest mt-4">
                {attribution}
              </p>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
```

### Decorative Quote Mark CSS

```css
.decorative-quote {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 8rem;
  font-weight: 700;
  line-height: 1;
  color: rgba(200, 169, 81, 0.25); /* gold at 25% opacity */
  margin-bottom: -4rem; /* overlap with text below */
  user-select: none;
  pointer-events: none;
}

@media (max-width: 1023px) {
  .decorative-quote { font-size: 6rem; margin-bottom: -3rem; }
}

@media (max-width: 767px) {
  .decorative-quote { font-size: 4rem; margin-bottom: -2rem; }
}
```

---

## 7. Mission/Vision/Values Two-Column

### CSS Grid Configuration

```css
.mvv-layout {
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 4rem;
  align-items: start;
}

@media (max-width: 1023px) {
  .mvv-layout {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}
```

### Tailwind Recipe

```tsx
function MissionVisionValues() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16 items-start">
          {/* Left Column: Tagline */}
          <FadeIn direction="right">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-medium text-foreground leading-[1.4]">
              The premier platform for facilitating cross-border trade and investment between Saudi Arabia and Malaysia.
            </h2>
          </FadeIn>

          {/* Right Column: MVV Boxes */}
          <div>
            <FadeIn>
              <h3 className="font-serif text-section text-foreground mb-8">
                About Us
              </h3>
            </FadeIn>

            <StaggerContainer staggerDelay={0.15} className="space-y-6">
              {[
                {
                  title: 'Our Mission',
                  body: 'To bridge the KSA-Malaysia economic corridor through strategic deal facilitation, creating value for businesses and governments across both nations.',
                },
                {
                  title: 'Our Vision',
                  body: 'To be the premier platform for cross-border deal origination and facilitation between two of the world\'s most dynamic emerging markets.',
                },
                {
                  title: 'Our Values',
                  body: 'Integrity, strategic alignment, cultural understanding, institutional excellence, and sustainable partnership building.',
                },
              ].map((item) => (
                <StaggerItem key={item.title}>
                  <div className="border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-card hover:border-gold/30 group">
                    <div className="flex items-start gap-4">
                      <div className="w-1 h-full min-h-[60px] bg-gold/40 rounded-full group-hover:bg-gold transition-colors duration-300" />
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-2">
                          {item.title}
                        </h4>
                        <p className="text-muted-foreground text-[0.9375rem] leading-[1.7]">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Gold Left-Border Accent CSS

```css
.mvv-box {
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  padding: 1.5rem;
  transition: all 300ms ease;
}

.mvv-box:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border-color: rgba(200, 169, 81, 0.30);
}

.mvv-box__accent {
  width: 3px;
  min-height: 60px;
  background: rgba(200, 169, 81, 0.40);
  border-radius: 9999px;
  transition: background 300ms ease;
}

.mvv-box:hover .mvv-box__accent {
  background: #C8A951;
}
```

---

## 8. Impact Statement Interstitial

### Tailwind Recipe

```tsx
function ImpactStatement({
  statement,
  highlight,
}: {
  statement: string;
  highlight?: string;
}) {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-bold text-foreground leading-[1.1]">
            {statement}
          </h2>
          {highlight && (
            <div className="mt-8 inline-flex items-center gap-3">
              <div className="w-12 h-0.5 bg-gold" />
              <span className="text-gold font-medium text-lg">{highlight}</span>
              <div className="w-12 h-0.5 bg-gold" />
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
```

### Numeric Impact Variant (with CountUp)

```tsx
function ImpactNumbers({
  stats,
}: {
  stats: Array<{ value: number; suffix: string; label: string }>;
}) {
  return (
    <section className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <FadeIn key={stat.label}>
              <div>
                <span className="font-serif text-stat text-gold">
                  <CountUp end={stat.value} duration={2000} />
                  {stat.suffix}
                </span>
                <p className="text-white/60 text-sm mt-2">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 9. World Map Section

### Tailwind Recipe

```tsx
function WorldMapSection({
  locations,
}: {
  locations: Array<{ country: string; city: string; coords: [number, number]; primary?: boolean }>;
}) {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-serif text-section text-foreground mb-12">
            Global Presence
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-start">
          {/* Map Container */}
          <FadeIn>
            <div className="relative aspect-[2/1] bg-muted rounded-2xl overflow-hidden">
              {/* SVG World Map or react-simple-maps */}
              <WorldMapSVG
                highlightedCountries={locations.map(l => l.country)}
                primaryCountries={locations.filter(l => l.primary).map(l => l.country)}
              />

              {/* Pulsing Markers */}
              {locations.map((loc) => (
                <div
                  key={loc.country}
                  className="absolute"
                  style={{
                    left: `${loc.coords[0]}%`,
                    top: `${loc.coords[1]}%`,
                  }}
                >
                  <div className="relative">
                    <div className="w-3 h-3 bg-gold rounded-full" />
                    <div className="absolute inset-0 w-3 h-3 bg-gold/20 rounded-full animate-ping" />
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Location List */}
          <FadeIn delay={0.2}>
            <div className="space-y-4">
              {locations.map((loc) => (
                <div
                  key={loc.country}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className={cn(
                    'w-2 h-2 rounded-full',
                    loc.primary ? 'bg-gold' : 'bg-muted-foreground'
                  )} />
                  <div>
                    <p className="font-medium text-foreground">{loc.country}</p>
                    <p className="text-sm text-muted-foreground">{loc.city}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
```

### Map Color Configuration

```css
/* SVG map styling */
.world-map path {
  fill: rgba(10, 22, 40, 0.08);  /* navy at low opacity for land */
  stroke: rgba(10, 22, 40, 0.15);
  stroke-width: 0.5;
  transition: fill 300ms ease;
}

.world-map path.highlighted {
  fill: rgba(200, 169, 81, 0.25);  /* gold highlight for active countries */
}

.world-map path.primary {
  fill: rgba(200, 169, 81, 0.40);  /* stronger gold for KSA and Malaysia */
}

/* Pulsing marker */
@keyframes map-marker-pulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(2.5); opacity: 0; }
}

.map-marker-pulse {
  animation: map-marker-pulse 2s ease-out infinite;
}
```

### Connection Arc CSS (KSA to Malaysia)

```css
.connection-arc {
  stroke: rgba(200, 169, 81, 0.40);
  stroke-width: 1.5;
  stroke-dasharray: 8 4;
  fill: none;
  stroke-dashoffset: 0;
  animation: arc-draw 3s ease-in-out forwards;
}

@keyframes arc-draw {
  from { stroke-dashoffset: 1000; }
  to { stroke-dashoffset: 0; }
}
```

---

## 10. Contact / Footer Section

### Tailwind Recipe

```tsx
function ContactSection() {
  return (
    <section className="relative py-20 lg:py-32 bg-background overflow-hidden">
      {/* Watermark Number */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-serif text-[clamp(200px,30vw,400px)] font-bold text-foreground/[0.04]">
          6
        </span>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="font-serif text-[clamp(3rem,6vw,5rem)] font-bold text-foreground mb-12">
            Let's Connect
          </h2>
        </FadeIn>

        <StaggerContainer staggerDelay={0.15} className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
          {/* Email */}
          <StaggerItem>
            <a
              href="mailto:info@sia-platform.com"
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <MailIcon className="w-5 h-5 text-gold" />
              </div>
              <div className="text-left">
                <span className="block text-xs text-muted-foreground uppercase tracking-widest font-medium">
                  E-mail
                </span>
                <span className="text-foreground group-hover:text-gold transition-colors">
                  info@sia-platform.com
                </span>
              </div>
            </a>
          </StaggerItem>

          {/* Website */}
          <StaggerItem>
            <a
              href="https://sia-platform.com"
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <GlobeIcon className="w-5 h-5 text-gold" />
              </div>
              <div className="text-left">
                <span className="block text-xs text-muted-foreground uppercase tracking-widest font-medium">
                  Website
                </span>
                <span className="text-foreground group-hover:text-gold transition-colors">
                  sia-platform.com
                </span>
              </div>
            </a>
          </StaggerItem>
        </StaggerContainer>

        {/* CTA Button */}
        <FadeIn delay={0.4}>
          <Button className="bg-gold text-charcoal hover:bg-gold-dark rounded-full px-8 py-3 font-medium transition-all hover:shadow-gold-glow">
            Start a Conversation
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
```

---

## 11. Overlay & Gradient System

### Complete Gradient Library for SIA

```css
/* === SECTION DIVIDER OVERLAYS === */

/* Primary: Navy gradient (default for most sections) */
.gradient-overlay-navy {
  background: linear-gradient(135deg,
    rgba(10, 22, 40, 0.85) 0%,
    rgba(10, 22, 40, 0.45) 100%
  );
}

/* Charcoal gradient (for alternate sections) */
.gradient-overlay-charcoal {
  background: linear-gradient(135deg,
    rgba(28, 28, 30, 0.80) 0%,
    rgba(28, 28, 30, 0.50) 100%
  );
}

/* Gold-tinted (for special/accent sections) */
.gradient-overlay-gold-tint {
  background: linear-gradient(135deg,
    rgba(10, 22, 40, 0.80) 0%,
    rgba(160, 136, 56, 0.30) 100%
  );
}

/* === CARD OVERLAYS === */

/* Bottom gradient for image cards (sectors, projects) */
.gradient-card-bottom {
  background: linear-gradient(to top,
    rgba(0, 0, 0, 0.65) 0%,
    rgba(0, 0, 0, 0.20) 40%,
    transparent 100%
  );
}

.gradient-card-bottom-hover {
  background: linear-gradient(to top,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0.30) 40%,
    transparent 100%
  );
}

/* === DECORATIVE GRADIENTS === */

/* Gold shimmer background */
.gradient-gold-shimmer {
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(200, 169, 81, 0.10) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer 8s ease-in-out infinite;
}

/* Radial glow for focus points */
.gradient-radial-gold {
  background: radial-gradient(
    ellipse at center,
    rgba(200, 169, 81, 0.08) 0%,
    transparent 70%
  );
}
```

### Tailwind Overlay Utility Classes

```
/* Inline Tailwind for common overlays */

Navy overlay:       bg-gradient-to-br from-[rgba(10,22,40,0.85)] to-[rgba(10,22,40,0.45)]
Charcoal overlay:   bg-gradient-to-br from-[rgba(28,28,30,0.80)] to-[rgba(28,28,30,0.50)]
Card bottom:        bg-gradient-to-t from-black/65 via-black/20 to-transparent
Gold accent glow:   shadow-gold-glow (custom: 0 0 40px rgba(200, 169, 81, 0.15))
Gold accent glow lg: shadow-gold-glow-lg (custom: 0 0 80px rgba(200, 169, 81, 0.2))
```

---

## 12. Z-Index Layering System

### Layer Map

```
z-0   : Background images, decorative backgrounds
z-10  : Gradient overlays, watermark numbers, decorative elements
z-20  : Primary content (text, cards, grids)
z-30  : Interactive overlays (tooltips, dropdowns within sections)
z-40  : Sticky headers, floating CTAs
z-50  : Navigation bar, mobile menu overlays
z-[60]: Modal backdrops
z-[70]: Modals, dialogs
z-[80]: Toast notifications
z-[90]: Development tools, debug overlays
```

### Implementation Pattern

```tsx
// Standard layered section template
<section className="relative overflow-hidden">
  {/* Layer 0: Background */}
  <div className="absolute inset-0 z-0">
    <img src={bg} className="w-full h-full object-cover" alt="" />
  </div>

  {/* Layer 10: Overlay + Decorative */}
  <div className="absolute inset-0 z-10 bg-gradient-to-br from-navy/80 to-charcoal/60" />
  <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
    <span className="text-gold/[0.08] text-[300px] font-serif font-bold select-none">1</span>
  </div>

  {/* Layer 20: Content */}
  <div className="relative z-20">
    {/* All interactive content here */}
  </div>
</section>
```

---

## 13. Responsive Breakpoint Reference

### Tailwind Default Breakpoints (used by SIA)

| Breakpoint | Min-Width | Prefix | Usage |
|---|---|---|---|
| Mobile (base) | 0px | (none) | Single column, compact spacing |
| sm | 640px | `sm:` | Small tablets, 2-column grids |
| md | 768px | `md:` | Tablets, show/hide marquee vs grid |
| lg | 1024px | `lg:` | Desktop, multi-column layouts activate |
| xl | 1280px | `xl:` | Large desktop, 4-column grids |
| 2xl | 1536px | `2xl:` | Ultra-wide, max-width container |

### Component Behavior by Breakpoint

| Component | Mobile (<768) | Tablet (768-1023) | Desktop (1024+) |
|---|---|---|---|
| Section Divider | 60vh, small watermark | 80vh, medium watermark | 100vh, full watermark |
| Sectors Grid | 1 col or 2 col | 2-3 columns | 3-4 columns |
| Team Grid | 2 columns, 80px photos | 3 columns, 100px photos | 4 columns, 120px photos |
| Partners Grid | Marquee scroll | 3-column grid | 4-column grid |
| Quote Hero | Centered text, 70vh | Left-aligned, 80vh | Left-aligned, 80vh |
| MVV Layout | Single column stacked | Single column stacked | Two columns side-by-side |
| Impact Statement | Text wraps, 40vh | 50vh | 60vh, large text |
| World Map | Simplified/stacked | Map full-width + list below | Map + sidebar list |
| Contact Section | Stacked vertically | Row layout | Row layout |

### Spacing Scale Reference

```
py-12 = 48px   (compact sections)
py-16 = 64px   (standard mobile sections)
py-20 = 80px   (standard desktop sections, used throughout SIA codebase)
py-24 = 96px   (generous spacing)
py-32 = 128px  (hero/impact sections)

gap-4  = 16px  (tight grid)
gap-6  = 24px  (standard grid - sectors, cards)
gap-8  = 32px  (comfortable grid - team, partners)
gap-12 = 48px  (wide grid - partners desktop)
gap-16 = 64px  (column gap for two-column layouts)
```

### Container Max-Width Reference

```
max-w-3xl  = 48rem  (768px)  - Contact section content
max-w-5xl  = 64rem  (1024px) - Partners grid, narrow content
max-w-7xl  = 80rem  (1280px) - Standard section container (used throughout SIA)
w-full     = 100%             - Full-bleed sections (dividers, heroes)
```

---

## Component Composition Summary

### New Components to Build

| Component | Pattern | Reuses |
|---|---|---|
| `SectionDivider` | Full-bleed bg + overlay + watermark + content | `FadeIn` |
| `SectorCard` | Image card with overlay + text | `Card` base styling |
| `SectorsGrid` | Grid of SectorCards | `StaggerContainer`, `StaggerItem` |
| `TeamMemberCard` | Circular photo + name + role | `Avatar` |
| `TeamGrid` | Grid of TeamMemberCards | `StaggerContainer`, `StaggerItem` |
| `PartnersGrid` | Logo grid with grayscale filter | `StaggerContainer`, extends `PartnerLogos` |
| `QuoteHero` | Full-bleed bg + quote + attribution | `FadeIn` |
| `MissionVisionValues` | Two-column with stacked boxes | `Card`, `FadeIn`, `StaggerContainer` |
| `ImpactStatement` | Centered bold text interstitial | `FadeIn`, `CountUp` |
| `WorldMap` | SVG map + markers + location list | `FadeIn` |
| `ContactSection` | CTA + contact info + watermark | `FadeIn`, `Button`, `StaggerContainer` |

### Slot/Children Pattern for Flexibility

All layout components should accept children or slot props for maximum flexibility:

```tsx
// Generic overlay section with slots
interface OverlaySectionProps {
  backgroundImage: string;
  overlayVariant?: 'navy' | 'charcoal' | 'dark';
  watermark?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  minHeight?: string;
}

function OverlaySection({
  backgroundImage,
  overlayVariant = 'navy',
  watermark,
  children,
  className,
  minHeight = 'min-h-screen',
}: OverlaySectionProps) {
  const overlays = {
    navy: 'from-[rgba(10,22,40,0.85)] to-[rgba(10,22,40,0.45)]',
    charcoal: 'from-[rgba(28,28,30,0.80)] to-[rgba(28,28,30,0.50)]',
    dark: 'from-black/80 to-black/40',
  };

  return (
    <section className={cn('relative overflow-hidden', minHeight, className)}>
      <img src={backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover z-0" loading="lazy" />
      <div className={cn('absolute inset-0 z-10 bg-gradient-to-br', overlays[overlayVariant])} />
      {watermark && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none">
          {watermark}
        </div>
      )}
      <div className="relative z-20 h-full">
        {children}
      </div>
    </section>
  );
}
```

This base component can then be composed into `SectionDivider`, `QuoteHero`, and other overlay-based layouts without duplicating the background/overlay/z-index logic.
