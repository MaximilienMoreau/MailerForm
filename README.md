# MailForm: Landing Page

Landing page for **MailForm**, an email infrastructure platform for SaaS teams. Built with React, TypeScript, Vite, and Tailwind CSS.

## Stack

| Tool | Version |
|---|---|
| React | 18 |
| TypeScript | 5 |
| Vite | 5 |
| Tailwind CSS | 3 |
| Framer Motion | 11 |
| Lucide React | 0.378 |

Fonts: **Inter** (body) · **JetBrains Mono** (code blocks) — loaded from Google Fonts.

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview the production build locally |

## Project structure

```
src/
├── components/       # One file per section
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── ProblemSection.tsx
│   ├── FeaturesSection.tsx
│   ├── DeliverabilitySection.tsx
│   ├── StreamSection.tsx
│   ├── ApiSection.tsx
│   ├── ComparisonSection.tsx
│   ├── PricingSection.tsx
│   ├── CtaSection.tsx
│   └── Footer.tsx
├── data/             # Static data (features, API examples)
├── hooks/
│   └── useInView.ts  # IntersectionObserver hook for scroll animations
├── lib/
│   └── tokenize.tsx  # Syntax highlighter for the API code block
├── App.tsx
├── main.tsx
└── index.css         # Tailwind layers + shared component classes
```

## Design tokens

The brand color palette and custom utilities are defined in [`tailwind.config.cjs`](tailwind.config.cjs):

- `brand-{50…950}` — primary blue (#3366ff base)
- `bg-grid-white` — subtle dot-grid background pattern
- `font-sans` → Inter · `font-mono` → JetBrains Mono

Shared component classes (`.btn-primary`, `.btn-secondary`, `.card`, `.tag`, `.score-bar`) live in the `@layer components` block of [`src/index.css`](src/index.css).
