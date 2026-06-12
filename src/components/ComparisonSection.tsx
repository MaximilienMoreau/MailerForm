import { motion } from 'framer-motion'
import { Check, Minus, Star } from 'lucide-react'

const VP   = { once: true, amount: 0.08 } as const
const EASE = [0.22, 1, 0.36, 1] as const

type CellValue = boolean | 'best' | 'partial'

interface ComparisonRow {
  label:    string
  mailform: CellValue
  sendgrid: CellValue
  mailgun:  CellValue
  resend:   CellValue
}

const rows: ComparisonRow[] = [
  { label: 'Transactional email',                mailform: true,     sendgrid: true,      mailgun: true,      resend: true      },
  { label: 'Marketing campaigns',                mailform: true,     sendgrid: true,      mailgun: 'partial', resend: false     },
  { label: 'Deliverability analysis (pre-send)', mailform: 'best',   sendgrid: false,     mailgun: false,     resend: false     },
  { label: 'Spam score prediction',              mailform: 'best',   sendgrid: false,     mailgun: false,     resend: false     },
  { label: 'CRM & contact management',           mailform: true,     sendgrid: 'partial', mailgun: false,     resend: false     },
  { label: 'Automation workflows',               mailform: true,     sendgrid: 'partial', mailgun: false,     resend: false     },
  { label: 'Stream separation (isolated IPs)',   mailform: 'best',   sendgrid: true,      mailgun: true,      resend: true      },
  { label: 'Webhook events',                     mailform: true,     sendgrid: true,      mailgun: true,      resend: true      },
  { label: 'API-first design',                   mailform: 'best',   sendgrid: true,      mailgun: true,      resend: 'best'    },
  { label: 'GDPR / CAN-SPAM tools',              mailform: true,     sendgrid: true,      mailgun: true,      resend: 'partial' },
]

function Cell({ value, highlight }: { value: CellValue; highlight?: boolean }) {
  const base = `px-4 py-3 text-center ${highlight ? 'bg-brand-500/[0.04]' : ''}`

  if (value === 'best') {
    return (
      <td className={base}>
        <div className="flex items-center justify-center gap-1">
          <Star size={12} className="text-brand-400 fill-brand-400" aria-hidden />
          <span className="text-xs font-semibold text-brand-400">Best</span>
        </div>
      </td>
    )
  }
  if (value === true) {
    return (
      <td className={base}>
        <Check size={15} className="text-emerald-400 mx-auto" aria-label="Supported" />
      </td>
    )
  }
  if (value === 'partial') {
    return (
      <td className={base}>
        <Minus size={15} className="text-amber-400 mx-auto" aria-label="Partial support" />
      </td>
    )
  }
  return (
    <td className={base}>
      <div className="w-3 h-0.5 bg-gray-700 mx-auto rounded" aria-label="Not available" />
    </td>
  )
}

export default function ComparisonSection() {
  return (
    <section id="comparison" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
            How MailForm compares
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            The only platform that combines sending infrastructure, CRM, and deliverability intelligence in a single product.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          className="overflow-x-auto rounded-2xl border border-white/[0.07]"
        >
          <table className="w-full" aria-label="Feature comparison between MailForm and competitors">
            <thead>
              <tr className="border-b border-white/[0.07]">
                <th scope="col" className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-64">
                  Feature
                </th>
                <th scope="col" className="px-4 py-4 text-center bg-brand-500/[0.04] border-x border-brand-500/10">
                  <span className="text-sm font-bold text-white">MailForm</span>
                  <span className="block text-[10px] text-brand-400 font-medium mt-0.5">All-in-one</span>
                </th>
                <th scope="col" className="px-4 py-4 text-center">
                  <span className="text-sm font-semibold text-gray-400">SendGrid</span>
                </th>
                <th scope="col" className="px-4 py-4 text-center">
                  <span className="text-sm font-semibold text-gray-400">Mailgun</span>
                </th>
                <th scope="col" className="px-4 py-4 text-center">
                  <span className="text-sm font-semibold text-gray-400">Resend</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {rows.map(row => (
                <tr key={row.label} className="hover:bg-white/[0.015] transition-colors">
                  <th scope="row" className="px-4 py-3 text-sm text-gray-400 font-normal text-left">
                    {row.label}
                  </th>
                  <Cell value={row.mailform} highlight />
                  <Cell value={row.sendgrid} />
                  <Cell value={row.mailgun} />
                  <Cell value={row.resend} />
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VP}
          transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
          className="flex items-center gap-6 mt-5 justify-end text-xs text-gray-600"
          aria-label="Legend"
        >
          <span className="flex items-center gap-1.5">
            <Star size={11} className="text-brand-400 fill-brand-400" aria-hidden /> Best-in-class
          </span>
          <span className="flex items-center gap-1.5">
            <Check size={11} className="text-emerald-400" aria-hidden /> Supported
          </span>
          <span className="flex items-center gap-1.5">
            <Minus size={11} className="text-amber-400" aria-hidden /> Partial
          </span>
          <span className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-gray-700 rounded" aria-hidden /> Not available
          </span>
        </motion.div>
      </div>
    </section>
  )
}
