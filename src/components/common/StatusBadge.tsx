import { ModusWcBadge } from '@trimble-oss/moduswebcomponents-react'
import type { StatusKind } from '../../types'
import { mapStatusBadge } from '../../modus/tokenMaps'

export type StatusBadgeProps = {
  label: string
  kind?: StatusKind
  className?: string
}

export function StatusBadge({ label, kind = 'neutral', className = '' }: StatusBadgeProps) {
  const { color } = mapStatusBadge(kind)

  return (
    <ModusWcBadge color={color} variant="filled" size="sm" customClass={className}>
      {label}
    </ModusWcBadge>
  )
}
