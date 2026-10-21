import { StaticRouter } from 'react-router-dom'
import { AppContent } from '../src/App'
import { renderDocument } from './render-document'

/** Wait for lazy routes and sections before emitting a complete static document. */
export async function renderPage(path: string): Promise<string> {
  try {
    return await renderDocument(
      <StaticRouter location={path}>
        <AppContent />
      </StaticRouter>
    )
  } catch (cause) {
    throw Object.assign(new Error(`Could not render static page: ${path}`), { cause })
  }
}
