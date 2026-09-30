import type { ReactNode } from 'react'
import { MoreHorizontal } from 'lucide-react'

export type DashboardWidgetProps = {
  title: string
  productLabel: string
  children: ReactNode
  className?: string
}

export function DashboardWidget({
  title,
  productLabel,
  children,
  className = '',
}: DashboardWidgetProps) {
  return (
    <article
      className={`flex min-h-[220px] flex-col rounded-[8px] border border-[var(--wc-border)] bg-[var(--wc-surface)] ${className}`}
    >
      <div className="flex items-start justify-between gap-2 border-b border-[var(--wc-border-light)] px-4 py-3">
        <div>
          <h3 className="text-sm font-bold text-[var(--wc-text)]">{title}</h3>
          <p className="text-[11px] text-[var(--wc-muted-light)]">{productLabel}</p>
        </div>
        <button type="button" className="text-[var(--wc-muted-light)]" aria-label="Widget menu">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      <div className="flex flex-1 flex-col px-4 py-3">{children}</div>
    </article>
  )
}

export function DashboardGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-[var(--wc-widget-gap)] min-[1280px]:grid-cols-3">{children}</div>
  )
}
