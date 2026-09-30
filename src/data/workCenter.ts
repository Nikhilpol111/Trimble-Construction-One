export const workCenterMainNav = [
  { id: 'home' as const, label: 'Home' },
  { id: 'projects' as const, label: 'Projects' },
  { id: 'my-work' as const, label: 'My Work' },
  { id: 'files' as const, label: 'Files' },
]

export const workCenterChatItems = [
  'Drawing revision impact',
  'RFI-118 follow-up',
  'Morning project briefing',
]

export const analyticsReportLinks = [
  { id: 'my', label: 'View My Reports' },
  { id: 'standard', label: 'View Standard Reports' },
  { id: 'public', label: 'View Public Reports' },
]

export const accountsPayableBatches = [
  { id: '256789', label: 'Batch: #256789', status: 'Complete', progress: 100, tone: 'complete' as const },
  {
    id: '789089',
    label: 'Batch: #789089',
    status: 'Prepare',
    progress: 55,
    tone: 'prepare' as const,
  },
  { id: '890765', label: 'Batch: #890765', status: 'Upload', progress: 35, tone: 'upload' as const },
]

export const invoiceSummary = {
  totalAmount: '$120,000.00',
  totalCount: 70,
  buckets: [
    { label: '30 Days', count: 40, color: '#1e6ea8' },
    { label: '60 Days', count: 18, color: '#5ba4d9' },
    { label: '90 Days', count: 8, color: '#e6a817' },
    { label: '90+ Days', count: 4, color: '#c0392b' },
  ],
}

export const agingData = {
  totalLabel: '$84.2k',
  segments: [
    { label: 'Current', value: '$38,700', color: '#1e6ea8' },
    { label: '1–30 days', value: '$20,200', color: '#5ba4d9' },
    { label: '45 days', value: '$15,100', color: '#e6a817' },
    { label: '60+ days', value: '$10,200', color: '#c0392b' },
  ],
}

export const connectProjects = [
  { id: 'north-ridge', name: 'North Ridge Infrastructure', modified: 'Modified Today 8:15 AM' },
  { id: 'eilans', name: 'Eilans Bungalow', modified: 'Modified Yesterday 2:41 PM' },
  { id: 'westminster', name: 'Westminster Campus', modified: 'Modified Aug 26 11:02 AM' },
]

export const onTrackTools = [
  { id: 'ST01', code: 'ST01', name: 'PETERBILT H335 DUMP TRUCK' },
  { id: '2040-0009', code: '2040-0009', name: 'FORD DUMP TRUCK' },
  { id: 'ST05', code: 'ST05', name: 'PETERBILT H335 DUMP TRUCK' },
]

export const quickActions = [
  { id: 'generate-widgets', label: 'Generate widgets' },
  { id: 'customise-widgets', label: 'Customise widgets' },
  { id: 'project-briefing', label: 'Project Briefing' },
  { id: 'add-collaborator', label: 'Add collaborator' },
]

export const workCenterUser = {
  name: 'Sandeep',
  email: 'sandeep@trimblestructural.com',
  emailShort: 'sandeep@trimblestructura…',
}
