import { useState } from 'react'
import { useDesignReview } from '../../context/DesignReviewContext'

export function EvidenceInspectionMainView() {
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <article className="w-full max-w-lg rounded-lg border border-[var(--ps-border)] bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-[var(--ps-text)]">RFI-087</h1>
            <p className="text-sm text-[var(--ps-muted)]">Mechanical services clearance</p>
          </div>
          <span className="rounded-full bg-[#ffedd5] px-2.5 py-0.5 text-xs font-semibold text-[#c2410c]">
            Open
          </span>
        </div>
        <div className="mt-6 space-y-4 text-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ps-muted)]">Question</p>
            <p className="mt-1 text-[var(--ps-text)]">
              What is the minimum required clearance around mechanical services at the Level 3 mechanical room?
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--ps-muted)]">Raised by</p>
            <p className="mt-0.5 text-[var(--ps-text)]">Alex Morgan · MEP Coordinator</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--ps-muted)]">Location</p>
            <p className="mt-0.5 text-[var(--ps-text)]">Mechanical room east wall · Level 3</p>
          </div>
        </div>
      </article>
    </div>
  )
}

export function IssueDraftMainView() {
  const { state, updateDraftIssue, createIssue } = useDesignReview()
  const [editing, setEditing] = useState(false)
  const { draftIssue } = state

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-4xl rounded-lg border border-[var(--ps-border)] bg-white shadow-sm">
        <div className="rounded-t-lg border-b border-[#e9d5ff] bg-[#faf5ff] px-4 py-2.5 text-xs font-medium text-[#6b21a8]">
          ✨ AI-generated draft — review before creating
        </div>
        <div className="p-6">
          <h1 className="text-xl font-bold text-[var(--ps-text)]">Review coordination issue</h1>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              <Field label="Destination" value="ProjectSight" readOnly />
              <Field label="Project" value="North Ridge Infrastructure" readOnly />
              <Field
                label="Issue Title"
                value={draftIssue.title}
                readOnly={!editing}
                onChange={(v) => updateDraftIssue({ title: v })}
              />
              <div>
                <label className="text-xs font-semibold text-[var(--ps-muted)]">Description</label>
                {editing ? (
                  <textarea
                    value={draftIssue.description}
                    onChange={(e) => updateDraftIssue({ description: e.target.value })}
                    rows={5}
                    className="mt-1 w-full rounded-md border border-[var(--ps-border)] px-3 py-2 text-sm"
                  />
                ) : (
                  <p className="mt-1 text-sm leading-relaxed text-[var(--ps-text)]">{draftIssue.description}</p>
                )}
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field
                  label="Priority"
                  value={draftIssue.priority}
                  readOnly={!editing}
                  onChange={(v) => updateDraftIssue({ priority: v })}
                />
                <Field
                  label="Assignee"
                  value={draftIssue.assignee}
                  readOnly={!editing}
                  onChange={(v) => updateDraftIssue({ assignee: v })}
                />
                <div>
                  <label className="text-xs font-semibold text-[var(--ps-muted)]">Due Date</label>
                  <input
                    type="date"
                    value={draftIssue.dueDate}
                    onChange={(e) => updateDraftIssue({ dueDate: e.target.value })}
                    className="mt-1 w-full rounded-md border border-[var(--ps-border)] px-2 py-1.5 text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg border border-[var(--ps-border)] bg-[#f8fafc] p-3">
                <p className="text-xs font-semibold text-[var(--ps-muted)]">Model snapshot</p>
                <div className="mt-2 aspect-video rounded bg-white p-2">
                  <svg viewBox="0 0 200 120" className="h-full w-full">
                    <path d="M30 80 L100 50 L170 80 L100 110 Z" fill="#cbd5e1" />
                    <rect x="118" y="42" width="6" height="28" fill="#0076a8" />
                  </svg>
                </div>
                <p className="mt-2 text-[11px] text-[var(--ps-muted)]">SketchUp · East Wall · v18</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--ps-muted)]">Linked evidence</p>
                <ul className="mt-2 space-y-1.5 text-xs text-[var(--ps-text)]">
                  {[
                    'SketchUp · Mechanical Room East Wall',
                    'Trimble Connect · v18 · Morgan comment',
                    'ProjectSight · Drawing A-204',
                    'ProjectSight · RFI-087',
                  ].map((tag) => (
                    <li key={tag} className="rounded-md border border-[var(--ps-border-light)] bg-[#f8fafc] px-2 py-1.5">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--ps-border-light)] pt-4">
            <p className="text-xs text-[var(--ps-muted)]">Nothing is created until you confirm.</p>
            <div className="flex flex-wrap gap-2">
              <button type="button" className="rounded-md border border-[var(--ps-border)] px-4 py-2 text-sm font-semibold">
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setEditing((e) => !e)}
                className="inline-flex items-center gap-2 rounded-md border border-[var(--ps-border)] px-4 py-2 text-sm font-semibold"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={createIssue}
                className="rounded-md bg-[var(--ps-brand-dark)] px-4 py-2 text-sm font-semibold text-white"
              >
                Create Issue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function IssueCreatedMainView() {
  const { state } = useDesignReview()
  const refs = [
    'SketchUp · Mechanical Room East Wall',
    'Trimble Connect · Model v18',
    'ProjectSight · Drawing A-204',
    'ProjectSight · RFI-087',
  ]

  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="w-full max-w-xl text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#dcfce7] text-2xl text-[#166534]">
          ✓
        </div>
        <h1 className="mt-4 text-xl font-bold text-[var(--ps-text)]">
          Coordination Issue #{state.issueNumber} created
        </h1>
        <p className="mt-1 text-sm text-[var(--ps-muted)]">ProjectSight · North Ridge Infrastructure</p>
        <div className="mt-6 rounded-lg bg-[#f1f5f9] px-4 py-3 text-left">
          <p className="text-sm font-medium text-[var(--ps-text)]">{state.draftIssue.title}</p>
          <span className="mt-2 inline-block text-xs font-semibold text-[#c2410c]">Open</span>
        </div>
        <p className="mt-6 text-left text-[10px] font-bold uppercase tracking-wide text-[var(--ps-muted)]">
          Connected references
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2 text-left">
          {refs.map((ref) => (
            <span
              key={ref}
              className="rounded-full border border-[var(--ps-border)] bg-white px-3 py-1.5 text-[11px] text-[var(--ps-text)]"
            >
              {ref}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  readOnly,
  onChange,
}: {
  label: string
  value: string
  readOnly?: boolean
  onChange?: (v: string) => void
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-[var(--ps-muted)]">{label}</label>
      {readOnly ? (
        <p className="mt-1 text-sm text-[var(--ps-text)]">{value}</p>
      ) : (
        <input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="mt-1 w-full rounded-md border border-[var(--ps-border)] px-3 py-1.5 text-sm"
        />
      )}
    </div>
  )
}
