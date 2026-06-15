import { Suspense, lazy, type ReactNode } from 'react'
import Navbar from './Navbar'

const Footer = lazy(() => import('./Footer'))

interface LegalLayoutProps {
  title: string
  subtitle?: string
  lastUpdated: string
  children: ReactNode
}

export default function LegalLayout({ title, subtitle, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main id="main-content">
        {/* Header */}
        <div className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(51,102,255,0.1),transparent)]" aria-hidden />
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs text-brand-400 font-semibold uppercase tracking-widest mb-4">
              Last updated: {lastUpdated}
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg text-gray-400 max-w-xl mx-auto">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="prose-legal">
            {children}
          </div>
        </div>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}
