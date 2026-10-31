import { useState, useEffect, useRef } from 'react'
import { motion } from '@/components/Motion'
import { Code2, Copy, CheckCheck, Mail } from 'lucide-react'
import { renderTokens } from '@/lib/tokenize'
import { sdks, apiStats, codeExample } from '@/data/api'
import { EASE, VP } from '@/lib/motion'

export default function ApiSection() {
  const mounted = useRef(false)
  const copying = useRef(false)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'manual'>('idle')
  const codeRef = useRef<HTMLElement>(null)
  const codeContainerRef = useRef<HTMLDivElement>(null)
  const copied = copyState === 'copied'
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
    }
  }, [])

  function selectCode() {
    const code = codeRef.current
    if (!code) return
    codeContainerRef.current?.focus({ preventScroll: true })
    const range = document.createRange()
    range.selectNodeContents(code)
    const selection = window.getSelection()
    selection?.removeAllRanges()
    selection?.addRange(range)
  }

  async function handleCopy() {
    if (copying.current) return
    copying.current = true
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(codeExample)
      if (!mounted.current) return
      setCopyState('copied')
      copyTimerRef.current = setTimeout(() => setCopyState('idle'), 2000)
    } catch {
      if (!mounted.current) return
      setCopyState('manual')
      selectCode()
    } finally {
      copying.current = false
    }
  }

  return (
    <section id="api" className="py-10 sm:py-16 relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_50%,rgba(51,102,255,0.07),transparent)]"
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Code block */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
            className="order-2 lg:order-1"
          >
            <div className="bg-gray-900/80 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 backdrop-blur-xs">
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5" aria-hidden>
                    <span className="w-3 h-3 rounded-full bg-red-500/60" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/60" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="text-xs text-gray-400 ml-2 font-mono">send-email.ts</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  aria-label={copied ? 'Copied to clipboard' : 'Copy code to clipboard'}
                  className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-gray-200 transition-colors hover:bg-white/10 hover:text-white focus-ring"
                >
                  {copied ? (
                    <>
                      <CheckCheck size={15} className="text-emerald-400" aria-hidden />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={15} aria-hidden />
                      Copy
                    </>
                  )}
                </button>
              </div>

              <p
                role="status"
                className={copyState === 'manual' ? 'px-5 pt-4 text-sm text-amber-300' : 'sr-only'}
              >
                {copyState === 'manual'
                  ? 'Automatic copy is unavailable. The code is selected: press Ctrl+C or ⌘C, or use your device’s Copy command.'
                  : copied
                    ? 'Code copied to clipboard.'
                    : ''}
              </p>

              {/* eslint-disable jsx-a11y/no-noninteractive-tabindex -- scrollable code block needs keyboard focus */}
              <div
                ref={codeContainerRef}
                role="region"
                className="p-5 overflow-x-auto"
                tabIndex={0}
                aria-label="Code example: sending an email with MailerForm SDK"
              >
                <pre className="text-sm font-mono leading-relaxed">
                  <code ref={codeRef}>
                    {codeExample.split('\n').map((line, i) => renderTokens(line, i))}
                  </code>
                </pre>
              </div>
              {/* eslint-enable jsx-a11y/no-noninteractive-tabindex */}
            </div>
          </motion.div>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.5, ease: EASE }}
              className="tag bg-brand-500/10 text-brand-400 border border-brand-500/20 inline-flex mb-4"
            >
              <Code2 size={12} aria-hidden />
              API-first by design
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-5 sm:leading-10"
            >
              Analyze, correct, send <span className="text-brand-400">in your workflow</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
              className="text-gray-400 leading-relaxed mb-8"
            >
              Use the analysis result to decide whether to send or fix the message. This
              illustrative SDK example shows the intended workflow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
              className="mb-8"
            >
              <p className="text-xs text-gray-400 mb-3 font-semibold uppercase tracking-wider">
                Planned SDKs
              </p>
              <ul
                className="flex flex-wrap gap-2 list-none p-0 m-0"
                aria-label="Planned SDK availability requests"
              >
                {sdks.map((sdk) => (
                  <li key={sdk.lang}>
                    <a
                      href={sdk.href}
                      aria-label={`Discuss ${sdk.lang} SDK availability`}
                      className={`inline-flex min-h-11 items-center gap-2 text-xs font-semibold font-mono px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all focus-ring ${sdk.color}`}
                    >
                      {sdk.lang}
                      <Mail size={14} className="shrink-0" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-gray-400">
                Email us to discuss SDK availability. These links open your email app.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
              className="grid grid-cols-3 gap-4"
              aria-label="Analysis and sending workflow"
            >
              {apiStats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 text-center"
                >
                  <p className="text-xl font-extrabold text-white tabular-nums">{stat.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
