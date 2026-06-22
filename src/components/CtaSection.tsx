import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2, Loader2, Zap } from 'lucide-react'
import { EASE, VP_LG } from '@/lib/motion'

type FormState = 'idle' | 'loading' | 'success' | 'error'

function isValidEmail(value: string): boolean {
  // Delegate to the browser's own RFC-compliant email validator
  const input = document.createElement('input')
  input.type = 'email'
  input.value = value.trim()
  return input.checkValidity()
}

export default function CtaSection() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [email, setEmail]       = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [state, setState]       = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const value = email.trim()
    if (!value) return

    if (!isValidEmail(value)) {
      setState('error')
      setErrorMsg('Please enter a valid email address.')
      inputRef.current?.focus()
      return
    }

    // Bot filled the hidden honeypot field — silently succeed
    if (honeypot) {
      setState('success')
      return
    }

    setState('loading')
    setErrorMsg('')

    try {
      const formId = import.meta.env.VITE_FORMSPREE_ID
      if (!formId) throw new Error('no_form_id')

      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: value }),
      })

      if (!res.ok) throw new Error('submit_failed')
      setState('success')
    } catch {
      setState('error')
      setErrorMsg('Something went wrong. Please try again or email us at hello@mailerform.io.')
      inputRef.current?.focus()
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
    if (state === 'error') {
      setState('idle')
      setErrorMsg('')
    }
  }

  return (
    <section id="cta" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(51,102,255,0.12),transparent)]" aria-hidden />
      <div className="absolute inset-0 bg-grid-white [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]" aria-hidden />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={VP_LG}
          transition={{ duration: 0.5, ease: EASE }}
          className="w-14 h-14 bg-brand-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand-500/30"
          aria-hidden
        >
          <Zap size={24} className="text-white" fill="white" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP_LG}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6"
        >
          Your emails deserve to land in inbox.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-sky-400">
            Every time.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP_LG}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
          className="text-lg text-gray-400 mb-10 max-w-xl mx-auto"
        >
          Join thousands of SaaS teams using MailerForm to analyze, send, and optimize their email infrastructure.
          Free for up to 10,000 emails/month.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP_LG}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
        >
          <AnimatePresence mode="wait">
            {state === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex flex-col items-center gap-3"
                role="status"
                aria-live="polite"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                  <CheckCircle2 size={22} className="text-emerald-400" />
                </div>
                <p className="text-white font-semibold text-lg">You&apos;re on the list!</p>
                <p className="text-sm text-gray-400">Check your inbox for your free account details.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-stretch gap-3 max-w-md mx-auto"
                aria-label="Sign up for MailerForm"
                noValidate
              >
                {/* Honeypot — hidden from users, catches bots that auto-fill all fields */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  aria-hidden="true"
                  autoComplete="off"
                  value={honeypot}
                  onChange={e => setHoneypot(e.target.value)}
                  style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
                />
                <div className="flex-1 relative">
                  <label htmlFor="cta-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    ref={inputRef}
                    id="cta-email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    required
                    autoComplete="email"
                    aria-invalid={state === 'error'}
                    aria-describedby={state === 'error' ? 'cta-email-error' : undefined}
                    className="w-full h-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-500/60 focus:bg-white/[0.08] transition-all aria-[invalid=true]:border-red-500/50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={state === 'loading'}
                  className="btn-primary text-sm px-6 py-3.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 whitespace-nowrap"
                >
                  {state === 'loading'
                    ? <Loader2 size={15} className="animate-spin" aria-label="Loading…" />
                    : <>Start for free <ArrowRight size={15} aria-hidden /></>
                  }
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {state === 'error' && (
            <p id="cta-email-error" role="alert" className="mt-2 text-xs text-red-400">
              {errorMsg}
            </p>
          )}

          {state !== 'success' && (
            <p className="mt-4 text-xs text-gray-600">
              No credit card · 10k emails free · Cancel anytime
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VP_LG}
          transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {[
            'GDPR & CAN-SPAM compliant',
            'SOC 2 Type II certified',
            '99.9%+ API uptime SLA',
          ].map(item => (
            <span key={item} className="flex items-center gap-1.5 text-xs text-gray-500">
              <CheckCircle2 size={12} className="text-emerald-500" aria-hidden />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
