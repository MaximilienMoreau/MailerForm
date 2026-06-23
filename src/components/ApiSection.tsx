import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Code2, Copy, CheckCheck } from 'lucide-react'
import { renderTokens } from '@/lib/tokenize'
import { sdks, apiStats, codeExample } from '@/data/api'
import { EASE, VP } from '@/lib/motion'

export default function ApiSection() {
  const [copied, setCopied] = useState(false)
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => { if (copyTimerRef.current) clearTimeout(copyTimerRef.current) }
  }, [])

  function handleCopy() {
    navigator.clipboard.writeText(codeExample).then(() => {
      setCopied(true)
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
      copyTimerRef.current = setTimeout(() => setCopied(false), 2000)
    }).catch(() => {
      // clipboard unavailable — button stays in default state
    })
  }

  return (
    <section id="api" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_50%,rgba(51,102,255,0.07),transparent)]" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Code block */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={VP}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
            className="order-2 lg:order-1"
          >
            <div className="bg-gray-900/80 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 backdrop-blur-sm">
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
                  type="button"
                  onClick={handleCopy}
                  aria-label={copied ? 'Copied to clipboard' : 'Copy code to clipboard'}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors focus-ring rounded px-1.5 py-0.5"
                >
                  {copied
                    ? <><CheckCheck size={12} className="text-emerald-400" aria-hidden /><span className="text-emerald-400">Copied!</span></>
                    : <><Copy size={12} aria-hidden />Copy</>
                  }
                </button>
              </div>

              {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- scrollable code block needs keyboard focus */}
              <div className="p-5 overflow-x-auto" tabIndex={0} aria-label="Code example: sending an email with MailerForm SDK">
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
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
              transition={{ duration: 0.5, ease: EASE }}
              className="tag bg-brand-500/10 text-brand-400 border border-brand-500/20 inline-flex mb-4"
            >
              <Code2 size={12} aria-hidden />
              API-first by design
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-5"
            >
              From zero to first send{' '}
              <span className="text-brand-400">in 5 minutes</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
              transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
              className="text-gray-400 leading-relaxed mb-8"
            >
              260+ RESTful endpoints. Webhooks for every event. Clear OpenAPI docs. Built for developers who need reliability, not just documentation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
              className="mb-8"
            >
              <p className="text-xs text-gray-500 mb-3 font-semibold uppercase tracking-wider">Official SDKs</p>
              <ul className="flex flex-wrap gap-2 list-none p-0 m-0" aria-label="Official SDKs">
                {sdks.map(sdk => (
                  <li key={sdk.lang}>
                    <a
                      href={sdk.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${sdk.lang} SDK documentation`}
                      className={`text-xs font-semibold font-mono px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all focus-ring ${sdk.color}`}
                    >
                      {sdk.lang}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
              transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
              className="grid grid-cols-3 gap-4"
            >
              {apiStats.map(stat => (
                <div key={stat.label} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 text-center">
                  <p className="text-xl font-extrabold text-white tabular-nums">{stat.value}</p>
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
