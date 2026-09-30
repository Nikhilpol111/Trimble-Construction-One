import { Bell, Check, Clock, Inbox, Lightbulb, Shield, Target, User } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type RecapRow = {
  label: string
  value: string
  icon: LucideIcon
}

export function ReadyRecap({ rows }: { rows: RecapRow[] }) {
  return (
    <div className="overflow-hidden rounded-[var(--setup-radius-lg)] border border-[var(--setup-border)] bg-[var(--setup-card)]">
      <p className="border-b border-[var(--setup-border)] px-5 py-3 text-sm font-medium text-[var(--setup-muted)]">
        Quick recap
      </p>
      <ul>
        {rows.map((row) => {
          const Icon = row.icon
          return (
            <li
              key={row.label}
              className="flex items-center gap-3 border-b border-[var(--setup-border)] px-5 py-3.5 last:border-b-0"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#e8f2fa] text-[var(--setup-brand-mid)]">
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <span className="w-28 shrink-0 text-sm text-[var(--setup-muted)]">{row.label}</span>
              <span className="min-w-0 flex-1 text-sm font-semibold text-[var(--setup-text)]">
                {row.value}
              </span>
              <Check className="h-4 w-4 shrink-0 text-[var(--setup-success)]" strokeWidth={2.5} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function ReadySuccessIcon() {
  return (
    <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--setup-success-bg)] text-[var(--setup-success)]">
      <Check className="h-5 w-5" strokeWidth={2.5} />
    </div>
  )
}

export const recapIcons = {
  profile: User,
  products: Shield,
  mornings: Inbox,
  briefing: Clock,
  focus: Target,
  cadence: Bell,
  autonomy: Lightbulb,
}
