import {
  Bell,
  ChevronDown,
  LayoutGrid,
  MoreVertical,
  Sun,
  Volume2,
} from 'lucide-react'

function AssistMark() {
  return (
    <span
      className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#f06] via-[#f90] to-[#09f]"
      aria-hidden
    />
  )
}

export type ProjectSightTopBarProps = {
  breadcrumb: string[]
  assistActive?: boolean
}

export function ProjectSightTopBar({ breadcrumb, assistActive = true }: ProjectSightTopBarProps) {
  return (
    <header
      className="flex h-[var(--ps-topbar-height)] shrink-0 items-center justify-between border-b border-[var(--ps-border)] bg-[var(--ps-surface)] px-4"
    >
      <p className="text-sm text-[var(--ps-muted)]">
        {breadcrumb.map((part, i) => (
          <span key={part}>
            {i > 0 ? <span className="mx-1.5 text-[#cbd5e1]">/</span> : null}
            <span className={i === breadcrumb.length - 1 ? 'text-[var(--ps-text)]' : 'font-medium text-[var(--ps-text)]'}>
              {part}
            </span>
          </span>
        ))}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-[var(--ps-border)] bg-[var(--ps-surface)] px-3 py-1.5 text-xs font-medium text-[var(--ps-text)]"
        >
          <LayoutGrid className="h-3.5 w-3.5 text-[var(--ps-muted)]" />
          <span className="relative pr-2">
            Connected products
            <span className="absolute -right-0 top-0.5 h-1.5 w-1.5 rounded-full bg-[var(--ps-success)]" />
          </span>
          <ChevronDown className="h-3.5 w-3.5 text-[var(--ps-muted)]" />
        </button>
        <button
          type="button"
          className="rounded-md border border-[var(--ps-border)] p-2 text-[var(--ps-muted)]"
          aria-label="Sound"
        >
          <Volume2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold text-[var(--ps-text)] ${
            assistActive ? 'border-[#c4b5fd] bg-[#faf5ff]' : 'border-[var(--ps-border)]'
          }`}
        >
          <AssistMark />
          Assist
        </button>
        <button type="button" className="relative rounded-md p-2 text-[var(--ps-muted)]" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </button>
        <button type="button" className="rounded-md p-2 text-[var(--ps-muted)]" aria-label="Theme">
          <Sun className="h-4 w-4" />
        </button>
        <button type="button" className="rounded-md p-2 text-[var(--ps-muted)]" aria-label="More">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
    </header>
  )
}
