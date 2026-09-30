import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { ToastMessage } from '../../types'
import { StatusBadge } from './StatusBadge'

type ToastContextValue = {
  push: (toast: Omit<ToastMessage, 'id'>) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const push = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { ...toast, id }])
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  const value = useMemo(() => ({ push }), [push])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function ToastItem({ title, description, kind = 'neutral' }: ToastMessage) {
  return (
    <div className="pointer-events-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-3 shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium">{title}</p>
          {description ? (
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">{description}</p>
          ) : null}
        </div>
        <StatusBadge label={kind} kind={kind} />
      </div>
    </div>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return ctx
}
