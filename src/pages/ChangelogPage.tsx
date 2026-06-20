import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { Zap, Star, Bug, Wrench } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { EASE, VP, staggerContainer, staggerItem } from '@/lib/motion'

const Footer = lazy(() => import('@/components/Footer'))

type EntryType = 'new' | 'improved' | 'fixed'

interface ChangeEntry {
  type: EntryType
  text: string
}

interface Release {
  version: string
  date: string
  isoDate: string
  badge?: 'Major' | 'Minor'
  summary: string
  changes: ChangeEntry[]
}

const releases: Release[] = [
  {
    version: '1.4.0',
    date: 'June 5, 2025',
    isoDate: '2025-06-05',
    badge: 'Major',
    summary: 'Stream-level analytics dashboard and dedicated IP warm-up tooling.',
    changes: [
      { type: 'new',      text: 'Per-stream analytics dashboard with hourly, daily, and 30-day views' },
      { type: 'new',      text: 'Dedicated IP warm-up scheduler with automatic volume throttling' },
      { type: 'new',      text: 'New API endpoint: GET /v1/streams/:id/reputation' },
      { type: 'improved', text: 'Pre-send analysis now runs in under 1.2s on average (was 2.8s)' },
      { type: 'improved', text: 'Bounce classification now distinguishes 12 sub-types instead of 3' },
      { type: 'fixed',    text: 'Domain health score was incorrectly penalising new domains with no history' },
    ],
  },
  {
    version: '1.3.2',
    date: 'May 19, 2025',
    isoDate: '2025-05-19',
    summary: 'Reliability and performance patch.',
    changes: [
      { type: 'fixed',    text: 'Webhook retries were not honouring the backoff schedule on 5xx responses' },
      { type: 'fixed',    text: 'CSV contact import failed silently when the file contained BOM characters' },
      { type: 'improved', text: 'API latency P99 reduced from 120ms to 76ms for /messages/send' },
      { type: 'improved', text: 'Dashboard loads 40% faster on first paint due to route-level code splitting' },
    ],
  },
  {
    version: '1.3.0',
    date: 'April 28, 2025',
    isoDate: '2025-04-28',
    badge: 'Minor',
    summary: 'CRM automation workflows and GDPR bulk-export.',
    changes: [
      { type: 'new',      text: 'Visual automation workflow builder with drag-and-drop trigger/action blocks' },
      { type: 'new',      text: 'Lifecycle triggers: on_first_open, on_link_click, on_unsubscribe' },
      { type: 'new',      text: 'GDPR bulk-export: download all contact data as JSON or CSV from settings' },
      { type: 'new',      text: 'Contact suppression list API: POST /v1/suppressions with reason field' },
      { type: 'improved', text: 'Segment builder now supports nested AND/OR conditions' },
      { type: 'fixed',    text: 'Tag filter in contact list was case-sensitive — now case-insensitive' },
    ],
  },
  {
    version: '1.2.1',
    date: 'March 14, 2025',
    isoDate: '2025-03-14',
    summary: 'Security patch and SPF/DKIM validation improvements.',
    changes: [
      { type: 'fixed',    text: 'Resolved SSRF vulnerability in the link-safety scanner (reported via responsible disclosure)' },
      { type: 'improved', text: 'SPF/DKIM/DMARC validation now checks alignment, not just existence' },
      { type: 'improved', text: 'Pre-send report now shows exact DNS records that are missing or misconfigured' },
      { type: 'fixed',    text: 'API rate-limit headers (X-RateLimit-*) were missing on 429 responses' },
    ],
  },
  {
    version: '1.2.0',
    date: 'February 10, 2025',
    isoDate: '2025-02-10',
    badge: 'Minor',
    summary: 'White-label option and custom domain tracking.',
    changes: [
      { type: 'new',      text: 'White-label mode: remove all MailForm branding from email headers and dashboard' },
      { type: 'new',      text: 'Custom click-tracking domains: bring your own subdomain (e.g. click.yourdomain.com)' },
      { type: 'new',      text: 'Open-tracking pixel can now be disabled per sending domain' },
      { type: 'improved', text: 'API keys now support fine-grained scopes (read, send, admin)' },
      { type: 'fixed',    text: 'Unsubscribe link was not being injected when using the SMTP relay path' },
    ],
  },
  {
    version: '1.1.0',
    date: 'November 22, 2024',
    isoDate: '2024-11-22',
    badge: 'Minor',
    summary: 'Public launch — Growth and Scale plans, full CRM.',
    changes: [
      { type: 'new',      text: 'Growth plan: 200k emails/month, 5 domains, CRM up to 25k contacts' },
      { type: 'new',      text: 'Scale plan: 2M emails/month, unlimited domains, dedicated IPs, SLA' },
      { type: 'new',      text: 'CRM module: contacts, tags, segments, and engagement scoring' },
      { type: 'new',      text: 'Node.js, Python, Ruby, Go, and PHP SDKs (v1) released' },
      { type: 'new',      text: 'OpenAPI 3.1 specification published at docs.mailform.io/openapi' },
      { type: 'improved', text: 'Pre-send analysis expanded to 40 checks (was 18 in private beta)' },
    ],
  },
  {
    version: '1.0.0',
    date: 'August 5, 2024',
    isoDate: '2024-08-05',
    badge: 'Major',
    summary: 'Private beta — transactional stream and deliverability analysis.',
    changes: [
      { type: 'new', text: 'Transactional email sending with stream separation' },
      { type: 'new', text: 'Pre-send deliverability analysis with spam score, link risk, and domain health' },
      { type: 'new', text: 'Real-time webhook events for opens, clicks, bounces, and complaints' },
      { type: 'new', text: 'Basic analytics dashboard with 90-day retention' },
      { type: 'new', text: 'REST API with 80 initial endpoints' },
    ],
  },
]

