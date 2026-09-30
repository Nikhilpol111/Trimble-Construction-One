import { Check, Plus, Search, Sparkles } from 'lucide-react'

export type ProjectCard = {
  id: string
  name: string
  subtitle: string
  imageClass: string
  selectedByAssist?: boolean
}

const projects: ProjectCard[] = [
  {
    id: 'eilans',
    name: 'Eilans Bungalow',
    subtitle: 'UX_GC',
    imageClass: 'bg-gradient-to-br from-slate-400 via-slate-500 to-slate-700',
    selectedByAssist: true,
  },
  {
    id: 'harbor-1',
    name: 'Harbor Point Retail',
    subtitle: 'Meridian Build',
    imageClass: 'bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-600',
  },
  {
    id: 'harbor-2',
    name: 'Harbor Point Retail',
    subtitle: 'Meridian Build',
    imageClass: 'bg-gradient-to-br from-amber-200 via-orange-300 to-rose-400',
  },
]

export type ProjectSightProjectsProps = {
  selectedId: string
  onSelect: (id: string) => void
  onContinue: () => void
}

export function ProjectSightProjects({ selectedId, onSelect, onContinue }: ProjectSightProjectsProps) {
  return (
    <div className="flex flex-1 flex-col overflow-auto bg-[var(--ps-surface)] p-6 lg:p-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-[var(--ps-text)]">Projects</h1>
          <p className="mt-1 text-sm text-[var(--ps-muted)]">Select a project to continue</p>
        </div>
        <div className="relative w-full max-w-[220px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--ps-muted)]" />
          <input
            type="search"
            value="Eilans Bungalow"
            readOnly
            className="w-full rounded-md border border-[var(--ps-border)] bg-[var(--ps-surface)] py-2 pl-9 pr-3 text-sm outline-none"
            aria-label="Search projects"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <button
          type="button"
          className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#cbd5e1] bg-[#fafbfc] text-sm font-medium text-[var(--ps-muted)] hover:border-[var(--ps-brand)] hover:text-[var(--ps-brand)]"
        >
          <Plus className="mb-2 h-6 w-6" />
          Add Project
        </button>
        {projects.map((project) => {
          const selected = selectedId === project.id
          return (
            <button
              key={project.id}
              type="button"
              onClick={() => onSelect(project.id)}
              className={`relative overflow-hidden rounded-lg border-2 text-left transition-colors ${
                selected ? 'border-[var(--ps-brand)]' : 'border-transparent shadow-sm ring-1 ring-[var(--ps-border)]'
              }`}
            >
              <div className={`h-[120px] w-full ${project.imageClass}`} aria-hidden />
              <div className="bg-white p-3">
                <p className="text-sm font-semibold text-[var(--ps-text)]">{project.name}</p>
                <p className="text-xs text-[var(--ps-muted)]">{project.subtitle}</p>
                {project.selectedByAssist && selected ? (
                  <span
                    className="mt-2 inline-flex items-center gap-1 rounded-full bg-[var(--ps-filled-badge)] px-2 py-0.5 text-[10px] font-semibold text-[var(--ps-filled-text)]"
                  >
                    <Sparkles className="h-3 w-3" />
                    Selected by Assist
                  </span>
                ) : null}
              </div>
              {selected ? (
                <span
                  className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--ps-brand)] text-white"
                  aria-hidden
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={onContinue}
          disabled={!selectedId}
          className="rounded-md bg-[var(--ps-brand)] px-5 py-2 text-sm font-semibold text-white disabled:opacity-40"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export function getProjectNameById(id: string): string {
  return projects.find((p) => p.id === id)?.name ?? 'Eilans Bungalow'
}
