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
