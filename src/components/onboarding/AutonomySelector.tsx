import { Lightbulb, UserCog, Zap } from 'lucide-react'
import type { AutonomyLevel } from '../../types/onboarding'
import { autonomyCopy } from '../../data/onboardingDefaults'

const tabs: { id: AutonomyLevel; label: string; icon: typeof Lightbulb }[] = [
  { id: 'suggest', label: 'Suggest', icon: Lightbulb },
  { id: 'copilot', label: 'Co-pilot', icon: UserCog },
  { id: 'autopilot', label: 'Autopilot', icon: Zap },
]

export type AutonomySelectorProps = {
  value: AutonomyLevel
  onChange: (level: AutonomyLevel) => void
}

export function AutonomySelector({ value, onChange }: AutonomySelectorProps) {
  const copy = autonomyCopy[value]

  return (
    <div className="rounded-[var(--setup-radius-lg)] border border-[var(--setup-border)] bg-[var(--setup-card)]">
      <div className="grid grid-cols-3 border-b border-[var(--setup-border)]">
        {tabs.map(({ id, label, icon: Icon }) => {
          const active = value === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={`flex flex-col items-center gap-1.5 px-3 py-4 text-xs font-semibold transition-colors ${
                active
                  ? 'border-b-2 border-[var(--setup-brand-mid)] text-[var(--setup-brand-mid)]'
                  : 'border-b-2 border-transparent text-[var(--setup-muted)] hover:text-[var(--setup-text)]'
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={1.75} />
              {label}
            </button>
          )
        })}
      </div>
      <div className="px-5 py-4">
        <p className="text-sm font-semibold text-[var(--setup-text)]">{copy.message}</p>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex gap-1">
            {[1, 2, 3].map((bar) => (
              <div
                key={bar}
                className={`h-1.5 w-10 rounded-full ${
                  bar <= copy.filledBars ? 'bg-[#e6a817]' : 'bg-[#e5e7eb]'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-[var(--setup-muted-light)]">{copy.oversight}</span>
        </div>
      </div>
    </div>
  )
}

export function PermissionsGrid() {
  const canItems = [
    'Read connected products',
    'Brief you each morning',
    'Draft RFIs and replies for review',
    'Learn how you work (if memory is on)',
  ]
  const wontItems = [
    'Send outside the team without approval',
    'Touch finance or contractual writes',
    'Delete source-of-truth data',
    'Act outside connected products',
  ]

  return (
    <div className="mt-4 grid gap-4 md:grid-cols-2">
      <div className="rounded-[var(--setup-radius-lg)] border border-[var(--setup-border)] bg-[var(--setup-card)] p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-[var(--setup-success)]">
          ✓ AI can
        </p>
        <ul className="mt-3 space-y-2.5">
          {canItems.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-[var(--setup-text)]">
              <span className="mt-0.5 text-[var(--setup-brand-light)]">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-[var(--setup-radius-lg)] border border-[var(--setup-border)] bg-[var(--setup-card)] p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-[#c0392b]">✕ AI won&apos;t</p>
        <ul className="mt-3 space-y-2.5">
          {wontItems.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-[var(--setup-text)]">
              <span className="mt-0.5 text-[#d98880]">✕</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export type MemoryToggleProps = {
  enabled: boolean
  onChange: (enabled: boolean) => void
}

export function MemoryToggle({ enabled, onChange }: MemoryToggleProps) {
  return (
    <div className="mt-4 flex items-center justify-between gap-4 rounded-[var(--setup-radius-lg)] border border-[var(--setup-border)] bg-[var(--setup-card)] px-5 py-4">
      <div>
        <p className="text-sm font-semibold text-[var(--setup-text)]">
          Let me learn how you work (memory)
        </p>
        <p className="mt-0.5 text-xs text-[var(--setup-muted)]">
          I&apos;ll remember preferences and show a notice each time.
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
          enabled ? 'bg-[var(--setup-success)]' : 'bg-[#cbd5e1]'
        }`}
      >
        <span
          className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
            enabled ? 'left-[22px]' : 'left-0.5'
          }`}
        />
      </button>
    </div>
  )
}
