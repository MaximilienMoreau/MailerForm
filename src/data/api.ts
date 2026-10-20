export const sdks = [
  {
    lang: 'Node.js',
    color: 'text-emerald-400',
    href: 'mailto:hello@mailerform.io?subject=Node.js%20SDK%20availability',
  },
  {
    lang: 'Python',
    color: 'text-sky-400',
    href: 'mailto:hello@mailerform.io?subject=Python%20SDK%20availability',
  },
  {
    lang: 'Ruby',
    color: 'text-red-400',
    href: 'mailto:hello@mailerform.io?subject=Ruby%20SDK%20availability',
  },
  {
    lang: 'Go',
    color: 'text-cyan-400',
    href: 'mailto:hello@mailerform.io?subject=Go%20SDK%20availability',
  },
  {
    lang: 'PHP',
    color: 'text-violet-400',
    href: 'mailto:hello@mailerform.io?subject=PHP%20SDK%20availability',
  },
]

export const apiStats = [
  { value: 'Analyze', label: 'Before sending' },
  { value: 'Correct', label: 'Review findings' },
  { value: 'Send', label: 'Choose a stream' },
]

export const codeExample = `// Illustrative SDK workflow: confirm package availability before installing.
// Set MAILERFORM_KEY when testing with the confirmed SDK.
// Replace the sender with a verified domain and use a test recipient.
import MailerForm from '@mailerform/sdk'

const apiKey = process.env.MAILERFORM_KEY
if (!apiKey) throw new Error('Set MAILERFORM_KEY before running this example.')

const client = new MailerForm({ apiKey })
const email = {
  from: 'orders@acme.com',
  subject: 'Your order is confirmed!',
  html: '<p>Thank you. Your order has been confirmed.</p>',
}

try {
  const analysis = await client.analyze(email)

  // Review warnings as well as the score. Neither guarantees inbox placement.
  if (analysis.score < 80 || analysis.warnings.length > 0) {
    console.warn('Review the findings, correct the message or authentication, then analyze again.', analysis.warnings)
    process.exitCode = 1
  } else {
    await client.send({
      ...email,
      stream: 'transactional',
      to: 'customer@example.com',
    })
  }
} catch (error) {
  console.error('Analysis or sending failed. Review the error before retrying.', error)
  process.exitCode = 1
}`
