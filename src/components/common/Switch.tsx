import { ModusWcSwitch } from '@trimble-oss/moduswebcomponents-react'
import { readModusBooleanValue } from '../../modus/modusEvents'

export type SwitchProps = {
  id?: string
  checked: boolean
  label?: string
  disabled?: boolean
  className?: string
  onCheckedChange: (checked: boolean) => void
}

export function Switch({
  id,
  checked,
  label,
  disabled,
  className = '',
  onCheckedChange,
}: SwitchProps) {
  return (
    <ModusWcSwitch
      inputId={id}
      value={checked}
      indeterminate={false}
      label={label}
      disabled={disabled}
      customClass={className}
      onInputChange={(event) => onCheckedChange(readModusBooleanValue(event))}
    />
  )
}
