import type { ReactNode } from 'react'
import { AssistPanel } from '../assist/AssistPanel'
import { ProjectSightNavRail } from './ProjectSightNavRail'
import { ProjectSightProjectSidebar } from './ProjectSightProjectSidebar'
import { ProjectSightTopBar } from './ProjectSightTopBar'
import type { UploadFlowState, UploadTask } from '../../types/uploadDrawing'

export type ProjectSightShellProps = {
 breadcrumb: string[]; layout: 'rail' | 'drawings'; glowFrame?: boolean; main: ReactNode
 assistState: UploadFlowState; assistTask: UploadTask; onBackToWorkCenter: () => void
 dimWorkspace?: boolean; onViewDrawing?: () => void
}
export function ProjectSightShell({breadcrumb,layout,glowFrame=true,main,assistState,assistTask,onBackToWorkCenter,dimWorkspace,onViewDrawing}:ProjectSightShellProps) {
 return <div className="ps-root upload-shell" data-upload-state={assistState}>
  <ProjectSightTopBar breadcrumb={breadcrumb}/>
  <div className="upload-shell-body">
   <ProjectSightNavRail/>
   <section className={`ps-workspace-frame ${glowFrame?'ps-workspace-frame--glow':''}`} aria-label="ProjectSight workspace">
    <div className="upload-workspace-layout">
     {layout==='drawings' && <ProjectSightProjectSidebar/>}
     <main className="ps-workspace-inner">{main}</main>
    </div>
    {dimWorkspace && <div className="upload-workspace-dim" aria-hidden="true"/>}
   </section>
   <AssistPanel task="Uploading Drawing Document in ProjectSight" state={assistState} context={assistTask}
    onClose={onBackToWorkCenter} onBackToWorkCenter={onBackToWorkCenter} onViewDrawing={onViewDrawing}/>
  </div>
 </div>
}
