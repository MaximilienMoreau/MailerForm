# MailerForm

A React and TypeScript website presenting the MailerForm early-access product.
It includes preset analysis demonstrations, an illustrative SDK example, plan
comparisons, editorial guides, and separate invitation and newsletter requests.
It does not implement an email delivery backend or operate a newsletter service.

## Development

Use **Node 20.19+** (`.nvmrc` selects the Node 20 release line).

```sh
npm ci
cp .env.example .env
npm run dev
```

Set `VITE_FORMSPREE_ID` to a Formspree form ID to enable request submission.
An absent, invalid, or unchanged example ID leaves an explicit email contact link.
Vite exposes `VITE_*` variables to the browser: do not put secrets in them.

```sh
npm run check         # TypeScript, ESLint, formatting, and tests
npm run build         # Type-check app and build tools, then produce dist/
npm run preview       # Preview the built website
npm test              # Watch tests
npm run test:coverage # Coverage report
npm run format        # Apply the shared formatting rules
```

CI runs the same type checks, lint, formatting checks, tests, and production build.
`package-lock.json` is committed; use `npm ci` to reproduce the dependency tree.

The current production dependency audit passes (`npm audit --omit=dev`). The
full audit still reports seven development dependency findings in the Tailwind 3
toolchain. Its suggested fix requires Tailwind 4; handle that as a separate CSS
migration with visual regression checks rather than applying `npm audit fix --force`.

## Structure and conventions

| Location | Responsibility |
| --- | --- |
| `src/App.tsx` | Routes, page boundaries, and lazy section loading |
| `src/pages/` | Routed pages and editorial/legal content |
| `src/components/` | UI sections and small shared UI components |
| `src/data/site.ts` | Public paths, page metadata, canonical origin, and social assets |
| `src/data/plans.ts` | Plan definitions and numeric prices in USD |
| `src/lib/planSelection.ts` | Validated query parameters and plan request links |
| `src/data/product.ts` | Shared early-access positioning and stages |
| `src/data/posts.ts` | Guide metadata and complete guide text |
| `src/lib/seo.ts` | Metadata and article schema shared by build and browser |
| `src/hooks/useMeta.ts` | Route metadata ownership, creation, and cleanup |
| `src/hooks/useFormRequest.ts` | One active request per form, deadline, cancellation, and cleanup |
| `src/lib/consent.ts` | Shared preference store with guarded storage access |
| `scripts/static-pages.ts` | Static HTML documents and a standalone not-found page |

The `@/` alias resolves to `src/`. Components use typed props; domain rules belong
in plain data/functions rather than JSX. Internal `SiteLink` links use React
Router, retain local query parameters for anchors, and leave external links and
new-tab/download links to the browser. Do not recreate lazy components in render.

Styles use Tailwind and shared classes in `src/index.css`; brand tokens are in
`tailwind.config.cjs`. Motion presets live in `src/lib/motion.ts`. Reduced-motion
preferences apply to CSS scrolling and custom counters as well as Framer Motion.

## Forms and preferences

Invitation requests include `purpose: "early-access"`, the trimmed email, and the
validated plan and billing interval. Newsletter requests include
`purpose: "newsletter"` and explicit consent. Configure downstream Formspree
handling for those distinct purposes; accepting a request does not itself create
an account or send a newsletter.

Forms validate before sending, ignore a filled honeypot, prevent concurrent
submissions, stop waiting after 15 seconds, and cancel work when unmounted.
A request failure does not label a valid email as invalid. Entered values remain
available for retry. The newsletter privacy link announces its new tab so reading
the policy does not discard the original form.

Cookie preferences synchronize within the page and across tabs using a small
external store. Storage failures keep the choice in memory for the current
session. Preferences are not newsletter consent and are never submitted as such.

## Routing, metadata, and deployment

The production build emits an HTML document for every known public route. Page
metadata and article schema come from the same definitions used at runtime.
Guide documents contain the full readable article, and the blog index links to
all guides; other pages include a readable introduction before React renders.
This is static generation, not a runtime rendering server or React hydration.

Known routes in `vercel.json` map to their generated documents. Unmatched paths
use the generated `404.html`, with `noindex, follow` and no canonical URL, according
to [Vercel's static 404 behavior](https://vercel.com/kb/guide/custom-404-page).
There is no homepage catch-all rewrite. Client navigation also handles unknown
pages and restores indexable metadata when returning to a valid page.

When adding a public page or guide, update its route/metadata, Vercel mapping, and
`public/sitemap.xml` together. Tests check deployment mappings against generated
pages. Vite's local development/preview fallback is not a verification of the
production HTTP 404 status; check that on a Vercel preview deployment.

Set the Vercel output directory to `dist` and the build command to `npm run build`.
Provide `VITE_FORMSPREE_ID` in the appropriate deployment environments.

Social previews use the committed `public/og-image.png` (1200 × 630). To regenerate
it from the SVG on Linux with system librsvg and Cairo installed, run
`python3 scripts/render-og.py`. Normal builds require no image tools.

## Verification

Vitest and Testing Library cover real request outcomes, timeouts, cancellation,
concurrent submission, plan selection/history, preference synchronization,
keyboard navigation, route focus, reduced motion, metadata transitions, generated
HTML escaping, and the copied SDK example against a mock provider. Tests do not
submit real forms or send emails.

TypeScript checks both application code (`tsconfig.json`) and build scripts,
configuration, and Node-based tests (`tsconfig.tools.json`). ESLint covers the
whole repository, and Prettier formatting is enforced in CI. Add regression tests
for behavior changes; keep visual-only changes lightweight.
