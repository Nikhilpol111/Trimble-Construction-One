import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReadyRecap, ReadySuccessIcon, SetupNav, SetupShell, recapIcons } from '../../components/onboarding'
import {
  briefingTimeOptions,
  checkInOptions,
  findWeekLabel,
  morningOptions,
  productsCatalog,
  timeSinkOptions,
} from '../../data/onboardingDefaults'
import { useOnboarding } from '../../context/OnboardingContext'

const autonomyLabels = {
  suggest: 'Suggest',
  copilot: 'Co-pilot',
  autopilot: 'Autopilot',
} as const

export function SetupReadyPage() {
  const navigate = useNavigate()
  const { state } = useOnboarding()

  const recapRows = useMemo(
    () => [
      {
        label: 'Profile',
        value: `${state.profile.role} · TID`,
        icon: recapIcons.profile,
      },
      {
        label: 'Products',
        value: `${state.grantedProducts.length} of ${productsCatalog.length} granted`,
        icon: recapIcons.products,
      },
      {
        label: 'Mornings',
        value: findWeekLabel(morningOptions, state.morningStyle),
        icon: recapIcons.mornings,
      },
      {
        label: 'Briefing time',
        value: findWeekLabel(briefingTimeOptions, state.briefingTime),
        icon: recapIcons.briefing,
      },
      {
        label: 'Focus area',
        value: findWeekLabel(timeSinkOptions, state.biggestTimeSink),
        icon: recapIcons.focus,
      },
      {
        label: 'Cadence',
        value: findWeekLabel(checkInOptions, state.checkInFrequency),
        icon: recapIcons.cadence,
      },
      {
        label: 'Autonomy',
        value: `${autonomyLabels[state.autonomyLevel]} · Memory ${state.memoryEnabled ? 'on' : 'off'}`,
        icon: recapIcons.autonomy,
      },
    ],
    [state],
  )

  return (
    <SetupShell stage="ready">
      <div className="flex min-h-full flex-col px-10 py-8 md:px-14 lg:px-16">
        <div className="mx-auto flex w-full max-w-[var(--setup-content-max)] flex-1 flex-col">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--setup-muted-light)]">
            Step 5 of 5
          </p>
          <ReadySuccessIcon />
          <h1 className="text-[26px] font-bold leading-tight tracking-tight text-[var(--setup-text)]">
            You&apos;re all set, {state.profile.name}.
          </h1>
          <p className="mt-2 text-[15px] text-[var(--setup-muted)]">
            Open your dashboard. I&apos;ll have a briefing ready next sign-in.
          </p>
          <div className="mt-8 flex-1">
            <ReadyRecap rows={recapRows} />
          </div>
          <div className="mt-10 shrink-0">
            <SetupNav
              onBack={() => navigate('/setup/trust')}
              primaryLabel="Let's get started →"
              onPrimary={() => navigate('/work-center')}
            />
          </div>
        </div>
      </div>
    </SetupShell>
  )
}
