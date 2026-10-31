import type { Plugin } from 'vite'
import deployment from '../vercel.json'

/** Exercise the same policy locally as on Vercel; dev mode needs Vite's HMR scripts. */
export function securityHeadersPlugin(): Plugin {
  const headers = deployment.headers[0].headers
  return {
    name: 'mailerform-security-headers',
    configurePreviewServer(server) {
      server.middlewares.use((_request, response, next) => {
        for (const { key, value } of headers) response.setHeader(key, value)
        next()
      })
    },
  }
}
