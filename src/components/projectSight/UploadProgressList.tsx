import { Check, Loader2 } from 'lucide-react'
import type { UploadProgressStep } from '../../types/uploadDrawing'

export function UploadProgressList({ steps }: { steps: UploadProgressStep[] }) {
  return (
    <ul className="space-y-0">
      {steps.map((step) => (
        <li key={step.id} className="flex items-center gap-2.5 py-2 text-[13px]">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center">
            {step.status === 'complete' ? (
              <Check className="h-4 w-4 text-[var(--ps-success)]" strokeWidth={2.5} />
            ) : step.status === 'active' ? (
              <Loader2 className="h-4 w-4 animate-spin text-[var(--ps-brand)]" />
            ) : (
              <span className="h-1.5 w-1.5 rounded-full bg-[#cbd5e1]" />
            )}
          </span>
          <span
            className={
              step.status === 'pending'
                ? 'text-[#94a3b8]'
                : step.status === 'active'
                  ? 'font-medium text-[var(--ps-text)]'
                  : 'text-[var(--ps-text)]'
            }
          >
            {step.label}
          </span>
        </li>
      ))}
    </ul>
  )
}
