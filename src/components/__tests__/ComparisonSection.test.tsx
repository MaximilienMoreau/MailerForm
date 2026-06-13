import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MotionConfig } from 'framer-motion'
import ComparisonSection from '@/components/ComparisonSection'

function renderComparison() {
  return render(
    <MotionConfig reducedMotion="always">
      <ComparisonSection />
    </MotionConfig>
  )
}

describe('ComparisonSection', () => {
  it('renders the section heading', () => {
    renderComparison()
    expect(screen.getByRole('heading', { name: /how mailform compares/i })).toBeInTheDocument()
  })

  it('renders all four provider column headers', () => {
    renderComparison()
    expect(screen.getByRole('columnheader', { name: /mailform/i })).toBeInTheDocument()
    expect(screen.getByText('SendGrid')).toBeInTheDocument()
    expect(screen.getByText('Mailgun')).toBeInTheDocument()
    expect(screen.getByText('Resend')).toBeInTheDocument()
  })

  it('renders descriptive aria-labels for best-in-class cells', () => {
    renderComparison()
    expect(
      screen.getByLabelText('MailForm: best-in-class for Deliverability analysis (pre-send)')
    ).toBeInTheDocument()
  })

  it('renders descriptive aria-labels for unsupported cells', () => {
    renderComparison()
    expect(
      screen.getByLabelText('Resend: not available for Marketing campaigns')
    ).toBeInTheDocument()
  })

  it('renders the legend with all four states', () => {
    renderComparison()
    expect(screen.getByText('Best-in-class')).toBeInTheDocument()
    expect(screen.getByText('Supported')).toBeInTheDocument()
    expect(screen.getByText('Partial')).toBeInTheDocument()
    expect(screen.getByText('Not available')).toBeInTheDocument()
  })

  it('table has an accessible label', () => {
    renderComparison()
    expect(
      screen.getByRole('table', { name: /feature comparison/i })
    ).toBeInTheDocument()
  })
})
