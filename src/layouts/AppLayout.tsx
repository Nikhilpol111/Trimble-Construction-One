import type { ReactNode } from 'react'
import { AppShell } from '../components/app'
import { AssistPanel } from '../components/assist'
import { Sidebar } from '../components/app/Sidebar'
import { mainNavItems } from '../data/mockNav'

export type AppLayoutProps = {
  title?: string
  children: ReactNode
  showAssist?: boolean
}

export function AppLayout({ title, children, showAssist = true }: AppLayoutProps) {
  return (
    <AppShell
      title={title}
      sidebar={<Sidebar items={mainNavItems} />}
      assistPanel={showAssist ? <AssistPanel /> : undefined}
    >
      {children}
    </AppShell>
  )
}
