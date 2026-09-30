import { Card } from './Card'

export type SourceCardProps = {
  title: string
  sourceType: string
  excerpt?: string
  className?: string
}

export function SourceCard({ title, sourceType, excerpt, className = '' }: SourceCardProps) {
  return (
    <Card padding="sm" className={className}>
      <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
        {sourceType}
      </p>
      <h3 className="mt-1 text-sm font-semibold">{title}</h3>
      {excerpt ? <p className="mt-2 text-sm text-[var(--color-text-muted)]">{excerpt}</p> : null}
    </Card>
  )
}
