import { expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MotionConfig } from 'framer-motion'
import FeaturesSection from '@/components/FeaturesSection'
import { features } from '@/data/features'

it('supports roving focus, wrapping arrow keys, Home, End, and panel relationships', async () => {
  const user = userEvent.setup()
  render(
    <MotionConfig reducedMotion="always">
      <FeaturesSection />
    </MotionConfig>
  )
  const tabs = screen.getAllByRole('tab')
  const panel = screen.getByRole('tabpanel')
  tabs[0].focus()
  await user.keyboard('{ArrowRight}')
  expect(tabs[1]).toHaveFocus()
  expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
  expect(tabs[0]).toHaveAttribute('tabindex', '-1')
  expect(tabs[1]).toHaveAttribute('tabindex', '0')
  expect(tabs[1]).toHaveAttribute('aria-controls', panel.id)
  expect(panel).toHaveAttribute('aria-labelledby', tabs[1].id)
  expect(panel).toHaveTextContent(features[1].description)
  await user.keyboard('{End}')
  expect(tabs[tabs.length - 1]).toHaveFocus()
  await user.keyboard('{ArrowRight}')
  expect(tabs[0]).toHaveFocus()
  await user.keyboard('{ArrowLeft}')
  expect(tabs[tabs.length - 1]).toHaveFocus()
  await user.keyboard('{Home}')
  expect(tabs[0]).toHaveFocus()
})
