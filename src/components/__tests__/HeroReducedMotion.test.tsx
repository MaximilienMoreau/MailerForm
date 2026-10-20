import { afterEach, expect, it, vi } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Hero from '@/components/Hero'
import { stats } from '@/data/stats'

vi.mock('framer-motion', async (importOriginal) => ({
  ...(await importOriginal<typeof import('framer-motion')>()),
  useInView: () => true,
}))
afterEach(() => vi.restoreAllMocks())
it('shows final values immediately with reduced motion and reacts to preference changes', () => {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)')
  Object.defineProperty(media, 'matches', { value: true, configurable: true })
  vi.spyOn(window, 'matchMedia').mockReturnValue(media)
  render(
    <MemoryRouter>
      <Hero />
    </MemoryRouter>
  )
  const values = screen.getAllByRole('definition', { hidden: true })
  stats.forEach((stat, index) => {
    expect(values[index]).toHaveTextContent(
      `${stat.prefix}${stat.value.toFixed(stat.decimals)}${stat.suffix}`
    )
  })
  act(() => {
    Object.defineProperty(media, 'matches', { value: false, configurable: true })
    media.dispatchEvent(new Event('change'))
  })
  act(() => {
    Object.defineProperty(media, 'matches', { value: true, configurable: true })
    media.dispatchEvent(new Event('change'))
  })
  stats.forEach((stat, index) => {
    expect(values[index]).toHaveTextContent(
      `${stat.prefix}${stat.value.toFixed(stat.decimals)}${stat.suffix}`
    )
  })
})
