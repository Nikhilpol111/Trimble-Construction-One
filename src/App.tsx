import { ModusAppProvider } from './modus/ModusAppProvider'
import { OnboardingProvider } from './context/OnboardingContext'
import { DesignReviewProvider } from './context/DesignReviewContext'
import { UploadDrawingProvider } from './context/UploadDrawingContext'
import { GeneratedWidgetsProvider } from './context/GeneratedWidgetsContext'
import { WorkCenterProvider } from './context/WorkCenterContext'
import { AppRoutes } from './routes/AppRoutes'

export default function App() {
  return (
    <ModusAppProvider>
    <OnboardingProvider>
      <UploadDrawingProvider>
        <WorkCenterProvider>
          <GeneratedWidgetsProvider>
            <DesignReviewProvider>
              <div className="h-full">
                <AppRoutes />
              </div>
            </DesignReviewProvider>
          </GeneratedWidgetsProvider>
        </WorkCenterProvider>
      </UploadDrawingProvider>
    </OnboardingProvider>
    </ModusAppProvider>
  )
}
