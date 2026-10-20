import { useEffect } from 'react'

function getMeta(selector: string): string {
  return document.querySelector<HTMLMetaElement>(selector)?.content ?? ''
}

function setMeta(selector: string, content: string) {
  const el = document.querySelector<HTMLMetaElement>(selector)
  if (el) el.content = content
}

interface MetaConfig {
  title: string
  noindex?: boolean
  description?: string
  article?: { title: string; excerpt: string; isoDate: string }
}

/**
 * Keeps build-time metadata and article schema current during client navigation.
 * Every route, including the landing page, provides its own metadata.
 */
export function useMeta({ title, description, article, noindex = false }: MetaConfig) {
  useEffect(() => {
    const previousRobots = document
      .querySelector<HTMLMetaElement>('meta[name="robots"]')
      ?.cloneNode(true)
    document.querySelector('meta[name="robots"]')?.remove()
    if (noindex) {
      const robots = document.createElement('meta')
      robots.name = 'robots'
      robots.content = 'noindex, follow'
      document.head.append(robots)
    } else if (
      previousRobots instanceof HTMLMetaElement &&
      !previousRobots.content.includes('noindex')
    ) {
      document.head.append(previousRobots.cloneNode(true))
    }
    const previousSchema = document.getElementById('page-structured-data')?.outerHTML
    document.getElementById('page-structured-data')?.remove()
    if (article) {
      const script = document.createElement('script')
      script.id = 'page-structured-data'
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.excerpt,
        url: `https://mailerform.io${window.location.pathname}`,
        mainEntityOfPage: `https://mailerform.io${window.location.pathname}`,
        datePublished: article.isoDate,
        author: { '@type': 'Organization', name: 'MailerForm editorial' },
        publisher: { '@type': 'Organization', name: 'MailerForm' },
        image: 'https://mailerform.io/og-image.png',
      })
      document.head.append(script)
    }
    const prevType = getMeta('meta[property="og:type"]')
    setMeta('meta[property="og:type"]', article ? 'article' : 'website')
    const prevTitle = document.title
    const prevDesc = getMeta('meta[name="description"]')
    const prevOgTitle = getMeta('meta[property="og:title"]')
    const prevOgDesc = getMeta('meta[property="og:description"]')
    const prevOgUrl = getMeta('meta[property="og:url"]')
    const prevTwTitle = getMeta('meta[name="twitter:title"]')
    const prevTwDesc = getMeta('meta[name="twitter:description"]')

    const previousCanonical = document.querySelector('link[rel="canonical"]')?.cloneNode(true)
    document.querySelector('link[rel="canonical"]')?.remove()
    const url = `https://mailerform.io${window.location.pathname}`
    if (!noindex) {
      const canonical = document.createElement('link')
      canonical.rel = 'canonical'
      canonical.href = url
      document.head.append(canonical)
    }

    document.title = title
    setMeta('meta[property="og:title"]', title)
    setMeta('meta[name="twitter:title"]', title)
    setMeta('meta[property="og:url"]', url)

    if (description) {
      setMeta('meta[name="description"]', description)
      setMeta('meta[property="og:description"]', description)
      setMeta('meta[name="twitter:description"]', description)
    }

    return () => {
      document.querySelector('meta[name="robots"]')?.remove()
      if (previousRobots) document.head.append(previousRobots)
      document.getElementById('page-structured-data')?.remove()
      if (previousSchema) document.head.insertAdjacentHTML('beforeend', previousSchema)
      setMeta('meta[property="og:type"]', prevType)
      document.title = prevTitle
      setMeta('meta[name="description"]', prevDesc)
      setMeta('meta[property="og:title"]', prevOgTitle)
      setMeta('meta[property="og:description"]', prevOgDesc)
      setMeta('meta[property="og:url"]', prevOgUrl)
      setMeta('meta[name="twitter:title"]', prevTwTitle)
      setMeta('meta[name="twitter:description"]', prevTwDesc)
      document.querySelector('link[rel="canonical"]')?.remove()
      if (previousCanonical) document.head.append(previousCanonical)
    }
  }, [title, description, article, noindex])
}
