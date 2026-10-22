import SiteLink from '@/components/SiteLink'
import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from '@/components/Motion'
import { useInView } from 'framer-motion'
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react'
import DeliverabilityCard from './DeliverabilityCard'
import { EASE, fadeUp, staggerContainer, staggerItem } from '@/lib/motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { stats, type Stat } from '@/data/stats'

const EASE_OUT_QUART = (t: number) => 1 - Math.pow(1 - t, 4)

const trust = [
  'Authentication checks',
  'Preview before sending',
  'No payment to request access',
] as const

function useCountUp(target: number, decimals: number, duration = 1.8) {
  const [count, setCount] = useState(0)
  const reducedMotion = usePrefersReducedMotion()
  const started = useRef(false)
  const frameRef = useRef(0)

  useEffect(() => {
    if (reducedMotion) cancelAnimationFrame(frameRef.current)
    return () => {
      cancelAnimationFrame(frameRef.current)
      started.current = false
    }
  }, [reducedMotion])

  const start = useCallback(() => {
    if (reducedMotion || started.current) return
    started.current = true
    const begin = performance.now()
    function tick(now: number) {
      const elapsed = (now - begin) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const value = parseFloat((EASE_OUT_QUART(progress) * target).toFixed(decimals))
      setCount(value)
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }
    frameRef.current = requestAnimationFrame(tick)
  }, [target, decimals, duration, reducedMotion])

  return { count: reducedMotion ? target : count, start }
}

function StatItem({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const { count, start } = useCountUp(stat.value, stat.decimals)

  useEffect(() => {
    if (inView) start()
  }, [inView, start])

  const display = stat.decimals > 0 ? count.toFixed(stat.decimals) : count.toFixed(0)

  const finalDisplay = stat.decimals > 0 ? stat.value.toFixed(stat.decimals) : stat.value.toFixed(0)

  return (
    <motion.div ref={ref} variants={staggerItem} className="flex flex-col-reverse items-center">
      <dt className="text-sm text-gray-500 mt-1 text-center">{stat.label}</dt>
      <dd className="text-3xl font-extrabold text-white tracking-tight tabular-nums">
        <span aria-hidden>
          {stat.prefix}
          {display}
          {stat.suffix}
        </span>
        <span className="sr-only">
          {stat.prefix}
          {finalDisplay}
          {stat.suffix}
        </span>
      </dd>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center pt-16 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-grid-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(51,102,255,0.15),transparent)]"
        aria-hidden
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[800px] lg:h-[800px] bg-brand-500/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 flex flex-col items-center text-center">
        <motion.div
          {...fadeUp(0)}
          className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 rounded-full px-4 py-1.5 text-sm text-brand-400 font-medium mb-8"
        >
          <Zap size={13} fill="currentColor" aria-hidden />
          Email infrastructure preview · Early access
        </motion.div>

        <motion.h1
          {...fadeUp(0.1)}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] max-w-4xl sm:leading-none lg:leading-none"
        >
          Stop{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r/srgb from-brand-400 to-sky-400">
            hoping
          </span>{' '}
          emails land in inbox.
          <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r/srgb from-brand-400 to-sky-400">
            Know
          </span>{' '}
          before you send.
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl leading-relaxed sm:leading-7"
        >
          Analyze your email, fix delivery risks, then send through one API. Built for SaaS teams
          managing transactional and marketing traffic. Explore preset demonstrations; production
          capabilities and availability are confirmed before activation.
        </motion.p>

        <motion.div
          {...fadeUp(0.3)}
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
        >
          {trust.map((t) => (
            <span key={t} className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <CheckCircle2 size={13} className="text-emerald-500" aria-hidden />
              {t}
            </span>
          ))}
        </motion.div>

        <motion.div
          {...fadeUp(0.38)}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <SiteLink href="#cta" className="btn-primary text-base px-8 py-3.5">
            Request early access
            <ArrowRight size={16} aria-hidden />
          </SiteLink>
          <SiteLink href="#deliverability" className="btn-secondary text-base px-8 py-3.5">
            See how it works
          </SiteLink>
        </motion.div>

        <p className="mt-10 text-xs text-gray-400">Explore the workflow before requesting access</p>
        <motion.dl
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-8 w-full max-w-3xl"
        >
          {stats.map((s) => (
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
