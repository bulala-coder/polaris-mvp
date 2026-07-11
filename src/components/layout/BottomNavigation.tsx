import { BookOpen, Compass, Home, PieChart, Settings } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navigationItems = [
  {
    label: '今日',
    to: '/today',
    icon: Home,
  },
  {
    label: '組合',
    to: '/portfolio',
    icon: PieChart,
  },
  {
    label: '市場',
    to: '/market',
    icon: Compass,
  },
  {
    label: '反思',
    to: '/journal',
    icon: BookOpen,
  },
  {
    label: '設定',
    to: '/settings',
    icon: Settings,
  },
]

function BottomNavigation() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-slate-950/85 px-3 py-2 shadow-[0_-18px_50px_rgba(2,6,23,0.55)] backdrop-blur-xl">
      <div className="mx-auto grid max-w-3xl grid-cols-5 gap-1">
        {navigationItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              className={({ isActive }) =>
                [
                  'flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg px-2 text-xs font-medium transition',
                  isActive
                    ? 'bg-cyan-200/12 text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.12)]'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-100',
                ].join(' ')
              }
              key={item.to}
              to={item.to}
            >
              <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNavigation
