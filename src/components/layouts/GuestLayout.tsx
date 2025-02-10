import { Outlet } from "react-router-dom"

export function GuestLayout() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <Outlet />
      </main>
    </div>
  )
}