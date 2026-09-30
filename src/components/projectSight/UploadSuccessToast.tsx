import { CheckCircle2 } from 'lucide-react'

export function UploadSuccessToast({ fileName, project }: { fileName: string; project: string }) {
  return (
    <div
      className="pointer-events-none fixed bottom-8 left-1/2 z-40 flex max-w-md -translate-x-1/2 items-start gap-3 rounded-lg border border-[var(--ps-border)] bg-white px-4 py-3 shadow-lg"
      role="status"
    >
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--ps-success)]" />
      <div>
        <p className="text-sm font-semibold text-[var(--ps-text)]">Drawing uploaded</p>
        <p className="text-xs text-[var(--ps-muted)]">
          {fileName} has been added to {project}.
        </p>
      </div>
    </div>
  )
}
