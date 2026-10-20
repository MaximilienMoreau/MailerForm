import { useCallback, useEffect, useRef } from 'react'

export const FORM_TIMEOUT_MS = 15_000
export class FormTimeoutError extends Error {
  constructor() {
    super('The request timed out. Please try again.')
    this.name = 'FormTimeoutError'
  }
}
export class FormCancelledError extends Error {
  constructor() {
    super('Request cancelled')
    this.name = 'FormCancelledError'
  }
}

interface PendingRequest {
  promise: Promise<Response>
  cancel: () => void
}

/** Each form can have one request in flight. Cancellation always settles its promise. */
export function useFormRequest() {
  const mounted = useRef(true)
  const pending = useRef<PendingRequest | null>(null)
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      pending.current?.cancel()
    }
  }, [])

  const send = useCallback((url: string, body: unknown): Promise<Response> => {
    if (!mounted.current) return Promise.reject(new FormCancelledError())
    if (pending.current) return Promise.reject(new Error('A form request is already in progress.'))
    const controller = new AbortController()
    let rejectPending: (error: Error) => void = () => {}
    let timer: ReturnType<typeof setTimeout>
    const deadline = new Promise<never>((_, reject) => {
      rejectPending = reject
      timer = setTimeout(() => {
        reject(new FormTimeoutError())
        controller.abort()
      }, FORM_TIMEOUT_MS)
    })
    let request: Promise<Response>
    try {
      request = fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      })
    } catch (error) {
      request = Promise.reject(error)
    }
    const promise = Promise.race([request, deadline]).finally(() => {
      clearTimeout(timer)
      // An old request must never clear a newer request's cancellation handle.
      if (pending.current?.promise === promise) pending.current = null
    })
    pending.current = {
      promise,
      cancel: () => {
        rejectPending(new FormCancelledError())
        controller.abort()
      },
    }
    return promise
  }, [])

  const isMounted = useCallback(() => mounted.current, [])
  const isPending = useCallback(() => pending.current !== null, [])
  return { send, isMounted, isPending }
}
