import { afterEach, expect, it, vi } from 'vitest'
import { render, screen, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import PricingSection from '@/components/PricingSection'
import CtaSection from '@/components/CtaSection'

function HistoryBack() {
  const navigate = useNavigate()
  return (
    <button type="button" onClick={() => navigate(-1)}>
      Previous selection
    </button>
  )
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
  window.history.replaceState({}, '', '/')
})

it('changes plans without remounting the form and submits the current selection with the existing email', async () => {
  vi.stubEnv('VITE_FORMSPREE_ID', 'test')
  const submit = vi.fn().mockResolvedValue({ ok: true })
  vi.stubGlobal('fetch', submit)
  const user = userEvent.setup()
  render(
    <BrowserRouter>
      <MotionConfig reducedMotion="always">
        <HistoryBack />
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
  expect(window.location.hash).toBe('#cta')
  expect(screen.getByRole('textbox')).toBe(input)
  expect(input).toHaveValue('team@example.com')
  expect(screen.getByText('growth', { exact: true })).toBeInTheDocument()
  await user.click(screen.getByRole('switch'))
  await user.click(
    within(screen.getByRole('article', { name: 'Scale plan' })).getByRole('link', {
      name: /request early access/i,
    })
  )
  expect(screen.getByRole('textbox')).toBe(input)
  expect(input).toHaveValue('team@example.com')
  await user.click(screen.getByRole('button', { name: 'Previous selection' }))
  await waitFor(() => expect(window.location.search).toBe('?plan=growth&billing=monthly'))
  expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false')
  expect(screen.getByRole('textbox')).toBe(input)
  expect(input).toHaveValue('team@example.com')
  await user.click(screen.getByRole('switch'))
  await user.click(
    within(screen.getByRole('article', { name: 'Scale plan' })).getByRole('link', {
      name: /request early access/i,
    })
  )
  await user.click(screen.getByRole('button', { name: /request early access/i }))
  expect(await screen.findByRole('status')).toHaveTextContent(/scale · annual billing/i)
  expect(JSON.parse(submit.mock.calls[0][1].body)).toMatchObject({
    email: 'team@example.com',
    plan: 'scale',
    billing: 'yearly',
  })
})
