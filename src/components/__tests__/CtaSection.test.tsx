import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MotionConfig } from 'framer-motion'
import { BrowserRouter } from 'react-router-dom'
import CtaSection from '@/components/CtaSection'

function renderCta() {
  return render(
    <BrowserRouter>
      <MotionConfig reducedMotion="always">
        <CtaSection />
      </MotionConfig>
    </BrowserRouter>
  )
}

describe('CtaSection', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_FORMSPREE_ID', 'test_form_id')
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  it('renders the email input and submit button', () => {
    renderCta()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /request early access/i })).toBeInTheDocument()
  })

  it('shows an error for a clearly invalid email', async () => {
    const user = userEvent.setup()
    renderCta()

    await user.type(screen.getByLabelText(/email address/i), 'notanemail')
    await user.click(screen.getByRole('button', { name: /request early access/i }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })

  it('shows an error for a value that only contains @', async () => {
    const user = userEvent.setup()
    renderCta()

    await user.type(screen.getByLabelText(/email address/i), '@')
    await user.click(screen.getByRole('button', { name: /request early access/i }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })

  it('shows a success state for a valid email', async () => {
    const user = userEvent.setup()
    renderCta()

    await user.type(screen.getByLabelText(/email address/i), 'hello@example.com')
    await user.click(screen.getByRole('button', { name: /request early access/i }))

    await waitFor(
      () => {
        expect(screen.getByRole('status')).toBeInTheDocument()
        expect(screen.getByText(/you're on the list/i)).toBeInTheDocument()
      },
      { timeout: 3000 }
    )
  })

  it('shows an error when the Formspree request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
    const user = userEvent.setup()
    renderCta()

    await user.type(screen.getByLabelText(/email address/i), 'hello@example.com')
    await user.click(screen.getByRole('button', { name: /request early access/i }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })

  it('does not submit when email is empty', async () => {
    const user = userEvent.setup()
    renderCta()

    await user.click(screen.getByRole('button', { name: /request early access/i }))

    expect(screen.getByRole('alert')).toHaveTextContent('Please enter your email address.')
    expect(fetch).not.toHaveBeenCalled()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('rejects an oversized address even when submitted programmatically', () => {
    renderCta()
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: `${'a'.repeat(250)}@example.com` },
    })
    fireEvent.submit(screen.getByRole('form', { name: /early access/i }))
    expect(fetch).not.toHaveBeenCalled()
    expect(screen.getByRole('alert')).toHaveTextContent('Please enter a valid email address.')
  })
})

it('includes the selected plan and billing in the early-access request', async () => {
  vi.stubEnv('VITE_FORMSPREE_ID', 'test_form_id')
  const submit = vi.fn().mockResolvedValue({ ok: true })
  vi.stubGlobal('fetch', submit)
  window.history.replaceState({}, '', '/?plan=scale&billing=yearly#cta')
  try {
    renderCta()
    expect(screen.getByText('scale')).toBeInTheDocument()
    await userEvent.type(screen.getByLabelText(/email address/i), 'team@example.com')
    await userEvent.click(screen.getByRole('button', { name: /request early access/i }))
    await screen.findByRole('status')
    expect(JSON.parse(submit.mock.calls[0][1].body)).toMatchObject({
      purpose: 'early-access',
      plan: 'scale',
      billing: 'yearly',
    })
  } finally {
    window.history.replaceState({}, '', '/')
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  }
})

it('confirms the submitted plan, billing, email, and next step', async () => {
  vi.stubEnv('VITE_FORMSPREE_ID', 'test_form_id')
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
  window.history.replaceState({}, '', '/?plan=growth&billing=yearly#cta')
  try {
    renderCta()
    await userEvent.type(screen.getByLabelText(/email address/i), 'team@example.com')
    await userEvent.click(screen.getByRole('button', { name: /request early access/i }))
    const confirmation = await screen.findByRole('status')
    expect(confirmation).toHaveTextContent(/Access requested for growth · annual billing/i)
    expect(confirmation).toHaveTextContent('team@example.com')
    expect(confirmation).toHaveTextContent(/confirm availability/i)
    expect(confirmation).toHaveTextContent(/No trial has started/i)
  } finally {
    window.history.replaceState({}, '', '/')
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  }
})

it('does not send twice when submit events arrive before the pending state renders', async () => {
  vi.stubEnv('VITE_FORMSPREE_ID', 'test')
  const submit = vi.fn(() => new Promise(() => {}))
  vi.stubGlobal('fetch', submit)
  const view = renderCta()
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'team@example.com' } })
  const form = screen.getByRole('form', { name: /early access/i })
  act(() => {
    fireEvent.submit(form)
    fireEvent.submit(form)
  })
  expect(submit).toHaveBeenCalledTimes(1)
  view.unmount()
  await act(async () => {})
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})
