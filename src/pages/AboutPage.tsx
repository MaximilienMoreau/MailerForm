import SiteLayout from '@/components/SiteLayout'
import SiteLink from '@/components/SiteLink'
import { sitePages } from '@/data/site'
import { motion } from '@/components/Motion'
import { ArrowRight, Zap, Target, Users, Globe } from 'lucide-react'
import { EASE, VP, fadeUpView, staggerContainer, staggerItem } from '@/lib/motion'
import { useMeta } from '@/hooks/useMeta'
import ProductStatusNotice from '@/components/ProductStatusNotice'
import { productStages } from '@/data/product'

const values = [
  {
    icon: Target,
    color: 'text-brand-400',
    bg: 'bg-brand-500/10 border-brand-500/20',
    title: 'Deliverability first',
    body: 'Every product decision starts with one question: does this help email land in inbox? We build tools we would want ourselves, ones that help identify risks before sending and investigate outcomes afterward.',
  },
  {
    icon: Users,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    title: 'Built for builders',
    body: 'We design for engineering teams. That means clean APIs, honest documentation, predictable pricing, and no dark patterns. The platform should get out of your way.',
  },
  {
    icon: Globe,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10 border-sky-500/20',
    title: 'Privacy by default',
    body: "We use as little data as we need, store it as briefly as we can, and never sell it. GDPR compliance is not a checkbox for us, it's the baseline we start from.",
  },
]

export default function AboutPage() {
  useMeta(sitePages.about)
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(51,102,255,0.12),transparent)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-grid-white [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"
          aria-hidden
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="w-14 h-14 bg-brand-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand-500/30"
            aria-hidden
          >
            <Zap size={24} className="text-white" fill="white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
            className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6 sm:leading-none"
          >
            We are building email infrastructure{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r/srgb from-brand-400 to-sky-400">
              with SaaS teams
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
            className="text-lg text-gray-400 leading-relaxed"
          >
            Our goal is to help teams inspect delivery risks before sending and understand outcomes
            afterward. Explore the examples, then request an invitation to discuss your workflow.
          </motion.p>
          <ProductStatusNotice />
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeUpView()}
            className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 sm:p-10"
          >
            <p className="text-xs text-brand-400 font-semibold uppercase tracking-widest mb-4">
              Our mission
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-white leading-snug sm:leading-9">
              Make inbox placement predictable, not a guessing game.
            </p>
            <p className="mt-5 text-gray-400 leading-relaxed">
              We aim to bring analysis, sending workflows, and contact tools together so teams can
              investigate risks before they affect critical traffic. An analysis score cannot
              guarantee inbox placement; production scope is confirmed during onboarding.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            {...fadeUpView()}
            className="text-2xl sm:text-3xl font-extrabold text-white mb-10 text-center"
          >
            What we believe
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="grid sm:grid-cols-3 gap-5"
          >
            {values.map((v) => {
              const Icon = v.icon
              return (
                <motion.div
                  key={v.title}
                  variants={staggerItem}
                  className={`p-6 rounded-2xl border ${v.bg}`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${v.bg}`}
                  >
                    <Icon size={18} className={v.color} />
                  </div>
                  <h3 className={`text-sm font-bold mb-2 ${v.color}`}>{v.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{v.body}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            {...fadeUpView()}
            className="text-2xl sm:text-3xl font-extrabold text-white mb-12 text-center"
          >
            Where the product stands
          </motion.h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[31px] top-2 bottom-2 w-px bg-white/[0.07]" aria-hidden />
            <motion.ol
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              className="space-y-10"
            >
              {productStages.map((item) => (
                <motion.li key={item.label} variants={staggerItem} className="flex gap-6">
                  <div className="shrink-0 w-16 h-10 rounded-full bg-brand-500/10 border border-brand-500/30 flex items-center justify-center z-10">
                    <span className="text-[10px] font-black text-brand-400 tabular-nums">
                      {item.label}
                    </span>
                  </div>
                  <div className="pt-1.5 pb-2">
                    <h3 className="text-base font-bold text-white mb-1.5">{item.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 pb-28">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            {...fadeUpView()}
            className="bg-brand-500/[0.07] border border-brand-500/20 rounded-2xl p-8 sm:p-10"
          >
            <h2 className="text-2xl font-extrabold text-white mb-3">Request early access</h2>
            <p className="text-gray-400 mb-7 text-sm leading-relaxed">
              Explore the sample analysis, then request an invitation to discuss your email
              workflow. No payment is required to request access.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <SiteLink href="/#cta" className="btn-primary text-sm px-6 py-3">
                Request early access
                <ArrowRight size={15} aria-hidden />
              </SiteLink>
              <a href="mailto:hello@mailerform.io" className="btn-secondary text-sm px-6 py-3">
                Talk to us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </SiteLayout>
  )
}
