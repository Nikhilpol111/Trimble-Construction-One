import { ChevronRight, Folder } from 'lucide-react'
import { connectProjects } from '../../../data/workCenter'
import { DashboardWidget } from '../DashboardWidget'

export function TrimbleConnectProjectsWidget() {
  return (
    <DashboardWidget title="Trimble Connect Projects" productLabel="Trimble Connect">
      <ul className="space-y-2">
        {connectProjects.map((project) => (
          <li key={project.id}>
            <button
              type="button"
              className="flex w-full items-start gap-2 rounded-md py-1 text-left hover:bg-[#f6f9fc]"
            >
              <Folder className="mt-0.5 h-4 w-4 shrink-0 text-[var(--wc-brand-mid)]" strokeWidth={1.75} />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-[var(--wc-text)]">{project.name}</span>
                <span className="block text-[11px] text-[var(--wc-muted-light)]">{project.modified}</span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-[var(--wc-muted-light)]" />
            </button>
          </li>
        ))}
      </ul>
    </DashboardWidget>
  )
}
