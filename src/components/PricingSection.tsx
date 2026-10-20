import { plans, formatPrice } from '@/data/plans'
import { parsePlanSelection, planRequestPath } from '@/lib/planSelection'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react'
import { EASE, VP, staggerContainer, staggerItem } from '@/lib/motion'

export default function PricingSection() {
  const { search } = useLocation()
  const [yearly, setYearly] = useState(() => parsePlanSelection(search).billing === 'yearly')
  const [expanded, setExpanded] = useState<string[]>([])
  const [billingAnnouncement, setBillingAnnouncement] = useState('')

  const [previousSearch, setPreviousSearch] = useState(search)
  if (search !== previousSearch) {
    setPreviousSearch(search)
    setYearly(parsePlanSelection(search).billing === 'yearly')
  }

  function handleBillingToggle() {
    const next = !yearly
    setYearly(next)
    setBillingAnnouncement(
      next ? 'Yearly billing selected, annual prices displayed' : 'Monthly billing selected'
    )
  }

  return (
    <section id="pricing" className="py-16 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_100%,rgba(51,102,255,0.07),transparent)]"
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-10"
        >
          <span className="tag bg-brand-500/10 text-brand-400 border border-brand-500/20 inline-flex mb-4">
            <Zap size={12} fill="currentColor" aria-hidden />
            Simple pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Choose your early-access plan
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Preview pricing. Request access to discuss availability, volume, and billing before
            committing.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          <span
            id="billing-monthly"
            className={`text-sm font-medium transition-colors ${!yearly ? 'text-white' : 'text-gray-500'}`}
          >
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
          <span
            id="billing-yearly"
            className={`text-sm font-medium transition-colors ${yearly ? 'text-white' : 'text-gray-500'}`}
          >
            Yearly
            <span className="ml-2 text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 rounded-full px-2 py-0.5 font-semibold">
              Save up to 21%
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
          {plans.map((plan) => (
            <motion.article
              key={plan.id}
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

              <div className="mb-5 min-w-0">
                <h3 className="text-base font-bold text-white mb-1">{plan.name}</h3>
                <div className="flex flex-wrap items-baseline gap-x-1 gap-y-0 mb-1">
                  <motion.span
                    key={yearly ? 'yearly' : 'monthly'}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className="text-4xl font-extrabold text-white tabular-nums"
                  >
                    {plan.monthlyPrice === 0
                      ? 'Free'
                      : formatPrice(yearly ? plan.annualPrice / 12 : plan.monthlyPrice)}
                  </motion.span>
                  <span className="text-gray-500 text-sm">
                    {yearly ? plan.yearlySub : plan.sub}
                  </span>
                </div>
                {yearly && plan.annualPrice > 0 && (
                  <p className="text-sm text-brand-300 mb-2">
                    {formatPrice(plan.annualPrice)} total / year
                  </p>
                )}
                <p className="text-sm text-gray-400">{plan.description}</p>
                <div className="mt-4 rounded-xl border border-white/10 bg-gray-950/40 p-4">
                  <p className="text-2xl font-bold text-white tabular-nums">
                    {plan.volume}
                    <span className="block text-xs font-normal text-gray-300 mt-1">
                      emails included / month
                    </span>
                  </p>
                  <p className="mt-3 text-sm text-brand-200 leading-relaxed">{plan.summary}</p>
                </div>
              </div>

              <Link
                to={planRequestPath(plan.id, yearly ? 'yearly' : 'monthly', search)}
                className={`${plan.ctaStyle} text-sm mb-6 justify-center`}
              >
                {plan.cta}
                <ArrowRight size={14} aria-hidden />
              </Link>

              <div className="mt-auto rounded-lg border border-white/10 md:border-0">
                <button
                  type="button"
                  aria-expanded={expanded.includes(plan.name)}
                  aria-controls={`features-${plan.id}`}
                  onClick={() =>
                    setExpanded((current) =>
                      current.includes(plan.name)
                        ? current.filter((name) => name !== plan.name)
                        : [...current, plan.name]
                    )
                  }
                  className="w-full text-left px-3 py-3 text-sm font-semibold text-gray-200 focus-ring rounded-lg md:hidden"
                >
                  {expanded.includes(plan.name) ? 'Hide' : 'All'} {plan.name} features
                </button>
                <ul
                  id={`features-${plan.id}`}
                  className={`${expanded.includes(plan.name) ? 'block' : 'hidden'} md:block space-y-2.5 p-3 md:p-0`}
                  aria-label={`${plan.name} features`}
                >
                  {plan.features.slice(1).map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <CheckCircle2
                        size={14}
                        className="text-emerald-400 flex-shrink-0 mt-0.5"
                        aria-hidden
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <p className="mt-6 max-w-3xl mx-auto text-center text-sm text-gray-400">
          Access is by invitation; submitting a request starts no trial and creates no charge. Trial
          duration and overage rates are not published yet. We will confirm these terms with you
          before activation.
        </p>
        {/* Enterprise callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          className="mt-8 max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.03] border border-white/[0.07] rounded-2xl px-8 py-5"
        >
          <div>
            <p className="text-white font-semibold">Need custom volume or white-label?</p>
            <p className="text-sm text-gray-400 mt-0.5">
              Enterprise plans with dedicated infrastructure, custom contracts, and SLA.
            </p>
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
