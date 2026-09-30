import { invoiceSummary } from '../../../data/workCenter'
import { DashboardWidget } from '../DashboardWidget'
import { DonutChart, LegendRow } from '../DonutChart'

export function UnapprovedInvoicesWidget() {
  const segments = invoiceSummary.buckets.map((b) => ({ value: b.count, color: b.color }))

  return (
    <DashboardWidget title="Unapproved Invoices" productLabel="Work Center • Viewpoint ERP">
      <div className="flex flex-1 gap-3">
        <DonutChart segments={segments} centerLabel={`${invoiceSummary.totalCount}\ninvoices`} />
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--wc-muted-light)]">
              Total Amount
            </p>
            <p className="text-lg font-bold text-[var(--wc-text)]">{invoiceSummary.totalAmount}</p>
          </div>
          <div className="space-y-1">
            {invoiceSummary.buckets.map((b) => (
              <LegendRow key={b.label} color={b.color} label={b.label} value={String(b.count)} compact />
            ))}
          </div>
        </div>
      </div>
    </DashboardWidget>
  )
}
