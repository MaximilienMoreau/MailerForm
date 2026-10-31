import SiteLink from '@/components/SiteLink'
import { motion } from '@/components/Motion'
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react'
import { fadeUp } from '@/lib/motion'

const trust = [
  'Authentication checks',
  'Preview before sending',
  'No payment to request access',
] as const

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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-24 pb-12 flex flex-col items-center text-center">
        <motion.div
          {...fadeUp(0)}
          className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 rounded-full px-4 py-1.5 text-sm text-brand-400 font-medium mb-6 sm:mb-8"
        >
          <Zap size={13} fill="currentColor" aria-hidden />
          Email infrastructure · Early access
        </motion.div>

        <motion.h1
          {...fadeUp(0.1)}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] max-w-4xl sm:leading-none lg:leading-none"
        >
          Check{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r/srgb from-brand-400 to-sky-400">
            delivery risks
          </span>{' '}
          before sending.
          <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r/srgb from-brand-400 to-sky-400">
            Send
          </span>{' '}
          with confidence.
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl leading-relaxed sm:leading-7"
        >
          Inspect authentication and content, fix delivery risks, then send through one API. Try the
          sample analysis and request early access.
        </motion.p>

        <motion.div
          {...fadeUp(0.3)}
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
        >
          {trust.map((t) => (
            <span key={t} className="flex items-center gap-1.5 text-sm text-gray-300 font-medium">
              <CheckCircle2 size={13} className="text-emerald-500" aria-hidden />
              {t}
            </span>
          ))}
        </motion.div>

        <motion.div
          {...fadeUp(0.38)}
          className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <SiteLink href="#cta" className="btn-primary text-base px-8 py-3.5">
            Request early access
            <ArrowRight size={16} aria-hidden />
          </SiteLink>
          <SiteLink href="#deliverability" className="btn-secondary text-base px-8 py-3.5">
            See how it works
          </SiteLink>
        </motion.div>
      </div>
    </section>
  )
}
