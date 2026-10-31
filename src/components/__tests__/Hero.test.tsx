import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MotionConfig } from 'framer-motion'
import { BrowserRouter } from 'react-router-dom'
import Hero from '@/components/Hero'

function renderHero() {
  return render(
    <BrowserRouter>
      <MotionConfig reducedMotion="always">
        <Hero />
      </MotionConfig>
    </BrowserRouter>
  )
}

describe('Hero', () => {
  it('renders the main h1 heading', () => {
    renderHero()
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('primary CTA links to the sign-up form (#cta)', () => {
    renderHero()
    expect(screen.getByRole('link', { name: /request early access/i })).toHaveAttribute(
      'href',
      '/#cta'
    )
  })

  it('secondary CTA links to the deliverability section', () => {
    renderHero()
    expect(screen.getByRole('link', { name: /see how it works/i })).toHaveAttribute(
      'href',
      '/#deliverability'
    )
  })

  it('renders trust badges', () => {
    renderHero()
    expect(screen.getByText(/Authentication checks/)).toBeInTheDocument()
    expect(screen.getByText(/Preview before sending/)).toBeInTheDocument()
    expect(screen.getByText(/No payment to request access/i)).toBeInTheDocument()
  })
})
