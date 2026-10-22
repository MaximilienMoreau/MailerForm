import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { useStaticRendering } from '@/lib/staticRendering'

/** Keep build output complete and load browser sections shortly before they enter view. */
export default function DeferredSection({ children }: { children: ReactNode }) {
  const staticRendering = useStaticRendering()
  const { hash } = useLocation()
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  // Load every section on anchor navigation so preceding content has its real height.
  if (hash && !visible) setVisible(true)
  const ready =
    staticRendering ||
    visible ||
    Boolean(hash) ||
    (typeof window !== 'undefined' && typeof window.IntersectionObserver !== 'function')

  useEffect(() => {
    if (ready) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '600px' }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ready])

  const placeholder = <div className="min-h-[400px]" aria-hidden="true" />
  return (
    <div ref={ref}>
      {ready ? <Suspense fallback={placeholder}>{children}</Suspense> : placeholder}
    </div>
  )
}
