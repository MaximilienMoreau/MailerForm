import { createServer, type Plugin, type ResolvedConfig } from 'vite'
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
  article?: (typeof posts)[number]
  noindex?: boolean
}

/** Route metadata only; React is the sole source of page content. */
export const staticPages: StaticPage[] = [
  ...Object.values(sitePages),
  ...posts.map((post) => ({
    path: `/blog/${post.slug}`,
    title: `${post.title} | MailerForm`,
    description: post.excerpt,
    article: post,
  })),
]

/** Only published, indexable documents belong in the sitemap. */
export function renderSitemap(pages: readonly StaticPage[] = staticPages): string {
  const urls = [...new Set(pages.filter((item) => !item.noindex).map((item) => siteUrl(item.path)))]
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${escape(url)}</loc></url>`).join('\n')}\n</urlset>\n`
}

export function renderStaticPage(template: string, item: StaticPage, content: string): string {
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
        `<div id="root">${content}</div><noscript><style>form,.requires-js{display:none!important}[id^="features-"]{display:block!important}</style><p class="text-center p-6 text-gray-300">Interactive controls require JavaScript. To request access or newsletter updates, <a class="underline" href="mailto:hello@mailerform.io">email hello@mailerform.io</a>.</p></noscript>`
    )
}

/** Emit metadata and readable article HTML without requiring a JavaScript crawler. */
export function staticPagesPlugin(): Plugin {
  let buildConfig: ResolvedConfig
  return {
    name: 'mailerform-static-pages',
    apply: 'build',
    enforce: 'post',
    configResolved(config) {
      buildConfig = config
    },
    async generateBundle(_, bundle) {
      const index = bundle['index.html']
      if (!index || index.type !== 'asset') throw new Error('Missing Vite HTML entry')
      const template = String(index.source)
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: renderSitemap() })
      const renderer = await createServer({
        configFile: false,
        root: buildConfig.root,
        mode: buildConfig.mode,
        envDir: buildConfig.envDir,
        envPrefix: buildConfig.envPrefix,
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
        this.emitFile({
          type: 'asset',
          fileName: '404.html',
          source: renderStaticPage(
            template,
            { path: '/404', ...notFoundMeta },
            await renderPage('/404')
          ),
        })
        for (const item of staticPages) {
          const html = renderStaticPage(template, item, await renderPage(item.path))
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
