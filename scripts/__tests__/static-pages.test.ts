import { afterAll, beforeAll, expect, it } from 'vitest'
import { readFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { renderStaticPage, renderSitemap, staticPages } from '../static-pages'
import { posts } from '../../src/data/posts'

const template = readFileSync('index.html', 'utf8')
const outputDirectory = mkdtempSync(join(tmpdir(), 'mailerform-static-test-'))

beforeAll(async () => {
  // Exercise the production plugin and React renderer in Node, outside the simulated browser.
  await promisify(execFile)(
    process.execPath,
    ['node_modules/vite/bin/vite.js', 'build', '--outDir', outputDirectory],
    { timeout: 60_000, env: { ...process.env, VITE_FORMSPREE_ID: 'static-test-form' } }
  )
}, 90_000)

afterAll(() => rmSync(outputDirectory, { recursive: true, force: true }))

function publishedDocument(path: string) {
  const file = path === '/' ? 'index.html' : `${path.slice(1)}/index.html`
  return new DOMParser().parseFromString(
    readFileSync(join(outputDirectory, file), 'utf8'),
    'text/html'
  )
}

it('lists every indexable generated page exactly once in the sitemap', () => {
  const document = new DOMParser().parseFromString(
    readFileSync(join(outputDirectory, 'sitemap.xml'), 'utf8'),
    'application/xml'
  )
  const urls = Array.from(document.querySelectorAll('loc'), (node) => node.textContent)
  expect(urls).toEqual(staticPages.map((page) => `https://mailerform.io${page.path}`))
  expect(new Set(urls).size).toBe(urls.length)
  expect(urls).not.toContain('https://mailerform.io/404')
})

it('excludes non-indexable pages, deduplicates URLs and escapes XML', () => {
  const page = { ...staticPages[0], path: '/test?first=1&second=2' }
  const xml = renderSitemap([page, page, { ...page, path: '/private', noindex: true }])
  expect(xml).toContain('first=1&amp;second=2')
  const document = new DOMParser().parseFromString(xml, 'application/xml')
  expect(document.querySelectorAll('loc')).toHaveLength(1)
  expect(document.querySelector('loc')?.textContent).toBe(
    'https://mailerform.io/test?first=1&second=2'
  )
})

it('provides distinct canonical and social metadata for every page', () => {
  for (const page of staticPages) {
    const document = publishedDocument(page.path)
    expect(document.title).toBe(page.title)
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      page.description
    )
    expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe(
      page.title
    )
    expect(
      document.querySelector('meta[name="twitter:description"]')?.getAttribute('content')
    ).toBe(page.description)
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      `https://mailerform.io${page.path}`
    )
    expect(document.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe(
      `https://mailerform.io${page.path}`
    )
    expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toMatch(
      /\.png$/
    )
  }
})

it('includes every complete guide and structured data in the HTML without JavaScript', () => {
  for (const post of posts) {
    const page = staticPages.find((item) => item.path === `/blog/${post.slug}`)!
    const document = publishedDocument(page.path)
    expect(document.querySelector('h1')?.textContent).toBe(post.title)
    for (const section of post.body)
      expect(document.querySelector('article')?.textContent).toContain(section.text)
    expect(document.querySelector('meta[property="og:type"]')?.getAttribute('content')).toBe(
      'article'
    )
    expect(
      JSON.parse(document.querySelector('script[type="application/ld+json"]')!.textContent!)
    ).toMatchObject({ '@type': 'BlogPosting', headline: post.title })
  }
})

it('escapes titles, descriptions, and inline structured data', () => {
  const page = staticPages.find((item) => item.article)!
  const hostile = '</script><script>alert("test")</script> & "quoted" $& $1'
  const result = renderStaticPage(
    template,
    {
      ...page,
      title: hostile,
      description: hostile,
      article: { ...page.article!, title: hostile },
    },
    '<main>Trusted React output</main>'
  )
  const document = new DOMParser().parseFromString(result, 'text/html')
  expect(document.title).toBe(hostile)
  expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(hostile)
  expect(document.querySelector('script[type="application/ld+json"]')?.textContent).not.toContain(
    '</script>'
  )
  expect(result).not.toContain('<script>alert(')
  expect(
    JSON.parse(document.querySelector('script[type="application/ld+json"]')!.textContent!).headline
  ).toBe(hostile)
})

it('keeps every generated route reachable through the deployment rewrites', () => {
  const deployment = JSON.parse(readFileSync('vercel.json', 'utf8'))
  for (const page of staticPages.filter((item) => item.path !== '/')) {
    expect(deployment.rewrites).toContainEqual({
      source: page.path,
      destination: `${page.path}/index.html`,
    })
  }
})

it('ships a 1200 by 630 PNG social preview', () => {
  const png = readFileSync('public/og-image.png')
  expect(png.subarray(1, 4).toString()).toBe('PNG')
  expect(png.readUInt32BE(16)).toBe(1200)
  expect(png.readUInt32BE(20)).toBe(630)
})

it('renders a standalone non-indexable 404 without a canonical URL', () => {
  const document = new DOMParser().parseFromString(
    readFileSync(join(outputDirectory, '404.html'), 'utf8'),
    'text/html'
  )
  expect(document.querySelector('h1')).toHaveTextContent('Page not found')
  expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex, follow'
  )
  expect(document.querySelector('link[rel="canonical"]')).toBeNull()
  expect(document.querySelector('a[aria-label="Back to MailerForm homepage"]')).toHaveAttribute(
    'href',
    '/'
  )
  const deployment = JSON.parse(readFileSync('vercel.json', 'utf8'))
  expect(
    deployment.rewrites.every((route: { source: string }) => !route.source.includes('*'))
  ).toBe(true)
})

it('publishes a complete homepage and policies rather than placeholder introductions', () => {
  const home = publishedDocument('/')
  expect(home.querySelector('#pricing')).not.toBeNull()
  expect(home.querySelector('#cta')).not.toBeNull()
  expect(publishedDocument('/privacy').querySelector('main')?.textContent).toContain('8. Changes')
  expect(publishedDocument('/terms').querySelector('main')?.textContent).toContain(
    '9. Confidentiality'
  )
})

it('publishes one main landmark, navigation, and footer on every public page', () => {
  for (const page of staticPages) {
    const document = publishedDocument(page.path)
    expect(document.querySelectorAll('main#main-content'), page.path).toHaveLength(1)
    expect(document.querySelectorAll('footer'), page.path).toHaveLength(1)
    expect(document.querySelector('nav'), page.path).not.toBeNull()
    expect(document.querySelector('main footer'), page.path).toBeNull()
  }
})
