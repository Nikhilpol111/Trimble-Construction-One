import { GripVertical, LayoutGrid, MoreHorizontal, Trash2 } from 'lucide-react'
import { useGeneratedWidgets } from '../../context/GeneratedWidgetsContext'
import type { DashboardWidgetId } from '../../types/generatedWidgets'
import { widgetTitleMap, WidgetLibrary } from './WidgetLibrary'

const EDIT_LABELS: Partial<Record<DashboardWidgetId, string>> = {
  'accounts-payable-overview': 'Accounts Payable Overview',
  'unapproved-invoices': 'Unapproved Invoices',
  'customer-aging': 'Customer Aging Totals',
  'trimble-connect-projects': 'Trimble Connect Projects',
  'on-track': 'On!Track Tool List',
}

export function DashboardEditMode() {
  const {
    draftLayout,
    cancelCustomise,
    saveDashboard,
    removeWidgetFromDraft,
    moveDraftWidget,
    recentActivityIsNew,
    widgetConfig,
  } = useGeneratedWidgets()

  const layout = draftLayout ?? []
  const showEmptySlot = layout.length < 7

  function titleFor(id: DashboardWidgetId) {
    if (id === 'recent-activity') return widgetConfig.title
    return EDIT_LABELS[id] ?? widgetTitleMap[id] ?? id
  }

  function handleDragStart(e: React.DragEvent, index: number) {
    e.dataTransfer.setData('text/plain', String(index))
    e.dataTransfer.effectAllowed = 'move'
  }

  function handleDrop(e: React.DragEvent, toIndex: number) {
    e.preventDefault()
    const from = Number(e.dataTransfer.getData('text/plain'))
    if (!Number.isNaN(from) && from !== toIndex) {
      moveDraftWidget(from, toIndex)
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col px-6 py-5 lg:px-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <LayoutGrid className="h-5 w-5 text-[var(--wc-brand-mid)]" />
          <h1 className="text-xl font-bold text-[var(--wc-text)]">Customise dashboard</h1>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={cancelCustomise}
            className="rounded-md border border-[var(--wc-border)] bg-white px-4 py-2 text-xs font-semibold text-[var(--wc-text)]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={saveDashboard}
            className="rounded-md bg-[var(--wc-brand)] px-4 py-2 text-xs font-semibold text-white"
          >
            Save dashboard
          </button>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-[var(--wc-widget-gap)] min-[1280px]:grid-cols-3">
        {layout.map((id, index) => {
          const isNew = id === 'recent-activity' && recentActivityIsNew
          return (
            <article
              key={`${id}-${index}`}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, index)}
              className={`flex min-h-[180px] flex-col rounded-[8px] border bg-white ${
                isNew
                  ? 'border-[var(--wc-brand-mid)] ring-1 ring-[var(--wc-brand-mid)]'
                  : 'border-[var(--wc-border)]'
              }`}
            >
              <div className="flex items-center gap-1 border-b border-[var(--wc-border-light)] px-3 py-2">
                <GripVertical className="h-4 w-4 cursor-grab text-[var(--wc-muted-light)]" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-sm font-bold text-[var(--wc-text)]">
                      {titleFor(id)}
                    </h3>
                    {isNew ? (
                      <span className="rounded bg-[#ede9fe] px-1.5 py-0.5 text-[9px] font-bold uppercase text-[#7c3aed]">
                        New
                      </span>
                    ) : null}
                  </div>
                </div>
                <button type="button" className="text-[var(--wc-muted-light)]" aria-label="Options">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => removeWidgetFromDraft(id)}
                  className="text-[var(--wc-muted-light)] hover:text-red-500"
                  aria-label="Remove widget"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-1 items-center justify-center px-4 py-6">
                <p className="text-sm text-[var(--wc-muted-light)]">Widget preview</p>
              </div>
            </article>
          )
        })}
        {showEmptySlot ? (
          <div
            className="flex min-h-[180px] flex-col items-center justify-center rounded-[8px] border border-dashed border-[var(--wc-border)] bg-[#fafbfc] text-[var(--wc-muted)]"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, layout.length)}
          >
            <span className="text-lg leading-none">+</span>
            <span className="mt-1 text-xs font-medium">Add a widget here</span>
          </div>
        ) : null}
      </div>

      <div className="mt-6 pb-4">
        <WidgetLibrary />
      </div>
    </div>
  )
}
