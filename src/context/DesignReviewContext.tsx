import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { flushSync } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { defaultSelectedSources } from '../flows/designReview/constants'
import {
  defaultDesignReviewState,
  defaultDraftIssue,
  designReviewTaskTitle,
  matchesDesignReviewIntent,
  type ComparisonMode,
  type DesignReviewFlowState,
  type DesignReviewProduct,
  type DesignReviewSourceId,
  type DesignReviewState,
  type DraftIssue,
} from '../types/designReview'
import { useWorkCenter } from './WorkCenterContext'

type DesignReviewContextValue = {
  selectEvidence: (source:'rfi'|'drawing')=>void
  openIssue: ()=>void
  state: DesignReviewState
  isActive: boolean
  taskTitle: typeof designReviewTaskTitle
  beginFromWorkCenter: (prompt: string) => boolean
  openInSketchUp: () => void
  selectWall: () => void
  backToSelectionContext: () => void
  setSuggestedAction: (action: 'compare' | 'comments' | 'impact' | 'explain') => void
  setComparisonMode: (mode: ComparisonMode) => void
  openSourcePermission: () => void
  toggleSource: (id: DesignReviewSourceId) => void
  cancelSourcePermission: () => void
  startInvestigation: () => void
  completeInvestigation: () => void
  setFindingsAction: (action: 'inspect' | 'continue' | 'reviewActions') => void
  returnToImpactSummary: () => void
  updateDraftIssue: (patch: Partial<DraftIssue>) => void
  createIssue: () => void
  enableMonitoring: () => void
  backToWorkCenter: () => void
  backToSketchUpFromProjectSight: () => void
}

const DesignReviewContext = createContext<DesignReviewContextValue | null>(null)

function productForState(flowState: DesignReviewFlowState): DesignReviewProduct {
  switch (flowState) {
    case 'idle':
      return 'Work Center'
    case 'connectContext':
      return 'Trimble Connect'
    case 'sketchupSelect':
    case 'sketchupSelectionContext':
    case 'sketchupComparison':
    case 'sourcePermission':
    case 'investigating':
    case 'impactFindings':
      return 'SketchUp'
    case 'evidenceInspection':
    case 'issueDraft':
    case 'issueCreated':
      return 'ProjectSight'
    default:
      return 'Work Center'
  }
}

