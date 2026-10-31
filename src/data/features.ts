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
      'Identify authentication, content, and link issues before sending. Turn the report into a practical correction checklist.',
    items: [
      'Spam word detector',
      'Domain health scoring',
      'Link risk analysis',
      'Predictive inbox/spam ratio',
    ],
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
      'Route critical notifications and bulk campaigns through separate streams. Track their performance independently.',
    items: [
      'Isolated IP pools',
      'Separate reputation tracking',
      'Per-stream analytics',
      'Automatic failover',
    ],
  },
  {
    icon: Users,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    tag: 'Email-first CRM',
    tagColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    title: 'CRM + Automation',
    description: 'Organize contacts and trigger lifecycle messages from engagement events.',
    items: [
      'Contact segmentation',
      'Lifecycle automation',
      'Engagement scoring',
      'GDPR & CAN-SPAM tools',
    ],
  },
  {
    icon: Code2,
    color: 'text-brand-400',
    bg: 'bg-brand-500/10',
    border: 'border-brand-500/20',
    tag: 'API-first',
    tagColor: 'bg-brand-500/10 text-brand-400 border-brand-500/20',
    title: 'API & Webhooks',
    description:
      'Integrate analysis and sending into your application, then consume delivery events through webhooks.',
    items: ['RESTful + webhooks', 'Planned SDKs × 5', 'White-label planned', 'Delivery events'],
  },
  {
    icon: BarChart3,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    tag: 'Observability',
    tagColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    title: 'Real-time Analytics',
    description: 'Investigate bounces, complaints, and engagement by stream, domain, or campaign.',
    items: [
      'Event-level tracking',
      'Bounce classification',
      'Complaint monitoring',
      'Cohort analytics',
    ],
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
      'Review unsubscribe handling, suppression lists, and residency requirements during onboarding. Request evidence for any security or certification requirement.',
    items: ['Security review', 'Automatic unsubscribes', 'Suppression lists', 'EU data residency'],
  },
]
