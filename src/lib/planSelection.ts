export const PLAN_IDS = ['starter', 'growth', 'scale'] as const
export type PlanId = (typeof PLAN_IDS)[number]
export type BillingInterval = 'monthly' | 'yearly'

export function parsePlanSelection(search: string) {
  const params = new URLSearchParams(search)
  const candidate = params.get('plan')
  const plan = PLAN_IDS.find((id) => id === candidate) ?? null
  const billing: BillingInterval = params.get('billing') === 'yearly' ? 'yearly' : 'monthly'
  return { plan, billing }
}

export function planRequestPath(plan: PlanId, billing: BillingInterval, search = '') {
  const params = new URLSearchParams(search)
  params.delete('billing')
  params.set('plan', plan)
  params.set('billing', billing)
  return `/?${params.toString()}#cta`
}
