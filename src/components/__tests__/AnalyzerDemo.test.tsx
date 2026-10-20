import { it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AnalyzerDemo from '@/components/AnalyzerDemo'

it('lets visitors inspect risks, apply a correction, and reset each scenario', async () => {
  const user = userEvent.setup()
  render(<AnalyzerDemo />)
  expect(screen.getByText(/94/)).toBeInTheDocument()
  await user.click(screen.getByRole('radio', { name: 'Authentication issue' }))
  expect(screen.getByText(/42/)).toBeInTheDocument()
  expect(screen.getByText(/sample DMARC check fails/)).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Apply sample corrections' }))
  expect(screen.getByText(/94/)).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Reset sample' }))
  expect(screen.getByText(/42/)).toBeInTheDocument()
  await user.click(screen.getByRole('radio', { name: 'Risky content' }))
  expect(screen.getByText(/61/)).toBeInTheDocument()
})
