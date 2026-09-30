import { useNavigate } from 'react-router-dom'
import {
  AutonomySelector,
  MemoryToggle,
  PermissionsGrid,
  SetupContent,
  SetupNav,
  SetupShell,
} from '../../components/onboarding'
import { useOnboarding } from '../../context/OnboardingContext'

export function SetupTrustPage() {
  const navigate = useNavigate()
  const { state, setAutonomyLevel, setMemoryEnabled } = useOnboarding()

  return (
    <SetupShell stage="trust">
      <SetupContent
        stepLabel="Step 4 of 5"
        title="How much should I run on my own?"
        description="Change any time. Override per task."
        footer={
          <SetupNav
            onBack={() => navigate('/setup/week/checkin')}
            primaryLabel="Continue"
            onPrimary={() => navigate('/setup/ready')}
          />
        }
      >
        <AutonomySelector value={state.autonomyLevel} onChange={setAutonomyLevel} />
        <PermissionsGrid />
        <MemoryToggle enabled={state.memoryEnabled} onChange={setMemoryEnabled} />
      </SetupContent>
    </SetupShell>
  )
}
