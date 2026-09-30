import { Navigate } from 'react-router-dom'
import { CrossProductShell } from '../components/productShell/CrossProductShell'
import { ConnectProjectModelsView } from '../components/designReview/ConnectProjectModelsView'
import { DesignReviewAssistPanel } from '../components/designReview/DesignReviewAssistPanel'
import { useDesignReview } from '../context/DesignReviewContext'
import { designReviewProject } from '../types/designReview'

export function TrimbleConnectPage() {
  const { state } = useDesignReview()

  if (state.flowState === 'idle') {
    return <Navigate to="/work-center" replace />
  }

  if (state.flowState !== 'connectContext') {
    const sketchUpStates = new Set([
      'sketchupSelect',
      'sketchupSelectionContext',
      'sketchupComparison',
      'sourcePermission',
      'investigating',
      'impactFindings',
    ])
    if (sketchUpStates.has(state.flowState)) {
      return <Navigate to="/sketchup" replace />
    }
    const projectSightStates = new Set(['evidenceInspection', 'issueDraft', 'issueCreated'])
    if (projectSightStates.has(state.flowState)) {
      return <Navigate to="/project-sight" replace />
    }
    return <Navigate to="/work-center" replace />
  }

  return (
    <CrossProductShell
      breadcrumb={['Trimble Connect', designReviewProject]}
      main={<ConnectProjectModelsView />}
      assist={
        <DesignReviewAssistPanel
          flowState={state.flowState}
          completedStepIds={[]}
          investigating={false}
        />
      }
    />
  )
}
