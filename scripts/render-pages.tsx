import { StaticRouter } from 'react-router-dom'
import { AppContent } from '../src/App'
import { StaticRenderingContext } from '../src/lib/staticRendering'
import { renderDocument } from './render-document'

/** Wait for lazy routes and sections before emitting a complete static document. */
export async function renderPage(path: string): Promise<string> {
  try {
    return await renderDocument(
      <StaticRenderingContext.Provider value={true}>
        <StaticRouter location={path}>
          <AppContent />
        </StaticRouter>
      </StaticRenderingContext.Provider>
    )
  } catch (cause) {
    throw Object.assign(new Error(`Could not render static page: ${path}`), { cause })
  }
}
