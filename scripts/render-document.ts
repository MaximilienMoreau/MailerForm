import { PassThrough } from 'node:stream'
import type { ReactNode } from 'react'
import { renderToPipeableStream, type PipeableStream } from 'react-dom/server'

/** Render all Suspense boundaries, failing the build rather than emitting a partial page. */
export function renderDocument(element: ReactNode, timeoutMs = 30_000): Promise<string> {
  return new Promise((resolve, reject) => {
    const output = new PassThrough()
    let stream: PipeableStream | undefined
    let settled = false
    let html = ''

    const fail = (error: unknown) => {
      if (settled) return
      settled = true
      clearTimeout(timeout)
      // Reject first: aborting React can synchronously report another error.
      reject(error)
      output.destroy()
      stream?.abort()
    }
    const timeout = setTimeout(() => fail(new Error('Static rendering timed out')), timeoutMs)
    output.setEncoding('utf8')
    output.on('data', (chunk: string) => {
      html += chunk
    })
    output.on('error', fail)
    output.on('end', () => {
      if (settled) return
      settled = true
      clearTimeout(timeout)
      resolve(html)
    })

    try {
      stream = renderToPipeableStream(element, {
        onAllReady() {
          if (!settled) stream?.pipe(output)
        },
        onError: fail,
        onShellError: fail,
      })
      // A renderer may report an error before returning its cancellation handle.
      if (settled) stream.abort()
    } catch (error) {
      fail(error)
    }
  })
}
