import { sitePages } from '@/data/site'
import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { Building2, Calendar, Download, Mail, Newspaper, Users } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { EASE, VP, staggerContainer, staggerItem } from '@/lib/motion'
import { useMeta } from '@/hooks/useMeta'

const Footer = lazy(() => import('@/components/Footer'))

const facts = [
  { icon: Calendar, label: 'Founded', value: '2026' },
  { icon: Building2, label: 'Headquarters', value: 'Paris, France' },
  { icon: Users, label: 'Team', value: 'Remote-first, bootstrapped' },
] as const

const assets = [
  { name: 'Logo (SVG)', href: '/favicon.svg', description: 'Square mark, transparent background' },
  {
    name: 'Social card (SVG)',
    href: '/og-image.svg',
    description: '1200×630, used for link previews',
  },
] as const

export default function PressPage() {
  useMeta(sitePages.press)

  return (
    <div className="min-h-screen">
      <Navbar />

      <main id="main-content">
        {/* Header */}
        <div className="relative pt-32 pb-16 overflow-hidden">
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(51,102,255,0.1),transparent)]"
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
              <Newspaper size={20} className="text-brand-400" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
            >
              Press
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
              className="text-gray-400 text-lg"
            >
              Company facts, brand assets, and media contact for MailerForm.
            </motion.p>
          </div>
        </div>

        {/* Fast facts */}
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.dl
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {facts.map((f) => {
                const Icon = f.icon
                return (
                  <motion.div
                    key={f.label}
                    variants={staggerItem}
                    className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 text-center"
                  >
                    <Icon size={18} className="text-brand-400 mx-auto mb-3" aria-hidden />
                    <dd className="text-sm font-bold text-white">{f.value}</dd>
                    <dt className="text-xs text-gray-500 mt-1">{f.label}</dt>
                  </motion.div>
                )
              })}
            </motion.dl>
          </div>
        </section>

        {/* Boilerplate */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.5, ease: EASE }}
              className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 sm:p-10"
            >
              <p className="text-xs text-brand-400 font-semibold uppercase tracking-widest mb-4">
                About MailerForm
              </p>
              <p className="text-gray-400 leading-relaxed">
                MailerForm is an email infrastructure platform for SaaS teams that combines
                transactional delivery, marketing automation, and deliverability intelligence in one
                API-first product. Its pre-send analysis engine scores every email before it goes
                out, so teams can fix deliverability issues before they damage sender reputation
                instead of finding out after the fact. MailerForm is bootstrapped and remote-first,
                founded in Paris in 2026.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Brand assets */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.5, ease: EASE }}
              className="text-2xl sm:text-3xl font-extrabold text-white mb-8 text-center"
            >
              Brand assets
            </motion.h2>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              className="grid sm:grid-cols-2 gap-4"
              aria-label="Downloadable brand assets"
            >
              {assets.map((a) => (
                <motion.li key={a.name} variants={staggerItem}>
                  <a
                    href={a.href}
                    download
                    className="group flex items-center justify-between gap-3 bg-white/[0.02] border border-white/[0.07] hover:bg-white/[0.05] hover:border-white/[0.12] rounded-2xl p-5 transition-all duration-300"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">{a.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{a.description}</p>
                    </div>
                    <Download
                      size={16}
                      className="text-gray-500 group-hover:text-brand-400 transition-colors shrink-0"
                      aria-hidden
                    />
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
              className="mt-5 flex items-center gap-3 text-xs text-gray-500"
            >
              <span className="w-4 h-4 rounded-full bg-brand-500 shrink-0" aria-hidden />
              Brand color:{' '}
              <code className="font-mono text-gray-300 bg-white/5 px-1.5 py-0.5 rounded-sm">
                #3366ff
              </code>
            </motion.div>
          </div>
        </section>

        {/* Media contact */}
        <section className="py-16 pb-28">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.5, ease: EASE }}
              className="bg-brand-500/[0.07] border border-brand-500/20 rounded-2xl p-8 sm:p-10"
            >
              <h2 className="text-2xl font-extrabold text-white mb-3">Media inquiries</h2>
              <p className="text-gray-400 mb-7 text-sm leading-relaxed">
                For interviews, quotes, or additional assets, reach out to our press team directly.
              </p>
              <a href="mailto:press@mailerform.io" className="btn-primary text-sm px-6 py-3">
                <Mail size={15} aria-hidden />
                press@mailerform.io
              </a>
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
