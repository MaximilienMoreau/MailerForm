import { createServer, type Plugin } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { sitePages, notFoundMeta, siteUrl } from '../src/data/site'
import { articleSchema, pageMetaTags, SCHEMA_ID } from '../src/lib/seo'
import { posts } from '../src/data/posts'

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
  noindex?: boolean
}

const page = (path: string, title: string, description: string): StaticPage => ({
  path,
  title,
  description,
  content: `<main id="main-content" class="max-w-3xl mx-auto px-6 pt-32 pb-20"><a href="/" class="text-brand-300">MailerForm</a><h1 class="text-4xl font-bold text-white mt-8">${escape(title)}</h1><p class="mt-6 text-gray-300">${escape(description)}</p><a href="/#cta" class="btn-primary mt-8">Request early access</a></main>`,
})

export const staticPages: StaticPage[] = [
  ...Object.values(sitePages)
    .filter((item) => item.path !== '/blog')
    .map((item) => page(item.path, item.title, item.description)),
  {
    ...page(sitePages.blog.path, sitePages.blog.title, sitePages.blog.description),
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

/** Only published, indexable documents belong in the sitemap. */
export function renderSitemap(pages: readonly StaticPage[] = staticPages): string {
  const urls = [...new Set(pages.filter((item) => !item.noindex).map((item) => siteUrl(item.path)))]
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${escape(url)}</loc></url>`).join('\n')}\n</urlset>\n`
}

export function renderStaticPage(template: string, item: StaticPage): string {
  // Keep Vite's asset links, charset, viewport, favicon, and font hints intact.
  const head = [
    `<title>${escape(item.title)}</title>`,
    ...pageMetaTags(item, item.path).map(
      (attributes) =>
        `<meta ${Object.entries(attributes)
          .map(([key, value]) => `${key}="${escape(value)}"`)
          .join(' ')} />`
    ),
    ...(item.noindex ? [] : [`<link rel="canonical" href="${escape(siteUrl(item.path))}" />`]),
  ]
  const schema = articleSchema(item, item.path)
  if (schema)
    head.push(
      `<script id="${SCHEMA_ID}" type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`
    )
  if (!template.includes('<div id="root"></div>'))
    throw new Error('Missing static root placeholder')
  return template
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(
      /<meta\b[^>]*(?:name|property)=["'](?:description|robots|og:[^"']*|twitter:[^"']*)["'][^>]*>/gi,
      ''
    )
    .replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi, '')
    .replace('</head>', () => `${head.join('\n')}</head>`)
    .replace(
      '<div id="root"></div>',
      () =>
        `<div id="root">${item.content}</div><noscript><style>form{display:none!important}[id^="features-"]{display:block!important}</style><p class="text-center p-6 text-gray-300">Interactive controls require JavaScript. To request access or newsletter updates, <a class="underline" href="mailto:hello@mailerform.io">email hello@mailerform.io</a>.</p></noscript>`
    )
}

export function renderNotFoundPage(template: string) {
  const html = renderStaticPage(template, {
    path: '/404',
    ...notFoundMeta,
    content:
      '<main id="main-content" class="min-h-screen flex flex-col items-center justify-center px-6 text-center"><p class="text-brand-300">404</p><h1 class="mt-4 text-4xl font-bold text-white">Page not found</h1><p class="mt-6 text-gray-300">The requested page could not be found. Check the address or return to the homepage.</p><a href="/" class="btn-primary mt-8">Back to homepage</a></main>',
  })
  return html
}

/** Emit metadata and readable article HTML without requiring a JavaScript crawler. */
export function staticPagesPlugin(): Plugin {
  return {
    name: 'mailerform-static-pages',
    apply: 'build',
    enforce: 'post',
    async generateBundle(_, bundle) {
      const index = bundle['index.html']
      if (!index || index.type !== 'asset') throw new Error('Missing Vite HTML entry')
      const template = String(index.source)
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: renderSitemap() })
      this.emitFile({ type: 'asset', fileName: '404.html', source: renderNotFoundPage(template) })
      const renderer = await createServer({
        configFile: false,
        ssr: {
          noExternal: ['react-router', 'react-router-dom'],
          resolve: {
            conditions: ['module-sync', 'node', 'import'],
          },
        },
        esbuild: { jsx: 'automatic' },
        server: { middlewareMode: true, ws: false, hmr: false, watch: null },
        appType: 'custom',
        resolve: { alias: { '@': fileURLToPath(new URL('../src', import.meta.url)) } },
      })
      try {
        const { renderPage } = (await renderer.ssrLoadModule('/scripts/render-pages.tsx')) as {
          renderPage: (path: string) => Promise<string>
        }
        for (const item of staticPages) {
          const html = renderStaticPage(template, { ...item, content: await renderPage(item.path) })
          if (item.path === '/') index.source = html
          else
            this.emitFile({
              type: 'asset',
              fileName: `${item.path.slice(1)}/index.html`,
              source: html,
            })
        }
      } finally {
        await renderer.close()
      }
    },
  }
}
