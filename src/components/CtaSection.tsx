import { formspreeEndpoint } from '@/lib/forms'
import SiteLink from '@/components/SiteLink'
import { parsePlanSelection, type PlanId, type BillingInterval } from '@/lib/planSelection'
import { useLocation } from 'react-router-dom'
import { useFormRequest, FormTimeoutError, FormCancelledError } from '@/hooks/useFormRequest'
import Honeypot from '@/components/Honeypot'
import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { motion } from '@/components/Motion'
import { AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2, Loader2, Zap } from 'lucide-react'
import { EASE, VP_LG } from '@/lib/motion'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function CtaSection() {
  const { search } = useLocation()
  const { send, isMounted, isPending } = useFormRequest()
  const { plan, billing } = parsePlanSelection(search)
  const endpoint = formspreeEndpoint(import.meta.env.VITE_FORMSPREE_ID)
  const inputRef = useRef<HTMLInputElement>(null)
  const [email, setEmail] = useState('')
  const [emailInvalid, setEmailInvalid] = useState(false)
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [request, setRequest] = useState<{
    email: string
    plan: PlanId | null
    billing: BillingInterval
  } | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (isPending() || !endpoint) return
    const value = email.trim()
    if (!inputRef.current?.validity.valid) {
      setEmailInvalid(true)
      setState('error')
      setErrorMsg(
        value ? 'Please enter a valid email address.' : 'Please enter your email address.'
      )
      inputRef.current?.focus()
      return
    }

    setEmailInvalid(false)
    setRequest({ email: value, plan, billing })

    // Bot filled the hidden honeypot field, silently succeed
    if (new FormData(e.currentTarget).get('_gotcha')) {
      setState('success')
      return
    }

    setState('loading')
    setErrorMsg('')

    try {
      const res = await send(endpoint, {
        email: value,
        purpose: 'early-access',
        plan,
        billing: plan ? billing : null,
      })
      if (!isMounted()) return

      if (!res.ok) throw new Error('submit_failed')
      setState('success')
    } catch (error) {
      if (!isMounted() || error instanceof FormCancelledError) return
      setState('error')
      setErrorMsg(
        error instanceof FormTimeoutError
          ? error.message
          : 'Something went wrong. Please try again or email us at hello@mailerform.io.'
      )
      inputRef.current?.focus()
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
    setEmailInvalid(false)
    if (state === 'error') {
      setState('idle')
      setErrorMsg('')
    }
  }

  return (
    <section id="cta" className="py-16 relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(51,102,255,0.12),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-grid-white [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"
        aria-hidden
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VP_LG}
          transition={{ duration: 0.5, ease: EASE }}
          className="w-14 h-14 bg-brand-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand-500/30"
          aria-hidden
        >
          <Zap size={24} className="text-white" fill="white" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP_LG}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6 sm:leading-none"
        >
          Build a more reliable email workflow.{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r/srgb from-brand-400 to-sky-400">
            Get early access.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP_LG}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
          className="text-lg text-gray-400 mb-10 max-w-xl mx-auto"
        >
          Leave your email to request an invitation. We will contact you about availability and
          onboarding.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP_LG}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
        >
          {plan && state !== 'success' && (
            <p className="mb-4 text-sm text-brand-300">
              Selected plan: <strong className="capitalize">{plan}</strong> · {billing} billing{' '}
              <SiteLink href="#pricing" className="underline ml-2 focus-ring rounded-sm">
                Change plan
              </SiteLink>
            </p>
          )}
          {!endpoint ? (
            <a
              href={`mailto:hello@mailerform.io?subject=${encodeURIComponent(`Early access${plan ? `: ${plan} / ${billing}` : ''}`)}`}
              className="btn-primary text-base px-8 py-3.5 mx-auto"
            >
              Request early access
              <ArrowRight size={16} aria-hidden />
            </a>
          ) : (
            <>
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
                    {request?.plan && (
                      <p className="text-sm text-brand-300">
                        Access requested for{' '}
                        <span className="capitalize font-semibold">{request.plan}</span> ·{' '}
                        {request.billing === 'yearly' ? 'annual billing' : 'monthly billing'}.
                      </p>
                    )}
                    <p className="text-sm text-gray-300">
                      We will contact {request?.email} to confirm availability and discuss
                      onboarding.
                    </p>
                    <p className="text-xs text-gray-400">
                      Your plan and billing terms will be confirmed before activation. No trial has
                      started and no payment has been taken.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row items-stretch gap-3 max-w-md mx-auto"
                    aria-label="Request MailerForm early access"
                    noValidate
                  >
                    <Honeypot />
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
                        aria-invalid={emailInvalid}
                        aria-describedby={state === 'error' ? 'cta-email-error' : undefined}
                        className="w-full h-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-gray-500 focus:outline-hidden focus:border-brand-500/60 focus:bg-white/[0.08] transition-all aria-[invalid=true]:border-red-500/50"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={state === 'loading'}
                      className="btn-primary text-sm px-6 py-3.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 whitespace-nowrap"
                    >
                      {state === 'loading' ? (
                        <>
                          <Loader2 size={15} className="animate-spin" aria-hidden />
                          Sending…
                        </>
                      ) : (
                        <>
                          Request early access <ArrowRight size={15} aria-hidden />
                        </>
                      )}
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
                <p className="mt-4 text-xs text-gray-400">
                  Invitation request only · No payment · No account created.{' '}
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline focus-ring rounded-sm"
                  >
                    Privacy policy (opens in a new tab)
                  </a>
                </p>
              )}
            </>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VP_LG}
          transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {['No payment required', 'Personal onboarding', 'Plan confirmed before activation'].map(
            (item) => (
              <span key={item} className="flex items-center gap-1.5 text-xs text-gray-500">
                <CheckCircle2 size={12} className="text-emerald-500" aria-hidden />
                {item}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  )
}
