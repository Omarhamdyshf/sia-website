# SIA Website Redesign & Investor Portal — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the SIA website from a flashy gold/navy luxury aesthetic to a serious, corporate glassmorphism design matching the SAE financial model project, add dark/light mode, and build an auth-gated investor portal with financial dashboards.

**Architecture:** The app transitions from a single-page anchor-nav site to a React Router SPA with public pages and protected `/investor/*` routes. A Zustand theme store manages dark/light mode. All styling moves to CSS custom properties with glassmorphism card patterns. The investor portal has a sidebar layout with dashboard, charts, financial statements, and analysis pages.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 3, Zustand (new), React Router DOM (new), Recharts (existing), Framer Motion (toned down), Radix UI (existing)

**Spec:** `docs/superpowers/specs/2026-04-22-sia-redesign-investor-portal-design.md`

---

## File Structure

### New Files
```
src/
├── stores/
│   └── themeStore.ts                    # Zustand dark/light mode state
├── router.tsx                           # React Router configuration
├── layouts/
│   ├── PublicLayout.tsx                  # Navbar + footer wrapper for public pages
│   └── InvestorLayout.tsx               # Sidebar + topbar wrapper for investor pages
├── pages/
│   ├── HomePage.tsx                      # Public landing (all current sections)
│   └── investor/
│       ├── LoginPage.tsx                 # Google OAuth login
│       ├── DashboardPage.tsx             # KPI cards + charts overview
│       ├── ChartsPage.tsx                # Detailed chart views
│       ├── SalesForecastPage.tsx         # Monthly category revenue
│       ├── RevenueBreakdownPage.tsx      # Deal commissions, subscriptions
│       ├── CohortAnalysisPage.tsx        # Cohort data table
│       ├── SalariesPage.tsx             # Team headcount, compensation
│       ├── OpexPage.tsx                  # Operating expenses
│       ├── CapexPage.tsx                 # Capital expenditure
│       ├── IncomeStatementPage.tsx       # Income statement table
│       ├── BalanceSheetPage.tsx          # Balance sheet table
│       ├── CashFlowPage.tsx             # Cash flow statement table
│       ├── BreakevenPage.tsx            # Breakeven analysis
│       └── KpiRatiosPage.tsx            # KPI & ratios dashboard
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.tsx           # Auth + role gate wrapper
│   ├── investor/
│   │   ├── InvestorSidebar.tsx          # Collapsible sidebar navigation
│   │   ├── InvestorTopbar.tsx           # Breadcrumbs, avatar, theme toggle
│   │   ├── KpiCard.tsx                  # Glassmorphism KPI metric card
│   │   ├── DataTable.tsx               # Reusable financial data table
│   │   ├── ChartCard.tsx               # Glassmorphism chart wrapper
│   │   └── GoldSkeleton.tsx            # Gold-pulsing loading skeleton
│   └── ui/
│       └── ThemeToggle.tsx              # Dark/light mode toggle button
```

### Modified Files
```
src/index.css                            # Full CSS variable rewrite, dark mode, glassmorphism
app/tailwind.config.js                   # Updated tokens, remove old animations
src/main.tsx                             # Add Router + theme providers
src/App.tsx                              # Replace inline sections with Router outlet
src/components/navigation/Navbar.tsx     # Simplify, add theme toggle, investor login btn
src/sections/HeroSection.tsx             # Retheme to clean corporate
src/sections/GlobeSection.tsx            # Simplify framing
src/sections/TrustBar.tsx                # Static grid, remove marquee
src/sections/ValuePropsSection.tsx       # Glassmorphism cards, remove 3D
src/sections/StatsSection.tsx            # Glassmorphism KPI cards
src/sections/HowItWorksSection.tsx       # Clean timeline
src/sections/SectorsSection.tsx          # Glassmorphism cards
src/sections/TestimonialsSection.tsx     # Static cards, remove marquee
src/sections/CTASection.tsx              # Clean centered, remove lamp
src/sections/Footer.tsx                  # 3-column, cleaner
src/i18n/en.json                         # Add investor portal strings
src/i18n/ar.json                         # Add investor portal strings (Arabic)
app/package.json                         # Add zustand, react-router-dom
```

### Files to Delete
```
src/components/effects/FlipWords.tsx
src/components/effects/ThreeDCard.tsx
src/components/effects/SpotlightCard.tsx
src/components/effects/Lamp.tsx
src/components/effects/BorderBeam.tsx
src/components/effects/AuroraBackground.tsx
```

---

## Task 1: Install New Dependencies

**Files:**
- Modify: `app/package.json`

- [ ] **Step 1: Install zustand and react-router-dom**

```bash
cd /Users/omarhamdy/Developer/sia-website/app && npm install zustand react-router-dom
```

- [ ] **Step 2: Verify installation**

```bash
cd /Users/omarhamdy/Developer/sia-website/app && node -e "require('zustand'); require('react-router-dom'); console.log('OK')"
```

Expected: `OK`

- [ ] **Step 3: Commit**

```bash
cd /Users/omarhamdy/Developer/sia-website/app && git add package.json package-lock.json && git commit -m "chore: add zustand and react-router-dom dependencies"
```

---

## Task 2: Rewrite Design System — CSS Variables & Dark/Light Mode

**Files:**
- Modify: `app/src/index.css`
- Modify: `app/tailwind.config.js`

- [ ] **Step 1: Rewrite `index.css` with new CSS variables and dark mode**

Replace the entire contents of `app/src/index.css` with:

