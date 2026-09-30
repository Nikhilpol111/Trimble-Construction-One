import { Loader2 } from 'lucide-react'

function ProjectSightLogo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[var(--ps-border)] bg-white shadow-sm">
        <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden>
          <circle cx="24" cy="24" r="20" fill="#0076a8" opacity="0.15" />
          <path
            d="M14 28c4-8 8-12 10-12s6 4 10 12"
            fill="none"
            stroke="#0076a8"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M18 22c3-5 6-8 6-8s3 3 6 8"
            fill="none"
            stroke="#003b5c"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="flex items-center gap-2 text-sm text-[var(--ps-muted)]">
        <Loader2 className="h-4 w-4 animate-spin text-[var(--ps-brand)]" />
        <span>Opening ProjectSight…</span>
      </div>
    </div>
  )
}

export function ProjectSightOpening() {
  return (
    <div className="flex flex-1 items-center justify-center bg-[#fafbfc] p-8">
      <ProjectSightLogo />
    </div>
  )
}
