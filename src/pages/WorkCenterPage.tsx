import type { ReactNode } from 'react'
import {
  AccountsPayableWidget,
  AnalyticsWidget,
  CustomerAgingWidget,
  DashboardGrid,
  OnTrackWidget,
  TrimbleConnectProjectsWidget,
  UnapprovedInvoicesWidget,
  WorkCenterLayout,
} from '../components/workCenter'
import {
  DashboardEditMode,
  GeneratedWidgetsOverlays,
  RecentActivityWidget,
  WidgetAddedToast,
} from '../components/generatedWidgets'
import { useGeneratedWidgets } from '../context/GeneratedWidgetsContext'
import type { DashboardWidgetId } from '../types/generatedWidgets'

function renderWidget(id: DashboardWidgetId, title: string): ReactNode {
  switch (id) {
    case 'analytics':
      return <AnalyticsWidget />
    case 'accounts-payable-overview':
      return <AccountsPayableWidget />
    case 'unapproved-invoices':
      return <UnapprovedInvoicesWidget />
    case 'customer-aging':
      return <CustomerAgingWidget />
    case 'trimble-connect-projects':
      return <TrimbleConnectProjectsWidget />
    case 'on-track':
      return <OnTrackWidget />
    case 'recent-activity':
      return <RecentActivityWidget title={title} />
    default:
      return null
  }
}

export function WorkCenterPage() {
  const {
    flowState,
    dashboardLayout,
    widgetConfig,
    openCustomiseDashboard,
  } = useGeneratedWidgets()

  const hideComposer =
    flowState === 'generatedOptions' ||
    flowState === 'widgetPreview' ||
    flowState === 'dashboardCustomise'

  if (flowState === 'dashboardCustomise') {
    return (
      <WorkCenterLayout hideComposer>
        <DashboardEditMode />
      </WorkCenterLayout>
    )
  }

  return (
    <WorkCenterLayout hideComposer={hideComposer}>
      <div className="px-6 py-5 lg:px-8">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-[28px] font-bold leading-none text-[var(--wc-text)]">Hello!</h1>
            <p className="mt-1.5 text-sm text-[var(--wc-muted)]">Your Work Center view for today</p>
          </div>
          <button
            type="button"
            onClick={openCustomiseDashboard}
            className="rounded-md border border-[#b8d4e8] bg-[var(--wc-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--wc-brand-mid)]"
          >
            Manage widgets
          </button>
        </div>
        <DashboardGrid>
          {dashboardLayout.map((id) => (
            <div key={id}>{renderWidget(id, widgetConfig.title)}</div>
          ))}
        </DashboardGrid>
      </div>
      <GeneratedWidgetsOverlays />
      <WidgetAddedToast />
    </WorkCenterLayout>
  )
}
