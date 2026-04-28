import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { ArrowRight, Zap } from 'lucide-react'

export default function CtaSection() {
  const { ref, inView } = useInView(0.2)

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(51,102,255,0.12),transparent)]" />
      <div className="absolute inset-0 bg-grid-white [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="w-14 h-14 bg-brand-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand-500/30"
        >
          <Zap size={24} className="text-white" fill="white" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6"
        >
          Your emails deserve to land in inbox.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-sky-400">
            Every time.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-lg text-gray-400 mb-10 max-w-xl mx-auto"
        >
          Join thousands of SaaS teams using MailForm to analyze, send, and optimize their email infrastructure.
          Free for up to 10,000 emails/month.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#" className="btn-primary text-base px-8 py-4">
            Start for free — no card needed
            <ArrowRight size={16} />
          </a>
          <a href="#" className="btn-secondary text-base px-8 py-4">
            View documentation
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 text-xs text-gray-600"
        >
          No credit card · 10k emails free · Cancel anytime
        </motion.p>
      </div>
    </section>
  )
}
