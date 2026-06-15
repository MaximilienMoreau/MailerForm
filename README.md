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
│   ├── __tests__/          # Component tests (Vitest + Testing Library)
│   ├── Navbar.tsx           # Sticky nav with focus trap on mobile
│   ├── Hero.tsx             # Hero with animated stat counters
│   ├── ProblemSection.tsx
│   ├── FeaturesSection.tsx
│   ├── DeliverabilitySection.tsx
│   ├── DeliverabilityCard.tsx
│   ├── StreamSection.tsx
│   ├── ApiSection.tsx       # Syntax-highlighted code block + copy
│   ├── ComparisonSection.tsx
│   ├── TestimonialsSection.tsx
│   ├── PricingSection.tsx   # Monthly/yearly toggle
│   ├── FaqSection.tsx       # Accessible accordion
│   ├── CtaSection.tsx       # Email sign-up form with validation
│   ├── Footer.tsx
│   ├── CookieBanner.tsx     # Consent with localStorage persistence
│   ├── ErrorBoundary.tsx    # React error boundary
│   └── SkipLink.tsx         # Keyboard accessibility skip link
├── data/
│   ├── features.ts          # Feature cards data
│   └── api.ts               # API section code example + SDK list
├── lib/
│   ├── motion.ts            # Shared Framer Motion constants (EASE, VP, stagger)
│   └── tokenize.tsx         # Lightweight syntax highlighter for the code block
├── pages/
│   ├── NotFound.tsx         # 404 page
│   └── ComingSoon.tsx       # Placeholder for unbuilt routes (About, Blog, Legal…)
├── test/
│   └── setup.ts             # Testing Library setup
├── App.tsx                  # Router, ErrorBoundary, MotionConfig, lazy sections
├── main.tsx
└── index.css                # Tailwind layers + shared component classes
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

**Routing** — React Router v7. The `/` route renders the landing page. Secondary routes (`/about`, `/blog`, `/changelog`, `/careers`, `/press`, `/privacy`, `/terms`, `/cookies`, `/gdpr`) render a lazy-loaded `ComingSoon` page. A `*` catch-all renders `NotFound`.

**Performance** — sections below the fold (`ComparisonSection`, `TestimonialsSection`, `PricingSection`, `FaqSection`, `CtaSection`, `Footer`) are lazy-loaded via `React.lazy` + `<Suspense>`. Vite splits them into separate chunks automatically.

**Code splitting output (production build):**
```
index.js             ~351 kB (gzip: ~111 kB)   ← critical path
ComparisonSection.js  ~6 kB
PricingSection.js     ~6 kB
FaqSection.js         ~4 kB
CtaSection.js         ~5 kB
TestimonialsSection.js ~4 kB
Footer.js             ~5 kB
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

---

## Testing

Tests are written with [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) and run in a `happy-dom` environment.

```bash
npm run test:run       # run once
npm run test:coverage  # with coverage report
```

Coverage includes: `CtaSection`, `FaqSection`, `Navbar`, `CookieBanner`, `Hero`, `ComparisonSection`, `PricingSection`, `ErrorBoundary`, and the `tokenize` library (48 tests total).

---

## CI

GitHub Actions runs on every push to `main` and on pull requests:

1. Type-check (`tsc --noEmit`)
2. Lint (`eslint src --max-warnings 0`)
3. Tests (`vitest run`)
4. Production build (`vite build`)
