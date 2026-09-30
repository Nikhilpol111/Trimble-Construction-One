import type { ReactNode } from 'react'
import { SetupShell } from '../components/onboarding'
import type { SetupStage } from '../types/onboarding'

/** @deprecated Use SetupShell from components/onboarding directly */
export type SetupLayoutProps = {
  stage?: SetupStage
  children: ReactNode
}

export function SetupLayout({ stage = 'profile', children }: SetupLayoutProps) {
  return <SetupShell stage={stage}>{children}</SetupShell>
}
