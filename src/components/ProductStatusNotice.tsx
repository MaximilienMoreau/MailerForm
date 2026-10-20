import { productStatus } from '@/data/product'

export default function ProductStatusNotice() {
  return (
    <aside
      aria-label="Product availability"
      className="mt-8 rounded-2xl border border-brand-500/20 bg-brand-500/10 p-5 text-left"
    >
      <p className="text-sm font-bold text-brand-300">{productStatus.label}</p>
      <p className="mt-2 text-sm text-gray-200 leading-relaxed">{productStatus.description}</p>
      <p className="mt-2 text-sm text-gray-400 leading-relaxed">{productStatus.scope}</p>
    </aside>
  )
}
