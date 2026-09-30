import type { ReactNode } from 'react'
import { TopBar } from './TopBar'

export type AppShellProps = {
  title?: string
  sidebar?: ReactNode
  assistPanel?: ReactNode
  topBarLeading?: ReactNode
  topBarTrailing?: ReactNode
  children: ReactNode
}

export function AppShell({
  title,
  sidebar,
  assistPanel,
  topBarLeading,
  topBarTrailing,
  children,
}: AppShellProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <TopBar title={title} leading={topBarLeading} trailing={topBarTrailing} />
      <div className="flex min-h-0 flex-1">
        {sidebar}
        <main className="min-w-0 flex-1 overflow-auto bg-[var(--color-surface)]">{children}</main>
        {assistPanel}
      </div>
    </div>
  )
}
