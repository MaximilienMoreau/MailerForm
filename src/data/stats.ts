export interface Stat {
  prefix: string
  value: number
  suffix: string
  decimals: number
  label: string
}

export const stats: Stat[] = [
  { prefix: '', value: 3, suffix: '', decimals: 0, label: 'Interactive analysis examples' },
  { prefix: '', value: 2, suffix: '', decimals: 0, label: 'Email stream types' },
  { prefix: '', value: 1, suffix: '', decimals: 0, label: 'Analyze-to-send workflow' },
  { prefix: '$', value: 0, suffix: '', decimals: 0, label: 'To request early access' },
]
