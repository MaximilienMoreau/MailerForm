import { sitePages } from '@/data/site'
import { useMeta } from '@/hooks/useMeta'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import ErrorBoundary from '@/components/ErrorBoundary'
import SkipLink from '@/components/SkipLink'
import ScrollToTop from '@/components/ScrollToTop'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ProblemSection from '@/components/ProblemSection'
import FeaturesSection from '@/components/FeaturesSection'
import DeliverabilitySection from '@/components/DeliverabilitySection'
import StreamSection from '@/components/StreamSection'
import ApiSection from '@/components/ApiSection'
import PageLoading from '@/components/PageLoading'
import NotFound from '@/pages/NotFound'

// Sections below the fold, lazy loaded after the critical path renders
const IntegrationsSection = lazy(() => import('@/components/IntegrationsSection'))
const ComparisonSection = lazy(() => import('@/components/ComparisonSection'))
const PricingSection = lazy(() => import('@/components/PricingSection'))
const FaqSection = lazy(() => import('@/components/FaqSection'))
const CtaSection = lazy(() => import('@/components/CtaSection'))
const Footer = lazy(() => import('@/components/Footer'))

// Secondary pages
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const ChangelogPage = lazy(() => import('@/pages/ChangelogPage'))
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'))
const BlogPage = lazy(() => import('@/pages/BlogPage'))
const CareersPage = lazy(() => import('@/pages/CareersPage'))
const PressPage = lazy(() => import('@/pages/PressPage'))
const PrivacyPage = lazy(() => import('@/pages/legal/PrivacyPage'))
const TermsPage = lazy(() => import('@/pages/legal/TermsPage'))
const CookiesPage = lazy(() => import('@/pages/legal/CookiesPage'))
const GdprPage = lazy(() => import('@/pages/legal/GdprPage'))

function LandingPage() {
  useMeta(sitePages.home)

  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content">
        <Hero />
        <ProblemSection />
        <FeaturesSection />
        <DeliverabilitySection />
        <StreamSection />
        <ApiSection />
        <Suspense fallback={<div className="py-16" />}>
          <IntegrationsSection />
        </Suspense>
        <Suspense fallback={<div className="py-16" />}>
          <ComparisonSection />
        </Suspense>
        <Suspense fallback={<div className="py-16" />}>
          <PricingSection />
        </Suspense>
        <Suspense fallback={<div className="py-16" />}>
          <FaqSection />
        </Suspense>
        <Suspense fallback={<div className="py-16" />}>
          <CtaSection />
        </Suspense>
      </main>
      <Suspense fallback={<div className="py-8" />}>
        <Footer />
      </Suspense>
    </div>
  )
}

const secondaryRoutes = [
  { path: sitePages.about.path, Component: AboutPage },
  { path: sitePages.changelog.path, Component: ChangelogPage },
  { path: sitePages.privacy.path, Component: PrivacyPage },
  { path: sitePages.terms.path, Component: TermsPage },
  { path: sitePages.cookies.path, Component: CookiesPage },
  { path: sitePages.gdpr.path, Component: GdprPage },
  { path: sitePages.blog.path, Component: BlogPage },
  { path: sitePages.careers.path, Component: CareersPage },
  { path: sitePages.press.path, Component: PressPage },
  { path: '/blog/:slug', Component: BlogPostPage },
]

function PageRoutes() {
  const { pathname } = useLocation()
  return (
    <ErrorBoundary key={pathname} pagePath={pathname}>
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path={sitePages.home.path} element={<LandingPage />} />
          {secondaryRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export function AppContent() {
  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <ScrollToTop />
        <SkipLink />
        <PageRoutes />
      </MotionConfig>
    </ErrorBoundary>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
