import { useNavigate } from 'react-router-dom'
import { SetupContent, SetupNav, SetupShell, WeekQuestionBlock } from '../../components/onboarding'
import { timeSinkOptions } from '../../data/onboardingDefaults'
import { useOnboarding } from '../../context/OnboardingContext'

export function SetupWeekTimesinkPage() {
  const navigate = useNavigate()
  const { state, setBiggestTimeSink } = useOnboarding()

  return (
    <SetupShell stage="week">
      <SetupContent
        stepLabel="Step 3 of 5"
        title="Your week"
        description="Four questions to tailor briefings and pings."
        footer={
          <SetupNav
            onBack={() => navigate('/setup/week/time')}
            primaryLabel="Next question"
            onPrimary={() => navigate('/setup/week/checkin')}
            primaryDisabled={!state.biggestTimeSink}
          />
        }
      >
        <WeekQuestionBlock
          question="Your biggest time-sink?"
          hint="I'll work hardest on this."
          questionIndex={3}
          totalQuestions={4}
          options={timeSinkOptions}
          selectedId={state.biggestTimeSink}
          onSelect={setBiggestTimeSink}
        />
      </SetupContent>
    </SetupShell>
  )
}
