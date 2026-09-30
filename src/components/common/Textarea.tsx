import { ModusWcTextarea } from '@trimble-oss/moduswebcomponents-react'
import { readModusStringValue } from '../../modus/modusEvents'

export type TextareaProps = {
  id?: string
  name?: string
  value: string
  placeholder?: string
  label?: string
  rows?: number
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  className?: string
  onValueChange: (value: string) => void
}

export function Textarea({
  id,
  name,
  value,
  placeholder = '',
  label,
  rows,
  disabled,
  readOnly,
  required,
  className = '',
  onValueChange,
}: TextareaProps) {
  return (
    <ModusWcTextarea
      inputId={id}
      name={name}
      value={value}
      placeholder={placeholder}
      label={label}
      rows={rows}
      disabled={disabled}
      readonly={readOnly}
      required={required}
      customClass={className}
      onInputChange={(event) => onValueChange(readModusStringValue(event))}
    />
  )
}
