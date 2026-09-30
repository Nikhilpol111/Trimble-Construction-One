import { ChevronRight, TrendingUp } from 'lucide-react'
import { analyticsReportLinks } from '../../../data/workCenter'
import { DashboardWidget } from '../DashboardWidget'

export function AnalyticsWidget() {
  return (
    <DashboardWidget title="Analytics" productLabel="Work Center">
      <ul className="space-y-1">
        {analyticsReportLinks.map((link) => (
          <li key={link.id}>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-md py-2 text-left hover:bg-[#f6f9fc]"
            >
              <TrendingUp className="h-4 w-4 shrink-0 text-[var(--wc-brand-light,#0076a8)]" strokeWidth={1.75} />
              <span className="flex-1 text-sm font-medium text-[var(--wc-text)]">{link.label}</span>
              <ChevronRight className="h-4 w-4 text-[var(--wc-muted-light)]" />
            </button>
          </li>
        ))}
      </ul>
    </DashboardWidget>
  )
}
