import {
  ChevronUp,
  FileText,
  FolderKanban,
  Home,
  LayoutGrid,
  SquarePen,
} from 'lucide-react'
import { TrimbleWordmark } from '../onboarding/TrimbleLogo'
import { workCenterChatItems, workCenterMainNav } from '../../data/workCenter'
import type { WorkCenterNavId } from '../../types/workCenter'
import { UserProfile } from './UserProfile'

const navIcons: Record<WorkCenterNavId, typeof Home> = {
  home: Home,
  projects: FolderKanban,
  'my-work': LayoutGrid,
  files: FileText,
}

export type WorkCenterSidebarProps = {
  activeNav?: WorkCenterNavId
}

export function WorkCenterSidebar({ activeNav = 'home' }: WorkCenterSidebarProps) {
  return (
    <aside className="wc-root flex h-full w-[var(--wc-sidebar-width)] shrink-0 flex-col border-r border-[var(--wc-border)] bg-[var(--wc-surface)]">
      <div className="px-4 pb-3 pt-4">
        <TrimbleWordmark />
      </div>
      <nav className="flex-1 overflow-auto px-2 pt-1">
        <ul className="space-y-0.5">
          {workCenterMainNav.map((item) => {
            const Icon = navIcons[item.id]
            const active = item.id === activeNav
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm ${
                    active
                      ? 'border-l-[3px] border-[var(--wc-active-border)] bg-[var(--wc-active-bg)] pl-[9px] font-semibold text-[var(--wc-text)]'
                      : 'border-l-[3px] border-transparent font-medium text-[var(--wc-muted)] hover:bg-[#f3f6f9]'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 ${active ? 'text-[var(--wc-brand-mid)]' : ''}`}
                    strokeWidth={1.75}
                  />
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
        <div className="mt-5 px-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--wc-muted)]">Chats</span>
            <div className="flex items-center gap-1 text-[var(--wc-muted-light)]">
              <button type="button" aria-label="Compose chat" className="rounded p-0.5 hover:bg-[#f3f6f9]">
                <SquarePen className="h-3.5 w-3.5" />
              </button>
              <ChevronUp className="h-3.5 w-3.5" />
            </div>
          </div>
          <ul className="mt-2 space-y-1.5">
            {workCenterChatItems.map((chat) => (
              <li key={chat}>
                <button
                  type="button"
                  className="w-full truncate text-left text-xs text-[var(--wc-muted)] hover:text-[var(--wc-text)]"
                >
                  {chat}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <div className="border-t border-[var(--wc-border)] px-4 py-3">
        <UserProfile />
      </div>
    </aside>
  )
}
