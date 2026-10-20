import { useSyncExternalStore } from 'react'

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
    sessionConsent = parseConsent(window.localStorage.getItem(COOKIE_CONSENT_KEY))
  } catch {
    /* Storage may be blocked; retain the current session's choice. */
  }
  return sessionConsent
}

export function saveConsent(value: Consent | null) {
  sessionConsent = value
  try {
    if (value === null) window.localStorage.removeItem(COOKIE_CONSENT_KEY)
    else window.localStorage.setItem(COOKIE_CONSENT_KEY, value)
    sessionOnly = false
  } catch {
    sessionOnly = true
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== COOKIE_CONSENT_KEY && event.key !== null) return
    try {
      if (event.storageArea && event.storageArea !== window.localStorage) return
    } catch {
      return
    }
    sessionOnly = false
    onChange()
  }
  window.addEventListener(CHANGE_EVENT, onChange)
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange)
    window.removeEventListener('storage', onStorage)
  }
}

export function useConsent() {
  const consent = useSyncExternalStore(subscribe, readConsent, () => null)
  return [consent, saveConsent] as const
}
