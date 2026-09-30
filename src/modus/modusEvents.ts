/** Read controlled string value from official Modus `inputChange` events (React wrapper). */
export function readModusStringValue(event: CustomEvent<InputEvent>): string {
  const fromDetail = event.detail?.target as { value?: string } | undefined
  if (fromDetail?.value !== undefined) return fromDetail.value
  return String((event.target as { value?: string }).value ?? '')
}

/** Read controlled boolean value from official Modus checkbox/switch `inputChange` events. */
export function readModusBooleanValue(event: CustomEvent<InputEvent>): boolean {
  const fromDetail = event.detail?.target as { value?: boolean } | undefined
  if (fromDetail?.value !== undefined) return Boolean(fromDetail.value)
  return Boolean((event.target as { value?: boolean }).value)
}
