import { NavLink } from 'react-router-dom'
import type { NavItem } from '../../types'
import type { ReactNode } from 'react'

export type SidebarProps = {
  items: NavItem[]
  header?: string
  footer?: ReactNode
}

export function Sidebar({ items, header = 'Navigation', footer }: SidebarProps) {
  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-[var(--color-border)] bg-[var(--color-surface-raised)]">
      <div className="border-b border-[var(--color-border)] px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
          {header}
        </p>
      </div>
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? 'bg-[var(--color-surface)] font-medium text-[var(--color-text)]'
                      : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]'
                  }`
                }
              >
                {item.icon ? <item.icon className="h-4 w-4 shrink-0" /> : null}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {footer ? <div className="border-t border-[var(--color-border)] p-3">{footer}</div> : null}
    </aside>
  )
}
