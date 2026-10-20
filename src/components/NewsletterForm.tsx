import { useFormRequest, FormTimeoutError } from '@/hooks/useFormRequest'
import { useId, useState, type FormEvent } from 'react'

export default function NewsletterForm() {
  const id = useId()
  const { send, isMounted } = useFormRequest()
  const [error, setError] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const formId = import.meta.env.VITE_FORMSPREE_ID
  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'sending') return
    const data = new FormData(event.currentTarget)
    setState('sending')
    setError('')
    try {
      const response = await send(`https://formspree.io/f/${formId}`, {
        email: data.get('email'),
        purpose: 'newsletter',
        consent: true,
        _gotcha: data.get('_gotcha'),
      })
      if (!isMounted()) return
      if (!response.ok) throw new Error('Subscription failed')
      setState('success')
    } catch (error) {
      if (!isMounted()) return
      setError(
        error instanceof FormTimeoutError
          ? error.message
          : 'Could not subscribe. Please try again or email hello@mailerform.io.'
      )
      setState('error')
    }
  }
  return (
    <section
      id="newsletter"
      className="scroll-mt-24 mt-14 max-w-3xl mx-auto rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
    >
      <h2 className="text-xl font-bold text-white">Get the MailerForm newsletter</h2>
      <p className="mt-2 text-sm text-gray-400">
        Email engineering guides and product updates. This subscription is separate from early
        access.
      </p>
      {state === 'success' ? (
        <p role="status" className="mt-4 text-emerald-400">
          Subscription request received. We will send newsletter updates to this address.
        </p>
      ) : formId ? (
        <form onSubmit={subscribe} className="mt-5 space-y-3" aria-label="Newsletter subscription">
          <label htmlFor={id} className="block text-sm text-gray-300">
            Email address
          </label>
          <input
            id={id}
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full bg-gray-900 border border-white/20 rounded-lg px-4 py-3 text-white focus-ring"
            placeholder="you@company.com"
          />
          <input
            name="_gotcha"
            type="text"
            tabIndex={-1}
            aria-hidden="true"
            autoComplete="off"
            className="hidden"
          />
          <label className="flex gap-2 text-xs text-gray-300">
            <input type="checkbox" required name="consent" className="accent-blue-500" />I agree to
            receive newsletter emails. I can unsubscribe at any time.
          </label>
          <p className="text-xs text-gray-400">
            See our{' '}
            <a href="/privacy" className="underline focus-ring rounded">
              privacy policy
            </a>
            .
          </p>
          <button
            type="submit"
            disabled={state === 'sending'}
            className="btn-primary text-sm disabled:opacity-60"
          >
            {state === 'sending' ? 'Subscribing…' : 'Subscribe to newsletter'}
          </button>
          {state === 'error' && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}
        </form>
      ) : (
        <a
          href="mailto:hello@mailerform.io?subject=Newsletter%20subscription%20request"
          className="btn-primary mt-5 text-sm"
        >
          Request newsletter subscription
        </a>
      )}
    </section>
  )
}
