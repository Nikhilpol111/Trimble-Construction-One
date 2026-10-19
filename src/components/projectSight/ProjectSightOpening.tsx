import { Loader2 } from 'lucide-react'

function ProjectSightLogo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[var(--ps-border)] bg-white shadow-sm">
        <img src="/onboarding/projectsight.png" alt="ProjectSight" />
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
    <div className="ps-opening flex flex-1 items-center justify-center bg-[#fafbfc] p-8">
      <ProjectSightLogo />
    </div>
  )
}

