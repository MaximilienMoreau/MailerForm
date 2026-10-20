import { CheckCircle2 } from 'lucide-react'

const criteria = [
  [
    'Pre-send checks',
    'Can you inspect authentication and message content before sending?',
    'Explore the sample analysis',
    '#deliverability',
  ],
  [
    'Traffic isolation',
    'Can marketing traffic affect the reputation of critical transactional messages?',
    'See the stream model',
    '#streams',
  ],
  [
    'Integration',
    'Can your team analyze, send, and consume delivery events in its existing workflow?',
    'Read the API example',
    '#api',
  ],
  [
    'Volume and cost',
    'What is included, what happens above the limit, and what is billed annually?',
    'Review preview pricing',
    '#pricing',
  ],
]

export default function ComparisonSection() {
  return (
    <section id="comparison" className="py-16 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl text-center font-extrabold text-white">
          Compare what matters to your team
        </h2>
        <p className="mt-4 mb-10 text-gray-400 text-center max-w-2xl mx-auto">
          Use the same questions when evaluating any provider. These criteria explain the MailerForm
          approach without assigning unverified competitor ratings.
        </p>
        <ul className="grid sm:grid-cols-2 gap-4">
          {criteria.map(([title, question, label, href]) => (
            <li key={title} className="card">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <CheckCircle2 size={16} className="text-brand-400" aria-hidden />
                {title}
              </h3>
              <p className="text-sm text-gray-400 mt-3 mb-4">{question}</p>
              <a href={href} className="text-sm text-brand-300 underline focus-ring rounded">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
