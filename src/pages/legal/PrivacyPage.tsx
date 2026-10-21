import { Link } from 'react-router-dom'
import LegalLayout from '@/components/LegalLayout'

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="Personal data used by the MailerForm website preview."
      lastUpdated="October 21, 2026"
    >
      <div className="section-box">
        <p>
          This policy covers the MailerForm website and invitation and newsletter requests. The
          product is in early access. This website does not create accounts, take payments, or
          process your email messages for delivery.
        </p>
      </div>
      <h2>1. Who to Contact</h2>
      <p>
        MailerForm manages requests received through this website. For questions about your data,
        contact <a href="mailto:privacy@mailerform.io">privacy@mailerform.io</a>.
      </p>
      <h2>2. Data You Provide</h2>
      <p>
        An early-access request includes your email address and, if selected, your plan and billing
        interval. We use these details to respond to your request and discuss availability and
        onboarding. Our basis for this processing is taking steps at your request before entering
        into a possible service agreement.
      </p>
      <p>
        A newsletter request includes your email address and explicit consent. We use your consent
        to send the guides and product updates you requested. Early-access requests do not subscribe
        you to the newsletter.
      </p>
      <p>
        If you contact us by email, we use your message and contact details to respond. Our
        legitimate interest is handling enquiries about MailerForm.
      </p>
      <h2>3. Providers and Technical Requests</h2>
      <p>
        When configured, the forms send your details to Formspree over HTTPS. Otherwise, the site
        provides an email contact link. A successful form submission records a request; newsletter
        delivery and invitation handling happen separately.
      </p>
      <p>
        Your browser requests fonts from Google Fonts. The website host and font provider receive
        technical information needed to serve these requests, including your IP address. This site
        does not run an analytics or advertising script.
      </p>
      <p>
        Provider processing locations and retention depend on their services and the deployment
        configuration. See{' '}
        <a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noreferrer">
          Formspree&apos;s privacy policy
        </a>{' '}
        and{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
          Google&apos;s privacy policy
        </a>
        . This preview makes no EU-only data residency guarantee.
      </p>
      <h2>4. Retention</h2>
      <p>
        Request details are used while handling your enquiry and any resulting onboarding
        discussion. Newsletter details are used while your subscription remains active. You can ask
        us to delete a request or withdraw newsletter consent at any time by emailing the address
        above. Provider copies and technical logs are subject to the relevant provider&apos;s
        retention settings and obligations.
      </p>
      <h2>5. Your Choices and Rights</h2>
      <p>
        You can request access, correction, deletion, restriction, or portability of your personal
        data, and object to processing where applicable. You can withdraw newsletter consent without
        affecting the lawfulness of earlier processing. Email{' '}
        <a href="mailto:privacy@mailerform.io">privacy@mailerform.io</a> to make a request or
        unsubscribe.
      </p>
      <p>
        You can also contact your data protection authority, including the{' '}
        <a href="https://www.cnil.fr" target="_blank" rel="noreferrer">
          CNIL
        </a>{' '}
        in France.
      </p>
      <h2>6. Cookies and Storage</h2>
      <p>
        The website code does not set cookies or store a cookie consent preference. See the{' '}
        <Link to="/cookies">Cookie Policy</Link> for details about browser requests and legacy
        preferences.
      </p>
      <h2>7. Future Platform Processing</h2>
      <p>
        Production security measures, hosting regions, sub-processors, retention periods, and any
        data processing agreement must be confirmed before platform activation. Preview plans and
        demonstrations are not evidence of an operating delivery service or a completed security
        audit. See our <Link to="/gdpr">data protection overview</Link>.
      </p>
      <h2>8. Changes</h2>
      <p>
        We will update this policy when website processing changes. The date above identifies the
        current version.
      </p>
    </LegalLayout>
  )
}
