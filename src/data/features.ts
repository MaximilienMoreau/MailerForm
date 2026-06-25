import { GitBranch, Users, Code2, Radar, Lock, BarChart3, type LucideIcon } from 'lucide-react'

export interface Feature {
  icon: LucideIcon
  color: string
  bg: string
  border: string
  tag: string
  tagColor: string
  title: string
  description: string
  items: string[]
}

export const features: Feature[] = [
  {
    icon: Radar,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    tag: 'Core differentiator',
    tagColor: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    title: 'Deliverability Intelligence',
    description:
      'Analyze every email before sending. MailerForm scans for spam triggers, phishing patterns, domain reputation, and link safety. It then gives you a predictive inbox score so you can fix issues before they cost you.',
    items: ['Spam word detector', 'Domain health scoring', 'Link risk analysis', 'Predictive inbox/spam ratio'],
  },
  {
    icon: GitBranch,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    tag: 'Smart infrastructure',
    tagColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    title: 'Stream Separation',
    description:
      'Transactional and marketing emails run on fully isolated IP pools with independent reputations. A bad promo campaign will never affect your OTPs, password resets, or critical notifications.',
    items: ['Isolated IP pools', 'Separate reputation tracking', 'Per-stream analytics', 'Automatic failover'],
  },
  {
    icon: Users,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    tag: 'Email-first CRM',
    tagColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    title: 'CRM + Automation',
    description:
      'Manage contacts, tags, and segments natively. Build lifecycle automation workflows powered by engagement data: open rates, clicks, and deliverability signals, all in one place.',
    items: ['Contact segmentation', 'Lifecycle automation', 'Engagement scoring', 'GDPR & CAN-SPAM tools'],
  },
  {
    icon: Code2,
    color: 'text-brand-400',
    bg: 'bg-brand-500/10',
    border: 'border-brand-500/20',
    tag: 'API-first',
    tagColor: 'bg-brand-500/10 text-brand-400 border-brand-500/20',
    title: '260+ API Endpoints',
    description:
      'Built by developers, for developers. Every feature is accessible via RESTful API with clear OpenAPI documentation, real-time webhooks, and SDKs for Node, Python, Ruby, Go, and PHP.',
    items: ['RESTful + webhooks', 'Official SDKs × 5', 'White-label ready', 'Sub-80ms delivery'],
  },
  {
    icon: BarChart3,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    tag: 'Observability',
    tagColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    title: 'Real-time Analytics',
    description:
      'Track every event (opens, clicks, bounces, complaints, unsubscribes) with sub-second latency. Drill down by stream, domain, campaign, or recipient segment.',
    items: ['Event-level tracking', 'Bounce classification', 'Complaint monitoring', 'Cohort analytics'],
  },
  {
    icon: Lock,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    tag: 'Compliance',
    tagColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    title: 'Security & Compliance',
    description:
      'SOC 2 Type II certified, GDPR and CAN-SPAM compliant out of the box. Automatic unsubscribe handling, suppression lists, and data residency options for EU customers.',
    items: ['SOC 2 Type II', 'Automatic unsubscribes', 'Suppression lists', 'EU data residency'],
  },
]
