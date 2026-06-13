import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MotionConfig } from 'framer-motion'
import FaqSection from '../FaqSection'

function renderFaq() {
  return render(
    <MotionConfig reducedMotion="always">
      <FaqSection />
    </MotionConfig>
  )
}

describe('FaqSection', () => {
  it('renders the FAQ heading', () => {
    renderFaq()
    expect(screen.getByRole('heading', { name: /frequently asked questions/i })).toBeInTheDocument()
  })

  it('first question button is expanded by default', () => {
    renderFaq()
    // The first FAQ row is open (aria-expanded=true) by default
    const firstButton = screen.getAllByRole('button').find(
      btn => btn.getAttribute('aria-expanded') === 'true'
    )
    expect(firstButton).toBeDefined()
  })

  it('can toggle a question open and closed', async () => {
    const user = userEvent.setup()
    renderFaq()

    const secondQuestion = screen.getByRole('button', { name: /migrate from sendgrid/i })
    expect(secondQuestion).toHaveAttribute('aria-expanded', 'false')

    await user.click(secondQuestion)
    expect(secondQuestion).toHaveAttribute('aria-expanded', 'true')

    await user.click(secondQuestion)
    expect(secondQuestion).toHaveAttribute('aria-expanded', 'false')
  })
})
