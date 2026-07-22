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
  description?: string
}

/**
 * Updates document.title, canonical link, and social meta tags for secondary pages.
 * Restores previous values on unmount so navigating back to the landing
 * page (which manages its own static meta in index.html) is consistent.
 */
export function useMeta({ title, description }: MetaConfig) {
  useEffect(() => {
    const prevTitle   = document.title
    const prevDesc    = getMeta('meta[name="description"]')
    const prevOgTitle = getMeta('meta[property="og:title"]')
    const prevOgDesc  = getMeta('meta[property="og:description"]')
    const prevOgUrl   = getMeta('meta[property="og:url"]')
    const prevTwTitle = getMeta('meta[name="twitter:title"]')
    const prevTwDesc  = getMeta('meta[name="twitter:description"]')

    const canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    const prevCanonical = canonicalEl?.href ?? ''
    const url = `${window.location.origin}${window.location.pathname}`

    document.title = title
    setMeta('meta[property="og:title"]',       title)
    setMeta('meta[name="twitter:title"]',      title)
    setMeta('meta[property="og:url"]',         url)
    if (canonicalEl) canonicalEl.href = url

    if (description) {
      setMeta('meta[name="description"]',        description)
      setMeta('meta[property="og:description"]', description)
      setMeta('meta[name="twitter:description"]', description)
    }

    return () => {
      document.title = prevTitle
      setMeta('meta[name="description"]',         prevDesc)
      setMeta('meta[property="og:title"]',        prevOgTitle)
      setMeta('meta[property="og:description"]',  prevOgDesc)
      setMeta('meta[property="og:url"]',          prevOgUrl)
      setMeta('meta[name="twitter:title"]',       prevTwTitle)
      setMeta('meta[name="twitter:description"]', prevTwDesc)
      if (canonicalEl) canonicalEl.href = prevCanonical
    }
  }, [title, description])
}
