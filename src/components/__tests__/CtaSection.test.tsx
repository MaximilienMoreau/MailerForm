import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
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
  it('renders the email input and submit button', () => {
    renderCta()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /start for free/i })).toBeInTheDocument()
  })

  it('shows an error for a clearly invalid email', async () => {
    const user = userEvent.setup()
    renderCta()

    await user.type(screen.getByLabelText(/email address/i), 'notanemail')
    await user.click(screen.getByRole('button', { name: /start for free/i }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })

  it('shows an error for a value that only contains @', async () => {
    const user = userEvent.setup()
    renderCta()

    await user.type(screen.getByLabelText(/email address/i), '@')
    await user.click(screen.getByRole('button', { name: /start for free/i }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })

  it('shows a success state for a valid email', async () => {
    const user = userEvent.setup()
    renderCta()

    await user.type(screen.getByLabelText(/email address/i), 'hello@example.com')
    await user.click(screen.getByRole('button', { name: /start for free/i }))

    await waitFor(() => {
      expect(screen.getByRole('status')).toBeInTheDocument()
      expect(screen.getByText(/you're on the list/i)).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('does not submit when email is empty', async () => {
    const user = userEvent.setup()
    renderCta()

    await user.click(screen.getByRole('button', { name: /start for free/i }))

    // Form stays in idle state — no alert, no success
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})
