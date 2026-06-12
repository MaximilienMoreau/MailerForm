import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react'
import { staggerContainer, staggerItem } from './ui/FadeIn'
import DeliverabilityCard from './DeliverabilityCard'

const EASE = [0.22, 1, 0.36, 1] as const

const stats = [
  { value: '99.2%', label: 'Inbox placement rate' },
  { value: '260+',  label: 'API endpoints' },
  { value: '<80ms', label: 'Delivery latency' },
  { value: '10B+',  label: 'Emails analyzed' },
] as const

const trust = [
  'GDPR & CAN-SPAM compliant',
  'SOC 2 Type II',
  'Free 10k emails/mo',
] as const

function fadeIn(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: EASE },
  }
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(51,102,255,0.15),transparent)]" aria-hidden />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center">

        <motion.div {...fadeIn(0)} className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 rounded-full px-4 py-1.5 text-sm text-brand-400 font-medium mb-8">
          <Zap size={13} fill="currentColor" aria-hidden />
          Email Infrastructure Platform — Built for SaaS
        </motion.div>

        <motion.h1 {...fadeIn(0.1)} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] max-w-4xl">
          Stop{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-sky-400">hoping</span>{' '}
          emails land in inbox.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-sky-400">Know</span>{' '}
          before you send.
        </motion.h1>

        <motion.p {...fadeIn(0.2)} className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl leading-relaxed">
          MailForm combines transactional delivery, marketing automation, and{' '}
          <strong className="text-gray-200 font-semibold">deliverability intelligence</strong>{' '}
          in one API-first platform. Analyze, predict, and fix inbox placement — before a single send.
        </motion.p>

        <motion.div {...fadeIn(0.3)} className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {trust.map(t => (
            <span key={t} className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <CheckCircle2 size={13} className="text-emerald-500" aria-hidden />
              {t}
            </span>
          ))}
        </motion.div>

        <motion.div {...fadeIn(0.38)} className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <a href="#pricing" className="btn-primary text-base px-8 py-3.5">
            Start for free
            <ArrowRight size={16} aria-hidden />
          </a>
          <a href="#features" className="btn-secondary text-base px-8 py-3.5">
            See how it works
          </a>
        </motion.div>

        <motion.dl
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 w-full max-w-3xl"
        >
          {stats.map(s => (
            <motion.div key={s.label} variants={staggerItem} className="flex flex-col-reverse items-center">
              <dt className="text-sm text-gray-500 mt-1 text-center">{s.label}</dt>
              <dd className="text-3xl font-extrabold text-white tracking-tight tabular-nums">{s.value}</dd>
            </motion.div>
          ))}
        </motion.dl>

        <motion.div {...fadeIn(0.65)} transition={{ duration: 0.7, delay: 0.65, ease: EASE }} className="mt-20 w-full max-w-2xl">
          <DeliverabilityCard />
        </motion.div>
      </div>
    </section>
  )
}
