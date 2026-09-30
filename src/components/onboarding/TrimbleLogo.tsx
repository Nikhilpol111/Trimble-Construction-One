export function TrimbleMark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M16 3L28 27H4L16 3Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="14" r="4.5" fill="white" fillOpacity="0.25" />
    </svg>
  )
}

export function TrimbleWordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <TrimbleMark className="h-7 w-7 text-[var(--setup-brand)]" />
      <span className="leading-tight">
        <span className="block text-[15px] font-semibold tracking-tight text-[var(--setup-brand)]">
          Trimble
        </span>
        <span className="block text-[11px] font-medium text-[var(--setup-brand)]">
          Construction One
        </span>
      </span>
    </span>
  )
}

export function TrimbleIdLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <TrimbleMark className="h-8 w-8 text-[var(--signin-brand,#003b5c)]" />
      <span className="text-[28px] font-bold tracking-tight text-[var(--signin-brand,#003b5c)]">
        trimble
      </span>
    </div>
  )
}
