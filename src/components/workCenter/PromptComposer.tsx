import { CheckCircle2, ChevronDown, FileText, Mic, Plus, Send, X } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { uploadDrawingIntentText, useUploadDrawing } from '../../context/UploadDrawingContext'
import { useDesignReview } from '../../context/DesignReviewContext'
import { useGeneratedWidgets } from '../../context/GeneratedWidgetsContext'
import { generatedWidgetsIntentText } from '../../flows/generatedWidgets'
import { designReviewIntentText } from '../../types/designReview'
import { quickActions } from '../../data/workCenter'
import { useWorkCenter } from '../../context/WorkCenterContext'

export function QuickActionChip({
  label,
  onClick,
}: {
  label: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-[var(--wc-border)] bg-[#f8fafc] px-3 py-1 text-[11px] font-medium text-[var(--wc-text)] hover:bg-white"
    >
      {label}
    </button>
  )
}

export function PromptComposer() {
  const { onQuickAction, session } = useWorkCenter()
  const { beginFromWorkCenter: beginDesignReview } = useDesignReview()
  const { beginFromWorkCenter: beginGeneratedWidgets, openCustomiseDashboard } =
    useGeneratedWidgets()
  const {
    workCenterAttachment,
    attachFileForUpload,
    clearWorkCenterAttachment,
    beginUploadFromWorkCenter,
  } = useUploadDrawing()
  const [value, setValue] = useState(session.currentPrompt || '')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed && !workCenterAttachment) return
    if (beginDesignReview(trimmed)) {
      setValue('')
      return
    }
    if (beginGeneratedWidgets(trimmed)) {
      setValue('')
      return
    }
    beginUploadFromWorkCenter(trimmed || uploadDrawingIntentText)
    setValue('')
  }

  function handleAttach() {
    attachFileForUpload()
    if (!value.trim()) {
      setValue(uploadDrawingIntentText)
    }
  }

  return (
    <div className="wc-root pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center bg-gradient-to-t from-[var(--wc-bg)] via-[var(--wc-bg)] to-transparent px-4 pb-4 pt-8">
      <div className="pointer-events-auto w-full max-w-[var(--wc-composer-max)]">
        <form onSubmit={handleSubmit}>
          <div className="rounded-[22px] bg-gradient-to-r from-[#e879f9] via-[#f97316] to-[#38bdf8] p-[1.5px] shadow-lg">
            <div className="rounded-[21px] bg-[var(--wc-surface)] px-4 py-3">
              {workCenterAttachment ? (
                <div className="mb-3 flex items-start gap-3 rounded-xl border border-[var(--wc-border-light)] bg-[#fafbfc] px-3 py-2.5">
                  <FileText className="h-8 w-8 shrink-0 text-red-500" strokeWidth={1.25} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[var(--wc-text)]">EilansBungalow.pdf</p>
                    <p className="flex items-center gap-1 text-xs text-[var(--wc-success)]">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Uploaded · 100%
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={clearWorkCenterAttachment}
                    className="rounded p-1 text-[var(--wc-muted)] hover:bg-white"
                    aria-label="Remove attachment"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : null}
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="How can Trimble AI help you start your day?"
                className="w-full border-0 bg-transparent text-sm text-[var(--wc-text)] outline-none placeholder:text-[var(--wc-muted-light)]"
              />
              <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-[var(--wc-border-light)] pt-2">
                <span className="text-[11px] font-semibold text-[var(--wc-brand-mid)]">Trimble AI</span>
                <button
                  type="button"
                  className="inline-flex items-center gap-0.5 text-[11px] text-[var(--wc-muted)]"
                >
                  All projects
                  <ChevronDown className="h-3 w-3" />
                </button>
                {!workCenterAttachment ? (
                  <div className="flex flex-1 flex-wrap gap-1.5 max-[1279px]:order-last max-[1279px]:basis-full">
                    {quickActions.map((action) => (
                      <QuickActionChip
                        key={action.id}
                        label={action.label}
                        onClick={() => {
                          if (action.id === 'project-briefing') {
                            setValue(designReviewIntentText)
                          }
                          if (action.id === 'generate-widgets') {
                            setValue(generatedWidgetsIntentText)
                          }
                          if (action.id === 'customise-widgets') {
                            openCustomiseDashboard()
                          }
                          onQuickAction(action.id)
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex-1" />
                )}
                <div className="ml-auto flex items-center gap-1 max-[1279px]:ml-0">
                  <button
                    type="button"
                    onClick={handleAttach}
                    className="rounded-full p-1.5 text-[var(--wc-muted)] hover:bg-[#f3f6f9]"
                    aria-label="Attach file"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button type="button" className="rounded-full p-1.5 text-[var(--wc-muted)] hover:bg-[#f3f6f9]">
                    <Mic className="h-4 w-4" />
                  </button>
                  <button
                    type="submit"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a1a1a] text-white"
                    aria-label="Send"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <p className="mt-2 text-center text-[10px] text-[var(--wc-muted-light)]">
          AI can make mistakes.{' '}
          <button type="button" className="underline hover:text-[var(--wc-muted)]">
            Acceptable Use
          </button>
        </p>
        {workCenterAttachment ? (
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {quickActions.map((action) => (
              <QuickActionChip
                key={`footer-${action.id}`}
                label={action.label}
                onClick={() => onQuickAction(action.id)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
