import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const VP   = { once: true, amount: 0.08 } as const
const EASE = [0.22, 1, 0.36, 1] as const

interface FaqItem {
  question: string
  answer:   string
}

const faqs: FaqItem[] = [
  {
    question: 'How does pre-send analysis work?',
    answer:   'Before you send, MailForm runs your email through a 40-point check covering spam phrase detection, domain & IP reputation, SPF/DKIM/DMARC authentication, link safety, HTML structure, image-to-text ratio, and engagement-history signals. You receive a 0–100 score and specific fix suggestions in under 2 seconds — all via API or dashboard.',
  },
  {
    question: 'Can I migrate from SendGrid or Mailgun without downtime?',
    answer:   'Yes. MailForm supports drop-in domain and SMTP credential migration. Most teams are fully migrated within a day. We provide a dedicated migration guide and our support team will handle the DKIM/DMARC re-configuration for you at no extra cost.',
  },
  {
    question: 'What exactly is stream separation?',
    answer:   'Transactional emails (OTPs, receipts, password resets) and marketing emails (campaigns, newsletters) run on completely isolated IP pools with independent sender reputations. A poor-performing marketing campaign cannot affect the deliverability of your critical transactional traffic.',
  },
  {
    question: 'Is there a limit on API calls or webhooks?',
    answer:   'No. API calls and webhook deliveries are unlimited on all plans. Rate limits apply per endpoint (documented in our OpenAPI spec) but are set high enough that you would need to contact us before hitting them in production.',
  },
  {
    question: 'How does the free plan work?',
    answer:   '10,000 emails per month, forever free — no credit card required. You get a single sending domain, transactional stream, 10 pre-send analyses per month, and basic analytics. Upgrade only when your volume or feature needs grow.',
  },
  {
    question: 'Where is my data stored? Do you offer EU residency?',
    answer:   'By default, data is stored in US-East (AWS). EU data residency is available on the Scale plan and above — your email data, contact records, and logs never leave the EU region. We are GDPR-compliant and SOC 2 Type II certified.',
  },
]

function FaqRow({ item, defaultOpen = false }: { item: FaqItem; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-white/[0.07] last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-5 text-left focus-ring rounded-lg px-1 -mx-1 group"
      >
        <span className="text-sm font-semibold text-white group-hover:text-brand-300 transition-colors">
          {item.question}
        </span>
        <ChevronDown
          size={16}
          aria-hidden
          className={`text-gray-500 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-gray-400 leading-relaxed pr-8">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FaqSection() {
  return (
    <section id="faq" className="py-24 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Frequently asked questions
          </h2>
          <p className="text-gray-400">
            Everything you need to know before switching. If something's missing,{' '}
            <a href="mailto:hello@mailform.io" className="text-brand-400 hover:text-brand-300 transition-colors font-medium focus-ring rounded">
              reach out
            </a>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="bg-white/[0.02] border border-white/[0.07] rounded-2xl px-6"
        >
          {faqs.map((item, i) => (
            <FaqRow key={item.question} item={item} defaultOpen={i === 0} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
