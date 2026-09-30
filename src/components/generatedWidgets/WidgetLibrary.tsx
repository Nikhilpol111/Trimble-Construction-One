import { Check, LayoutGrid, Plus } from 'lucide-react'
import { widgetLibraryTrimble } from '../../flows/generatedWidgets'
import { useGeneratedWidgets } from '../../context/GeneratedWidgetsContext'
import type { DashboardWidgetId } from '../../types/generatedWidgets'

const widgetTitleMap: Record<DashboardWidgetId, string> = {
  analytics: 'Analytics',
  'accounts-payable-overview': 'Accounts Payable',
  'unapproved-invoices': 'Unapproved Invoi…',
  'customer-aging': 'Customer Aging Totals',
  'trimble-connect-projects': 'Trimble Connect P…',
  'on-track': 'On!Track Tool List',
  'recent-activity': 'Recent Activity',
}

export function WidgetLibrary() {
  const { libraryTab, setLibraryTab, draftLayout, addWidgetToDraft, widgetConfig } =
    useGeneratedWidgets()
  const layout = draftLayout ?? []

  const generatedEntries = layout.includes('recent-activity')
    ? [{ id: 'recent-activity' as const, label: widgetConfig.title }]
    : [{ id: 'recent-activity' as const, label: 'Recent Activity — Trimble Connect' }]

  return (
    <div className="rounded-xl border border-[var(--wc-border)] bg-white p-4 shadow-sm">
      <div className="mb-3 flex gap-4 border-b border-[var(--wc-border-light)] pb-2">
        <button
          type="button"
          onClick={() => setLibraryTab('generated')}
          className={`text-xs font-semibold ${
            libraryTab === 'generated'
              ? 'text-[var(--wc-brand-mid)]'
              : 'text-[var(--wc-muted)]'
          }`}
        >
          Generated widgets
        </button>
        <button
          type="button"
          onClick={() => setLibraryTab('trimble')}
          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
            libraryTab === 'trimble'
              ? 'bg-[var(--wc-active-bg)] text-[var(--wc-brand-mid)]'
              : 'text-[var(--wc-muted)]'
          }`}
        >
          Trimble widgets
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {libraryTab === 'trimble'
          ? widgetLibraryTrimble.map((item) => {
              const onDash = layout.includes(item.id)
              const canAdd = !onDash
              return (
                <LibraryCard
                  key={item.id}
                  label={item.label}
                  onDash={onDash}
                  canAdd={canAdd}
                  onAdd={() => addWidgetToDraft(item.id)}
                />
              )
            })
          : generatedEntries.map((item) => {
              const onDash = layout.includes(item.id)
              return (
                <LibraryCard
                  key={item.id}
                  label={item.label}
                  onDash={onDash}
                  canAdd={!onDash}
                  onAdd={() => addWidgetToDraft(item.id)}
                />
              )
            })}
      </div>
    </div>
  )
}

function LibraryCard({
  label,
  onDash,
  canAdd,
  onAdd,
}: {
  label: string
  onDash: boolean
  canAdd: boolean
  onAdd: () => void
}) {
  return (
    <div className="flex min-w-[140px] max-w-[180px] flex-1 items-center gap-2 rounded-lg border border-[var(--wc-border)] bg-[#fafbfc] px-2 py-2">
      <LayoutGrid className="h-4 w-4 shrink-0 text-[var(--wc-brand-mid)]" strokeWidth={1.5} />
      <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-[var(--wc-text)]">
        {label}
      </span>
      {onDash ? (
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#e8f5ee] text-[var(--wc-success)]">
          <Check className="h-4 w-4" strokeWidth={2.5} />
        </span>
      ) : (
        <button
          type="button"
          onClick={onAdd}
          disabled={!canAdd}
          className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--wc-brand-mid)] text-white disabled:opacity-40"
          aria-label={`Add ${label}`}
        >
          <Plus className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export { widgetTitleMap }
