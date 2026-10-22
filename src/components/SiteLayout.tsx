import type { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface SiteLayoutProps {
  children: ReactNode
  mainClassName?: string
}

/** Shared landmarks keep navigation, skip links, and footer consistent across pages. */
export default function SiteLayout({ children, mainClassName }: SiteLayoutProps) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content" className={mainClassName}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