export function DesignReviewProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const { setActiveFlow, setActiveReminder, setCurrentPrompt } = useWorkCenter()
  const [state, setState] = useState<DesignReviewState>(defaultDesignReviewState)

  const patch = useCallback((partial: Partial<DesignReviewState>) => {
    setState((s) => {
      const next = { ...s, ...partial }
      if (partial.flowState) {
        next.currentProduct = productForState(partial.flowState)
      }
      return next
    })
  }, [])

  const patchAndNavigate = useCallback(
    (partial: Partial<DesignReviewState>, path: string) => {
      flushSync(() => {
        setState((s) => {
          const next = { ...s, ...partial }
          if (partial.flowState) {
            next.currentProduct = productForState(partial.flowState)
          }
          return next
        })
      })
      navigate(path)
    },
    [navigate],
  )

  const beginFromWorkCenter = useCallback(
    (prompt: string) => {
      if (!matchesDesignReviewIntent(prompt)) return false
      setActiveFlow('designReview')
      setCurrentPrompt(prompt.trim())
      flushSync(() => {
        setState({
          ...defaultDesignReviewState,
          flowState: 'connectContext',
          currentProduct: 'Trimble Connect',
          selectedSources: [...defaultSelectedSources],
        })
      })
      navigate('/trimble-connect')
      return true
    },
    [navigate, setActiveFlow, setCurrentPrompt],
  )

  const openInSketchUp = useCallback(() => {
    patchAndNavigate(
      { flowState: 'sketchupSelect', selectedElement: null, comparisonMode: 'current' },
      '/sketchup',
    )
  }, [patchAndNavigate])

  const selectWall = useCallback(() => {
    patch({
      flowState: 'sketchupSelectionContext',
      selectedElement: 'Mechanical Room East Wall',
    })
  }, [patch])

  const backToSelectionContext = useCallback(() => {
    patch({ flowState: 'sketchupSelectionContext' })
  }, [patch])

  const setSuggestedAction = useCallback(
    (action: 'compare' | 'comments' | 'impact' | 'explain') => {
      if (action === 'comments') {
        patchAndNavigate({flowState:'connectContext'},'/trimble-connect')
      } else if (action === 'explain') {
        patch({flowState:'sketchupComparison',comparisonMode:'overlay'})
      } else if (action === 'impact') {
        patch({flowState:'sourcePermission'})
      } else if (action === 'compare') {
        patch({ flowState: 'sketchupComparison', comparisonMode: 'previous' })
      }
    },
    [patch,patchAndNavigate],
  )

  const setComparisonMode = useCallback(
    (mode: ComparisonMode) => {
      patch({ comparisonMode: mode })
    },
    [patch],
  )

  const openSourcePermission = useCallback(() => {
    patch({ flowState: 'sourcePermission' })
  }, [patch])

  const toggleSource = useCallback((id: DesignReviewSourceId) => {
    setState((s) => {
      const selected = s.selectedSources.includes(id)
        ? s.selectedSources.filter((x) => x !== id)
        : [...s.selectedSources, id]
      return { ...s, selectedSources: selected }
    })
  }, [])

  const cancelSourcePermission = useCallback(() => {
    patch({ flowState: 'sketchupComparison' })
  }, [patch])

  const startInvestigation = useCallback(() => {
    patch({ flowState: 'investigating', investigationComplete: false })
  }, [patch])

  const completeInvestigation = useCallback(() => {
    patch({ flowState: 'impactFindings', investigationComplete: true })
  }, [patch])

  const setFindingsAction = useCallback(
    (action: 'inspect' | 'continue' | 'reviewActions') => {
      if (action === 'inspect') {
        patchAndNavigate({ flowState: 'evidenceInspection' }, '/project-sight')
      } else if (action === 'continue') {
        patch({flowState:'sourcePermission'})
      } else if (action === 'reviewActions') {
        patchAndNavigate(
          { flowState: 'issueDraft', includedEvidence:[...(state.selectedSources.includes('sketchup')?[0]:[]),...(state.selectedSources.includes('trimbleConnect')?[1]:[]),...(state.selectedSources.includes('projectSight')?[2,3]:[])], draftIssue: { ...defaultDraftIssue, description: [state.selectedSources.includes('sketchup')?'The Mechanical Room East Wall shifted approximately 450 mm east in NorthRidge_Design_v18. This may reduce the adjacent MEP service clearance.':'',state.selectedSources.includes('trimbleConnect')?'Alex Morgan previously flagged the mechanical room service clearance.':'',state.selectedSources.includes('projectSight')?'Drawing A-204 still reflects the previous wall position, and RFI-087 concerns the minimum clearance in this area.':'','Recommend coordination review before construction.'].filter(Boolean).join(' ') } },
          '/project-sight',
        )
      }
    },
    [patchAndNavigate, patch, state.selectedSources],
  )

  const returnToImpactSummary = useCallback(() => {
    patchAndNavigate({ flowState: 'impactFindings' }, '/sketchup')
  }, [patchAndNavigate])

  const selectEvidence=useCallback((source:'rfi'|'drawing')=>patch({evidenceSource:source}),[patch])
  const openIssue=useCallback(()=>patch({issueDetailsOpen:true}),[patch])
  const updateDraftIssue = useCallback((patchIssue: Partial<DraftIssue>) => {
    setState((s) => ({ ...s, includedEvidence:patchIssue.includedEvidence??s.includedEvidence, draftIssue: { ...s.draftIssue, ...patchIssue } }))
  }, [])

  const createIssue = useCallback(() => {
    patch({ flowState: 'issueCreated', issueCreated: true })
  }, [patch])

  const enableMonitoring = useCallback(() => {
    setActiveReminder(`Issue #${state.issueNumber}`)
    patch({monitoringEnabled:true,flowState:'idle'})
    setActiveFlow(null)
    navigate('/work-center')
  }, [navigate, setActiveFlow, setActiveReminder, state.issueNumber, patch])

  const backToWorkCenter = useCallback(() => {
    setState(defaultDesignReviewState)
    setActiveFlow(null)
    navigate('/work-center')
  }, [navigate, setActiveFlow])

  const backToSketchUpFromProjectSight = useCallback(() => {
    patchAndNavigate({ flowState: 'impactFindings' }, '/sketchup')
  }, [patchAndNavigate])

  const value = useMemo(
    () => ({
      state,
      selectEvidence, openIssue,
      isActive: state.flowState !== 'idle',
      taskTitle: designReviewTaskTitle,
      beginFromWorkCenter,
      openInSketchUp,
      selectWall,
      backToSelectionContext,
      setSuggestedAction,
      setComparisonMode,
      openSourcePermission,
      toggleSource,
      cancelSourcePermission,
      startInvestigation,
      completeInvestigation,
      setFindingsAction,
      returnToImpactSummary,
      updateDraftIssue,
      createIssue,
      enableMonitoring,
      backToWorkCenter,
      backToSketchUpFromProjectSight,
    }),
    [
      state, selectEvidence, openIssue,
      beginFromWorkCenter,
      openInSketchUp,
      selectWall,
      backToSelectionContext,
      setSuggestedAction,
      setComparisonMode,
      openSourcePermission,
      toggleSource,
      cancelSourcePermission,
      startInvestigation,
      completeInvestigation,
      setFindingsAction,
      returnToImpactSummary,
      updateDraftIssue,
      createIssue,
      enableMonitoring,
      backToWorkCenter,
      backToSketchUpFromProjectSight,
    ],
  )

  return <DesignReviewContext.Provider value={value}>{children}</DesignReviewContext.Provider>
}

export function useDesignReview() {
  const ctx = useContext(DesignReviewContext)
  if (!ctx) throw new Error('useDesignReview must be used within DesignReviewProvider')
  return ctx
}

export function useDesignReviewOptional() {
  return useContext(DesignReviewContext)
}
