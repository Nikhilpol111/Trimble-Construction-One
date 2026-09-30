import { ModusWcSelect } from '@trimble-oss/moduswebcomponents-react'
import type { ISelectOption } from '@trimble-oss/moduswebcomponents'
import { readModusStringValue } from '../../modus/modusEvents'

export type SelectOption = {
  value: string
  label: string
}

export type SelectProps = {
  id?: string
  name?: string
  value: string
  label?: string
  options: SelectOption[]
  disabled?: boolean
  required?: boolean
  className?: string
  onValueChange: (value: string) => void
}

function toModusOptions(options: SelectOption[]): ISelectOption[] {
  return options.map((option) => ({
    label: option.label,
    value: option.value,
  }))
}

export function Select({
  id,
  name,
  value,
  label,
  options,
  disabled,
  required,
  className = '',
  onValueChange,
}: SelectProps) {
  return (
    <ModusWcSelect
      inputId={id}
      name={name}
      value={value}
      label={label}
      options={toModusOptions(options)}
      disabled={disabled}
      required={required}
      customClass={className}
      onInputChange={(event) => onValueChange(readModusStringValue(event))}
    />
  )
}
