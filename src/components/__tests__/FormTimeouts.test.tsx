import { afterEach, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import CtaSection from '@/components/CtaSection'
import NewsletterForm from '@/components/NewsletterForm'
import { FORM_TIMEOUT_MS } from '@/hooks/useFormRequest'

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

it.each([
  ['early-access', CtaSection, 'Request MailerForm early access'],
  ['newsletter', NewsletterForm, 'Newsletter subscription'],
])(
  'times out a stalled %s request, retains the email, and allows retry',
  async (_, Form, label) => {
    vi.useFakeTimers()
    vi.stubEnv('VITE_FORMSPREE_ID', 'test')
    const submit = vi.fn().mockImplementation(() => new Promise(() => {}))
    vi.stubGlobal('fetch', submit)
    render(
      <BrowserRouter>
        <MotionConfig reducedMotion="always">
          <Form />
        </MotionConfig>
      </BrowserRouter>
    )
    const input = screen.getByRole('textbox', { name: 'Email address' })
    fireEvent.change(input, { target: { value: 'team@example.com' } })
    const checkbox = screen.queryByRole('checkbox')
    if (checkbox) fireEvent.click(checkbox)
    fireEvent.submit(screen.getByRole('form', { name: label }))
    expect(screen.getByRole('button', { name: /Loading|Subscribing/i })).toBeDisabled()
    await act(async () => {
      await vi.advanceTimersByTimeAsync(FORM_TIMEOUT_MS)
    })
    expect(screen.getByRole('alert')).toHaveTextContent(/timed out.*try again/i)
    expect(input).toHaveValue('team@example.com')
    expect(input).not.toHaveAttribute('aria-invalid', 'true')
    expect(submit.mock.calls[0][1].signal.aborted).toBe(true)
    expect(
      screen.getByRole('button', { name: /request early access|subscribe to newsletter/i })
    ).toBeEnabled()
    submit.mockResolvedValueOnce({ ok: true })
    await act(async () => {
      fireEvent.submit(screen.getByRole('form', { name: label }))
    })
    expect(submit).toHaveBeenCalledTimes(2)
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000)
    })
    expect(screen.getByRole('status')).toBeInTheDocument()
  }
)
