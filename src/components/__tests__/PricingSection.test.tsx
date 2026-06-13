import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MotionConfig } from 'framer-motion'
import PricingSection from '@/components/PricingSection'

function renderPricing() {
  return render(
    <MotionConfig reducedMotion="always">
      <PricingSection />
    </MotionConfig>
  )
}

describe('PricingSection', () => {
  it('renders all three plan names', () => {
    renderPricing()
    expect(screen.getByText('Starter')).toBeInTheDocument()
    expect(screen.getByText('Growth')).toBeInTheDocument()
    expect(screen.getByText('Scale')).toBeInTheDocument()
  })

  it('shows monthly prices by default', () => {
    renderPricing()
    const toggle = screen.getByRole('switch')
    expect(toggle).toHaveAttribute('aria-checked', 'false')
    expect(screen.getAllByText('$29').length).toBeGreaterThan(0)
  })

  it('switches to yearly prices on toggle click', async () => {
    const user = userEvent.setup()
    renderPricing()

    await user.click(screen.getByRole('switch'))

    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
    expect(screen.getAllByText('$23').length).toBeGreaterThan(0)
  })

  it('toggles back to monthly on second click', async () => {
    const user = userEvent.setup()
    renderPricing()

    const toggle = screen.getByRole('switch')
    await user.click(toggle)
    await user.click(toggle)

    expect(toggle).toHaveAttribute('aria-checked', 'false')
    expect(screen.getAllByText('$29').length).toBeGreaterThan(0)
  })

  it('renders the enterprise contact callout', () => {
    renderPricing()
    expect(screen.getByText(/custom volume or white-label/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /talk to sales/i })).toHaveAttribute('href', 'mailto:sales@mailform.io')
  })

  it('toggle has correct ARIA labelling', () => {
    renderPricing()
    const toggle = screen.getByRole('switch')
    expect(toggle).toHaveAttribute('aria-labelledby', 'billing-monthly billing-yearly')
  })
})
