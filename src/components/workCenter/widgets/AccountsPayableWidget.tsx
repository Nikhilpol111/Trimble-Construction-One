import { accountsPayableBatches } from '../../../data/workCenter'
import { DashboardWidget } from '../DashboardWidget'

const toneStyles = {
  complete: { bar: 'bg-[#2d9a62]', text: 'text-[#2d9a62]' },
  prepare: { bar: 'bg-[#e6a817]', text: 'text-[#c8870a]' },
  upload: { bar: 'bg-[#5ba4d9]', text: 'text-[#1e6ea8]' },
}

export function AccountsPayableWidget() {
  return (
    <DashboardWidget title="Accounts Payable Overview" productLabel="Viewpoint ERP">
      <ul className="space-y-3">
        {accountsPayableBatches.map((batch) => {
          const tone = toneStyles[batch.tone]
          return (
            <li key={batch.id}>
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-medium text-[var(--wc-text)]">{batch.label}</span>
                <span className={`font-semibold ${tone.text}`}>{batch.status}</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#e8edf2]">
                <div
                  className={`h-full rounded-full ${tone.bar}`}
                  style={{ width: `${batch.progress}%` }}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </DashboardWidget>
  )
}
