import type { ReactNode } from 'react'
import type { WidgetConfig } from '../../types/generatedWidgets'

const projectOptions = ['All accessible projects', 'North Ridge Infrastructure', 'Eilans Bungalow']
const activityOptions = ['All activity', 'Uploads only', 'Comments only', 'Revisions only']
const timeOptions = ['Last 24 hours', 'Last 7 days', 'Last 30 days']

export function WidgetConfigForm({
  config,
  onChange,
}: {
  config: WidgetConfig
  onChange: (patch: Partial<WidgetConfig>) => void
}) {
  return (
    <div className="space-y-4">
      <Field label="Widget title">
        <input
          type="text"
          value={config.title}
          onChange={(e) => onChange({ title: e.target.value })}
          className="gw-field-input"
        />
      </Field>
      <Field label="Project filter">
        <select
          value={config.projectFilter}
          onChange={(e) => onChange({ projectFilter: e.target.value })}
          className="gw-field-input"
        >
          {projectOptions.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </Field>
      <Field label="Activity type">
        <select
          value={config.activityType}
          onChange={(e) => onChange({ activityType: e.target.value })}
          className="gw-field-input"
        >
          {activityOptions.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </Field>
      <Field label="Time range">
        <select
          value={config.timeRange}
          onChange={(e) => onChange({ timeRange: e.target.value })}
          className="gw-field-input"
        >
          {timeOptions.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </Field>
    </div>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[var(--wc-muted)]">
        {label}
      </label>
      {children}
    </div>
  )
}
