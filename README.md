# MailerForm: Landing Page

Landing page for **MailerForm**, an email infrastructure platform for SaaS teams.
Built with React 18, TypeScript, Vite, Tailwind CSS, and Framer Motion.

**Repo:** [github.com/MaximilienMoreau/MailerForm](https://github.com/MaximilienMoreau/MailerForm)

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

Copy the environment file and fill in your Formspree ID (needed for the CTA form in production):

```bash
cp .env.example .env
```

---

## Stack

| Tool | Version | Role |
|---|---|---|
| [React](https://react.dev) | 18 | UI framework |
| [TypeScript](https://www.typescriptlang.org) | 5 | Type safety (strict mode) |
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
│   ├── Navbar.tsx                # Sticky nav, active section tracking, focus trap on mobile
│   ├── Hero.tsx                  # Animated stat counters, deliverability card preview
│   ├── ProblemSection.tsx        # Before/after comparison
│   ├── FeaturesSection.tsx       # 6-feature card grid
│   ├── DeliverabilitySection.tsx # Left copy + right animated report card
│   ├── DeliverabilityCard.tsx    # Reusable deliverability score card
│   ├── StreamSection.tsx         # Transactional vs marketing stream comparison
│   ├── ApiSection.tsx            # Syntax-highlighted code block + copy button
│   ├── IntegrationsSection.tsx   # SDK & no-code integration grid
│   ├── ComparisonSection.tsx     # Feature matrix vs SendGrid / Mailgun / Resend
│   ├── TestimonialsSection.tsx   # Customer quotes + logo strip
│   ├── PricingSection.tsx        # 3-tier pricing with monthly/yearly toggle
│   ├── FaqSection.tsx            # Accessible accordion
│   ├── CtaSection.tsx            # Email sign-up form → Formspree
│   ├── LegalLayout.tsx           # Shared layout for legal pages (Navbar + Footer)
│   ├── Footer.tsx
│   ├── CookieBanner.tsx          # Cookie consent with localStorage persistence
│   ├── ErrorBoundary.tsx         # React error boundary with reset
│   └── SkipLink.tsx              # Keyboard accessibility skip link
├── data/
│   ├── features.ts               # Feature cards data
│   └── api.ts                    # Code example, SDK list, API stats
├── lib/
│   ├── motion.ts                 # Shared Framer Motion constants (EASE, VP*, stagger, fadeUp)
│   └── tokenize.tsx              # Lightweight syntax highlighter (no external dependency)
├── pages/
│   ├── legal/
│   │   ├── PrivacyPage.tsx
│   │   ├── TermsPage.tsx
│   │   ├── CookiesPage.tsx
│   │   └── GdprPage.tsx
│   ├── AboutPage.tsx             # Company story, values, timeline
│   ├── ChangelogPage.tsx         # Versioned release history
│   ├── NotFound.tsx              # 404 page
│   └── ComingSoon.tsx            # Placeholder for /blog, /careers, /press
├── test/
│   └── setup.ts                  # Testing Library setup
├── App.tsx                       # Router, ErrorBoundary, MotionConfig, lazy sections
├── main.tsx                      # React 18 entry point (StrictMode)
├── vite-env.d.ts                 # import.meta.env type declarations
└── index.css                     # Tailwind layers + shared component classes
```

### Path alias

`@/` resolves to `src/` (configured in both Vite and TypeScript):

```ts
import { EASE } from '@/lib/motion'
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
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
|---|---|---|
| `VITE_FORMSPREE_ID` | Production | Formspree form ID for the CTA email capture. Get one at [formspree.io](https://formspree.io). Without it the form falls back to an error state. |

---

## Architecture

### Routing

React Router v7. All routes are declared in `App.tsx`:

| Path | Component | Notes |
|---|---|---|
| `/` | `LandingPage` | Full landing page |
| `/about` | `AboutPage` | Company story & values |
| `/changelog` | `ChangelogPage` | Versioned release history |
| `/privacy` · `/terms` · `/cookies` · `/gdpr` | Legal pages | Shared `LegalLayout` |
| `/blog` · `/careers` · `/press` | `ComingSoon` | Placeholder |
| `*` | `NotFound` | 404 catch-all |

### Code splitting

Sections below the fold and all secondary pages are lazy-loaded via `React.lazy` + `<Suspense>`. Vite splits them into separate chunks automatically.

**Production build output:**

```
index.js                353 kB │ gzip: 111 kB   ← critical path
GdprPage.js              12 kB │ gzip:   4 kB
ChangelogPage.js         10 kB │ gzip:   4 kB
AboutPage.js              9 kB │ gzip:   3 kB
TermsPage.js              9 kB │ gzip:   3 kB
PrivacyPage.js            8 kB │ gzip:   3 kB
CookiesPage.js            6 kB │ gzip:   2 kB
PricingSection.js         6 kB │ gzip:   2 kB
ComparisonSection.js      6 kB │ gzip:   2 kB
CtaSection.js             5 kB │ gzip:   2 kB
IntegrationsSection.js    5 kB │ gzip:   2 kB
Footer.js                 4 kB │ gzip:   2 kB
FaqSection.js             4 kB │ gzip:   2 kB
TestimonialsSection.js    4 kB │ gzip:   2 kB
ComingSoon.js             2 kB │ gzip:   1 kB
```

### Animations

All Framer Motion components share constants from `src/lib/motion.ts`:

- `EASE` — cubic-bezier `[0.22, 1, 0.36, 1]` used everywhere
- `VP` / `VP_SM` / `VP_MD` / `VP_LG` — viewport configs with different trigger thresholds
- `staggerContainer` / `staggerItem` — consistent list animations (80ms stagger)
- `fadeUp(delay)` — mount-based fade-up for page entry animations
- `fadeUpView(delay)` — scroll-triggered fade-up for sections below the fold

A single `<MotionConfig reducedMotion="user">` at the root automatically respects `prefers-reduced-motion`.

### Accessibility

- Skip link (`SkipLink`) for keyboard navigation
- Focus trap in the mobile menu with Escape-to-close and focus restoration
- `aria-controls` + `aria-expanded` on all accordion buttons
- `role="dialog"` + `aria-modal` on the mobile nav and cookie banner
- `aria-live="polite"` only on stable values — never on animated counter frames
- Semantic HTML throughout (`nav`, `main`, `section`, `article`, `figure`, `blockquote`)

---

## Design tokens

Brand palette and custom utilities are defined in `tailwind.config.cjs`:

- `brand-{50…950}` — primary blue (`#3366ff` base)
- `bg-grid-white` — subtle dot-grid background pattern
- `font-sans` → Inter · `font-mono` → JetBrains Mono

Shared component classes in `src/index.css`:

| Class | Usage |
|---|---|
| `.btn-primary` | Filled brand button with hover lift |
| `.btn-secondary` | Ghost button with border |
| `.card` | Dark glass card with hover state |
| `.tag` | Small pill label |
| `.score-bar` | Progress bar track |
| `.focus-ring` | Consistent keyboard focus outline |
| `.prose-legal` | Typography for legal page content |

---

## Testing

Tests use [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) in a `happy-dom` environment.

```bash
npm run test:run       # run once
npm run test:coverage  # with v8 coverage report
```

**Coverage:** `CtaSection`, `FaqSection`, `Navbar`, `CookieBanner`, `Hero`, `ComparisonSection`, `PricingSection`, `ErrorBoundary`, and the `tokenize` library — **49 tests total**.

The `CtaSection` tests mock `fetch` via `vi.stubGlobal` and the `VITE_FORMSPREE_ID` env var via `vi.stubEnv` to test the Formspree integration without real network requests.

---

## CI

GitHub Actions runs on every push to `main` and on all pull requests:

```
1. tsc --noEmit          type-check
2. eslint --max-warnings 0   lint
3. vitest run            tests
4. vite build            production build
```
