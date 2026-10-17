export function TrimbleMark({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 40 45" aria-hidden="true"><path d="M4 2 16 9 4 16ZM4 28 16 35 4 43ZM28 14 39 22 28 30Z" fill="currentColor"/><circle cx="18" cy="22" r="15" fill="currentColor"/><g fill="none" stroke="white" strokeWidth="1.3"><ellipse cx="18" cy="22" rx="8" ry="15" transform="rotate(-35 18 22)"/><ellipse cx="18" cy="22" rx="15" ry="7" transform="rotate(-35 18 22)"/><path d="m8 11 20 22M6 31 29 12"/></g></svg>
}
export function TrimbleWordmark({ className = '' }: { className?: string }) {
  return <img className={`trimble-wordmark ${className}`} src="/onboarding/construction-one.png" alt="Trimble Construction One" />
}
export function TrimbleIdLogo({ className = '' }: { className?: string }) {
  return <img className={`trimble-id-logo ${className}`} src="/onboarding/trimble-id.png" alt="Trimble" />
}
