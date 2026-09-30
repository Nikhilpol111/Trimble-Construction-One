import type { ReactNode } from 'react'

export type MinimalLayoutProps = {
  children: ReactNode
}

export function MinimalLayout({ children }: MinimalLayoutProps) {
  return (
    <div className="flex min-h-full items-center justify-center bg-[var(--color-surface)] p-6">
      {children}
    </div>
  )
}
