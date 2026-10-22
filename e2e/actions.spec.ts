import { expect, test } from '@playwright/test'

for (const path of [
  '/',
  '/about',
  '/blog',
  '/careers',
  '/press',
  '/changelog',
  '/privacy',
  '/terms',
  '/cookies',
  '/gdpr',
  '/missing-page',
]) {
  test(`visible actions receive pointer clicks on ${path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(path)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    const actions = page.locator('a, button')
    for (const action of await actions.all()) {
      if (!(await action.isVisible()) || !(await action.isEnabled())) continue
      // The skip link becomes visible only when focused.
      if ((await action.textContent())?.includes('Skip to main content')) continue
      const href = await action.getAttribute('href')
      if (href !== null) {
        expect(href.trim()).not.toBe('')
        expect(href).not.toBe('#')
        if (href.startsWith('#')) {
          await expect(page.locator(href)).toHaveCount(1)
        }
      }
      // Exercise browser hit testing without navigating, sending mail or submitting forms.
      await action.click({ trial: true })
    }
  })
}
