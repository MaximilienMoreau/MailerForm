import SiteLayout from '@/components/SiteLayout'
import { sitePages } from '@/data/site'
import { motion } from '@/components/Motion'
import { ArrowRight, Briefcase, Clock, Heart, MapPin, Rocket, Sparkles } from 'lucide-react'
import { EASE, VP, staggerContainer, staggerItem } from '@/lib/motion'
import { useMeta } from '@/hooks/useMeta'

const howWeWork = [
  {
    icon: Sparkles,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
    title: 'Small & senior',
    body: 'We hire experienced generalists who need minimal oversight. No layers of middle management, no meetings that could have been an async message.',
  },
  {
    icon: Clock,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10 border-sky-500/20',
    title: 'Async by default',
    body: 'We span multiple time zones on purpose. Decisions are written down, not made in a call you weren’t in. Deep work beats constant availability.',
  },
  {
    icon: Rocket,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    title: 'Ship in public',
    body: 'Every release gets a changelog entry. Every incident gets a postmortem. We’d rather be transparent and occasionally wrong than quiet and untrusted.',
  },
] as const

interface Job {
  title: string
  department: string
  location: string
  type: string
}

const jobs: Job[] = [
  {
    title: 'Senior Backend Engineer, Deliverability',
    department: 'Engineering',
    location: 'Remote (EU/US)',
    type: 'Full-time',
  },
  {
    title: 'Frontend Engineer, Dashboard',
    department: 'Engineering',
    location: 'Remote (EU/US)',
    type: 'Full-time',
  },
  {
    title: 'Site Reliability Engineer',
    department: 'Infrastructure',
    location: 'Remote (EU/US)',
    type: 'Full-time',
  },
  {
    title: 'Customer Engineer',
    department: 'Customer Success',
    location: 'Remote (US)',
    type: 'Full-time',
  },
  {
    title: 'Technical Writer, Docs & API',
    department: 'Marketing',
    location: 'Remote (EU/US)',
    type: 'Contract',
  },
]

const benefits = [
  'Remote-first, always',
  'Equity for every full-time hire',
  'Health coverage stipend',
  'Unlimited PTO, 4-week minimum encouraged',
  '$1,500 home-office budget',
  '$1,000/yr learning budget',
] as const

function jobMailto(title: string) {
  return `mailto:careers@mailerform.io?subject=${encodeURIComponent(`Application: ${title}`)}`
}

export default function CareersPage() {
  useMeta(sitePages.careers)

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(51,102,255,0.1),transparent)]"
          aria-hidden
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="w-12 h-12 bg-brand-500/10 border border-brand-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6"
            aria-hidden
          >
            <Briefcase size={20} className="text-brand-400" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
          >
            Careers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            className="text-gray-400 text-lg"
          >
            Help us make inbox placement predictable, not a guessing game.
          </motion.p>
        </div>
      </section>

      {/* How we work */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-2xl sm:text-3xl font-extrabold text-white mb-10 text-center"
          >
            How we work
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="grid sm:grid-cols-3 gap-5"
          >
            {howWeWork.map((v) => {
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

      {/* Open positions */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-2xl sm:text-3xl font-extrabold text-white mb-10 text-center"
          >
            Open positions
          </motion.h2>
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="bg-white/[0.02] border border-white/[0.07] rounded-2xl divide-y divide-white/[0.06]"
            aria-label="Open positions"
          >
            {jobs.map((job) => (
              <motion.li
                key={job.title}
                variants={staggerItem}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-5"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{job.title}</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-3 flex-wrap">
                    <span>{job.department}</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={11} aria-hidden />
                      {job.location}
                    </span>
                    <span>{job.type}</span>
                  </p>
                </div>
                <a
                  href={jobMailto(job.title)}
                  className="btn-secondary text-xs py-2 px-4 shrink-0 self-start sm:self-auto"
                >
                  Apply
                  <ArrowRight size={13} aria-hidden />
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-2xl sm:text-3xl font-extrabold text-white mb-10 text-center"
          >
            Benefits
          </motion.h2>
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="grid sm:grid-cols-2 gap-3"
            aria-label="Benefits"
          >
            {benefits.map((b) => (
              <motion.li
                key={b}
                variants={staggerItem}
                className="flex items-center gap-3 text-sm text-gray-300 bg-white/[0.02] border border-white/[0.07] rounded-xl px-4 py-3"
              >
                <Heart size={14} className="text-rose-400 shrink-0" aria-hidden />
                {b}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 pb-28">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.5, ease: EASE }}
            className="bg-brand-500/[0.07] border border-brand-500/20 rounded-2xl p-8 sm:p-10"
          >
            <h2 className="text-2xl font-extrabold text-white mb-3">Don&apos;t see your role?</h2>
            <p className="text-gray-400 mb-7 text-sm leading-relaxed">
              We&apos;re always interested in hearing from great engineers and operators who care
              about deliverability.
            </p>
            <a href="mailto:careers@mailerform.io" className="btn-primary text-sm px-6 py-3">
              Get in touch
              <ArrowRight size={15} aria-hidden />
            </a>
          </motion.div>
        </div>
      </section>
    </SiteLayout>
  )
}
