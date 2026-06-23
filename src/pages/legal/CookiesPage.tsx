import { useState, useEffect } from 'react'
import LegalLayout from '@/components/LegalLayout'
import { COOKIE_CONSENT_KEY, type Consent } from '@/lib/consent'

function ConsentManager() {
  const [consent, setConsent] = useState<Consent | null>(
    () => localStorage.getItem(COOKIE_CONSENT_KEY) as Consent | null
  )
  const [reset, setReset] = useState(false)

  useEffect(() => {
    if (!reset) return
    const t = setTimeout(() => setReset(false), 3000)
    return () => clearTimeout(t)
  }, [reset])

  function handleReset() {
    localStorage.removeItem(COOKIE_CONSENT_KEY)
    setConsent(null)
    setReset(true)
  }

  const statusLabel =
    consent === 'accepted' ? 'Accepted'
    : consent === 'declined' ? 'Declined'
    : 'Not set'

  const statusColor =
    consent === 'accepted' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    : consent === 'declined' ? 'text-red-400 bg-red-500/10 border-red-500/20'
    : 'text-gray-400 bg-white/5 border-white/10'

  return (
    <div className="flex flex-wrap items-center gap-3 mt-2">
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${statusColor}`}>
        {statusLabel}
      </span>
      {consent !== null && (
        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-semibold py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-all"
        >
          Reset my preference
        </button>
      )}
      {reset && consent === null && (
        <span className="text-xs text-emerald-400">Done — the banner will reappear on your next visit.</span>
      )}
    </div>
  )
}

interface CookieRow {
  name: string
  purpose: string
  duration: string
  type: 'Essential' | 'Analytics' | 'Preference'
}

const cookies: CookieRow[] = [
  { name: 'mf_session',    purpose: 'Authenticates your dashboard session',         duration: '7 days',   type: 'Essential'  },
  { name: 'mf_csrf',       purpose: 'Prevents cross-site request forgery attacks',  duration: 'Session',  type: 'Essential'  },
  { name: 'mailerform_cookie_consent', purpose: 'Remembers your cookie banner preference', duration: '1 year',   type: 'Preference' },
  { name: 'mf_billing',    purpose: 'Keeps billing country / VAT preference',       duration: '90 days',  type: 'Preference' },
  { name: '_plausible',    purpose: 'Privacy-first page-view analytics (no PII)',   duration: 'Session',  type: 'Analytics'  },
]

const typeColors: Record<CookieRow['type'], string> = {
  Essential:  'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Analytics:  'text-sky-400 bg-sky-500/10 border-sky-500/20',
  Preference: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
}

export default function CookiesPage() {
  return (
    <LegalLayout
      title="Cookie Policy"
      subtitle="What cookies MailerForm uses and why kept short and honest."
      lastUpdated="June 30, 2026"
    >
      <div className="section-box">
        <p>
          We keep our cookie footprint as small as possible. MailerForm uses{' '}
          <strong>no third-party advertising cookies</strong> and <strong>no cross-site tracking</strong>.
          This page explains every cookie we set, why we set it, and how you can control it.
        </p>
      </div>

      <h2>1. What Is a Cookie?</h2>
      <p>
        A cookie is a small text file stored in your browser when you visit a website. Cookies allow
        the site to remember information between page loads (e.g., that you&apos;re logged in) or between
        separate visits (e.g., your preferences).
      </p>
      <p>
        Some cookies are deleted when you close your browser (&ldquo;session cookies&rdquo;); others persist for
        a set duration (&ldquo;persistent cookies&rdquo;).
      </p>

      <h2>2. Cookies We Use</h2>
      <p>
        The table below lists every cookie placed by MailerForm. We do not use any cookies from
        advertising networks, social media platforms, or data brokers.
      </p>

      {/* Cookie table */}
      <div className="overflow-x-auto rounded-xl border border-white/[0.07] mb-6">
        <table className="w-full min-w-[540px] text-sm" aria-label="List of cookies used by MailerForm">
          <thead>
            <tr className="border-b border-white/[0.07]">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Purpose</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {cookies.map(c => (
              <tr key={c.name} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-gray-300">{c.name}</td>
                <td className="px-4 py-3 text-gray-400">{c.purpose}</td>
                <td className="px-4 py-3 text-gray-500">{c.duration}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${typeColors[c.type]}`}>
                    {c.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>3. Cookie Categories Explained</h2>

      <h3>Essential cookies</h3>
      <p>
        Strictly necessary for the platform to work. Without them you cannot log in or use the
        dashboard. These cookies cannot be disabled while using the service.
      </p>

      <h3>Preference cookies</h3>
      <p>
        Remember your choices (cookie banner decision, billing region) so you don&apos;t have to repeat
        them on every visit. These are optional and can be cleared via your browser.
      </p>

      <h3>Analytics cookies</h3>
      <p>
        We use <a href="https://plausible.io" target="_blank" rel="noreferrer">Plausible Analytics</a>,
        a privacy-first, GDPR-compliant tool that collects no personal data and stores no cross-site
        identifiers. The session cookie it sets is anonymous and cannot track you across websites.
        We do not use Google Analytics.
      </p>

      <h2>4. Managing Cookies</h2>
      <p>
        You can control cookies through several mechanisms:
      </p>
      <div className="section-box mb-4">
        <p className="text-sm text-gray-400 mb-1">Your current preference on this browser:</p>
        <ConsentManager />
      </div>
      <ul>
        <li>
          <strong>Cookie banner</strong> — when you first visit mailerform.io we ask for your
          preference. You can reset it at any time by clearing the{' '}
          <code className="text-xs font-mono text-gray-300 bg-white/5 px-1.5 py-0.5 rounded">mailerform_cookie_consent</code>{' '}
          key from your browser&apos;s local storage.
        </li>
        <li>
          <strong>Browser settings</strong> — all modern browsers allow you to view, block, or
          delete cookies. Note that blocking essential cookies will prevent you from logging in.
          See your browser&apos;s documentation for instructions.
        </li>
        <li>
          <strong>Opt-out of analytics</strong> — Plausible respects the{' '}
          <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/DNT" target="_blank" rel="noreferrer">
            Do Not Track
          </a>{' '}
          header. You can also install the{' '}
          <a href="https://plausible.io/docs/excluding" target="_blank" rel="noreferrer">
            Plausible exclusion script
          </a>{' '}
          in your browser.
        </li>
      </ul>

      <h2>5. Third-Party Embeds</h2>
      <p>
        Our marketing website does not embed any third-party scripts (no YouTube, no social widgets,
        no Intercom, no Hotjar). The only external script loaded is the Plausible analytics snippet,
        served from <code className="text-xs font-mono text-gray-300 bg-white/5 px-1.5 py-0.5 rounded">plausible.io</code>.
      </p>

      <h2>6. Changes to This Policy</h2>
      <p>
        If we add new cookies or change existing ones, we will update this page and, if the changes
        are significant, display a fresh cookie consent banner.
      </p>

      <h2>7. Contact</h2>
      <p>
        Questions about cookies?{' '}
        <a href="mailto:privacy@mailerform.io">privacy@mailerform.io</a>
      </p>
    </LegalLayout>
  )
}
