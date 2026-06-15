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
import ComingSoon from '@/pages/ComingSoon'

// Sections below the fold — lazy loaded after the critical path renders
const ComparisonSection  = lazy(() => import('@/components/ComparisonSection'))
const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection'))
const PricingSection     = lazy(() => import('@/components/PricingSection'))
const FaqSection         = lazy(() => import('@/components/FaqSection'))
const CtaSection         = lazy(() => import('@/components/CtaSection'))
const Footer             = lazy(() => import('@/components/Footer'))

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
            <Route path="/about"     element={<ComingSoon />} />
            <Route path="/blog"      element={<ComingSoon />} />
            <Route path="/careers"   element={<ComingSoon />} />
            <Route path="/press"     element={<ComingSoon />} />
            <Route path="/changelog" element={<ComingSoon />} />
            <Route path="/privacy"   element={<ComingSoon />} />
            <Route path="/terms"     element={<ComingSoon />} />
            <Route path="/cookies"   element={<ComingSoon />} />
            <Route path="/gdpr"      element={<ComingSoon />} />
            <Route path="*"          element={<NotFound />} />
          </Routes>
          <CookieBanner />
        </BrowserRouter>
      </MotionConfig>
    </ErrorBoundary>
  )
}
