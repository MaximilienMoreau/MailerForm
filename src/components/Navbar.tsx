import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'
import { EASE } from '@/lib/motion'

const links = [
  { label: 'Features',       href: '#features' },
  { label: 'Deliverability', href: '#deliverability' },
  { label: 'Pricing',        href: '#pricing' },
  { label: 'Docs',           href: 'https://docs.mailform.io', external: true },
] as const

const sectionIds = links
  .filter(l => !('external' in l) || !l.external)
  .map(l => l.href.slice(1))

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

export default function Navbar() {
  const [scrolled, setScrolled]           = useState(false)
  const [open, setOpen]                   = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const menuRef                           = useRef<HTMLDivElement>(null)
  const toggleRef                         = useRef<HTMLButtonElement>(null)

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
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (
        menuRef.current   && !menuRef.current.contains(e.target as Node) &&
        toggleRef.current && !toggleRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  // Escape closes menu and restores focus
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) {
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
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-950/85 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <a href="/" className="flex items-center gap-2.5 group focus-ring rounded-lg px-1 -ml-1">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:shadow-brand-500/50 transition-shadow">
              <Zap size={16} className="text-white" fill="white" aria-hidden />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">MailForm</span>
          </a>

          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {links.map(l => {
              const isActive = 'external' in l && l.external ? false : activeSection === l.href.slice(1)
              const isExternal = 'external' in l && l.external
              return (
                <a
                  key={l.label}
                  href={l.href}
                  {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className={`text-sm px-3 py-2 rounded-lg transition-all focus-ring ${
                    isActive
                      ? 'text-white bg-white/5'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {l.label}
                </a>
              )
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href="#cta" className="text-sm text-gray-400 hover:text-white transition-colors font-medium focus-ring rounded-lg px-2 py-1">
              Sign in
            </a>
            <a href="#pricing" className="btn-primary text-sm py-2 px-4">
              Start free
            </a>
          </div>

          <button
            ref={toggleRef}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all focus-ring"
            onClick={() => setOpen(prev => !prev)}
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
            <nav className="px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation links">
              {links.map(l => {
                const isExternal = 'external' in l && l.external
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
                    onClick={() => !isExternal && setOpen(false)}
                    className="text-sm text-gray-400 hover:text-white px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all focus-ring"
                  >
                    {l.label}
                  </a>
                )
              })}
              <div className="pt-3 border-t border-white/[0.06] mt-2 flex flex-col gap-2">
                <a href="#cta" onClick={() => setOpen(false)} className="btn-secondary text-sm py-2.5 justify-center">Sign in</a>
                <a href="#pricing" onClick={() => setOpen(false)} className="btn-primary text-sm py-2.5 justify-center">
                  Start free
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
