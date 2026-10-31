import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MotionConfig } from 'framer-motion'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import Navbar from '@/components/Navbar'

function renderNavbar() {
  return render(
    <BrowserRouter>
      <MotionConfig reducedMotion="always">
        <Navbar />
      </MotionConfig>
    </BrowserRouter>
  )
}

describe('Navbar', () => {
  it('renders the MailerForm logo', () => {
    renderNavbar()
    expect(screen.getByText('MailerForm')).toBeInTheDocument()
  })

  it('renders desktop nav links', () => {
    renderNavbar()
    expect(screen.getByRole('link', { name: /^features$/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^pricing$/i })).toBeInTheDocument()
  })

  it('opens the mobile menu on toggle button click', async () => {
    const user = userEvent.setup()
    renderNavbar()

    const toggle = screen.getByRole('button', { name: /open menu/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('dialog', { name: /mobile navigation/i })).toBeInTheDocument()
  })

  it('closes the mobile menu when Escape is pressed', async () => {
    const user = userEvent.setup()
    renderNavbar()

    const toggle = screen.getByRole('button', { name: /open menu/i })
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')

    await user.keyboard('{Escape}')
    // aria-expanded reflects closed state regardless of exit animation
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })
})

it('closes the mobile menu and restores scrolling when switching to desktop', async () => {
  const { vi } = await import('vitest')
  const { act } = await import('@testing-library/react')
  const media = window.matchMedia('(min-width: 768px)')
  const matchMedia = vi.spyOn(window, 'matchMedia').mockReturnValue(media)
  document.body.style.overflow = 'auto'
  try {
    renderNavbar()
    await userEvent.click(screen.getByRole('button', { name: /open menu/i }))
    expect(document.body.style.overflow).toBe('hidden')
    Object.defineProperty(media, 'matches', { value: true, configurable: true })
    act(() => {
      media.dispatchEvent(new Event('change'))
    })
    expect(screen.getByRole('button', { name: /open menu/i })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
    expect(document.body.style.overflow).toBe('auto')
    await userEvent.tab()
    expect(screen.getByRole('button', { name: /open menu/i })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
  } finally {
    matchMedia.mockRestore()
    document.body.style.overflow = ''
  }
})

it('uses router location for section links on secondary pages', () => {
  render(
    <MemoryRouter initialEntries={['/about']}>
      <Navbar />
    </MemoryRouter>
  )
  expect(screen.getByRole('link', { name: /^features$/i })).toHaveAttribute('href', '/#features')
  expect(screen.getByRole('link', { name: /request early access/i })).toHaveAttribute(
    'href',
    '/#cta'
  )
})

it('marks the last reached section in page order as active', () => {
  const view = render(
    <MemoryRouter>
      <Navbar />
      <section id="deliverability" />
      <section id="features" />
      <section id="pricing" />
    </MemoryRouter>
  )
  const positions = { deliverability: -800, features: -100, pricing: 1000 }
  for (const [id, top] of Object.entries(positions)) {
    vi.spyOn(view.container.querySelector(`#${id}`)!, 'getBoundingClientRect').mockReturnValue({
      top,
    } as DOMRect)
  }
  try {
    fireEvent.scroll(window)
    expect(screen.getByRole('link', { name: 'Features' })).toHaveAttribute(
      'aria-current',
      'location'
    )
    expect(screen.getByRole('link', { name: 'Deliverability' })).not.toHaveAttribute('aria-current')
  } finally {
    vi.restoreAllMocks()
  }
})
