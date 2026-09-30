import {
  Bell,
  Briefcase,
  Calendar,
  Check,
  Clock,
  FileText,
  Inbox,
  LayoutGrid,
  MapPin,
  Sun,
  Users,
  type LucideIcon,
} from 'lucide-react'
import type { WeekOption } from '../../types/onboarding'

const iconMap: Record<WeekOption['icon'], LucideIcon> = {
  inbox: Inbox,
  calendar: Calendar,
  'map-pin': MapPin,
  clock: Clock,
  sun: Sun,
  file: FileText,
  users: Users,
  briefcase: Briefcase,
  'layout-grid': LayoutGrid,
  bell: Bell,
}

export type OptionCardProps = {
  option: WeekOption
  selected: boolean
  onSelect: () => void
}

export function OptionCard({ option, selected, onSelect }: OptionCardProps) {
  const Icon = iconMap[option.icon]

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-center gap-4 rounded-[var(--setup-radius-lg)] border px-4 py-3.5 text-left transition-colors ${
        selected
          ? 'border-[var(--setup-brand-mid)] bg-[#f0f7fc] shadow-[inset_0_0_0_1px_var(--setup-brand-mid)]'
          : 'border-[var(--setup-border)] bg-[var(--setup-card)] hover:border-[#c5d3de]'
      }`}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          selected ? 'bg-[var(--setup-brand-mid)] text-white' : 'bg-[#e8f2fa] text-[var(--setup-brand-mid)]'
        }`}
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-[var(--setup-text)]">{option.title}</span>
        <span className="mt-0.5 block text-xs text-[var(--setup-muted)]">{option.description}</span>
      </span>
      {selected ? (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--setup-brand-mid)] text-white">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </span>
      ) : null}
    </button>
  )
}

export type QuestionProgressProps = {
  current: number
  total: number
  continueOnLast?: boolean
}

export function QuestionProgress({ current, total }: QuestionProgressProps) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <div className="flex flex-1 gap-1">
        {Array.from({ length: total }, (_, i) => {
          const n = i + 1
          let segmentClass = 'bg-[#dce3ea]'
          if (n < current) segmentClass = 'bg-[var(--setup-success)]'
          if (n === current) segmentClass = 'bg-[var(--setup-brand-mid)]'
          return <div key={n} className={`h-1 flex-1 rounded-full ${segmentClass}`} />
        })}
      </div>
      <span className="shrink-0 text-xs text-[var(--setup-muted-light)]">
        Question {current} of {total}
      </span>
    </div>
  )
}

export type WeekQuestionBlockProps = {
  question: string
  hint: string
  questionIndex: number
  totalQuestions: number
  options: WeekOption[]
  selectedId: string
  onSelect: (id: string) => void
}

export function WeekQuestionBlock({
  question,
  hint,
  questionIndex,
  totalQuestions,
  options,
  selectedId,
  onSelect,
}: WeekQuestionBlockProps) {
  return (
    <>
      <QuestionProgress current={questionIndex} total={totalQuestions} />
      <h2 className="text-base font-bold text-[var(--setup-text)]">{question}</h2>
      <p className="mt-1 text-sm text-[var(--setup-muted)]">{hint}</p>
      <div className="mt-5 space-y-3">
        {options.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            selected={selectedId === option.id}
            onSelect={() => onSelect(option.id)}
          />
        ))}
      </div>
    </>
  )
}
