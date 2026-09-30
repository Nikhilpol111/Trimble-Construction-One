import { Check, ChevronRight, Circle, Loader2, Shield } from 'lucide-react'
import { designReviewSources } from '../../flows/designReview/constants'
import { investigationSteps } from '../../flows/designReview/investigationProgress'
import { useDesignReview } from '../../context/DesignReviewContext'

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-wide text-[#94a3b8]">{children}</p>
  )
}

export function DesignReviewAssistBody({
  completedStepIds,
  investigating,
}: {
  completedStepIds: string[]
  investigating: boolean
}) {
  const {
    state,
    openInSketchUp,
    selectWall,
    setSuggestedAction,
    openSourcePermission,
    toggleSource,
    cancelSourcePermission,
    startInvestigation,
    setFindingsAction,
    returnToImpactSummary,
    enableMonitoring,
    backToWorkCenter,
    backToSketchUpFromProjectSight,
    backToSelectionContext,
  } = useDesignReview()

  const { flowState, selectedSources } = state

  if (flowState === 'connectContext') {
    return (
      <div className="space-y-4">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xs font-semibold text-[var(--ps-text)]">Comments</h3>
            <button type="button" className="text-[var(--ps-muted)]" aria-label="Link">
              <span className="text-sm">🔗</span>
            </button>
          </div>
          <div className="dr-comment-card">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--ps-brand)] text-xs font-bold text-white">
                AM
              </span>
              <div>
                <p className="text-xs font-semibold text-[var(--ps-text)]">Alex Morgan</p>
                <p className="text-[11px] text-[var(--ps-muted)]">MEP Coordinator · 8:42 AM</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-[var(--ps-text)]">
              &ldquo;Please review the service clearance around the mechanical room. The latest model seems to
              have changed in this area.&rdquo;
            </p>
            <div className="mt-3 rounded-md bg-[#fef3c7] px-2.5 py-2 text-[11px] text-[#92400e]">
              <span className="font-medium">References:</span> Mechanical room · Level 3
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={openInSketchUp}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-[var(--ps-brand)] py-2.5 text-sm font-semibold text-white"
        >
          Open in SketchUp
        </button>
      </div>
    )
  }

  if (flowState === 'sketchupSelect') {
    return (
      <div className="space-y-4">
        <div className="flex flex-col items-center justify-center py-4 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg border-2 border-dashed border-[#cbd5e1] text-[var(--ps-muted)]">
            <span className="text-2xl">⌖</span>
          </div>
          <p className="text-sm font-semibold text-[var(--ps-text)]">Select an element to begin</p>
          <p className="mt-2 max-w-[220px] text-xs leading-relaxed text-[var(--ps-muted)]">
            Trimble Assist will pick up your selection context automatically.
          </p>
        </div>
        <button
          type="button"
          onClick={selectWall}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-[var(--ps-brand)] bg-[var(--ps-active-bg)] py-2.5 text-sm font-semibold text-[var(--ps-brand)]"
        >
          Select Mechanical Room East Wall
        </button>
        <p className="text-center text-[11px] text-[var(--ps-muted)]">
          Or click the highlighted east wall in the model.
        </p>
      </div>
    )
  }

  if (flowState === 'sketchupSelectionContext') {
    return (
      <div className="space-y-4">
        <p className="rounded-lg bg-[#f1f5f9] px-3 py-2.5 text-xs leading-relaxed text-[var(--ps-muted)]">
          This wall changed from the previous shared model — it moved about 450 mm east, which may reduce the
          adjacent service clearance.
        </p>
        <div>
          <SectionLabel>Suggested actions</SectionLabel>
          <div className="mt-2 space-y-2">
            <button
              type="button"
              onClick={() => setSuggestedAction('compare')}
              className="dr-assist-action dr-assist-action--primary"
            >
              Compare with previous version
            </button>
            <button type="button" className="dr-assist-action">
              Find related comments
            </button>
            <button type="button" className="dr-assist-action" onClick={openSourcePermission}>
              Check project impact
            </button>
            <button type="button" className="dr-assist-action">
              Explain this change
            </button>
          </div>
        </div>
        <p className="text-[11px] leading-relaxed text-[var(--ps-muted)]">
          Assist reads context from your selection. You stay in control of what to investigate next.
        </p>
      </div>
    )
  }

  if (flowState === 'sketchupComparison') {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-[var(--ps-border)] bg-white p-3">
          <p className="text-sm font-semibold text-[var(--ps-text)]">Mechanical Room East Wall</p>
          <dl className="mt-3 space-y-2 text-xs">
            <div className="flex justify-between gap-2">
              <dt className="text-[var(--ps-muted)]">Shifted</dt>
              <dd className="font-semibold text-[var(--ps-brand)]">450 mm east</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-[var(--ps-muted)]">Adjacent service clearance</dt>
              <dd className="font-semibold text-[#b45309]">Reduced</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-[var(--ps-muted)]">Related geometry</dt>
              <dd className="font-medium text-[var(--ps-text)]">2 nearby elements</dd>
            </div>
          </dl>
        </div>
        <p className="flex items-start gap-2 text-xs leading-relaxed text-[var(--ps-muted)]">
          <span aria-hidden>✨</span>
          I found one significant geometry change in the selected area. Verify visually using the toggle above.
        </p>
        <button
          type="button"
          onClick={openSourcePermission}
          className="flex w-full items-center justify-between rounded-md border border-[var(--ps-brand)] bg-white px-3 py-2.5 text-sm font-semibold text-[var(--ps-brand)]"
        >
          <span className="inline-flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Check related project impact
          </span>
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={backToSelectionContext}
          className="w-full text-left text-xs font-medium text-[var(--ps-muted)] hover:text-[var(--ps-brand)]"
        >
          ← Back to model
        </button>
      </div>
    )
  }

  if (flowState === 'sourcePermission') {
    return (
      <div className="space-y-4">
        <p className="text-xs text-[var(--ps-muted)]">Choose which connected project sources I should use.</p>
        <div className="space-y-2">
          {designReviewSources.map((src) => {
            const active = selectedSources.includes(src.id)
            return (
              <button
                key={src.id}
                type="button"
                onClick={() => toggleSource(src.id)}
                className={`dr-source-select ${active ? 'dr-source-select--active' : ''}`}
              >
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-4 w-4 items-center justify-center">
                    {active ? (
                      <Check className="h-4 w-4 text-[var(--ps-brand)]" />
                    ) : (
                      <Circle className="h-4 w-4 text-[#cbd5e1]" />
                    )}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-[var(--ps-text)]">{src.title}</p>
                    <p className="mt-0.5 text-[11px] text-[var(--ps-muted)]">{src.subtitle}</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
        <p className="flex items-start gap-2 text-[11px] leading-relaxed text-[var(--ps-muted)]">
          <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--ps-success)]" />
          I&apos;ll only read the selected connected sources. I won&apos;t change project information.
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={cancelSourcePermission}
            className="flex-1 rounded-md border border-[var(--ps-border)] py-2 text-sm font-semibold text-[var(--ps-text)]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={startInvestigation}
            disabled={selectedSources.length === 0}
            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[var(--ps-brand)] py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            Investigate
          </button>
        </div>
      </div>
    )
  }

  if (flowState === 'investigating') {
    const groups = [...new Set(investigationSteps.map((s) => s.group))]
    return (
      <div className="space-y-4">
        {groups.map((group) => (
          <div key={group}>
            <SectionLabel>{group}</SectionLabel>
            <ul className="mt-2 space-y-2">
              {investigationSteps
                .filter((s) => s.group === group)
                .map((step) => {
                  const done = completedStepIds.includes(step.id)
                  const loading = investigating && !done && step.id === investigationSteps.find(
                    (x) => !completedStepIds.includes(x.id),
                  )?.id
                  return (
                    <li key={step.id} className="flex items-center gap-2 text-xs text-[var(--ps-text)]">
                      {done ? (
                        <Check className="h-3.5 w-3.5 shrink-0 text-[var(--ps-success)]" />
                      ) : loading ? (
                        <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-[var(--ps-brand)]" />
                      ) : (
                        <Circle className="h-3.5 w-3.5 shrink-0 text-[#e2e8f0]" />
                      )}
                      <span className={done ? '' : 'text-[var(--ps-muted)]'}>{step.label}</span>
                    </li>
                  )
                })}
            </ul>
          </div>
        ))}
      </div>
    )
  }

  if (flowState === 'impactFindings') {
    return (
      <div className="space-y-4">
        <p className="text-xs leading-relaxed text-[var(--ps-muted)]">
          Each finding links to its source. Inspect the evidence yourself, or review possible actions when
          you&apos;re ready.
        </p>
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setFindingsAction('inspect')}
            className="dr-assist-action dr-assist-action--selected"
          >
            Inspect evidence
          </button>
          <button type="button" className="dr-assist-action">
            Continue investigating
          </button>
          <button
            type="button"
            onClick={() => setFindingsAction('reviewActions')}
            className="dr-assist-action"
          >
            Review possible actions
          </button>
        </div>
      </div>
    )
  }

  if (flowState === 'evidenceInspection') {
    return (
      <div className="space-y-4">
        <p className="rounded-lg bg-[#f1f5f9] px-3 py-2.5 text-xs leading-relaxed text-[var(--ps-muted)]">
          These are the ProjectSight sources used in the impact summary. Check them independently — I can be
          wrong.
        </p>
        <SectionLabel>Used in AI finding</SectionLabel>
        <div className="space-y-2">
          <div className="rounded-lg border border-[var(--ps-border)] bg-white p-3 text-xs">
            <p className="font-semibold text-[var(--ps-text)]">Drawing A-204</p>
            <p className="mt-1 text-[var(--ps-muted)]">Revision: previous coordinated layout</p>
            <p className="text-[var(--ps-muted)]">Relevant area: mechanical room east wall</p>
          </div>
          <div className="rounded-lg border border-[var(--ps-brand)] bg-[var(--ps-active-bg)] p-3 text-xs">
            <p className="font-semibold text-[var(--ps-text)]">RFI-087</p>
            <p className="mt-1 text-[var(--ps-muted)]">Open · Mechanical services clearance</p>
          </div>
        </div>
        <button
          type="button"
          onClick={returnToImpactSummary}
          className="w-full text-left text-xs font-medium text-[var(--ps-brand)] hover:underline"
        >
          ← Return to impact summary
        </button>
      </div>
    )
  }

  if (flowState === 'issueDraft') {
    return (
      <div className="space-y-4">
        <p className="text-xs leading-relaxed text-[var(--ps-muted)]">
          I&apos;ve drafted a coordination issue from the connected evidence. Review and adjust anything before
          creating it — I won&apos;t submit without your confirmation.
        </p>
        <ul className="space-y-1.5 text-xs text-[var(--ps-muted)]">
          {[
            'Wall revision & 450 mm change',
            'Potential clearance impact',
            'Related drawing A-204',
            'Related RFI-087',
          ].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-[#94a3b8]" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  if (flowState === 'issueCreated') {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-[#bbf7d0] bg-[#f0fdf4] px-3 py-2.5 text-xs text-[#166534]">
          Coordination Issue #{state.issueNumber} is now open in ProjectSight with all connected context linked.
        </div>
        <div className="space-y-2">
          <button type="button" className="dr-assist-action dr-assist-action--selected">
            Open issue
          </button>
          <button
            type="button"
            onClick={backToSketchUpFromProjectSight}
            className="dr-assist-action"
          >
            Return to SketchUp
          </button>
          <button
            type="button"
            onClick={enableMonitoring}
            className="dr-assist-action"
          >
            Notify me when this issue changes
          </button>
        </div>
        <button
          type="button"
          onClick={backToWorkCenter}
          className="w-full text-left text-xs font-medium text-[var(--ps-brand)] hover:underline"
        >
          ← Back to Work Center
        </button>
      </div>
    )
  }

  return null
}

export function designReviewAssistTitle(flowState: string): string {
  switch (flowState) {
    case 'connectContext':
      return 'Review latest design change in North Ridge'
    case 'sketchupSelect':
      return 'Review latest design change in North Ridge'
    case 'sketchupSelectionContext':
      return 'Selection context'
    case 'sketchupComparison':
      return 'Change comparison'
    case 'sourcePermission':
    case 'investigating':
    case 'impactFindings':
      return 'Check project impact'
    case 'evidenceInspection':
      return 'Evidence used'
    case 'issueDraft':
    case 'issueCreated':
      return 'Check project impact'
    default:
      return 'Assist'
  }
}
