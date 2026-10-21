import { Link } from 'react-router-dom'
import LegalLayout from '@/components/LegalLayout'

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="Using the MailerForm website and requesting early access."
      lastUpdated="October 22, 2026"
    >
      <h2>1. Website Preview</h2>
      <p>
        MailerForm presents an early-access email product. Analysis reports use preset examples and
        the SDK workflow is illustrative. The website does not send your emails, create a platform
        account, start a trial, or take payment.
      </p>
      <h2>2. Invitation Requests</h2>
      <p>
        Submitting your email requests a discussion about availability and onboarding. It does not
        guarantee access or reserve a launch date. Selecting a plan or billing interval records your
        preference; it does not create a subscription or a payment obligation.
      </p>
      <h2>3. Preview Pricing and Features</h2>
      <p>
        Plans, prices, volumes, and feature lists describe the preview offering. Supported
        capabilities, final pricing, taxes, billing, cancellation, refunds, and any trial or overage
        terms must be confirmed before activation.
      </p>
      <p>
        No uptime percentage, service credit, production retention period, or EU residency
        commitment is established by this website. Any service agreement and SLA will apply only as
        explicitly agreed for the activated service.
      </p>
      <h2>4. Responsible Use</h2>
      <p>
        Use the website and request forms lawfully. Do not submit someone else&apos;s address
        without authorization, send abusive requests, attempt unauthorized access, or interfere with
        the website.
      </p>
      <h2>5. Demonstrations and External Resources</h2>
      <p>
        Sample scores do not guarantee inbox placement. Confirm the suitability and availability of
        any integration, API, or external resource before relying on it for production work. Website
        content and availability may change as the product develops.
      </p>
      <h2>6. Personal Data</h2>
      <p>
        Invitation requests and newsletter subscriptions are separate. See our{' '}
        <Link to="/privacy">Privacy Policy</Link> for how request data is handled and how to contact
        us about your data.
      </p>
      <h2>7. Data Ownership & License</h2>
      <p>
        You retain full ownership of your data, including contact lists, email content, and
        analytics. Any license to process production data will be defined by the agreement for the
        activated service.
      </p>
      <p>
        The website demonstrations use preset data. Sending an invitation request does not grant
        permission to process recipient lists or email content.
      </p>

      <h2>8. Intellectual Property</h2>
      <p>
        MailerForm retains its rights in its own software, design, documentation, and brand assets.
        Third-party components remain subject to their respective licenses. Nothing in these Terms
        transfers intellectual property rights to you. Use of our trademarks, logos, or brand assets
        requires prior written consent.
      </p>

      <h2>9. Confidentiality</h2>
      <p>
        Each party agrees to keep confidential any non-public information shared by the other party
        in connection with MailerForm (&ldquo;Confidential Information&rdquo;), and not to disclose
        it to third parties or use it for any purpose other than performing under these Terms. This
        obligation does not apply to information that is publicly known, independently developed, or
        required to be disclosed by law.
      </p>

      <h2>10. Contact and Updates</h2>
      <p>
        For questions about access or these terms, email{' '}
        <a href="mailto:legal@mailerform.io">legal@mailerform.io</a>. Changes to the website terms
        will be published here with an updated date.
      </p>
    </LegalLayout>
  )
}
