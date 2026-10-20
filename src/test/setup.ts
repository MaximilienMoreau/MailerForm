import '@testing-library/jest-dom'

// Happy DOM's Web Animations cancellation differs from a browser's. Exercise
// Framer Motion's JavaScript fallback; native animation needs browser tests.
Reflect.deleteProperty(Element.prototype, 'animate')
