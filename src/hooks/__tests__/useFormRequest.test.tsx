import { afterEach, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useFormRequest } from '@/hooks/useFormRequest'

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})
it('aborts pending work and clears its deadline when the form unmounts', async () => {
  vi.useFakeTimers()
  const fetch = vi.fn().mockImplementation(() => new Promise(() => {}))
  vi.stubGlobal('fetch', fetch)
  const { result, unmount } = renderHook(useFormRequest)
  const outcome = result.current
    .send('/form', { email: 'team@example.com' })
    .catch((error) => error)
  expect(vi.getTimerCount()).toBe(1)
  unmount()
  expect(await outcome).toBeInstanceOf(Error)
  expect(fetch.mock.calls[0][1].signal.aborted).toBe(true)
  expect(result.current.isMounted()).toBe(false)
  expect(vi.getTimerCount()).toBe(0)
})

it('rejects concurrent submissions without sending a second request and permits retry after completion', async () => {
  let complete: ((response: Response) => void) | undefined
  const fetch = vi.fn<typeof globalThis.fetch>(
    () =>
      new Promise<Response>((resolve) => {
        complete = resolve
      })
  )
  vi.stubGlobal('fetch', fetch)
  const { result } = renderHook(useFormRequest)
  const first = result.current.send('/form', { email: 'first@example.com' })
  await expect(result.current.send('/form', { email: 'second@example.com' })).rejects.toThrow(
    'already in progress'
  )
  expect(fetch).toHaveBeenCalledTimes(1)
  expect(result.current.isPending()).toBe(true)
  expect(fetch.mock.calls[0][1]).toMatchObject({
    credentials: 'omit',
    redirect: 'error',
    referrerPolicy: 'strict-origin-when-cross-origin',
  })
  complete?.({ ok: true } as Response)
  await first
  expect(result.current.isPending()).toBe(false)
  fetch.mockResolvedValueOnce({ ok: true } as Response)
  await result.current.send('/form', { email: 'second@example.com' })
  expect(fetch).toHaveBeenCalledTimes(2)
})

it('cleans up a synchronous transport failure without leaving the form locked', async () => {
  vi.useFakeTimers()
  vi.stubGlobal(
    'fetch',
    vi.fn(() => {
      throw new Error('Transport unavailable')
    })
  )
  const { result } = renderHook(useFormRequest)
  await expect(result.current.send('/form', {})).rejects.toThrow('Transport unavailable')
  expect(result.current.isPending()).toBe(false)
  expect(vi.getTimerCount()).toBe(0)
})
