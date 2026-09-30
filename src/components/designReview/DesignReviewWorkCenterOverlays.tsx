import { CheckCircle2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useWorkCenter } from '../../context/WorkCenterContext'
import { designReviewIntentText } from '../../types/designReview'

export function DesignReviewMonitoringToast() {
  const { session, setActiveReminder } = useWorkCenter()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (session.activeReminder?.includes('Issue #124')) {
      setVisible(true)
    }
  }, [session.activeReminder])

  if (!visible || !session.activeReminder) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-36 z-50 flex justify-center px-4">
      <div className="dr-wc-toast pointer-events-auto">
        <CheckCircle2 className="h-6 w-6 shrink-0 text-[var(--wc-success)]" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-[var(--wc-text)]">You&apos;ll be notified</p>
          <p className="text-sm text-[var(--wc-muted)]">
            Assist will alert you when {session.activeReminder} changes.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setVisible(false)
            setActiveReminder(null)
          }}
          className="shrink-0 rounded p-1 text-[var(--wc-muted)] hover:bg-[#f3f6f9]"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export function DesignReviewReminderPill() {
  const { session } = useWorkCenter()
  if (!session.activeReminder) return null
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-3 z-30 flex justify-center">
      <span className="dr-reminder-pill pointer-events-auto">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--wc-brand-light)]" />
        1 active reminder · Simulate upload
      </span>
    </div>
  )
}

export { designReviewIntentText }
