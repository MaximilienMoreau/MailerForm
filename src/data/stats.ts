export interface Stat {
  prefix: string
  value: number
  suffix: string
  decimals: number
  label: string
}

export const stats: Stat[] = [
  { prefix: '',  value: 99.2, suffix: '%',  decimals: 1, label: 'Inbox placement rate' },
  { prefix: '',  value: 260,  suffix: '+',  decimals: 0, label: 'API endpoints' },
  { prefix: '<', value: 80,   suffix: 'ms', decimals: 0, label: 'Delivery latency' },
  { prefix: '',  value: 10,   suffix: 'B+', decimals: 0, label: 'Emails analyzed' },
]
