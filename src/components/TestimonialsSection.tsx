import { motion } from 'framer-motion'
import { EASE, VP, staggerContainer, staggerItem } from '@/lib/motion'

interface Testimonial {
  quote:   string
  name:    string
  role:    string
  company: string
  initials: string
  avatarBg: string
  metric?: { value: string; label: string }
}

const testimonials: Testimonial[] = [
  {
    quote:    "We switched from SendGrid + a separate inbox-testing tool to MailerForm, and our transactional delivery went from 94% to 99.1% within two weeks. The pre-send analysis caught things I would never have spotted manually.",
    name:     'Sarah Chen',
    role:     'Head of Engineering',
    company:  'Payhawk',
    initials: 'SC',
    avatarBg: 'from-violet-500 to-brand-500',
    metric:   { value: '+5.1%', label: 'inbox rate' },
  },
  {
    quote:    "Having marketing and transactional on isolated IP pools is a game changer. Our OTP delivery used to dip after big campaigns. That problem is gone. And the API is genuinely one of the best-designed I've used.",
    name:     'Marcus Webb',
    role:     'CTO',
    company:  'Liveblocks',
    initials: 'MW',
    avatarBg: 'from-sky-500 to-emerald-500',
    metric:   { value: '99.8%', label: 'OTP delivery' },
  },
  {
    quote:    "The comparison to SendGrid isn't even close. MailerForm gives us one dashboard, one bill, and one API for everything. Our team spends zero time debugging email infrastructure issues now.",
    name:     'Priya Nair',
    role:     'Platform Lead',
    company:  'Rows',
    initials: 'PN',
    avatarBg: 'from-orange-500 to-rose-500',
    metric:   { value: '–100%', label: 'infra incidents' },
  },
]

interface Logo {
  name: string
  abbr: string
  color: string
}

const logos: Logo[] = [
  { name: 'Payhawk',   abbr: 'PH', color: 'text-violet-400 border-violet-500/20 bg-violet-500/[0.06]' },
  { name: 'Liveblocks', abbr: 'LB', color: 'text-sky-400 border-sky-500/20 bg-sky-500/[0.06]' },
  { name: 'Rows',       abbr: 'RW', color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/[0.06]' },
  { name: 'Pylon',      abbr: 'PY', color: 'text-amber-400 border-amber-500/20 bg-amber-500/[0.06]' },
  { name: 'Novu',       abbr: 'NV', color: 'text-rose-400 border-rose-500/20 bg-rose-500/[0.06]' },
  { name: 'Resmo',      abbr: 'RS', color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/[0.06]' },
]

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
            From seed-stage startups to Series B SaaS — teams that care about deliverability choose MailerForm.
          </p>
        </motion.div>

        {/* Logo strip */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VP}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
          aria-label="Customers"
        >
          {logos.map(logo => (
            <span
              key={logo.name}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold tracking-wide ${logo.color}`}
            >
              <span className="text-[10px] font-black opacity-70">{logo.abbr}</span>
              {logo.name}
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
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <div
                  className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.avatarBg} flex items-center justify-center text-[11px] font-black text-white flex-shrink-0 shadow-md`}
                  aria-hidden
                >
                  {t.initials}
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
