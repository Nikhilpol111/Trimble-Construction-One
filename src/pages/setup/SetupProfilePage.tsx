import { useNavigate } from 'react-router-dom'
import {
  ProfileHeroCard,
  ProfileInfoGrid,
  SetupContent,
  SetupNav,
  SetupShell,
} from '../../components/onboarding'
import { useOnboarding } from '../../context/OnboardingContext'

export function SetupProfilePage() {
  const navigate = useNavigate()
  const { state } = useOnboarding()

  return (
    <SetupShell stage="profile">
      <SetupContent
        stepLabel="Step 1 of 5"
        title="I pulled your profile from Trimble ID"
        description="Nothing to fill in. Skim and continue."
        wide
        footer={
          <SetupNav
            onBack={() => navigate('/signin')}
            primaryLabel="Continue"
            onPrimary={() => navigate('/setup/products')}
          />
        }
      >
        <ProfileHeroCard profile={state.profile} />
        <ProfileInfoGrid profile={state.profile} />
      </SetupContent>
    </SetupShell>
  )
}
