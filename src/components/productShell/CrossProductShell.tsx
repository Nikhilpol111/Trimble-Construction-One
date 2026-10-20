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
    <div className="ps-root upload-shell dr-root">
      <ProjectSightTopBar breadcrumb={breadcrumb} assistActive />
      <div className="upload-shell-body">
        <ProjectSightNavRail activeId={navActiveId} />
        {layout === 'drawings' && sidebar ? sidebar : null}
        <div className="upload-workspace-layout">
          <div
            className={`ps-workspace-frame min-h-0 flex-1 ${glowFrame ? 'ps-workspace-frame--glow' : ''}`}
          >
            <div className="ps-workspace-inner">
              {main}
            </div>
          </div>
        </div>
        {assist}
      </div>
    </div>
  )
}
