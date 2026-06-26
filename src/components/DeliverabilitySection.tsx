import { type ReactElement } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, ArrowRight, CheckCircle2, Clock, Cpu } from 'lucide-react'
import { EASE, VP_SM } from '@/lib/motion'

type CheckStatus = 'ok' | 'warn' | 'error'

interface Check {
  label:  string
  status: CheckStatus
  detail: string
}

const checks: Check[] = [
  { label: 'Spam trigger words',   status: 'warn', detail: '3 found: "free", "urgent", "guarantee"' },
  { label: 'Sender domain SPF',    status: 'ok',   detail: 'Valid ✓' },
  { label: 'DKIM signature',       status: 'ok',   detail: 'Signed & aligned' },
  { label: 'DMARC policy',         status: 'ok',   detail: 'p=quarantine' },
  { label: 'Link reputation',      status: 'ok',   detail: '5 links, all clean' },
  { label: 'Image-to-text ratio',  status: 'warn', detail: '78% images, consider more text' },
  { label: 'Unsubscribe header',   status: 'ok',   detail: 'List-Unsubscribe present' },
  { label: 'HTML/Text multipart',  status: 'ok',   detail: 'Both parts included' },
]

const statusMeta: Record<CheckStatus, { icon: ReactElement; color: string }> = {
  ok:    { icon: <CheckCircle2 size={13} className="text-emerald-400" aria-hidden />, color: 'text-gray-500' },
  warn:  { icon: <AlertCircle  size={13} className="text-amber-400"   aria-hidden />, color: 'text-amber-400' },
  error: { icon: <AlertCircle  size={13} className="text-red-400"     aria-hidden />, color: 'text-red-400' },
}

const bullets = [
  'Content & spam phrase analysis',
  'Domain & IP reputation lookup',
  'Authentication check (SPF, DKIM, DMARC)',
  'Historical engagement signals',
  'Inbox vs spam prediction per major ISP',
] as const

export default function DeliverabilitySection() {
  return (
    <section id="deliverability" className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_50%,rgba(51,102,255,0.07),transparent)]" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Copy */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP_SM}
              transition={{ duration: 0.5, ease: EASE }}
              className="tag bg-violet-500/10 text-violet-400 border border-violet-500/20 inline-flex mb-4"
            >
              <Cpu size={12} aria-hidden />
              Deliverability Intelligence
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP_SM}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-6"
            >
              Know exactly why your emails land in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-brand-400">
                inbox or spam
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP_SM}
              transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
              className="text-gray-400 leading-relaxed mb-8"
            >
              Before any send, MailerForm runs a 40-point analysis across content, authentication, infrastructure, and engagement history.
              You get a detailed report with specific fixes in under 2 seconds.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP_SM}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
              className="space-y-3 mb-8"
              aria-label="Deliverability analysis capabilities"
            >
              {bullets.map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0" aria-hidden />
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP_SM}
              transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
              className="flex items-center gap-4"
            >
              <a href="#pricing" className="btn-primary text-sm">
                Try the analyzer
                <ArrowRight size={14} aria-hidden />
              </a>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Clock size={12} aria-hidden />
                Results in &lt;2s
              </div>
            </motion.div>
          </div>

          {/* Report card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={VP_SM}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          >
            <div className="bg-gray-900/80 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 backdrop-blur-sm">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5" aria-hidden>
                    <span className="w-3 h-3 rounded-full bg-red-500/70" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
                  </div>
                  <span className="text-xs text-gray-500 ml-2 font-mono">pre-send-report.json</span>
                </div>
                <span className="text-[10px] text-gray-600 font-mono">campaign_q2_launch.html</span>
              </div>

              <div className="p-5 space-y-1" role="list" aria-label="Pre-send analysis results">
                {checks.map((c, i) => {
                  const meta = statusMeta[c.status]
                  return (
                    <motion.div
                      key={c.label}
                      initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={VP_SM}
                      transition={{ duration: 0.35, delay: 0.4 + i * 0.055, ease: EASE }}
                      role="listitem"
                      className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/[0.03] transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        {meta.icon}
                        <span className="text-sm text-gray-300">{c.label}</span>
                      </div>
                      <span className={`text-xs font-mono ${meta.color}`}>{c.detail}</span>
                    </motion.div>
                  )
                })}
              </div>

              <div className="px-5 py-4 border-t border-white/[0.06] bg-white/[0.02] flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Deliverability score</p>
                  <p className="text-2xl font-black text-white mt-0.5 tabular-nums">
                    94 <span className="text-sm text-gray-500 font-normal">/ 100</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Predicted inbox rate</p>
                  <p className="text-2xl font-black text-emerald-400 mt-0.5 tabular-nums">97.3%</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
