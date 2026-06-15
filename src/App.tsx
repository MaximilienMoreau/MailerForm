import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import ErrorBoundary from '@/components/ErrorBoundary'
import SkipLink from '@/components/SkipLink'
import CookieBanner from '@/components/CookieBanner'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ProblemSection from '@/components/ProblemSection'
import FeaturesSection from '@/components/FeaturesSection'
import DeliverabilitySection from '@/components/DeliverabilitySection'
import StreamSection from '@/components/StreamSection'
import ApiSection from '@/components/ApiSection'
import NotFound from '@/pages/NotFound'

// Sections below the fold — lazy loaded after the critical path renders
const ComparisonSection   = lazy(() => import('@/components/ComparisonSection'))
const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection'))
const PricingSection      = lazy(() => import('@/components/PricingSection'))
const FaqSection          = lazy(() => import('@/components/FaqSection'))
const CtaSection          = lazy(() => import('@/components/CtaSection'))
const Footer              = lazy(() => import('@/components/Footer'))

// Secondary pages
const ComingSoon = lazy(() => import('@/pages/ComingSoon'))

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
        <Suspense fallback={null}>
          <ComparisonSection />
        </Suspense>
        <Suspense fallback={null}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={null}>
          <PricingSection />
        </Suspense>
        <Suspense fallback={null}>
          <FaqSection />
        </Suspense>
        <Suspense fallback={null}>
          <CtaSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
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
          <SkipLink />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about"     element={<Suspense fallback={null}><ComingSoon /></Suspense>} />
            <Route path="/blog"      element={<Suspense fallback={null}><ComingSoon /></Suspense>} />
            <Route path="/changelog" element={<Suspense fallback={null}><ComingSoon /></Suspense>} />
            <Route path="/careers"   element={<Suspense fallback={null}><ComingSoon /></Suspense>} />
            <Route path="/press"     element={<Suspense fallback={null}><ComingSoon /></Suspense>} />
            <Route path="/privacy"   element={<Suspense fallback={null}><ComingSoon /></Suspense>} />
            <Route path="/terms"     element={<Suspense fallback={null}><ComingSoon /></Suspense>} />
            <Route path="/cookies"   element={<Suspense fallback={null}><ComingSoon /></Suspense>} />
            <Route path="/gdpr"      element={<Suspense fallback={null}><ComingSoon /></Suspense>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieBanner />
        </BrowserRouter>
      </MotionConfig>
    </ErrorBoundary>
  )
}
