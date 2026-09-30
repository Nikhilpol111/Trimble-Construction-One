import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrimbleIdLogo } from '../components/onboarding'
import {
  GoogleIcon,
  KeyRound,
  SignInBrandedLayout,
  SignInSocialButton,
} from '../components/onboarding/SignInLayout'
import { useOnboarding } from '../context/OnboardingContext'
import { Checkbox } from '../components/common/Checkbox'

export function SignInPage() {
  const navigate = useNavigate()
  const { state, setSignInEmail, setRememberMe } = useOnboarding()
  const [email, setEmail] = useState(state.signInEmail)

  function handleNext() {
    setSignInEmail(email)
    navigate('/setup/profile')
  }

  return (
    <SignInBrandedLayout>
      <div className="flex flex-1 flex-col px-8 py-10 sm:px-10">
        <TrimbleIdLogo className="mb-10 [&_span]:text-[26px]" />
        <h1 className="text-[26px] font-normal text-[#333]">Sign In</h1>
        <p className="mt-2 text-sm text-[#555]">
          New user?{' '}
          <button type="button" className="font-normal text-[var(--signin-link,#0076b6)] hover:underline">
            Create a Trimble ID
          </button>
        </p>
        <div className="mt-8">
          <label htmlFor="signin-email" className="text-sm text-[#333]">
            Email or username
          </label>
          <input
            id="signin-email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded border border-[var(--signin-input-border,#c5cdd8)] px-3 py-2.5 text-sm outline-none focus:border-[#0076b6]"
          />
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              className="rounded bg-[var(--signin-btn,#003b5c)] px-8 py-2 text-sm font-medium text-white hover:bg-[#002a42]"
            >
              Next
            </button>
          </div>
        </div>
        <div className="my-8 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#ddd]" />
          <span className="text-sm text-[#666]">or</span>
          <div className="h-px flex-1 bg-[#ddd]" />
        </div>
        <div className="space-y-3">
          <SignInSocialButton icon={<KeyRound className="h-4 w-4" />}>Use a passkey</SignInSocialButton>
          <SignInSocialButton icon={<GoogleIcon />}>Continue with Google</SignInSocialButton>
          <SignInSocialButton icon={<span className="text-base">&#63743;</span>}>Continue with Apple</SignInSocialButton>
          <SignInSocialButton
            icon={
              <span className="grid h-4 w-4 grid-cols-2 gap-px">
                <span className="bg-[#f25022]" />
                <span className="bg-[#7fba00]" />
                <span className="bg-[#00a4ef]" />
                <span className="bg-[#ffb900]" />
              </span>
            }
          >
            Continue with Microsoft
          </SignInSocialButton>
        </div>
        <div className="mt-6">
          <Checkbox
            checked={state.rememberMe}
            label="Remember me"
            onCheckedChange={setRememberMe}
            className="text-sm text-[#333]"
          />
        </div>
        <div className="mt-auto pt-10 text-center text-[11px] leading-relaxed text-[var(--signin-link,#0076b6)]">
          <p>
            <button type="button" className="hover:underline">
              Help
            </button>
            {' | '}
            <button type="button" className="hover:underline">
              Privacy Notice
            </button>
            {' | '}
            <button type="button" className="hover:underline">
              Terms of Use
            </button>
            {' | '}
            <button type="button" className="hover:underline">
              CA Notice at Collection
            </button>
            {' | '}
            <button type="button" className="hover:underline">
              Your Privacy Choices (US)
            </button>
          </p>
          <p className="mt-3 text-[#888]">©2026, Trimble Inc. All rights reserved.</p>
        </div>
      </div>
    </SignInBrandedLayout>
  )
}
