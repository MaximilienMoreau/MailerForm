import { it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ComparisonSection from '@/components/ComparisonSection'

it('offers actionable evaluation criteria without unsupported competitor ratings', () => {
  render(<ComparisonSection />)
  expect(screen.getByRole('heading', { name: /compare what matters/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /explore the sample/i })).toHaveAttribute('href', '#deliverability')
  expect(screen.getByRole('link', { name: /review preview pricing/i })).toHaveAttribute('href', '#pricing')
  expect(screen.queryByText('Best-in-class')).not.toBeInTheDocument()
})
