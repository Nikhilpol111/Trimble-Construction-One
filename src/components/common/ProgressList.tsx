import type { ProgressListItem } from '../../types'
import { StatusBadge } from './StatusBadge'

export type ProgressListProps = {
  items: ProgressListItem[]
  className?: string
}

export function ProgressList({ items, className = '' }: ProgressListProps) {
  return (
    <ul
      className={`divide-y divide-[var(--color-border)] rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] ${className}`}
    >
      {items.map((item) => (
        <li key={item.id} className="flex items-start justify-between gap-3 px-4 py-3">
          <div>
            <p className="text-sm font-medium">{item.label}</p>
            {item.detail ? (
              <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">{item.detail}</p>
            ) : null}
          </div>
          <StatusBadge label={item.status} kind={item.status} />
        </li>
      ))}
    </ul>
  )
}
