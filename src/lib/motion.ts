// Shared Framer Motion constants used across all section components.
export const EASE = [0.22, 1, 0.36, 1] as const

// Viewport presets — choose based on how much of the element must be visible
// before triggering the animation.
export const VP = { once: true, amount: 0.08 } as const
export const VP_SM = { once: true, amount: 0.12 } as const
export const VP_MD = { once: true, amount: 0.15 } as const
export const VP_LG = { once: true, amount: 0.2 } as const
