type TokenType = 'keyword' | 'string' | 'comment' | 'number' | 'plain'

interface Token {
  type: TokenType
  value: string
}

const KEYWORDS = ['import', 'from', 'const', 'await', 'if', 'new']

export function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = []
  let i = 0

  function pushPlain(char: string) {
    const last = tokens[tokens.length - 1]
    if (last?.type === 'plain') {
      last.value += char
    } else {
      tokens.push({ type: 'plain', value: char })
    }
  }

  while (i < line.length) {
    // Comment
    if (line[i] === '/' && line[i + 1] === '/') {
      tokens.push({ type: 'comment', value: line.slice(i) })
      break
    }

    // String (single quote or backtick)
    if (line[i] === "'" || line[i] === '`') {
      const quote = line[i]
      let j = i + 1
      while (j < line.length && line[j] !== quote) j++
      tokens.push({ type: 'string', value: line.slice(i, j + 1) })
      i = j + 1
      continue
    }

    // Keyword (only when followed by a non-word character)
    let matched = false
    for (const kw of KEYWORDS) {
      if (line.startsWith(kw, i)) {
        const after = line[i + kw.length]
        if (!after || /\W/.test(after)) {
          tokens.push({ type: 'keyword', value: kw })
          i += kw.length
          matched = true
          break
        }
      }
    }
    if (matched) continue

    // Number
    if (/\d/.test(line[i])) {
      let j = i
      while (j < line.length && /[\d.]/.test(line[j])) j++
      tokens.push({ type: 'number', value: line.slice(i, j) })
      i = j
      continue
    }

    pushPlain(line[i])
    i++
  }

  return tokens
}

const TOKEN_CLASS: Record<TokenType, string> = {
  keyword: 'text-pink-400',
  string:  'text-emerald-400',
  comment: 'text-gray-500',
  number:  'text-orange-400',
  plain:   'text-gray-300',
}

export function renderTokens(line: string, lineIndex: number) {
  const tokens = tokenizeLine(line)
  return (
    <span key={lineIndex} className="block">
      {tokens.map((t, j) => (
        <span key={j} className={TOKEN_CLASS[t.type]}>
          {t.value}
        </span>
      ))}
      {tokens.length === 0 && ' '}
    </span>
  )
}
