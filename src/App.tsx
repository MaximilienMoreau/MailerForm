import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import ErrorBoundary from '@/components/ErrorBoundary'
import SkipLink from '@/components/SkipLink'
import ScrollToTop from '@/components/ScrollToTop'
import CookieBanner from '@/components/CookieBanner'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ProblemSection from '@/components/ProblemSection'
import FeaturesSection from '@/components/FeaturesSection'
import DeliverabilitySection from '@/components/DeliverabilitySection'
import StreamSection from '@/components/StreamSection'
import ApiSection from '@/components/ApiSection'
import NotFound from '@/pages/NotFound'

// Sections below the fold, lazy loaded after the critical path renders
const IntegrationsSection = lazy(() => import('@/components/IntegrationsSection'))
const ComparisonSection   = lazy(() => import('@/components/ComparisonSection'))
const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection'))
const PricingSection      = lazy(() => import('@/components/PricingSection'))
const FaqSection          = lazy(() => import('@/components/FaqSection'))
const CtaSection          = lazy(() => import('@/components/CtaSection'))
const Footer              = lazy(() => import('@/components/Footer'))

// Secondary pages
const ComingSoon    = lazy(() => import('@/pages/ComingSoon'))
const AboutPage     = lazy(() => import('@/pages/AboutPage'))
const ChangelogPage = lazy(() => import('@/pages/ChangelogPage'))
const PrivacyPage   = lazy(() => import('@/pages/legal/PrivacyPage'))
const TermsPage     = lazy(() => import('@/pages/legal/TermsPage'))
const CookiesPage   = lazy(() => import('@/pages/legal/CookiesPage'))
const GdprPage      = lazy(() => import('@/pages/legal/GdprPage'))

function LandingPage() {
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
          <TestimonialsSection />
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

export default function App() {
  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <ScrollToTop />
          <SkipLink />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about"     element={<Suspense fallback={null}><AboutPage /></Suspense>} />
            <Route path="/changelog" element={<Suspense fallback={null}><ChangelogPage /></Suspense>} />
            <Route path="/privacy"   element={<Suspense fallback={null}><PrivacyPage /></Suspense>} />
            <Route path="/terms"     element={<Suspense fallback={null}><TermsPage /></Suspense>} />
            <Route path="/cookies"   element={<Suspense fallback={null}><CookiesPage /></Suspense>} />
            <Route path="/gdpr"      element={<Suspense fallback={null}><GdprPage /></Suspense>} />
            <Route path="/blog"      element={<Suspense fallback={null}><ComingSoon /></Suspense>} />
            <Route path="/careers"   element={<Suspense fallback={null}><ComingSoon /></Suspense>} />
            <Route path="/press"     element={<Suspense fallback={null}><ComingSoon /></Suspense>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieBanner />
        </BrowserRouter>
      </MotionConfig>
    </ErrorBoundary>
  )
}
