import { useEffect, useState } from 'react'
import {
  investigationCompleteMs,
  investigationSteps,
} from '../../flows/designReview/investigationProgress'

export function useInvestigationProgress(active: boolean) {
  const [completedStepIds, setCompletedStepIds] = useState<string[]>([])
  const [investigating, setInvestigating] = useState(false)

  useEffect(() => {
    if (!active) {
      setCompletedStepIds([])
      setInvestigating(false)
      return
    }
    setInvestigating(true)
    setCompletedStepIds([])
    const timers: number[] = []
    investigationSteps.forEach((step) => {
      timers.push(
        window.setTimeout(() => {
          setCompletedStepIds((prev) => [...prev, step.id])
        }, step.delayMs),
      )
    })
    timers.push(
      window.setTimeout(() => {
        setInvestigating(false)
      }, investigationCompleteMs),
    )
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [active])

  const complete =
    active && !investigating && completedStepIds.length === investigationSteps.length

  return { completedStepIds, investigating, complete }
}
