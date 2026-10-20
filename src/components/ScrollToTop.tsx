import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

function focusContent(target: HTMLElement) {
  const hadTabIndex = target.hasAttribute('tabindex')
  if (!hadTabIndex) {
    target.tabIndex = -1
    target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true })
  }
  target.focus({ preventScroll: true })
}

function isAvailable(target: HTMLElement) {
  for (let node: HTMLElement | null = target; node; node = node.parentElement) {
    const style = window.getComputedStyle(node)
    if (
      node.hidden ||
      node.hasAttribute('inert') ||
      node.getAttribute('aria-hidden') === 'true' ||
      style.display === 'none' ||
      style.visibility === 'hidden'
    )
      return false
  }
  return true
}

export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation()
  const previousPath = useRef<string | null>(null)
  useEffect(() => {
    const changedPage = previousPath.current !== null && previousPath.current !== pathname
    const firstVisit = previousPath.current === null
    previousPath.current = pathname
    if (!hash) {
      if (changedPage || firstVisit) window.scrollTo(0, 0)
      if (!changedPage) return
    }
    const move = () => {
      let target: HTMLElement | null
      if (hash) {
        let id = hash.slice(1)
        try {
          id = decodeURIComponent(id)
        } catch {
          /* Treat malformed fragments literally. */
        }
        target = document.getElementById(id)
        if (!target || target.closest('[aria-busy="true"]') || !isAvailable(target)) return false
        target.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth',
        })
        target = target.querySelector<HTMLElement>('h1, h2, h3') ?? target
      } else {
        const main = Array.from(
          document.querySelectorAll<HTMLElement>('main:not([aria-busy="true"])')
        ).find(isAvailable)
        if (!main) return false
        target = main.querySelector<HTMLElement>('h1') ?? main
      }
      focusContent(target)
      return true
    }
    if (move()) return
    // Wait for lazy pages/sections instead of focusing their loading placeholder.
    const observer = new MutationObserver(() => {
      if (move()) observer.disconnect()
    })
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['aria-busy', 'style', 'hidden', 'inert'],
    })
    return () => observer.disconnect()
  }, [pathname, search, hash])
  return null
}
