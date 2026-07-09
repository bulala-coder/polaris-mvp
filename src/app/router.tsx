import { createBrowserRouter } from 'react-router-dom'
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
])
