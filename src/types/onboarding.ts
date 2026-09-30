export type SetupStage = 'profile' | 'products' | 'week' | 'trust' | 'ready'

export type AutonomyLevel = 'suggest' | 'copilot' | 'autopilot'

export type OnboardingProfile = {
  name: string
  role: string
  email: string
  organization: string
  department: string
  office: string
  timezone: string
  license: string
  language: string
  employeeSince: string
  titleLine: string
}

export type ProductDefinition = {
  id: string
  name: string
  badges: string[]
  description: string
  icon: 'projectsight' | 'tekla' | 'connect' | 'viewpoint' | 'sketchup' | 'business-center'
}

export type WeekOption = {
  id: string
  title: string
  description: string
  icon: 'inbox' | 'calendar' | 'map-pin' | 'clock' | 'sun' | 'file' | 'users' | 'briefcase' | 'layout-grid' | 'bell'
}

export type OnboardingState = {
  profile: OnboardingProfile
  grantedProducts: string[]
  morningStyle: string
  briefingTime: string
  biggestTimeSink: string
  checkInFrequency: string
  autonomyLevel: AutonomyLevel
  memoryEnabled: boolean
  signInEmail: string
  rememberMe: boolean
}
