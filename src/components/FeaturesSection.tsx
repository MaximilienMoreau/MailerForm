import { memo } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { features, type Feature } from '../data/features'

export default function FeaturesSection() {
  const { ref, inView } = useInView<HTMLElement>(0.1)

  return (
    <section ref={ref} id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
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
            Stop stitching together 4 tools. MailForm covers your full email infrastructure from a single dashboard and API.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

const FeatureCard = memo(function FeatureCard({
  feature,
  index,
  inView,
}: {
  feature: Feature
  index: number
  inView: boolean
}) {
  const Icon = feature.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl ${feature.bg} border ${feature.border} flex items-center justify-center`}>
          <Icon size={18} className={feature.color} />
        </div>
        <span className={`tag text-[10px] border ${feature.tagColor}`}>{feature.tag}</span>
      </div>

      <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed mb-4">{feature.description}</p>

      <ul className="space-y-1.5">
        {feature.items.map(item => (
          <li key={item} className="flex items-center gap-2 text-xs text-gray-500">
            <span className={`w-1 h-1 rounded-full ${feature.bg} border ${feature.border} inline-block`} />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  )
})
