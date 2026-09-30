import { Check, Circle, Eye, RefreshCw } from 'lucide-react'
import type { GeneratedWidgetOptionId } from '../../types/generatedWidgets'
import {
  ActivityListCompact,
  ActivitySummaryContent,
  ActivityTimelineContent,
} from './ActivityListContent'

export type GeneratedWidgetOptionProps = {
  id: GeneratedWidgetOptionId
  title: string
  selected: boolean
  onSelect: () => void
  onPreview: () => void
  onRegenerate: () => void
}

function OptionBody({ id }: { id: GeneratedWidgetOptionId }) {
  switch (id) {
    case 'recent-activity':
      return <ActivityListCompact />
    case 'activity-summary':
      return <ActivitySummaryContent />
    case 'project-timeline':
      return <ActivityTimelineContent />
    default:
      return null
  }
}

export function GeneratedWidgetOption({
  id,
  title,
  selected,
  onSelect,
  onPreview,
  onRegenerate,
}: GeneratedWidgetOptionProps) {
  return (
    <div
      className={`flex min-w-0 flex-1 flex-col rounded-lg border bg-white ${
        selected ? 'border-[var(--wc-brand-mid)] ring-1 ring-[var(--wc-brand-mid)]' : 'border-[var(--wc-border)]'
      }`}
    >
      <button type="button" onClick={onSelect} className="flex flex-1 flex-col p-3 text-left">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h4 className="text-xs font-bold text-[var(--wc-text)]">{title}</h4>
          {selected ? (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--wc-brand-mid)] text-white">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
          ) : (
            <Circle className="h-5 w-5 text-[var(--wc-border)]" strokeWidth={1.5} />
          )}
        </div>
        <div className="min-h-[140px] flex-1">{<OptionBody id={id} />}</div>
      </button>
      <div className="flex gap-2 border-t border-[var(--wc-border-light)] px-3 py-2">
        <button
          type="button"
          onClick={onPreview}
          className="inline-flex flex-1 items-center justify-center gap-1 rounded-md border border-[var(--wc-border)] bg-white py-1 text-[10px] font-semibold text-[var(--wc-text)]"
        >
          <Eye className="h-3 w-3" />
          Preview
        </button>
        <button
          type="button"
          onClick={onRegenerate}
          className="inline-flex flex-1 items-center justify-center gap-1 rounded-md border border-[var(--wc-border)] bg-white py-1 text-[10px] font-semibold text-[var(--wc-text)]"
        >
          <RefreshCw className="h-3 w-3" />
          Regenerate
        </button>
      </div>
    </div>
  )
}
