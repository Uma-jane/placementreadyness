import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Code, CheckSquare, BookOpen, User, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/practice', label: 'Practice', icon: Code },
    { path: '/assessments', label: 'Assessments', icon: CheckSquare },
    { path: '/resources', label: 'Resources', icon: BookOpen },
    { path: '/profile', label: 'Profile', icon: User },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900 text-white transition-all duration-300 fixed h-full z-40 overflow-y-auto`}
      >
        <div className="p-6">
          <h1 className={`font-bold text-xl ${!sidebarOpen && 'text-sm'}`}>
            {sidebarOpen ? 'PlacePro' : 'PP'}
          </h1>
        </div>

        <nav className="mt-8">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-6 py-3 transition duration-200 ${
                  isActive(item.path)
                    ? 'bg-primary text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg transition"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5 text-slate-700" />
              ) : (
                <Menu className="w-5 h-5 text-slate-700" />
              )}
            </button>
            <h2 className="text-2xl font-bold text-slate-900">Placement Prep</h2>
          </div>

          {/* User Avatar Placeholder */}
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
            U
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
