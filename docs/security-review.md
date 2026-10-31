# Code and security review

Reviewed on 2026-10-31. Scope: the tracked React application, public assets, static
renderer, request handling, deployment configuration, dependencies, CI, and tests.
This is a source review and local verification, not a penetration test of a live
deployment or an audit of Formspree, Vercel, DNS, mailboxes, or organization settings.

## Architecture and trust boundaries

This repository ships a static website. It has no authentication server, database,
payment processing, email delivery backend, or privileged API keys. The two forms
send email addresses, selected preferences, and newsletter consent to Formspree.
The form ID is deliberately public. A plan in the URL is an untrusted preference,
never an authorization or billing decision.

React renders data as text; the app does not insert user-controlled HTML or execute
user-controlled code. Build-time metadata is escaped for HTML/XML and inline JSON-LD
escapes `<` to prevent script-element termination. Existing regression tests cover
hostile titles, descriptions, and structured data. A pattern scan of tracked files
and Git history found no matching private-key, AWS access-key-ID, or GitHub-token
patterns. This is not proof that every possible secret format is absent.

## Corrections

- Upgraded Happy DOM from 20.14.6 to 21.0.4, addressing the reported host-code
  execution and SSRF advisories in the test environment. It is not shipped to users.
- Upgraded Vite from 6.4.4 to 6.4.5, addressing the reported development-server
  filesystem-denial bypass. Added denial patterns for local credential and agent
  directories, preserving Vite's default denied files. A local HTTP check with
  synthetic files verified 403 responses for environment, Git, AWS, and agent files,
  including raw/import query variants; no real secrets were read.
- Moved the development/CI baseline to maintained Node 22; Node 20 is end of life.
- Added a deployment CSP, anti-framing headers, MIME sniffing protection, a referrer
  policy, HSTS without subdomain/preload commitments, and disabled unused browser
  permissions. Preview serves the same policy for browser verification. Inline
  styles are allowed for Framer Motion and the static no-JavaScript fallback;
  inline executable scripts and inline event handlers are not allowed.
- Requests omit credentials and reject redirects instead of forwarding form data
  to an unexpected destination. Existing deadlines, cancellation, and concurrent
  request protection remain in place.
- Bounded email input lengths in both UI and submission handlers. This prevents
  accidental oversized requests from these forms; provider-side validation is
  still required.
- Restricted CI token permissions, disabled persisted checkout credentials,
  pinned official actions to verified commit IDs, bounded job duration, and added
  dependency audit gates and weekly runs.
- Fixed active-section navigation precedence and removed unused application code.

## Remaining dependency advisory

After the direct upgrades, npm reports 13 moderate development dependency entries
associated with [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249)
in minimatch and its ESLint consumers. These are propagated package entries, not
13 independent root vulnerabilities. npm offers no compatible remediation for the
current ESLint dependency tree. The reported issue concerns attacker-controlled
glob patterns; this repository uses trusted, checked-in lint configuration. It is
not part of the deployed browser bundle.

Do not force all minimatch versions to major 11: legacy consumers use a different
API. Track upstream fixes and rerun `npm audit`. CI rejects moderate-or-higher
production advisories and high/critical advisories anywhere, while keeping this
remaining development advisory visible. This exception does not cover production
dependencies or high/critical findings.

## Verification and operational limits

Final local results under Node 22.23.1: TypeScript, ESLint, formatting, and all
115 unit/integration tests passed. The production build and 45 Chromium browser
journeys passed across desktop and mobile; one desktop-inapplicable mobile test
was skipped. Both CSP blocking checks passed. `npm audit --omit=dev` reported zero
vulnerabilities; the full audit reported the 13 moderate development entries
explained above, with zero high or critical findings. These are point-in-time
results and do not cover physical devices or other browser engines.

Run `npm run check` and `npm run test:e2e` with the Node version in `.nvmrc`.
The browser suite exercises the production build under its CSP, including form
success/failure, consent, selected plans, navigation, inline-script blocking,
and unapproved cross-origin connection blocking. The static renderer tests include
complete documents and injection escaping. No test submits a real form.

Before accepting production requests:

1. Check the deployed HTTP response headers, HTTPS, route rewrites, and real 404
   status. Local preview verifies the policy configuration, not Vercel account
   settings. Hosts other than Vercel must configure equivalent headers themselves.
2. Configure Formspree's provider-side filtering and domain restrictions. Domain
   restrictions use the referrer and are an abuse filter, not authentication.
   Client-side honeypots, consent checks, and input limits are bypassable. Ensure
   downstream handling validates purpose, consent, and preferences; never use a
   public form payload to activate service, bill a plan, or authorize access.
3. Confirm who can access requests, retention/deletion settings, newsletter consent
   evidence and unsubscribe handling, and the real privacy contact details.
4. Keep Vite development servers local. Do not publish the workspace or its local
   credential directories; deploy only `dist/`. Do not put secrets in `VITE_*`.

References: [Happy DOM advisory](https://github.com/advisories/GHSA-834v-8h66-3h79),
[Vite advisory](https://github.com/advisories/GHSA-8g5g-mxqh-grgj),
[Node release status](https://nodejs.org/en/about/previous-releases),
[Vercel headers](https://vercel.com/docs/headers),
[GitHub Actions security](https://docs.github.com/en/actions/reference/security/secure-use),
[Formspree domain restrictions](https://help.formspree.io/articles/form-and-project-settings/restrict-to-domain).
