import { useDesignReview } from '../../context/DesignReviewContext'
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
  const {backToWorkCenter}=useDesignReview()
  return (
    <AssistPanel title={designReviewAssistTitle(flowState)} variant="designReview" onClose={backToWorkCenter}>
      <DesignReviewAssistBody completedStepIds={completedStepIds} investigating={investigating} />
    </AssistPanel>
  )
}