```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Layout */
    --bg: #f8f9fb;
    --surface: #ffffff;
    --surface-hover: #f3f4f6;

    /* Text */
    --text: #1a1a1a;
    --text-secondary: #6b7280;
    --text-tertiary: #9ca3af;

    /* Borders */
    --border: #e5e7eb;
    --border-subtle: #f3f4f6;

    /* Brand Accent — Gold */
    --accent: #c8a951;
    --accent-dark: #a08838;
    --accent-light: #e8d48b;
    --accent-glow: rgba(200, 169, 81, 0.15);

    /* Semantic */
    --success: #1D9E75;
    --danger: #E24B4A;
    --info: #378ADD;

    /* Glass */
    --glass-bg: rgba(255, 255, 255, 0.7);
    --glass-border: rgba(0, 0, 0, 0.06);
    --glass-shadow: rgba(0, 0, 0, 0.06);

    /* Sidebar */
    --sidebar-bg: rgba(255, 255, 255, 0.8);
    --sidebar-border: #e5e7eb;

    /* Shadcn compatibility */
    --background: 210 20% 98%;
    --foreground: 0 0% 10%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 10%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 10%;
    --primary: 43 54% 55%;
    --primary-foreground: 0 0% 100%;
    --secondary: 220 14% 96%;
    --secondary-foreground: 0 0% 10%;
    --muted: 220 14% 96%;
    --muted-foreground: 0 0% 45%;
    --accent-hsl: 43 54% 55%;
    --accent-foreground: 0 0% 10%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 98%;
    --border-hsl: 220 13% 91%;
    --input: 220 13% 91%;
    --ring: 43 54% 55%;
    --radius: 0.625rem;
  }

  [data-theme="dark"] {
    /* Layout */
    --bg: #0a0f1a;
    --surface: #111827;
    --surface-hover: #1e293b;

    /* Text */
    --text: #f1f5f9;
    --text-secondary: #94a3b8;
    --text-tertiary: #64748b;

    /* Borders */
    --border: #1e293b;
    --border-subtle: #1a2332;

    /* Brand Accent — Gold (intensified glow in dark) */
    --accent: #c8a951;
    --accent-dark: #a08838;
    --accent-light: #e8d48b;
    --accent-glow: rgba(200, 169, 81, 0.25);

    /* Glass */
    --glass-bg: rgba(17, 24, 39, 0.7);
    --glass-border: rgba(255, 255, 255, 0.06);
    --glass-shadow: rgba(0, 0, 0, 0.3);

    /* Sidebar */
    --sidebar-bg: rgba(17, 24, 39, 0.8);
    --sidebar-border: #1e293b;

    /* Shadcn compatibility */
    --background: 222 47% 7%;
    --foreground: 210 40% 96%;
    --card: 222 47% 9%;
    --card-foreground: 210 40% 96%;
    --popover: 222 47% 9%;
    --popover-foreground: 210 40% 96%;
    --primary: 43 54% 55%;
    --primary-foreground: 222 47% 7%;
    --secondary: 217 33% 12%;
    --secondary-foreground: 210 40% 96%;
    --muted: 217 33% 12%;
    --muted-foreground: 215 20% 55%;
    --accent-hsl: 43 54% 55%;
    --accent-foreground: 210 40% 96%;
    --destructive: 0 63% 31%;
    --destructive-foreground: 0 0% 98%;
    --border-hsl: 217 33% 17%;
    --input: 217 33% 17%;
    --ring: 43 54% 55%;
  }
}

@layer base {
  * {
    @apply border-[var(--border)];
  }
  html {
    scroll-behavior: smooth;
  }
  body {
    background-color: var(--bg);
    color: var(--text);
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    font-feature-settings: "rlig" 1, "calt" 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.2s ease, color 0.2s ease;
  }
  h1, h2, h3 {
    font-family: 'Playfair Display', Georgia, serif;
    letter-spacing: -0.02em;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .font-serif {
    font-family: 'Playfair Display', Georgia, serif;
  }
  .font-sans {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
  }
}

/* ─── Glassmorphism ─── */
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px var(--glass-shadow);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.glass-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px var(--glass-shadow);
}
.glass-card-accent {
  border-top: 3px solid var(--accent);
}

/* ─── Emissive Effects ─── */
@keyframes emissive-pulse {
  0%, 100% { box-shadow: 0 0 20px var(--accent-glow); }
  50% { box-shadow: 0 0 35px var(--accent-glow), 0 0 60px rgba(200, 169, 81, 0.08); }
}
.emissive {
  box-shadow: 0 0 20px var(--accent-glow);
}
.emissive-pulse {
  animation: emissive-pulse 3s ease-in-out infinite;
}
.emissive-focus:focus {
  box-shadow: 0 0 12px var(--accent-glow);
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* ─── Gold Skeleton Loading ─── */
@keyframes gold-skeleton {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton-gold {
  background: linear-gradient(90deg, var(--surface) 25%, var(--accent-glow) 50%, var(--surface) 75%);
  background-size: 200% 100%;
  animation: gold-skeleton 1.5s ease-in-out infinite;
  border-radius: 8px;
}

/* ─── Section Label (SAE pattern) ─── */
.section-label {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-tertiary);
}
.section-label::before {
  content: '';
  width: 3px;
  height: 16px;
  background: var(--accent);
  border-radius: 2px;
}

/* ─── Grid Pattern Overlay ─── */
.grid-pattern {
  background-image:
    linear-gradient(var(--border-subtle) 1px, transparent 1px),
    linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* ─── Gradient Text ─── */
.text-gradient-gold {
  background: linear-gradient(135deg, #C8A951 0%, #E8D48B 50%, #A08838 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ─── Marquee (kept for TrustBar future use) ─── */
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-100%); }
}
.animate-marquee {
  animation: marquee var(--speed, 40s) linear infinite;
}

/* ─── Fade In on Scroll ─── */
@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(16px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* ─── RTL Support ─── */
[dir="rtl"] {
  font-family: 'IBM Plex Sans Arabic', 'Inter', system-ui, sans-serif;
}
[dir="rtl"] h1, [dir="rtl"] h2, [dir="rtl"] h3 {
  font-family: 'IBM Plex Sans Arabic', 'Playfair Display', Georgia, serif;
}

/* ─── Investor Portal Specific ─── */
.investor-sidebar {
  background: var(--sidebar-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-right: 1px solid var(--sidebar-border);
  transition: width 0.2s ease;
}
[dir="rtl"] .investor-sidebar {
  border-right: none;
  border-left: 1px solid var(--sidebar-border);
}

.sidebar-item-active {
  background: var(--accent-glow);
  color: var(--accent);
  border-inline-start: 3px solid var(--accent);
}
[data-theme="dark"] .sidebar-item-active {
  box-shadow: 0 0 12px var(--accent-glow);
}

/* ─── Financial Tables ─── */
.fin-table {
  width: 100%;
  border-collapse: collapse;
  font-variant-numeric: tabular-nums;
}
.fin-table thead th {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-tertiary);
  text-align: end;
  padding: 8px 12px;
  border-bottom: 2px solid var(--border);
  position: sticky;
  top: 0;
  background: var(--surface);
  z-index: 1;
}
.fin-table thead th:first-child {
  text-align: start;
}
.fin-table tbody td {
  padding: 7px 12px;
  text-align: end;
  font-size: 13px;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-subtle);
}
.fin-table tbody td:first-child {
  text-align: start;
  color: var(--text);
  font-weight: 500;
}
.fin-table tbody tr:hover td {
  background: var(--surface-hover);
}
.fin-table .row-total td {
  font-weight: 700;
  color: var(--text);
  background: var(--surface-hover);
  border-top: 2px solid var(--border);
}

/* ─── Slider Inputs ─── */
.gold-slider::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--accent);
  cursor: pointer;
  box-shadow: 0 0 8px var(--accent-glow);
}
.gold-slider::-webkit-slider-runnable-track {
  height: 4px;
  border-radius: 2px;
  background: linear-gradient(to right, var(--accent) var(--fill, 50%), var(--border) var(--fill, 50%));
}

/* ─── Toggle Switch ─── */
.gold-toggle {
  width: 40px;
  height: 22px;
  border-radius: 11px;
  background: var(--border);
  position: relative;
  cursor: pointer;
  transition: background 0.15s ease;
}
.gold-toggle.active {
  background: var(--accent);
}
.gold-toggle::after {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: white;
  top: 2px;
  left: 2px;
  transition: transform 0.15s ease;
}
.gold-toggle.active::after {
  transform: translateX(18px);
}
```

- [ ] **Step 2: Update `tailwind.config.js`**

