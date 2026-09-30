import { agingData } from '../../../data/workCenter'
import { DashboardWidget } from '../DashboardWidget'
import { DonutChart, LegendRow } from '../DonutChart'

export function CustomerAgingWidget() {
  const segments = agingData.segments.map((s) => ({
    value: parseFloat(s.value.replace(/[$,]/g, '')),
    color: s.color,
  }))

  return (
    <DashboardWidget title="Customer Aging Totals" productLabel="Viewpoint ERP">
      <div className="flex flex-1 gap-3">
        <DonutChart segments={segments} centerLabel={agingData.totalLabel} />
        <div className="flex min-w-0 flex-1 flex-col justify-center space-y-1.5">
          {agingData.segments.map((s) => (
            <LegendRow key={s.label} color={s.color} label={s.label} value={s.value} />
          ))}
        </div>
      </div>
    </DashboardWidget>
  )
}
