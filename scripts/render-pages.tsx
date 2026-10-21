import { PassThrough } from 'node:stream'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppContent } from '../src/App'

/** Wait for lazy routes and sections before emitting a complete static document. */
export function renderPage(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const output = new PassThrough()
    let html = ''
    output.setEncoding('utf8')
    output.on('data', (chunk: string) => {
      html += chunk
    })
    output.on('error', reject)
    output.on('end', () => {
      // Motion's entrance styles must not hide the static document without JavaScript.
      resolve(
        html.replace(/style="([^"]*)"/g, (attribute, styles: string) => {
          if (!/(?:^|;)opacity:0(?:;|$)/.test(styles)) return attribute
          return `style="${styles.replace(/(^|;)opacity:0(?=;|$)/, '$1opacity:1').replace(/(^|;)transform:[^;]*/g, '')}"`
        })
      )
    })
    const timeout = setTimeout(() => {
      stream.abort()
      reject(new Error(`Static rendering timed out: ${path}`))
    }, 30_000)
    output.on('close', () => clearTimeout(timeout))
    const stream = renderToPipeableStream(
      <StaticRouter location={path}>
        <AppContent />
      </StaticRouter>,
      {
        onAllReady() {
          stream.pipe(output)
        },
        onError(error) {
          clearTimeout(timeout)
          reject(error)
        },
      }
    )
  })
}
