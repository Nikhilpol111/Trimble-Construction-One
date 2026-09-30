import { ModusWcAlert } from '@trimble-oss/moduswebcomponents-react'
import type { StatusKind } from '../../types'

export type AlertProps = {
  title: string
  description?: string
  kind?: StatusKind
  dismissible?: boolean
  className?: string
}

function mapVariant(kind: StatusKind = 'neutral'): 'error' | 'info' | 'neutral' | 'success' | 'warning' {
  switch (kind) {
    case 'success':
      return 'success'
    case 'warning':
      return 'warning'
    case 'error':
      return 'error'
    case 'info':
      return 'info'
    case 'neutral':
    default:
      return 'neutral'
  }
}

export function Alert({
  title,
  description,
  kind = 'neutral',
  dismissible = false,
  className = '',
}: AlertProps) {
  return (
    <ModusWcAlert
      alertTitle={title}
      alertDescription={description}
      variant={mapVariant(kind)}
      dismissible={dismissible}
      customClass={className}
    />
  )
}
