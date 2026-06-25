import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import { EASE, VP, staggerContainer, staggerItem } from '@/lib/motion'

interface Integration {
  name: string
  category: string
  abbr: string
  color: string
  description: string
}

const integrations: Integration[] = [
  { name: 'Node.js',   category: 'SDK',       abbr: 'JS',  color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',  description: 'Official npm package' },
  { name: 'Python',    category: 'SDK',       abbr: 'PY',  color: 'text-sky-400 bg-sky-500/10 border-sky-500/20',            description: 'PyPI: mailerform-python' },
  { name: 'Go',        category: 'SDK',       abbr: 'GO',  color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',         description: 'go get mailerform.io/go' },
  { name: 'Ruby',      category: 'SDK',       abbr: 'RB',  color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',         description: 'RubyGems: mailerform' },
  { name: 'PHP',       category: 'SDK',       abbr: 'PHP', color: 'text-violet-400 bg-violet-500/10 border-violet-500/20',   description: 'Composer package' },
  { name: 'Zapier',    category: 'No-code',   abbr: 'ZP',  color: 'text-orange-400 bg-orange-500/10 border-orange-500/20',  description: '500+ trigger/action pairs' },
  { name: 'Make',      category: 'No-code',   abbr: 'MK',  color: 'text-violet-400 bg-violet-500/10 border-violet-500/20',  description: 'Former Integromat' },
  { name: 'n8n',       category: 'No-code',   abbr: 'N8',  color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',        description: 'Self-hosted automation' },
  { name: 'Supabase',  category: 'Platform',  abbr: 'SB',  color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', description: 'Postgres edge functions' },
  { name: 'Vercel',    category: 'Platform',  abbr: 'VC',  color: 'text-gray-200 bg-white/5 border-white/10',               description: 'Next.js & edge runtime' },
  { name: 'Cloudflare', category: 'Platform', abbr: 'CF',  color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',     description: 'Workers integration' },
  { name: 'Webhooks',  category: 'Native',    abbr: 'WH',  color: 'text-brand-400 bg-brand-500/10 border-brand-500/20',     description: 'Real-time event delivery' },
]

const categories = ['SDK', 'No-code', 'Platform', 'Native'] as const

const categoryColors: Record<string, string> = {
  SDK:      'text-sky-400 bg-sky-500/10 border-sky-500/20',
  'No-code':'text-orange-400 bg-orange-500/10 border-orange-500/20',
  Platform: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Native:   'text-brand-400 bg-brand-500/10 border-brand-500/20',
}

export default function IntegrationsSection() {
  return (
    <section id="integrations" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(51,102,255,0.05),transparent)]" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-14"
        >
          <span className="tag bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-4 inline-flex">
            <Zap size={12} fill="currentColor" aria-hidden />
            Plug-and-play
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Works with your stack
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            SDKs in five languages, no-code connectors, and a REST API that integrates with
            anything. If you can make an HTTP request, you can use MailerForm.
          </p>
        </motion.div>

        {/* Category legend */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
          transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
          aria-label="Integration categories"
        >
          {categories.map(cat => (
            <span
              key={cat}
              className={`text-xs font-semibold px-3 py-1 rounded-full border ${categoryColors[cat]}`}
            >
              {cat}
            </span>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          aria-label="Available integrations"
        >
          {integrations.map(intg => (
            <motion.li
              key={intg.name}
              variants={staggerItem}
              className="group bg-white/[0.02] border border-white/[0.07] hover:bg-white/[0.05] hover:border-white/[0.12] rounded-2xl p-5 transition-all duration-300 cursor-default"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-[11px] font-black flex-shrink-0 ${intg.color}`}>
                  {intg.abbr}
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${categoryColors[intg.category]}`}>
                  {intg.category}
                </span>
              </div>
              <p className="text-sm font-semibold text-white mb-0.5">{intg.name}</p>
              <p className="text-xs text-gray-500">{intg.description}</p>
            </motion.li>
          ))}
        </motion.ul>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.03] border border-white/[0.07] rounded-2xl px-8 py-5 max-w-4xl mx-auto"
        >
          <div>
            <p className="text-white font-semibold">Don&apos;t see your stack?</p>
            <p className="text-sm text-gray-400 mt-0.5">
              Every feature is available via our REST API. If you use an SMTP relay, that works too.
            </p>
          </div>
          <a
            href="https://docs.mailerform.io"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary text-sm flex-shrink-0"
          >
            Explore the docs
            <ArrowRight size={14} aria-hidden />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
