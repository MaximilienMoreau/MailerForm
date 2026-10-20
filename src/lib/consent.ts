import { useEffect, useState } from 'react'

export const COOKIE_CONSENT_KEY = 'mailerform_cookie_consent'
export type Consent = 'accepted' | 'declined'
const CHANGE_EVENT = 'mailerform:consent-change'
let sessionConsent: Consent | null = null
let sessionOnly = false

function parseConsent(value: unknown): Consent | null {
  return value === 'accepted' || value === 'declined' ? value : null
}

export function readConsent(): Consent | null {
  if (sessionOnly) return sessionConsent
  try {
    return parseConsent(window.localStorage.getItem(COOKIE_CONSENT_KEY))
  } catch {
    return sessionConsent
  }
}

export function saveConsent(value: Consent | null) {
  sessionConsent = value
  try {
    if (value === null) window.localStorage.removeItem(COOKIE_CONSENT_KEY)
    else window.localStorage.setItem(COOKIE_CONSENT_KEY, value)
    sessionOnly = false
  } catch {
    sessionOnly = true /* Keep the choice in memory when browser storage is unavailable. */
  }
  window.dispatchEvent(new window.CustomEvent(CHANGE_EVENT, { detail: value }))
}

export function useConsent() {
  const [consent, setConsent] = useState(readConsent)
  useEffect(() => {
    const onChange = (event: Event) => setConsent(parseConsent((event as CustomEvent).detail))
    const onStorage = (event: StorageEvent) => {
      if (event.key === COOKIE_CONSENT_KEY || event.key === null) {
        sessionOnly = false
        sessionConsent = parseConsent(event.newValue)
        setConsent(sessionConsent)
      }
    }
    window.addEventListener(CHANGE_EVENT, onChange)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener(CHANGE_EVENT, onChange)
      window.removeEventListener('storage', onStorage)
    }
  }, [])
  return [consent, saveConsent] as const
}