const entryMeta: Record<EntryType, { label: string; color: string; icon: typeof Star }> = {
  new:      { label: 'New',      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', icon: Star   },
  improved: { label: 'Improved', color: 'text-sky-400 bg-sky-500/10 border-sky-500/20',            icon: Wrench },
  fixed:    { label: 'Fixed',    color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',      icon: Bug    },
}

const badgeColors: Record<NonNullable<Release['badge']>, string> = {
  Major: 'bg-brand-500 text-white',
  Minor: 'bg-white/10 text-white',
}

export default function ChangelogPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main id="main-content">
        {/* Header */}
        <div className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(51,102,255,0.1),transparent)]" aria-hidden />
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="w-12 h-12 bg-brand-500/10 border border-brand-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6"
              aria-hidden
            >
              <Zap size={20} className="text-brand-400" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
            >
              Changelog
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
              className="text-gray-400 text-lg"
            >
              Everything new, improved, and fixed in MailForm.
            </motion.p>
          </div>
        </div>

        {/* Legend */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: EASE }}
            className="flex flex-wrap gap-3"
          >
            {(Object.entries(entryMeta) as [EntryType, typeof entryMeta[EntryType]][]).map(([, meta]) => {
              const Icon = meta.icon
              return (
                <span
                  key={meta.label}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${meta.color}`}
                >
                  <Icon size={11} aria-hidden />
                  {meta.label}
                </span>
              )
            })}
          </motion.div>
        </div>

        {/* Releases */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-10"
          >
            {releases.map((release) => (
              <motion.article
                key={release.version}
                variants={staggerItem}
                className="bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden"
                aria-labelledby={`release-${release.version}`}
              >
                {/* Release header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-5 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <h2
                      id={`release-${release.version}`}
                      className="text-lg font-extrabold text-white tabular-nums"
                    >
                      v{release.version}
                    </h2>
                    {release.badge && (
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${badgeColors[release.badge]}`}>
                        {release.badge}
                      </span>
                    )}
                  </div>
                  <time className="text-sm text-gray-500" dateTime={release.isoDate}>
                    {release.date}
                  </time>
                </div>

                <div className="px-6 py-5">
                  <p className="text-sm text-gray-400 mb-5 leading-relaxed">{release.summary}</p>

                  <ul className="space-y-3" aria-label={`Changes in v${release.version}`}>
                    {release.changes.map((change) => {
                      const meta = entryMeta[change.type]
                      const Icon = meta.icon
                      return (
                        <li key={change.text} className="flex items-start gap-3">
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 mt-0.5 ${meta.color}`}
                          >
                            <Icon size={9} aria-hidden />
                            {meta.label}
                          </span>
                          <span className="text-sm text-gray-400 leading-relaxed">{change.text}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Subscribe hint */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
            transition={{ duration: 0.5, ease: EASE }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-gray-500">
              Want to be notified of new releases?{' '}
              <a href="/#cta" className="text-brand-400 hover:text-brand-300 transition-colors font-medium underline underline-offset-2">
                Subscribe to updates
              </a>
              {' '}or watch the{' '}
              <a
                href="https://github.com/MaximilienMoreau/MailerForm"
                target="_blank"
                rel="noreferrer"
                className="text-brand-400 hover:text-brand-300 transition-colors font-medium underline underline-offset-2"
              >
                GitHub repo
              </a>.
            </p>
          </motion.div>
        </div>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}
