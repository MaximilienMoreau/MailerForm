import { motion } from 'framer-motion'
import { GitBranch, Lock, Mail, Megaphone, TrendingUp } from 'lucide-react'
import { EASE, VP_SM, staggerContainer, staggerItem } from '@/lib/motion'

const transactionalItems = ['Password resets', 'OTP codes', 'Purchase receipts', 'Account alerts'] as const
const marketingItems     = ['Newsletters', 'Product updates', 'Lifecycle campaigns', 'Re-engagement flows'] as const

const TRANSACTIONAL_RATE = 99.8
const MARKETING_RATE     = 96.1

export default function StreamSection() {
  return (
    <section id="streams" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP_SM}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-16"
        >
          <span className="tag bg-sky-500/10 text-sky-400 border border-sky-500/20 inline-flex mb-4">
            <GitBranch size={12} aria-hidden />
            Stream Separation
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white leading-tight max-w-3xl mx-auto"
            aria-label="Your marketing campaigns will never hurt your critical emails"
          >
            Your marketing campaigns will{' '}
            <span className="text-sky-400">never</span>{' '}
            <span className="text-red-400 line-through decoration-red-400/60" aria-hidden>again</span>{' '}
            hurt your critical emails
          </h2>
          <p className="mt-5 text-gray-400 max-w-2xl mx-auto">
            Transactional and marketing emails run on completely separate IP infrastructure with independent sender reputations.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VP_SM}
          className="grid lg:grid-cols-3 gap-6 items-start max-w-5xl mx-auto"
        >
          {/* Transactional */}
          <motion.div variants={staggerItem} className="card border-sky-500/20 bg-sky-500/[0.03]">
            <div className="w-10 h-10 bg-sky-500/10 border border-sky-500/20 rounded-xl flex items-center justify-center mb-4">
              <Lock size={18} className="text-sky-400" aria-hidden />
            </div>
            <h3 className="font-bold text-white mb-2">Transactional</h3>
            <p className="text-sm text-gray-400 mb-4">
              OTPs, password resets, receipts, and system notifications. Protected by dedicated IP ranges, always delivered.
            </p>
            <ul className="space-y-2" aria-label="Transactional email types">
              {transactionalItems.map(item => (
                <li key={item} className="flex items-center gap-2 text-xs text-gray-500">
                  <Mail size={11} className="text-sky-400 flex-shrink-0" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-4 border-t border-white/[0.06]">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-gray-500">Inbox rate</span>
                <span className="text-sky-400 font-semibold tabular-nums">{TRANSACTIONAL_RATE}%</span>
              </div>
              <div className="score-bar" role="progressbar" aria-valuenow={TRANSACTIONAL_RATE} aria-valuemin={0} aria-valuemax={100} aria-label={`Transactional inbox rate: ${TRANSACTIONAL_RATE}%`}>
                <div className="h-full bg-sky-500 rounded-full" style={{ width: `${TRANSACTIONAL_RATE}%` }} />
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col items-center justify-center py-8 lg:py-0"
            aria-hidden
          >
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent lg:hidden" />
            <div className="hidden lg:flex flex-col items-center gap-3 w-full">
              <div className="h-px w-full bg-gradient-to-r from-sky-500/20 via-white/10 to-orange-500/20" />
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <GitBranch size={16} className="text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 text-center leading-relaxed">Isolated IP pools &amp;<br />independent reputation</p>
              <div className="h-px w-full bg-gradient-to-r from-sky-500/20 via-white/10 to-orange-500/20" />
            </div>
          </motion.div>

          {/* Marketing */}
          <motion.div variants={staggerItem} className="card border-orange-500/20 bg-orange-500/[0.03]">
            <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center mb-4">
              <Megaphone size={18} className="text-orange-400" aria-hidden />
            </div>
            <h3 className="font-bold text-white mb-2">Marketing</h3>
            <p className="text-sm text-gray-400 mb-4">
              Newsletters, campaigns, and lifecycle emails. High-volume sending with full deliverability intelligence, zero risk to transactional.
            </p>
            <ul className="space-y-2" aria-label="Marketing email types">
              {marketingItems.map(item => (
                <li key={item} className="flex items-center gap-2 text-xs text-gray-500">
                  <Megaphone size={11} className="text-orange-400 flex-shrink-0" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-4 border-t border-white/[0.06]">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-gray-500">Inbox rate</span>
                <span className="text-orange-400 font-semibold tabular-nums">{MARKETING_RATE}%</span>
              </div>
              <div className="score-bar" role="progressbar" aria-valuenow={MARKETING_RATE} aria-valuemin={0} aria-valuemax={100} aria-label={`Marketing inbox rate: ${MARKETING_RATE}%`}>
                <div className="h-full bg-orange-400 rounded-full" style={{ width: `${MARKETING_RATE}%` }} />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP_SM}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          className="mt-12 flex justify-center"
        >
          <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.07] rounded-full px-6 py-3">
            <TrendingUp size={15} className="text-emerald-400 flex-shrink-0" aria-hidden />
            <p className="text-sm text-gray-400">
              Companies using stream separation see{' '}
              <span className="text-white font-semibold">+22% higher transactional delivery</span>{' '}
              after high-volume campaigns
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
