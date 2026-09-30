import type { OnboardingState, ProductDefinition, WeekOption } from '../types/onboarding'

export const ONBOARDING_STORAGE_KEY = 'trimble-construction-one-onboarding'

export const defaultProfile: OnboardingState['profile'] = {
  name: 'Sandeep',
  role: 'Project Manager',
  email: 'sandeep@trimble.com',
  organization: 'Trimble Structural Engineering, Inc.',
  department: 'Construction Operations',
  office: 'Pune, India',
  timezone: 'IST (UTC+5:30)',
  license: 'Enterprise',
  language: 'English (US)',
  employeeSince: 'January 2023',
  titleLine: 'Project Manager | Trimble Structural Engineering',
}

export const productsCatalog: ProductDefinition[] = [
  {
    id: 'projectsight',
    name: 'ProjectSight',
    badges: ['Enterprise', 'Licensed'],
    description: 'RFIs · daily logs · drawing changes · assignment status',
    icon: 'projectsight',
  },
  {
    id: 'tekla',
    name: 'Tekla',
    badges: ['Premium', 'Licensed'],
    description: 'Model elements · revisions · drift signals',
    icon: 'tekla',
  },
  {
    id: 'trimble-connect',
    name: 'Trimble Connect',
    badges: ['Business', 'Licensed'],
    description: 'Shared models · file activity · comments',
    icon: 'connect',
  },
  {
    id: 'viewpoint',
    name: 'Viewpoint ERP',
    badges: ['Spectrum', 'Licensed'],
    description: 'Invoices · purchase orders · vendor status',
    icon: 'viewpoint',
  },
  {
    id: 'sketchup',
    name: 'SketchUp',
    badges: ['Pro', 'Licensed'],
    description: 'Concept models · scene comments',
    icon: 'sketchup',
  },
  {
    id: 'business-center',
    name: 'Trimble Business Center',
    badges: ['Civil', 'Licensed'],
    description: 'Takeoff · estimating · quantities',
    icon: 'business-center',
  },
]

export const initialGrantedProducts = ['projectsight', 'trimble-connect', 'sketchup']

export const morningOptions: WeekOption[] = [
  {
    id: 'inbox-reactive',
    title: 'Inbox & reactive',
    description: "What's changed overnight.",
    icon: 'inbox',
  },
  {
    id: 'planning-calendar',
    title: 'Planning & calendar',
    description: 'Group briefing around meetings.',
    icon: 'calendar',
  },
  {
    id: 'in-field',
    title: 'In the field',
    description: 'Terse, voice-friendly.',
    icon: 'map-pin',
  },
]

export const briefingTimeOptions: WeekOption[] = [
  { id: 'before-7', title: 'Before 7 AM', description: 'Ready when I sign in.', icon: 'clock' },
  { id: '7-9', title: '7–9 AM', description: 'With first coffee.', icon: 'clock' },
  { id: 'after-9', title: 'After 9 AM', description: 'Once meetings start.', icon: 'clock' },
  { id: 'only-when-ask', title: 'Only when I ask', description: "I'll request one.", icon: 'sun' },
]

export const timeSinkOptions: WeekOption[] = [
  {
    id: 'rfis',
    title: 'RFIs & submittals',
    description: 'Review, route, draft replies.',
    icon: 'file',
  },
  {
    id: 'status-meetings',
    title: 'Status & meetings',
    description: 'Stand-ups, prep, recap.',
    icon: 'users',
  },
  {
    id: 'finance',
    title: 'Finance & approvals',
    description: 'POs, invoices, signatures.',
    icon: 'briefcase',
  },
  {
    id: 'product-switching',
    title: 'Product switching',
    description: 'Tekla, ProjectSight, Connect.',
    icon: 'layout-grid',
  },
]

export const checkInOptions: WeekOption[] = [
  { id: 'once-day', title: 'Once a day', description: 'One morning briefing.', icon: 'inbox' },
  {
    id: 'twice-day',
    title: 'Twice a day',
    description: 'Morning + end-of-day digest.',
    icon: 'calendar',
  },
  {
    id: 'important-changes',
    title: 'On important changes',
    description: 'Quiet, but ping on RFIs / drift.',
    icon: 'bell',
  },
  { id: 'stay-quiet', title: 'Stay quiet', description: "I'll come to you.", icon: 'sun' },
]

export const defaultOnboardingState: OnboardingState = {
  profile: defaultProfile,
  grantedProducts: [...initialGrantedProducts],
  morningStyle: '',
  briefingTime: '',
  biggestTimeSink: '',
  checkInFrequency: '',
  autonomyLevel: 'suggest',
  memoryEnabled: true,
  signInEmail: '',
  rememberMe: true,
}

export function findWeekLabel(options: WeekOption[], id: string): string {
  return options.find((o) => o.id === id)?.title ?? '—'
}

export const autonomyCopy: Record<
  OnboardingState['autonomyLevel'],
  { message: string; oversight: string; filledBars: number }
> = {
  suggest: {
    message: "I'll suggest next steps; you decide what runs.",
    oversight: 'High oversight',
    filledBars: 1,
  },
  copilot: {
    message: 'I handle low-risk actions; important actions need your approval.',
    oversight: 'Medium oversight',
    filledBars: 2,
  },
  autopilot: {
    message: 'I act on routine work within the boundaries you set.',
    oversight: 'Low oversight',
    filledBars: 3,
  },
}
