type Segment = { value: number; color: string }

export function DonutChart({
  segments,
  centerLabel,
  size = 88,
  strokeWidth = 10,
}: {
  segments: Segment[]
  centerLabel: string
  size?: number
  strokeWidth?: number
}) {
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  let offset = 0

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e8edf2"
          strokeWidth={strokeWidth}
        />
        {segments.map((seg, i) => {
          const length = (seg.value / total) * circumference
          const dash = `${length} ${circumference - length}`
          const el = (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={dash}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          )
          offset += length
          return el
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[11px] font-semibold leading-tight text-[var(--wc-text)] whitespace-pre-line">
          {centerLabel}
        </span>
      </div>
    </div>
  )
}

export function LegendRow({
  color,
  label,
  value,
  compact,
}: {
  color: string
  label: string
  value: string
  compact?: boolean
}) {
  return (
    <div className={`flex items-center justify-between gap-2 ${compact ? 'text-[11px]' : 'text-xs'}`}>
      <span className="flex min-w-0 items-center gap-1.5 text-[var(--wc-muted)]">
        <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: color }} />
        <span className="truncate">{label}</span>
      </span>
      <span className="shrink-0 font-semibold text-[var(--wc-text)]">{value}</span>
    </div>
  )
}
