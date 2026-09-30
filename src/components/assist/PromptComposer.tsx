import { useState, type FormEvent } from 'react'
import { Button } from '../common/Button'
import { Icon } from '../common/Icon'
import { Textarea } from '../common/Textarea'

export type PromptComposerProps = {
  placeholder?: string
  onSubmit?: (value: string) => void
}

export function PromptComposer({
  placeholder = 'Ask Assist…',
  onSubmit,
}: PromptComposerProps) {
  const [value, setValue] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    onSubmit?.(trimmed)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2">
      <Textarea
        value={value}
        placeholder={placeholder}
        rows={2}
        onValueChange={setValue}
        className="min-h-[2.5rem] flex-1"
      />
      <Button type="submit" variant="primary" size="md" aria-label="Send prompt">
        <Icon name="send" size="sm" />
      </Button>
    </form>
  )
}
