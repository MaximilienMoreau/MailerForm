import { afterEach, expect, it, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
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
  const privacy = screen.getByRole('link', { name: /privacy policy.*opens in a new tab/i })
  expect(privacy).toHaveAttribute('target', '_blank')
  expect(privacy).toHaveAttribute('rel', 'noopener noreferrer')
  privacy.addEventListener('click', (event) => event.preventDefault(), { once: true })
  await user.click(privacy)
  expect(screen.getByRole('textbox', { name: 'Email address' })).toHaveValue('reader@example.com')
  expect(screen.getByRole('checkbox')).toBeChecked()
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

it('does not submit a newsletter request without explicit consent', () => {
  vi.stubEnv('VITE_FORMSPREE_ID', 'newsletter-test')
  const submit = vi.fn()
  vi.stubGlobal('fetch', submit)
  render(<NewsletterForm />)
  const form = screen.getByRole('form', { name: 'Newsletter subscription' })
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'reader@example.com' } })
  fireEvent.submit(form)
  expect(submit).not.toHaveBeenCalled()
})

it('keeps the contact fallback when the example environment value has not been replaced', () => {
  vi.stubEnv('VITE_FORMSPREE_ID', 'your_form_id_here')
  render(<NewsletterForm />)
  expect(screen.getByRole('link', { name: /request newsletter subscription/i })).toHaveAttribute(
    'href',
    'mailto:hello@mailerform.io?subject=Newsletter%20subscription%20request'
  )
  expect(screen.queryByRole('form')).not.toBeInTheDocument()
})

it('rejects oversized addresses even when a script bypasses the input length limit', () => {
  vi.stubEnv('VITE_FORMSPREE_ID', 'newsletter-test')
  const submit = vi.fn()
  vi.stubGlobal('fetch', submit)
  render(<NewsletterForm />)
  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: `${'a'.repeat(250)}@example.com` },
  })
  fireEvent.click(screen.getByRole('checkbox'))
  fireEvent.submit(screen.getByRole('form'))
  expect(submit).not.toHaveBeenCalled()
  expect(screen.getByRole('alert')).toHaveTextContent('254 characters or fewer')
})
