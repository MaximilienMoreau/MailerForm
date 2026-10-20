import { afterEach, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ApiSection from '@/components/ApiSection'
import { codeExample } from '@/data/api'

afterEach(() => {
  vi.restoreAllMocks()
  window.getSelection()?.removeAllRanges()
})

it('copies the complete example and announces success', async () => {
  const user = userEvent.setup()
  const copy = vi.fn().mockResolvedValue(undefined)
  vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue({
    writeText: copy,
  } as unknown as typeof navigator.clipboard)
  render(<ApiSection />)
  await user.click(screen.getByRole('button', { name: 'Copy code to clipboard' }))
  expect(copy).toHaveBeenCalledWith(codeExample)
  expect(screen.getByRole('status')).toHaveTextContent('Code copied to clipboard.')
})

it.each(['missing', 'denied', 'throws'])(
  'selects the code and explains manual copying when clipboard access is %s',
  async (reason) => {
    const user = userEvent.setup()
    const writeText =
      reason === 'throws'
        ? () => {
            throw new Error('Clipboard unavailable')
          }
        : () => Promise.reject(new Error('Permission denied'))
    vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue(
      reason === 'missing' ? undefined! : ({ writeText } as unknown as typeof navigator.clipboard)
    )
    render(<ApiSection />)
    await user.click(screen.getByRole('button', { name: 'Copy code to clipboard' }))
    expect(screen.getByRole('status')).toHaveTextContent(/Automatic copy is unavailable.*Ctrl\+C/)
    expect(window.getSelection()?.toString()).toContain('import MailerForm')
    expect(screen.getByLabelText(/Code example: sending an email/)).toHaveFocus()
  }
)
