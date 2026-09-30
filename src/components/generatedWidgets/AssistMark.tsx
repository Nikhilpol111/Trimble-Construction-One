export function AssistMark({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f06] via-[#f90] to-[#09f] ${className}`}
      aria-hidden
    />
  )
}
