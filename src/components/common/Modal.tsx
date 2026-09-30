import { useEffect, useId, type ReactNode } from 'react'
import { ModusWcButton, ModusWcModal } from '@trimble-oss/moduswebcomponents-react'
import { Icon } from './Icon'

export type ModalProps = {
  open: boolean
  title: string
  children: ReactNode
  onClose: () => void
  footer?: ReactNode
}

function resolveDialog(modalId: string): HTMLDialogElement | null {
  const byId = document.getElementById(modalId)
  if (byId instanceof HTMLDialogElement) return byId

  const host = document.querySelector(`modus-wc-modal[modal-id="${CSS.escape(modalId)}"]`)
  const nested = host?.querySelector('dialog')
  return nested instanceof HTMLDialogElement ? nested : null
}

export function Modal({ open, title, children, onClose, footer }: ModalProps) {
  const modalId = useId().replace(/:/g, '')
  useEffect(() => {
    const dialog = resolveDialog(modalId)
    if (!dialog) return

    const handleClose = () => onClose()
    dialog.addEventListener('close', handleClose)

    if (open) {
      if (!dialog.open) dialog.showModal()
    } else if (dialog.open) {
      dialog.close()
    }

    return () => dialog.removeEventListener('close', handleClose)
  }, [open, modalId, onClose])

  return (
    <ModusWcModal
      modalId={modalId}
      position="center"
      showClose={false}
      backdrop="default"
    >
      <div slot="header" className="flex w-full items-center justify-between gap-3">
        <h2 id="modal-title" className="text-sm font-semibold">{title}</h2>
        <ModusWcButton
          shape="square"
          size="sm"
          variant="borderless"
          color="tertiary"
          buttonAriaLabel="Close"
          onButtonClick={() => onClose()}
        >
          <Icon name="close" size="sm" />
        </ModusWcButton>
      </div>
      <div slot="content">{children}</div>
      {footer ? <div slot="footer" className="flex justify-end gap-2">{footer}</div> : null}
    </ModusWcModal>
  )
}
