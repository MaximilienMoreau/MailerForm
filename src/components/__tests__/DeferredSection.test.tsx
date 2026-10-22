import { afterEach, expect, it, vi } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { StaticRenderingContext } from '@/lib/staticRendering'
import DeferredSection from '@/components/DeferredSection'

afterEach(() => vi.unstubAllGlobals())

function mockObserver() {
  let notify: IntersectionObserverCallback = () => {}
  const disconnect = vi.fn()
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(callback: IntersectionObserverCallback) {
        notify = callback
      }
      observe = vi.fn()
      disconnect = disconnect
    }
  )
  return {
    disconnect,
    enter: () =>
      notify([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver),
  }
}

it('waits for proximity and keeps mounted content after it enters view', () => {
  const observer = mockObserver()
  const view = render(
    <MemoryRouter>
      <DeferredSection>
        <input aria-label="Email" defaultValue="team@example.com" />
      </DeferredSection>
    </MemoryRouter>
  )
  expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  act(() => observer.enter())
  expect(screen.getByRole('textbox')).toHaveValue('team@example.com')
  expect(observer.disconnect).toHaveBeenCalled()
  view.unmount()
})

it.each(['/#cta', '/#pricing', '/#integrations'])(
  'loads sections immediately for anchor navigation to %s',
  (path) => {
    mockObserver()
    render(
      <MemoryRouter initialEntries={[path]}>
        <DeferredSection>
          <p>Section content</p>
        </DeferredSection>
      </MemoryRouter>
    )
    expect(screen.getByText('Section content')).toBeInTheDocument()
  }
)

it('includes content during static rendering regardless of viewport', () => {
  mockObserver()
  render(
    <MemoryRouter>
      <StaticRenderingContext.Provider value={true}>
        <DeferredSection>
          <p>Published content</p>
        </DeferredSection>
      </StaticRenderingContext.Provider>
    </MemoryRouter>
  )
  expect(screen.getByText('Published content')).toBeInTheDocument()
})

it('loads content when IntersectionObserver is unavailable', () => {
  vi.stubGlobal('IntersectionObserver', undefined)
  Reflect.deleteProperty(window, 'IntersectionObserver')
  render(
    <MemoryRouter>
      <DeferredSection>
        <p>Fallback content</p>
      </DeferredSection>
    </MemoryRouter>
  )
  expect(screen.getByText('Fallback content')).toBeInTheDocument()
})
