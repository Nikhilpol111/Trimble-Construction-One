import type { DesignReviewSourceId } from '../../types/designReview'

export const designReviewSources: {
  id: DesignReviewSourceId
  title: string
  subtitle: string
}[] = [
  {
    id: 'sketchup',
    title: 'SketchUp',
    subtitle: 'Current and previous design model',
  },
  {
    id: 'trimbleConnect',
    title: 'Trimble Connect',
    subtitle: 'Model versions, comments and shared files',
  },
  {
    id: 'projectSight',
    title: 'ProjectSight',
    subtitle: 'Drawings, RFIs and coordination issues',
  },
  {
    id: 'otherDocs',
    title: 'Other project documents',
    subtitle: 'Specs and reports',
  },
]

export const defaultSelectedSources: DesignReviewSourceId[] = [
  'sketchup',
  'trimbleConnect',
  'projectSight',
]
