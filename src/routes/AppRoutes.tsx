import { Navigate, Route, Routes } from 'react-router-dom'
import {
  ProjectSightPage,
  PrototypePage,
  SignInPage,
  SketchUpPage,
  TrimbleConnectPage,
  WorkCenterPage,
} from '../pages'
import {
  SetupProfilePage,
  SetupProductsPage,
  SetupReadyPage,
  SetupTrustPage,
  SetupWeekCheckinPage,
  SetupWeekMorningPage,
  SetupWeekTimePage,
  SetupWeekTimesinkPage,
} from '../pages/setup'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/setup" element={<Navigate to="/setup/profile" replace />} />
      <Route path="/setup/profile" element={<SetupProfilePage />} />
      <Route path="/setup/products" element={<SetupProductsPage />} />
      <Route path="/setup/week/morning" element={<SetupWeekMorningPage />} />
      <Route path="/setup/week/time" element={<SetupWeekTimePage />} />
      <Route path="/setup/week/timesink" element={<SetupWeekTimesinkPage />} />
      <Route path="/setup/week/checkin" element={<SetupWeekCheckinPage />} />
      <Route path="/setup/trust" element={<SetupTrustPage />} />
      <Route path="/setup/ready" element={<SetupReadyPage />} />
      <Route path="/work-center" element={<WorkCenterPage />} />
      <Route path="/project-sight" element={<ProjectSightPage />} />
      <Route path="/trimble-connect" element={<TrimbleConnectPage />} />
      <Route path="/sketchup" element={<SketchUpPage />} />
      <Route path="/prototype" element={<PrototypePage />} />
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  )
}
