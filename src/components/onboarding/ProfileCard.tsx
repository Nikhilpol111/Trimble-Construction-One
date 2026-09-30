import {
  Building2,
  Calendar,
  Check,
  Clock,
  ExternalLink,
  Globe,
  LayoutGrid,
  MapPin,
  ShieldCheck,
  User,
} from 'lucide-react'
import type { OnboardingProfile } from '../../types/onboarding'

const fields: {
  key: keyof OnboardingProfile
  label: string
  icon: typeof User
}[] = [
  { key: 'role', label: 'Role', icon: User },
  { key: 'organization', label: 'Organization', icon: Building2 },
  { key: 'department', label: 'Department', icon: LayoutGrid },
  { key: 'office', label: 'Office', icon: MapPin },
  { key: 'timezone', label: 'Time zone', icon: Clock },
  { key: 'license', label: 'License', icon: ShieldCheck },
  { key: 'language', label: 'Language', icon: Globe },
  { key: 'employeeSince', label: 'Employee since', icon: Calendar },
]

export function ProfileHeroCard({ profile }: { profile: OnboardingProfile }) {
  const initial = profile.name.charAt(0)

  return (
    <div className="overflow-hidden rounded-[var(--setup-radius-lg)] bg-[var(--setup-profile-hero)] px-6 py-5 text-white shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-start gap-4">
          <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-white text-2xl font-bold text-[var(--setup-profile-hero)]">
            {initial}
          </div>
          <div className="min-w-0 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold">{profile.name}</h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#2d9a62] px-2 py-0.5 text-[11px] font-semibold">
                <Check className="h-3 w-3" strokeWidth={3} /> Verified
              </span>
            </div>
            <p className="mt-1 text-sm text-white/90">{profile.titleLine}</p>
            <p className="text-sm text-white/80">{profile.email}</p>
          </div>
        </div>
        <button
          type="button"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-white/35 bg-[var(--setup-profile-hero-dark)] px-3 py-1.5 text-xs font-semibold text-white"
        >
          Manage in TID
          <ExternalLink className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

export function ProfileInfoGrid({ profile }: { profile: OnboardingProfile }) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {fields.map(({ key, label, icon: Icon }) => (
        <div
          key={key}
          className="rounded-[var(--setup-radius)] border border-[var(--setup-border)] bg-[var(--setup-card)] px-4 py-3.5"
        >
          <Icon className="mb-2 h-4 w-4 text-[var(--setup-brand-light)]" strokeWidth={1.75} />
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--setup-muted-light)]">
            {label}
          </p>
          <p className="mt-1 text-sm font-semibold leading-snug text-[var(--setup-text)]">
            {profile[key]}
          </p>
        </div>
      ))}
    </div>
  )
}
