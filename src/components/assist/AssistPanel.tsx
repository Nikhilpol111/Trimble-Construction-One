import type { ReactNode } from 'react'
import { ChevronDown, FileText, Mic, Plus, Send, Sparkles, X } from 'lucide-react'
import type { UploadFlowState, UploadTask } from '../../types/uploadDrawing'
import { getUploadProgressSteps } from '../../flows/uploadDrawing/progressSteps'
import { UploadProgressList } from '../projectSight/UploadProgressList'
import { PromptComposer } from './PromptComposer'

export type AssistPanelProps = {
  title?: string
  children?: ReactNode
  onSubmitPrompt?: (value: string) => void
  task?: string
  state?: UploadFlowState
  context?: UploadTask
  onClose?: () => void
  onViewDrawing?: () => void
  onBackToWorkCenter?: () => void
  /** Custom Assist content (e.g. design review) — uses panel composer footer */
  variant?: 'default' | 'designReview'
}

function AssistMark() {
  return (
    <span
      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f06] via-[#f90] to-[#09f]"
      aria-hidden
    />
  )
}

function UploadAssistBody({
  state,
  context,
  onViewDrawing,
  onBackToWorkCenter,
}: {
  state: UploadFlowState
  context: UploadTask
  onViewDrawing?: () => void
  onBackToWorkCenter?: () => void
}) {
  const steps = getUploadProgressSteps(state)
  const showReview =
    state === 'missingMetadata' || state === 'metadataReady'
  const showSuccess = state === 'uploadSuccess'
  const showCarrying =
    state === 'openingProjectSight' ||
    state === 'confirmProject' ||
    state === 'drawings' ||
    state === 'requestSubmitted'

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-[var(--ps-border-light)] bg-[#f8fafc] px-3 py-2.5">
        <div className="flex items-start gap-2">
          <FileText className="mt-0.5 h-4 w-4 shrink-0 text-red-500" strokeWidth={1.5} />
          <div className="min-w-0 text-xs">
            <p className="font-medium text-[var(--ps-text)]">{context.fileName}</p>
            <p className="mt-0.5 text-[var(--ps-muted)]">
              → {context.targetProject}
              <br />
              → {context.targetProduct}
            </p>
          </div>
        </div>
      </div>
      <UploadProgressList steps={steps} />
      {showCarrying ? (
        <p className="rounded-lg bg-[#f1f5f9] px-3 py-2.5 text-xs leading-relaxed text-[var(--ps-muted)]">
          Carrying your file into ProjectSight and preparing the upload for you.
        </p>
      ) : null}
      {showReview ? (
        <div
          className="rounded-lg border border-[var(--ps-warning-border)] bg-[var(--ps-warning-bg)] px-3 py-2.5 text-xs leading-relaxed text-[var(--ps-warning-text)]"
        >
          <p className="font-semibold">Your review needed</p>
          <p className="mt-1 font-normal">
            I&apos;ve opened the upload and filled in what I could. Add the required details below to
            complete the upload.
          </p>
        </div>
      ) : null}
      {showSuccess ? (
        <>
          <div className="rounded-lg border border-[#bbf7d0] bg-[#f0fdf4] px-3 py-2.5 text-xs leading-relaxed text-[#166534]">
            {context.fileName} was added to the {context.targetProject} project in ProjectSight.
          </div>
          <button
            type="button"
            onClick={onViewDrawing}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-[var(--ps-brand)] py-2.5 text-sm font-semibold text-white"
          >
            View drawing
          </button>
          <button
            type="button"
            onClick={onBackToWorkCenter}
            className="w-full text-center text-xs font-medium text-[var(--ps-brand)] hover:underline"
          >
            ← Back to Work Center
          </button>
        </>
      ) : null}
    </div>
  )
}

function AssistPanelComposer() {
  return (
    <div className="space-y-2">
      <div className="rounded-[14px] bg-gradient-to-r from-[#e879f9] via-[#f97316] to-[#38bdf8] p-[1px]">
        <div className="rounded-[13px] border border-transparent bg-white p-3 shadow-sm">
          <textarea
            rows={2}
            readOnly
            placeholder="Ask a follow-up…"
            className="mb-2 w-full resize-none border-0 bg-transparent text-sm outline-none placeholder:text-[#94a3b8]"
          />
          <div className="flex items-center justify-between gap-2 border-t border-[var(--ps-border-light)] pt-2">
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-full border border-[var(--ps-border)] px-2 py-0.5 text-[10px] font-medium text-[var(--ps-text)]"
          >
            <Sparkles className="h-3 w-3 text-[var(--ps-filled-text)]" />
            Trimble Intelligence
            <ChevronDown className="h-3 w-3 text-[var(--ps-muted)]" />
          </button>
          <div className="flex items-center gap-1">
            <button type="button" className="rounded-full p-1.5 text-[var(--ps-muted)]" aria-label="Add">
              <Plus className="h-4 w-4" />
            </button>
            <button type="button" className="rounded-full p-1.5 text-[var(--ps-muted)]" aria-label="Voice">
              <Mic className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a1a1a] text-white"
              aria-label="Send"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
      </div>
      <p className="text-center text-[10px] text-[#94a3b8]">
        AI can make mistakes.{' '}
        <button type="button" className="underline hover:text-[var(--ps-muted)]">Acceptable Use</button>
      </p>
    </div>
  )
}

export function AssistPanel({
  title = 'Assist',
  children,
  onSubmitPrompt,
  task,
  state,
  context,
  onClose,
  onViewDrawing,
  onBackToWorkCenter,
  variant = 'default',
}: AssistPanelProps) {
  const isUploadFlow = Boolean(task && state && context)
  const isDesignReview = variant === 'designReview'

  return (
    <aside
      className="ps-root flex w-[var(--ps-assist-width)] shrink-0 flex-col border-l border-[var(--ps-border)] bg-[var(--ps-surface)]"
    >
      <div className="flex items-start justify-between gap-2 border-b border-[var(--ps-border)] px-4 py-3">
        <div className="flex min-w-0 items-start gap-2">
          <AssistMark />
          <h2 className="text-[13px] font-semibold leading-snug text-[var(--ps-text)]">
            {isUploadFlow ? task : isDesignReview ? title : title}
          </h2>
        </div>
        {onClose ? (
          <button type="button" onClick={onClose} className="shrink-0 rounded p-1 text-[var(--ps-muted)]" aria-label="Close Assist">
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>
      <div className="flex-1 overflow-auto px-4 py-4">
        {isUploadFlow && state && context ? (
          <UploadAssistBody
            state={state}
            context={context}
            onViewDrawing={onViewDrawing}
            onBackToWorkCenter={onBackToWorkCenter}
          />
        ) : isDesignReview ? (
          children
        ) : (
          children ?? (
            <p className="text-sm text-[var(--ps-muted)]">
              AI assistant panel — content will be driven by flow state.
            </p>
          )
        )}
      </div>
      <div className="border-t border-[var(--ps-border)] p-3">
        {isUploadFlow || isDesignReview ? (
          <AssistPanelComposer />
        ) : (
          <PromptComposer onSubmit={onSubmitPrompt} />
        )}
      </div>
    </aside>
  )
}
