import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from './ui/FadeIn'

const VP   = { once: true, amount: 0.08 } as const
const EASE = [0.22, 1, 0.36, 1] as const

interface Testimonial {
  quote:   string
  name:    string
  role:    string
  company: string
  avatar:  string
  metric?: { value: string; label: string }
}

const testimonials: Testimonial[] = [
  {
    quote:   "We switched from SendGrid + a separate inbox-testing tool to MailForm, and our transactional delivery went from 94% to 99.1% within two weeks. The pre-send analysis caught things I would never have spotted manually.",
    name:    'Sarah Chen',
    role:    'Head of Engineering',
    company: 'Payhawk',
    avatar:  'SC',
    metric:  { value: '+5.1%', label: 'inbox rate' },
  },
  {
    quote:   "Having marketing and transactional on isolated IP pools is a game changer. Our OTP delivery used to dip after big campaigns. That problem is gone. And the API is genuinely one of the best-designed I've used.",
    name:    'Marcus Webb',
    role:    'CTO',
    company: 'Liveblocks',
    avatar:  'MW',
    metric:  { value: '99.8%', label: 'OTP delivery' },
  },
  {
    quote:   "The comparison to SendGrid isn't even close. MailForm gives us one dashboard, one bill, and one API for everything. Our team spends zero time debugging email infrastructure issues now.",
    name:    'Priya Nair',
    role:    'Platform Lead',
    company: 'Rows',
    avatar:  'PN',
    metric:  { value: '–100%', label: 'infra incidents' },
  },
]

const logos = ['Payhawk', 'Liveblocks', 'Rows', 'Pylon', 'Novu', 'Resmo'] as const

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(51,102,255,0.06),transparent)]" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Trusted by engineering teams
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            From seed-stage startups to Series B SaaS — teams that care about deliverability choose MailForm.
          </p>
        </motion.div>

        {/* Logo strip */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VP}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-wrap items-center justify-center gap-8 mb-16"
          aria-label="Customers"
        >
          {logos.map(logo => (
            <span key={logo} className="text-sm font-bold text-gray-600 tracking-widest uppercase hover:text-gray-400 transition-colors cursor-default">
              {logo}
            </span>
          ))}
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map(t => (
            <motion.figure
              key={t.name}
              variants={staggerItem}
              className="card flex flex-col gap-5"
            >
              {t.metric && (
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-white tabular-nums">{t.metric.value}</span>
                  <span className="text-sm text-gray-500">{t.metric.label}</span>
                </div>
              )}

              <blockquote className="text-sm text-gray-400 leading-relaxed flex-1">
                "{t.quote}"
              </blockquote>

              <figcaption className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <div
                  className="w-9 h-9 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-xs font-bold text-brand-400 flex-shrink-0"
                  aria-hidden
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}, {t.company}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
