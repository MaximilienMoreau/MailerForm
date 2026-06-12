import { motion, type Variants, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 36 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

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
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const VIEWPORT = { once: true, amount: 0.1 } as const

interface FadeInProps extends Omit<HTMLMotionProps<'div'>, 'variants' | 'initial' | 'whileInView' | 'viewport'> {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right'
  className?: string
  as?: keyof typeof motion
}

export function FadeIn({ children, delay = 0, direction = 'up', className, ...rest }: FadeInProps) {
  const variants = direction === 'left' ? fadeLeft : direction === 'right' ? fadeRight : fadeUp

  return (
    <motion.div
      variants={variants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
