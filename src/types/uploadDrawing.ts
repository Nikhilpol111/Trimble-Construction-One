export type UploadFlowState =
  | 'idle'
  | 'requestSubmitted'
  | 'openingProjectSight'
  | 'confirmProject'
  | 'drawings'
  | 'missingMetadata'
  | 'metadataReady'
  | 'uploadSuccess'

export type UploadTask = {
  fileName: string
  targetProject: string
  targetProduct: string
  group: string
  drawingSet: string
  revisionDate: string
  uploadComplete: boolean
}

export const defaultUploadTask: UploadTask = {
  fileName: 'EilansBungalow.pdf',
  targetProject: 'Eilans Bungalow',
  targetProduct: 'ProjectSight',
  group: 'Drawing',
  drawingSet: '',
  revisionDate: '',
  uploadComplete: false,
}

export type UploadProgressStepId =
  | 'openProjectSight'
  | 'openProject'
  | 'navigateDrawings'
  | 'prepareFile'
  | 'waitingDetails'
  | 'uploadDrawing'

export type UploadProgressStepStatus = 'complete' | 'active' | 'pending'

export type UploadProgressStep = {
  id: UploadProgressStepId
  label: string
  status: UploadProgressStepStatus
}
