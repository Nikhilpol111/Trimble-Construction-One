import { Check } from 'lucide-react'
import { workCenterUser } from '../../data/workCenter'

export function UserProfile({ compact = true }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--wc-brand-mid)] text-sm font-semibold text-white">
        S
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1">
          <span className="truncate text-sm font-semibold text-[var(--wc-text)]">
            {workCenterUser.name}
          </span>
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[var(--wc-success)] text-white">
            <Check className="h-2.5 w-2.5" strokeWidth={3} />
          </span>
        </div>
        <p className="truncate text-xs text-[var(--wc-muted)]">
          {compact ? workCenterUser.emailShort : workCenterUser.email}
        </p>
      </div>
    </div>
  )
}
