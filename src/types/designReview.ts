export const designReviewTaskTitle = 'Review latest design change in North Ridge' as const

export const designReviewIntentText =
  'Review the latest design change in North Ridge, identify its project impact and prepare the actions we need.' as const

export const designReviewProject = 'North Ridge Infrastructure' as const

export type DesignReviewProduct = 'Work Center' | 'Trimble Connect' | 'SketchUp' | 'ProjectSight'

export type DesignReviewFlowState =
  | 'idle'
  | 'connectContext'
  | 'sketchupSelect'
  | 'sketchupSelectionContext'
  | 'sketchupComparison'
  | 'sourcePermission'
  | 'investigating'
  | 'impactFindings'
  | 'evidenceInspection'
  | 'issueDraft'
  | 'issueCreated'

export type ComparisonMode = 'previous' | 'current' | 'overlay'

export type DesignReviewSourceId =
  | 'sketchup'
  | 'trimbleConnect'
  | 'projectSight'
  | 'otherDocs'

export type DraftIssue = {
  title: string
  description: string
  priority: string
  assignee: string
  dueDate: string
}

export type DesignReviewState = {
  currentTask: string
  project: string
  currentProduct: DesignReviewProduct
  flowState: DesignReviewFlowState
  selectedElement: string | null
  selectedSources: DesignReviewSourceId[]
  comparisonMode: ComparisonMode
  investigationComplete: boolean
  issueCreated: boolean
  monitoringEnabled: boolean
  draftIssue: DraftIssue
  issueNumber: number
}

export const defaultDraftIssue: DraftIssue = {
  title: 'Mechanical room wall change may affect MEP clearance',
  description:
    'The Mechanical Room East Wall shifted approximately 450 mm east in NorthRidge_Design_v18. This reduces the adjacent MEP service clearance. Drawing A-204 still reflects the previous wall position, and RFI-087 concerns the minimum clearance in this area. Recommend coordination review before construction.',
  priority: 'High',
  assignee: 'A. Morgan',
  dueDate: '',
}

export const defaultDesignReviewState: DesignReviewState = {
  currentTask: designReviewIntentText,
  project: designReviewProject,
  currentProduct: 'Work Center',
  flowState: 'idle',
  selectedElement: null,
  selectedSources: ['sketchup', 'trimbleConnect', 'projectSight'],
  comparisonMode: 'current',
  investigationComplete: false,
  issueCreated: false,
  monitoringEnabled: false,
  draftIssue: defaultDraftIssue,
  issueNumber: 124,
}

export function matchesDesignReviewIntent(prompt: string): boolean {
  const t = prompt.trim().toLowerCase()
  if (!t) return false
  if (t === designReviewIntentText.toLowerCase()) return true
  return t.includes('north ridge') && t.includes('design change')
}
