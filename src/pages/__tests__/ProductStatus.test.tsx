import { expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AboutPage from '@/pages/AboutPage'
import ChangelogPage from '@/pages/ChangelogPage'

it('explains invitation access and avoids a dated public launch claim on the about page', () => {
  render(
    <MemoryRouter>
      <AboutPage />
    </MemoryRouter>
  )
  const status = screen.getByRole('complementary', { name: 'Product availability' })
  expect(status).toHaveTextContent(/Access is by invitation/i)
  expect(status).toHaveTextContent(/no public launch date is confirmed/i)
  expect(screen.getByRole('heading', { name: 'Where the product stands' })).toBeInTheDocument()
  expect(screen.queryByText(/open the beta to everyone|September 2026/)).not.toBeInTheDocument()
})

it('separates website previews, planned capabilities, and access without inventing release metrics', () => {
  render(
    <MemoryRouter>
      <ChangelogPage />
    </MemoryRouter>
  )
  expect(
    within(screen.getByRole('article', { name: 'What you can explore today' })).getByText(
      'Website preview'
    )
  ).toBeInTheDocument()
  expect(
    within(screen.getByRole('article', { name: 'Product areas under consideration' })).getByText(
      'Planned'
    )
  ).toBeInTheDocument()
  expect(
    screen.getByText(/No confirmed public launch date or dated production release history/i)
  ).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Request the newsletter' })).toHaveAttribute(
    'href',
    '/blog#newsletter'
  )
  expect(
    within(screen.getByRole('article', { name: 'Access and release information' })).getByRole(
      'link',
      { name: 'Request early access' }
    )
  ).toHaveAttribute('href', '/#cta')
  expect(screen.queryByText(/76ms|1\.2s|40%|v1\.4\.0/)).not.toBeInTheDocument()
})
