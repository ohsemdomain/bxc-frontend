import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthLayout } from "./components/layouts/AuthLayout"
import { GuestLayout } from "./components/layouts/GuestLayout"
import { AdminDashboard } from "./features/dashboard/AdminDashboard"
import { FbAdsLanding } from "./features/misc-pages/landing/fbads/2502"
import { TestPage } from "./features/misc-pages/Test"
import { PricingList } from "./features/pricing/_PricingList"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/pricing" element={<PricingList />} />
          <Route path="/test" element={<TestPage />} />
        </Route>

        {/* Guest Routes */}
        <Route element={<GuestLayout />}>
          <Route path="/landing-fbads" element={<FbAdsLanding />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}