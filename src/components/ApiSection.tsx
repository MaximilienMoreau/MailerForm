import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, Copy, CheckCheck } from 'lucide-react'
import { useInView } from '../hooks/useInView'
import { renderTokens } from '../lib/tokenize.tsx'
import { sdks, apiStats, codeExample } from '../data/api'

export default function ApiSection() {
  const { ref, inView } = useInView<HTMLElement>(0.1)
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(codeExample)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_50%,rgba(51,102,255,0.07),transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Code block */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-2 lg:order-1"
          >
            <div className="bg-gray-900/80 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
              {/* Window bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5" aria-hidden>
                    <span className="w-3 h-3 rounded-full bg-red-500/60" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/60" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="text-xs text-gray-500 ml-2 font-mono">send-email.ts</span>
                </div>
                <button
                  onClick={handleCopy}
                  aria-label={copied ? 'Copied to clipboard' : 'Copy code'}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {copied
                    ? <><CheckCheck size={12} className="text-emerald-400" /><span className="text-emerald-400">Copied!</span></>
                    : <><Copy size={12} />Copy</>
                  }
                </button>
              </div>

              {/* Code — safe tokenized render, no dangerouslySetInnerHTML */}
              <div className="p-5 overflow-x-auto">
                <pre className="text-sm font-mono leading-relaxed">
                  <code>
                    {codeExample.split('\n').map((line, i) => renderTokens(line, i))}
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="tag bg-brand-500/10 text-brand-400 border border-brand-500/20 inline-flex mb-4"
            >
              <Code2 size={12} />
              API-first by design
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-5"
            >
              From zero to first send{' '}
              <span className="text-brand-400">in 5 minutes</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-gray-400 leading-relaxed mb-8"
            >
              260+ RESTful endpoints. Webhooks for every event. Clear OpenAPI docs. Built for developers who need reliability, not just documentation.
            </motion.p>

            {/* SDK chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wider">Official SDKs</p>
              <div className="flex flex-wrap gap-2">
                {sdks.map(sdk => (
                  <span
                    key={sdk.lang}
                    className={`text-xs font-semibold font-mono px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] ${sdk.color}`}
                  >
                    {sdk.lang}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="grid grid-cols-3 gap-4"
            >
              {apiStats.map(stat => (
                <div key={stat.label} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 text-center">
                  <p className="text-xl font-extrabold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
