import { ModusWcCheckbox } from '@trimble-oss/moduswebcomponents-react'
import { readModusBooleanValue } from '../../modus/modusEvents'

export type CheckboxProps = {
  id?: string
  name?: string
  checked: boolean
  label?: string
  disabled?: boolean
  required?: boolean
  indeterminate?: boolean
  className?: string
  onCheckedChange: (checked: boolean) => void
}

export function Checkbox({
  id,
  name,
  checked,
  label,
  disabled,
  required,
  indeterminate = false,
  className = '',
  onCheckedChange,
}: CheckboxProps) {
  return (
    <ModusWcCheckbox
      inputId={id}
      name={name}
      value={checked}
      label={label}
      disabled={disabled}
      required={required}
      indeterminate={indeterminate}
      customClass={className}
      onInputChange={(event) => onCheckedChange(readModusBooleanValue(event))}
    />
  )
}
