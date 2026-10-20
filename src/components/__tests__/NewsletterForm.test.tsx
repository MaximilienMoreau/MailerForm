import { afterEach, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewsletterForm from '@/components/NewsletterForm'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

it('collects newsletter consent and sends a purpose distinct from early access', async () => {
  vi.stubEnv('VITE_FORMSPREE_ID', 'newsletter-test')
  const submit = vi.fn().mockResolvedValue({ ok: true })
  vi.stubGlobal('fetch', submit)
  const user = userEvent.setup()
  render(<NewsletterForm />)
  await user.type(screen.getByRole('textbox', { name: 'Email address' }), 'reader@example.com')
  await user.click(screen.getByRole('checkbox'))
  await user.click(screen.getByRole('button', { name: 'Subscribe to newsletter' }))
  expect(await screen.findByRole('status')).toHaveTextContent('Subscription request received')
  expect(JSON.parse(submit.mock.calls[0][1].body)).toMatchObject({
    email: 'reader@example.com',
    purpose: 'newsletter',
    consent: true,
  })
})

it('offers retry after a failed request', async () => {
  vi.stubEnv('VITE_FORMSPREE_ID', 'newsletter-test')
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
  render(<NewsletterForm />)
  await userEvent.type(screen.getByRole('textbox'), 'reader@example.com')
  await userEvent.click(screen.getByRole('checkbox'))
  await userEvent.click(screen.getByRole('button', { name: 'Subscribe to newsletter' }))
  expect(await screen.findByRole('alert')).toHaveTextContent('Could not subscribe')
  expect(screen.getByRole('button')).toBeEnabled()
})

it('offers an explicit newsletter contact when the form is not configured', () => {
  vi.stubEnv('VITE_FORMSPREE_ID', '')
  render(<NewsletterForm />)
  expect(screen.getByRole('link', { name: /request newsletter/i })).toHaveAttribute(
    'href',
    'mailto:hello@mailerform.io?subject=Newsletter%20subscription%20request'
  )
})
