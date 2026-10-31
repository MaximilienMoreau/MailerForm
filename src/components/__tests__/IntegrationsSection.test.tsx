import { BrowserRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import IntegrationsSection from '@/components/IntegrationsSection'

it('reveals planned integrations on demand and keeps their status and contact actions clear', async () => {
  render(
    <BrowserRouter>
      <IntegrationsSection />
    </BrowserRouter>
  )
  const disclosure = screen.getByText('Explore SDKs and integrations').closest('details')!
  expect(disclosure).not.toHaveAttribute('open')
  await userEvent.click(screen.getByText('Explore SDKs and integrations'))
  expect(disclosure).toHaveAttribute('open')
  expect(screen.getByRole('link', { name: 'View Node.js code example' })).toHaveAttribute(
    'href',
    '/#api'
  )
  const cards = within(
    screen.getByRole('list', { name: 'Integration examples and plans' })
  ).getAllByRole('listitem')
  expect(cards).toHaveLength(12)
  expect(within(cards[0]).getByText('Code example')).toBeInTheDocument()
  for (const card of cards.slice(1)) {
    expect(within(card).getByText('Planned', { exact: true })).toBeInTheDocument()
    const action = within(card).getByRole('link', { name: /^Discuss .+ availability$/ })
    const href = action.getAttribute('href')!
    expect(href).toMatch(/^mailto:hello@mailerform.io\?/)
    const query = new URLSearchParams(href.split('?')[1])
    expect(query.get('subject')).toMatch(/^Integration request: /)
    expect(query.get('body')).toContain('Please confirm availability')
  }
  expect(screen.queryByText(/500\+|go get|RubyGems:|PyPI:/)).not.toBeInTheDocument()
})
