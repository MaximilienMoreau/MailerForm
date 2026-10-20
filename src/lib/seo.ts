import { SITE, siteUrl } from '../data/site'

export interface PageMeta {
  title: string
  description?: string
  noindex?: boolean
  article?: { title: string; excerpt: string; isoDate: string }
}

export const SCHEMA_ID = 'page-structured-data'

export function pageMetaTags(meta: PageMeta, pathname: string) {
  const description = meta.description ?? ''
  return [
    { name: 'description', content: description },
    { property: 'og:title', content: meta.title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: siteUrl(pathname) },
    { property: 'og:type', content: meta.article ? 'article' : 'website' },
    { property: 'og:site_name', content: SITE.name },
    { property: 'og:image', content: siteUrl(SITE.image) },
    { property: 'og:image:alt', content: SITE.imageAlt },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:type', content: 'image/png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: meta.title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: siteUrl(SITE.image) },
    { name: 'twitter:image:alt', content: SITE.imageAlt },
    ...(meta.noindex ? [{ name: 'robots', content: 'noindex, follow' }] : []),
  ]
}

export function articleSchema(meta: PageMeta, pathname: string) {
  if (!meta.article) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.article.title,
    description: meta.description ?? meta.article.excerpt,
    url: siteUrl(pathname),
    mainEntityOfPage: siteUrl(pathname),
    datePublished: meta.article.isoDate,
    author: { '@type': 'Organization', name: `${SITE.name} editorial` },
    publisher: { '@type': 'Organization', name: SITE.name },
    image: siteUrl(SITE.image),
  }
}

export const managedHeadSelectors = [
  'meta[name="description"]',
  'meta[name="robots"]',
  'meta[property^="og:"]',
  'meta[name^="twitter:"]',
  'link[rel="canonical"]',
  `script#${SCHEMA_ID}`,
].join(',')
