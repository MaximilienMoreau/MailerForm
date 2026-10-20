import { expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { renderStaticPage, staticPages } from '../static-pages'
import { posts } from '../../src/data/posts'

const template = readFileSync('index.html', 'utf8')

it('provides distinct canonical and social metadata for every page', () => {
  for (const page of staticPages) {
    const html = renderStaticPage(template, page)
    const document = new DOMParser().parseFromString(html, 'text/html')
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
    const document = new DOMParser().parseFromString(renderStaticPage(template, page), 'text/html')
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

it('escapes titles, descriptions, content, and inline structured data', () => {
  const page = staticPages.find((item) => item.article)!
  const hostile = '</script><script>alert("test")</script> & "quoted" $& $1'
  const result = renderStaticPage(template, {
    ...page,
    title: hostile,
    description: hostile,
    article: { ...page.article!, title: hostile },
  })
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
