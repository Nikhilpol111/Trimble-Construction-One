import type { StepperStep } from '../../types'

export type StepperProps = {
  steps: StepperStep[]
  currentStepId: string
  className?: string
}

export function Stepper({ steps, currentStepId, className = '' }: StepperProps) {
  const currentIndex = steps.findIndex((s) => s.id === currentStepId)

  return (
    <ol className={`flex flex-col gap-3 ${className}`}>
      {steps.map((step, index) => {
        const isComplete = index < currentIndex
        const isCurrent = step.id === currentStepId

        return (
          <li key={step.id} className="flex gap-3">
            <div
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium ${
                isCurrent || isComplete
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white'
                  : 'border-[var(--color-border-strong)] bg-[var(--color-surface-raised)] text-[var(--color-text-muted)]'
              }`}
            >
              {index + 1}
            </div>
            <div>
              <p className={`text-sm ${isCurrent ? 'font-semibold' : 'font-medium'}`}>
                {step.label}
              </p>
              {step.description ? (
                <p className="text-xs text-[var(--color-text-muted)]">{step.description}</p>
              ) : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
