import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { WorkCenterFlowId, WorkCenterSessionState } from '../types/workCenter'
import { defaultWorkCenterSession } from '../types/workCenter'

type WorkCenterContextValue = {
  session: WorkCenterSessionState
  setCurrentPrompt: (prompt: string) => void
  submitPrompt: (prompt: string) => void
  setActiveFlow: (flow: WorkCenterFlowId) => void
  setActiveReminder: (reminder: string | null) => void
  onQuickAction: (actionId: string) => void
}

const WorkCenterContext = createContext<WorkCenterContextValue | null>(null)

export function WorkCenterProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<WorkCenterSessionState>(defaultWorkCenterSession)

  const setCurrentPrompt = useCallback((currentPrompt: string) => {
    setSession((s) => ({ ...s, currentPrompt }))
  }, [])

  const submitPrompt = useCallback((prompt: string) => {
    const trimmed = prompt.trim()
    if (!trimmed) return
    setSession((s) => ({ ...s, currentPrompt: trimmed }))
    if (import.meta.env.DEV) {
      console.info('[WorkCenter prompt]', trimmed)
    }
  }, [])

  const setActiveFlow = useCallback((activeFlow: WorkCenterFlowId) => {
    setSession((s) => ({ ...s, activeFlow }))
  }, [])

  const setActiveReminder = useCallback((activeReminder: string | null) => {
    setSession((s) => ({ ...s, activeReminder }))
  }, [])

  const onQuickAction = useCallback((actionId: string) => {
    if (import.meta.env.DEV) {
      console.info('[WorkCenter quick action]', actionId)
    }
  }, [])

  const value = useMemo(
    () => ({
      session,
      setCurrentPrompt,
      submitPrompt,
      setActiveFlow,
      setActiveReminder,
      onQuickAction,
    }),
    [session, setCurrentPrompt, submitPrompt, setActiveFlow, setActiveReminder, onQuickAction],
  )

  return <WorkCenterContext.Provider value={value}>{children}</WorkCenterContext.Provider>
}

export function useWorkCenter() {
  const ctx = useContext(WorkCenterContext)
  if (!ctx) throw new Error('useWorkCenter must be used within WorkCenterProvider')
  return ctx
}
