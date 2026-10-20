import { afterEach, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Link, MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom'
import ScrollToTop from '@/components/ScrollToTop'

function Page({ delayed = false }: { delayed?: boolean }) {
  return (
    <>
      <div style={{ display: 'none' }}>
        <main>
          <h1>Hidden previous title</h1>
        </main>
      </div>
      <main id="main-content" aria-busy={delayed || undefined}>
        {delayed ? <p>Loading…</p> : <h1>Guide title</h1>}
      </main>
    </>
  )
}
function Fixture({ delayed = false }: { delayed?: boolean }) {
  const navigate = useNavigate()
  return (
    <>
      <ScrollToTop />
      <Link to="/guide">Read guide</Link>
      <Link to="/guide#details">Read section</Link>
      <button onClick={() => navigate(-1)}>Back</button>
      <Routes>
        <Route
          path="/"
          element={
            <main id="main-content">
              <h1>Home title</h1>
            </main>
          }
        />
        <Route
          path="/guide"
          element={
            <>
              <Page delayed={delayed} />
              <section id="details">
                <h2>Section title</h2>
              </section>
            </>
          }
        />
      </Routes>
    </>
  )
}

afterEach(() => {
  vi.restoreAllMocks()
})
it('preserves initial focus, then focuses the new page title and handles back navigation', async () => {
  render(
    <MemoryRouter>
      <Fixture />
    </MemoryRouter>
  )
  expect(screen.getByRole('heading', { name: 'Home title' })).not.toHaveFocus()
  fireEvent.click(screen.getByRole('link', { name: 'Read guide' }))
  const heading = screen.getByRole('heading', { name: 'Guide title' })
  expect(heading).toHaveFocus()
  expect(heading).toHaveAttribute('tabindex', '-1')
  screen.getByRole('button').focus()
  expect(heading).not.toHaveAttribute('tabindex')
  fireEvent.click(screen.getByRole('button', { name: 'Back' }))
  await waitFor(() => expect(screen.getByRole('heading', { name: 'Home title' })).toHaveFocus())
})

it('waits for a lazy page to replace its loading placeholder', async () => {
  const { rerender } = render(
    <MemoryRouter>
      <Fixture delayed />
    </MemoryRouter>
  )
  fireEvent.click(screen.getByRole('link', { name: 'Read guide' }))
  expect(screen.getByRole('main')).not.toHaveFocus()
  rerender(
    <MemoryRouter>
      <Fixture delayed={false} />
    </MemoryRouter>
  )
  await waitFor(() => expect(screen.getByRole('heading', { name: 'Guide title' })).toHaveFocus())
})

it('scrolls to the anchor without animation and focuses its heading for reduced motion', () => {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)')
  Object.defineProperty(media, 'matches', { value: true, configurable: true })
  vi.spyOn(window, 'matchMedia').mockReturnValue(media)
  const scroll = vi
    .spyOn(window.HTMLElement.prototype, 'scrollIntoView')
    .mockImplementation(() => {})
  render(
    <MemoryRouter>
      <Fixture />
    </MemoryRouter>
  )
  fireEvent.click(screen.getByRole('link', { name: 'Read section' }))
  expect(scroll).toHaveBeenCalledWith({ behavior: 'auto' })
  expect(screen.getByRole('heading', { name: 'Section title' })).toHaveFocus()
})

it('disconnects a pending observer when navigation is abandoned', () => {
  const disconnect = vi.spyOn(window.MutationObserver.prototype, 'disconnect')
  const { unmount } = render(
    <MemoryRouter>
      <Fixture delayed />
    </MemoryRouter>
  )
  fireEvent.click(screen.getByRole('link', { name: 'Read guide' }))
  act(() => unmount())
  expect(disconnect).toHaveBeenCalled()
})
