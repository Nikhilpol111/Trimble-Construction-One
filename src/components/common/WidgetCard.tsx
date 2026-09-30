import type { ReactNode } from 'react'
import { Card } from './Card'
import { StatusBadge } from './StatusBadge'

export type WidgetCardProps = {
  title: string
  description?: string
  statusLabel?: string
  actions?: ReactNode
  className?: string
}

export function WidgetCard({
  title,
  description,
  statusLabel = 'Widget',
  actions,
  className = '',
}: WidgetCardProps) {
  return (
    <Card className={className}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          {description ? (
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">{description}</p>
          ) : null}
        </div>
        <StatusBadge label={statusLabel} />
      </div>
      {actions ? <div className="mt-4 flex gap-2">{actions}</div> : null}
    </Card>
  )
}
