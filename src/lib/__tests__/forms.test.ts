import { expect, it } from 'vitest'
import { formspreeEndpoint } from '../forms'

it.each([
  undefined,
  '',
  '   ',
  'your_form_id_here',
  '../other',
  'id?redirect=https://unapproved.example',
  'https://unapproved.example',
  'id#fragment',
])('does not activate a form for an invalid or example ID: %s', (id) => {
  expect(formspreeEndpoint(id)).toBeNull()
})

it('trims the ID and fixes the endpoint to the approved HTTPS provider', () => {
  expect(formspreeEndpoint('  example-id_123  ')).toBe('https://formspree.io/f/example-id_123')
})
