export const sdks = [
  { lang: 'Node.js', color: 'text-emerald-400', href: 'https://docs.mailerform.io/sdks/nodejs' },
  { lang: 'Python',  color: 'text-sky-400',     href: 'https://docs.mailerform.io/sdks/python' },
  { lang: 'Ruby',    color: 'text-red-400',     href: 'https://docs.mailerform.io/sdks/ruby' },
  { lang: 'Go',      color: 'text-cyan-400',    href: 'https://docs.mailerform.io/sdks/go' },
  { lang: 'PHP',     color: 'text-violet-400',  href: 'https://docs.mailerform.io/sdks/php' },
]

export const apiStats = [
  { value: 'Analyze', label: 'Before sending' },
  { value: 'Correct', label: 'Review findings' },
  { value: 'Send', label: 'Choose a stream' },
]

export const codeExample = `import MailerForm from '@mailerform/sdk'

const client = new MailerForm({
  apiKey: process.env.MAILERFORM_KEY,
})

// Analyze before sending
const analysis = await client.analyze({
  subject: 'Your order is confirmed!',
  html: emailHtml,
  from: 'orders@acme.com',
})

if (analysis.score >= 80) {
  // Safe to send
  await client.send({
    stream: 'transactional',
    to: 'customer@example.com',
    subject: 'Your order is confirmed!',
    html: emailHtml,
  })
}

// analysis.score    → 94
// analysis.inboxRate → 97.3%
// analysis.warnings  → ['image-ratio']`
