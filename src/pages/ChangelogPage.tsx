import { sitePages } from '@/data/site'
import { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import Navbar from '@/components/Navbar'
import ProductStatusNotice from '@/components/ProductStatusNotice'
import { fadeUp, staggerContainer, staggerItem } from '@/lib/motion'
import { useMeta } from '@/hooks/useMeta'

const Footer = lazy(() => import('@/components/Footer'))

const updates = [
  {
    title: 'What you can explore today',
    status: 'Website preview',
    description: 'These are working parts of the website, not a production email service release.',
    items: [
      'Three preset analysis scenarios with sample corrections',
      'An illustrative Node.js SDK workflow you can copy',
      'Preview plan comparisons and invitation requests',
      'Email engineering guides and a separate newsletter request',
    ],
    href: '/#deliverability',
    action: 'Explore sample analysis',
  },
  {
    title: 'Product areas under consideration',
    status: 'Planned',
    description: 'Availability, scope, and delivery dates are not confirmed by this preview.',
    items: [
      'Production pre-send analysis and sending streams',
      'Delivery events and operational analytics',
      'Contact management and automation workflows',
      'SDKs, platform connections, and no-code integrations',
    ],
    href: '/#integrations',
    action: 'Review integration plans',
  },
  {
    title: 'Access and release information',
    status: 'By invitation',
    description:
      'No confirmed public launch date or dated production release history is published on this site.',
    items: [
      'Request access to discuss your use case and selected plan',
      'Confirm supported features, quotas, and terms before activation',
      'Confirmed product releases and availability changes will be recorded here',
    ],
    href: '/#cta',
    action: 'Request early access',
  },
]

export default function ChangelogPage() {
  useMeta(sitePages.changelog)
  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-24">
        <motion.div {...fadeUp()} className="text-center">
          <Zap size={24} className="text-brand-400 mx-auto mb-6" aria-hidden />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Product status &amp; updates
          </h1>
          <p className="mt-5 text-lg text-gray-400">
            Website demonstrations, planned capabilities, and how to request access.
          </p>
        </motion.div>
        <ProductStatusNotice />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-10 space-y-6"
        >
          {updates.map((update) => (
            <motion.article
              key={update.title}
              variants={staggerItem}
              className="card"
              aria-label={update.title}
            >
              <span className="tag border border-brand-500/20 bg-brand-500/10 text-brand-300">
                {update.status}
              </span>
              <h2 className="text-xl font-bold text-white mt-4">{update.title}</h2>
              <p className="text-sm text-gray-400 mt-3 leading-relaxed">{update.description}</p>
              <ul className="list-disc pl-5 mt-4 space-y-2 text-sm text-gray-300">
                {update.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link
                to={update.href}
                className="inline-block mt-5 text-sm text-brand-300 underline focus-ring rounded"
              >
                {update.action}
              </Link>
            </motion.article>
          ))}
        </motion.div>
        <p className="mt-10 text-sm text-gray-400">
          Want product updates?{' '}
          <Link to="/blog#newsletter" className="text-brand-300 underline focus-ring rounded">
            Request the newsletter
          </Link>
          . Newsletter requests are separate from early-access invitations.
        </p>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}
