import LegalLayout from '@/components/LegalLayout'

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="The rules that govern your use of the MailerForm platform."
      lastUpdated="June 1, 2025"
    >
      <div className="section-box">
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) form a legally binding agreement between you (or the
          entity you represent) and <strong>MailerForm, Inc.</strong> (&ldquo;MailerForm&rdquo;). By creating an
          account or using the platform you agree to these Terms. If you are accepting on behalf
          of a company, you represent that you have the authority to bind that company.
        </p>
      </div>

      <h2>1. The Service</h2>
      <p>
        MailerForm provides an email infrastructure platform including transactional email delivery,
        marketing campaign tools, deliverability analysis, CRM features, and related APIs
        (collectively, the &ldquo;Service&rdquo;). Features available to you depend on your subscription plan.
      </p>
      <p>
        We reserve the right to modify, suspend, or discontinue any part of the Service with
        reasonable notice, except where required immediately for security or legal reasons.
      </p>

      <h2>2. Account Registration</h2>
      <p>
        You must provide accurate, complete, and up-to-date information when creating your account.
        You are responsible for maintaining the confidentiality of your credentials and for all
        activity that occurs under your account. Notify us immediately at{' '}
        <a href="mailto:security@mailerform.io">security@mailerform.io</a> if you suspect unauthorized
        access.
      </p>
      <p>
        Accounts must be registered by individuals 18 years or older, or by a legal entity. One
        person or entity may not maintain more than one free account.
      </p>

      <h2>3. Acceptable Use</h2>
      <p>You agree not to use the Service to:</p>
      <ul>
        <li>Send unsolicited bulk email (spam) or emails to recipients who have not opted in</li>
        <li>Transmit malware, phishing content, or any material that facilitates fraud or deception</li>
        <li>Violate any applicable law or regulation, including CAN-SPAM, GDPR, and CASL</li>
        <li>Harvest or scrape email addresses without explicit consent</li>
        <li>Impersonate another person or organization in email headers or content</li>
        <li>Circumvent rate limits, authentication, or security controls</li>
        <li>Attempt to reverse engineer, decompile, or extract source code from the platform</li>
        <li>Resell or sublicense access to the Service without written permission</li>
      </ul>
      <p>
        Violation of this section may result in immediate account suspension or termination, at
        our sole discretion, with or without prior notice.
      </p>

      <h2>4. Subscriptions & Billing</h2>

      <h3>4.1 Plans</h3>
      <p>
        MailerForm offers free and paid subscription plans. Paid plans are billed in advance on a
        monthly or annual basis. Annual plans are non-refundable except as required by law.
      </p>

      <h3>4.2 Upgrades & Downgrades</h3>
      <p>
        You may upgrade your plan at any time; the new rate is charged immediately on a prorated
        basis. Downgrades take effect at the start of the next billing cycle.
      </p>

      <h3>4.3 Failed Payments</h3>
      <p>
        If a payment fails we will notify you and retry for up to 7 days. After that, your account
        will be downgraded to the free plan and sending will be restricted to free-tier limits
        until payment is resolved.
      </p>

      <h3>4.4 Taxes</h3>
      <p>
        Prices are exclusive of taxes. Where applicable (e.g., EU VAT), taxes will be added to
        your invoice. You are responsible for providing accurate billing information, including a
        valid VAT number where applicable.
      </p>

      <h2>5. Free Plan</h2>
      <p>
        The free plan includes 10,000 emails per month, one sending domain, and limited
        deliverability analysis. We reserve the right to modify free plan limits with 30 days&apos;
        notice. Accounts with no activity for 12 consecutive months may be deleted.
      </p>

      <h2>6. Data Ownership & License</h2>
      <p>
        You retain full ownership of your data, including contact lists, email content, and
        analytics. You grant MailerForm a limited, non-exclusive license to process this data
        solely to provide the Service.
      </p>
      <p>
        We may use aggregated, anonymized data derived from platform usage for product improvement
        and benchmarking. This data cannot identify you or your recipients.
      </p>

      <h2>7. Intellectual Property</h2>
      <p>
        MailerForm owns all rights to the platform, including its software, design, documentation,
        and trademarks. Nothing in these Terms transfers any IP rights to you. You may not use
        our trademarks, logos, or brand assets without prior written consent.
      </p>

      <h2>8. Service Level Agreement (SLA)</h2>
      <p>
        We target 99.9% API uptime for Growth plans and 99.99% for Scale plans, measured monthly.
        If we fail to meet the SLA, you are eligible for service credits as described in our SLA
        documentation. Credits are your sole remedy for downtime and do not apply to scheduled
        maintenance, force majeure events, or issues caused by third parties.
      </p>

      <h2>9. Confidentiality</h2>
      <p>
        Each party agrees to keep confidential any non-public information shared by the other
        party in connection with the Service (&ldquo;Confidential Information&rdquo;), and not to disclose it
        to third parties or use it for any purpose other than performing under these Terms. This
        obligation does not apply to information that is publicly known, independently developed,
        or required to be disclosed by law.
      </p>

      <h2>10. Disclaimer of Warranties</h2>
      <p>
        The Service is provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; MailerForm disclaims all warranties,
        express or implied, including merchantability, fitness for a particular purpose, and
        non-infringement. We do not guarantee that the Service will be error-free, uninterrupted,
        or that any specific email will be delivered to any specific inbox.
      </p>

      <h2>11. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, MailerForm&apos;s total liability to you for any claim
        arising under these Terms shall not exceed the amount you paid us in the 12 months
        preceding the claim. We shall not be liable for indirect, incidental, special,
        consequential, or punitive damages, including lost profits or data, even if advised of
        the possibility of such damages.
      </p>

      <h2>12. Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless MailerForm and its officers, directors, employees,
        and agents from any claims, damages, or expenses (including legal fees) arising out of
        your use of the Service, your violation of these Terms, or your violation of any third-party
        rights (including recipient consent obligations).
      </p>

      <h2>13. Termination</h2>
      <p>
        Either party may terminate the agreement at any time. You may cancel your account through
        the dashboard. Upon termination we will retain your data for 30 days to allow export,
        after which it will be permanently deleted.
      </p>
      <p>
        MailerForm may terminate your account immediately for material breach of these Terms,
        especially violations of Section 3 (Acceptable Use).
      </p>

      <h2>14. Governing Law & Disputes</h2>
      <p>
        These Terms are governed by the laws of the State of California, USA, without regard to
        conflict of law provisions. Any dispute shall be resolved by binding arbitration in San
        Francisco, California under the AAA Commercial Arbitration Rules, except that either party
        may seek injunctive relief in any court of competent jurisdiction.
      </p>

      <h2>15. Changes to These Terms</h2>
      <p>
        We may update these Terms at any time. We will give you at least 30 days&apos; notice for
        material changes via email or an in-app notification. Continued use of the Service after
        the effective date constitutes acceptance of the updated Terms.
      </p>

      <h2>16. Contact</h2>
      <p>
        For questions about these Terms:{' '}
        <a href="mailto:legal@mailerform.io">legal@mailerform.io</a>
      </p>
    </LegalLayout>
  )
}
