import SiteLink from '@/components/SiteLink'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from '@/components/Motion'
import { AnimatePresence } from 'framer-motion'
import { ExternalLink, Menu, X, Zap } from 'lucide-react'
import { EASE } from '@/lib/motion'

const links = [
  { label: 'Features', href: '#features' },
  { label: 'Deliverability', href: '#deliverability' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Docs', href: 'https://docs.mailerform.io', external: true },
] as const

// Follow the section order in LandingPage so later sections take precedence.
const sectionIds = ['deliverability', 'features', 'pricing']

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

export default function Navbar() {
  const { pathname } = useLocation()
  const brandRef = useRef<HTMLAnchorElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20)
    let current = ''
    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el && el.getBoundingClientRect().top - 100 <= 0) current = id
    }
    setActiveSection(current)
  }, [])

  useEffect(() => {
    const initialFrame = requestAnimationFrame(handleScroll)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      cancelAnimationFrame(initialFrame)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  // Release the mobile dialog and scroll lock when the desktop navigation takes over.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)')
    const handleChange = () => {
      if (desktop.matches) {
        if (menuRef.current?.contains(document.activeElement)) brandRef.current?.focus()
        setOpen(false)
      }
    }
    desktop.addEventListener('change', handleChange)
    return () => desktop.removeEventListener('change', handleChange)
  }, [])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  // Escape closes menu and restores focus
  useEffect(() => {
    if (!open) return
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [open])

  // Focus trap inside mobile menu
  useEffect(() => {
    if (!open || !menuRef.current) return
    const container = menuRef.current
    const els = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE))
    if (!els.length) return

    // Move initial focus into the menu
    els[0]?.focus()

    function handleTab(e: KeyboardEvent) {
      if (e.key !== 'Tab') return
      const first = els[0]
      const last = els[els.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [open])

  // Lock body scroll when menu is open on mobile
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gray-950/85 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20'
          : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            ref={brandRef}
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 group focus-ring rounded-lg px-1 -ml-1"
          >
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:shadow-brand-500/50 transition-shadow">
              <Zap size={16} className="text-white" fill="white" aria-hidden />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">MailerForm</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {links.map((l) => {
              const isActive =
                'external' in l && l.external ? false : activeSection === l.href.slice(1)
              const isExternal = 'external' in l && l.external
              return (
                <SiteLink
                  key={l.label}
                  href={l.href.startsWith('#') && pathname !== '/' ? `/${l.href}` : l.href}
                  {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className={`inline-flex min-h-11 items-center gap-1.5 text-sm px-3 py-2 rounded-lg transition-all focus-ring ${
                    isActive
                      ? 'text-white bg-white/5'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  aria-current={isActive ? 'location' : undefined}
                >
                  {l.label}
                  {isExternal && (
                    <>
                      <ExternalLink size={13} className="shrink-0" aria-hidden />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </>
                  )}
                </SiteLink>
              )
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <SiteLink
              href="https://app.mailerform.io/login"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors font-medium focus-ring rounded-lg px-2 py-1"
            >
              Sign in
              <ExternalLink size={13} className="shrink-0" aria-hidden />
              <span className="sr-only"> (opens in a new tab)</span>
            </SiteLink>
            <SiteLink
              href={pathname === '/' ? '#cta' : '/#cta'}
              className="btn-primary text-sm py-2 px-4"
            >
              Request early access
            </SiteLink>
          </div>

          <button
            ref={toggleRef}
            className="md:hidden min-h-11 min-w-11 inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all focus-ring"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation"
            aria-modal="true"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="md:hidden border-t border-white/[0.06] bg-gray-950/95 backdrop-blur-xl overflow-hidden"
          >
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                toggleRef.current?.focus()
              }}
              className="focus-ring mx-4 mt-4 min-h-11 px-3 text-sm text-gray-300 rounded-lg"
            >
              Close navigation
            </button>
            <nav className="px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation links">
              {links.map((l) => {
                const isExternal = 'external' in l && l.external
                return (
                  <SiteLink
                    key={l.label}
                    href={l.href.startsWith('#') && pathname !== '/' ? `/${l.href}` : l.href}
                    {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
                    onClick={() => !isExternal && setOpen(false)}
                    className="inline-flex min-h-11 items-center gap-1.5 text-sm text-gray-400 hover:text-white px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all focus-ring"
                  >
                    {l.label}
                    {isExternal && (
                      <>
                        <ExternalLink size={13} className="shrink-0" aria-hidden />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </>
                    )}
                  </SiteLink>
                )
              })}
              <div className="pt-3 border-t border-white/[0.06] mt-2 flex flex-col gap-2">
                <SiteLink
                  href="https://app.mailerform.io/login"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="btn-secondary text-sm py-2.5 justify-center"
                >
                  Sign in
                  <ExternalLink size={13} className="shrink-0" aria-hidden />
                  <span className="sr-only"> (opens in a new tab)</span>
                </SiteLink>
                <SiteLink
                  href={pathname === '/' ? '#cta' : '/#cta'}
                  onClick={() => setOpen(false)}
                  className="btn-primary text-sm py-2.5 justify-center"
                >
                  Request early access
                </SiteLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
