import { Filter, Plus, Search } from 'lucide-react'
import { eilansDrawings } from '../../data/projectSightDrawings'

function DrawingThumbnail() {
  return (
    <svg viewBox="0 0 120 80" className="h-full w-full text-[#cbd5e1]" aria-hidden>
      <rect width="120" height="80" fill="#f8fafc" />
      <rect x="12" y="10" width="96" height="60" fill="none" stroke="currentColor" strokeWidth="1" />
      <line x1="12" y1="40" x2="108" y2="40" stroke="currentColor" strokeWidth="0.75" />
      <line x1="60" y1="10" x2="60" y2="70" stroke="currentColor" strokeWidth="0.75" />
      <rect x="20" y="48" width="28" height="14" fill="none" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  )
}

export function ProjectSightDrawings({ onUploadClick }: { onUploadClick?: () => void }) {
  return (
    <div className="flex flex-1 flex-col overflow-auto bg-[var(--ps-surface)] p-6">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-[var(--ps-text)]">Drawings</h1>
          <p className="mt-0.5 text-sm text-[var(--ps-muted)]">Eilans Bungalow · 6 drawings</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--ps-muted)]" />
            <input
              type="search"
              placeholder="Search drawings"
              className="w-[180px] rounded-md border border-[var(--ps-border)] py-1.5 pl-8 pr-3 text-sm outline-none"
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--ps-border)] px-3 py-1.5 text-sm font-medium"
          >
            <Filter className="h-4 w-4 text-[var(--ps-muted)]" />
            Filter
          </button>
          <button
            type="button"
            onClick={onUploadClick}
            className="inline-flex items-center gap-1 rounded-md bg-[var(--ps-brand)] px-3 py-1.5 text-sm font-semibold text-white"
          >
            <Plus className="h-4 w-4" />
            Upload
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {eilansDrawings.map((drawing) => (
          <article
            key={drawing.id}
            className="overflow-hidden rounded-lg border border-[var(--ps-border)] bg-white shadow-sm"
          >
            <div className="relative aspect-[4/3] border-b border-[var(--ps-border-light)] bg-[#fafbfc] p-2">
              <span className="absolute right-2 top-2 rounded bg-white px-1.5 py-0.5 text-[10px] font-medium text-[var(--ps-muted)] shadow-sm">
                {drawing.revision}
              </span>
              <DrawingThumbnail />
            </div>
            <div className="px-3 py-2.5">
              <p className="text-sm font-bold text-[var(--ps-brand)]">{drawing.number}</p>
              <p className="text-xs text-[var(--ps-muted)]">{drawing.title}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
