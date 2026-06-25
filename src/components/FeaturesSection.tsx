import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { features } from '@/data/features'
import { EASE, VP } from '@/lib/motion'

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
}

export default function FeaturesSection() {
  const [index, setIndex]         = useState(0)
  const [direction, setDirection] = useState(1)

  const prev = useCallback(() => {
    setDirection(-1)
    setIndex(i => (i - 1 + features.length) % features.length)
  }, [])

  const next = useCallback(() => {
    setDirection(1)
    setIndex(i => (i + 1) % features.length)
  }, [])

  const goTo = useCallback((i: number) => {
    setDirection(i > index ? 1 : -1)
    setIndex(i)
  }, [index])

  const feature = features[index]
  const Icon = feature.icon

  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-16"
        >
          <span className="tag bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-4 inline-flex">
            Everything you need
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight max-w-3xl mx-auto">
            SendGrid + Postmark + Customer.io
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-sky-400">
              in a single platform
            </span>
          </h2>
          <p className="mt-5 text-lg text-gray-400 max-w-2xl mx-auto">
            Stop stitching together 4 tools. MailerForm covers your full email infrastructure from a single dashboard and API.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        >
          {/* Slider */}
          <div className="flex items-center gap-4">

            {/* Left arrow */}
            <button
              onClick={prev}
              aria-label="Feature précédente"
              className="flex-shrink-0 w-10 h-10 rounded-full border border-white/[0.10] bg-white/[0.03] flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/[0.07] transition-all focus-ring"
            >
              <ChevronLeft size={18} aria-hidden />
            </button>

            {/* Card */}
            <div className="flex-1 overflow-hidden">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={index}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25, ease: EASE }}
                  className="card py-10 px-8"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-9 h-9 rounded-lg ${feature.bg} border ${feature.border} flex items-center justify-center`}>
                      <Icon size={16} className={feature.color} aria-hidden />
                    </div>
                    <span className={`tag text-[10px] border ${feature.tagColor}`}>{feature.tag}</span>
                  </div>
                  <h3 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-lg mb-6">
                    {feature.description}
                  </p>
                  <p className="text-sm text-gray-600">
                    {feature.items.join(' · ')}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right arrow */}
            <button
              onClick={next}
              aria-label="Feature suivante"
              className="flex-shrink-0 w-10 h-10 rounded-full border border-white/[0.10] bg-white/[0.03] flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/[0.07] transition-all focus-ring"
            >
              <ChevronRight size={18} aria-hidden />
            </button>
          </div>

          {/* Dots + counter */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-1.5" role="tablist" aria-label="Features">
              {features.map((f, i) => (
                <button
                  key={f.title}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={f.title}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 focus-ring ${
                    i === index
                      ? `w-6 ${feature.bg.replace('/10', '')} opacity-80`
                      : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600 tabular-nums" aria-live="polite">
              {String(index + 1).padStart(2, '0')} / {String(features.length).padStart(2, '0')}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
