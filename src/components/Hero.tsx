import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Shield, Zap } from 'lucide-react'

const stats = [
  { value: '99.2%', label: 'Inbox placement rate' },
  { value: '260+', label: 'API endpoints' },
  { value: '<80ms', label: 'Delivery latency' },
  { value: '10B+', label: 'Emails analyzed' },
]

const trust = [
  'GDPR & CAN-SPAM compliant',
  'SOC 2 Type II',
  'Free 10k emails/mo',
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(51,102,255,0.15),transparent)]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 rounded-full px-4 py-1.5 text-sm text-brand-400 font-medium mb-8"
        >
          <Zap size={13} fill="currentColor" />
          Email Infrastructure Platform — Built for SaaS
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] max-w-4xl"
        >
          Stop{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-sky-400">
            hoping
          </span>{' '}
          emails land in inbox.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-sky-400">
            Know
          </span>{' '}
          before you send.
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl leading-relaxed"
        >
          MailForm combines transactional delivery, marketing automation, and{' '}
          <strong className="text-gray-200 font-semibold">deliverability intelligence</strong>{' '}
          in one API-first platform. Analyze, predict, and fix inbox placement — before a single send.
        </motion.p>

        {/* Trust chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
        >
          {trust.map(t => (
            <span key={t} className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <CheckCircle2 size={13} className="text-emerald-500" />
              {t}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <a href="#" className="btn-primary text-base px-8 py-3.5">
            Start for free
            <ArrowRight size={16} />
          </a>
          <a href="#features" className="btn-secondary text-base px-8 py-3.5">
            See how it works
          </a>
        </motion.div>

        {/* Stats */}
        <motion.dl
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 w-full max-w-3xl"
        >
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <dd className="text-3xl font-extrabold text-white tracking-tight m-0">{s.value}</dd>
              <dt className="text-sm text-gray-500 mt-1 text-center">{s.label}</dt>
            </div>
          ))}
        </motion.dl>

        {/* Hero visual — deliverability card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 w-full max-w-2xl"
        >
          <DeliverabilityCard />
        </motion.div>
      </div>
    </section>
  )
}

function DeliverabilityCard() {
  const scores = [
    { label: 'Content health', value: 91, color: 'bg-emerald-500' },
    { label: 'Domain reputation', value: 88, color: 'bg-emerald-500' },
    { label: 'Link safety', value: 100, color: 'bg-emerald-500' },
    { label: 'Spam risk', value: 4, color: 'bg-red-400', invert: true },
  ]

  return (
    <div className="bg-gray-900/80 border border-white/10 rounded-2xl p-6 text-left shadow-2xl shadow-black/50 backdrop-blur">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-brand-400" />
          <span className="text-sm font-semibold text-white">Pre-send Analysis</span>
        </div>
        <span className="tag bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
          Inbox safe
        </span>
      </div>

      {/* Score */}
      <div className="flex items-end gap-3 mb-6">
        <span className="text-6xl font-black text-white">94</span>
        <div className="pb-2">
          <span className="text-gray-400 text-sm">/100 Deliverability score</span>
          <p className="text-xs text-emerald-400 mt-0.5 font-medium">+6 from last campaign</p>
        </div>
      </div>

      {/* Bars */}
      <div className="space-y-3">
        {scores.map(s => (
          <div key={s.label}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-gray-400">{s.label}</span>
              <span className={`font-semibold ${s.invert ? 'text-red-400' : 'text-white'}`}>
                {s.invert ? `${s.value}% risk` : `${s.value}%`}
              </span>
            </div>
            <div className="score-bar">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: s.value / 100 }}
                transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
                style={{ originX: 0 }}
                className={`h-full w-full rounded-full ${s.color}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-5 pt-5 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-xs text-gray-500">2 warnings · 0 blockers</span>
        <button className="text-xs text-brand-400 hover:text-brand-300 font-medium transition-colors flex items-center gap-1">
          View full report <ArrowRight size={11} />
        </button>
      </div>
    </div>
  )
}
