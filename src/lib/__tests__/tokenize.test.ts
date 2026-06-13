import { describe, it, expect } from 'vitest'
import { tokenizeLine } from '../tokenize'

describe('tokenizeLine', () => {
  it('tokenizes a keyword', () => {
    const tokens = tokenizeLine('const x = 1')
    expect(tokens[0]).toMatchObject({ type: 'keyword', value: 'const' })
  })

  it('tokenizes single-quoted strings', () => {
    const tokens = tokenizeLine("const s = 'hello'")
    const str = tokens.find(t => t.type === 'string')
    expect(str?.value).toBe("'hello'")
  })

  it('tokenizes double-quoted strings', () => {
    const tokens = tokenizeLine('const s = "world"')
    const str = tokens.find(t => t.type === 'string')
    expect(str?.value).toBe('"world"')
  })

  it('tokenizes backtick strings', () => {
    const tokens = tokenizeLine('const s = `hello world`')
    const str = tokens.find(t => t.type === 'string')
    expect(str?.value).toBe('`hello world`')
  })

  it('tokenizes single-line comments', () => {
    const tokens = tokenizeLine('// this is a comment')
    expect(tokens[0]).toMatchObject({ type: 'comment', value: '// this is a comment' })
  })

  it('tokenizes numbers', () => {
    const tokens = tokenizeLine('const n = 42')
    const num = tokens.find(t => t.type === 'number')
    expect(num?.value).toBe('42')
  })

  it('handles escaped characters inside strings', () => {
    const tokens = tokenizeLine("const s = 'it\\'s alive'")
    const str = tokens.find(t => t.type === 'string')
    expect(str).toBeDefined()
  })

  it('returns empty array for empty string', () => {
    expect(tokenizeLine('')).toEqual([])
  })

  it('does not tokenize keyword inside a word', () => {
    const tokens = tokenizeLine('importer')
    expect(tokens.every(t => t.type !== 'keyword')).toBe(true)
  })
})
