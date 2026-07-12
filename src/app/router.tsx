import { createBrowserRouter } from 'react-router-dom'
import GoalPage from '../pages/GoalPage'
import JournalPage from '../pages/JournalPage'
import MarketPage from '../pages/MarketPage'
import PortfolioPage from '../pages/PortfolioPage'
import SettingsPage from '../pages/SettingsPage'
import TodayPage from '../pages/TodayPage'
import WelcomePage from '../pages/WelcomePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <WelcomePage />,
  },
  {
    path: '/today',
    element: <TodayPage />,
  },
  {
    path: '/goal',
    element: <GoalPage />,
  },
  {
    path: '/portfolio',
    element: <PortfolioPage />,
  },
  {
    path: '/market',
    element: <MarketPage />,
  },
  {
    path: '/journal',
    element: <JournalPage />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
  },
])
