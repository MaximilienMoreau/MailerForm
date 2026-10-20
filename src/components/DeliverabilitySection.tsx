import SiteLink from '@/components/SiteLink'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Cpu } from 'lucide-react'
import AnalyzerDemo from '@/components/AnalyzerDemo'
import { EASE, VP_SM } from '@/lib/motion'

export default function DeliverabilitySection() {
  return (
    <section id="deliverability" className="py-16 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_50%,rgba(51,102,255,0.07),transparent)]"
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP_SM}
              transition={{ duration: 0.5, ease: EASE }}
              className="tag bg-violet-500/10 text-violet-400 border border-violet-500/20 inline-flex mb-4"
            >
              <Cpu size={12} aria-hidden />
              Deliverability Intelligence
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP_SM}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-6 sm:leading-10"
            >
              Find risks, apply fixes,{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r/srgb from-violet-400 to-brand-400">
                then send
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP_SM}
              transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
              className="text-gray-400 leading-relaxed mb-8"
            >
              Explore three sample reports. See how authentication and content issues change the
              score, then apply the suggested corrections.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP_SM}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
              className="space-y-3 mb-8"
              aria-label="Deliverability analysis capabilities"
            >
              {[
                'Analyze: inspect authentication and content',
                'Correct: follow specific recommendations',
                'Send: keep transactional and marketing traffic separate',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0" aria-hidden />
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP_SM}
              transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
              className="flex items-center gap-4"
            >
              <SiteLink href="#analyzer-demo" className="btn-primary text-sm">
                Explore sample reports <ArrowRight size={14} aria-hidden />
              </SiteLink>
            </motion.div>
          </div>

          {/* Report card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP_SM}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          >
            <AnalyzerDemo />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
