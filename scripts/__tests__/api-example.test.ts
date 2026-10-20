import { expect, it, vi } from 'vitest'
import { runInNewContext } from 'node:vm'
import ts from 'typescript'
import { codeExample } from '../../src/data/api'

async function runExample(score = 94, warnings: string[] = [], failure = false) {
  const analyze = failure
    ? vi.fn().mockRejectedValue(new Error('Provider unavailable'))
    : vi.fn().mockResolvedValue({ score, warnings })
  const send = vi.fn().mockResolvedValue({ id: 'test' })
  const process = { env: { MAILERFORM_KEY: 'test-key' }, exitCode: 0 }
  const console = { warn: vi.fn(), error: vi.fn() }
  class SDK {
    analyze = analyze
    send = send
  }
  const compiled = ts.transpileModule(codeExample, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText
  await runInNewContext(`(async () => { ${compiled} })()`, {
    require: () => ({ default: SDK }),
    exports: {},
    process,
    console,
  })
  return { analyze, send, process, console }
}

it('runs the copied example with a mock SDK and uses the same complete message for analysis and sending', async () => {
  const result = await runExample()
  const message = result.analyze.mock.calls[0][0]
  expect(message).toMatchObject({ from: 'orders@acme.com', subject: 'Your order is confirmed!' })
  expect(message.html).toContain('<p>')
  expect(result.send).toHaveBeenCalledWith({
    ...message,
    stream: 'transactional',
    to: 'customer@example.com',
  })
  expect(result.process.exitCode).toBe(0)
})

it.each([
  [42, []],
  [94, ['authentication']],
] as const)('does not send with score %s and warnings %s', async (score, warnings) => {
  const result = await runExample(score, [...warnings])
  expect(result.send).not.toHaveBeenCalled()
  expect(result.console.warn).toHaveBeenCalled()
  expect(result.process.exitCode).toBe(1)
})

it('reports provider failure without attempting to send', async () => {
  const result = await runExample(94, [], true)
  expect(result.send).not.toHaveBeenCalled()
  expect(result.console.error).toHaveBeenCalled()
  expect(result.process.exitCode).toBe(1)
})
