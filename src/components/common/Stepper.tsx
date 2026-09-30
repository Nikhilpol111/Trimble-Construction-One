import { ModusWcStepper } from '@trimble-oss/moduswebcomponents-react'
import type { IStepperItem } from '@trimble-oss/moduswebcomponents'
import type { StepperStep } from '../../types'

export type StepperProps = {
  steps: StepperStep[]
  currentStepId: string
  className?: string
}

function mapSteps(steps: StepperStep[], currentStepId: string): IStepperItem[] {
  const currentIndex = steps.findIndex((s) => s.id === currentStepId)

  return steps.map((step, index) => {
    const isComplete = index < currentIndex
    const isCurrent = step.id === currentStepId
    let color: IStepperItem['color'] = 'neutral'
    if (isComplete) color = 'success'
    if (isCurrent) color = 'primary'

    return {
      label: step.label,
      subLabel: step.description,
      content: String(index + 1),
      color,
    }
  })
}

export function Stepper({ steps, currentStepId, className = '' }: StepperProps) {
  return (
    <ModusWcStepper
      customClass={className}
      orientation="vertical"
      steps={mapSteps(steps, currentStepId)}
    />
  )
}
