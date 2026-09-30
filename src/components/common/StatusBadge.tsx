import type { StatusKind } from '../../types'

const kindClasses: Record<StatusKind, string> = {
  neutral: 'bg-neutral-100 text-neutral-700 border-neutral-200',
  info: 'bg-neutral-100 text-neutral-800 border-neutral-200',
  success: 'bg-neutral-100 text-neutral-800 border-neutral-200',
  warning: 'bg-neutral-100 text-neutral-800 border-neutral-200',
  error: 'bg-neutral-100 text-neutral-800 border-neutral-200',
}

export type StatusBadgeProps = {
  label: string
  kind?: StatusKind
  className?: string
}

export function StatusBadge({ label, kind = 'neutral', className = '' }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium ${kindClasses[kind]} ${className}`}
    >
      {label}
    </span>
  )
}
