import { Link } from 'react-router-dom'
import LegalLayout from '@/components/LegalLayout'
import { ShieldCheck, FileText, Server, Mail } from 'lucide-react'

const highlights = [
  {
    icon: ShieldCheck,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    title: 'SOC 2 Type II certified',
    body: 'Annual third-party audit covering security, availability, and confidentiality.',
  },
  {
    icon: Server,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10 border-sky-500/20',
    title: 'EU data residency option',
    body: 'Scale plan customers can keep all data inside the EU — no transatlantic transfers.',
  },
  {
    icon: FileText,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
    title: 'DPA available on request',
    body: 'We provide a signed Data Processing Agreement to every customer who needs one.',
  },
  {
    icon: Mail,
    color: 'text-brand-400',
    bg: 'bg-brand-500/10 border-brand-500/20',
    title: '72-hour breach notification',
    body: 'In the event of a breach affecting your data, we notify you within 72 hours.',
  },
]

export default function GdprPage() {
  return (
    <LegalLayout
      title="GDPR Compliance"
      subtitle="How MailForm meets its obligations under the General Data Protection Regulation."
      lastUpdated="June 1, 2025"
    >
      {/* Highlight cards */}
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {highlights.map(h => {
          const Icon = h.icon
          return (
            <div key={h.title} className={`flex gap-4 p-5 rounded-xl border ${h.bg}`}>
              <div className={`flex-shrink-0 mt-0.5 ${h.color}`}>
                <Icon size={20} />
              </div>
              <div>
                <p className={`text-sm font-semibold mb-1 ${h.color}`}>{h.title}</p>
                <p className="text-sm text-gray-400">{h.body}</p>
              </div>
            </div>
          )
        })}
      </div>

      <h2>Overview</h2>
      <p>
        The General Data Protection Regulation (GDPR) — Regulation (EU) 2016/679 — applies to any
        organization that processes personal data of people in the European Economic Area. As an
        email infrastructure platform, MailForm operates both as a <strong>data controller</strong>{' '}
        (for data about our own customers) and as a <strong>data processor</strong> (for personal
        data you send us to process on your behalf, such as recipient email addresses).
      </p>

      <h2>1. Controller vs. Processor</h2>

      <h3>When MailForm is a data controller</h3>
      <p>
        For data about you and your team — your account information, billing details, support
        communications, and platform usage analytics — MailForm acts as a data controller. Our{' '}
        <Link to="/privacy">Privacy Policy</Link> explains how we process this data and your rights
        under GDPR Articles 13–22.
      </p>

      <h3>When MailForm is a data processor</h3>
      <p>
        When you send emails through MailForm&apos;s platform, we process recipient addresses, message
        content, and delivery events on your behalf. In this context, <strong>you are the data
        controller</strong> and MailForm acts as your data processor under GDPR Article 28. We
        process this data only on your documented instructions and do not use it for our own
        purposes.
      </p>

      <h2>2. Data Processing Agreement (DPA)</h2>
      <p>
        GDPR Article 28 requires that controllers and processors have a written contract in place.
        MailForm provides a standard DPA that:
      </p>
      <ul>
        <li>Defines the subject matter, duration, and nature of processing</li>
        <li>Lists the categories of personal data and data subjects</li>
        <li>Specifies your rights and our obligations as processor</li>
        <li>Incorporates Standard Contractual Clauses (SCCs) for cross-border transfers</li>
        <li>Lists our approved sub-processors and how we manage changes to them</li>
      </ul>
      <p>
        To request a signed DPA, email{' '}
        <a href="mailto:privacy@mailform.io">privacy@mailform.io</a>. Growth and Scale customers
        can also download an unsigned copy from the dashboard under Settings → Compliance.
      </p>

      <h2>3. Legal Bases for Processing</h2>
      <p>
        MailForm relies on the following legal bases when processing personal data as a controller:
      </p>
      <ul>
        <li>
          <strong>Art. 6(1)(b) — Contract</strong>: Processing your account data to provide the
          service you signed up for.
        </li>
        <li>
          <strong>Art. 6(1)(c) — Legal obligation</strong>: Retaining billing records and
          responding to lawful requests from authorities.
        </li>
        <li>
          <strong>Art. 6(1)(f) — Legitimate interests</strong>: Security monitoring, fraud
          prevention, and aggregated product analytics.
        </li>
        <li>
          <strong>Art. 6(1)(a) — Consent</strong>: Sending marketing communications. You can
          withdraw consent at any time by clicking &ldquo;Unsubscribe&rdquo; or emailing us.
        </li>
      </ul>

      <h2>4. International Data Transfers</h2>
      <p>
        MailForm&apos;s primary infrastructure is hosted on AWS US-East. Transfers of EU personal data
        to the USA are covered by <strong>Standard Contractual Clauses (SCCs)</strong> as adopted
        by the European Commission (Decision 2021/914), supplemented by our transfer impact
        assessment.
      </p>
      <p>
        Customers on the <strong>Scale plan</strong> can enable <strong>EU data residency</strong>,
        which routes and stores all data (including email logs, contact data, and analytics) within
        AWS eu-west-1 (Ireland) — no data leaves the EEA.
      </p>

      <h2>5. Sub-Processors</h2>
      <p>
        We engage the following sub-processors to deliver the Service. All sub-processors are bound
        by GDPR-compliant data processing agreements:
      </p>
      <div className="overflow-x-auto rounded-xl border border-white/[0.07] mb-6">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b border-white/[0.07]">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sub-processor</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Purpose</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {[
              { name: 'Amazon Web Services', purpose: 'Cloud infrastructure & hosting', location: 'USA / EU (opt-in)' },
              { name: 'Cloudflare',          purpose: 'DDoS protection, CDN',           location: 'Global' },
              { name: 'Stripe',              purpose: 'Payment processing',              location: 'USA / EU' },
              { name: 'Plausible Analytics', purpose: 'Privacy-first website analytics', location: 'EU (Germany)' },
              { name: 'Postmark (Wildbit)',  purpose: 'Transactional system emails',     location: 'USA' },
            ].map(r => (
              <tr key={r.name} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 text-gray-300 font-medium">{r.name}</td>
                <td className="px-4 py-3 text-gray-400">{r.purpose}</td>
                <td className="px-4 py-3 text-gray-500">{r.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        We will notify customers of any intended changes to sub-processors with at least 14 days&apos;
        notice, giving you time to object before the change takes effect.
      </p>

      <h2>6. Your Rights as a Data Subject</h2>
      <p>
        Under GDPR Chapter III, individuals in the EEA have the following rights. To exercise
        any of them, contact <a href="mailto:privacy@mailform.io">privacy@mailform.io</a>. We will
        respond within 30 days (extendable by 60 days for complex requests).
      </p>
      <ul>
        <li><strong>Right of access (Art. 15)</strong> — obtain a copy of your personal data and information about how it&apos;s processed</li>
        <li><strong>Right to rectification (Art. 16)</strong> — correct inaccurate or incomplete data</li>
        <li><strong>Right to erasure (Art. 17)</strong> — request deletion where data is no longer necessary or consent is withdrawn</li>
        <li><strong>Right to restriction (Art. 18)</strong> — limit processing while a dispute is pending</li>
        <li><strong>Right to data portability (Art. 20)</strong> — receive your data in a structured, machine-readable format (JSON / CSV)</li>
        <li><strong>Right to object (Art. 21)</strong> — object to processing based on legitimate interests, including profiling</li>
        <li><strong>Rights related to automated decisions (Art. 22)</strong> — we do not make fully automated decisions with significant effects on individuals</li>
      </ul>

      <h2>7. Security Measures</h2>
      <p>
        As required by GDPR Article 32, MailForm implements appropriate technical and organisational
        measures to protect personal data:
      </p>
      <ul>
        <li>TLS 1.3 encryption for all data in transit</li>
        <li>AES-256 encryption for data at rest</li>
        <li>Role-based access control and principle of least privilege</li>
        <li>Annual penetration tests by a third-party security firm</li>
        <li>SOC 2 Type II audit covering security, availability, and confidentiality</li>
        <li>Intrusion detection, log monitoring, and security incident response procedures</li>
      </ul>

      <h2>8. Data Breach Notification</h2>
      <p>
        In the event of a personal data breach that is likely to result in a risk to individual
        rights, we will notify the relevant supervisory authority within <strong>72 hours</strong>{' '}
        of becoming aware of it (GDPR Art. 33). Where the breach is likely to result in a
        high risk, we will also notify the affected individuals without undue delay (GDPR Art. 34).
      </p>

      <h2>9. Data Retention</h2>
      <p>
        We retain personal data only for as long as necessary for the purposes described in our
        Privacy Policy, and no longer than required by applicable law. Email logs are retained for
        90 days (Starter), 12 months (Growth), or 24 months (Scale). Account data is deleted
        within 30 days of account closure.
      </p>

      <h2>10. Supervisory Authority</h2>
      <p>
        If you believe we have not handled your data correctly, you have the right to lodge a
        complaint with your national data protection authority. In Ireland (our EU representative
        jurisdiction), this is the{' '}
        <a href="https://www.dataprotection.ie" target="_blank" rel="noreferrer">
          Data Protection Commission (DPC)
        </a>.
      </p>

      <h2>11. Contact & DPO</h2>
      <p>
        For GDPR-related enquiries, please contact our Privacy team at{' '}
        <a href="mailto:privacy@mailform.io">privacy@mailform.io</a>. For EU representative
        or DPO enquiries, use the same address with subject line &ldquo;GDPR &mdash; DPO Enquiry&rdquo;.
      </p>
    </LegalLayout>
  )
}
