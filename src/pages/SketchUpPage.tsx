import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { CrossProductShell } from '../components/productShell/CrossProductShell'
import { DesignReviewAssistPanel } from '../components/designReview/DesignReviewAssistPanel'
import {
  ImpactFindingsMainView,
  SketchUpModelView,
} from '../components/designReview/SketchUpModelView'
import { useInvestigationProgress } from '../components/designReview/useInvestigationProgress'
import { useDesignReview } from '../context/DesignReviewContext'
import { designReviewProject } from '../types/designReview'

const sketchUpStates = new Set([
  'sketchupSelect',
  'sketchupSelectionContext',
  'sketchupComparison',
  'sourcePermission',
  'investigating',
  'impactFindings',
])

export function SketchUpPage() {
  const { state, setComparisonMode, completeInvestigation } = useDesignReview()
  const investigatingActive = state.flowState === 'investigating'
  const { completedStepIds, investigating, complete } = useInvestigationProgress(investigatingActive)

  useEffect(() => {
    if (complete) {
      completeInvestigation()
    }
  }, [complete, completeInvestigation])

  if (state.flowState === 'idle') {
    return <Navigate to="/work-center" replace />
  }

  if (state.flowState === 'connectContext') {
    return <Navigate to="/trimble-connect" replace />
  }

  const projectSightStates = new Set(['evidenceInspection', 'issueDraft', 'issueCreated'])
  if (projectSightStates.has(state.flowState)) {
    return <Navigate to="/project-sight" replace />
  }

  if (!sketchUpStates.has(state.flowState)) {
    return <Navigate to="/work-center" replace />
  }

  let main = null
  if (state.flowState === 'impactFindings') {
    main = <ImpactFindingsMainView />
  } else if (state.flowState === 'sketchupSelect') {
    main = <SketchUpModelView mode="select" />
  } else if (state.flowState === 'sketchupSelectionContext') {
    main = <SketchUpModelView mode="selected" />
  } else if (
    state.flowState === 'sketchupComparison' ||
    state.flowState === 'sourcePermission' ||
    state.flowState === 'investigating'
  ) {
    main = (
      <SketchUpModelView
        mode="comparison"
        comparisonMode={state.comparisonMode}
        onComparisonModeChange={setComparisonMode}
      />
    )
  }

  const assistInvestigating = state.flowState === 'investigating' && investigating

  return (
    <CrossProductShell
      breadcrumb={['SketchUp', designReviewProject]}
      main={main}
      assist={
        <DesignReviewAssistPanel
          flowState={state.flowState}
          completedStepIds={completedStepIds}
          investigating={assistInvestigating}
        />
      }
    />
  )
}
