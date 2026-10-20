import { expect, it } from 'vitest'
import { parsePlanSelection, planRequestPath } from '../planSelection'

it('accepts only known plans and billing intervals', () => {
  expect(parsePlanSelection('?plan=unknown&billing=weekly')).toEqual({
    plan: null,
    billing: 'monthly',
  })
  expect(parsePlanSelection('?plan=scale&billing=yearly')).toEqual({
    plan: 'scale',
    billing: 'yearly',
  })
})
it('retains campaign attribution while updating plan selection', () => {
  const path = planRequestPath('growth', 'yearly', '?utm_source=guide&plan=starter')
  const url = new URL(path, 'https://mailerform.io')
  expect(url.searchParams.get('utm_source')).toBe('guide')
  expect(url.searchParams.get('plan')).toBe('growth')
  expect(url.searchParams.get('billing')).toBe('yearly')
  expect(url.hash).toBe('#cta')
})
