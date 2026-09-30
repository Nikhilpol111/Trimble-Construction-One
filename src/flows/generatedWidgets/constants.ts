import type { ConnectActivityItem } from '../../types/generatedWidgets'

export const generatedWidgetsIntentText =
  'Create widgets to track recent activities in Trimble Connect from the activity page.'

export function matchesGeneratedWidgetsIntent(prompt: string): boolean {
  const normalized = prompt.trim().toLowerCase().replace(/\s+/g, ' ')
  if (!normalized) return false
  return (
    normalized.includes('track recent activities') &&
    normalized.includes('trimble connect') &&
    (normalized.includes('activity page') || normalized.includes('activities'))
  )
}

export const connectActivityItems: ConnectActivityItem[] = [
  {
    id: 'a1',
    initials: 'RS',
    avatarColor: '#1e6ea8',
    userName: 'Ramkumar S.',
    verb: 'uploaded',
    subject: 'IMG_080323_044910.png',
    subjectIsLink: true,
    timeShort: '2m',
    timeMeta: '2m ago · Trimble Connect',
  },
  {
    id: 'a2',
    initials: 'PN',
    avatarColor: '#7c3aed',
    userName: 'Priya N.',
    verb: 'commented on',
    subject: 'Level 4 Plan',
    timeShort: '18m',
    timeMeta: '18m ago · Trimble Connect',
  },
  {
    id: 'a3',
    initials: 'MP',
    avatarColor: '#0d9488',
    userName: 'Marcus P.',
    verb: 'uploaded',
    subject: 'Structural_v12.ifc',
    subjectIsLink: true,
    timeShort: '1h',
    timeMeta: '1h ago · Trimble Connect',
  },
  {
    id: 'a4',
    initials: 'EV',
    avatarColor: '#ea580c',
    userName: 'Elena V.',
    verb: 'added revision',
    subject: 'Drawing A-104',
    timeShort: '3h',
    timeMeta: '3h ago · Trimble Connect',
  },
]

export const activitySummaryStats = [
  { label: 'Files uploaded', value: 12 },
  { label: 'Comments added', value: 8 },
  { label: 'Project updates', value: 5 },
  { label: 'Active today', value: 9 },
]

export const widgetLibraryTrimble = [
  { id: 'analytics' as const, label: 'Analytics', onDashboard: true },
  { id: 'trimble-connect-projects' as const, label: 'Trimble Connect P…', onDashboard: true },
  { id: 'accounts-payable-overview' as const, label: 'Accounts Payable', onDashboard: true },
  { id: 'unapproved-invoices' as const, label: 'Unapproved Invoi…', onDashboard: true },
  { id: 'on-track' as const, label: 'On!Track Tool List', onDashboard: true },
]

export const GENERATED_WIDGETS_STORAGE_KEY = 'trimble-work-center-generated-widgets'
