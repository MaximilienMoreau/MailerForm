import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MotionConfig } from 'framer-motion'
import { BrowserRouter } from 'react-router-dom'
import Navbar from '../Navbar'

function renderNavbar() {
  return render(
    <BrowserRouter>
      <MotionConfig reducedMotion="always">
        <Navbar />
      </MotionConfig>
    </BrowserRouter>
  )
}

describe('Navbar', () => {
  it('renders the MailForm logo', () => {
    renderNavbar()
    expect(screen.getByText('MailForm')).toBeInTheDocument()
  })

  it('renders desktop nav links', () => {
    renderNavbar()
    expect(screen.getByRole('link', { name: /^features$/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^pricing$/i })).toBeInTheDocument()
  })

  it('opens the mobile menu on toggle button click', async () => {
    const user = userEvent.setup()
    renderNavbar()

    const toggle = screen.getByRole('button', { name: /open menu/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('dialog', { name: /mobile navigation/i })).toBeInTheDocument()
  })

  it('closes the mobile menu when Escape is pressed', async () => {
    const user = userEvent.setup()
    renderNavbar()

    const toggle = screen.getByRole('button', { name: /open menu/i })
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')

    await user.keyboard('{Escape}')
    // aria-expanded reflects closed state regardless of exit animation
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })
})
