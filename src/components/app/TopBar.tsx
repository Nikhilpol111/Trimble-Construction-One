import type { ReactNode } from 'react'

export type TopBarProps = {
  title?: string
  leading?: ReactNode
  trailing?: ReactNode
}

export function TopBar({ title = 'Trimble Construction One', leading, trailing }: TopBarProps) {
  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface-raised)] px-4">
      <div className="flex min-w-0 items-center gap-3">
        {leading}
        <span className="truncate text-sm font-semibold">{title}</span>
      </div>
      {trailing ? <div className="flex items-center gap-2">{trailing}</div> : null}
    </header>
  )
}
