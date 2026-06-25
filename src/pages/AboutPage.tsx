import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Target, Users, Globe } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { EASE, VP, fadeUpView, staggerContainer, staggerItem } from '@/lib/motion'
import { useMeta } from '@/hooks/useMeta'

const Footer = lazy(() => import('@/components/Footer'))

const values = [
  {
    icon: Target,
    color: 'text-brand-400',
    bg: 'bg-brand-500/10 border-brand-500/20',
    title: 'Deliverability first',
    body: 'Every product decision starts with one question: does this help email land in inbox? We build tools we would want ourselves, ones that tell you what will happen, not what already did.',
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
    body: 'We use as little data as we need, store it as briefly as we can, and never sell it. GDPR compliance is not a checkbox for us, it\'s the baseline we start from.',
  },
]

const timeline = [
  {
    year: '2022',
    title: 'The frustration',
    body: 'Our founding team was running a SaaS that relied on transactional email. A marketing campaign tanked our OTP delivery overnight. We looked for a tool that could have caught it and found nothing that combined analysis, separation, and sending in one place.',
  },
  {
    year: '2023',
    title: 'First version',
    body: 'We built MailerForm internally to scratch our own itch. The pre-send analysis engine went live in January, stream separation in March. By June we were sending 50M emails per month for our own products.',
  },
  {
    year: '2024',
    title: 'Opening up',
    body: 'We opened a private beta to 50 teams. The feedback was clear: the deliverability intelligence was unlike anything they\'d seen. We rewrote the CRM layer and launched the Growth plan in Q3.',
  },
  {
    year: '2025',
    title: 'Public launch',
    body: 'MailerForm is now available to everyone. We\'re a small, focused team, still fully bootstrapped, obsessed with making email infrastructure something developers actually enjoy working with.',
  },
]

export default function AboutPage() {
  useMeta({
    title: 'About — MailerForm',
    description: 'Learn how MailerForm was built and what we believe in. Our mission: make inbox placement predictable, not a guessing game.',
  })
  return (
    <div className="min-h-screen">
      <Navbar />

      <main id="main-content">

        {/* Hero */}
        <section className="relative pt-36 pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(51,102,255,0.12),transparent)]" aria-hidden />
          <div className="absolute inset-0 bg-grid-white [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]" aria-hidden />
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
              className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6"
            >
              We built the email platform{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-sky-400">
                we needed ourselves
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
              className="text-lg text-gray-400 leading-relaxed"
            >
              MailerForm was born out of a real problem: email infrastructure that tells you about
              deliverability failures after they&apos;ve already damaged your sender reputation. We
              decided to build something better.
            </motion.p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUpView()} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 sm:p-10">
              <p className="text-xs text-brand-400 font-semibold uppercase tracking-widest mb-4">Our mission</p>
              <p className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                Make inbox placement predictable, not a guessing game.
              </p>
              <p className="mt-5 text-gray-400 leading-relaxed">
                Every SaaS team deserves to know, before pressing Send, whether their emails will
                reach their recipients. We combine sending infrastructure, deliverability
                intelligence, and CRM into a single platform so that email becomes a lever for
                growth, not a source of anxiety.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 {...fadeUpView()} className="text-2xl sm:text-3xl font-extrabold text-white mb-10 text-center">
              What we believe
            </motion.h2>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              className="grid sm:grid-cols-3 gap-5"
            >
              {values.map(v => {
                const Icon = v.icon
                return (
                  <motion.div key={v.title} variants={staggerItem} className={`p-6 rounded-2xl border ${v.bg}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${v.bg}`}>
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
            <motion.h2 {...fadeUpView()} className="text-2xl sm:text-3xl font-extrabold text-white mb-12 text-center">
              How we got here
            </motion.h2>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[19px] top-2 bottom-2 w-px bg-white/[0.07]" aria-hidden />
              <motion.ol
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={VP}
                className="space-y-10"
              >
                {timeline.map((item) => (
                  <motion.li key={item.year} variants={staggerItem} className="flex gap-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-500/10 border border-brand-500/30 flex items-center justify-center z-10">
                      <span className="text-[10px] font-black text-brand-400 tabular-nums">{item.year}</span>
                    </div>
                    <div className="pt-1.5 pb-2">
                      <h3 className="text-base font-bold text-white mb-1.5">{item.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">{item.body}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ol>
            </div>
          </div>
        </section>

        {/* Numbers */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6"
            >
              {[
                { value: '10B+',  label: 'Emails analyzed' },
                { value: '99.2%', label: 'Avg. inbox rate' },
                { value: '<80ms', label: 'P99 delivery' },
                { value: '260+',  label: 'API endpoints' },
              ].map(s => (
                <motion.div key={s.label} variants={staggerItem} className="text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1 tabular-nums">{s.value}</div>
                  <div className="text-sm text-gray-500">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 pb-28">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div {...fadeUpView()} className="bg-brand-500/[0.07] border border-brand-500/20 rounded-2xl p-8 sm:p-10">
              <h2 className="text-2xl font-extrabold text-white mb-3">Start for free today</h2>
              <p className="text-gray-400 mb-7 text-sm leading-relaxed">
                10,000 emails per month, no credit card required. See for yourself how
                deliverability intelligence changes the way you send email.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="/#cta" className="btn-primary text-sm px-6 py-3">
                  Get started free
                  <ArrowRight size={15} aria-hidden />
                </a>
                <a href="mailto:hello@mailerform.io" className="btn-secondary text-sm px-6 py-3">
                  Talk to us
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}
