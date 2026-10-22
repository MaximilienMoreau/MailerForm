import { expect, test } from '@playwright/test'

test('homepage content is mounted without scrolling and its landmarks stay unique after navigation', async ({
  page,
}) => {
  await page.route('https://formspree.io/**', (route) => route.abort())
  await page.goto('/')
  // Wait for the interactive app, rather than just inspecting build-time HTML.
  await expect(page.getByRole('button', { name: 'Next feature' })).toBeVisible()
  for (const id of ['integrations', 'comparison', 'pricing', 'faq', 'cta']) {
    await expect(page.locator(`#${id}`)).toHaveCount(1)
  }
  expect(await page.evaluate(() => window.scrollY)).toBe(0)
  await expect(page.getByRole('main')).toHaveCount(1)
  await expect(page.getByRole('contentinfo')).toHaveCount(1)

  await page.locator('footer').getByRole('link', { name: 'About', exact: true }).click()
  await expect(page).toHaveURL(/\/about$/)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByRole('main')).toHaveCount(1)
  await expect(page.getByRole('contentinfo')).toHaveCount(1)
  await page.goBack()
  await expect(page.locator('#cta')).toHaveCount(1)
  await expect(page.getByRole('contentinfo')).toHaveCount(1)
})
