import type { ReactNode } from 'react'
import { KeyRound } from 'lucide-react'
import { TrimbleIdLogo } from '../../components/onboarding/TrimbleLogo'

function SignInArtPanel() {
  return (
    <div className="relative hidden min-h-screen flex-1 overflow-hidden bg-[#f4f7fa] md:flex md:flex-col">
      <svg
        className="pointer-events-none absolute left-0 top-0 h-[55%] w-[70%] opacity-40"
        viewBox="0 0 400 300"
        aria-hidden
      >
        <circle cx="120" cy="100" r="80" fill="none" stroke="#9ecae8" strokeWidth="1" />
        <circle cx="120" cy="100" r="120" fill="none" stroke="#b8d9ec" strokeWidth="0.75" />
        <ellipse cx="200" cy="60" rx="140" ry="50" fill="none" stroke="#c5deef" strokeWidth="0.75" />
      </svg>
      <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden>
        {[
          [80, 180],
          [200, 220],
          [320, 160],
          [140, 280],
        ].map(([x, y], i) => (
          <span
            key={i}
            className="absolute text-[#9ecae8]"
            style={{ left: x, top: y, fontSize: 14 }}
          >
            +
          </span>
        ))}
      </div>
      <div className="relative mt-auto px-10 pb-0 pt-16">
        <TrimbleIdLogo className="mb-6 scale-110 origin-left" />
        <div className="h-1 w-full bg-[var(--signin-brand,#003b5c)]" />
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22 56c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57C21.08 63.12 22 59.93 22 56z"
        transform="scale(0.35) translate(0 -8)"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        transform="scale(0.35) translate(0 -8)"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        transform="scale(0.35) translate(0 -8)"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        transform="scale(0.35) translate(0 -8)"
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
