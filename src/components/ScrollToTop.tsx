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
  const { pathname, search, hash, key } = useLocation()
  const previousLocation = useRef<{ pathname: string; search: string; hash: string } | null>(null)
  useEffect(() => {
    const previous = previousLocation.current
    const changedPage = previous !== null && previous.pathname !== pathname
    const firstVisit = previous === null
    previousLocation.current = { pathname, search, hash }
    // Updating filters or billing must preserve scroll and keyboard focus.
    // Repeated clicks on an unchanged anchor still need to scroll again.
    if (previous && !changedPage && previous.hash === hash && previous.search !== search) return
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
      if (move()) {
        clearTimeout(deadline)
        observer.disconnect()
      }
    })
    // Invalid fragments must not leave an observer running for the page's lifetime.
    const deadline = setTimeout(() => observer.disconnect(), 30_000)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['aria-busy', 'hidden', 'inert'],
    })
    return () => {
      clearTimeout(deadline)
      observer.disconnect()
    }
  }, [pathname, search, hash, key])
  return null
}
