import { Check, Loader2 } from 'lucide-react'
import type { UploadProgressStep } from '../../types/uploadDrawing'
export function UploadProgressList({steps}:{steps:UploadProgressStep[]}) {
 return <ul className="upload-progress" aria-label="Upload progress" aria-live="polite">
  {steps.map(step=><li key={step.id} data-status={step.status} data-step={step.id} aria-current={step.status==='active'?'step':undefined}>
   <span className="upload-step-mark">{step.status==='complete'?<Check/>:step.status==='active'&&step.id!=='waitingDetails'?<Loader2 className="animate-spin"/>:<span/>}</span>
   <span>{step.label}</span>
  </li>)}
 </ul>
}
