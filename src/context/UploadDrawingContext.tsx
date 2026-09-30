import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useNavigate } from 'react-router-dom'
import {
  defaultUploadTask,
  type UploadFlowState,
  type UploadTask,
} from '../types/uploadDrawing'

type UploadDrawingContextValue = {
  flowState: UploadFlowState
  task: UploadTask
  workCenterAttachment: boolean
  attachFileForUpload: () => void
  clearWorkCenterAttachment: () => void
  beginUploadFromWorkCenter: (prompt: string) => void
  setFlowState: (state: UploadFlowState) => void
  confirmProjectAndContinue: (projectName: string) => void
  setDrawingSet: (value: string) => void
  setRevisionDate: (value: string) => void
  completeUpload: () => void
  resetFlow: () => void
}

const UploadDrawingContext = createContext<UploadDrawingContextValue | null>(null)

const UPLOAD_INTENT =
  'Add this drawing to Eilans Bungalow project in ProjectSight.'

export function UploadDrawingProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [flowState, setFlowState] = useState<UploadFlowState>('idle')
  const [task, setTask] = useState<UploadTask>(defaultUploadTask)
  const [workCenterAttachment, setWorkCenterAttachment] = useState(false)

  const attachFileForUpload = useCallback(() => {
    setWorkCenterAttachment(true)
    setTask((t) => ({ ...t, fileName: defaultUploadTask.fileName }))
  }, [])

  const clearWorkCenterAttachment = useCallback(() => {
    setWorkCenterAttachment(false)
  }, [])

  const beginUploadFromWorkCenter = useCallback(
    (prompt: string) => {
      const trimmed = prompt.trim()
      if (!workCenterAttachment) return
      if (!trimmed) return
      setTask((t) => ({
        ...t,
        fileName: defaultUploadTask.fileName,
        targetProject: defaultUploadTask.targetProject,
        drawingSet: '',
        revisionDate: '',
        uploadComplete: false,
      }))
      setWorkCenterAttachment(false)
      setFlowState('requestSubmitted')
      navigate('/project-sight')
    },
    [navigate, workCenterAttachment],
  )

  const confirmProjectAndContinue = useCallback((projectName: string) => {
    setTask((t) => ({ ...t, targetProject: projectName }))
    setFlowState('drawings')
  }, [])

  const syncMetadataFlowState = useCallback((next: UploadTask) => {
    setFlowState((s) => {
      if (s !== 'missingMetadata' && s !== 'metadataReady') return s
      return next.drawingSet && next.revisionDate ? 'metadataReady' : 'missingMetadata'
    })
  }, [])

  const setDrawingSet = useCallback(
    (drawingSet: string) => {
      setTask((t) => {
        const next = { ...t, drawingSet }
        syncMetadataFlowState(next)
        return next
      })
    },
    [syncMetadataFlowState],
  )

  const setRevisionDate = useCallback(
    (revisionDate: string) => {
      setTask((t) => {
        const next = { ...t, revisionDate }
        syncMetadataFlowState(next)
        return next
      })
    },
    [syncMetadataFlowState],
  )

  const completeUpload = useCallback(() => {
    setTask((t) => ({ ...t, uploadComplete: true }))
    setFlowState('uploadSuccess')
  }, [])

  const resetFlow = useCallback(() => {
    setFlowState('idle')
    setTask(defaultUploadTask)
    setWorkCenterAttachment(false)
  }, [])

  const value = useMemo(
    () => ({
      flowState,
      task,
      workCenterAttachment,
      attachFileForUpload,
      clearWorkCenterAttachment,
      beginUploadFromWorkCenter,
      setFlowState,
      confirmProjectAndContinue,
      setDrawingSet,
      setRevisionDate,
      completeUpload,
      resetFlow,
    }),
    [
      flowState,
      task,
      workCenterAttachment,
      attachFileForUpload,
      clearWorkCenterAttachment,
      beginUploadFromWorkCenter,
      confirmProjectAndContinue,
      setDrawingSet,
      setRevisionDate,
      completeUpload,
      resetFlow,
    ],
  )

  return (
    <UploadDrawingContext.Provider value={value}>{children}</UploadDrawingContext.Provider>
  )
}

export function useUploadDrawing() {
  const ctx = useContext(UploadDrawingContext)
  if (!ctx) throw new Error('useUploadDrawing must be used within UploadDrawingProvider')
  return ctx
}

export const uploadDrawingIntentText = UPLOAD_INTENT
