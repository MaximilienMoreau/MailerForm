import { sitePages } from '@/data/site'
import { useMeta } from '@/hooks/useMeta'
import SiteLayout from '@/components/SiteLayout'
import Hero from '@/components/Hero'
import ProblemSection from '@/components/ProblemSection'
import FeaturesSection from '@/components/FeaturesSection'
import DeliverabilitySection from '@/components/DeliverabilitySection'
import StreamSection from '@/components/StreamSection'
import ApiSection from '@/components/ApiSection'
import IntegrationsSection from '@/components/IntegrationsSection'
import ComparisonSection from '@/components/ComparisonSection'
import PricingSection from '@/components/PricingSection'
import FaqSection from '@/components/FaqSection'
import CtaSection from '@/components/CtaSection'

export default function LandingPage() {
  useMeta(sitePages.home)

  return (
    <SiteLayout>
      <Hero />
      <DeliverabilitySection />
      <ProblemSection />
      <FeaturesSection />
      <StreamSection />
      <ApiSection />
      <IntegrationsSection />
      <ComparisonSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </SiteLayout>
  )
}
