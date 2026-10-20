import { expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import BlogPostPage from '@/pages/BlogPostPage'
import { posts } from '@/data/posts'

function renderPost(slug: string) {
  return render(
    <MemoryRouter initialEntries={[`/blog/${slug}`]}>
      <Routes>
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>
    </MemoryRouter>
  )
}

it('renders a complete guide with navigation and a separate newsletter', () => {
  renderPost(posts[0].slug)
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(posts[0].title)
  for (const section of posts[0].body)
    expect(screen.getByRole('heading', { name: section.heading })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /all guides/i })).toHaveAttribute('href', '/blog')
  expect(screen.getByRole('heading', { name: /newsletter/i })).toBeInTheDocument()
})

it('handles an unknown article', () => {
  renderPost('does-not-exist')
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/not found|lost|404/i)
  expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex, follow'
  )
})
