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

export function WorkCenterTopBar() {
  return (
    <header className="flex h-[var(--wc-topbar-height)] shrink-0 items-center justify-between border-b border-[var(--wc-border)] bg-[var(--wc-surface)] px-5">
      <p className="text-sm text-[var(--wc-muted)]">
        <span className="font-medium text-[var(--wc-text)]">Work Center</span>
        <span className="mx-1.5 text-[var(--wc-muted-light)]">/</span>
        <span>Home</span>
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-[var(--wc-border)] bg-[var(--wc-surface)] px-3 py-1.5 text-xs font-medium text-[var(--wc-text)]"
        >
          <LayoutGrid className="h-3.5 w-3.5 text-[var(--wc-muted)]" />
          <span className="relative">
            Connected products
            <span className="absolute -right-2 top-0 h-1.5 w-1.5 rounded-full bg-[var(--wc-success)]" />
          </span>
          <ChevronDown className="h-3.5 w-3.5 text-[var(--wc-muted)]" />
        </button>
        <button
          type="button"
          className="rounded-md border border-[var(--wc-border)] p-2 text-[var(--wc-muted)]"
          aria-label="Sound"
        >
          <Volume2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--wc-border)] px-3 py-1.5 text-xs font-semibold text-[var(--wc-text)]"
        >
          <AssistMark />
          Assist
        </button>
        <button type="button" className="relative rounded-md p-2 text-[var(--wc-muted)]" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>
        <button type="button" className="rounded-md p-2 text-[var(--wc-muted)]" aria-label="Theme">
          <Sun className="h-4 w-4" />
        </button>
        <button type="button" className="rounded-md p-2 text-[var(--wc-muted)]" aria-label="More">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
    </header>
  )
}
