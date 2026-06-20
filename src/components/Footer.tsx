import { Link } from 'react-router-dom'
import { Zap } from 'lucide-react'

type NavItem = { label: string; href: string; external?: boolean }

const nav: Record<string, NavItem[]> = {
  Product: [
    { label: 'Features',          href: '#features' },
    { label: 'Deliverability',    href: '#deliverability' },
    { label: 'Stream Separation', href: '#streams' },
    { label: 'CRM & Automation',  href: '#features' },
    { label: 'Changelog',         href: '/changelog' },
  ],
  Developers: [
    { label: 'API Reference',   href: 'https://docs.mailform.io/api',     external: true },
    { label: 'SDKs',            href: 'https://docs.mailform.io/sdks',    external: true },
    { label: 'OpenAPI Spec',    href: 'https://docs.mailform.io/openapi', external: true },
    { label: 'Status page',     href: 'https://status.mailform.io',       external: true },
    { label: 'GitHub',          href: 'https://github.com/MaximilienMoreau/MailerForm', external: true },
  ],
  Company: [
    { label: 'About',    href: '/about' },
    { label: 'Blog',     href: '/blog' },
    { label: 'Careers',  href: '/careers' },
    { label: 'Press',    href: '/press' },
    { label: 'Contact',  href: 'mailto:hello@mailform.io', external: true },
  ],
  Legal: [
    { label: 'Privacy Policy',    href: '/privacy' },
    { label: 'Terms of Service',  href: '/terms' },
    { label: 'Cookie Policy',     href: '/cookies' },
    { label: 'GDPR',              href: '/gdpr' },
  ],
}

const socials = [
  {
    label: 'GitHub',
    href:  'https://github.com/MaximilienMoreau/MailerForm',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
] as const

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-4 focus-ring rounded-lg px-1 -ml-1 group">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-brand-500/40 transition-shadow">
                <Zap size={14} className="text-white" fill="white" aria-hidden />
              </div>
              <span className="font-bold text-white">MailForm</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-[200px] mb-6">
              Email infrastructure platform built for modern SaaS teams.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all focus-ring"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation columns */}
          {(Object.entries(nav) as [string, NavItem[]][]).map(([group, items]) => (
            <div key={group}>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">{group}</p>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item.label}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-gray-500 hover:text-gray-200 transition-colors focus-ring rounded"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        className="text-sm text-gray-500 hover:text-gray-200 transition-colors focus-ring rounded"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.06]">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} MailForm, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="text-xs text-gray-600 hover:text-gray-400 transition-colors focus-ring rounded">
              Privacy
            </Link>
            <Link to="/terms" className="text-xs text-gray-600 hover:text-gray-400 transition-colors focus-ring rounded">
              Terms
            </Link>
            <span className="flex items-center gap-1.5 text-xs text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
