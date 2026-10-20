import { expect, it } from 'vitest'
import { Suspense, lazy } from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PageLoading from '@/components/PageLoading'

it('keeps navigation and a live loading status available while a route is pending', () => {
  const Pending = lazy(() => new Promise<{ default: () => null }>(() => {}))
  render(
    <MemoryRouter>
      <Suspense fallback={<PageLoading />}>
        <Pending />
      </Suspense>
    </MemoryRouter>
  )
  expect(screen.getByRole('status')).toHaveTextContent('Loading page')
  expect(screen.getByRole('main')).toHaveAttribute('aria-busy', 'true')
  expect(screen.getByRole('link', { name: /MailerForm/i })).toBeInTheDocument()
})
