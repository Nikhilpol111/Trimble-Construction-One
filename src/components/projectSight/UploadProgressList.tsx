import { ModusWcLoader } from '@trimble-oss/moduswebcomponents-react'
import type { UploadProgressStep } from '../../types/uploadDrawing'
import { Icon } from '../common/Icon'

export function UploadProgressList({ steps }: { steps: UploadProgressStep[] }) {
  return (
    <ul className="space-y-0">
      {steps.map((step) => (
        <li key={step.id} className="flex items-center gap-2.5 py-2 text-[13px]">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center">
            {step.status === 'complete' ? (
              <Icon name="check" size="sm" />
            ) : step.status === 'active' ? (
              <ModusWcLoader variant="spinner" size="sm" color="primary" customClass="h-4 w-4" />
            ) : (
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--modus-wc-color-gray-2)]" />
            )}
          </span>
          <span
            className={
              step.status === 'pending'
                ? 'text-[var(--modus-wc-color-gray-4)]'
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
