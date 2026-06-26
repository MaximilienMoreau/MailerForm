import { Link } from 'react-router-dom'
import { ArrowLeft, Zap } from 'lucide-react'
import { useMeta } from '@/hooks/useMeta'

export default function NotFound() {
  useMeta({ title: 'Page Not Found' })

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

        <p className="text-8xl font-black text-white tabular-nums mb-4 opacity-10 select-none" aria-hidden>
          404
        </p>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Page not found</h1>
        <p className="text-gray-400 max-w-sm mx-auto mb-10 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist yet. We&apos;re working on it.
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
