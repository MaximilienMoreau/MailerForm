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
 * Updates document.title and social meta tags for secondary pages.
 * Restores previous values on unmount so navigating back to the landing
 * page (which manages its own static meta in index.html) is consistent.
 */
export function useMeta({ title, description }: MetaConfig) {
  useEffect(() => {
    const prevTitle   = document.title
    const prevDesc    = getMeta('meta[name="description"]')
    const prevOgTitle = getMeta('meta[property="og:title"]')
    const prevOgDesc  = getMeta('meta[property="og:description"]')
    const prevTwTitle = getMeta('meta[name="twitter:title"]')
    const prevTwDesc  = getMeta('meta[name="twitter:description"]')

    document.title = title
    setMeta('meta[property="og:title"]',       title)
    setMeta('meta[name="twitter:title"]',      title)

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
      setMeta('meta[name="twitter:title"]',       prevTwTitle)
      setMeta('meta[name="twitter:description"]', prevTwDesc)
    }
  }, [title, description])
}
