import type { ReactNode } from 'react'
import { WorkCenterSidebar } from './WorkCenterSidebar'
import { WorkCenterTopBar } from './WorkCenterTopBar'
import { PromptComposer } from './PromptComposer'
import {
  DesignReviewMonitoringToast,
  DesignReviewReminderPill,
} from '../designReview/DesignReviewWorkCenterOverlays'

export function WorkCenterLayout({
  children,
  hideComposer = false,
}: {
  children: ReactNode
  hideComposer?: boolean
}) {
  return (
    <div className="wc-root flex h-full min-h-screen bg-[var(--wc-bg)]">
      <WorkCenterSidebar activeNav="home" />
      <div className="flex min-w-0 flex-1 flex-col">
        <WorkCenterTopBar />
        <div className="min-h-0 flex-1 overflow-auto pb-44">{children}</div>
        {hideComposer ? null : <PromptComposer />}
        <DesignReviewMonitoringToast />
        <DesignReviewReminderPill />
      </div>
    </div>
  )
}
