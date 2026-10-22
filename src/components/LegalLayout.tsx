import SiteLayout from '@/components/SiteLayout'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { sitePages } from '@/data/site'
import { useMeta } from '@/hooks/useMeta'

interface LegalLayoutProps {
  title: string
  subtitle?: string
  lastUpdated: string
  children: ReactNode
}

export default function LegalLayout({ title, subtitle, lastUpdated, children }: LegalLayoutProps) {
  const { pathname } = useLocation()
  const metadata = Object.values(sitePages).find((page) => page.path === pathname)
  useMeta(metadata ?? { title, description: subtitle })

  return (
    <SiteLayout>
      {/* Header */}
      <div className="relative pt-32 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(51,102,255,0.1),transparent)]"
          aria-hidden
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-brand-400 font-semibold uppercase tracking-widest mb-4">
            Last updated: {lastUpdated}
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight sm:leading-none">
            {title}
          </h1>
          {subtitle && <p className="text-lg text-gray-400 max-w-xl mx-auto">{subtitle}</p>}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="prose-legal">{children}</div>
      </div>
    </SiteLayout>
  )
}
