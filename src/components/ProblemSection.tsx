import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react'
import { EASE, VP_MD } from '@/lib/motion'

const before = [
  'Send campaign to 50k contacts',
  'Wait 24–48h for delivery data',
  'Discover 23% went to spam',
  'Domain reputation already damaged',
  'Scramble to figure out why',
] as const

const after = [
  'Draft your campaign',
  'Run pre-send analysis (< 2s)',
  'Fix 3 flagged issues immediately',
  'Send with 94/100 deliverability score',
  'Track inbox placement in real-time',
] as const

export default function ProblemSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(51,102,255,0.05),transparent)]" aria-hidden />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP_MD}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex justify-center mb-4"
        >
          <span className="tag bg-orange-500/10 text-orange-400 border border-orange-500/20">
            <AlertTriangle size={12} aria-hidden />
            The problem with traditional ESPs
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP_MD}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white text-center max-w-3xl mx-auto leading-tight mb-6"
        >
          You find out about spam problems{' '}
          <span className="text-orange-400">after</span> the damage is done
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP_MD}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
          className="text-gray-400 text-center text-lg max-w-2xl mx-auto mb-16"
        >
          SendGrid, Mailgun, and every other ESP tell you what happened.{' '}
          <span className="text-gray-200 font-medium">MailForm tells you what will happen.</span>
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={VP_MD}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="bg-red-500/[0.04] border border-red-500/15 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <XCircle size={16} className="text-red-400" aria-hidden />
              <span className="text-sm font-semibold text-red-400">Without MailForm</span>
            </div>
            <ol className="space-y-3">
              {before.map((step, i) => (
                <li key={step} className="flex items-start gap-3 text-sm text-gray-400">
                  <span className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-mono font-bold tabular-nums" aria-hidden>
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={VP_MD}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            className="bg-emerald-500/[0.04] border border-emerald-500/15 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <CheckCircle2 size={16} className="text-emerald-400" aria-hidden />
              <span className="text-sm font-semibold text-emerald-400">With MailForm</span>
            </div>
            <ol className="space-y-3">
              {after.map((step, i) => (
                <li key={step} className="flex items-start gap-3 text-sm text-gray-300">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-mono font-bold tabular-nums" aria-hidden>
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP_MD}
          transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
          className="text-center text-sm text-gray-500 mt-10 max-w-lg mx-auto"
        >
          Just like SEO tools shifted from measuring rankings to predicting them — MailForm shifts email from reactive sending to{' '}
          <span className="text-gray-300 font-medium">proactive deliverability.</span>
        </motion.p>
      </div>
    </section>
  )
}
