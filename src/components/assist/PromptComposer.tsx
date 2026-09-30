import { useState, type FormEvent } from 'react'
import { Send } from 'lucide-react'
import { Button } from '../common/Button'

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
    <form onSubmit={handleSubmit} className="flex gap-2">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={2}
        placeholder={placeholder}
        className="min-h-[2.5rem] flex-1 resize-none rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface-raised)] px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)]"
      />
      <Button type="submit" variant="primary" size="md" aria-label="Send prompt">
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}
