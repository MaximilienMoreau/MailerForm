import { Link } from 'react-router-dom'
import LegalLayout from '@/components/LegalLayout'

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="How MailForm collects, uses, and protects your personal data."
      lastUpdated="June 1, 2025"
    >
      <div className="section-box">
        <p>
          MailForm, Inc. (&ldquo;MailForm&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the website{' '}
          <a href="https://mailform.io">mailform.io</a> and the email infrastructure platform
          accessible at <a href="https://app.mailform.io">app.mailform.io</a>. This Privacy Policy
          explains what personal data we collect, why we collect it, how we use it, and your rights
          regarding that data.
        </p>
        <p>
          By using MailForm&apos;s services you agree to the practices described in this policy. If you
          do not agree, please discontinue use of the platform.
        </p>
      </div>

      <h2>1. Information We Collect</h2>

      <h3>1.1 Account & billing data</h3>
      <p>
        When you create an account we collect your name, email address, company name, and billing
        information (processed securely through Stripe — we never store raw card numbers).
      </p>

      <h3>1.2 Platform usage data</h3>
      <p>
        We collect data about how you use the platform: API calls, dashboard interactions, email
        sends, bounce and complaint events, and feature usage. This data is used to operate and
        improve the service.
      </p>

      <h3>1.3 Email content & recipient data</h3>
      <p>
        To deliver emails on your behalf we process the content, headers, and recipient addresses
        of messages you send. We act as a <strong>data processor</strong> for this information;
        you remain the data controller responsible for obtaining appropriate consent from your
        recipients.
      </p>

      <h3>1.4 Technical data</h3>
      <p>
        We automatically collect IP addresses, browser type, operating system, referrer URLs, and
        device identifiers when you access our website or dashboard. This information is used for
        security monitoring and analytics.
      </p>

      <h3>1.5 Communications</h3>
      <p>
        If you contact our support team or respond to our emails, we store those communications to
        provide assistance and improve our service.
      </p>

      <h2>2. How We Use Your Data</h2>
      <ul>
        <li>To provision, operate, and maintain the MailForm platform</li>
        <li>To process payments and manage your subscription</li>
        <li>To send you transactional emails (account alerts, invoices, security notices)</li>
        <li>To send product updates and newsletters — you can opt out at any time</li>
        <li>To detect and prevent fraud, abuse, and security incidents</li>
        <li>To comply with legal obligations</li>
        <li>To analyze aggregate usage and improve platform features</li>
      </ul>

      <h2>3. Legal Basis for Processing (GDPR)</h2>
      <p>
        For users in the European Economic Area, we rely on the following legal bases:
      </p>
      <ul>
        <li><strong>Contract</strong> — processing necessary to provide the service you&apos;ve signed up for</li>
        <li><strong>Legitimate interests</strong> — security monitoring, fraud prevention, and product improvement</li>
        <li><strong>Legal obligation</strong> — compliance with applicable laws</li>
        <li><strong>Consent</strong> — marketing emails (you can withdraw consent at any time)</li>
      </ul>

      <h2>4. Data Sharing</h2>
      <p>
        We do not sell your personal data. We share data only with:
      </p>
      <ul>
        <li>
          <strong>Sub-processors</strong> — infrastructure providers (AWS, Cloudflare), payment
          processor (Stripe), analytics (Plausible — privacy-first, no cookies), and customer
          support tools. A full list of sub-processors is available on request.
        </li>
        <li>
          <strong>Legal authorities</strong> — when required by law, court order, or to protect
          the safety of MailForm users.
        </li>
        <li>
          <strong>Business transfers</strong> — in the event of a merger or acquisition, your data
          may transfer to the acquiring entity under the same protections.
        </li>
      </ul>

      <h2>5. Data Retention</h2>
      <p>
        We retain your account data for as long as your account is active. After account deletion
        we purge personal data within 30 days, except where retention is required by law (e.g.,
        billing records for 7 years in some jurisdictions).
      </p>
      <p>
        Email delivery logs are retained for 90 days on the Starter plan, 12 months on Growth,
        and 24 months on Scale. You can request earlier deletion at any time.
      </p>

      <h2>6. Data Security</h2>
      <p>
        MailForm is SOC 2 Type II certified. We use TLS 1.3 for data in transit, AES-256
        encryption at rest, role-based access controls, and regular third-party penetration tests.
        In the event of a data breach affecting your personal data, we will notify you within 72
        hours in accordance with GDPR Article 33.
      </p>

      <h2>7. International Transfers</h2>
      <p>
        Our primary infrastructure is in the United States. For EU customers on the Scale plan we
        offer EU data residency (all data stays within the EU region). For other users, transfers
        to the US are covered by Standard Contractual Clauses (SCCs) under GDPR Article 46.
      </p>

      <h2>8. Your Rights</h2>
      <p>
        Depending on your location you may have the following rights regarding your personal data:
      </p>
      <ul>
        <li><strong>Access</strong> — request a copy of the data we hold about you</li>
        <li><strong>Rectification</strong> — correct inaccurate data</li>
        <li><strong>Erasure</strong> — request deletion of your personal data</li>
        <li><strong>Restriction</strong> — limit how we process your data</li>
        <li><strong>Portability</strong> — receive your data in a machine-readable format</li>
        <li><strong>Objection</strong> — object to processing based on legitimate interests</li>
        <li><strong>Withdraw consent</strong> — for any consent-based processing at any time</li>
      </ul>
      <p>
        To exercise any of these rights, email us at{' '}
        <a href="mailto:privacy@mailform.io">privacy@mailform.io</a>. We will respond within
        30 days. You also have the right to lodge a complaint with your local data protection
        authority.
      </p>

      <h2>9. Cookies</h2>
      <p>
        We use a minimal set of cookies. For full details, see our{' '}
        <Link to="/cookies">Cookie Policy</Link>.
      </p>

      <h2>10. Children&apos;s Privacy</h2>
      <p>
        MailForm is not directed at children under 16. We do not knowingly collect personal data
        from anyone under 16. If you believe we have collected such data, contact us at{' '}
        <a href="mailto:privacy@mailform.io">privacy@mailform.io</a> and we will delete it
        promptly.
      </p>

      <h2>11. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of significant
        changes by email or by posting a prominent notice in the dashboard. Continued use of the
        platform after the effective date constitutes acceptance of the updated policy.
      </p>

      <h2>12. Contact</h2>
      <p>
        For privacy-related questions or to exercise your rights:
      </p>
      <ul>
        <li>Email: <a href="mailto:privacy@mailform.io">privacy@mailform.io</a></li>
        <li>Postal: MailForm, Inc., 340 Pine Street, Suite 800, San Francisco, CA 94104, USA</li>
      </ul>
    </LegalLayout>
  )
}
