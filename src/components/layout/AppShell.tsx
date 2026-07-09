import type { ReactNode } from 'react'
import BottomNavigation from './BottomNavigation'

type AppShellProps = {
  children: ReactNode
  showNavigation?: boolean
}

function AppShell({ children, showNavigation = true }: AppShellProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#060817] text-slate-100">
      <div className="space-background absolute inset-0" aria-hidden="true" />
      <div className={showNavigation ? 'pb-24' : undefined}>{children}</div>
      {showNavigation ? <BottomNavigation /> : null}
    </main>
  )
}

export default AppShell
