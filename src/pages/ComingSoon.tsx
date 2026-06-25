import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, Hammer, Zap } from 'lucide-react'

const PAGE_LABELS: Record<string, string> = {
  '/blog':    'Blog',
  '/careers': 'Careers',
  '/press':   'Press',
}

export default function ComingSoon() {
  const { pathname } = useLocation()
  const label = PAGE_LABELS[pathname] ?? 'This page'

  useEffect(() => {
    const prev = document.title
    document.title = `${label} — MailerForm`
    return () => { document.title = prev }
  }, [label])

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_40%,rgba(51,102,255,0.08),transparent)]" aria-hidden />

      <div className="relative">
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-12 focus-ring rounded-lg"
          aria-label="Back to MailerForm homepage"
        >
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center shadow-lg shadow-brand-500/30">
            <Zap size={16} className="text-white" fill="white" aria-hidden />
          </div>
          <span className="font-bold text-white text-lg tracking-tight">MailerForm</span>
        </Link>

        <div className="w-16 h-16 bg-brand-500/10 border border-brand-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Hammer size={28} className="text-brand-400" aria-hidden />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">{label}</h1>
        <p className="text-gray-400 max-w-sm mx-auto mb-10 leading-relaxed">
          This page is being built. Check back soon or head back to the homepage to learn more about MailerForm.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5 focus-ring"
        >
          <ArrowLeft size={16} aria-hidden />
          Back to homepage
        </Link>
      </div>
    </div>
  )
}
