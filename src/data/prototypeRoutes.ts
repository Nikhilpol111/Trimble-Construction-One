import type { PrototypeRouteEntry } from '../types'

export const prototypeRoutes: PrototypeRouteEntry[] = [
  { path: '/signin', label: 'Sign in', group: 'Onboarding' },
  { path: '/setup/profile', label: 'Profile', group: 'Onboarding' },
  { path: '/setup/products', label: 'Products', group: 'Onboarding' },
  { path: '/setup/week/morning', label: 'Your week — Morning', group: 'Onboarding' },
  { path: '/setup/week/time', label: 'Your week — Briefing time', group: 'Onboarding' },
  { path: '/setup/week/timesink', label: 'Your week — Time-sink', group: 'Onboarding' },
  { path: '/setup/week/checkin', label: 'Your week — Check-in', group: 'Onboarding' },
  { path: '/setup/trust', label: 'Trust / Autonomy', group: 'Onboarding' },
  { path: '/setup/ready', label: 'Ready', group: 'Onboarding' },
  { path: '/work-center', label: 'Work Center', group: 'Apps' },
  { path: '/project-sight', label: 'ProjectSight', group: 'Apps' },
  { path: '/trimble-connect', label: 'Trimble Connect', group: 'Apps' },
  { path: '/sketchup', label: 'SketchUp', group: 'Apps' },
]
