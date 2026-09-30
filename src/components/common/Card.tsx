import type { HTMLAttributes, ReactNode } from 'react'
import { ModusWcCard } from '@trimble-oss/moduswebcomponents-react'

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddingToModus: Record<NonNullable<CardProps['padding']>, 'compact' | 'comfortable'> = {
  none: 'compact',
  sm: 'compact',
  md: 'compact',
  lg: 'comfortable',
}

export function Card({ children, padding = 'md', className = '' }: CardProps) {
  const modusPadding = paddingToModus[padding]

  return (
    <ModusWcCard bordered customClass={className} padding={modusPadding} layout="vertical">
      {children}
    </ModusWcCard>
  )
}
