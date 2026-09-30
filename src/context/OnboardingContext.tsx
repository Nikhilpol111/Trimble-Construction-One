import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  defaultOnboardingState,
  ONBOARDING_STORAGE_KEY,
} from '../data/onboardingDefaults'
import type { AutonomyLevel, OnboardingState } from '../types/onboarding'

type OnboardingContextValue = {
  state: OnboardingState
  setSignInEmail: (email: string) => void
  setRememberMe: (value: boolean) => void
  setGrantedProducts: (ids: string[]) => void
  toggleProductGrant: (id: string) => void
  grantAllProducts: (allIds: string[]) => void
  setMorningStyle: (id: string) => void
  setBriefingTime: (id: string) => void
  setBiggestTimeSink: (id: string) => void
  setCheckInFrequency: (id: string) => void
  setAutonomyLevel: (level: AutonomyLevel) => void
  setMemoryEnabled: (enabled: boolean) => void
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null)

function loadState(): OnboardingState {
  try {
    const raw = localStorage.getItem(ONBOARDING_STORAGE_KEY)
    if (!raw) return defaultOnboardingState
    const parsed = JSON.parse(raw) as Partial<OnboardingState>
    return { ...defaultOnboardingState, ...parsed, profile: { ...defaultOnboardingState.profile, ...parsed.profile } }
  } catch {
    return defaultOnboardingState
  }
}

function persistState(state: OnboardingState) {
  localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(state))
}

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OnboardingState>(() => loadState())

  const update = useCallback((patch: Partial<OnboardingState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch }
      persistState(next)
      return next
    })
  }, [])

  const value = useMemo<OnboardingContextValue>(
    () => ({
      state,
      setSignInEmail: (signInEmail) => update({ signInEmail }),
      setRememberMe: (rememberMe) => update({ rememberMe }),
      setGrantedProducts: (grantedProducts) => update({ grantedProducts }),
      toggleProductGrant: (id) =>
        setState((prev) => {
          const granted = prev.grantedProducts.includes(id)
            ? prev.grantedProducts.filter((p) => p !== id)
            : [...prev.grantedProducts, id]
          const next = { ...prev, grantedProducts: granted }
          persistState(next)
          return next
        }),
      grantAllProducts: (allIds) => update({ grantedProducts: [...allIds] }),
      setMorningStyle: (morningStyle) => update({ morningStyle }),
      setBriefingTime: (briefingTime) => update({ briefingTime }),
      setBiggestTimeSink: (biggestTimeSink) => update({ biggestTimeSink }),
      setCheckInFrequency: (checkInFrequency) => update({ checkInFrequency }),
      setAutonomyLevel: (autonomyLevel) => update({ autonomyLevel }),
      setMemoryEnabled: (memoryEnabled) => update({ memoryEnabled }),
    }),
    [state, update],
  )

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext)
  if (!ctx) throw new Error('useOnboarding must be used within OnboardingProvider')
  return ctx
}
