import type { ReactNode } from 'react'
import { KeyRound } from 'lucide-react'


function SignInArtPanel() { return <div className='signin-art'><img src='/onboarding/signin-art.png' alt='' /></div> }

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M23 12.2c0-.8-.1-1.5-.2-2.2H12v4.3h6.2a5.4 5.4 0 0 1-2.3 3.5v2.8h3.7c2.2-2 3.4-4.9 3.4-8.4z"
        
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        
      />
    </svg>
  )
}

export function SignInBrandedLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="signin-root flex min-h-screen bg-white">
      <SignInArtPanel />
      <div className="flex min-h-screen w-full flex-col border-l border-[#e8ecf0] lg:w-[420px] lg:shrink-0 xl:w-[440px]">
        <div className="flex min-h-screen flex-1 flex-col">{children}</div>
      </div>
    </div>
  )
}

export function SignInSocialButton({
  children,
  icon,
}: {
  children: ReactNode
  icon?: ReactNode
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-2 rounded border border-[#1a1a1a] bg-white px-4 py-2.5 text-sm font-medium text-[#1a1a1a] transition-colors hover:bg-[#fafafa]"
    >
      {icon}
      {children}
    </button>
  )
}

export { GoogleIcon, KeyRound }

