import { useNavigate } from 'react-router-dom'
import { SetupContent, SetupNav, SetupShell, WeekQuestionBlock } from '../../components/onboarding'
import { morningOptions } from '../../data/onboardingDefaults'
import { useOnboarding } from '../../context/OnboardingContext'

export function SetupWeekMorningPage() {
  const navigate = useNavigate()
  const { state, setMorningStyle } = useOnboarding()

  return (
    <SetupShell stage="week">
      <SetupContent
        stepLabel="Step 3 of 5"
        title="Your week"
        description="Four questions to tailor briefings and pings."
        footer={
          <SetupNav
            onBack={() => navigate('/setup/products')}
            primaryLabel="Next question"
            onPrimary={() => navigate('/setup/week/time')}
            primaryDisabled={!state.morningStyle}
          />
        }
      >
        <WeekQuestionBlock
          question="How do your mornings start?"
          hint="Shapes what I show first."
          questionIndex={1}
          totalQuestions={4}
          options={morningOptions}
          selectedId={state.morningStyle}
          onSelect={setMorningStyle}
        />
      </SetupContent>
    </SetupShell>
  )
}
