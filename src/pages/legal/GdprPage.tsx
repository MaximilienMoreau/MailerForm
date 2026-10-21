import { Link } from 'react-router-dom'
import LegalLayout from '@/components/LegalLayout'

export default function GdprPage() {
  return (
    <LegalLayout
      title="Data Protection Overview"
      subtitle="Current website processing and questions to resolve before production access."
      lastUpdated="October 21, 2026"
    >
      <div className="section-box">
        <p>
          MailerForm is an early-access product preview. This page describes the current website
          scope and the information to confirm before using a future production service.
        </p>
      </div>
      <h2>1. Website Requests</h2>
      <p>
        MailerForm handles invitation requests, newsletter consent, and direct enquiries. The{' '}
        <Link to="/privacy">Privacy Policy</Link> explains the data collected, purposes, retention
        criteria, providers, and your choices. No recipient lists or email content are uploaded
        through the demonstrations.
      </p>
      <h2>2. Providers Used by the Website</h2>
      <ul>
        <li>Formspree handles submissions when the website forms are configured.</li>
        <li>Google Fonts serves the website fonts.</li>
        <li>
          The website host serves pages and assets; its processing depends on the deployment
          configuration.
        </li>
      </ul>
      <p>
        This list describes the website preview. AWS, Cloudflare, Stripe, and specific production
        regions are not confirmed platform sub-processors by this page.
      </p>
      <h2>3. Before Sending Production Data</h2>
      <p>
        Before activation, confirm the supported service and the respective controller and processor
        roles with the team. Request the applicable data processing agreement, sub-processor list,
        processing locations, transfer arrangements, retention and deletion settings, and incident
        contact procedures.
      </p>
      <p>
        EU residency, completed audits, penetration testing, encryption specifications, dashboard
        compliance downloads, and plan-specific retention periods are not established by the website
        preview. Any available evidence and contractual commitments must be reviewed for the actual
        service being offered.
      </p>
      <h2>4. Your Data Requests</h2>
      <p>
        To request access, correction, deletion, or other applicable rights, or to withdraw
        newsletter consent, email <a href="mailto:privacy@mailerform.io">privacy@mailerform.io</a>.
        You can also raise a concern with your data protection authority, including the{' '}
        <a href="https://www.cnil.fr" target="_blank" rel="noreferrer">
          CNIL
        </a>
        .
      </p>
      <h2>5. Further Information</h2>
      <p>
        See the <Link to="/cookies">Cookie Policy</Link> for browser storage and the{' '}
        <Link to="/terms">Terms of Service</Link> for the limits of this preview.
      </p>
    </LegalLayout>
  )
}
