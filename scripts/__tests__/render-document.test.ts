import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { createElement } from 'react'
import { renderToPipeableStream, type PipeableStream } from 'react-dom/server'
import { renderDocument } from '../render-document'

vi.mock('react-dom/server', () => ({ renderToPipeableStream: vi.fn() }))
const renderer = vi.mocked(renderToPipeableStream)
let stream: PipeableStream

beforeEach(() => {
  vi.useFakeTimers()
  stream = { pipe: vi.fn(), abort: vi.fn() }
  renderer.mockReturnValue(stream)
})
afterEach(() => {
  vi.useRealTimers()
  vi.resetAllMocks()
})

it('waits for complete content and preserves the rendered HTML unchanged', async () => {
  stream.pipe = vi.fn((destination) => {
    destination.end(
      '<h1 style="opacity:0;transform:translateY(20px)">Ready</h1><span style="opacity:0.5">Dimmed</span>'
    )
    return destination
  })
  const result = renderDocument(createElement('main'))
  expect(stream.pipe).not.toHaveBeenCalled()
  renderer.mock.calls[0][1]!.onAllReady!()
  await expect(result).resolves.toBe(
    '<h1 style="opacity:0;transform:translateY(20px)">Ready</h1><span style="opacity:0.5">Dimmed</span>'
  )
  expect(vi.getTimerCount()).toBe(0)
  expect(stream.abort).not.toHaveBeenCalled()
})

it('aborts on a render error and preserves the original error if abort reports another', async () => {
  const error = new Error('Component failed')
  const result = renderDocument(createElement('main'))
  const rejected = expect(result).rejects.toBe(error)
  const options = renderer.mock.calls[0][1]!
  vi.mocked(stream.abort).mockImplementation(() =>
    options.onError!(new Error('Aborted'), { componentStack: '' })
  )
  options.onError!(error, { componentStack: '' })
  options.onAllReady!()
  await rejected
  expect(stream.abort).toHaveBeenCalledTimes(1)
  expect(stream.pipe).not.toHaveBeenCalled()
  expect(vi.getTimerCount()).toBe(0)
})

it('aborts a stalled render instead of leaving it running after the deadline', async () => {
  const result = renderDocument(createElement('main'), 100)
  const rejected = expect(result).rejects.toThrow('Static rendering timed out')
  await vi.advanceTimersByTimeAsync(100)
  await rejected
  expect(stream.abort).toHaveBeenCalledTimes(1)
  expect(vi.getTimerCount()).toBe(0)
})

it('cleans up when the renderer throws before returning a stream', async () => {
  const error = new Error('Could not initialize renderer')
  renderer.mockImplementation(() => {
    throw error
  })
  await expect(renderDocument(createElement('main'))).rejects.toBe(error)
  expect(vi.getTimerCount()).toBe(0)
})

it('aborts when an error is reported before the renderer returns its handle', async () => {
  const error = new Error('Shell failed')
  renderer.mockImplementation((_, options) => {
    options!.onShellError!(error)
    return stream
  })
  await expect(renderDocument(createElement('main'))).rejects.toBe(error)
  expect(stream.abort).toHaveBeenCalledTimes(1)
  expect(vi.getTimerCount()).toBe(0)
})
