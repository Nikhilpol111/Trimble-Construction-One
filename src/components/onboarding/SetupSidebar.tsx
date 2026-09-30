import type { SetupStage } from '../../types/onboarding'
import { TrimbleWordmark } from './TrimbleLogo'
import { SetupStep } from './SetupStep'
import { useOnboarding } from '../../context/OnboardingContext'
import { Check } from 'lucide-react'

const steps: {
  stage: SetupStage
  number: number
  label: string
  sublabel: string
}[] = [
  { stage: 'profile', number: 1, label: 'Profile', sublabel: 'From Trimble ID' },
  { stage: 'products', number: 2, label: 'Products', sublabel: 'Grant access' },
  { stage: 'week', number: 3, label: 'Your week', sublabel: '4 questions' },
  { stage: 'trust', number: 4, label: 'Trust', sublabel: 'Set boundaries' },
  { stage: 'ready', number: 5, label: 'Ready', sublabel: 'Open dashboard' },
]

const stageOrder: SetupStage[] = ['profile', 'products', 'week', 'trust', 'ready']

function stageIndex(stage: SetupStage) {
  return stageOrder.indexOf(stage)
}

export type SetupSidebarProps = {
  currentStage: SetupStage
}

export function SetupSidebar({ currentStage }: SetupSidebarProps) {
  const { state } = useOnboarding()
  const currentIdx = stageIndex(currentStage)

  return (
    <aside
      className="setup-root flex h-full w-[var(--setup-sidebar-width)] shrink-0 flex-col border-r border-[var(--setup-border)] bg-[var(--setup-card)]"
      aria-label="Setup progress"
    >
      <div className="px-5 pb-4 pt-5">
        <TrimbleWordmark />
      </div>
      <p className="px-5 pb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--setup-muted-light)]">
        Set up
      </p>
      <nav className="flex-1 space-y-0.5 px-2">
        {steps.map((step) => {
          const idx = stageIndex(step.stage)
          const isActive = step.stage === currentStage
          const isComplete = idx < currentIdx

          return (
            <SetupStep
              key={step.stage}
              number={step.number}
              label={step.label}
              sublabel={step.sublabel}
              isActive={isActive}
              isComplete={isComplete}
            />
          )
        })}
      </nav>
      <div className="border-t border-[var(--setup-border)] px-4 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--setup-brand)] text-sm font-semibold text-white">
            S
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <span className="truncate text-sm font-semibold text-[var(--setup-text)]">
                {state.profile.name}
              </span>
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[var(--setup-success)] text-white">
                <Check className="h-2.5 w-2.5" strokeWidth={3} />
              </span>
            </div>
            <p className="truncate text-xs text-[var(--setup-muted)]">sandeep@trimblestructura…</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
