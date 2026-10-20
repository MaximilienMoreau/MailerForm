import { lazy, Suspense } from 'react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ErrorBoundary from '@/components/ErrorBoundary'

function ThrowOnce({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error('Test error')
  return <div>Rendered successfully</div>
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Suppress expected React error output during tests
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>All good</div>
      </ErrorBoundary>
    )
    expect(screen.getByText('All good')).toBeInTheDocument()
  })

  it('shows the error fallback UI when a child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowOnce shouldThrow />
      </ErrorBoundary>
    )
    expect(screen.getByRole('heading', { name: /something went wrong/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
    expect(screen.getByText(/contact support/i)).toBeInTheDocument()
  })

  it('does not show the error UI when children render normally', () => {
    render(
      <ErrorBoundary>
        <ThrowOnce shouldThrow={false} />
      </ErrorBoundary>
    )
    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument()
    expect(screen.getByText('Rendered successfully')).toBeInTheDocument()
  })

  it('resets to normal rendering when Try again is clicked', async () => {
    const user = userEvent.setup()
    let throwing = true

    function ControlledThrow() {
      if (throwing) throw new Error('Test error')
      return <div>Recovered</div>
    }

    render(
      <ErrorBoundary>
        <ControlledThrow />
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()

    throwing = false
    await user.click(screen.getByRole('button', { name: /try again/i }))

    expect(screen.getByText('Recovered')).toBeInTheDocument()
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
  })
})

it('retries a failed lazy import by reloading the same URL and provides a home link', async () => {
  vi.spyOn(console, 'error').mockImplementation(() => {})
  const reload = vi.spyOn(window.location, 'reload').mockImplementation(() => {})
  window.history.replaceState({}, '', '/?plan=growth&billing=yearly#cta')
  const FailedImport = lazy(() =>
    Promise.reject(new TypeError('Failed to fetch dynamically imported module: /assets/page.js'))
  )
  try {
    render(
      <ErrorBoundary pagePath="/">
        <Suspense fallback={<p>Loading…</p>}>
          <FailedImport />
        </Suspense>
      </ErrorBoundary>
    )
    expect(await screen.findByRole('heading', { name: /page could not load/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /back to homepage/i })).toHaveAttribute('href', '/')
    await userEvent.click(screen.getByRole('button', { name: /try again/i }))
    expect(reload).toHaveBeenCalledOnce()
    expect(window.location.search).toBe('?plan=growth&billing=yearly')
    expect(window.location.hash).toBe('#cta')
  } finally {
    window.history.replaceState({}, '', '/')
    vi.restoreAllMocks()
  }
})
