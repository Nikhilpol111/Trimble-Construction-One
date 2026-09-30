import { Check } from 'lucide-react'

export type SetupStepProps = {
  number: number
  label: string
  sublabel: string
  isActive: boolean
  isComplete: boolean
}

export function SetupStep({ number, label, sublabel, isActive, isComplete }: SetupStepProps) {
  return (
    <div
      className={`flex items-start gap-3 rounded-r-md py-2.5 pl-3 pr-2 ${
        isActive ? 'bg-[var(--setup-active-bg)]' : ''
      }`}
    >
      {isComplete ? (
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--setup-success)] text-white">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </span>
      ) : (
        <span
          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
            isActive
              ? 'bg-[var(--setup-brand-mid)] text-white'
              : 'border border-[var(--setup-border)] bg-white text-[var(--setup-muted-light)]'
          }`}
        >
          {number}
        </span>
      )}
      <div className="min-w-0 pt-0.5">
        <p
          className={`text-sm leading-tight ${
            isActive || isComplete ? 'font-semibold text-[var(--setup-text)]' : 'font-medium text-[var(--setup-muted)]'
          }`}
        >
          {label}
        </p>
        <p className="text-xs text-[var(--setup-muted-light)]">{sublabel}</p>
      </div>
    </div>
  )
}
