import { Truck } from 'lucide-react'
import { onTrackTools } from '../../../data/workCenter'
import { DashboardWidget } from '../DashboardWidget'

export function OnTrackWidget() {
  return (
    <DashboardWidget title="On!Track Tool List" productLabel="Trimble On!Track">
      <ul className="space-y-2.5">
        {onTrackTools.map((tool) => (
          <li key={tool.id} className="flex items-center gap-2">
            <Truck className="h-4 w-4 shrink-0 text-[var(--wc-muted-light)]" strokeWidth={1.75} />
            <div className="min-w-0 flex-1">
              <span className="text-xs font-bold text-[var(--wc-text)]">{tool.code}</span>
              <span className="ml-2 text-[11px] text-[var(--wc-muted)]">{tool.name}</span>
            </div>
            <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--wc-success)]" />
          </li>
        ))}
      </ul>
    </DashboardWidget>
  )
}
