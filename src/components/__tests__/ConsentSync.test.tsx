import { afterEach, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import CookieBanner from '@/components/CookieBanner'
import CookiesPage from '@/pages/legal/CookiesPage'
import { COOKIE_CONSENT_KEY, saveConsent } from '@/lib/consent'

afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
  saveConsent(null)
})

it('reopens the banner after a preference reset without reloading the page', async () => {
  saveConsent('accepted')
  vi.useFakeTimers()
  render(
    <BrowserRouter>
      <MotionConfig reducedMotion="always">
        <CookieBanner />
        <CookiesPage />
      </MotionConfig>
    </BrowserRouter>
  )
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: /reset my preference/i }))
  await act(async () => {
    vi.advanceTimersByTime(1600)
  })
  expect(screen.getByRole('dialog', { name: /cookie consent/i })).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: /accept all/i }))
  expect(screen.getByText('Accepted', { exact: true })).toBeInTheDocument()
})

it('continues operating when browser storage is blocked', async () => {
  saveConsent(null)
  vi.spyOn(window, 'localStorage', 'get').mockImplementation(() => {
    throw new Error('Storage blocked')
  })
  vi.useFakeTimers()
  render(
    <BrowserRouter>
      <MotionConfig reducedMotion="always">
        <CookieBanner />
        <CookiesPage />
      </MotionConfig>
    </BrowserRouter>
  )
  await act(async () => {
    vi.advanceTimersByTime(1600)
  })
  fireEvent.click(screen.getByRole('button', { name: /accept all/i }))
  expect(screen.getByText('Accepted', { exact: true })).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: /reset my preference/i }))
  await act(async () => {
    vi.advanceTimersByTime(1600)
  })
  expect(screen.getByRole('dialog', { name: /cookie consent/i })).toBeInTheDocument()
})

it('updates preferences when another tab clears storage', async () => {
  saveConsent('accepted')
  vi.useFakeTimers()
  render(
    <BrowserRouter>
      <CookieBanner />
    </BrowserRouter>
  )
  act(() => {
    window.localStorage.removeItem(COOKIE_CONSENT_KEY)
    window.dispatchEvent(new StorageEvent('storage', { key: COOKIE_CONSENT_KEY, newValue: null }))
  })
  await act(async () => {
    vi.advanceTimersByTime(1600)
  })
  expect(screen.getByRole('dialog', { name: /cookie consent/i })).toBeInTheDocument()
})

it('ignores unrelated session-storage changes', () => {
  saveConsent('accepted')
  render(
    <BrowserRouter>
      <CookiesPage />
    </BrowserRouter>
  )
  act(() => {
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: COOKIE_CONSENT_KEY,
        newValue: 'declined',
        storageArea: window.sessionStorage,
      })
    )
  })
  expect(screen.getByText('Accepted', { exact: true })).toBeInTheDocument()
})
