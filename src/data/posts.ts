type Category =
  | 'Deliverability'
  | 'Authentication'
  | 'Data'
  | 'Infrastructure'
  | 'Compliance'
  | 'Migration'

export interface Post {
  slug: string
  body: { heading: string; text: string }[]
  category: Category
  title: string
  excerpt: string
  date: string
  isoDate: string
}

export const categoryColors: Record<Category, string> = {
  Deliverability: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  Authentication: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Data: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Infrastructure: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
  Compliance: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  Migration: 'text-brand-400 bg-brand-500/10 border-brand-500/20',
}

export const posts: Post[] = [
  {
    slug: 'transactional-reputation',
    body: [
      {
        heading: 'Trace the delivery change',
        text: 'Start with delivery events around the campaign. Compare bounces, deferrals, and complaints for transactional and marketing traffic separately. An accepted message is not proof that it reached the inbox.',
      },
      {
        heading: 'Check shared dependencies',
        text: 'Review whether both streams use the same sending IPs, domains, queues, or rate limits. A shared queue can delay password resets even when reputation is healthy.',
      },
      {
        heading: 'Protect critical traffic',
        text: 'Separate critical messages from bulk campaigns. Route each stream explicitly, monitor queue age, and alert on delayed authentication emails. Test your routing before the next campaign.',
      },
    ],
    category: 'Deliverability',
    title: 'Why your OTP emails start dying after a marketing campaign',
    excerpt:
      'Investigate shared reputation, queues, and rate limits when critical messages slow down after a bulk send.',
    date: 'July 1, 2026',
    isoDate: '2026-07-01',
  },
  {
    slug: 'authentication-alignment',
    body: [
      {
        heading: 'Map the identities',
        text: 'List the visible From domain, envelope sender, and DKIM signing domain for a representative message. Publishing DNS records alone does not show that the actual message uses those identities.',
      },
      {
        heading: 'Inspect a received message',
        text: 'Read the authentication results in a test message received at a mailbox you control. Look for SPF and DKIM outcomes and the DMARC alignment result. Check the sending service configuration when the domains differ.',
      },
      {
        heading: 'Verify changes gradually',
        text: 'After adjusting DNS or signing settings, send another test and inspect the new headers. Keep a record of the change and monitor reports before tightening a domain policy.',
      },
    ],
    category: 'Authentication',
    title: 'SPF, DKIM, DMARC: the alignment mistakes that tank inbox placement',
    excerpt:
      'Inspect message identities and received headers to investigate SPF, DKIM, and DMARC alignment.',
    date: 'June 18, 2026',
    isoDate: '2026-06-18',
  },
  {
    slug: 'content-and-reputation',
    body: [
      {
        heading: 'Look beyond a score',
        text: 'A pre-send score highlights possible issues. It cannot reproduce every mailbox provider decision or guarantee placement. Treat the report as a list of questions to investigate.',
      },
      {
        heading: 'Make the message trustworthy',
        text: 'Use a subject that matches the body, direct links on a recognizable domain, and readable text. Include a plain-text alternative and check that links and images work.',
      },
      {
        heading: 'Connect checks with outcomes',
        text: 'Compare message changes with delivery events and aggregate complaints over time. Keep consent, audience quality, and sending patterns in view rather than optimizing individual words in isolation.',
      },
    ],
    category: 'Data',
    title: 'Content and reputation: how to interpret pre-send checks',
    excerpt:
      'Use message checks alongside delivery events to investigate risks without treating a score as a placement guarantee.',
    date: 'June 5, 2026',
    isoDate: '2026-06-05',
  },
  {
    slug: 'stream-isolation',
    body: [
      {
        heading: 'Define the boundary',
        text: 'Draw the route from application request to delivery event for each stream. Identify queues, domains, IP pools, and retry policies that remain shared.',
      },
      {
        heading: 'Make routing explicit',
        text: 'Choose the stream in the send request and reject missing or unknown values. Use separate credentials where practical, so a campaign integration cannot consume the capacity reserved for critical messages.',
      },
      {
        heading: 'Exercise failure cases',
        text: 'Test a bulk-traffic spike, temporary delivery deferrals, and webhook delays. Confirm that transactional queue age stays visible and that retries do not duplicate customer messages.',
      },
    ],
    category: 'Infrastructure',
    title: 'Stream separation: a technical deep dive into isolated IP pools',
    excerpt:
      'A guide to separating routes, queues, and monitoring for transactional and marketing email.',
    date: 'May 22, 2026',
    isoDate: '2026-05-22',
  },
  {
    slug: 'email-data-controls',
    body: [
      {
        heading: 'Inventory email data',
        text: 'Document which addresses, message bodies, event records, and identifiers your workflow stores. Include exports, support access, logs, and backups in that inventory.',
      },
      {
        heading: 'Define operational controls',
        text: 'Assign retention periods, restrict access, and document how deletion requests are handled across systems. Distinguish service notifications from marketing subscriptions in your data model.',
      },
      {
        heading: 'Confirm your requirements',
        text: 'Review data processing terms, hosting regions, subprocessors, and deletion behavior before choosing a provider. This guide is an operational starting point; specific obligations depend on your organization and use case.',
      },
    ],
    category: 'Compliance',
    title: 'GDPR and transactional email: what SaaS teams get wrong',
    excerpt:
      'Map email data, retention, access, and subscription preferences before reviewing your provider requirements.',
    date: 'May 8, 2026',
    isoDate: '2026-05-08',
  },
  {
    slug: 'migration-playbook',
    body: [
      {
        heading: 'Prepare a representative test',
        text: 'This is a hypothetical migration exercise, not a customer result. List message types, sending identities, templates, webhook consumers, and expected peak volume before changing providers.',
      },
      {
        heading: 'Roll out a small stream',
        text: 'Verify authentication and event handling in a test environment. Route a small share of non-critical production traffic only after your team has agreed on success criteria and a rollback procedure.',
      },
      {
        heading: 'Measure before expanding',
        text: 'Compare acceptance, bounce and complaint rates, queue delay, and application errors. Expand gradually and keep the old route available until delivery events and reconciliation are reliable.',
      },
    ],
    category: 'Migration',
    title: 'A practical migration playbook for SaaS email',
    excerpt:
      'A hypothetical rollout showing how to verify authentication, test events, and expand traffic gradually.',
    date: 'April 24, 2026',
    isoDate: '2026-04-24',
  },
]
