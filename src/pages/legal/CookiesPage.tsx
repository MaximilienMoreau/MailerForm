import { Link } from 'react-router-dom'
import LegalLayout from '@/components/LegalLayout'

export default function CookiesPage() {
  return (
    <LegalLayout
      title="Cookie Policy"
      subtitle="Cookies, browser storage, and external requests on this website."
      lastUpdated="October 21, 2026"
    >
      <h2>1. Current Website</h2>
      <p>
        The MailerForm website code does not set cookies, run analytics or advertising scripts, or
        store a cookie consent preference. There are no optional trackers to enable, so the site
        does not display an accept or decline banner.
      </p>
      <h2>2. Previous Preferences</h2>
      <p>
        An earlier version stored a banner choice in local storage under{' '}
        <code>mailerform_cookie_consent</code>. The current website does not read or use that value.
        You can remove it through your browser&apos;s site data settings.
      </p>
      <h2>3. External Requests</h2>
      <p>
        Your browser loads fonts from Google Fonts. If a form is configured and you submit it, the
        details you provide are sent to Formspree. Viewing a form does not submit your email
        address. The website host and external providers may process technical request information
        as described in our <Link to="/privacy">Privacy Policy</Link>.
      </p>
      <h2>4. Future Platform</h2>
      <p>
        This policy covers the website preview. Cookies and storage for any future dashboard will be
        documented before activation. Previously listed example dashboard cookie names are not a
        description of an operating service.
      </p>
      <h2>5. Changes and Contact</h2>
      <p>
        We will update this page if storage or tracking changes. Any choices needed for optional
        tracking will be provided before it is enabled. For questions, email{' '}
        <a href="mailto:privacy@mailerform.io">privacy@mailerform.io</a>.
      </p>
    </LegalLayout>
  )
}
