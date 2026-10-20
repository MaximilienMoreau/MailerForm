import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4178',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command:
      'npm run build -- --outDir dist-e2e && npm run preview -- --outDir dist-e2e --host 127.0.0.1 --port 4178 --strictPort',
    url: 'http://127.0.0.1:4178',
    // Always build our own fixture: never reuse a server with a real form ID.
    reuseExistingServer: false,
    env: { VITE_FORMSPREE_ID: 'e2e-test-form' },
    timeout: 120_000,
  },
})
