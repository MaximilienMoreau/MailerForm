import { useState, useCallback, useRef, useId, type KeyboardEvent } from 'react'
import { motion } from '@/components/Motion'
import { AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { features, type Feature } from '@/data/features'
import { EASE, VP } from '@/lib/motion'

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
}

function FeatureContent({ feature }: { feature: Feature }) {
  const Icon = feature.icon
  return (
    <>
      {/* Mobile: icon+badge row above title / Desktop: all on same row */}
      <div className="flex items-center justify-between gap-3 mb-3 sm:hidden">
        <div
          className={`shrink-0 w-12 h-12 rounded-xl ${feature.bg} border ${feature.border} flex items-center justify-center`}
        >
          <Icon size={22} className={feature.color} aria-hidden />
        </div>
        <span className={`shrink-0 tag text-xs border ${feature.tagColor}`}>{feature.tag}</span>
      </div>
      <h3 className="text-2xl sm:hidden font-extrabold text-white leading-tight tracking-tight text-center mb-4">
        {feature.title}
      </h3>
      <div className="hidden sm:flex items-center gap-4 mb-6">
        <div
          className={`shrink-0 w-16 h-16 rounded-xl ${feature.bg} border ${feature.border} flex items-center justify-center`}
        >
          <Icon size={30} className={feature.color} aria-hidden />
        </div>
        <h3 className="flex-1 text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight text-center lg:leading-none">
          {feature.title}
        </h3>
        <span className={`shrink-0 tag text-sm border ${feature.tagColor}`}>{feature.tag}</span>
      </div>
      <p className="text-gray-400 leading-relaxed text-base sm:text-lg mb-6 sm:leading-7">
        {feature.description}
      </p>
      <p className="text-sm text-gray-400">{feature.items.join(' · ')}</p>
    </>
  )
}

export default function FeaturesSection() {
  const uid = useId()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const prev = useCallback(() => {
    setDirection(-1)
    setIndex((i) => (i - 1 + features.length) % features.length)
  }, [])

  const next = useCallback(() => {
    setDirection(1)
    setIndex((i) => (i + 1) % features.length)
  }, [])

  const goTo = useCallback(
    (i: number) => {
      setDirection(i > index ? 1 : -1)
      setIndex(i)
    },
    [index]
  )

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, current: number) {
    let target: number
    switch (event.key) {
      case 'ArrowRight':
        target = (current + 1) % features.length
        break
      case 'ArrowLeft':
        target = (current - 1 + features.length) % features.length
        break
      case 'Home':
        target = 0
        break
      case 'End':
        target = features.length - 1
        break
      default:
        return
    }
    event.preventDefault()
    goTo(target)
    tabs.current[target]?.focus()
  }

  const feature = features[index]

  return (
    <section
      id="features"
      className="pt-8 pb-16"
      aria-roledescription="carousel"
      aria-label="Product features"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-16"
        >
          <span className="tag bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-4 inline-flex">
            Everything you need
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight max-w-3xl mx-auto sm:leading-10 lg:leading-none">
            SendGrid + Postmark + Customer.io
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r/srgb from-brand-400 to-sky-400">
              in a single platform
            </span>
          </h2>
          <p className="mt-5 text-lg text-gray-400 max-w-2xl mx-auto">
            Stop stitching together 4 tools. MailerForm covers your full email infrastructure from a
            single dashboard and API.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        >
          {/* Slider */}
          <div className="flex items-center gap-4">
            {/* Left arrow */}
            <button
              onClick={prev}
              aria-label="Previous feature"
              className="requires-js shrink-0 w-10 h-10 rounded-full border border-white/[0.10] bg-white/[0.03] flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/[0.07] transition-all focus-ring"
            >
              <ChevronLeft size={18} aria-hidden />
            </button>

            {/* Card */}
            <div
              id={`${uid}-panel`}
              role="tabpanel"
              aria-labelledby={`${uid}-tab-${index}`}
              tabIndex={0}
              className="flex-1 overflow-hidden focus-ring rounded-2xl"
            >
              <AnimatePresence custom={direction} initial={false}>
                <motion.div
                  key={index}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  transition={{ duration: 0.25, ease: EASE }}
                  className="card py-6 px-4 sm:py-10 sm:px-8"
                >
                  <FeatureContent feature={feature} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right arrow */}
            <button
              onClick={next}
              aria-label="Next feature"
              className="requires-js shrink-0 w-10 h-10 rounded-full border border-white/[0.10] bg-white/[0.03] flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/[0.07] transition-all focus-ring"
            >
              <ChevronRight size={18} aria-hidden />
            </button>
          </div>

          {/* Dots + counter */}
          <div className="requires-js flex flex-wrap items-center justify-center gap-2 mt-6">
            <div
              className="flex flex-wrap justify-center gap-1"
              role="tablist"
              aria-label="Features"
            >
              {features.map((f, i) => (
                <button
                  key={f.title}
                  ref={(node) => {
                    tabs.current[i] = node
                  }}
                  id={`${uid}-tab-${i}`}
                  role="tab"
                  tabIndex={i === index ? 0 : -1}
                  aria-controls={`${uid}-panel`}
                  onKeyDown={(event) => handleTabKey(event, i)}
                  aria-selected={i === index}
                  aria-label={f.title}
                  onClick={() => goTo(i)}
                  className={`h-11 min-w-8 flex items-center justify-center rounded-lg transition-all duration-300 focus-ring ${
                    i === index ? `bg-white/10 text-white` : 'hover:bg-white/5 text-gray-400'
                  }`}
                >
                  <span
                    aria-hidden
                    className={`h-1.5 rounded-full ${i === index ? `w-6 ${feature.dot}` : 'w-1.5 bg-white/30'}`}
                  />
                </button>
              ))}
            </div>
            <span
              className="text-xs text-gray-400 tabular-nums"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="sr-only">{feature.title}. Feature </span>
              {String(index + 1).padStart(2, '0')} / {String(features.length).padStart(2, '0')}
            </span>
          </div>
        </motion.div>
        <noscript>
          <div className="mt-6 space-y-6">
            {features.slice(1).map((item) => (
              <article
                key={item.title}
                className="card py-6 px-4 sm:py-10 sm:px-8"
                aria-label={item.title}
              >
                <FeatureContent feature={item} />
              </article>
            ))}
          </div>
        </noscript>
      </div>
    </section>
  )
}
