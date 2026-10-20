import { useEffect, useRef } from 'react'

export const FORM_TIMEOUT_MS = 15_000
export class FormTimeoutError extends Error {
  constructor() {
    super('The request timed out. Please try again.')
    this.name = 'FormTimeoutError'
  }
}

export function useFormRequest() {
  const mounted = useRef(true)
  const pending = useRef<(() => void) | null>(null)
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      pending.current?.()
    }
  }, [])

  async function send(url: string, body: unknown) {
    const controller = new window.AbortController()
    let timer: ReturnType<typeof setTimeout> | undefined
    try {
      return await Promise.race([
        fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(body),
          signal: controller.signal,
        }),
        new Promise<never>((_, reject) => {
          pending.current = () => {
            reject(new Error('Request cancelled'))
            controller.abort()
          }
          timer = setTimeout(() => {
            reject(new FormTimeoutError())
            controller.abort()
          }, FORM_TIMEOUT_MS)
        }),
      ])
    } finally {
      clearTimeout(timer)
      pending.current = null
    }
  }
  return { send, isMounted: () => mounted.current }
}
