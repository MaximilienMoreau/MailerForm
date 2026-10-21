import { afterEach, expect, it, vi } from 'vitest'
import { render, screen, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import PricingSection from '@/components/PricingSection'
import CtaSection from '@/components/CtaSection'

function Back() {
  const navigate = useNavigate()
  return <button onClick={() => navigate(-1)}>Previous selection</button>
}
afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
  window.history.replaceState({}, '', '/')
})
it('keeps the email input mounted across plan choices and history, and submits the current plan', async () => {
  vi.stubEnv('VITE_FORMSPREE_ID', 'test')
  const submit = vi.fn().mockResolvedValue({ ok: true })
  vi.stubGlobal('fetch', submit)
  const user = userEvent.setup()
  render(
    <BrowserRouter>
      <MotionConfig reducedMotion="always">
        <Back />
        <PricingSection />
        <CtaSection />
      </MotionConfig>
    </BrowserRouter>
  )
  const input = screen.getByRole('textbox', { name: 'Email address' })
  await user.type(input, 'team@example.com')
  await user.click(
    within(screen.getByRole('article', { name: 'Growth plan' })).getByRole('link', {
      name: /request early access/i,
    })
  )
  expect(window.location.search).toBe('?plan=growth&billing=monthly')
  expect(screen.getByRole('textbox')).toBe(input)
  await user.click(screen.getByRole('switch'))
  await user.click(
    within(screen.getByRole('article', { name: 'Scale plan' })).getByRole('link', {
      name: /request early access/i,
    })
  )
  await user.click(screen.getByRole('button', { name: 'Previous selection' }))
  await waitFor(() => expect(window.location.search).toBe('?plan=growth&billing=yearly'))
  expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
  expect(screen.getByRole('textbox')).toBe(input)
  expect(input).toHaveValue('team@example.com')
  await user.click(screen.getByRole('button', { name: /request early access/i }))
  expect(await screen.findByRole('status')).toHaveTextContent(/growth · annual billing/i)
  expect(JSON.parse(submit.mock.calls[0][1].body)).toMatchObject({
    email: 'team@example.com',
    plan: 'growth',
    billing: 'yearly',
  })
})

it('updates the selected request terms when billing changes without choosing the plan again', async () => {
  window.history.replaceState({}, '', '/?utm_source=test&plan=growth&billing=monthly#pricing')
  vi.stubEnv('VITE_FORMSPREE_ID', 'test')
  const submit = vi.fn().mockResolvedValue({ ok: true })
  vi.stubGlobal('fetch', submit)
  const user = userEvent.setup()
  render(
    <BrowserRouter>
      <PricingSection />
      <CtaSection />
    </BrowserRouter>
  )
  await user.type(screen.getByRole('textbox'), 'team@example.com')
  await user.click(screen.getByRole('switch'))
  expect(window.location.search).toContain('utm_source=test')
  expect(window.location.search).toContain('billing=yearly')
  expect(window.location.hash).toBe('#pricing')
  expect(screen.getByText(/Selected plan:/)).toHaveTextContent('yearly billing')
  await user.click(screen.getByRole('button', { name: /request early access/i }))
  await screen.findByRole('status')
  expect(JSON.parse(submit.mock.calls[0][1].body)).toMatchObject({
    plan: 'growth',
    billing: 'yearly',
  })
})
