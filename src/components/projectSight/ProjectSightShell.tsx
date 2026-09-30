import type { ReactNode } from 'react'
import { AssistPanel } from '../assist/AssistPanel'
import { ProjectSightNavRail } from './ProjectSightNavRail'
import { ProjectSightProjectSidebar } from './ProjectSightProjectSidebar'
import { ProjectSightTopBar } from './ProjectSightTopBar'
import type { UploadFlowState, UploadTask } from '../../types/uploadDrawing'

export type ProjectSightShellProps = {
  breadcrumb: string[]
  layout: 'rail' | 'drawings'
  glowFrame?: boolean
  main: ReactNode
  assistState: UploadFlowState
  assistTask: UploadTask
  onBackToWorkCenter: () => void
}

export function ProjectSightShell({
  breadcrumb,
  layout,
  glowFrame = false,
  main,
  assistState,
  assistTask,
  onBackToWorkCenter,
}: ProjectSightShellProps) {
  return (
    <div className="ps-root flex h-full min-h-screen flex-col bg-[var(--ps-bg)]">
      <ProjectSightTopBar breadcrumb={breadcrumb} />
      <div className="flex min-h-0 flex-1">
        {layout === 'rail' ? (
          <ProjectSightNavRail />
        ) : (
          <>
            <ProjectSightNavRail activeId="assist" />
            <ProjectSightProjectSidebar />
          </>
        )}
        <div className="flex min-w-0 flex-1 p-2">
          <div className={`ps-workspace-frame min-h-0 flex-1 ${glowFrame ? 'ps-workspace-frame--glow' : ''}`}>
            <div className="ps-workspace-inner min-h-[calc(100vh-var(--ps-topbar-height)-16px)]">{main}</div>
          </div>
        </div>
        <AssistPanel
          task="Uploading Drawing Document in ProjectSight"
          state={assistState}
          context={assistTask}
          onBackToWorkCenter={onBackToWorkCenter}
          onViewDrawing={() => undefined}
        />
      </div>
    </div>
  )
}
