import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MotionConfig } from 'framer-motion'
import { BrowserRouter } from 'react-router-dom'
import CookieBanner from '@/components/CookieBanner'

const STORAGE_KEY = 'mailerform_cookie_consent'

function renderBanner() {
  return render(
    <BrowserRouter>
      <MotionConfig reducedMotion="always">
        <CookieBanner />
      </MotionConfig>
    </BrowserRouter>
  )
}

describe('CookieBanner', () => {
  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('does not show immediately (delayed)', () => {
    renderBanner()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('shows after the delay', async () => {
    renderBanner()
    await act(async () => { vi.advanceTimersByTime(1600) })
    expect(screen.getByRole('dialog', { name: /cookie consent/i })).toBeInTheDocument()
  })

  it('persists acceptance to localStorage when accept is clicked', async () => {
    renderBanner()
    await act(async () => { vi.advanceTimersByTime(1600) })
    vi.useRealTimers()

    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /accept all/i }))
    expect(localStorage.getItem(STORAGE_KEY)).toBe('accepted')
  })

  it('persists decline to localStorage when decline is clicked', async () => {
    renderBanner()
    await act(async () => { vi.advanceTimersByTime(1600) })
    vi.useRealTimers()

    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /decline and close/i }))
    expect(localStorage.getItem(STORAGE_KEY)).toBe('declined')
  })

  it('does not show if consent already stored', async () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    renderBanner()
    await act(async () => { vi.advanceTimersByTime(1600) })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
