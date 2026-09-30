import { Clock, FileText, Folder, Home, LayoutGrid } from 'lucide-react'

export function ProjectSightNavRail({ activeId = 'assist' }: { activeId?: string }) {
  const items = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'folder', icon: Folder, label: 'Projects' },
    { id: 'grid', icon: LayoutGrid, label: 'Modules' },
    { id: 'file', icon: FileText, label: 'Files' },
    { id: 'assist', icon: Clock, label: 'Activity' },
  ]

  return (
    <nav
      className="flex w-[var(--ps-rail-width)] shrink-0 flex-col items-center border-r border-[var(--ps-border)] bg-[var(--ps-surface)] py-3"
      aria-label="Product navigation"
    >
      {items.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          type="button"
          aria-label={label}
          className={`relative mb-1 flex h-10 w-10 items-center justify-center rounded-md text-[var(--ps-muted)] ${
            id === activeId ? 'bg-[var(--ps-active-bg)] text-[var(--ps-brand)]' : 'hover:bg-[#f8fafc]'
          }`}
        >
          {id === activeId ? (
            <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r bg-[var(--ps-brand)]" />
          ) : null}
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </button>
      ))}
      <div className="mt-auto flex h-9 w-9 items-center justify-center rounded-full bg-[var(--ps-brand)] text-sm font-semibold text-white">
        S
      </div>
    </nav>
  )
}
