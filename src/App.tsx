import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthLayout } from "./components/layouts/AuthLayout"
import { GuestLayout } from "./components/layouts/GuestLayout"
import { AuthLayoutFull } from "./components/layouts/AuthLayoutFull"
import { AdminDashboard } from "./features/dashboard/AdminDashboard"
import { FbAdsLanding } from "./features/misc-pages/landing/fbads/2502"
import { TestPage } from "./features/misc-pages/Test"
import { PricingList } from "./features/pricing/_PricingList"
import PricingGeneratorForm from "./pricing-gen"
import PricingGenerator from "./pricing-gen2"
import SelectTest from "./SelectTest"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected Routes with Navbar */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/pricing" element={<PricingList />} />
          <Route path="/test" element={<TestPage />} />
        </Route>

        {/* Protected Routes With Backbar */}
        <Route element={<AuthLayoutFull />}>
          <Route path="/pricing-gen" element={<PricingGeneratorForm />} />
        </Route>

        {/* Guest Routes */}
        <Route element={<GuestLayout />}>
          <Route path="/landing-fbads" element={<FbAdsLanding />} />
          <Route path="/pricing-gen2" element={<PricingGenerator />} />
          <Route path="/1" element={<SelectTest />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}