Replace the entire contents of `app/tailwind.config.js` with:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border-hsl, var(--border)))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent-hsl, var(--accent)))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Direct color references for non-HSL usage
        gold: {
          DEFAULT: "#c8a951",
          dark: "#a08838",
          light: "#e8d48b",
        },
        success: "#1D9E75",
        danger: "#E24B4A",
        info: "#378ADD",
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        'card': '0 4px 6px -1px var(--glass-shadow)',
        'card-hover': '0 10px 25px -5px var(--glass-shadow)',
        'gold-glow': '0 0 40px var(--accent-glow)',
        'gold-glow-lg': '0 0 80px rgba(200, 169, 81, 0.2)',
        'emissive': '0 0 20px var(--accent-glow)',
        'emissive-lg': '0 0 35px var(--accent-glow), 0 0 60px rgba(200, 169, 81, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        'hero': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'section': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'stat': ['clamp(2rem, 3vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

- [ ] **Step 3: Verify build compiles**

```bash
cd /Users/omarhamdy/Developer/sia-website/app && npx tsc --noEmit 2>&1 | head -20
```

Expected: No errors (or only pre-existing type issues unrelated to CSS)

- [ ] **Step 4: Commit**

```bash
cd /Users/omarhamdy/Developer/sia-website && git add app/src/index.css app/tailwind.config.js && git commit -m "feat: rewrite design system with dark/light mode CSS variables and glassmorphism"
```

---

## Task 3: Create Theme Store (Zustand)

**Files:**
- Create: `app/src/stores/themeStore.ts`
- Create: `app/src/components/ui/ThemeToggle.tsx`

- [ ] **Step 1: Create theme store**

Create `app/src/stores/themeStore.ts`:

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
  // Also set the class for Tailwind darkMode compatibility
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('sia-theme-storage');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return parsed.state?.theme || 'light';
    } catch {
      return 'light';
    }
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Apply initial theme immediately to prevent flash
const initial = getInitialTheme();
applyTheme(initial);

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: initial,
      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },
      toggleTheme: () => {
        set((state) => {
          const next = state.theme === 'light' ? 'dark' : 'light';
          applyTheme(next);
          return { theme: next };
        });
      },
    }),
    {
      name: 'sia-theme-storage',
    }
  )
);
```

- [ ] **Step 2: Create ThemeToggle component**

Create `app/src/components/ui/ThemeToggle.tsx`:

```tsx
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/stores/themeStore";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded-lg transition-colors",
        "text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)]",
        className
      )}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
cd /Users/omarhamdy/Developer/sia-website/app && npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 4: Commit**

```bash
cd /Users/omarhamdy/Developer/sia-website && git add app/src/stores/themeStore.ts app/src/components/ui/ThemeToggle.tsx && git commit -m "feat: add Zustand theme store with dark/light mode toggle"
```

---

## Task 4: Set Up React Router & Layouts

**Files:**
- Create: `app/src/router.tsx`
- Create: `app/src/layouts/PublicLayout.tsx`
- Create: `app/src/layouts/InvestorLayout.tsx`
- Create: `app/src/pages/HomePage.tsx`
- Create: `app/src/pages/investor/LoginPage.tsx`
- Create: `app/src/pages/investor/DashboardPage.tsx`
- Create: `app/src/components/auth/ProtectedRoute.tsx`
- Modify: `app/src/main.tsx`
- Modify: `app/src/App.tsx`

- [ ] **Step 1: Create PublicLayout**

Create `app/src/layouts/PublicLayout.tsx`:

```tsx
import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/sections";

export function PublicLayout() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Create HomePage (migrated from App.tsx)**

Create `app/src/pages/HomePage.tsx`:

```tsx
import {
  HeroSection,
  GlobeSection,
  TrustBar,
  ValuePropsSection,
  StatsSection,
  HowItWorksSection,
  SectorsSection,
  TestimonialsSection,
  CTASection,
} from "@/sections";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <GlobeSection />
      <TrustBar />
      <ValuePropsSection />
      <StatsSection />
      <HowItWorksSection />
      <SectorsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
```

- [ ] **Step 3: Create ProtectedRoute**

Create `app/src/components/auth/ProtectedRoute.tsx`:

```tsx
import { Navigate, Outlet } from "react-router-dom";

// Temporary mock auth — will be replaced with real Google OAuth integration
// For now, check localStorage for a mock investor session
function useAuth() {
  const stored = localStorage.getItem("sia-investor-session");
  if (!stored) return { isAuthenticated: false, role: null };
  try {
    const session = JSON.parse(stored);
    return { isAuthenticated: true, role: session.role as string };
  } catch {
    return { isAuthenticated: false, role: null };
  }
}

export function ProtectedRoute({ requiredRole }: { requiredRole: string }) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/investor/login" replace />;
  }

  if (role !== requiredRole) {
    return <Navigate to="/investor/login" replace />;
  }

  return <Outlet />;
}
```

- [ ] **Step 4: Create placeholder InvestorLayout**

Create `app/src/layouts/InvestorLayout.tsx`:

```tsx
import { Outlet } from "react-router-dom";
import { InvestorSidebar } from "@/components/investor/InvestorSidebar";
import { InvestorTopbar } from "@/components/investor/InvestorTopbar";
import { useState } from "react";

export function InvestorLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "var(--bg)" }}>
      <InvestorSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div
        className="flex-1 flex flex-col transition-[margin] duration-200"
        style={{ marginInlineStart: sidebarCollapsed ? 56 : 240 }}
      >
        <InvestorTopbar />
        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create placeholder InvestorSidebar**

Create `app/src/components/investor/InvestorSidebar.tsx`:

```tsx
import { useTranslation } from "react-i18next";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, BarChart3, TrendingUp, DollarSign, Users2,
  Receipt, Building2, FileText, Scale, PieChart, ChevronLeft,
  ChevronRight, Layers, CreditCard, Activity,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navGroups = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/investor/dashboard" },
      { label: "Charts", icon: BarChart3, href: "/investor/charts" },
    ],
  },
  {
    label: "Revenue",
    items: [
      { label: "Sales Forecast", icon: TrendingUp, href: "/investor/sales-forecast" },
      { label: "Revenue Breakdown", icon: DollarSign, href: "/investor/revenue" },
      { label: "Cohort Analysis", icon: Layers, href: "/investor/cohorts" },
    ],
  },
  {
    label: "Costs",
    items: [
      { label: "Salaries & Team", icon: Users2, href: "/investor/salaries" },
      { label: "Operating Expenses", icon: Receipt, href: "/investor/opex" },
      { label: "Capital Expenditure", icon: Building2, href: "/investor/capex" },
    ],
  },
  {
    label: "Statements",
    items: [
      { label: "Income Statement", icon: FileText, href: "/investor/income-statement" },
      { label: "Balance Sheet", icon: Scale, href: "/investor/balance-sheet" },
      { label: "Cash Flow", icon: CreditCard, href: "/investor/cash-flow" },
    ],
  },
  {
    label: "Analysis",
    items: [
      { label: "Breakeven", icon: PieChart, href: "/investor/breakeven" },
      { label: "KPI & Ratios", icon: Activity, href: "/investor/kpi-ratios" },
    ],
  },
];

export function InvestorSidebar({ collapsed, onToggle }: SidebarProps) {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <aside
      className={cn(
        "investor-sidebar fixed top-0 bottom-0 z-40 flex flex-col overflow-y-auto overflow-x-hidden",
        collapsed ? "w-[56px]" : "w-[240px]"
      )}
    >
      {/* Logo area */}
      <div className="flex items-center justify-between p-4 h-16">
        {!collapsed && (
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/sia-logo.png" alt="SIA" className="h-8 w-auto" />
          </Link>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-[var(--surface-hover)] text-[var(--text-secondary)]"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-6">
        {navGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <div className="section-label px-3 mb-2">{group.label}</div>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                      active
                        ? "sidebar-item-active font-medium"
                        : "text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)]",
                      collapsed && "justify-center px-0"
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
```

