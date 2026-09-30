export type InvestigationStep = {
  id: string
  group: string
  label: string
  delayMs: number
}

export const investigationSteps: InvestigationStep[] = [
  { id: 'su-1', group: 'SKETCHUP', label: 'Selected wall changed 450 mm', delayMs: 400 },
  { id: 'su-2', group: 'SKETCHUP', label: 'Adjacent service clearance reduced', delayMs: 900 },
  { id: 'tc-1', group: 'TRIMBLE CONNECT', label: 'Latest model revision found', delayMs: 1400 },
  { id: 'tc-2', group: 'TRIMBLE CONNECT', label: 'Related MEP coordination comment found', delayMs: 1900 },
  { id: 'ps-1', group: 'PROJECTSIGHT', label: 'Related drawings', delayMs: 2400 },
  { id: 'ps-2', group: 'PROJECTSIGHT', label: 'Open RFIs', delayMs: 2900 },
  { id: 'ps-3', group: 'PROJECTSIGHT', label: 'Checking active coordination issues…', delayMs: 3400 },
]

export const investigationCompleteMs = 4200
