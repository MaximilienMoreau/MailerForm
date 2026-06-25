import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react'
import DeliverabilityCard from './DeliverabilityCard'
import { EASE, fadeUp, staggerContainer, staggerItem } from '@/lib/motion'

const EASE_OUT_QUART = (t: number) => 1 - Math.pow(1 - t, 4)

interface Stat {
  prefix: string
  value: number
  suffix: string
  decimals: number
  label: string
}

const stats: Stat[] = [
  { prefix: '', value: 99.2, suffix: '%',  decimals: 1, label: 'Inbox placement rate' },
  { prefix: '', value: 260,  suffix: '+',  decimals: 0, label: 'API endpoints' },
  { prefix: '<', value: 80,  suffix: 'ms', decimals: 0, label: 'Delivery latency' },
  { prefix: '', value: 10,   suffix: 'B+', decimals: 0, label: 'Emails analyzed' },
]

const trust = [
  'GDPR & CAN-SPAM compliant',
  'SOC 2 Type II',
  'Free 10k emails/mo',
] as const

function useCountUp(target: number, decimals: number, duration = 1.8) {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)
  const started = useRef(false)
  const frameRef = useRef(0)

  useEffect(() => {
    return () => { cancelAnimationFrame(frameRef.current) }
  }, [])

  const start = useCallback(() => {
    if (started.current) return
    started.current = true
    const begin = performance.now()
    function tick(now: number) {
      const elapsed = (now - begin) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const value = parseFloat((EASE_OUT_QUART(progress) * target).toFixed(decimals))
      setCount(value)
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        setDone(true)
      }
    }
    frameRef.current = requestAnimationFrame(tick)
  }, [target, decimals, duration])

  return { count, done, start }
}

function StatItem({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const { count, done, start } = useCountUp(stat.value, stat.decimals)

  useEffect(() => {
    if (inView) start()
  }, [inView, start])

  const display =
    stat.decimals > 0
      ? count.toFixed(stat.decimals)
      : count.toFixed(0)

  const finalDisplay =
    stat.decimals > 0
      ? stat.value.toFixed(stat.decimals)
      : stat.value.toFixed(0)

  return (
    <motion.div ref={ref} variants={staggerItem} className="flex flex-col-reverse items-center">
      <dt className="text-sm text-gray-500 mt-1 text-center">{stat.label}</dt>
      <dd className="text-3xl font-extrabold text-white tracking-tight tabular-nums" aria-hidden>
        {stat.prefix}{display}{stat.suffix}
      </dd>
      {/* Announce only the final value to screen readers, not every animation frame */}
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {done ? `${stat.prefix}${finalDisplay}${stat.suffix} ${stat.label}` : ''}
      </span>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(51,102,255,0.15),transparent)]" aria-hidden />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center">

        <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 rounded-full px-4 py-1.5 text-sm text-brand-400 font-medium mb-8">
          <Zap size={13} fill="currentColor" aria-hidden />
          Email Infrastructure Platform. Built for SaaS
        </motion.div>

        <motion.h1 {...fadeUp(0.1)} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] max-w-4xl">
          Stop{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-sky-400">hoping</span>{' '}
          emails land in inbox.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-sky-400">Know</span>{' '}
          before you send.
        </motion.h1>

        <motion.p {...fadeUp(0.2)} className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl leading-relaxed">
          MailerForm combines transactional delivery, marketing automation, and{' '}
          <strong className="text-gray-200 font-semibold">deliverability intelligence</strong>{' '}
          in one API-first platform. Analyze, predict, and fix inbox placement before a single send.
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {trust.map(t => (
            <span key={t} className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <CheckCircle2 size={13} className="text-emerald-500" aria-hidden />
              {t}
            </span>
          ))}
        </motion.div>

        <motion.div {...fadeUp(0.38)} className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <a href="#cta" className="btn-primary text-base px-8 py-3.5">
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
            <StatItem key={s.label} stat={s} />
          ))}
        </motion.dl>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: EASE }}
          className="mt-20 w-full max-w-2xl"
        >
          <DeliverabilityCard />
        </motion.div>
      </div>
    </section>
  )
}
