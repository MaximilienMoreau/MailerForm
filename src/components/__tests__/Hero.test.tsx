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
    expect(screen.getByRole('link', { name: /start for free/i })).toHaveAttribute('href', '#cta')
  })

  it('secondary CTA links to the features section', () => {
    renderHero()
    expect(screen.getByRole('link', { name: /see how it works/i })).toHaveAttribute('href', '#features')
  })

  it('renders all four stat labels', () => {
    renderHero()
    expect(screen.getByText('Inbox placement rate')).toBeInTheDocument()
    expect(screen.getByText('API endpoints')).toBeInTheDocument()
    expect(screen.getByText('Delivery latency')).toBeInTheDocument()
    expect(screen.getByText('Emails analyzed')).toBeInTheDocument()
  })

  it('renders trust badges', () => {
    renderHero()
    expect(screen.getByText(/GDPR/)).toBeInTheDocument()
    expect(screen.getByText(/SOC 2/)).toBeInTheDocument()
    expect(screen.getByText(/10k emails/i)).toBeInTheDocument()
  })

  it('renders the deliverability card', () => {
    renderHero()
    expect(screen.getByText('Pre-send Analysis')).toBeInTheDocument()
    expect(screen.getByText('Inbox safe')).toBeInTheDocument()
  })
})
