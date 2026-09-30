import { connectActivityItems } from '../../flows/generatedWidgets'
import type { ConnectActivityItem } from '../../types/generatedWidgets'
import { AssistMark } from './AssistMark'

function ActivityAvatar({ item }: { item: ConnectActivityItem }) {
  return (
    <span
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
      style={{ backgroundColor: item.avatarColor }}
    >
      {item.initials}
    </span>
  )
}

export function ActivityListCompact({ className = '' }: { className?: string }) {
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {connectActivityItems.map((item) => (
        <li key={item.id} className="flex items-start gap-2">
          <ActivityAvatar item={item} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] leading-snug text-[var(--wc-text)]">
              <span className="font-semibold">{item.userName}</span>{' '}
              <span className="font-normal">{item.verb}</span>{' '}
              <span className={item.subjectIsLink ? 'text-[var(--wc-brand-mid)]' : ''}>
                {item.subject}
              </span>
            </p>
          </div>
          <span className="shrink-0 text-[10px] text-[var(--wc-muted-light)]">{item.timeShort}</span>
        </li>
      ))}
    </ul>
  )
}

export function ActivityListDashboard({
  title,
  showGeneratedBadge = false,
  className = '',
}: {
  title: string
  showGeneratedBadge?: boolean
  className?: string
}) {
  return (
    <div className={className}>
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <AssistMark className="h-4 w-4" />
          <p className="text-sm font-bold text-[var(--wc-text)]">{title}</p>
        </div>
        {showGeneratedBadge ? (
          <span className="rounded-full border border-[#e9d5ff] bg-[#faf5ff] px-2 py-0.5 text-[9px] font-medium text-[#7c3aed]">
            ✦ Generated with Trimble Assist
          </span>
        ) : null}
      </div>
      <ul className="space-y-3">
        {connectActivityItems.map((item) => (
          <li key={item.id} className="flex items-start gap-2.5">
            <ActivityAvatar item={item} />
            <div className="min-w-0 flex-1">
              <p className="text-xs leading-snug text-[var(--wc-text)]">
                <span className="font-semibold">{item.userName}</span>{' '}
                {item.verb}{' '}
                {item.subjectIsLink ? (
                  <button type="button" className="text-[var(--wc-brand-mid)] hover:underline">
                    {item.subject}
                  </button>
                ) : (
                  item.subject
                )}
              </p>
            </div>
            <span className="shrink-0 text-[11px] text-[var(--wc-muted-light)]">{item.timeShort}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ActivityTimelineContent({ className = '' }: { className?: string }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {connectActivityItems.map((item, index) => (
        <li key={item.id} className="relative flex gap-2 pl-1">
          {index < connectActivityItems.length - 1 ? (
            <span
              className="absolute left-[5px] top-3 h-[calc(100%+4px)] w-px bg-[var(--wc-border)]"
              aria-hidden
            />
          ) : null}
          <span className="relative z-[1] mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--wc-brand-mid)]" />
          <div className="min-w-0 pb-1">
            <p className="text-[10px] leading-snug text-[var(--wc-text)]">
              <span className="font-semibold">{item.userName}</span> {item.verb}{' '}
              <span className={item.subjectIsLink ? 'text-[var(--wc-brand-mid)]' : 'font-medium'}>
                {item.subject}
              </span>
            </p>
            <p className="mt-0.5 text-[9px] text-[var(--wc-muted-light)]">{item.timeMeta}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export function ActivitySummaryContent({ className = '' }: { className?: string }) {
  const stats = [
    { label: 'FILES UPLOADED', value: 12 },
    { label: 'COMMENTS ADDED', value: 8 },
    { label: 'PROJECT UPDATES', value: 5 },
    { label: 'ACTIVE TODAY', value: 9 },
  ]
  const bars = [42, 68, 35, 55]

  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-md border border-[var(--wc-border-light)] bg-[#f8fafc] px-2 py-1.5"
          >
            <p className="text-[8px] font-semibold tracking-wide text-[var(--wc-muted-light)]">
              {stat.label}
            </p>
            <p className="text-lg font-bold leading-tight text-[var(--wc-text)]">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex h-10 items-end gap-1.5 px-1">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-[#b8d9ef]"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  )
}
