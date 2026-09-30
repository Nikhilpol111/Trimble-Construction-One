import { useGeneratedWidgets } from '../../context/GeneratedWidgetsContext'
import { GeneratedWidgetPanel } from './GeneratedWidgetPanel'
import { WidgetPreviewPanel } from './WidgetPreviewPanel'

export function GeneratedWidgetsOverlays() {
  const { flowState } = useGeneratedWidgets()

  if (flowState === 'generatedOptions') {
    return <GeneratedWidgetPanel />
  }
  if (flowState === 'widgetPreview') {
    return <WidgetPreviewPanel />
  }
  return null
}
