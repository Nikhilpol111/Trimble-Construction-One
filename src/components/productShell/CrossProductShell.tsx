import type { ReactNode } from 'react'
import { ProjectSightNavRail } from '../projectSight/ProjectSightNavRail'
import { ProjectSightTopBar } from '../projectSight/ProjectSightTopBar'

export type CrossProductShellProps = {
  breadcrumb: string[]
  main: ReactNode
  assist: ReactNode
  glowFrame?: boolean
  navActiveId?: string
  layout?: 'rail' | 'drawings'
  sidebar?: ReactNode
}

export function CrossProductShell({
  breadcrumb,
  main,
  assist,
  glowFrame = true,
  navActiveId = 'assist',
  layout = 'rail',
  sidebar,
}: CrossProductShellProps) {
  return (
    <div className="ps-root dr-root flex h-full min-h-screen flex-col bg-[var(--ps-bg)]">
      <ProjectSightTopBar breadcrumb={breadcrumb} assistActive />
      <div className="flex min-h-0 flex-1">
        <ProjectSightNavRail activeId={navActiveId} />
        {layout === 'drawings' && sidebar ? sidebar : null}
        <div className="flex min-w-0 flex-1 p-2">
          <div
            className={`ps-workspace-frame min-h-0 flex-1 ${glowFrame ? 'ps-workspace-frame--glow' : ''}`}
          >
            <div className="ps-workspace-inner min-h-[calc(100vh-var(--ps-topbar-height)-16px)] overflow-auto">
              {main}
            </div>
          </div>
        </div>
        {assist}
      </div>
    </div>
  )
}
