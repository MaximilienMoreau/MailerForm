import { expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { motion } from '@/components/Motion'
import { StaticRenderingContext } from '@/lib/staticRendering'

it('renders entrance and viewport animations in their final state for static documents', () => {
  const html = renderToStaticMarkup(
    <StaticRenderingContext.Provider value={true}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        Header
      </motion.div>
      <motion.div initial="hidden" whileInView="visible" variants={{ hidden: {}, visible: {} }}>
        <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          Section
        </motion.p>
      </motion.div>
      <motion.span style={{ opacity: 0 }}>Intentionally hidden</motion.span>
    </StaticRenderingContext.Provider>
  )
  const document = new DOMParser().parseFromString(html, 'text/html')
  expect(document.querySelector('div')?.style.opacity).toBe('1')
  expect(document.querySelector('p')?.style.opacity).toBe('1')
  expect(document.querySelector('span')?.style.opacity).toBe('0')
})

it('preserves entrance styles for the interactive application', () => {
  const html = renderToStaticMarkup(
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      Header
    </motion.div>
  )
  const document = new DOMParser().parseFromString(html, 'text/html')
  expect(document.querySelector('div')?.style.opacity).toBe('0')
  expect(document.querySelector('div')?.style.transform).toContain('translateY(20px)')
})
