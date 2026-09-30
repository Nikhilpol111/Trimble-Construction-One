import type { UploadFlowState, UploadProgressStep } from '../../types/uploadDrawing'

function step(
  id: UploadProgressStep['id'],
  label: string,
  status: UploadProgressStep['status'],
): UploadProgressStep {
  return { id, label, status }
}

/** Maps workflow state to Assist progress list (matches reference PNG sequence). */
export function getUploadProgressSteps(flowState: UploadFlowState): UploadProgressStep[] {
  const labels = {
    openProjectSight: 'Open ProjectSight',
    openProject: 'Open Eilans Bungalow',
    navigateDrawings: 'Navigate to Drawings',
    prepareFile: 'Prepare EilansBungalow.pdf',
    waitingDetails: 'Waiting for required details',
    uploadDrawing: 'Upload drawing',
  }

  switch (flowState) {
    case 'idle':
    case 'requestSubmitted':
      return [
        step('openProjectSight', labels.openProjectSight, 'active'),
        step('openProject', labels.openProject, 'pending'),
        step('navigateDrawings', labels.navigateDrawings, 'pending'),
        step('prepareFile', labels.prepareFile, 'pending'),
        step('waitingDetails', labels.waitingDetails, 'pending'),
        step('uploadDrawing', labels.uploadDrawing, 'pending'),
      ]
    case 'openingProjectSight':
      return [
        step('openProjectSight', labels.openProjectSight, 'active'),
        step('openProject', labels.openProject, 'pending'),
        step('navigateDrawings', labels.navigateDrawings, 'pending'),
        step('prepareFile', labels.prepareFile, 'pending'),
        step('waitingDetails', labels.waitingDetails, 'pending'),
        step('uploadDrawing', labels.uploadDrawing, 'pending'),
      ]
    case 'confirmProject':
      return [
        step('openProjectSight', labels.openProjectSight, 'complete'),
        step('openProject', labels.openProject, 'active'),
        step('navigateDrawings', labels.navigateDrawings, 'pending'),
        step('prepareFile', labels.prepareFile, 'pending'),
        step('waitingDetails', labels.waitingDetails, 'pending'),
        step('uploadDrawing', labels.uploadDrawing, 'pending'),
      ]
    case 'drawings':
      return [
        step('openProjectSight', labels.openProjectSight, 'complete'),
        step('openProject', labels.openProject, 'complete'),
        step('navigateDrawings', labels.navigateDrawings, 'complete'),
        step('prepareFile', labels.prepareFile, 'active'),
        step('waitingDetails', labels.waitingDetails, 'pending'),
        step('uploadDrawing', labels.uploadDrawing, 'pending'),
      ]
    case 'missingMetadata':
      return [
        step('openProjectSight', labels.openProjectSight, 'complete'),
        step('openProject', labels.openProject, 'complete'),
        step('navigateDrawings', labels.navigateDrawings, 'complete'),
        step('prepareFile', labels.prepareFile, 'complete'),
        step('waitingDetails', labels.waitingDetails, 'active'),
        step('uploadDrawing', labels.uploadDrawing, 'pending'),
      ]
    case 'metadataReady':
      return [
        step('openProjectSight', labels.openProjectSight, 'complete'),
        step('openProject', labels.openProject, 'complete'),
        step('navigateDrawings', labels.navigateDrawings, 'complete'),
        step('prepareFile', labels.prepareFile, 'complete'),
        step('waitingDetails', labels.waitingDetails, 'active'),
        step('uploadDrawing', labels.uploadDrawing, 'pending'),
      ]
    case 'uploadSuccess':
      return [
        step('openProjectSight', labels.openProjectSight, 'complete'),
        step('openProject', labels.openProject, 'complete'),
        step('navigateDrawings', labels.navigateDrawings, 'complete'),
        step('prepareFile', labels.prepareFile, 'complete'),
        step('waitingDetails', labels.waitingDetails, 'complete'),
        step('uploadDrawing', labels.uploadDrawing, 'complete'),
      ]
    default:
      return []
  }
}
