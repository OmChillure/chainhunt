import { ReactNode } from "react"
import NavBar from "@/components/dashboardnav"

export default function DashboardLayout({ children }: { children: ReactNode }) {

  return (
    <div className="min-h-screen">
      <NavBar />
        <main className="flex flex-col gap-4">
          {children}
        </main>
    </div>
  )
}
