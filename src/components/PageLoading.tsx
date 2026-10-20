import Navbar from '@/components/Navbar'

export default function PageLoading() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main
        id="main-content"
        aria-busy="true"
        className="max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-20 min-h-[75vh]"
      >
        <p role="status" className="text-sm text-brand-300">
          Loading page…
        </p>
        <div aria-hidden="true" className="mt-8 space-y-6 motion-safe:animate-pulse">
          <div className="h-12 w-3/4 rounded-xl bg-white/10" />
          <div className="h-5 w-full rounded-lg bg-white/5" />
          <div className="h-5 w-5/6 rounded-lg bg-white/5" />
          <div className="h-48 rounded-2xl border border-white/10 bg-white/[0.03]" />
        </div>
      </main>
    </div>
  )
}
