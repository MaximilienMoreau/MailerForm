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

Tailwind 4 uses its dedicated Vite plugin; PostCSS and Autoprefixer do not need
separate configuration. Run `npm audit` to check the full dependency tree.

## Structure and conventions

| Location | Responsibility |
| --- | --- |
| `src/App.tsx` | Routes, error boundaries, and lazy secondary pages |
| `src/pages/LandingPage.tsx` | Immediate rendering of all homepage sections |
| `src/components/SiteLayout.tsx` | Shared navigation, main landmark, and footer |
| `src/pages/` | Routed pages and editorial/legal content |
| `src/components/` | UI sections and small shared UI components |
| `src/components/Motion.tsx` | Shared motion components with a visible build-time state |
| `src/data/site.ts` | Public paths, page metadata, canonical origin, and social assets |
| `src/data/plans.ts` | Plan definitions and numeric prices in USD |
| `src/lib/planSelection.ts` | Validated query parameters and plan request links |
| `src/data/product.ts` | Shared early-access positioning and stages |
| `src/data/posts.ts` | Guide metadata and complete guide text |
| `src/lib/seo.ts` | Metadata and article schema shared by build and browser |
| `src/hooks/useMeta.ts` | Route metadata ownership, creation, and cleanup |
| `src/hooks/useFormRequest.ts` | One active request per form, deadline, cancellation, and cleanup |
| `scripts/static-pages.ts` | Route metadata, sitemap, and React-generated HTML documents |
| `scripts/render-pages.tsx` | Build-time React rendering of every public route |
| `scripts/render-document.ts` | Complete stream rendering, deadlines, and cleanup on failure |

The `@/` alias resolves to `src/`. Components use typed props; domain rules belong
in plain data/functions rather than JSX. Internal `SiteLink` links use React
Router, retain local query parameters for anchors, and leave external links and
new-tab/download links to the browser. Do not recreate lazy components in render.

Styles use Tailwind 4 and shared classes in `src/index.css`; the CSS `@theme`
block holds the fonts and preserved brand/UI color tokens. Explicit `@source`
paths cover the app and generated HTML. Motion presets live in `src/lib/motion.ts`. Reduced-motion
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

The marketing site does not display a cookie consent banner or read/write a consent
preference. It has no analytics or advertising script. An older
`mailerform_cookie_consent` local-storage value is harmless and unused.
Newsletter consent is collected separately by its form.

## Routing, metadata, and deployment

The production build emits an HTML document for every known public route. Page
metadata and article schema come from the same definitions used at runtime.
The renderer uses the build root, mode, environment directory, and environment prefix.
A render error or timeout aborts the stream and fails the build rather than publishing
a partial page.

Every public document contains the complete page content rendered from the same
React components as the browser app, including homepage sections, legal policies, and
guides. Motion components render their final animation state during the build so the
content remains readable without JavaScript. HTML styles are not rewritten after rendering.
The feature carousel exposes every feature without JavaScript and hides its inactive
controls. All homepage sections render immediately in the browser, so searching the page
and navigating to anchors do not depend on scrolling or viewport observers. Secondary
pages retain route-based code splitting. Shared navigation, main landmarks, and footer
live in `SiteLayout`.
The browser then mounts the interactive app; this is build-time rendering,
not a runtime rendering server or React hydration.
Forms, billing switches, and other interactive demonstrations require JavaScript;
the static document also includes email contact links in the footer.

Known routes in `vercel.json` map to their generated documents. Unmatched paths
use the generated `404.html`, with `noindex, follow` and no canonical URL, according
to [Vercel's static 404 behavior](https://vercel.com/kb/guide/custom-404-page).
There is no homepage catch-all rewrite. Client navigation also handles unknown
pages and restores indexable metadata when returning to a valid page.

When adding a public page or guide, update its route/metadata and Vercel
deployment mappings together. The build generates `dist/sitemap.xml` from the
indexable pages and guides, so there is no separate URL list to maintain. Tests check deployment mappings against generated
pages. Vite's local development/preview fallback is not a verification of the
production HTTP 404 status; check that on a Vercel preview deployment.

Set the Vercel output directory to `dist` and the build command to `npm run build`.
Provide `VITE_FORMSPREE_ID` in the appropriate deployment environments.

Social previews use the committed `public/og-image.png` (1200 × 630). To regenerate
it from the SVG on Linux with system librsvg and Cairo installed, run
`python3 scripts/render-og.py`. Normal builds require no image tools.

## Verification

Static document tests build into a temporary directory and inspect the published HTML,
including complete guides, policies, metadata, and the 404 page.

Vitest and Testing Library cover real request outcomes, timeouts, cancellation,
concurrent submission, plan selection/history, repeated anchor navigation,
keyboard navigation, route focus, reduced motion, metadata transitions, generated
HTML escaping, and the copied SDK example against a mock provider. Tests do not
submit real forms or send emails.

TypeScript checks both application code (`tsconfig.json`) and build scripts,
configuration, and Node-based tests (`tsconfig.tools.json`). ESLint covers the
whole repository, and Prettier formatting is enforced in CI. Add regression tests
for behavior changes; keep visual-only changes lightweight.

## Browser journeys

Install Chromium once with `npx playwright install chromium`, then run
`npm run test:e2e`. On Linux, `npx playwright install --with-deps chromium`
also installs required system libraries. CI runs these journeys automatically.

The Playwright suite tests the production build in Chromium with desktop and
Pixel 7 viewport/touch settings. It covers keyboard navigation, mobile dialog
focus and dismissal, yearly plan persistence, form validation, failed requests
and retry, and newsletter consent. Animations run normally. Mobile emulation is
not a physical-device test or coverage of Safari/Firefox.

Tests build into `dist-e2e/` with a dummy Formspree ID. All Formspree traffic is
blocked unless a test supplies a simulated response; no live request is sent.
The normal `dist/` build is unaffected. Failures retain screenshots and traces
in `test-results/`; view the report with `npx playwright show-report`.
The server lifecycle and device projects follow the
[Playwright configuration](https://playwright.dev/docs/test-webserver).

Tailwind 4 requires modern browsers: Safari 16.4+, Chrome 111+, and Firefox 128+.
See the [official migration guide](https://tailwindcss.com/docs/upgrade-guide).
The migration preserves the existing palette, gradients, focus outlines, button
cursors and responsive line heights. Its visual comparison covered the homepage,
About, blog and privacy pages at desktop and mobile widths; browser journeys also
exercise the mobile menu and forms with normal animations.

## Dependency maintenance

[Dependabot configuration](.github/dependabot.yml) schedules npm and GitHub Actions
version checks every Monday at 09:00 Europe/Paris. Minor and patch updates are
grouped by ecosystem; major upgrades remain separate for review. Version-update
PRs are limited to five for npm and two for Actions. Existing CI validates the
proposals; this configuration does not enable automatic merging.

GitHub reads this configuration from the repository's default branch, so it takes
effect once the file is merged there. Dependabot security alerts/updates have
separate repository settings and limits; the weekly version-update schedule does
not enable or replace those settings. See the
[GitHub configuration reference](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference).

## Preview content

Privacy, cookies, data protection, and terms pages describe the website preview.
They do not promise production hosting regions, completed audits, retention periods,
SLAs, or billing behavior that this repository does not implement. Confirm those
operational details and applicable agreements before activating a production service.
The website privacy text follows the [CNIL information guidance](https://www.cnil.fr/fr/informer-les-personnes)
for explaining purposes, request data, rights, and retention criteria. Provider and
operator details still need to match the real deployment and handling of requests.
