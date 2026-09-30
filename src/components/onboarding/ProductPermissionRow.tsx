import {
  Box,
  Building,
  Layers,
  LayoutGrid,
  PenTool,
  ShieldCheck,
} from 'lucide-react'
import type { ProductDefinition } from '../../types/onboarding'

const iconMap = {
  projectsight: LayoutGrid,
  tekla: Box,
  connect: Layers,
  viewpoint: Building,
  sketchup: PenTool,
  'business-center': Building,
}

export type ProductPermissionRowProps = {
  product: ProductDefinition
  granted: boolean
  onToggle: () => void
}

export function ProductPermissionRow({ product, granted, onToggle }: ProductPermissionRowProps) {
  const Icon = iconMap[product.icon] ?? LayoutGrid

  return (
    <div className="flex items-center gap-4 border-b border-[var(--setup-border)] px-5 py-4 last:border-b-0">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#e8f2fa] text-[var(--setup-brand-mid)]">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-[var(--setup-text)]">{product.name}</span>
          {product.badges.map((badge) => (
            <span
              key={badge}
              className="rounded border border-[var(--setup-border)] bg-[#f3f5f7] px-1.5 py-0.5 text-[10px] font-medium text-[var(--setup-muted)]"
            >
              {badge}
            </span>
          ))}
        </div>
        <p className="mt-0.5 text-xs text-[var(--setup-muted)]">{product.description}</p>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className={`shrink-0 rounded-md px-4 py-1.5 text-xs font-semibold transition-colors ${
          granted
            ? 'border border-[#b8dcc4] bg-[var(--setup-success-btn)] text-[var(--setup-success-btn-text)]'
            : 'bg-[var(--setup-brand-mid)] text-white hover:bg-[var(--setup-brand)]'
        }`}
      >
        {granted ? '✓ Granted' : 'Grant'}
      </button>
    </div>
  )
}

export type ProductsPanelProps = {
  products: ProductDefinition[]
  grantedIds: string[]
  onToggle: (id: string) => void
  onGrantAll: () => void
}

export function ProductsPanel({ products, grantedIds, onToggle, onGrantAll }: ProductsPanelProps) {
  return (
    <div className="overflow-hidden rounded-[var(--setup-radius-lg)] border border-[var(--setup-border)] bg-[var(--setup-card)]">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--setup-border)] px-5 py-3.5">
        <div className="flex items-center gap-2 text-sm text-[var(--setup-muted)]">
          <ShieldCheck className="h-4 w-4 text-[var(--setup-brand-light)]" />
          <span>
            From Trimble ID <span className="text-[var(--setup-muted-light)]">·</span>{' '}
            <span className="font-medium text-[var(--setup-text)]">{products.length} products</span>
          </span>
        </div>
        <button
          type="button"
          onClick={onGrantAll}
          className="text-sm font-semibold text-[var(--setup-link)] hover:underline"
        >
          Grant all →
        </button>
      </div>
      {products.map((product) => (
        <ProductPermissionRow
          key={product.id}
          product={product}
          granted={grantedIds.includes(product.id)}
          onToggle={() => onToggle(product.id)}
        />
      ))}
    </div>
  )
}
