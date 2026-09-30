import { setAssetPath } from '@trimble-oss/moduswebcomponents-react'

/** Pin CDN path to the installed Modus WC version so icons/fonts resolve in dev and production. */
const MODUS_WC_VERSION = '1.19.0'

let initialized = false

export function initModus() {
  if (initialized) return
  setAssetPath(`https://cdn.jsdelivr.net/npm/@trimble-oss/moduswebcomponents@${MODUS_WC_VERSION}/`)
  initialized = true
}
