import { Link, useParams } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import NewsletterForm from '@/components/NewsletterForm'
import { posts, categoryColors } from '@/data/posts'
import { useMeta } from '@/hooks/useMeta'
import NotFound from '@/pages/NotFound'

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = posts.find((item) => item.slug === slug)
  useMeta({
    title: post ? `${post.title} | MailerForm` : 'Article not found',
    description: post?.excerpt,
    article: post,
  })
  if (!post) return <NotFound />
  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-20">
        <Link to="/blog" className="text-sm text-brand-300 underline focus-ring rounded">
          ← All guides
        </Link>
        <article className="mt-8">
          <span className={`tag border ${categoryColors[post.category]}`}>{post.category}</span>
          <h1 className="text-3xl sm:text-5xl leading-tight font-extrabold text-white mt-5">
            {post.title}
          </h1>
          <p className="text-sm text-gray-400 mt-5">
            MailerForm editorial · <time dateTime={post.isoDate}>{post.date}</time>
          </p>
          <p className="text-lg text-gray-300 mt-8 leading-relaxed">{post.excerpt}</p>
          {post.body.map((section) => (
            <section key={section.heading} className="mt-8">
              <h2 className="text-xl text-white font-bold">{section.heading}</h2>
              <p className="text-gray-300 mt-3 leading-relaxed">{section.text}</p>
            </section>
          ))}
          <aside className="mt-10 rounded-xl border border-brand-500/20 bg-brand-500/10 p-5 text-sm text-gray-300">
            Explore the workflow with{' '}
            <Link to="/#deliverability" className="text-brand-300 underline focus-ring rounded">
              sample analysis reports
            </Link>
            , or{' '}
            <Link to="/#cta" className="text-brand-300 underline focus-ring rounded">
              request early access
            </Link>
            .
          </aside>
        </article>
        <NewsletterForm />
      </main>
      <Footer />
    </div>
  )
}
