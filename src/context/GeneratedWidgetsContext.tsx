import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  GENERATED_WIDGETS_STORAGE_KEY,
  matchesGeneratedWidgetsIntent,
} from '../flows/generatedWidgets'
import {
  defaultDashboardLayout,
  defaultWidgetConfig,
  type DashboardWidgetId,
  type GeneratedWidgetFlowState,
  type GeneratedWidgetOptionId,
  type GeneratedWidgetsPersistedState,
  type WidgetConfig,
} from '../types/generatedWidgets'
import { useWorkCenter } from './WorkCenterContext'

type GeneratedWidgetsContextValue = {
  flowState: GeneratedWidgetFlowState
  request: string
  selectedOptionId: GeneratedWidgetOptionId | null
  widgetConfig: WidgetConfig
  dashboardLayout: DashboardWidgetId[]
  showAddedToast: boolean
  libraryTab: 'generated' | 'trimble'
  recentActivityIsNew: boolean
  draftLayout: DashboardWidgetId[] | null
  beginFromWorkCenter: (prompt: string) => boolean
  cancelFlow: () => void
  selectOption: (id: GeneratedWidgetOptionId) => void
  openPreview: (id?: GeneratedWidgetOptionId) => void
  backToOptions: () => void
  regenerateOptions: () => void
  updateWidgetConfig: (patch: Partial<WidgetConfig>) => void
  addToDashboard: () => void
  dismissAddedToast: () => void
  openCustomiseDashboard: () => void
  cancelCustomise: () => void
  saveDashboard: () => void
  removeWidgetFromDraft: (id: DashboardWidgetId) => void
  addWidgetToDraft: (id: DashboardWidgetId) => void
  moveDraftWidget: (fromIndex: number, toIndex: number) => void
  setLibraryTab: (tab: 'generated' | 'trimble') => void
}

const GeneratedWidgetsContext = createContext<GeneratedWidgetsContextValue | null>(null)

