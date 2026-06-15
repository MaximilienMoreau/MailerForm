# MailForm: Landing Page

Landing page for **MailForm**, an email infrastructure platform for SaaS teams.

**Live repo:** [github.com/MaximilienMoreau/MailerForm](https://github.com/MaximilienMoreau/MailerForm)

---

## Stack

| Tool | Version |
|---|---|
| React | 18 |
| TypeScript | 5 |
| Vite | 5 |
| Tailwind CSS | 3 |
| Framer Motion | 11 |
| React Router | 7 |
| Lucide React | 0.378 |
| Vitest | 4 |

Fonts: **Inter** (body) · **JetBrains Mono** (code blocks) loaded from Google Fonts with `display=swap`.

---

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
```

## Environment variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|---|---|---|
| `VITE_FORMSPREE_ID` | Yes (production) | Formspree form ID for the CTA email capture. Get one at [formspree.io](https://formspree.io). Without it, form submissions fall back to an error state. |

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run tests in watch mode |
| `npm run test:run` | Run tests once (CI mode) |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | ESLint (zero warnings allowed) |
| `npm run format` | Prettier formatting |

---

## Project structure

```
src/
├── components/
│   ├── __tests__/              # Component tests (Vitest + Testing Library)
│   ├── Navbar.tsx               # Sticky nav with focus trap on mobile
│   ├── Hero.tsx                 # Hero with animated stat counters
│   ├── ProblemSection.tsx
│   ├── FeaturesSection.tsx
│   ├── DeliverabilitySection.tsx
│   ├── DeliverabilityCard.tsx
│   ├── StreamSection.tsx
│   ├── ApiSection.tsx           # Syntax-highlighted code block + copy
│   ├── IntegrationsSection.tsx  # SDK & no-code integration grid
│   ├── ComparisonSection.tsx
│   ├── TestimonialsSection.tsx
│   ├── PricingSection.tsx       # Monthly/yearly toggle
│   ├── FaqSection.tsx           # Accessible accordion
│   ├── CtaSection.tsx           # Email sign-up form → Formspree
│   ├── LegalLayout.tsx          # Shared layout for legal pages (Navbar + Footer)
│   ├── Footer.tsx
│   ├── CookieBanner.tsx         # Consent with localStorage persistence
│   ├── ErrorBoundary.tsx        # React error boundary
│   └── SkipLink.tsx             # Keyboard accessibility skip link
├── data/
│   ├── features.ts              # Feature cards data
│   └── api.ts                   # API section code example + SDK list
├── lib/
│   ├── motion.ts                # Shared Framer Motion constants (EASE, VP, stagger)
│   └── tokenize.tsx             # Lightweight syntax highlighter for the code block
├── pages/
│   ├── legal/
│   │   ├── PrivacyPage.tsx
│   │   ├── TermsPage.tsx
│   │   ├── CookiesPage.tsx
│   │   └── GdprPage.tsx
│   ├── AboutPage.tsx            # Company story, values, timeline
│   ├── ChangelogPage.tsx        # Versioned release history
│   ├── NotFound.tsx             # 404 page
│   └── ComingSoon.tsx           # Placeholder for /blog, /careers, /press
├── test/
│   └── setup.ts                 # Testing Library setup
├── App.tsx                      # Router, ErrorBoundary, MotionConfig, lazy sections
├── main.tsx
├── vite-env.d.ts                # import.meta.env type declarations
└── index.css                    # Tailwind layers + shared component classes
```

### Path alias

`@/` resolves to `src/` everywhere (Vite + TypeScript configured).

```ts
import { EASE } from '@/lib/motion'
```

---

## Architecture notes

**Animations** — all Framer Motion components share constants from `src/lib/motion.ts`. A single `<MotionConfig reducedMotion="user">` at the root automatically respects `prefers-reduced-motion`.

**Accessibility** — skip link, focus trap in the mobile menu, `aria-controls` on accordion buttons, `aria-live` only on stable values (never on animated frames), `role="dialog"` + `aria-modal` on the mobile nav.

**Routing** — React Router v7. The `/` route renders the landing page. The following routes have full page implementations: `/about`, `/changelog`, `/privacy`, `/terms`, `/cookies`, `/gdpr`. Routes `/blog`, `/careers`, and `/press` render the lazy-loaded `ComingSoon` placeholder. A `*` catch-all renders `NotFound`.

**Performance** — sections below the fold (`IntegrationsSection`, `ComparisonSection`, `TestimonialsSection`, `PricingSection`, `FaqSection`, `CtaSection`, `Footer`) are lazy-loaded via `React.lazy` + `<Suspense>`. All secondary pages (`AboutPage`, `ChangelogPage`, legal pages) are also lazy-loaded. Vite splits them into separate chunks automatically.

**Code splitting output (production build):**
```
index.js                353 kB (gzip: 111 kB)   ← critical path
GdprPage.js              12 kB (gzip:   4 kB)
ChangelogPage.js         10 kB (gzip:   4 kB)
AboutPage.js              9 kB (gzip:   3 kB)
TermsPage.js              9 kB (gzip:   3 kB)
PrivacyPage.js            8 kB (gzip:   3 kB)
CookiesPage.js            6 kB (gzip:   2 kB)
PricingSection.js         6 kB (gzip:   2 kB)
ComparisonSection.js      6 kB (gzip:   2 kB)
CtaSection.js             5 kB (gzip:   2 kB)
IntegrationsSection.js    5 kB (gzip:   2 kB)
Footer.js                 4 kB (gzip:   2 kB)
FaqSection.js             4 kB (gzip:   2 kB)
TestimonialsSection.js    4 kB (gzip:   2 kB)
ComingSoon.js             2 kB (gzip:   1 kB)
```

---

## Design tokens

Brand palette and custom utilities are defined in `tailwind.config.cjs`:

- `brand-{50…950}` — primary blue (`#3366ff` base)
- `bg-grid-white` — subtle dot-grid background pattern
- `font-sans` → Inter · `font-mono` → JetBrains Mono

Shared component classes live in `src/index.css`:

| Class | Usage |
|---|---|
| `.btn-primary` | Filled brand button |
| `.btn-secondary` | Ghost button |
| `.card` | Dark glass card |
| `.tag` | Small pill label |
| `.score-bar` | Progress bar track |
| `.focus-ring` | Consistent keyboard focus outline |
| `.prose-legal` | Typography styles for legal page content |

---

## Testing

Tests are written with [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) and run in a `happy-dom` environment.

```bash
npm run test:run       # run once
npm run test:coverage  # with coverage report
```

Coverage includes: `CtaSection`, `FaqSection`, `Navbar`, `CookieBanner`, `Hero`, `ComparisonSection`, `PricingSection`, `ErrorBoundary`, and the `tokenize` library (49 tests total).

The `CtaSection` tests mock both `fetch` (via `vi.stubGlobal`) and `VITE_FORMSPREE_ID` (via `vi.stubEnv`) to test the Formspree integration without making real network requests.

---

## CI

GitHub Actions runs on every push to `main` and on pull requests:

1. Type-check (`tsc --noEmit`)
2. Lint (`eslint src --max-warnings 0`)
3. Tests (`vitest run`)
4. Production build (`vite build`)
