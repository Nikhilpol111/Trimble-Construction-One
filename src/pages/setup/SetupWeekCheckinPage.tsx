import { useNavigate } from 'react-router-dom'
import { SetupContent, SetupNav, SetupShell, WeekQuestionBlock } from '../../components/onboarding'
import { checkInOptions } from '../../data/onboardingDefaults'
import { useOnboarding } from '../../context/OnboardingContext'

export function SetupWeekCheckinPage() {
  const navigate = useNavigate()
  const { state, setCheckInFrequency } = useOnboarding()

  return (
    <SetupShell stage="week">
      <SetupContent
        stepLabel="Step 3 of 5"
        title="Your week"
        description="Four questions to tailor briefings and pings."
        footer={
          <SetupNav
            onBack={() => navigate('/setup/week/timesink')}
            primaryLabel="Continue"
            onPrimary={() => navigate('/setup/trust')}
            primaryDisabled={!state.checkInFrequency}
          />
        }
      >
        <WeekQuestionBlock
          question="How often should I check in?"
          hint="My own initiative — not your asks."
          questionIndex={4}
          totalQuestions={4}
          options={checkInOptions}
          selectedId={state.checkInFrequency}
          onSelect={setCheckInFrequency}
        />
      </SetupContent>
    </SetupShell>
  )
}
