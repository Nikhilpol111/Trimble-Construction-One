export function ConnectProjectModelsView() {
  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-[var(--ps-text)]">Project models</h1>
      <p className="mt-1 text-sm text-[var(--ps-muted)]">Shared design models · updated today</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:max-w-3xl">
        <article className="overflow-hidden rounded-lg border-2 border-[var(--ps-brand)] bg-white shadow-sm">
          <div className="aspect-[4/3] bg-gradient-to-br from-[#e2e8f0] to-[#f8fafc] p-4">
            <svg viewBox="0 0 200 140" className="h-full w-full" aria-hidden>
              <path d="M40 100 L100 70 L160 100 L100 130 Z" fill="#cbd5e1" />
              <path d="M100 70 L100 40 L160 70 L160 100 Z" fill="#94a3b8" />
              <path d="M40 100 L40 70 L100 40 L100 70 Z" fill="#64748b" />
            </svg>
          </div>
          <div className="border-t border-[var(--ps-border-light)] px-3 py-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="text-lg" aria-hidden>
                  🔺
                </span>
                <p className="truncate text-sm font-semibold text-[var(--ps-text)]">
                  NorthRidge_Design_v18.skp
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-[var(--ps-active-bg)] px-2 py-0.5 text-[10px] font-bold text-[var(--ps-brand)]">
                Latest
              </span>
            </div>
            <p className="mt-1 text-xs text-[var(--ps-muted)]">Today · 8:15 AM · Design Team</p>
          </div>
        </article>
        <article className="overflow-hidden rounded-lg border border-[var(--ps-border)] bg-white">
          <div className="aspect-[4/3] bg-gradient-to-br from-[#e2e8f0] to-[#f8fafc] p-4 opacity-90">
            <svg viewBox="0 0 200 140" className="h-full w-full" aria-hidden>
              <path d="M40 100 L100 70 L160 100 L100 130 Z" fill="#cbd5e1" />
              <path d="M100 70 L100 40 L160 70 L160 100 Z" fill="#94a3b8" />
              <path d="M40 100 L40 70 L100 40 L100 70 Z" fill="#64748b" />
            </svg>
          </div>
          <div className="border-t border-[var(--ps-border-light)] px-3 py-3">
            <div className="flex items-center gap-2">
              <span className="text-lg" aria-hidden>
                🔺
              </span>
              <p className="truncate text-sm font-semibold text-[var(--ps-text)]">
                NorthRidge_Design_v17.skp
              </p>
            </div>
            <p className="mt-1 text-xs text-[var(--ps-muted)]">Aug 24 · 4:02 PM · Design Team</p>
          </div>
        </article>
      </div>
      <section className="mt-10 max-w-xl">
        <h2 className="text-sm font-bold text-[var(--ps-text)]">Model timeline</h2>
        <ul className="mt-4 space-y-4">
          {[
            { label: 'v18 uploaded by Design Team', time: '8:15 AM' },
            { label: 'Coordination comment added by Alex Morgan', time: '8:42 AM' },
            { label: 'v17 superseded', time: 'Aug 24' },
          ].map((row) => (
            <li key={row.label} className="flex items-start justify-between gap-4 text-sm">
              <span className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#cbd5e1]" />
                <span className="text-[var(--ps-text)]">{row.label}</span>
              </span>
              <span className="shrink-0 text-xs text-[var(--ps-muted)]">{row.time}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
