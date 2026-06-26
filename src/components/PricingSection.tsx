import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react'
import { EASE, VP, staggerContainer, staggerItem } from '@/lib/motion'

interface Plan {
  name:        string
  price:       string
  yearlyPrice: string
  sub:         string
  yearlySub:   string
  description: string
  cta:         string
  ctaStyle:    'btn-primary' | 'btn-secondary'
  badge?:      string
  features:    readonly string[]
}

const plans: Plan[] = [
  {
    name:        'Starter',
    price:       'Free',
    yearlyPrice: 'Free',
    sub:         'No credit card',
    yearlySub:   'No credit card',
    description: 'Perfect for testing and small projects.',
    cta:         'Get started',
    ctaStyle:    'btn-secondary',
    features: [
      '10,000 emails / month',
      '1 sending domain',
      'Transactional stream',
      'Pre-send analysis (10/mo)',
      'Basic analytics',
      'Email support',
    ],
  },
  {
    name:        'Growth',
    price:       '$29',
    yearlyPrice: '$23',
    sub:         '/ month',
    yearlySub:   '/ mo, billed yearly',
    badge:       'Most popular',
    description: 'For growing SaaS and dev teams.',
    cta:         'Start free trial',
    ctaStyle:    'btn-primary',
    features: [
      '200,000 emails / month',
      '5 sending domains',
      'Transactional + Marketing streams',
      'Unlimited pre-send analysis',
      'CRM (up to 25k contacts)',
      'Automation workflows',
      'Webhooks',
      'Priority support',
    ],
  },
  {
    name:        'Scale',
    price:       '$149',
    yearlyPrice: '$119',
    sub:         '/ month',
    yearlySub:   '/ mo, billed yearly',
    description: 'For high-volume senders who need full control.',
    cta:         'Start free trial',
    ctaStyle:    'btn-secondary',
    features: [
      '2,000,000 emails / month',
      'Unlimited domains',
      'Dedicated IPs',
      'White-label option',
      'Unlimited CRM contacts',
      'Advanced automation',
      'Custom webhooks & API rate limits',
      'SLA + dedicated CSM',
    ],
  },
]

export default function PricingSection() {
  const [yearly, setYearly]               = useState(false)
  const [billingAnnouncement, setBillingAnnouncement] = useState('')

  function handleBillingToggle() {
    const next = !yearly
    setYearly(next)
    setBillingAnnouncement(
      next ? 'Yearly billing selected, 20% off applied' : 'Monthly billing selected'
    )
  }

  return (
    <section id="pricing" className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_100%,rgba(51,102,255,0.07),transparent)]" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-10"
        >
          <span className="tag bg-brand-500/10 text-brand-400 border border-brand-500/20 inline-flex mb-4">
            <Zap size={12} fill="currentColor" aria-hidden />
            Simple pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Start free, scale when ready
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            No per-email charge surprises. Flat monthly plans with generous limits. Upgrade only when you need to.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
          transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <span id="billing-monthly" className={`text-sm font-medium transition-colors ${!yearly ? 'text-white' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={yearly}
            aria-labelledby="billing-monthly billing-yearly"
            onClick={handleBillingToggle}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus-ring ${
              yearly ? 'bg-brand-500' : 'bg-white/10'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 ${
                yearly ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
          <span id="billing-yearly" className={`text-sm font-medium transition-colors ${yearly ? 'text-white' : 'text-gray-500'}`}>
            Yearly
            <span className="ml-2 text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 rounded-full px-2 py-0.5 font-semibold">
              Save 20%
            </span>
          </span>
        </motion.div>
        {/* Single live region, announces billing change once per toggle */}
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          {billingAnnouncement}
        </span>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {plans.map(plan => (
            <motion.article
              key={plan.name}
              variants={staggerItem}
              className={`relative rounded-2xl p-6 flex flex-col ${
                plan.badge
                  ? 'bg-brand-500/[0.07] border-2 border-brand-500/40 shadow-xl shadow-brand-500/10'
                  : 'bg-white/[0.03] border border-white/[0.07]'
              }`}
              aria-label={`${plan.name} plan`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 tag bg-brand-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg shadow-brand-500/30">
                  {plan.badge}
                </span>
              )}

              <div className="mb-5">
                <h3 className="text-base font-bold text-white mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <motion.span
                    key={yearly ? 'yearly' : 'monthly'}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className="text-4xl font-extrabold text-white tabular-nums"
                  >
                    {yearly ? plan.yearlyPrice : plan.price}
                  </motion.span>
                  <span className="text-gray-500 text-sm">{yearly ? plan.yearlySub : plan.sub}</span>
                </div>
                <p className="text-sm text-gray-400">{plan.description}</p>
              </div>

              <a href="#cta" className={`${plan.ctaStyle} text-sm mb-6 justify-center`}>
                {plan.cta}
                <ArrowRight size={14} aria-hidden />
              </a>

              <ul className="space-y-2.5 mt-auto" aria-label={`${plan.name} features`}>
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-400">
                    <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>

        {/* Enterprise callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          className="mt-8 max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.03] border border-white/[0.07] rounded-2xl px-8 py-5"
        >
          <div>
            <p className="text-white font-semibold">Need custom volume or white-label?</p>
            <p className="text-sm text-gray-400 mt-0.5">Enterprise plans with dedicated infrastructure, custom contracts, and SLA.</p>
          </div>
          <a href="mailto:sales@mailerform.io" className="btn-secondary text-sm flex-shrink-0">
            Talk to sales
            <ArrowRight size={14} aria-hidden />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
