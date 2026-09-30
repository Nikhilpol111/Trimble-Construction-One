import type { ComparisonMode } from '../../types/designReview'
import { useDesignReview } from '../../context/DesignReviewContext'

type SketchUpModelViewProps = {
  mode: 'select' | 'selected' | 'comparison' | 'findings'
  comparisonMode?: ComparisonMode
  onComparisonModeChange?: (mode: ComparisonMode) => void
}

export function SketchUpModelView({
  mode,
  comparisonMode = 'current',
  onComparisonModeChange,
}: SketchUpModelViewProps) {
  const { selectWall } = useDesignReview()
  const wallSelected = mode === 'selected' || mode === 'comparison' || mode === 'findings'
  const showPrevious = mode === 'comparison' && comparisonMode === 'previous'
  const showOverlay = mode === 'comparison' && comparisonMode === 'overlay'
  const wallX =
    mode === 'comparison' && comparisonMode === 'previous'
      ? 348
      : mode === 'comparison' && comparisonMode === 'overlay'
        ? 366
        : mode === 'comparison'
          ? 366
          : 366

  return (
    <div className="dr-model-workspace relative min-h-[480px]">
      {mode === 'select' ? (
        <div className="dr-model-banner">
          <span className="text-amber-600">📍</span>
          Referenced area highlighted — select the changed wall to inspect
        </div>
      ) : null}
      {mode === 'selected' ? (
        <div className="absolute left-1/2 top-16 z-10 -translate-x-1/2 rounded-md border border-[var(--ps-border)] bg-white px-3 py-2 text-center shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--ps-muted)]">
            Selected entity
          </p>
          <p className="text-xs font-semibold text-[var(--ps-text)]">Mechanical Room East Wall</p>
        </div>
      ) : null}
      {mode === 'comparison' ? (
        <div className="absolute left-4 right-4 top-4 z-10 flex justify-center">
          <div className="inline-flex rounded-lg border border-[var(--ps-border)] bg-white p-0.5 text-xs font-semibold">
            {(
              [
                ['previous', 'Previous (V17)'],
                ['current', 'Current (V18)'],
                ['overlay', 'Overlay'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => onComparisonModeChange?.(id)}
                className={`rounded-md px-3 py-1.5 ${
                  comparisonMode === id
                    ? 'bg-[var(--ps-active-bg)] text-[var(--ps-brand)]'
                    : 'text-[var(--ps-muted)]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
      <svg viewBox="0 0 520 360" className="h-[min(420px,70vh)] w-full max-w-2xl px-4" role="img">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="520" height="360" fill="url(#grid)" />
        {/* Structure */}
        <g opacity="0.85">
          <path d="M120 260 L260 190 L400 260 L260 330 Z" fill="#cbd5e1" stroke="#94a3b8" />
          <path d="M260 190 L260 120 L400 190 L400 260 Z" fill="#94a3b8" stroke="#64748b" />
          <path d="M120 260 L120 190 L260 120 L260 190 Z" fill="#64748b" stroke="#475569" />
          <line x1="120" y1="260" x2="400" y2="260" stroke="#475569" strokeWidth="2" />
          <line x1="260" y1="190" x2="260" y2="330" stroke="#475569" strokeWidth="2" />
        </g>
        {/* Mechanical room highlight */}
        <rect x="292" y="148" width="56" height="44" fill="#fef3c7" fillOpacity="0.35" stroke="#fbbf24" strokeDasharray="4 3" />
        {/* Equipment */}
        <rect x="304" y="162" width="28" height="18" fill="#d97706" rx="2" />
        {/* Wall - previous position (overlay) */}
        {showOverlay ? (
          <rect x="348" y="148" width="8" height="44" fill="#94a3b8" fillOpacity="0.55" stroke="#64748b" strokeDasharray="3 2" />
        ) : null}
        {/* East wall — use SVG g + rect (HTML button inside SVG is not clickable in most browsers) */}
        <g
          role="button"
          tabIndex={mode === 'select' ? 0 : -1}
          aria-label="Mechanical Room East Wall"
          className={mode === 'select' ? 'cursor-pointer outline-none' : ''}
          onClick={mode === 'select' ? selectWall : undefined}
          onKeyDown={(e) => {
            if (mode !== 'select') return
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              selectWall()
            }
          }}
        >
          {mode === 'select' ? (
            <>
              <rect
                x="328"
                y="136"
                width="48"
                height="68"
                fill="#fbbf24"
                fillOpacity="0.15"
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="5 3"
                rx="2"
              />
              <rect
                x="328"
                y="136"
                width="48"
                height="68"
                fill="transparent"
                style={{ pointerEvents: 'all' }}
              />
            </>
          ) : null}
          <rect
            x={showPrevious ? 348 : wallX}
            y="148"
            width="8"
            height="44"
            fill={wallSelected ? '#0076a8' : '#fde68a'}
            stroke={wallSelected ? '#003b5c' : '#f59e0b'}
            strokeWidth={wallSelected ? 2 : 1}
            style={{ pointerEvents: 'all' }}
          />
        </g>
      </svg>
      {mode === 'select' ? (
        <button
          type="button"
          onClick={selectWall}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 rounded-md border border-[#f59e0b] bg-white px-4 py-2 text-sm font-semibold text-[#92400e] shadow-md hover:bg-[#fffbeb]"
        >
          Select Mechanical Room East Wall
        </button>
      ) : null}
    </div>
  )
}

export function ImpactFindingsMainView() {
  const findings = [
    {
      num: 1,
      label: 'DESIGN CHANGE',
      body: 'Mechanical Room East Wall shifted 450 mm east.',
      source: 'SketchUp · NorthRidge_Design_v18',
    },
    {
      num: 2,
      label: 'RELATED COORDINATION COMMENT',
      body: 'MEP Coordinator previously flagged clearance in this area.',
      source: 'Trimble Connect · Alex Morgan comment',
    },
    {
      num: 3,
      label: 'POSSIBLY OUTDATED DRAWING',
      body: 'Drawing A-204 still shows the previous wall position.',
      source: 'ProjectSight · Drawing A-204',
    },
    {
      num: 4,
      label: 'OPEN RFI',
      body: 'RFI-087 discusses minimum service clearance in the same area.',
      source: 'ProjectSight · RFI-087',
    },
  ]

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-wrap items-start gap-3">
        <span className="text-amber-500">⚠</span>
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold text-[var(--ps-text)]">Coordination impact detected</h1>
          <p className="mt-1 max-w-2xl text-sm text-[var(--ps-muted)]">
            The mechanical-room wall shift may affect the currently documented MEP service clearance.
          </p>
          <p className="mt-2 text-xs text-[var(--ps-muted)]">
            <span className="mr-2 inline-flex rounded-full bg-[#dcfce7] px-2 py-0.5 font-semibold text-[#166534]">
              Confidence: High
            </span>
            Based on 4 connected project sources.
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {findings.map((f) => (
          <div key={f.num} className="dr-finding-card">
            <span className="mb-2 inline-flex h-6 w-6 items-center justify-center rounded bg-[var(--ps-active-bg)] text-[11px] font-bold text-[var(--ps-brand)]">
              {f.num}
            </span>
            <p className="dr-finding-card__label">{f.label}</p>
            <p className="dr-finding-card__body">{f.body}</p>
            <span className="dr-source-link">{f.source} ↗</span>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-lg border border-[#fed7aa] bg-[#fff7ed] px-4 py-3 text-sm text-[#9a3412]">
        💡 I found evidence of a coordination risk, but final constructability should be verified by the
        project team.
      </div>
    </div>
  )
}
