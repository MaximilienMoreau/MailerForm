import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation()
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return }
    const scroll = () => {
      const target = document.getElementById(hash.slice(1))
      if (!target) return false
      target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
      return true
    }
    if (scroll()) return
    // A route or section may still be loading when a deep link is opened.
    const observer = new MutationObserver(() => { if (scroll()) observer.disconnect() })
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [pathname, search, hash])
  return null
}
