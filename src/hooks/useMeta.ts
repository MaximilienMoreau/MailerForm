import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { siteUrl } from '@/data/site'
import {
  articleSchema,
  managedHeadSelectors,
  pageMetaTags,
  SCHEMA_ID,
  type PageMeta,
} from '@/lib/seo'

/** One page owns its metadata. Restore the previous head when it unmounts. */
export function useMeta({ title, description, article, noindex = false }: PageMeta) {
  const { pathname } = useLocation()
  useEffect(() => {
    const previousTitle = document.title
    const previousNodes = Array.from(document.head.querySelectorAll(managedHeadSelectors))
    previousNodes.forEach((node) => node.remove())
    const meta = { title, description, article, noindex }
    const ownedNodes: Element[] = []
    document.title = title

    for (const attributes of pageMetaTags(meta, pathname)) {
      const node = document.createElement('meta')
      for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, value)
      document.head.append(node)
      ownedNodes.push(node)
    }
    if (!noindex) {
      const canonical = document.createElement('link')
      canonical.rel = 'canonical'
      canonical.href = siteUrl(pathname)
      document.head.append(canonical)
      ownedNodes.push(canonical)
    }
    const schema = articleSchema(meta, pathname)
    if (schema) {
      const node = document.createElement('script')
      node.id = SCHEMA_ID
      node.type = 'application/ld+json'
      node.textContent = JSON.stringify(schema)
      document.head.append(node)
      ownedNodes.push(node)
    }
    return () => {
      ownedNodes.forEach((node) => node.remove())
      document.head.append(...previousNodes)
      document.title = previousTitle
    }
  }, [pathname, title, description, article, noindex])
}
