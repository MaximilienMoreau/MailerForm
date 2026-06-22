# MailerForm: Landing Page

![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white&labelColor=20232a)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white&labelColor=20232a)
![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white&labelColor=20232a)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06b6d4?logo=tailwindcss&logoColor=white&labelColor=20232a)
![Tests](https://img.shields.io/badge/tests-49%20passing-22c55e?labelColor=20232a)
![License](https://img.shields.io/badge/license-private-6b7280?labelColor=20232a)

Marketing and documentation landing page for **[MailerForm](https://mailerform.io)**, an email infrastructure platform for SaaS engineering teams. Covers the full user journey from awareness to sign-up with accessibility, performance, and SEO as first-class concerns.

---

## Table of contents

- [Quick start](#quick-start)
- [Stack](#stack)
- [Project structure](#project-structure)
- [Scripts](#scripts)
- [Environment variables](#environment-variables)
- [Architecture](#architecture)
- [Design tokens](#design-tokens)
- [Testing](#testing)
- [CI](#ci)

---

## Quick start

```bash
npm install
npm run dev        # → http://localhost:5173
```

Copy the environment file and set your Formspree form ID (required by the CTA sign-up form in production):

```bash
cp .env.example .env
# then edit .env and fill in VITE_FORMSPREE_ID
```

---

## Stack

| Tool | Version | Role |
|---|:-:|---|
| [React](https://react.dev) | 18 | UI framework |
| [TypeScript](https://www.typescriptlang.org) | 5 | Type safety — strict mode |
| [Vite](https://vitejs.dev) | 5 | Dev server & bundler |
| [Tailwind CSS](https://tailwindcss.com) | 3 | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | 11 | Animations |
| [React Router](https://reactrouter.com) | 7 | Client-side routing |
| [Lucide React](https://lucide.dev) | 0.378 | Icon library |
| [Vitest](https://vitest.dev) | 4 | Unit & component tests |
| [Testing Library](https://testing-library.com) | 16 | DOM testing utilities |

**Fonts:** Inter (body) · JetBrains Mono (code blocks) — loaded from Google Fonts with `display=swap`.

---

## Project structure

```
src/
├── components/
│   ├── __tests__/               # Component tests (Vitest + Testing Library)
│   │
│   ├── Navbar.tsx                # Sticky nav, active-section tracking, focus trap on mobile
│   ├── Hero.tsx                  # Animated stat counters + deliverability card preview
│   ├── ProblemSection.tsx        # Before / after comparison
│   ├── FeaturesSection.tsx       # 6-feature card grid
│   ├── DeliverabilitySection.tsx # Left copy + right animated report card
│   ├── DeliverabilityCard.tsx    # Reusable deliverability score card
│   ├── StreamSection.tsx         # Transactional vs marketing stream comparison
│   ├── ApiSection.tsx            # Syntax-highlighted code block + copy button
│   ├── IntegrationsSection.tsx   # SDK & no-code integration grid
│   ├── ComparisonSection.tsx     # Feature matrix vs SendGrid / Mailgun / Resend
│   ├── TestimonialsSection.tsx   # Customer quotes + logo strip
│   ├── PricingSection.tsx        # 3-tier pricing with monthly / yearly toggle
│   ├── FaqSection.tsx            # Accessible accordion (aria-controls + AnimatePresence)
│   ├── CtaSection.tsx            # Email sign-up form → Formspree (+ honeypot)
│   ├── LegalLayout.tsx           # Shared layout for all legal pages
│   ├── Footer.tsx                # Multi-column footer with social links
│   ├── CookieBanner.tsx          # Cookie consent with localStorage persistence
│   ├── ScrollToTop.tsx           # Resets scroll position on every route change
│   ├── ErrorBoundary.tsx         # React error boundary with reset
│   └── SkipLink.tsx              # Keyboard accessibility skip link
│
├── data/
│   ├── features.ts               # Feature card definitions
│   └── api.ts                    # Code example, SDK list, API stats
│
├── hooks/
│   └── useMeta.ts                # Updates title + OG/Twitter meta tags per page
│
├── lib/
│   ├── motion.ts                 # Shared Framer Motion constants (EASE, VP*, stagger, fadeUp)
│   └── tokenize.tsx              # Lightweight syntax highlighter (zero external dependency)
│
├── pages/
│   ├── legal/
│   │   ├── PrivacyPage.tsx
│   │   ├── TermsPage.tsx
│   │   ├── CookiesPage.tsx
│   │   └── GdprPage.tsx
│   ├── AboutPage.tsx             # Company story, values, timeline
│   ├── ChangelogPage.tsx         # Versioned release history
│   ├── NotFound.tsx              # 404 catch-all
│   └── ComingSoon.tsx            # Placeholder for /blog, /careers, /press
│
├── test/
│   └── setup.ts                  # Testing Library setup (@testing-library/jest-dom)
│
├── App.tsx                       # Router, ErrorBoundary, MotionConfig, lazy sections
├── main.tsx                      # React 18 entry point (StrictMode)
├── vite-env.d.ts                 # import.meta.env type declarations
└── index.css                     # Tailwind layers + shared component classes
```

### Path alias

`@/` resolves to `src/` — configured in both Vite and TypeScript:

```ts
import { EASE } from '@/lib/motion'
import { useMeta } from '@/hooks/useMeta'
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server on port 5173 |
| `npm run build` | Type-check then production build |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run tests in watch mode |
| `npm run test:run` | Run tests once (CI mode) |
| `npm run test:coverage` | Run tests with v8 coverage report |
| `npm run lint` | ESLint — zero warnings allowed |
| `npm run format` | Prettier formatting |

---

## Environment variables

| Variable | Required | Description |
|---|:-:|---|
| `VITE_FORMSPREE_ID` | Production | Formspree form ID for the CTA email capture. Get one at [formspree.io](https://formspree.io). Without it the form falls back gracefully to an error state. |

---

## Architecture

### Routing

React Router v7. All routes are declared in [`App.tsx`](src/App.tsx):

| Path | Component | Notes |
|---|---|---|
| `/` | `LandingPage` | Full single-page landing |
| `/about` | `AboutPage` | Company story & values |
| `/changelog` | `ChangelogPage` | Versioned release history |
| `/privacy` · `/terms` · `/cookies` · `/gdpr` | Legal pages | Shared `LegalLayout` |
| `/blog` · `/careers` · `/press` | `ComingSoon` | Placeholder |
| `*` | `NotFound` | 404 catch-all |

A `<ScrollToTop>` component resets `window.scrollTo(0, 0)` on every `pathname` change so secondary pages always open at the top.

### Code splitting

Sections below the fold and all secondary pages are lazy-loaded via `React.lazy` + `<Suspense fallback={null}>`. Vite automatically splits them into separate chunks.

**Latest production build:**

```
index.js                   354 kB │ gzip: 111 kB   ← critical path
GdprPage.js                 12 kB │ gzip:   4 kB
ChangelogPage.js            10 kB │ gzip:   4 kB
AboutPage.js                 9 kB │ gzip:   3 kB
TermsPage.js                 9 kB │ gzip:   3 kB
PrivacyPage.js               8 kB │ gzip:   3 kB
CookiesPage.js               6 kB │ gzip:   2 kB
PricingSection.js            6 kB │ gzip:   2 kB
ComparisonSection.js         6 kB │ gzip:   2 kB
CtaSection.js                6 kB │ gzip:   2 kB
IntegrationsSection.js       5 kB │ gzip:   2 kB
Footer.js                    5 kB │ gzip:   2 kB
FaqSection.js                4 kB │ gzip:   2 kB
TestimonialsSection.js       4 kB │ gzip:   2 kB
ComingSoon.js                2 kB │ gzip:   1 kB
```

### SEO & meta tags

`index.html` carries the static Open Graph, Twitter Card, and canonical URL for the landing page. Secondary pages (About, Changelog, legal) call the `useMeta` hook to update `document.title`, `<meta name="description">`, and the OG/Twitter tags dynamically. All values are restored on unmount.

> **Note:** `og:image` is currently an SVG (`public/og-image.svg`). For full social-preview support on Twitter, LinkedIn, and Slack, replace it with a PNG (1200 × 630 px).

### Animations

All Framer Motion components share constants from [`src/lib/motion.ts`](src/lib/motion.ts):

| Export | Purpose |
|---|---|
| `EASE` | Cubic-bezier `[0.22, 1, 0.36, 1]` — used everywhere |
| `VP` / `VP_SM` / `VP_MD` / `VP_LG` | Viewport configs with different trigger thresholds |
| `staggerContainer` / `staggerItem` | Consistent list animations — 80 ms stagger |
| `fadeUp(delay)` | Mount-based fade-up for page entry animations |
| `fadeUpView(delay)` | Scroll-triggered fade-up for sections below the fold |

A single `<MotionConfig reducedMotion="user">` at the root automatically respects `prefers-reduced-motion`.

### Accessibility

- **Skip link** (`SkipLink`) jumps keyboard focus directly to `#main-content`
- **Focus trap** in the mobile menu with Escape-to-close and focus restoration to the toggle button
- **`aria-controls` / `aria-expanded`** on all accordion and menu toggle buttons
- **`role="dialog"` / `aria-modal`** on the mobile nav and cookie banner
- **`aria-live="polite"`** on stable values only — never on animated counter frames to avoid screen-reader spam
- **`aria-label`** on the stream-separation heading to expose the intended meaning (not the visual strikethrough)
- **Semantic HTML** throughout — `nav`, `main`, `section`, `article`, `figure`, `blockquote`, `time`

---

## Design tokens

Brand palette and custom utilities are defined in [`tailwind.config.cjs`](tailwind.config.cjs):

- `brand-{50…950}` : primary blue (`#3366ff` base)
- `bg-grid-white` : subtle dot-grid background pattern
- `font-sans` → Inter · `font-mono` → JetBrains Mono

Shared component classes live in [`src/index.css`](src/index.css):

| Class | Usage |
|---|---|
| `.btn-primary` | Filled brand button with hover lift |
| `.btn-secondary` | Ghost button with border |
| `.card` | Dark glass card with hover state |
| `.tag` | Small pill label |
| `.score-bar` | Progress bar track |
| `.focus-ring` | Consistent keyboard focus outline |
| `.prose-legal` | Typography styles for legal page content |

---

## Testing

Tests use [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) in a `happy-dom` environment.

```bash
npm run test:run       # run once
npm run test:coverage  # with v8 coverage report
```

**49 tests** across 9 suites:

| Suite | What it covers |
|---|---|
| `CtaSection` | Email validation, Formspree submission, error & success states, empty-field guard |
| `Navbar` | Logo render, desktop links, mobile menu open/close, Escape key |
| `FaqSection` | Accordion expand/collapse, keyboard accessibility |
| `PricingSection` | Plan rendering, billing toggle, yearly discount badge |
| `ComparisonSection` | Table structure, cell values, legend |
| `CookieBanner` | Consent accept/decline, localStorage persistence |
| `Hero` | Stat items, trust badges, CTA links |
| `ErrorBoundary` | Error catch, reset button |
| `tokenize` | Syntax tokeniser edge cases |

The `CtaSection` tests mock `fetch` via `vi.stubGlobal` and `VITE_FORMSPREE_ID` via `vi.stubEnv` — no real network requests.

---

## CI

GitHub Actions runs on every push to `main` and on all pull requests:

```
1. tsc --noEmit              type-check
2. eslint --max-warnings 0   lint
3. vitest run                tests
4. vite build                production build
```
