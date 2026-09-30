import type { ComponentType } from 'react'

export type StatusKind = 'neutral' | 'info' | 'success' | 'warning' | 'error'

export type NavItem = {
  id: string
  label: string
  href: string
  icon?: ComponentType<{ className?: string }>
}

export type StepperStep = {
  id: string
  label: string
  description?: string
}

export type ProgressListItem = {
  id: string
  label: string
  status: StatusKind
  detail?: string
}

export type ToastMessage = {
  id: string
  title: string
  description?: string
  kind?: StatusKind
}

export type PrototypeRouteEntry = {
  path: string
  label: string
  group?: string
}
