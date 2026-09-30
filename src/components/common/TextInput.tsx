import { ModusWcTextInput } from '@trimble-oss/moduswebcomponents-react'
import { readModusStringValue } from '../../modus/modusEvents'

export type TextInputProps = {
  id?: string
  name?: string
  value: string
  placeholder?: string
  label?: string
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url'
  className?: string
  onValueChange: (value: string) => void
}

export function TextInput({
  id,
  name,
  value,
  placeholder = '',
  label,
  disabled,
  readOnly,
  required,
  type = 'text',
  className = '',
  onValueChange,
}: TextInputProps) {
  return (
    <ModusWcTextInput
      inputId={id}
      name={name}
      value={value}
      placeholder={placeholder}
      label={label}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      type={type}
      customClass={className}
      onInputChange={(event) => onValueChange(readModusStringValue(event))}
    />
  )
}
