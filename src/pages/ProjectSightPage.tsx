import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { DesignReviewAssistPanel } from '../components/designReview/DesignReviewAssistPanel'
import {
  EvidenceInspectionMainView,
  IssueCreatedMainView,
  IssueDraftMainView,
} from '../components/designReview/ProjectSightDesignReviewViews'
import { CrossProductShell } from '../components/productShell/CrossProductShell'
import { useDesignReview } from '../context/DesignReviewContext'
import { useUploadDrawing } from '../context/UploadDrawingContext'
import {
  ProjectSightDrawings,
  ProjectSightOpening,
  ProjectSightProjects,
  ProjectSightShell,
  UploadDrawingModal,
  UploadSuccessToast,
  getProjectNameById,
} from '../components/projectSight'
import { designReviewProject } from '../types/designReview'

const designReviewPsStates = new Set(['evidenceInspection', 'issueDraft', 'issueCreated'])

function DesignReviewProjectSightRoute() {
  const { state } = useDesignReview()

  if (state.flowState === 'idle') {
    return <Navigate to="/work-center" replace />
  }

  const sketchUpStates = new Set([
    'sketchupSelect',
    'sketchupSelectionContext',
    'sketchupComparison',
    'sourcePermission',
    'investigating',
    'impactFindings',
  ])
  if (state.flowState === 'connectContext') {
    return <Navigate to="/trimble-connect" replace />
  }
  if (sketchUpStates.has(state.flowState)) {
    return <Navigate to="/sketchup" replace />
  }

  let main: React.ReactNode = null
  switch (state.flowState) {
    case 'evidenceInspection':
      main = <EvidenceInspectionMainView />
      break
    case 'issueDraft':
      main = <IssueDraftMainView />
      break
    case 'issueCreated':
      main = <IssueCreatedMainView />
      break
    default:
      main = null
  }

  return (
    <CrossProductShell
      breadcrumb={['ProjectSight', designReviewProject]}
      main={main}
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

export function ProjectSightPage() {
  const navigate = useNavigate()
  const { isActive: designReviewActive, state: designReviewState } = useDesignReview()
  const {
    flowState,
    task,
    setFlowState,
    confirmProjectAndContinue,
    setDrawingSet,
    setRevisionDate,
    completeUpload,
    resetFlow,
  } = useUploadDrawing()

  const [selectedProjectId, setSelectedProjectId] = useState('eilans')
  const [modalOpen, setModalOpen] = useState(false)

  const designReviewRoute = designReviewActive && designReviewPsStates.has(designReviewState.flowState)

  useEffect(() => {
    if (designReviewRoute) return
    if (flowState === 'idle') {
      navigate('/work-center', { replace: true })
    }
  }, [flowState, navigate, designReviewRoute])

  useEffect(() => {
    if (designReviewRoute) return
    if (flowState === 'requestSubmitted') {
      setFlowState('openingProjectSight')
    }
  }, [flowState, setFlowState, designReviewRoute])

  useEffect(() => {
    if (designReviewRoute) return
    if (flowState !== 'openingProjectSight') return
    const timer = window.setTimeout(() => setFlowState('confirmProject'), 2400)
    return () => window.clearTimeout(timer)
  }, [flowState, setFlowState, designReviewRoute])

  useEffect(() => {
    if (designReviewRoute) return
    if (flowState !== 'drawings') return
    const openTimer = window.setTimeout(() => {
      setFlowState('missingMetadata')
      setModalOpen(true)
    }, 2200)
    return () => window.clearTimeout(openTimer)
  }, [flowState, setFlowState, designReviewRoute])

  useEffect(() => {
    if (designReviewRoute) return
    if (flowState === 'missingMetadata' || flowState === 'metadataReady') {
      setModalOpen(true)
    }
    if (flowState === 'uploadSuccess') {
      setModalOpen(false)
    }
  }, [flowState, designReviewRoute])

  if (designReviewRoute) {
    return <DesignReviewProjectSightRoute />
  }

  function handleBackToWorkCenter() {
    resetFlow()
    navigate('/work-center')
  }

  function handleContinueProject() {
    const name = getProjectNameById(selectedProjectId)
    confirmProjectAndContinue(name)
  }

  const uploadEnabled =
    flowState === 'metadataReady' && Boolean(task.drawingSet && task.revisionDate)

  let breadcrumb = ['ProjectSight']
  let layout: 'rail' | 'drawings' = 'rail'
  let glowFrame = true
  let main: React.ReactNode = null

  switch (flowState) {
    case 'openingProjectSight':
    case 'requestSubmitted':
      breadcrumb = ['ProjectSight', 'Eilans Bungalow']
      main = <ProjectSightOpening />
      break
    case 'confirmProject':
      breadcrumb = ['ProjectSight', 'Eilans Bungalow', 'Projects']
      main = (
        <ProjectSightProjects
          selectedId={selectedProjectId}
          onSelect={setSelectedProjectId}
          onContinue={handleContinueProject}
        />
      )
      break
    case 'drawings':
    case 'missingMetadata':
    case 'metadataReady':
    case 'uploadSuccess':
      breadcrumb = ['ProjectSight', 'Eilans Bungalow', 'Drawings']
      layout = 'drawings'
      main = <ProjectSightDrawings onUploadClick={() => setModalOpen(true)} />
      break
    default:
      main = <ProjectSightOpening />
  }

  if (flowState === 'idle') {
    return null
  }

  return (
    <>
      <ProjectSightShell
        breadcrumb={breadcrumb}
        layout={layout}
        glowFrame={glowFrame}
        main={main}
        assistState={flowState}
        assistTask={task}
        onBackToWorkCenter={handleBackToWorkCenter}
      />
      <UploadDrawingModal
        open={
          modalOpen &&
          (flowState === 'missingMetadata' || flowState === 'metadataReady')
        }
        fileName={task.fileName}
        project={task.targetProject}
        group={task.group}
        drawingSet={task.drawingSet}
        revisionDate={task.revisionDate}
        uploadEnabled={uploadEnabled}
        onDrawingSetChange={setDrawingSet}
        onRevisionDateChange={setRevisionDate}
        onCancel={() => setModalOpen(false)}
        onUpload={completeUpload}
      />
      {flowState === 'uploadSuccess' ? (
        <UploadSuccessToast fileName={task.fileName} project={task.targetProject} />
      ) : null}
    </>
  )
}
