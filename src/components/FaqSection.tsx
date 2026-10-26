import { useState, useId } from 'react'
import { motion } from '@/components/Motion'
import { AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { EASE, VP } from '@/lib/motion'

interface FaqItem {
  question: string
  answer: string
}

const faqs: FaqItem[] = [
  {
    question: 'How does pre-send analysis work?',
    answer:
      'The planned workflow checks authentication, message structure, content, and links before sending. The interactive reports on this site use preset examples; they do not analyze your email. Production coverage, response times, and availability will be confirmed during early-access onboarding.',
  },
  {
    question: 'Can I migrate from SendGrid or Mailgun during early access?',
    answer:
      'Share your domains, templates, sending volumes, and event integrations when requesting access. We can discuss a staged migration and the checks needed before switching traffic. Timing, support scope, and any costs must be agreed before activation; uninterrupted migration is not guaranteed.',
  },
  {
    question: 'What exactly is stream separation?',
    answer:
      'The intended design routes transactional notifications and marketing campaigns through separate streams so they can be monitored independently. Confirm available isolation, IP allocation, and operational guarantees for your selected plan during onboarding.',
  },
  {
    question: 'Is there a limit on API calls or webhooks?',
    answer:
      'API quotas, endpoint rate limits, and webhook delivery policies are not finalized on this preview site. Describe your expected traffic when requesting access so the team can confirm applicable limits and pricing before you commit.',
  },
  {
    question: 'What happens after I request early access?',
    answer:
      'We receive your email and selected plan, then contact you about availability and onboarding. No account is created and no trial starts when you submit. Pricing is a preview; trial duration, overage rates, and final terms will be confirmed before activation.',
  },
  {
    question: 'Where is my data stored? Do you offer EU residency?',
    answer:
      'Tell us your hosting and retention requirements when requesting access. Confirm available regions and processing terms with our team before sending production data. No certification report is published on this site; request supporting documentation during your security review.',
  },
]

function FaqRow({ item, defaultOpen = false }: { item: FaqItem; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const uid = useId()
  const answerId = `faq-answer-${uid}`

  return (
    <div className="border-b border-white/[0.07] last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={answerId}
        className="w-full flex items-center justify-between gap-4 py-5 text-left focus-ring rounded-lg px-1 -mx-1 group"
      >
        <span className="text-sm font-semibold text-white group-hover:text-brand-300 transition-colors">
          {item.question}
        </span>
        <ChevronDown
          size={16}
          aria-hidden
          className={`text-gray-400 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Wrapper always present so aria-controls always resolves */}
      <div id={answerId}>
        {!open && (
          <noscript>
            <p className="pb-5 text-sm text-gray-400 leading-relaxed pr-8">{item.answer}</p>
          </noscript>
        )}
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
              <p className="pb-5 text-sm text-gray-400 leading-relaxed pr-8">{item.answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function FaqSection() {
  return (
    <section id="faq" className="py-16 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Frequently asked questions
          </h2>
          <p className="text-gray-400">
            Everything you need to know before switching. If something&apos;s missing,{' '}
            <a
              href="mailto:hello@mailerform.io"
              className="text-brand-400 hover:text-brand-300 transition-colors font-medium focus-ring rounded-sm"
            >
              reach out
            </a>
            .
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
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
