import type { ReactNode } from 'react'
import { SetupSidebar } from './SetupSidebar'
import type { SetupStage } from '../../types/onboarding'

export type SetupShellProps = {
  stage: SetupStage
  children: ReactNode
  contentClassName?: string
}

export function SetupShell({ stage, children, contentClassName = '' }: SetupShellProps) {
  return (
    <div className="setup-root flex h-full min-h-screen bg-[var(--setup-bg)]">
      <SetupSidebar currentStage={stage} />
      <div className={`flex min-w-0 flex-1 flex-col overflow-auto ${contentClassName}`}>
        {children}
      </div>
    </div>
  )
}

export type SetupContentProps = {
  stepLabel: string
  title: string
  description?: string
  children: ReactNode
  wide?: boolean
  footer?: ReactNode
}

export function SetupContent({
  stepLabel,
  title,
  description,
  children,
  wide,
  footer,
}: SetupContentProps) {
  return (
    <div className="flex min-h-full flex-col px-10 py-8 md:px-14 lg:px-16">
      <div
        className={`mx-auto flex w-full flex-1 flex-col ${wide ? 'max-w-[var(--setup-content-wide)]' : 'max-w-[var(--setup-content-max)]'}`}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--setup-muted-light)]">
          {stepLabel}
        </p>
        <h1 className="mt-3 text-[26px] font-bold leading-tight tracking-tight text-[var(--setup-text)]">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 text-[15px] text-[var(--setup-muted)]">{description}</p>
        ) : null}
        <div className="mt-8 flex-1">{children}</div>
        {footer ? <div className="mt-10 shrink-0">{footer}</div> : null}
      </div>
    </div>
  )
}

export type SetupNavProps = {
  onBack?: () => void
  backLabel?: string
  primaryLabel: string
  onPrimary: () => void
  primaryDisabled?: boolean
}

export function SetupNav({
  onBack,
  backLabel = 'Back',
  primaryLabel,
  onPrimary,
  primaryDisabled,
}: SetupNavProps) {
  return (
    <div className="flex items-center justify-between pt-2">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--setup-muted)] transition-colors hover:text-[var(--setup-text)]"
        >
          <span aria-hidden>←</span> {backLabel}
        </button>
      ) : (
        <span />
      )}
      <button
        type="button"
        disabled={primaryDisabled}
        onClick={onPrimary}
        className="rounded-md bg-[var(--setup-brand-mid)] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--setup-brand)] disabled:cursor-not-allowed disabled:opacity-45"
      >
        {primaryLabel}
      </button>
    </div>
  )
}
