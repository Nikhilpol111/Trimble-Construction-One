import { CheckCircle2, X } from 'lucide-react'
import { useGeneratedWidgets } from '../../context/GeneratedWidgetsContext'

export function WidgetAddedToast() {
  const { showAddedToast, widgetConfig, dismissAddedToast, openCustomiseDashboard } =
    useGeneratedWidgets()

  if (!showAddedToast) return null

  const subtitle = widgetConfig.title.replace('—', '-')

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4">
      <div
        className="pointer-events-auto flex w-full max-w-[520px] items-center gap-3 rounded-xl border border-[#86efac] bg-white px-4 py-3 shadow-lg"
        role="status"
      >
        <CheckCircle2 className="h-6 w-6 shrink-0 text-[var(--wc-success)]" strokeWidth={1.75} />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-[var(--wc-text)]">Widget added to your dashboard</p>
          <p className="text-xs text-[var(--wc-muted)]">{subtitle}</p>
        </div>
        <button
          type="button"
          onClick={openCustomiseDashboard}
          className="shrink-0 text-xs font-semibold text-[var(--wc-brand-mid)] hover:underline"
        >
          Customize
        </button>
        <button
          type="button"
          onClick={dismissAddedToast}
          className="shrink-0 rounded p-1 text-[var(--wc-muted)] hover:bg-[#f3f6f9]"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
