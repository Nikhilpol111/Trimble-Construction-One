import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { Button } from './Button'

export type ModalProps = {
  open: boolean
  title: string
  children: ReactNode
  onClose: () => void
  footer?: ReactNode
}

export function Modal({ open, title, children, onClose, footer }: ModalProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/30"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] shadow-lg">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
          <h2 id="modal-title" className="text-sm font-semibold">
            {title}
          </h2>
          <Button variant="ghost" size="sm" aria-label="Close" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="px-4 py-4">{children}</div>
        {footer ? (
          <div className="flex justify-end gap-2 border-t border-[var(--color-border)] px-4 py-3">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  )
}
