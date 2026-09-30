export type GeneratedWidgetFlowState =
  | 'idle'
  | 'widgetRequestSubmitted'
  | 'generatedOptions'
  | 'widgetPreview'
  | 'widgetAdded'
  | 'dashboardCustomise'

export type GeneratedWidgetOptionId =
  | 'recent-activity'
  | 'activity-summary'
  | 'project-timeline'

export type WidgetConfig = {
  title: string
  projectFilter: string
  activityType: string
  timeRange: string
}

export type ConnectActivityItem = {
  id: string
  initials: string
  avatarColor: string
  userName: string
  verb: string
  subject: string
  subjectIsLink?: boolean
  timeShort: string
  timeMeta: string
}

export type DashboardWidgetId =
  | 'analytics'
  | 'accounts-payable-overview'
  | 'unapproved-invoices'
  | 'customer-aging'
  | 'trimble-connect-projects'
  | 'on-track'
  | 'recent-activity'

export type GeneratedWidgetsPersistedState = {
  dashboardLayout: DashboardWidgetId[]
  widgetConfig: WidgetConfig
  selectedGeneratedWidget: GeneratedWidgetOptionId | null
  recentActivityAdded: boolean
}

export const defaultWidgetConfig: WidgetConfig = {
  title: 'Recent Activity — Trimble Connect',
  projectFilter: 'All accessible projects',
  activityType: 'All activity',
  timeRange: 'Last 7 days',
}

export const defaultDashboardLayout: DashboardWidgetId[] = [
  'analytics',
  'accounts-payable-overview',
  'unapproved-invoices',
  'customer-aging',
  'trimble-connect-projects',
  'on-track',
]
