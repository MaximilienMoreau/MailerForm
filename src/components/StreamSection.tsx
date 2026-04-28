import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { GitBranch, Lock, Mail, Megaphone, TrendingUp } from 'lucide-react'

export default function StreamSection() {
  const { ref, inView } = useInView(0.15)

  return (
    <section ref={ref} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="tag bg-sky-500/10 text-sky-400 border border-sky-500/20 inline-flex mb-4">
            <GitBranch size={12} />
            Stream Separation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight max-w-3xl mx-auto">
            Your marketing campaigns will{' '}
            <span className="text-red-400 line-through">never again</span>{' '}
            <span className="text-sky-400">never</span> hurt your critical emails
          </h2>
          <p className="mt-5 text-gray-400 max-w-2xl mx-auto">
            Transactional and marketing emails run on completely separate IP infrastructure with independent sender reputations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 items-start max-w-5xl mx-auto">

          {/* Transactional */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card border-sky-500/20 bg-sky-500/[0.03]"
          >
            <div className="w-10 h-10 bg-sky-500/10 border border-sky-500/20 rounded-xl flex items-center justify-center mb-4">
              <Lock size={18} className="text-sky-400" />
            </div>
            <h3 className="font-bold text-white mb-2">Transactional</h3>
            <p className="text-sm text-gray-400 mb-4">
              OTPs, password resets, receipts, and system notifications. Protected by dedicated IP ranges — always delivered.
            </p>
            <div className="space-y-2">
              {['Password resets', 'OTP codes', 'Purchase receipts', 'Account alerts'].map(item => (
                <div key={item} className="flex items-center gap-2 text-xs text-gray-500">
                  <Mail size={11} className="text-sky-400" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-white/[0.06]">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">Inbox rate</span>
                <span className="text-sky-400 font-semibold">99.8%</span>
              </div>
              <div className="score-bar">
                <div className="h-full w-[99.8%] bg-sky-500 rounded-full" />
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center justify-center py-8 lg:py-0"
          >
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent lg:hidden" />
            <div className="hidden lg:flex flex-col items-center gap-3">
              <div className="h-px w-full bg-gradient-to-r from-sky-500/20 via-white/10 to-orange-500/20" />
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <GitBranch size={16} className="text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 text-center">Isolated IP pools &<br />independent reputation</p>
              <div className="h-px w-full bg-gradient-to-r from-sky-500/20 via-white/10 to-orange-500/20" />
            </div>
          </motion.div>

          {/* Marketing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="card border-orange-500/20 bg-orange-500/[0.03]"
          >
            <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center mb-4">
              <Megaphone size={18} className="text-orange-400" />
            </div>
            <h3 className="font-bold text-white mb-2">Marketing</h3>
            <p className="text-sm text-gray-400 mb-4">
              Newsletters, campaigns, and lifecycle emails. High-volume sending with full deliverability intelligence — zero risk to transactional.
            </p>
            <div className="space-y-2">
              {['Newsletters', 'Product updates', 'Lifecycle campaigns', 'Re-engagement flows'].map(item => (
                <div key={item} className="flex items-center gap-2 text-xs text-gray-500">
                  <Megaphone size={11} className="text-orange-400" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-white/[0.06]">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">Inbox rate</span>
                <span className="text-orange-400 font-semibold">96.1%</span>
              </div>
              <div className="score-bar">
                <div className="h-full w-[96.1%] bg-orange-400 rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex justify-center"
        >
          <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.07] rounded-full px-6 py-3">
            <TrendingUp size={15} className="text-emerald-400" />
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
