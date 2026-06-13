import type { Variants } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1] as const

export const VP    = { once: true, amount: 0.08 } as const
export const VP_SM = { once: true, amount: 0.12 } as const
export const VP_MD = { once: true, amount: 0.15 } as const
export const VP_LG = { once: true, amount: 0.2  } as const

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
}
