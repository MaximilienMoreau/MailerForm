import type { Plugin } from 'vite'
import { posts } from '../src/data/posts'

const origin = 'https://mailerform.io'
const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!
  )

export interface StaticPage {
  path: string
  title: string
  description: string
  content: string
  article?: (typeof posts)[number]
}

const page = (path: string, title: string, description: string): StaticPage => ({
  path,
  title,
  description,
  content: `<main id="main-content" class="max-w-3xl mx-auto px-6 pt-32 pb-20"><a href="/" class="text-brand-300">MailerForm</a><h1 class="text-4xl font-bold text-white mt-8">${escape(title)}</h1><p class="mt-6 text-gray-300">${escape(description)}</p><a href="/#cta" class="btn-primary mt-8">Request early access</a></main>`,
})

export const staticPages: StaticPage[] = [
  page(
    '/',
    'MailerForm: Email Infrastructure Platform',
    'Analyze your email, correct delivery risks, and send through one API. Explore sample reports and request early access.'
  ),
  page(
    '/about',
    'About MailerForm',
    'Our approach to email infrastructure, delivery intelligence, and SaaS engineering workflows.'
  ),
  page(
    '/changelog',
    'Changelog | MailerForm',
    'Product updates and release notes from MailerForm.'
  ),
  page(
    '/careers',
    'Careers | MailerForm',
    'Explore opportunities to work on email infrastructure with MailerForm.'
  ),
  page(
    '/press',
    'Press | MailerForm',
    'MailerForm company information, brand assets, and media contact.'
  ),
  page(
    '/privacy',
    'Privacy Policy | MailerForm',
    'How MailerForm handles personal information, processing, and data requests.'
  ),
  page(
    '/terms',
    'Terms of Service | MailerForm',
    'Terms for using MailerForm services, plans, and infrastructure.'
  ),
  page(
    '/cookies',
    'Cookie Policy | MailerForm',
    'Information about cookies, local storage, and consent preferences on MailerForm.'
  ),
  page(
    '/gdpr',
    'GDPR | MailerForm',
    'Data protection information and documentation requests for MailerForm.'
  ),
  {
    ...page(
      '/blog',
      'Email engineering guides | MailerForm',
      'Practical guides to analysis, authentication, and email infrastructure.'
    ),
    content: `<main id="main-content" class="max-w-3xl mx-auto px-6 pt-32 pb-20"><a href="/" class="text-brand-300">MailerForm</a><h1 class="text-4xl font-bold text-white mt-8">Email engineering guides</h1><ul class="mt-8 space-y-6">${posts.map((post) => `<li><h2><a class="text-brand-300" href="/blog/${post.slug}">${escape(post.title)}</a></h2><p class="mt-2 text-gray-300">${escape(post.excerpt)}</p></li>`).join('')}</ul></main>`,
  },
  ...posts.map((post) => ({
    path: `/blog/${post.slug}`,
    title: `${post.title} | MailerForm`,
    description: post.excerpt,
    article: post,
    content: `<main id="main-content" class="max-w-3xl mx-auto px-6 pt-32 pb-20"><a href="/blog" class="text-brand-300">All guides</a><article><h1 class="text-4xl font-bold text-white mt-8">${escape(post.title)}</h1><p class="mt-4 text-gray-400">MailerForm editorial · <time datetime="${post.isoDate}">${escape(post.date)}</time></p><p class="mt-8 text-gray-300">${escape(post.excerpt)}</p>${post.body.map((section) => `<section class="mt-8"><h2 class="text-xl font-bold text-white">${escape(section.heading)}</h2><p class="mt-3 text-gray-300 leading-relaxed">${escape(section.text)}</p></section>`).join('')}</article><a href="/#cta" class="btn-primary mt-8">Request early access</a></main>`,
  })),
]

export function renderStaticPage(template: string, item: StaticPage): string {
  const url = `${origin}${item.path}`
  const title = escape(item.title)
  const description = escape(item.description)
  let html = template
    .replace(/<title>[^<]*<\/title>/, () => `<title>${title}</title>`)
    .replace(
      /(<meta name="description" content=")[^"]*("\s*\/>)/,
      (_, start, end) => `${start}${description}${end}`
    )
    .replace(
      /(<link rel="canonical" href=")[^"]*("\s*\/>)/,
      (_, start, end) => `${start}${url}${end}`
    )
    .replace(
      /(<meta property="og:title" content=")[^"]*("\s*\/>)/,
      (_, start, end) => `${start}${title}${end}`
    )
    .replace(
      /(<meta property="og:description" content=")[^"]*("\s*\/>)/,
      (_, start, end) => `${start}${description}${end}`
    )
    .replace(
      /(<meta property="og:url" content=")[^"]*("\s*\/>)/,
      (_, start, end) => `${start}${url}${end}`
    )
    .replace(
      /(<meta name="twitter:title" content=")[^"]*("\s*\/>)/,
      (_, start, end) => `${start}${title}${end}`
    )
    .replace(
      /(<meta name="twitter:description" content=")[^"]*("\s*\/>)/,
      (_, start, end) => `${start}${description}${end}`
    )
    .replace('<div id="root"></div>', () => `<div id="root">${item.content}</div>`)
  if (item.article) {
    html = html.replace('content="website"', 'content="article"')
    const data = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: item.article.title,
      description: item.description,
      url,
      mainEntityOfPage: url,
      datePublished: item.article.isoDate,
      author: { '@type': 'Organization', name: 'MailerForm editorial' },
      publisher: { '@type': 'Organization', name: 'MailerForm' },
      image: `${origin}/og-image.png`,
    }).replace(/</g, '\\u003c')
    html = html.replace(
      '</head>',
      () => `<script id="page-structured-data" type="application/ld+json">${data}</script></head>`
    )
  }
  return html
}

export function renderNotFoundPage(template: string) {
  const html = renderStaticPage(template, {
    path: '/404',
    title: 'Page not found | MailerForm',
    description: 'The requested page could not be found. Return to the MailerForm homepage.',
    content:
      '<main id="main-content" class="min-h-screen flex flex-col items-center justify-center px-6 text-center"><p class="text-brand-300">404</p><h1 class="mt-4 text-4xl font-bold text-white">Page not found</h1><p class="mt-6 text-gray-300">The requested page could not be found. Check the address or return to the homepage.</p><a href="/" class="btn-primary mt-8">Back to homepage</a></main>',
  })
  return html
    .replace(/<link rel="canonical"[^>]*>/, '')
    .replace('</head>', '<meta name="robots" content="noindex, follow" /></head>')
}

/** Emit metadata and readable article HTML without requiring a JavaScript crawler. */
export function staticPagesPlugin(): Plugin {
  return {
    name: 'mailerform-static-pages',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const index = bundle['index.html']
      if (!index || index.type !== 'asset') throw new Error('Missing Vite HTML entry')
      const template = String(index.source)
      this.emitFile({ type: 'asset', fileName: '404.html', source: renderNotFoundPage(template) })
      for (const item of staticPages) {
        const html = renderStaticPage(template, item)
        if (item.path === '/') index.source = html
        else
          this.emitFile({
            type: 'asset',
            fileName: `${item.path.slice(1)}/index.html`,
            source: html,
          })
      }
    },
  }
}
