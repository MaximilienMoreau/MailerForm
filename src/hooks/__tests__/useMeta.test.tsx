import { afterEach, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { useMeta } from '@/hooks/useMeta'

const initialHead = document.head.innerHTML
const article = {
  title: 'A sample guide',
  excerpt: 'An email engineering guide.',
  isoDate: '2026-07-01',
}
function Guide() {
  useMeta({ title: article.title, description: article.excerpt, article })
  return <Link to="/">Home</Link>
}
function Home() {
  useMeta({ title: 'MailerForm', description: 'Explore the email workflow.' })
  return <h1>Home</h1>
}

afterEach(() => {
  document.head.innerHTML = initialHead
  window.history.replaceState({}, '', '/')
})

it('updates article metadata and clears article schema when navigating back to the landing page', async () => {
  document.head.innerHTML =
    '<title>Static guide</title><meta name="description" content="Static description"><meta property="og:type" content="article"><meta property="og:title" content="Static guide"><meta property="og:description" content="Static description"><meta property="og:url" content="https://mailerform.io/blog/test"><link rel="canonical" href="https://mailerform.io/blog/test"><script id="page-structured-data" type="application/ld+json">{"headline":"Static guide"}</script>'
  window.history.replaceState({}, '', '/blog/test')
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/blog/test" element={<Guide />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
  expect(document.title).toBe(article.title)
  expect(JSON.parse(document.getElementById('page-structured-data')!.textContent!)).toMatchObject({
    headline: article.title,
    url: 'https://mailerform.io/blog/test',
  })
  await userEvent.click(screen.getByRole('link', { name: 'Home' }))
  expect(document.title).toBe('MailerForm')
  expect(document.querySelector('meta[property="og:type"]')).toHaveAttribute('content', 'website')
  expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://mailerform.io/'
  )
  expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
    'content',
    'Explore the email workflow.'
  )
  expect(document.getElementById('page-structured-data')).toBeNull()
})

it('clears a static 404 noindex directive and creates the home canonical after returning home', async () => {
  const { default: NotFound } = await import('@/pages/NotFound')
  document.head.innerHTML =
    '<title>Page not found</title><meta name="robots" content="noindex, follow"><meta name="description" content="Missing page"><meta property="og:type" content="website">'
  window.history.replaceState({}, '', '/missing')
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
  expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex, follow'
  )
  expect(document.querySelector('link[rel="canonical"]')).toBeNull()
  await userEvent.click(screen.getByRole('link', { name: /^Back to homepage$/i }))
  expect(document.querySelector('meta[name="robots"]')).toBeNull()
  expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://mailerform.io/'
  )
})
