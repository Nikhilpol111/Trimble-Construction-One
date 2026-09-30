import { ModusWcIcon } from '@trimble-oss/moduswebcomponents-react'

export type ModusIconProps = {
  /** Modus icon name (see Modus icon library). */
  name: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  decorative?: boolean
}

export function ModusIcon({ name, size = 'md', className = '', decorative = true }: ModusIconProps) {
  return (
    <ModusWcIcon name={name} size={size} customClass={className} decorative={decorative} version="2.0" />
  )
}
