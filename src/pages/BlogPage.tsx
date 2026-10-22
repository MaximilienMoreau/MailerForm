import SiteLayout from '@/components/SiteLayout'
import { sitePages } from '@/data/site'
import { motion } from '@/components/Motion'
import { Newspaper } from 'lucide-react'
import { Link } from 'react-router-dom'
import NewsletterForm from '@/components/NewsletterForm'
import { EASE, staggerContainer, staggerItem } from '@/lib/motion'
import { useMeta } from '@/hooks/useMeta'

import { posts, categoryColors } from '@/data/posts'

export default function BlogPage() {
  useMeta(sitePages.blog)

  return (
    <SiteLayout>
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
            Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            className="text-gray-400 text-lg"
          >
            Practical guides to analysis, authentication, and email infrastructure.
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
          {posts.map((post) => (
            <motion.li key={post.title} variants={staggerItem} className="card flex flex-col gap-4">
              <span className={`tag text-xs border self-start ${categoryColors[post.category]}`}>
                {post.category}
              </span>
              <h2 className="text-lg font-bold text-white leading-snug">
                <Link
                  to={`/blog/${post.slug}`}
                  className="hover:text-brand-300 focus-ring rounded-sm"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed flex-1">{post.excerpt}</p>
              <div className="pt-4 border-t border-white/[0.06] text-xs text-gray-400">
                <p>
                  MailerForm editorial · <time dateTime={post.isoDate}>{post.date}</time>
                </p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-block mt-3 text-brand-300 underline focus-ring rounded-sm"
                >
                  Read guide
                </Link>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <NewsletterForm />
      </div>
    </SiteLayout>
  )
}
