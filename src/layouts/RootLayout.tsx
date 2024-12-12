import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAppStore } from '../stores/app-store'
import { useEffect } from 'react'

export default function RootLayout() {
  const { theme } = useAppStore()

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
  }, [theme])

  return (
    <div 
      className={`
        min-h-screen 
        ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}
        transition-colors duration-300
      `}
    >
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
