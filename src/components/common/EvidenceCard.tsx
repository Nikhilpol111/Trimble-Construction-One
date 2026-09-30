import type { ReactNode } from 'react'
import { Card } from './Card'
import { StatusBadge } from './StatusBadge'

export type EvidenceCardProps = {
  title: string
  summary: string
  statusLabel?: string
  meta?: ReactNode
  className?: string
}

export function EvidenceCard({
  title,
  summary,
  statusLabel = 'Evidence',
  meta,
  className = '',
}: EvidenceCardProps) {
  return (
    <Card className={className}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">{summary}</p>
        </div>
        <StatusBadge label={statusLabel} />
      </div>
      {meta ? <div className="mt-3 text-xs text-[var(--color-text-muted)]">{meta}</div> : null}
    </Card>
  )
}
