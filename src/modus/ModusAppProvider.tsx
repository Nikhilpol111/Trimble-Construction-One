import { useEffect, type ReactNode } from 'react'
import { ModusWcThemeProvider } from '@trimble-oss/moduswebcomponents-react'

const MODUS_MODERN_LIGHT = 'modus-modern-light'

export function ModusAppProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('light')
    root.dataset.theme = MODUS_MODERN_LIGHT
    root.dataset.mode = 'light'
  }, [])

  return (
    <ModusWcThemeProvider initialTheme={{ theme: 'modus-modern', mode: 'light' }}>
      {children}
    </ModusWcThemeProvider>
  )
}
