import { Sparkles } from 'lucide-react'
import { drawingSetOptions } from '../../data/projectSightDrawings'
import { Button } from '../common/Button'
import { Icon } from '../common/Icon'
import { Select } from '../common/Select'
import { TextInput } from '../common/TextInput'

export type UploadDrawingModalProps = {
  open: boolean
  fileName: string
  project: string
  group: string
  drawingSet: string
  revisionDate: string
  uploadEnabled: boolean
  onDrawingSetChange: (value: string) => void
  onRevisionDateChange: (value: string) => void
  onCancel: () => void
  onUpload: () => void
}

function FilledByAssistBadge() {
  return (
    <span className="mb-1 inline-flex items-center gap-1 text-[10px] font-semibold text-[var(--ps-filled-text)]">
      <Sparkles className="h-3 w-3" />
      Filled by Assist
    </span>
  )
}

export function UploadDrawingModal({
  open,
  fileName,
  project,
  group,
  drawingSet,
  revisionDate,
  uploadEnabled,
  onDrawingSetChange,
  onRevisionDateChange,
  onCancel,
  onUpload,
}: UploadDrawingModalProps) {
  if (!open) return null

  const needsDrawingSet = !drawingSet
  const needsDate = !revisionDate

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black/25 p-4 pt-[8vh]">
      <div
        className="relative w-full max-w-[480px] rounded-lg border border-[var(--ps-border)] bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="upload-drawing-title"
      >
        <div className="flex items-center justify-between border-b border-[var(--ps-border-light)] px-5 py-4">
          <h2 id="upload-drawing-title" className="text-base font-semibold text-[var(--ps-text)]">
            Upload Drawing
          </h2>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label="Close"
            onClick={onCancel}
            className="!min-h-0"
          >
            <Icon name="close" size="sm" />
          </Button>
        </div>
        <div className="space-y-4 px-5 py-4">
          <div className="flex items-center gap-3 rounded-lg border border-[var(--ps-border-light)] bg-[#fafbfc] px-3 py-2.5">
            <Icon name="file" size="lg" className="shrink-0 text-red-500" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-[var(--ps-text)]">{fileName}</p>
              <p className="flex items-center gap-1 text-xs text-[var(--ps-success)]">
                <Icon name="check" size="sm" />
                Ready to process
              </p>
            </div>
          </div>
          <div>
            <FilledByAssistBadge />
            <TextInput
              value={project}
              readOnly
              label="Project"
              onValueChange={() => undefined}
              className="[&_.modus-wc-input]:bg-[#f8fafc]"
            />
          </div>
          <div>
            <FilledByAssistBadge />
            <TextInput
              value={group}
              readOnly
              label="Group"
              onValueChange={() => undefined}
              className="[&_.modus-wc-input]:bg-[#f8fafc]"
            />
          </div>
          <div
            className={
              needsDrawingSet ? 'rounded-md ring-1 ring-[#fde68a] [&_modus-wc-select]:border-[var(--ps-highlight-field)]' : ''
            }
          >
            <Select
              value={drawingSet}
              label="Drawing set *"
              options={drawingSetOptions.map((opt) => ({ value: opt.value, label: opt.label }))}
              onValueChange={onDrawingSetChange}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[var(--ps-text)]">
              Revision date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Icon
                name="calendar"
                size="sm"
                className="pointer-events-none absolute left-3 top-1/2 z-[1] -translate-y-1/2 text-[var(--ps-muted)]"
              />
              <input
                type="date"
                value={revisionDate}
                onChange={(e) => onRevisionDateChange(e.target.value)}
                className={`w-full rounded-md border bg-white py-2 pl-9 pr-3 text-sm outline-none ${
                  needsDate ? 'border-[var(--ps-highlight-field)] ring-1 ring-[#fde68a]' : 'border-[var(--ps-border)]'
                }`}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t border-[var(--ps-border-light)] px-5 py-4">
          <Button type="button" variant="secondary" size="md" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" variant="primary" size="md" disabled={!uploadEnabled} onClick={onUpload}>
            Upload
          </Button>
        </div>
      </div>
    </div>
  )
}
