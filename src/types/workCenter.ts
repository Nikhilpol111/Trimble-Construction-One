export type WorkCenterNavId = 'home' | 'projects' | 'my-work' | 'files'

export type WorkCenterFlowId =
  | null
  | 'uploadDrawing'
  | 'generatedWidgets'
  | 'designReview'
  | 'customiseWidgets'

/** Reserved for future flow overlays — not used in Home task yet */
export type WorkCenterSessionState = {
  activeFlow: WorkCenterFlowId
  currentPrompt: string
  attachedFile: string | null
  generatedWidgets: string[]
  activeReminder: string | null
}

export const defaultWorkCenterSession: WorkCenterSessionState = {
  activeFlow: null,
  currentPrompt: '',
  attachedFile: null,
  generatedWidgets: [],
  activeReminder: null,
}