- [ ] **Step 6: Create placeholder InvestorTopbar**

Create `app/src/components/investor/InvestorTopbar.tsx`:

```tsx
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function InvestorTopbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("sia-investor-session");
    navigate("/");
  };

  return (
    <header
      className="h-16 flex items-center justify-between px-6 border-b"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
    >
      <div className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
        Investor Portal
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <button
          className="p-2 rounded-lg transition-colors text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)]"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
        </button>
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg transition-colors text-[var(--text-secondary)] hover:text-danger hover:bg-[var(--surface-hover)]"
          aria-label="Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
```

- [ ] **Step 7: Create LoginPage**

Create `app/src/pages/investor/LoginPage.tsx`:

```tsx
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function LoginPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoogleLogin = () => {
    // TODO: Replace with real Google OAuth — for now, mock a session
    localStorage.setItem(
      "sia-investor-session",
      JSON.stringify({ role: "investor", email: "investor@example.com" })
    );
    navigate("/investor/dashboard");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      <div className="glass-card glass-card-accent w-full max-w-md p-8 text-center">
        <img src="/images/sia-logo.png" alt="SIA" className="h-12 w-auto mx-auto mb-6" />
        <h1
          className="text-2xl font-serif font-bold mb-2"
          style={{ color: "var(--text)" }}
        >
          Investor Portal
        </h1>
        <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
          Sign in to access financial models and analytics
        </p>
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all"
          style={{
            backgroundColor: "var(--accent)",
            color: "#1a1a1a",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 0 16px var(--accent-glow)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign in with Google
        </button>
        <a
          href="/"
          className="inline-block mt-6 text-sm transition-colors"
          style={{ color: "var(--text-tertiary)" }}
        >
          &larr; Back to website
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 8: Create placeholder DashboardPage**

Create `app/src/pages/investor/DashboardPage.tsx`:

```tsx
import { KpiCard } from "@/components/investor/KpiCard";
import { ChartCard } from "@/components/investor/ChartCard";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line,
} from "recharts";

const kpiData = [
  { label: "Y1 Revenue", value: "$2.4M", trend: "+12%", trendUp: true },
  { label: "Net Profit", value: "$890K", trend: "+8%", trendUp: true },
  { label: "Gross Margin", value: "72%", trend: "+3%", trendUp: true },
  { label: "ROI", value: "3.2x", trend: "+0.4x", trendUp: true },
  { label: "Breakeven", value: "Month 6", trend: "On track", trendUp: true },
  { label: "MRR", value: "$198K", trend: "+15%", trendUp: true },
];

const revenueVsCosts = [
  { month: "Jan", revenue: 120, costs: 80 },
  { month: "Feb", revenue: 150, costs: 85 },
  { month: "Mar", revenue: 180, costs: 90 },
  { month: "Apr", revenue: 200, costs: 95 },
  { month: "May", revenue: 240, costs: 100 },
  { month: "Jun", revenue: 280, costs: 110 },
];

const revenueMix = [
  { name: "Commissions", value: 45 },
  { name: "Subscriptions", value: 30 },
  { name: "Add-ons", value: 15 },
  { name: "Advisory", value: 10 },
];
const PIE_COLORS = ["#c8a951", "#378ADD", "#1D9E75", "#a08838"];

const profitTrend = [
  { month: "Jan", profit: 40 },
  { month: "Feb", profit: 65 },
  { month: "Mar", profit: 90 },
  { month: "Apr", profit: 105 },
  { month: "May", profit: 140 },
  { month: "Jun", profit: 170 },
];

export function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Section label */}
      <div className="section-label">Dashboard</div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiData.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Revenue vs Costs">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueVsCosts}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fill: "var(--text-tertiary)", fontSize: 12 }} />
              <YAxis tick={{ fill: "var(--text-tertiary)", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  color: "var(--text)",
                }}
              />
              <Bar dataKey="revenue" fill="#c8a951" radius={[4, 4, 0, 0]} />
              <Bar dataKey="costs" fill="var(--border)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Revenue Mix">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={revenueMix}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                stroke="none"
              >
                {revenueMix.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  color: "var(--text)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Profit Trend">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={profitTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fill: "var(--text-tertiary)", fontSize: 12 }} />
              <YAxis tick={{ fill: "var(--text-tertiary)", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  color: "var(--text)",
                }}
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#c8a951"
                strokeWidth={2}
                dot={{ fill: "#c8a951", r: 4 }}
                activeDot={{ r: 6, fill: "#c8a951", stroke: "var(--surface)", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Cost Breakdown">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={[
                { category: "Salaries", amount: 45 },
                { category: "Marketing", amount: 20 },
                { category: "Infrastructure", amount: 15 },
                { category: "Operations", amount: 12 },
                { category: "Legal", amount: 8 },
              ]}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis type="number" tick={{ fill: "var(--text-tertiary)", fontSize: 12 }} />
              <YAxis dataKey="category" type="category" tick={{ fill: "var(--text-tertiary)", fontSize: 12 }} width={90} />
              <Tooltip
                contentStyle={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  color: "var(--text)",
                }}
              />
              <Bar dataKey="amount" fill="#378ADD" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
```

- [ ] **Step 9: Create KpiCard component**

Create `app/src/components/investor/KpiCard.tsx`:

```tsx
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
}

