import { motion } from 'framer-motion'
import { ArrowRight, Shield } from 'lucide-react'
import { EASE } from '@/lib/motion'

interface Score {
  label:   string
  value:   number
  color:   string
  invert?: boolean
}

const scores: Score[] = [
  { label: 'Content health',    value: 91,  color: 'bg-emerald-500' },
  { label: 'Domain reputation', value: 88,  color: 'bg-emerald-500' },
  { label: 'Link safety',       value: 100, color: 'bg-emerald-500' },
  { label: 'Spam risk',         value: 4,   color: 'bg-red-400', invert: true },
]

export default function DeliverabilityCard() {
  return (
    <div className="bg-gray-900/80 border border-white/10 rounded-2xl p-6 text-left shadow-2xl shadow-black/50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-brand-400" />
          <span className="text-sm font-semibold text-white">Pre-send Analysis</span>
        </div>
        <span className="tag bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" aria-hidden />
          Inbox safe
        </span>
      </div>

      <div className="flex items-end gap-3 mb-6">
        <span className="text-6xl font-black text-white tabular-nums">94</span>
        <div className="pb-2">
          <span className="text-gray-400 text-sm">/100 Deliverability score</span>
          <p className="text-xs text-emerald-400 mt-0.5 font-medium">+6 from last campaign</p>
        </div>
      </div>

      <div className="space-y-3">
        {scores.map((s, i) => (
          <div key={s.label}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-gray-400">{s.label}</span>
              <span className={`font-semibold tabular-nums ${s.invert ? 'text-red-400' : 'text-white'}`}>
                {s.invert ? `${s.value}% risk` : `${s.value}%`}
              </span>
            </div>
            <div className="score-bar" role="progressbar" aria-valuenow={s.value} aria-valuemin={0} aria-valuemax={100} aria-label={s.label}>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: s.value / 100 }}
                transition={{ duration: 1, delay: 0.8 + i * 0.08, ease: EASE }}
                style={{ originX: 0 }}
                className={`h-full w-full rounded-full ${s.color}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 pt-5 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-xs text-gray-500">2 warnings · 0 blockers</span>
        <button
          type="button"
          className="text-xs text-brand-400 hover:text-brand-300 font-medium transition-colors flex items-center gap-1 focus-ring rounded"
          aria-label="View full deliverability report"
        >
          View full report <ArrowRight size={11} aria-hidden />
        </button>
      </div>
    </div>
  )
}
