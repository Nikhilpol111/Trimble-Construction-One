import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { ModusWcButton } from '@trimble-oss/moduswebcomponents-react'
import { mapButtonSize, mapButtonVariant, type ButtonSize, type ButtonVariant } from '../../modus/tokenMaps'

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
}

export function Button({
  variant = 'secondary',
  size = 'md',
  className = '',
  type = 'button',
  children,
  disabled,
  onClick,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const mapped = mapButtonVariant(variant)

  return (
    <ModusWcButton
      color={mapped.color}
      variant={mapped.variant}
      size={mapButtonSize(size)}
      type={type}
      disabled={disabled}
      customClass={className}
      buttonAriaLabel={typeof ariaLabel === 'string' ? ariaLabel : undefined}
      onButtonClick={(event) => {
        if (disabled) return
        onClick?.(event as unknown as React.MouseEvent<HTMLButtonElement>)
      }}
    >
      {children}
    </ModusWcButton>
  )
}
