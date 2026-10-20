import { useMeta } from '@/hooks/useMeta'
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
  useMeta({
    title: 'MailerForm: Email Infrastructure Platform',
    description:
      'Analyze your email, correct delivery risks, and send through one API. Explore sample reports and request early access.',
  })
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

export default function App() {
  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <ScrollToTop />
          <SkipLink />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/about"
              element={
                <Suspense fallback={<PageLoading />}>
                  <AboutPage />
                </Suspense>
              }
            />
            <Route
              path="/changelog"
              element={
                <Suspense fallback={<PageLoading />}>
                  <ChangelogPage />
                </Suspense>
              }
            />
            <Route
              path="/privacy"
              element={
                <Suspense fallback={<PageLoading />}>
                  <PrivacyPage />
                </Suspense>
              }
            />
            <Route
              path="/terms"
              element={
                <Suspense fallback={<PageLoading />}>
                  <TermsPage />
                </Suspense>
              }
            />
            <Route
              path="/cookies"
              element={
                <Suspense fallback={<PageLoading />}>
                  <CookiesPage />
                </Suspense>
              }
            />
            <Route
              path="/gdpr"
              element={
                <Suspense fallback={<PageLoading />}>
                  <GdprPage />
                </Suspense>
              }
            />
            <Route
              path="/blog"
              element={
                <Suspense fallback={<PageLoading />}>
                  <BlogPage />
                </Suspense>
              }
            />
            <Route
              path="/blog/:slug"
              element={
                <Suspense fallback={<PageLoading />}>
                  <BlogPostPage />
                </Suspense>
              }
            />
            <Route
              path="/careers"
              element={
                <Suspense fallback={<PageLoading />}>
                  <CareersPage />
                </Suspense>
              }
            />
            <Route
              path="/press"
              element={
                <Suspense fallback={<PageLoading />}>
                  <PressPage />
                </Suspense>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieBanner />
        </BrowserRouter>
      </MotionConfig>
    </ErrorBoundary>
  )
}
