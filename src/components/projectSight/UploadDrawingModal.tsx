import { Calendar, CheckCircle2, FileText, Sparkles, X } from 'lucide-react'
import { drawingSetOptions } from '../../data/projectSightDrawings'

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
          <button type="button" onClick={onCancel} className="rounded p-1 text-[var(--ps-muted)] hover:bg-[#f8fafc]" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-4 px-5 py-4">
          <div className="flex items-center gap-3 rounded-lg border border-[var(--ps-border-light)] bg-[#fafbfc] px-3 py-2.5">
            <FileText className="h-8 w-8 shrink-0 text-red-500" strokeWidth={1.25} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-[var(--ps-text)]">{fileName}</p>
              <p className="flex items-center gap-1 text-xs text-[var(--ps-success)]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Ready to process
              </p>
            </div>
          </div>
          <div>
            <FilledByAssistBadge />
            <label className="mb-1 block text-xs font-medium text-[var(--ps-muted)]">Project</label>
            <input
              type="text"
              readOnly
              value={project}
              className="w-full rounded-md border border-[var(--ps-border)] bg-[#f8fafc] px-3 py-2 text-sm text-[var(--ps-text)]"
            />
          </div>
          <div>
            <FilledByAssistBadge />
            <label className="mb-1 block text-xs font-medium text-[var(--ps-muted)]">Group</label>
            <input
              type="text"
              readOnly
              value={group}
              className="w-full rounded-md border border-[var(--ps-border)] bg-[#f8fafc] px-3 py-2 text-sm text-[var(--ps-text)]"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[var(--ps-text)]">
              Drawing set <span className="text-red-500">*</span>
            </label>
            <select
              value={drawingSet}
              onChange={(e) => onDrawingSetChange(e.target.value)}
              className={`w-full rounded-md border bg-white px-3 py-2 text-sm outline-none ${
                needsDrawingSet ? 'border-[var(--ps-highlight-field)] ring-1 ring-[#fde68a]' : 'border-[var(--ps-border)]'
              }`}
            >
              {drawingSetOptions.map((opt) => (
                <option key={opt.value || 'empty'} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[var(--ps-text)]">
              Revision date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--ps-muted)]" />
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
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-[var(--ps-border)] px-4 py-2 text-sm font-medium text-[var(--ps-text)]"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!uploadEnabled}
            onClick={onUpload}
            className="rounded-md bg-[var(--ps-brand)] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-[#94a3b8]"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  )
}