export function KpiCard({ label, value, trend, trendUp }: KpiCardProps) {
  return (
    <div className="glass-card glass-card-accent p-4">
      <div
        className="text-xs font-semibold uppercase tracking-wider mb-2"
        style={{ color: "var(--text-tertiary)" }}
      >
        {label}
      </div>
      <div
        className="text-2xl font-bold mb-1"
        style={{ color: "var(--text)" }}
      >
        {value}
      </div>
      <div
        className={cn(
          "flex items-center gap-1 text-xs font-medium",
          trendUp ? "text-success" : "text-danger"
        )}
      >
        {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {trend}
      </div>
    </div>
  );
}
```

- [ ] **Step 10: Create ChartCard component**

Create `app/src/components/investor/ChartCard.tsx`:

```tsx
import { type ReactNode } from "react";

interface ChartCardProps {
  title: string;
  children: ReactNode;
}

export function ChartCard({ title, children }: ChartCardProps) {
  return (
    <div className="glass-card p-6">
      <div className="section-label mb-4">{title}</div>
      {children}
    </div>
  );
}
```

- [ ] **Step 11: Create GoldSkeleton component**

Create `app/src/components/investor/GoldSkeleton.tsx`:

```tsx
import { cn } from "@/lib/utils";

interface GoldSkeletonProps {
  className?: string;
  lines?: number;
}

export function GoldSkeleton({ className, lines = 3 }: GoldSkeletonProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton-gold h-4"
          style={{ width: `${100 - i * 15}%` }}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 12: Create DataTable component**

Create `app/src/components/investor/DataTable.tsx`:

```tsx
interface Column {
  key: string;
  label: string;
}

interface DataTableProps {
  columns: Column[];
  rows: Record<string, string | number>[];
  totalRow?: Record<string, string | number>;
}

export function DataTable({ columns, rows, totalRow }: DataTableProps) {
  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="fin-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={col.key}>{row[col.key]}</td>
                ))}
              </tr>
            ))}
            {totalRow && (
              <tr className="row-total">
                {columns.map((col) => (
                  <td key={col.key}>{totalRow[col.key]}</td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

- [ ] **Step 13: Create router configuration**

Create `app/src/router.tsx`:

```tsx
import { createBrowserRouter } from "react-router-dom";
import { PublicLayout } from "@/layouts/PublicLayout";
import { InvestorLayout } from "@/layouts/InvestorLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/investor/LoginPage";
import { DashboardPage } from "@/pages/investor/DashboardPage";

// Lazy-loaded investor pages (created as stubs in later tasks)
import { lazy, Suspense } from "react";
import { GoldSkeleton } from "@/components/investor/GoldSkeleton";

const ChartsPage = lazy(() => import("@/pages/investor/ChartsPage").then(m => ({ default: m.ChartsPage })));
const SalesForecastPage = lazy(() => import("@/pages/investor/SalesForecastPage").then(m => ({ default: m.SalesForecastPage })));
const RevenueBreakdownPage = lazy(() => import("@/pages/investor/RevenueBreakdownPage").then(m => ({ default: m.RevenueBreakdownPage })));
const CohortAnalysisPage = lazy(() => import("@/pages/investor/CohortAnalysisPage").then(m => ({ default: m.CohortAnalysisPage })));
const SalariesPage = lazy(() => import("@/pages/investor/SalariesPage").then(m => ({ default: m.SalariesPage })));
const OpexPage = lazy(() => import("@/pages/investor/OpexPage").then(m => ({ default: m.OpexPage })));
const CapexPage = lazy(() => import("@/pages/investor/CapexPage").then(m => ({ default: m.CapexPage })));
const IncomeStatementPage = lazy(() => import("@/pages/investor/IncomeStatementPage").then(m => ({ default: m.IncomeStatementPage })));
const BalanceSheetPage = lazy(() => import("@/pages/investor/BalanceSheetPage").then(m => ({ default: m.BalanceSheetPage })));
const CashFlowPage = lazy(() => import("@/pages/investor/CashFlowPage").then(m => ({ default: m.CashFlowPage })));
const BreakevenPage = lazy(() => import("@/pages/investor/BreakevenPage").then(m => ({ default: m.BreakevenPage })));
const KpiRatiosPage = lazy(() => import("@/pages/investor/KpiRatiosPage").then(m => ({ default: m.KpiRatiosPage })));

function LazyWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<GoldSkeleton lines={8} className="p-8" />}>
      {children}
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <HomePage /> },
    ],
  },
  {
    path: "/investor/login",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute requiredRole="investor" />,
    children: [
      {
        element: <InvestorLayout />,
        children: [
          { path: "/investor/dashboard", element: <DashboardPage /> },
          { path: "/investor/charts", element: <LazyWrapper><ChartsPage /></LazyWrapper> },
          { path: "/investor/sales-forecast", element: <LazyWrapper><SalesForecastPage /></LazyWrapper> },
          { path: "/investor/revenue", element: <LazyWrapper><RevenueBreakdownPage /></LazyWrapper> },
          { path: "/investor/cohorts", element: <LazyWrapper><CohortAnalysisPage /></LazyWrapper> },
          { path: "/investor/salaries", element: <LazyWrapper><SalariesPage /></LazyWrapper> },
          { path: "/investor/opex", element: <LazyWrapper><OpexPage /></LazyWrapper> },
          { path: "/investor/capex", element: <LazyWrapper><CapexPage /></LazyWrapper> },
          { path: "/investor/income-statement", element: <LazyWrapper><IncomeStatementPage /></LazyWrapper> },
          { path: "/investor/balance-sheet", element: <LazyWrapper><BalanceSheetPage /></LazyWrapper> },
          { path: "/investor/cash-flow", element: <LazyWrapper><CashFlowPage /></LazyWrapper> },
          { path: "/investor/breakeven", element: <LazyWrapper><BreakevenPage /></LazyWrapper> },
          { path: "/investor/kpi-ratios", element: <LazyWrapper><KpiRatiosPage /></LazyWrapper> },
        ],
      },
    ],
  },
]);
```

- [ ] **Step 14: Update main.tsx to use Router**

Replace contents of `app/src/main.tsx` with:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './stores/themeStore'; // Initialize theme before render
import './i18n';
import './index.css';
import { router } from './router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
```

- [ ] **Step 15: Simplify App.tsx (now just a redirect — can be deleted later)**

Replace contents of `app/src/App.tsx` with:

```tsx
// App.tsx is no longer the entry point — routing is handled by router.tsx
// This file is kept for backward compatibility but is not imported.
export default function App() {
  return null;
}
```

- [ ] **Step 16: Create all investor page stubs**

Create each of these files with the same stub pattern:

`app/src/pages/investor/ChartsPage.tsx`:
```tsx
import { ChartCard } from "@/components/investor/ChartCard";
export function ChartsPage() {
  return (
    <div className="space-y-8">
      <div className="section-label">Charts</div>
      <div className="glass-card p-8 text-center" style={{ color: "var(--text-secondary)" }}>
        Detailed chart views coming soon
      </div>
    </div>
  );
}
```

`app/src/pages/investor/SalesForecastPage.tsx`:
```tsx
export function SalesForecastPage() {
  return (
    <div className="space-y-8">
      <div className="section-label">Sales Forecast</div>
      <div className="glass-card p-8 text-center" style={{ color: "var(--text-secondary)" }}>
        Monthly category-based revenue forecast coming soon
      </div>
    </div>
  );
}
```

`app/src/pages/investor/RevenueBreakdownPage.tsx`:
```tsx
export function RevenueBreakdownPage() {
  return (
    <div className="space-y-8">
      <div className="section-label">Revenue Breakdown</div>
      <div className="glass-card p-8 text-center" style={{ color: "var(--text-secondary)" }}>
        Deal commissions, subscriptions, and add-ons breakdown coming soon
      </div>
    </div>
  );
}
```

