import { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { generatedWidgetsIntentText } from '../../flows/generatedWidgets'
import { useGeneratedWidgets } from '../../context/GeneratedWidgetsContext'
import { AssistMark } from './AssistMark'
import { GeneratedWidgetOption } from './GeneratedWidgetOption'

const OPTIONS = [
  { id: 'recent-activity' as const, title: 'Recent Activity' },
  { id: 'activity-summary' as const, title: 'Activity Summary' },
  { id: 'project-timeline' as const, title: 'Project Activity Timeline' },
]

export function GeneratedWidgetPanel() {
  const {
    request, generationVersion, updateWidgetConfig,
    selectedOptionId,
    selectOption,
    openPreview,
    regenerateOptions,
    cancelFlow,
  } = useGeneratedWidgets()
  const [changes,setChanges]=useState('')
  const [feedback,setFeedback]=useState('')
  function regenerate(){
   const t=changes.toLowerCase()
   const patch:Partial<import('../../types/generatedWidgets').WidgetConfig>={}
   if(t.includes('comment'))patch.activityType='Comments only'
   else if(t.includes('upload'))patch.activityType='Uploads only'
   else if(t.includes('revision'))patch.activityType='Revisions only'
   else if(t.includes('all activity'))patch.activityType='All activity'
   if(t.includes('north ridge'))patch.projectFilter='North Ridge Infrastructure'
   else if(t.includes('eilans'))patch.projectFilter='Eilans Bungalow'
   else if(t.includes('all project'))patch.projectFilter='All accessible projects'
   if(t.includes('24 hour'))patch.timeRange='Last 24 hours'
   else if(t.includes('30 day'))patch.timeRange='Last 30 days'
   else if(t.includes('7 day'))patch.timeRange='Last 7 days'
   if(Object.keys(patch).length){updateWidgetConfig(patch);setFeedback('Preview filters updated. Review your widget before adding it.')}
   else setFeedback(changes.trim()?'Use the preview controls to change the title, project, activity type, or time range.':'Options refreshed from the same sample activity data.')
   regenerateOptions()
  }
  const displayRequest = request || generatedWidgetsIntentText

  return (
    <div className="gw-overlay-root gw-options">
      <div className="gw-gradient-shell max-h-[min(720px,calc(100vh-120px))] w-full max-w-[1040px] overflow-hidden">
        <div className="gw-panel-inner flex max-h-[inherit] flex-col overflow-y-auto p-5">
          <div className="mb-4 flex justify-end">
            <p className="max-w-[420px] rounded-2xl bg-[#f1f5f9] px-4 py-2.5 text-right text-xs leading-relaxed text-[var(--wc-text)]">
              {displayRequest}
            </p>
          </div>

          <div className="mb-5 flex gap-2">
            <AssistMark />
            <p className="text-xs leading-relaxed text-[var(--wc-text)]">
              I found relevant activity information in Trimble Connect. Here are a few widget options
              — all read-only, sourced from the Activity page.
            </p>
          </div>

          <div className="mb-4 flex flex-col gap-3 min-[900px]:flex-row">
            {OPTIONS.map((opt) => (
              <GeneratedWidgetOption
                key={opt.id}
                id={opt.id}
                title={opt.title}
                selected={selectedOptionId === opt.id}
                onSelect={() => selectOption(opt.id)}
                onPreview={() => openPreview(opt.id)}
                onRegenerate={regenerate}
              />
            ))}
          </div>

          <div className="mb-4 rounded-xl border border-[var(--wc-border)] bg-white px-3 py-2.5">
            <div className="flex items-center gap-2">
              <AssistMark className="h-4 w-4" />
              <input
                type="text"
                aria-label="Describe widget changes" value={changes} onChange={e=>setChanges(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')regenerate()}} placeholder="Describe any changes…"
                className="flex-1 border-0 bg-transparent text-xs outline-none placeholder:text-[var(--wc-muted-light)]"
              />
            </div>
          </div>

          {(feedback||generationVersion>0)&&<p role="status" className="gw-generation-feedback">{feedback||'Options refreshed from the same sample activity data.'}</p>}
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-[var(--wc-border-light)] pt-4">
            <button
              type="button"
              onClick={cancelFlow}
              className="rounded-md border border-[var(--wc-border)] bg-white px-4 py-2 text-xs font-semibold text-[var(--wc-text)]"
            >
              Cancel
            </button>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={regenerate}
                className="inline-flex items-center gap-1.5 rounded-md border border-[var(--wc-border)] bg-white px-4 py-2 text-xs font-semibold text-[var(--wc-text)]"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Regenerate
              </button>
              <button
                type="button"
                disabled={!selectedOptionId}
                onClick={() => openPreview()}
                className="rounded-md bg-[var(--wc-brand)] px-4 py-2 text-xs font-semibold text-white disabled:opacity-40"
              >
                Add selected widget
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
