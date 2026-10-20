import type { PlanId } from '@/lib/planSelection'

export interface Plan {
  id: PlanId
  name: string
  monthlyPrice: number
  annualPrice: number
  sub: string
  yearlySub: string
  summary: string
  volume: string
  description: string
  cta: string
  ctaStyle: 'btn-primary' | 'btn-secondary'
  badge?: string
  features: readonly string[]
}

export const plans: readonly Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    volume: '10,000',
    summary: 'Transactional email for small projects',
    monthlyPrice: 0,
    annualPrice: 0,
    sub: 'No credit card',
    yearlySub: 'No credit card',
    description: 'Perfect for testing and small projects.',
    cta: 'Request early access',
    ctaStyle: 'btn-secondary',
    features: [
      '10,000 emails / month',
      '1 sending domain',
      'Transactional stream',
      'Pre-send analysis (10/mo)',
      'Basic analytics',
      'Email support',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    volume: '200,000',
    summary: 'Marketing + transactional, with CRM and automation',
    monthlyPrice: 29,
    annualPrice: 276,
    sub: '/ month',
    yearlySub: '/ mo, billed yearly',
    badge: 'Recommended',
    description: 'For growing SaaS and dev teams.',
    cta: 'Request early access',
    ctaStyle: 'btn-primary',
    features: [
      '200,000 emails / month',
      '5 sending domains',
      'Transactional + Marketing streams',
      'Unlimited pre-send analysis',
      'CRM (up to 25k contacts)',
      'Automation workflows',
      'Webhooks',
      'Priority support',
    ],
  },
  {
    id: 'scale',
    name: 'Scale',
    volume: '2,000,000',
    summary: 'Dedicated IPs, unlimited domains, and dedicated support',
    monthlyPrice: 149,
    annualPrice: 1428,
    sub: '/ month',
    yearlySub: '/ mo, billed yearly',
    description: 'For high-volume senders who need full control.',
    cta: 'Request early access',
    ctaStyle: 'btn-secondary',
    features: [
      '2,000,000 emails / month',
      'Unlimited domains',
      'Dedicated IPs',
      'White-label option',
      'Unlimited CRM contacts',
      'Advanced automation',
      'Custom webhooks & API rate limits',
      'SLA + dedicated CSM',
    ],
  },
]

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})
export function formatPrice(amount: number) {
  return usd.format(amount)
}
