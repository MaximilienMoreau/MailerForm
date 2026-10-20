import { Component, type ErrorInfo, type ReactNode } from 'react'
import { RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  pagePath?: string
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  handleReset = () => {
    // React.lazy remembers rejected imports. Reload the current URL to retry
    // the document and its assets, retaining the query string and anchor.
    if (this.isLoadError()) {
      window.location.reload()
      return
    }
    this.setState({ hasError: false, error: null })
  }

  isLoadError = () =>
    /ChunkLoadError|Loading (?:CSS )?chunk|Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|Unable to preload CSS/i.test(
      `${this.state.error?.name} ${this.state.error?.message}`
    )

  render() {
    if (this.state.hasError) {
      return (
        <main
          id="main-content"
          className="min-h-screen bg-gray-950 flex items-center justify-center px-4"
        >
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <RefreshCw size={24} className="text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">
              {this.isLoadError() ? 'This page could not load' : 'Something went wrong'}
            </h1>
            {this.props.pagePath && (
              <p className="text-xs text-gray-400 mb-4 break-all">Page: {this.props.pagePath}</p>
            )}
            {this.isLoadError() && (
              <p className="text-gray-300 text-sm mb-4">
                Check your connection, then try again. We will reopen this page with the same plan
                and navigation details.
              </p>
            )}
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              If this keeps happening, please{' '}
              <a
                href="mailto:hello@mailerform.io"
                className="text-brand-400 hover:text-brand-300 transition-colors"
              >
                contact support
              </a>
              .
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              className="focus-ring inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-brand-500/25"
            >
              <RefreshCw size={16} aria-hidden />
              Try again
            </button>
            <a href="/" className="btn-secondary justify-center mt-4 mx-auto focus-ring">
              Back to homepage
            </a>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}
