import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Newspaper } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { EASE, VP, staggerContainer, staggerItem } from '@/lib/motion'
import { useMeta } from '@/hooks/useMeta'

const Footer = lazy(() => import('@/components/Footer'))

type Category = 'Deliverability' | 'Authentication' | 'Data' | 'Infrastructure' | 'Compliance' | 'Case study'

interface Post {
  category:        Category
  title:            string
  excerpt:          string
  date:             string
  isoDate:          string
  readTime:         string
  author:           string
  authorRole:       string
  authorInitials:   string
  avatarBg:         string
}

const categoryColors: Record<Category, string> = {
  Deliverability:  'text-violet-400 bg-violet-500/10 border-violet-500/20',
  Authentication:  'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Data:            'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Infrastructure:  'text-sky-400 bg-sky-500/10 border-sky-500/20',
  Compliance:      'text-rose-400 bg-rose-500/10 border-rose-500/20',
  'Case study':    'text-brand-400 bg-brand-500/10 border-brand-500/20',
}

const posts: Post[] = [
  {
    category:      'Deliverability',
    title:         'Why your OTP emails start dying after a marketing campaign',
    excerpt:       'Shared IP reputation is still the #1 cause of transactional delivery drops. Here’s how a single promo blast can tank your password-reset emails for days, and how stream separation fixes it for good.',
    date:          'July 1, 2026',
    isoDate:       '2026-07-01',
    readTime:      '6 min read',
    author:        'Elena Marsh',
    authorRole:    'Deliverability Lead',
    authorInitials: 'EM',
    avatarBg:      'from-violet-500 to-brand-500',
  },
  {
    category:      'Authentication',
    title:         'SPF, DKIM, DMARC: the alignment mistakes that tank inbox placement',
    excerpt:       'Having all three records published isn’t enough. We break down the alignment failures we see most often in pre-send reports, and the exact DNS changes that fix them.',
    date:          'June 18, 2026',
    isoDate:       '2026-06-18',
    readTime:      '8 min read',
    author:        'Jonas Weber',
    authorRole:    'Infrastructure Engineer',
    authorInitials: 'JW',
    avatarBg:      'from-sky-500 to-emerald-500',
  },
  {
    category:      'Data',
    title:         'We analyzed 10B emails: here’s what actually triggers spam filters in 2026',
    excerpt:       'Subject-line keywords matter far less than they used to. Engagement history, link reputation, and image-to-text ratio now drive most filtering decisions across major ISPs.',
    date:          'June 5, 2026',
    isoDate:       '2026-06-05',
    readTime:      '10 min read',
    author:        'Noor Haddad',
    authorRole:    'Head of Data',
    authorInitials: 'NH',
    avatarBg:      'from-amber-500 to-orange-500',
  },
  {
    category:      'Infrastructure',
    title:         'Stream separation: a technical deep dive into isolated IP pools',
    excerpt:       'How MailerForm keeps transactional and marketing traffic on fully independent reputations, down to the routing layer, and what that means for your delivery SLAs.',
    date:          'May 22, 2026',
    isoDate:       '2026-05-22',
    readTime:      '7 min read',
    author:        'David Kim',
    authorRole:    'Platform Engineer',
    authorInitials: 'DK',
    avatarBg:      'from-emerald-500 to-brand-500',
  },
  {
    category:      'Compliance',
    title:         'GDPR and transactional email: what SaaS teams get wrong',
    excerpt:       'Password resets and receipts are not exempt from consent rules. A practical checklist for staying compliant without slowing down your critical sends.',
    date:          'May 8, 2026',
    isoDate:       '2026-05-08',
    readTime:      '5 min read',
    author:        'Aisha Bello',
    authorRole:    'Compliance Lead',
    authorInitials: 'AB',
    avatarBg:      'from-rose-500 to-violet-500',
  },
  {
    category:      'Case study',
    title:         'From 94% to 99.1% inbox rate: a Payhawk case study',
    excerpt:       'How Payhawk’s engineering team migrated off SendGrid and used pre-send analysis to catch deliverability issues before every campaign, not after.',
    date:          'April 24, 2026',
    isoDate:       '2026-04-24',
    readTime:      '6 min read',
    author:        'Liam Foster',
    authorRole:    'Customer Engineering',
    authorInitials: 'LF',
    avatarBg:      'from-cyan-500 to-sky-500',
  },
]

export default function BlogPage() {
  useMeta({
    title: 'Blog',
    description: 'Deliverability research, engineering deep dives, and customer stories from the MailerForm team.',
  })

  return (
    <div className="min-h-screen">
      <Navbar />

      <main id="main-content">
        {/* Header */}
        <div className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(51,102,255,0.1),transparent)]" aria-hidden />
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
              Blog
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
              className="text-gray-400 text-lg"
            >
              Deliverability research, engineering deep dives, and customer stories.
            </motion.p>
          </div>
        </div>

        {/* Posts grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            aria-label="Blog posts"
          >
            {posts.map(post => (
              <motion.li
                key={post.title}
                variants={staggerItem}
                className="card flex flex-col gap-4"
              >
                <span className={`tag text-xs border self-start ${categoryColors[post.category]}`}>
                  {post.category}
                </span>
                <h2 className="text-lg font-bold text-white leading-snug">{post.title}</h2>
                <p className="text-sm text-gray-400 leading-relaxed flex-1">{post.excerpt}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${post.avatarBg} flex items-center justify-center text-[10px] font-black text-white flex-shrink-0`}
                    aria-hidden
                  >
                    {post.authorInitials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white">{post.author}</p>
                    <p className="text-[11px] text-gray-500">
                      <time dateTime={post.isoDate}>{post.date}</time> · {post.readTime}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>

          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
            transition={{ duration: 0.5, ease: EASE }}
            className="mt-14 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.03] border border-white/[0.07] rounded-2xl px-8 py-6"
          >
            <div className="text-center sm:text-left">
              <p className="text-white font-semibold">Never miss a post</p>
              <p className="text-sm text-gray-400 mt-0.5">
                New deliverability research and product updates, roughly twice a month.
              </p>
            </div>
            <a href="/#cta" className="btn-primary text-sm flex-shrink-0">
              Subscribe
              <ArrowRight size={14} aria-hidden />
            </a>
          </motion.div>
        </div>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}