function loadPersisted(): GeneratedWidgetsPersistedState | null {
  try {
    const raw = localStorage.getItem(GENERATED_WIDGETS_STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as GeneratedWidgetsPersistedState
  } catch {
    return null
  }
}

function persist(state: GeneratedWidgetsPersistedState) {
  localStorage.setItem(GENERATED_WIDGETS_STORAGE_KEY, JSON.stringify(state))
}

const RECENT_ACTIVITY_INSERT_INDEX = 3

export function GeneratedWidgetsProvider({ children }: { children: ReactNode }) {
  const { setActiveFlow, setCurrentPrompt } = useWorkCenter()
  const persisted = loadPersisted()

  const [flowState, setFlowState] = useState<GeneratedWidgetFlowState>('idle')
  const [request, setRequest] = useState('')
  const [selectedOptionId, setSelectedOptionId] = useState<GeneratedWidgetOptionId | null>(
    persisted?.selectedGeneratedWidget ?? 'recent-activity',
  )
  const [widgetConfig, setWidgetConfig] = useState<WidgetConfig>(
    persisted?.widgetConfig ?? defaultWidgetConfig,
  )
  const [dashboardLayout, setDashboardLayout] = useState<DashboardWidgetId[]>(
    persisted?.dashboardLayout ?? [...defaultDashboardLayout],
  )
  const [showAddedToast, setShowAddedToast] = useState(false)
  const [libraryTab, setLibraryTab] = useState<'generated' | 'trimble'>('trimble')
  const [recentActivityIsNew, setRecentActivityIsNew] = useState(
    persisted?.recentActivityAdded ?? false,
  )
  const [draftLayout, setDraftLayout] = useState<DashboardWidgetId[] | null>(null)
  const [, setRegenerateTick] = useState(0)

  useEffect(() => {
    persist({
      dashboardLayout,
      widgetConfig,
      selectedGeneratedWidget: selectedOptionId,
      recentActivityAdded: dashboardLayout.includes('recent-activity'),
    })
  }, [dashboardLayout, widgetConfig, selectedOptionId])

  const beginFromWorkCenter = useCallback(
    (prompt: string) => {
      if (!matchesGeneratedWidgetsIntent(prompt)) return false
      const trimmed = prompt.trim()
      setRequest(trimmed)
      setCurrentPrompt(trimmed)
      setActiveFlow('generatedWidgets')
      setSelectedOptionId('recent-activity')
      setFlowState('generatedOptions')
      return true
    },
    [setActiveFlow, setCurrentPrompt],
  )

  const cancelFlow = useCallback(() => {
    setFlowState('idle')
    setActiveFlow(null)
  }, [setActiveFlow])

  const selectOption = useCallback((id: GeneratedWidgetOptionId) => {
    setSelectedOptionId(id)
  }, [])

  const openPreview = useCallback(
    (id?: GeneratedWidgetOptionId) => {
      const next = id ?? selectedOptionId
      if (!next) return
      setSelectedOptionId(next)
      if (next === 'recent-activity') {
        setWidgetConfig((c) => ({
          ...c,
          title: c.title || defaultWidgetConfig.title,
        }))
      }
      setFlowState('widgetPreview')
    },
    [selectedOptionId],
  )

  const backToOptions = useCallback(() => {
    setFlowState('generatedOptions')
  }, [])

  const regenerateOptions = useCallback(() => {
    setRegenerateTick((t) => t + 1)
    setSelectedOptionId('recent-activity')
  }, [])

  const updateWidgetConfig = useCallback((patch: Partial<WidgetConfig>) => {
    setWidgetConfig((c) => ({ ...c, ...patch }))
  }, [])

  const addToDashboard = useCallback(() => {
    if (!dashboardLayout.includes('recent-activity')) {
      setDashboardLayout((layout) => {
        const next = [...layout]
        next.splice(RECENT_ACTIVITY_INSERT_INDEX, 0, 'recent-activity')
        return next
      })
      setRecentActivityIsNew(true)
    }
    setFlowState('idle')
    setActiveFlow(null)
    setShowAddedToast(true)
  }, [dashboardLayout, setActiveFlow])

  const dismissAddedToast = useCallback(() => {
    setShowAddedToast(false)
  }, [])

  const openCustomiseDashboard = useCallback(() => {
    setShowAddedToast(false)
    setDraftLayout([...dashboardLayout])
    setFlowState('dashboardCustomise')
    setActiveFlow('customiseWidgets')
  }, [dashboardLayout, setActiveFlow])

  const cancelCustomise = useCallback(() => {
    setDraftLayout(null)
    setFlowState('idle')
    setActiveFlow(null)
  }, [setActiveFlow])

  const saveDashboard = useCallback(() => {
    if (draftLayout) {
      setDashboardLayout(draftLayout)
      setRecentActivityIsNew(false)
    }
    setDraftLayout(null)
    setFlowState('idle')
    setActiveFlow(null)
  }, [draftLayout, setActiveFlow])

  const removeWidgetFromDraft = useCallback((id: DashboardWidgetId) => {
    setDraftLayout((layout) => (layout ? layout.filter((w) => w !== id) : layout))
  }, [])

  const addWidgetToDraft = useCallback((id: DashboardWidgetId) => {
    setDraftLayout((layout) => {
      if (!layout || layout.includes(id)) return layout
      return [...layout, id]
    })
  }, [])

  const moveDraftWidget = useCallback((fromIndex: number, toIndex: number) => {
    setDraftLayout((layout) => {
      if (!layout) return layout
      const next = [...layout]
      const [item] = next.splice(fromIndex, 1)
      next.splice(toIndex, 0, item)
      return next
    })
  }, [])

  const value = useMemo(
    () => ({
      flowState,
      request,
      selectedOptionId,
      widgetConfig,
      dashboardLayout,
      showAddedToast,
      libraryTab,
      recentActivityIsNew,
      draftLayout,
      beginFromWorkCenter,
      cancelFlow,
      selectOption,
      openPreview,
      backToOptions,
      regenerateOptions,
      updateWidgetConfig,
      addToDashboard,
      dismissAddedToast,
      openCustomiseDashboard,
      cancelCustomise,
      saveDashboard,
      removeWidgetFromDraft,
      addWidgetToDraft,
      moveDraftWidget,
      setLibraryTab,
    }),
    [
      flowState,
      request,
      selectedOptionId,
      widgetConfig,
      dashboardLayout,
      showAddedToast,
      libraryTab,
      recentActivityIsNew,
      draftLayout,
      beginFromWorkCenter,
      cancelFlow,
      selectOption,
      openPreview,
      backToOptions,
      regenerateOptions,
      updateWidgetConfig,
      addToDashboard,
      dismissAddedToast,
      openCustomiseDashboard,
      cancelCustomise,
      saveDashboard,
      removeWidgetFromDraft,
      addWidgetToDraft,
      moveDraftWidget,
    ],
  )

  return (
    <GeneratedWidgetsContext.Provider value={value}>{children}</GeneratedWidgetsContext.Provider>
  )
}

export function useGeneratedWidgets() {
  const ctx = useContext(GeneratedWidgetsContext)
  if (!ctx) {
    throw new Error('useGeneratedWidgets must be used within GeneratedWidgetsProvider')
  }
  return ctx
}