`app/src/pages/investor/CohortAnalysisPage.tsx`:
```tsx
export function CohortAnalysisPage() {
  return (
    <div className="space-y-8">
      <div className="section-label">Cohort Analysis</div>
      <div className="glass-card p-8 text-center" style={{ color: "var(--text-secondary)" }}>
        Cohort retention and revenue analysis coming soon
      </div>
    </div>
  );
}
```

`app/src/pages/investor/SalariesPage.tsx`:
```tsx
export function SalariesPage() {
  return (
    <div className="space-y-8">
      <div className="section-label">Salaries & Team</div>
      <div className="glass-card p-8 text-center" style={{ color: "var(--text-secondary)" }}>
        Team headcount and compensation data coming soon
      </div>
    </div>
  );
}
```

`app/src/pages/investor/OpexPage.tsx`:
```tsx
export function OpexPage() {
  return (
    <div className="space-y-8">
      <div className="section-label">Operating Expenses</div>
      <div className="glass-card p-8 text-center" style={{ color: "var(--text-secondary)" }}>
        Operating expense breakdown coming soon
      </div>
    </div>
  );
}
```

`app/src/pages/investor/CapexPage.tsx`:
```tsx
export function CapexPage() {
  return (
    <div className="space-y-8">
      <div className="section-label">Capital Expenditure</div>
      <div className="glass-card p-8 text-center" style={{ color: "var(--text-secondary)" }}>
        Capital expenditure and depreciation data coming soon
      </div>
    </div>
  );
}
```

`app/src/pages/investor/IncomeStatementPage.tsx`:
```tsx
import { DataTable } from "@/components/investor/DataTable";

const columns = [
  { key: "item", label: "Item" },
  { key: "m1", label: "Month 1" },
  { key: "m2", label: "Month 2" },
  { key: "m3", label: "Month 3" },
  { key: "m4", label: "Month 4" },
  { key: "m5", label: "Month 5" },
  { key: "m6", label: "Month 6" },
];

const rows = [
  { item: "Revenue", m1: "$120K", m2: "$150K", m3: "$180K", m4: "$200K", m5: "$240K", m6: "$280K" },
  { item: "COGS", m1: "$36K", m2: "$45K", m3: "$54K", m4: "$60K", m5: "$72K", m6: "$84K" },
  { item: "Gross Profit", m1: "$84K", m2: "$105K", m3: "$126K", m4: "$140K", m5: "$168K", m6: "$196K" },
  { item: "Operating Expenses", m1: "$44K", m2: "$40K", m3: "$36K", m4: "$35K", m5: "$28K", m6: "$26K" },
  { item: "EBITDA", m1: "$40K", m2: "$65K", m3: "$90K", m4: "$105K", m5: "$140K", m6: "$170K" },
];

const totalRow = { item: "Net Income", m1: "$32K", m2: "$52K", m3: "$72K", m4: "$84K", m5: "$112K", m6: "$136K" };

export function IncomeStatementPage() {
  return (
    <div className="space-y-8">
      <div className="section-label">Income Statement</div>
      <DataTable columns={columns} rows={rows} totalRow={totalRow} />
    </div>
  );
}
```

`app/src/pages/investor/BalanceSheetPage.tsx`:
```tsx
import { DataTable } from "@/components/investor/DataTable";

const columns = [
  { key: "item", label: "Item" },
  { key: "q1", label: "Q1" },
  { key: "q2", label: "Q2" },
];

const rows = [
  { item: "Cash & Equivalents", q1: "$450K", q2: "$680K" },
  { item: "Accounts Receivable", q1: "$120K", q2: "$180K" },
  { item: "Total Current Assets", q1: "$570K", q2: "$860K" },
  { item: "Fixed Assets", q1: "$200K", q2: "$190K" },
  { item: "Total Assets", q1: "$770K", q2: "$1.05M" },
  { item: "Accounts Payable", q1: "$80K", q2: "$95K" },
  { item: "Total Liabilities", q1: "$280K", q2: "$320K" },
];

const totalRow = { item: "Total Equity", q1: "$490K", q2: "$730K" };

export function BalanceSheetPage() {
  return (
    <div className="space-y-8">
      <div className="section-label">Balance Sheet</div>
      <DataTable columns={columns} rows={rows} totalRow={totalRow} />
    </div>
  );
}
```

`app/src/pages/investor/CashFlowPage.tsx`:
```tsx
import { DataTable } from "@/components/investor/DataTable";

const columns = [
  { key: "item", label: "Item" },
  { key: "m1", label: "Month 1" },
  { key: "m2", label: "Month 2" },
  { key: "m3", label: "Month 3" },
];

const rows = [
  { item: "Operating Cash Flow", m1: "$38K", m2: "$60K", m3: "$85K" },
  { item: "Investing Cash Flow", m1: "-$15K", m2: "-$10K", m3: "-$8K" },
  { item: "Financing Cash Flow", m1: "$0", m2: "$0", m3: "$0" },
];

const totalRow = { item: "Net Cash Flow", m1: "$23K", m2: "$50K", m3: "$77K" };

export function CashFlowPage() {
  return (
    <div className="space-y-8">
      <div className="section-label">Cash Flow Statement</div>
      <DataTable columns={columns} rows={rows} totalRow={totalRow} />
    </div>
  );
}
```

`app/src/pages/investor/BreakevenPage.tsx`:
```tsx
import { ChartCard } from "@/components/investor/ChartCard";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from "recharts";

const data = [
  { month: "M1", revenue: 120, costs: 160 },
  { month: "M2", revenue: 150, costs: 155 },
  { month: "M3", revenue: 180, costs: 150 },
  { month: "M4", revenue: 200, costs: 148 },
  { month: "M5", revenue: 240, costs: 145 },
  { month: "M6", revenue: 280, costs: 142 },
];

export function BreakevenPage() {
  return (
    <div className="space-y-8">
      <div className="section-label">Breakeven Analysis</div>
      <ChartCard title="Revenue vs Total Costs">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" tick={{ fill: "var(--text-tertiary)", fontSize: 12 }} />
            <YAxis tick={{ fill: "var(--text-tertiary)", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                color: "var(--text)",
              }}
            />
            <Line type="monotone" dataKey="revenue" stroke="#c8a951" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="costs" stroke="#E24B4A" strokeWidth={2} dot={{ r: 4 }} />
            <ReferenceLine y={155} stroke="var(--text-tertiary)" strokeDasharray="5 5" label={{ value: "Breakeven", fill: "var(--text-tertiary)", fontSize: 11 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
```

