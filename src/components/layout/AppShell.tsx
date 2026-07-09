import type { ReactNode } from 'react'

type AppShellProps = {
  children: ReactNode
}

function AppShell({ children }: AppShellProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#060817] text-slate-100">
      <div className="space-background absolute inset-0" aria-hidden="true" />
      {children}
    </main>
  )
}

export default AppShell
