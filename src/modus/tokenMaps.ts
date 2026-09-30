import type { StatusKind } from '../types'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export function mapButtonVariant(variant: ButtonVariant): {
  color: 'primary' | 'secondary' | 'tertiary' | 'neutral'
  variant: 'filled' | 'outlined' | 'borderless'
} {
  switch (variant) {
    case 'primary':
      return { color: 'primary', variant: 'filled' }
    case 'secondary':
      return { color: 'secondary', variant: 'outlined' }
    case 'ghost':
      return { color: 'tertiary', variant: 'borderless' }
  }
}

export function mapButtonSize(size: ButtonSize): 'sm' | 'md' | 'lg' {
  return size
}

export function mapStatusBadge(kind: StatusKind): {
  color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
} {
  switch (kind) {
    case 'success':
      return { color: 'success' }
    case 'warning':
      return { color: 'warning' }
    case 'error':
      return { color: 'danger' }
    case 'info':
      return { color: 'primary' }
    case 'neutral':
    default:
      return { color: 'default' }
  }
}
