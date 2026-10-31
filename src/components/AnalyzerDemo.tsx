import { useId, useState } from 'react'

const examples = [
  {
    name: 'Healthy email',
    subject: 'Your order is confirmed',
    score: 94,
    issue: 'Authentication is aligned. Links and message structure pass the sample checks.',
    fix: 'Keep a plain-text alternative and monitor delivery events after sending.',
  },
  {
    name: 'Authentication issue',
    subject: 'Reset your password',
    score: 42,
    issue: 'The signing domain does not align with the From address. The sample DMARC check fails.',
    fix: 'Align your DKIM signing domain with the From domain and verify the DNS record before sending.',
  },
  {
    name: 'Risky content',
    subject: 'URGENT: claim your guaranteed reward',
    score: 61,
    issue: 'The message combines a misleading subject, a shortened link, and an image-only body.',
    fix: 'Use a factual subject, link directly to your domain, and add readable text with a plain-text alternative.',
  },
]

export default function AnalyzerDemo() {
  const [selected, setSelected] = useState(0)
  const [corrected, setCorrected] = useState(false)
  const id = useId()
  const example = examples[selected]
  return (
    <div
      id="analyzer-demo"
      className="scroll-mt-24 rounded-2xl border border-white/10 bg-gray-900/80 p-5 sm:p-6 text-left shadow-xl"
    >
      <h3 className="text-lg font-bold text-white">Try a sample analysis</h3>
      <p className="mt-2 text-sm text-gray-400">
        Interactive demonstration with preset data. No email is uploaded or sent. Scores illustrate
        risks; they do not guarantee inbox placement.
      </p>
      <fieldset className="mt-5">
        <legend className="text-sm text-gray-300 mb-3">Choose an example</legend>
        <div className="flex flex-wrap gap-2">
          {examples.map((item, index) => (
            <label
              key={item.name}
              className={`cursor-pointer rounded-lg border px-3 py-2 text-sm ${selected === index ? 'border-brand-400 bg-brand-500/10 text-white' : 'border-white/10 text-gray-300'}`}
            >
              <input
                type="radio"
                name={`example-${id}`}
                checked={selected === index}
                onChange={() => {
                  setSelected(index)
                  setCorrected(false)
                }}
                className="mr-2 accent-blue-500"
              />
              {item.name}
            </label>
          ))}
        </div>
      </fieldset>
      <div aria-live="polite" aria-atomic="true" className="mt-5 space-y-4">
        <p className="text-sm text-gray-300">
          <span className="text-gray-400">Subject: </span>
          {corrected ? 'Updated sample email' : example.subject}
        </p>
        <p className="text-4xl font-bold text-white">
          {corrected ? 94 : example.score}
          <span className="text-sm font-normal text-gray-400"> / 100 sample score</span>
        </p>
        <div>
          <h4 className="text-sm font-semibold text-white">
            {corrected ? 'Checks after correction' : 'Findings'}
          </h4>
          <p className="mt-1 text-sm text-gray-400">
            {corrected
              ? 'The sample now passes the illustrated checks. Real messages still require analysis and delivery monitoring.'
              : example.issue}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-brand-300">Recommended action</h4>
          <p className="mt-1 text-sm text-gray-300">{example.fix}</p>
        </div>
      </div>
      {selected !== 0 && (
        <button
          type="button"
          onClick={() => setCorrected((value) => !value)}
          className="btn-secondary mt-5 text-sm"
        >
          {corrected ? 'Reset sample' : 'Apply sample corrections'}
        </button>
      )}
    </div>
  )
}
