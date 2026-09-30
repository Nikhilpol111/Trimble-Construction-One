import { AssistPanel } from '../assist/AssistPanel'
import {
  DesignReviewAssistBody,
  designReviewAssistTitle,
} from './DesignReviewAssistBody'

export function DesignReviewAssistPanel({
  flowState,
  completedStepIds,
  investigating,
}: {
  flowState: string
  completedStepIds: string[]
  investigating: boolean
}) {
  return (
    <AssistPanel title={designReviewAssistTitle(flowState)} variant="designReview">
      <DesignReviewAssistBody completedStepIds={completedStepIds} investigating={investigating} />
    </AssistPanel>
  )
}
