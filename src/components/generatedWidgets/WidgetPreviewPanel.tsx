import { ArrowLeft, RefreshCw } from 'lucide-react'
import { useGeneratedWidgets } from '../../context/GeneratedWidgetsContext'
import { AssistMark } from './AssistMark'
import { ActivityListDashboard } from './ActivityListContent'
import { WidgetConfigForm } from './WidgetConfigForm'

export function WidgetPreviewPanel() {
  const {
    widgetConfig,
    updateWidgetConfig,
    backToOptions,
    regenerateOptions,
    addToDashboard,
    selectedOptionId,
  } = useGeneratedWidgets()

  if (selectedOptionId !== 'recent-activity') {
    return null
  }

  return (
    <div className="gw-overlay-root">
      <div className="gw-gradient-shell w-full max-w-[920px]">
        <div className="gw-panel-inner p-5">
          <div className="mb-5 flex gap-2">
            <AssistMark />
            <p className="text-xs leading-relaxed text-[var(--wc-text)]">
              Here&apos;s a closer look before it goes on your dashboard. This widget only reads from
              Trimble Connect — you can remove it any time.
            </p>
          </div>

          <div className="flex flex-col gap-5 min-[900px]:flex-row">
            <div className="min-w-0 flex-1 rounded-lg border border-[var(--wc-border)] bg-white p-4">
              <ActivityListDashboard title={widgetConfig.title} showGeneratedBadge />
            </div>
            <div className="w-full min-[900px]:w-[280px] shrink-0">
              <WidgetConfigForm config={widgetConfig} onChange={updateWidgetConfig} />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--wc-border-light)] pt-4">
            <button
              type="button"
              onClick={backToOptions}
              className="inline-flex items-center gap-1.5 rounded-md border border-[var(--wc-border)] bg-white px-4 py-2 text-xs font-semibold text-[var(--wc-text)]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </button>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={regenerateOptions}
                className="inline-flex items-center gap-1.5 rounded-md border border-[var(--wc-border)] bg-white px-4 py-2 text-xs font-semibold text-[var(--wc-text)]"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Regenerate
              </button>
              <button
                type="button"
                onClick={addToDashboard}
                className="rounded-md bg-[var(--wc-brand)] px-5 py-2 text-xs font-semibold text-white"
              >
                Add to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
