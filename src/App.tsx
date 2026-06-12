import Navbar             from './components/Navbar'
import Hero               from './components/Hero'
import ProblemSection     from './components/ProblemSection'
import FeaturesSection    from './components/FeaturesSection'
import DeliverabilitySection from './components/DeliverabilitySection'
import StreamSection      from './components/StreamSection'
import ApiSection         from './components/ApiSection'
import ComparisonSection  from './components/ComparisonSection'
import TestimonialsSection from './components/TestimonialsSection'
import PricingSection     from './components/PricingSection'
import FaqSection         from './components/FaqSection'
import CtaSection         from './components/CtaSection'
import Footer             from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <FeaturesSection />
        <DeliverabilitySection />
        <StreamSection />
        <ApiSection />
        <ComparisonSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
