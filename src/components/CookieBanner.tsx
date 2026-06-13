import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'

const STORAGE_KEY = 'mailform_cookie_consent'

type Consent = 'accepted' | 'declined'

export default function CookieBanner() {
  const [consent, setConsent] = useState<Consent | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Consent | null
    if (stored) {
      setConsent(stored)
    } else {
      // Small delay so the banner doesn't pop in immediately on load
      const t = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(t)
    }
  }, [])

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setConsent('accepted')
    setVisible(false)
  }

  function handleDecline() {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setConsent('declined')
    setVisible(false)
  }

  if (consent !== null) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50"
        >
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-5 shadow-2xl shadow-black/60 backdrop-blur-xl">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Cookie size={16} className="text-brand-400 flex-shrink-0" aria-hidden />
                <span className="text-sm font-semibold text-white">Cookies &amp; Privacy</span>
              </div>
              <button
                type="button"
                onClick={handleDecline}
                aria-label="Decline and close"
                className="text-gray-500 hover:text-gray-300 transition-colors focus-ring rounded p-0.5"
              >
                <X size={15} aria-hidden />
              </button>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              We use essential cookies for site functionality. We do not sell your data.{' '}
              <a href="/cookies" className="text-brand-400 hover:text-brand-300 transition-colors underline-offset-2 hover:underline">
                Cookie policy
              </a>
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleDecline}
                className="flex-1 text-xs font-semibold py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-all focus-ring"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="flex-1 text-xs font-semibold py-2 px-3 rounded-lg bg-brand-500 hover:bg-brand-600 text-white transition-all focus-ring shadow-md shadow-brand-500/25"
              >
                Accept all
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
