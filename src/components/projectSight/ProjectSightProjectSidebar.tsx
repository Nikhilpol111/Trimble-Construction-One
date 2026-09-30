import {
  Camera,
  ClipboardList,
  FileStack,
  FileText,
  Home,
  Layers,
  Receipt,
  Wallet,
} from 'lucide-react'

const projectNav = [
  { label: 'Home', icon: Home },
  { label: 'Drawings', icon: Layers, active: true },
  { label: 'Specifications', icon: FileStack },
  { label: 'Photos', icon: Camera },
]

const recordsNav = [
  { label: 'RFIs', icon: FileText },
  { label: 'Submittals', icon: FileStack },
  { label: 'Punch items', icon: ClipboardList },
  { label: 'Issues', icon: FileText },
  { label: 'Daily reports', icon: FileText },
  { label: 'Checklists', icon: ClipboardList },
]

const financialNav = [
  { label: 'Contracts', icon: FileText },
  { label: 'Budget', icon: Wallet },
  { label: 'Purchase orders', icon: Receipt },
]

function NavSection({
  title,
  items,
}: {
  title: string
  items: { label: string; icon: typeof Home; active?: boolean }[]
}) {
  return (
    <div className="mb-4">
      <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-wide text-[#94a3b8]">{title}</p>
      <ul>
        {items.map(({ label, icon: Icon, active }) => (
          <li key={label}>
            <button
              type="button"
              className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-[13px] ${
                active
                  ? 'bg-[var(--ps-active-bg)] font-medium text-[var(--ps-brand)]'
                  : 'text-[var(--ps-text)] hover:bg-[#f8fafc]'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0 opacity-70" strokeWidth={1.75} />
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ProjectSightProjectSidebar() {
  return (
    <aside
      className="flex w-[var(--ps-sidebar-width)] shrink-0 flex-col border-r border-[var(--ps-border)] bg-[var(--ps-surface)] py-4"
      aria-label="Project navigation"
    >
      <NavSection title="Project" items={projectNav} />
      <NavSection title="Records" items={recordsNav} />
      <NavSection title="Financial" items={financialNav} />
      <div className="mt-auto px-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--ps-brand)] text-xs font-semibold text-white">
          S
        </div>
      </div>
    </aside>
  )
}
