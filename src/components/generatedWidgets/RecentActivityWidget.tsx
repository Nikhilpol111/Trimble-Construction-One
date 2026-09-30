import { DashboardWidget } from '../workCenter/DashboardWidget'
import { ActivityListCompact } from './ActivityListContent'

export function RecentActivityWidget({ title }: { title: string }) {
  const displayTitle = title.includes('—')
    ? title.split('—')[0].trim()
    : title
  const product = title.includes('—') ? title.split('—')[1].trim() : 'Trimble Connect'

  return (
    <DashboardWidget title={displayTitle} productLabel={product}>
      <ActivityListCompact />
    </DashboardWidget>
  )
}
