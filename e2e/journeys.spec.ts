import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  // Fail on uncaught application errors and block every real Formspree endpoint.
  page.on('pageerror', (error) => {
    throw error
  })
  await page.route('https://formspree.io/**', (route) => route.abort())
  await page.addInitScript(() => {
    localStorage.setItem('mailerform_cookie_consent', 'declined')
  })
})

test('keyboard navigation reaches the main content', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: 'MailerForm', exact: true }).first()).toBeVisible()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#main-content h1')).toBeFocused()
})

test('mobile menu traps focus, closes with Escape and navigates to pricing', async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, 'Mobile dialog only')
  await page.goto('/')
  const toggle = page.getByRole('button', { name: 'Open menu' })
  await toggle.click()
  const dialog = page.getByRole('dialog', { name: 'Mobile navigation', exact: true })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('button', { name: 'Close navigation' })).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await expect(dialog.getByRole('link', { name: 'Request early access' })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(dialog.getByRole('button', { name: 'Close navigation' })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(toggle).toBeFocused()
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')
  await toggle.click()
  await page.getByRole('dialog').getByRole('link', { name: 'Pricing', exact: true }).click()
  await expect(page).toHaveURL(/#pricing$/)
  await expect(dialog).toBeHidden()
  await expect(
    page.getByRole('heading', { name: 'Choose your early-access plan' })
  ).toBeInViewport()
})

test('yearly plan survives reload and submits the selected terms', async ({ page }) => {
  await page.goto('/?utm_source=browser-test#pricing')
  await page.getByRole('switch').click()
  const plan = page.getByRole('article', { name: 'Growth plan', exact: true })
  await plan.getByRole('link').click()
  await expect(page).toHaveURL(/plan=growth&billing=yearly#cta$/)
  await page.reload()
  const cta = page.locator('#cta')
  await expect(cta).toContainText('Selected plan: growth · yearly billing')
  await expect(page).toHaveURL(/utm_source=browser-test/)
  await page.route('https://formspree.io/f/e2e-test-form', async (route) => {
    expect(route.request().postDataJSON()).toMatchObject({
      email: 'reader@example.com',
      purpose: 'early-access',
      plan: 'growth',
      billing: 'yearly',
    })
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' })
  })
  const form = page.getByRole('form', { name: 'Request MailerForm early access' })
  await form.getByRole('textbox', { name: 'Email address' }).fill('reader@example.com')
  await form.getByRole('button', { name: 'Request early access' }).click()
  await expect(cta.getByRole('status')).toContainText("You're on the list!")
  await expect(cta.getByRole('status')).toContainText('annual billing')
})

test('request failure retains the address and allows retry', async ({ page }) => {
  let attempts = 0
  await page.route('https://formspree.io/f/e2e-test-form', async (route) => {
    attempts++
    await route.fulfill({ status: attempts === 1 ? 503 : 200, body: '{}' })
  })
  await page.goto('/#cta')
  const form = page.getByRole('form', { name: 'Request MailerForm early access' })
  const email = form.getByRole('textbox', { name: 'Email address' })
  await form.getByRole('button').click()
  await expect(page.locator('#cta').getByRole('alert')).toContainText('Please enter your email')
  expect(attempts).toBe(0)
  await email.fill('retry@example.com')
  await form.getByRole('button').click()
  await expect(page.locator('#cta').getByRole('alert')).toContainText('Something went wrong')
  await expect(email).toHaveValue('retry@example.com')
  await expect(email).toHaveAttribute('aria-invalid', 'false')
  await form.getByRole('button').click()
  await expect(page.locator('#cta').getByRole('status')).toContainText("You're on the list!")
  expect(attempts).toBe(2)
})

test('newsletter requires consent and sends a separate request', async ({ page }) => {
  let submissions = 0
  await page.route('https://formspree.io/f/e2e-test-form', async (route) => {
    submissions++
    expect(route.request().postDataJSON()).toMatchObject({
      email: 'newsletter@example.com',
      purpose: 'newsletter',
      consent: true,
    })
    await route.fulfill({ status: 200, body: '{}' })
  })
  await page.goto('/blog#newsletter')
  const form = page.getByRole('form', { name: 'Newsletter subscription' })
  await form.getByRole('textbox', { name: 'Email address' }).fill('newsletter@example.com')
  await form.getByRole('button', { name: 'Subscribe to newsletter' }).click()
  await expect(form.getByRole('checkbox')).toBeFocused()
  expect(submissions).toBe(0)
  await form.getByRole('checkbox').check()
  await form.getByRole('button', { name: 'Subscribe to newsletter' }).click()
  await expect(page.locator('#newsletter').getByRole('status')).toContainText(
    'Subscription request received'
  )
  expect(submissions).toBe(1)
})
