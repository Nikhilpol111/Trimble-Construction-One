import { useNavigate } from 'react-router-dom'
import { SetupContent, SetupNav, SetupShell, WeekQuestionBlock } from '../../components/onboarding'
import { briefingTimeOptions } from '../../data/onboardingDefaults'
import { useOnboarding } from '../../context/OnboardingContext'

export function SetupWeekTimePage() {
  const navigate = useNavigate()
  const { state, setBriefingTime } = useOnboarding()

  return (
    <SetupShell stage="week">
      <SetupContent
        stepLabel="Step 3 of 5"
        title="Your week"
        description="Four questions to tailor briefings and pings."
        footer={
          <SetupNav
            onBack={() => navigate('/setup/week/morning')}
            primaryLabel="Next question"
            onPrimary={() => navigate('/setup/week/timesink')}
            primaryDisabled={!state.briefingTime}
          />
        }
      >
        <WeekQuestionBlock
          question="When should I brief you?"
          hint="Ready when you sit down."
          questionIndex={2}
          totalQuestions={4}
          options={briefingTimeOptions}
          selectedId={state.briefingTime}
          onSelect={setBriefingTime}
        />
      </SetupContent>
    </SetupShell>
  )
}