`app/src/pages/investor/KpiRatiosPage.tsx`:
```tsx
import { KpiCard } from "@/components/investor/KpiCard";

const ratios = [
  { label: "Gross Margin", value: "72%", trend: "+3%", trendUp: true },
  { label: "Net Margin", value: "48%", trend: "+5%", trendUp: true },
  { label: "Burn Rate", value: "$45K/mo", trend: "-12%", trendUp: true },
  { label: "Runway", value: "18 months", trend: "+3 mo", trendUp: true },
  { label: "CAC", value: "$2.4K", trend: "-8%", trendUp: true },
  { label: "LTV", value: "$28K", trend: "+15%", trendUp: true },
  { label: "LTV:CAC", value: "11.7x", trend: "+2.1x", trendUp: true },
  { label: "Churn Rate", value: "2.1%", trend: "-0.3%", trendUp: true },
];

export function KpiRatiosPage() {
  return (
    <div className="space-y-8">
      <div className="section-label">KPI & Ratios</div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {ratios.map((r) => (
          <KpiCard key={r.label} {...r} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 17: Verify build compiles**

```bash
cd /Users/omarhamdy/Developer/sia-website/app && npx tsc --noEmit 2>&1 | head -30
```

- [ ] **Step 18: Commit**

```bash
cd /Users/omarhamdy/Developer/sia-website && git add app/src/stores/ app/src/router.tsx app/src/layouts/ app/src/pages/ app/src/components/auth/ app/src/components/investor/ app/src/components/ui/ThemeToggle.tsx app/src/main.tsx app/src/App.tsx && git commit -m "feat: add React Router, investor portal layout, dashboard, and all investor pages"
```

---

## Task 5: Retheme Navbar

**Files:**
- Modify: `app/src/components/navigation/Navbar.tsx`

- [ ] **Step 1: Rewrite Navbar.tsx**

Replace the entire contents of `app/src/components/navigation/Navbar.tsx` with:

```tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Link } from "react-router-dom";

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.platform"), href: "#platform" },
    { label: t("nav.sectors"), href: "#sectors" },
    { label: t("nav.insights"), href: "#insights" },
  ];

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "backdrop-blur-xl border-b shadow-sm"
            : "bg-transparent"
        )}
        style={scrolled ? {
          backgroundColor: "color-mix(in srgb, var(--surface) 90%, transparent)",
          borderColor: "var(--border)",
        } : undefined}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src="/images/sia-logo.png"
              alt="SIA — Strategic Integration Agency"
              width="52"
              height="52"
              className="h-[52px] w-auto"
            />
          </Link>

          {/* Desktop Nav — flat links, no dropdowns */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text)";
                  e.currentTarget.style.backgroundColor = "var(--surface-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <ThemeToggle />
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 text-xs font-medium transition-colors border rounded-lg"
              style={{
                color: "var(--text-secondary)",
                borderColor: "var(--border)",
              }}
            >
              {t("nav.langToggle")}
            </button>
            <Link
              to="/investor/login"
              className="px-5 py-2 text-sm font-semibold rounded-lg transition-all border-2"
              style={{
                borderColor: "var(--accent)",
                color: "var(--accent)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--accent)";
                e.currentTarget.style.color = "#1a1a1a";
                e.currentTarget.style.boxShadow = "0 0 16px var(--accent-glow)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Investor Login
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2"
            style={{ color: "var(--text-secondary)" }}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 backdrop-blur-xl"
            style={{ backgroundColor: "color-mix(in srgb, var(--surface) 98%, transparent)" }}
          >
            <nav aria-label="Mobile navigation" className="flex flex-col items-center justify-center h-full gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-serif transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="flex items-center gap-3"
              >
                <ThemeToggle />
                <button
                  onClick={toggleLanguage}
                  className="text-sm font-medium transition-colors border rounded-lg px-4 py-2"
                  style={{ color: "var(--text-secondary)", borderColor: "var(--border)" }}
                >
                  {t("nav.langToggle")}
                </button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  to="/investor/login"
                  onClick={() => setMobileOpen(false)}
                  className="px-8 py-3 rounded-lg font-semibold"
                  style={{ backgroundColor: "var(--accent)", color: "#1a1a1a" }}
                >
                  Investor Login
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/omarhamdy/Developer/sia-website && git add app/src/components/navigation/Navbar.tsx && git commit -m "feat: retheme navbar with flat links, theme toggle, and investor login button"
```

---

## Task 6: Retheme Public Sections (Part 1 — Hero, Globe, TrustBar)

**Files:**
- Modify: `app/src/sections/HeroSection.tsx`
- Modify: `app/src/sections/GlobeSection.tsx`
- Modify: `app/src/sections/TrustBar.tsx`

- [ ] **Step 1: Read current HeroSection.tsx**

Read the full file to understand current imports and i18n keys before rewriting.

- [ ] **Step 2: Rewrite HeroSection.tsx**

Replace with a clean corporate hero: solid background with grid pattern, Playfair heading (48px max), single gold gradient word, Inter subtitle, two buttons (Learn More outline + Investor Access gold solid), emissive gold glow orb in dark mode. Remove all FlipWords, Aurora, and TextReveal imports. Use `var(--bg)` background, `var(--text)` for heading, `var(--text-secondary)` for subtitle. Keep all `t()` translation calls for existing i18n keys.

- [ ] **Step 3: Read current GlobeSection.tsx**

Read the full file before rewriting.

- [ ] **Step 4: Rewrite GlobeSection.tsx**

Keep the COBE globe. Strip decorative elements. Add glassmorphism stat cards beside the globe instead of floating flags. Use `var(--bg)` background. Simplify the framing with clean padding and max-width.

- [ ] **Step 5: Read current TrustBar.tsx**

Read the full file before rewriting.

- [ ] **Step 6: Rewrite TrustBar.tsx**

Replace the Marquee with a static grid of partner logos. Logos at opacity 0.5, hover to 1.0. Clean separator lines above/below using `var(--border)`. Keep all existing `t()` calls and logo image references.

- [ ] **Step 7: Verify build**

```bash
cd /Users/omarhamdy/Developer/sia-website/app && npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 8: Commit**

```bash
cd /Users/omarhamdy/Developer/sia-website && git add app/src/sections/HeroSection.tsx app/src/sections/GlobeSection.tsx app/src/sections/TrustBar.tsx && git commit -m "feat: retheme Hero, Globe, and TrustBar sections with corporate glassmorphism"
```

---

## Task 7: Retheme Public Sections (Part 2 — ValueProps, Stats, HowItWorks)

**Files:**
- Modify: `app/src/sections/ValuePropsSection.tsx`
- Modify: `app/src/sections/StatsSection.tsx`
- Modify: `app/src/sections/HowItWorksSection.tsx`

- [ ] **Step 1: Read current ValuePropsSection.tsx**

Read the full file to understand current ThreeDCard/SpotlightCard usage and i18n keys.

- [ ] **Step 2: Rewrite ValuePropsSection.tsx**

Replace 3D/Spotlight cards with `glass-card glass-card-accent` divs. Keep icon + title + description layout. 3-column grid on desktop, single column on mobile. Fade-in on scroll with Framer Motion (`whileInView`, `once: true`). Hover: translateY(-2px). Remove all ThreeDCard and SpotlightCard imports.

- [ ] **Step 3: Read current StatsSection.tsx**

Read the full file.

- [ ] **Step 4: Rewrite StatsSection.tsx**

4-column grid of `glass-card` KPI cards. Keep AnimatedCounter component (it's meaningful). Gold accent on the number value. Muted label below. Toned-down spring physics (shorter duration, less bounce).

- [ ] **Step 5: Read current HowItWorksSection.tsx**

Read the full file.

- [ ] **Step 6: Rewrite HowItWorksSection.tsx**

Vertical timeline with thin gold line (2px, `var(--accent)`). Numbered step circles. Clean `glass-card` at each step. Remove spotlight grid background. Keep all `t()` calls.

- [ ] **Step 7: Verify build**

```bash
cd /Users/omarhamdy/Developer/sia-website/app && npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 8: Commit**

```bash
cd /Users/omarhamdy/Developer/sia-website && git add app/src/sections/ValuePropsSection.tsx app/src/sections/StatsSection.tsx app/src/sections/HowItWorksSection.tsx && git commit -m "feat: retheme ValueProps, Stats, and HowItWorks with glassmorphism cards"
```

---

## Task 8: Retheme Public Sections (Part 3 — Sectors, Testimonials, CTA, Footer)

**Files:**
- Modify: `app/src/sections/SectorsSection.tsx`
- Modify: `app/src/sections/TestimonialsSection.tsx`
- Modify: `app/src/sections/CTASection.tsx`
- Modify: `app/src/sections/Footer.tsx`

- [ ] **Step 1: Read current SectorsSection.tsx**

Read the full file.

- [ ] **Step 2: Rewrite SectorsSection.tsx**

2x4 grid of `glass-card` cards. Icon + title + one-line description. Hover: lift + subtle gold border glow (`box-shadow: 0 0 12px var(--accent-glow)` on hover). Keep all `t()` calls.

- [ ] **Step 3: Read current TestimonialsSection.tsx**

Read the full file.

- [ ] **Step 4: Rewrite TestimonialsSection.tsx**

Remove dual Marquee. Replace with 2-3 static `glass-card` testimonial cards in a row. Avatar + name + role + quote. Simple and clean. On mobile: stack vertically.

- [ ] **Step 5: Read current CTASection.tsx**

Read the full file.

- [ ] **Step 6: Rewrite CTASection.tsx**

Remove Lamp and BorderBeam imports. Centered block: heading + subtitle + gold solid button. `var(--bg)` background. Dark mode: emissive gold glow behind button (`box-shadow: 0 0 24px var(--accent-glow)`).

- [ ] **Step 7: Read current Footer.tsx**

Read the full file.

- [ ] **Step 8: Rewrite Footer.tsx**

3-column layout (reduced from 4). Newsletter input with gold accent border on focus (emissive-focus class). Muted social icons. Office locations kept. All `var()` colors for theme compatibility. Keep all `t()` calls.

- [ ] **Step 9: Verify build**

```bash
cd /Users/omarhamdy/Developer/sia-website/app && npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 10: Commit**

```bash
cd /Users/omarhamdy/Developer/sia-website && git add app/src/sections/SectorsSection.tsx app/src/sections/TestimonialsSection.tsx app/src/sections/CTASection.tsx app/src/sections/Footer.tsx && git commit -m "feat: retheme Sectors, Testimonials, CTA, and Footer sections"
```

---

## Task 9: Delete Unused Effect Components

**Files:**
- Delete: `app/src/components/effects/FlipWords.tsx`
- Delete: `app/src/components/effects/ThreeDCard.tsx`
- Delete: `app/src/components/effects/SpotlightCard.tsx`
- Delete: `app/src/components/effects/Lamp.tsx`
- Delete: `app/src/components/effects/BorderBeam.tsx`
- Delete: `app/src/components/effects/AuroraBackground.tsx`

- [ ] **Step 1: Verify no remaining imports of deleted components**

```bash
cd /Users/omarhamdy/Developer/sia-website/app && grep -r "FlipWords\|ThreeDCard\|SpotlightCard\|Lamp\|BorderBeam\|AuroraBackground" src/ --include="*.tsx" --include="*.ts" -l
```

Expected: No files (all references removed in Tasks 6-8). If any remain, fix them first.

- [ ] **Step 2: Delete the files**

```bash
cd /Users/omarhamdy/Developer/sia-website/app && rm -f src/components/effects/FlipWords.tsx src/components/effects/ThreeDCard.tsx src/components/effects/SpotlightCard.tsx src/components/effects/Lamp.tsx src/components/effects/BorderBeam.tsx src/components/effects/AuroraBackground.tsx
```

- [ ] **Step 3: Verify build**

```bash
cd /Users/omarhamdy/Developer/sia-website/app && npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 4: Commit**

```bash
cd /Users/omarhamdy/Developer/sia-website && git add -u app/src/components/effects/ && git commit -m "chore: remove unused flashy effect components (FlipWords, ThreeDCard, Lamp, etc.)"
```

---

## Task 10: Update i18n Strings for Investor Portal

**Files:**
- Modify: `app/src/i18n/en.json`
- Modify: `app/src/i18n/ar.json`

- [ ] **Step 1: Read current en.json**

Read the full file to understand the translation key structure.

- [ ] **Step 2: Add investor portal strings to en.json**

Add a new `"investor"` section to the JSON with keys for: sidebar labels, page titles, login page text, KPI labels, table headers. Keep all existing keys intact.

- [ ] **Step 3: Read current ar.json**

Read the full file.

- [ ] **Step 4: Add investor portal strings to ar.json**

Add matching Arabic translations for all new `"investor"` keys.

- [ ] **Step 5: Commit**

```bash
cd /Users/omarhamdy/Developer/sia-website && git add app/src/i18n/en.json app/src/i18n/ar.json && git commit -m "feat: add investor portal i18n strings (English + Arabic)"
```

---

## Task 11: Final Integration & Visual QA

**Files:**
- All modified files from previous tasks

- [ ] **Step 1: Run the dev server**

```bash
cd /Users/omarhamdy/Developer/sia-website/app && npm run dev
```

- [ ] **Step 2: Verify public pages render in light mode**

Open http://localhost:5173/ in a browser. Check:
- Navbar renders with theme toggle and investor login button
- All sections display with glassmorphism cards
- Colors use CSS variables (no hardcoded navy/charcoal text)
- No console errors

- [ ] **Step 3: Verify dark mode toggle**

Click the theme toggle. Check:
- Background switches to dark (#0a0f1a)
- Cards switch to dark glass
- Emissive gold effects are visible
- Text is readable

- [ ] **Step 4: Verify investor login flow**

Navigate to /investor/login. Check:
- Login page renders with glassmorphism card
- "Sign in with Google" button visible
- Click to mock-login → redirects to /investor/dashboard

- [ ] **Step 5: Verify investor portal**

Once logged in, check:
- Sidebar renders with all nav groups
- Dashboard shows KPI cards with gold accents
- Charts render with themed tooltips
- Sidebar collapse/expand works
- Dark mode works in portal

- [ ] **Step 6: Verify full build**

```bash
cd /Users/omarhamdy/Developer/sia-website/app && npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 7: Final commit**

```bash
cd /Users/omarhamdy/Developer/sia-website && git add -A && git commit -m "feat: complete SIA redesign with corporate glassmorphism aesthetic and investor portal"
```
