import { productStatus } from './product'

export const SITE = {
  name: 'MailerForm',
  origin: 'https://mailerform.io',
  image: '/og-image.png',
  imageAlt: 'MailerForm — Email Infrastructure Platform',
  contactEmail: 'hello@mailerform.io',
} as const

export const sitePages = {
  home: {
    path: '/',
    title: 'MailerForm: Email Infrastructure Platform',
    description:
      'Analyze your email, correct delivery risks, and send through one API. Explore sample reports and request early access.',
  },
  about: { path: '/about', title: 'About MailerForm', description: productStatus.description },
  changelog: {
    path: '/changelog',
    title: 'Changelog | MailerForm',
    description:
      'Website previews, planned product areas, and early-access availability for MailerForm.',
  },
  blog: {
    path: '/blog',
    title: 'Email engineering guides | MailerForm',
    description: 'Practical guides to analysis, authentication, and email infrastructure.',
  },
  careers: {
    path: '/careers',
    title: 'Careers | MailerForm',
    description: 'Explore opportunities to work on email infrastructure with MailerForm.',
  },
  press: {
    path: '/press',
    title: 'Press | MailerForm',
    description: 'MailerForm company information, brand assets, and media contact.',
  },
  privacy: {
    path: '/privacy',
    title: 'Privacy Policy | MailerForm',
    description: 'How MailerForm handles personal information, processing, and data requests.',
  },
  terms: {
    path: '/terms',
    title: 'Terms of Service | MailerForm',
    description: 'Terms for using MailerForm services, plans, and infrastructure.',
  },
  cookies: {
    path: '/cookies',
    title: 'Cookie Policy | MailerForm',
    description: 'Information about cookies, local storage, and consent preferences on MailerForm.',
  },
  gdpr: {
    path: '/gdpr',
    title: 'GDPR | MailerForm',
    description: 'Data protection information and documentation requests for MailerForm.',
  },
} as const

export const notFoundMeta = {
  title: 'Page not found | MailerForm',
  description: 'The requested page could not be found. Return to the MailerForm homepage.',
  noindex: true,
} as const

export function siteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE.origin}${normalized === '/' ? '/' : normalized.replace(/\/+$/, '')}`
}
