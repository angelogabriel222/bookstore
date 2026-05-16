import { Outlet, Link, useNavigate } from "react-router-dom"
import { BookOpen, LogIn, LogOut, LayoutDashboard } from "lucide-react"
import ThemeToggle from "./ThemeToggle"
import { useAuthStore } from "../store/authStore"

export default function Layout() {
  const { isAuthenticated, user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header data-testid="header" className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold" data-testid="nav-home">
            <BookOpen size={28} />
            <span>Bookstore</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/books" className="hover:text-blue-600 transition-colors" data-testid="nav-books">
              Books
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/admin" className="hover:text-blue-600 transition-colors" data-testid="nav-admin">
                  <LayoutDashboard size={20} />
                </Link>
                <span className="text-sm text-gray-500">{user?.email}</span>
                <button onClick={handleLogout} className="hover:text-red-500 transition-colors cursor-pointer" data-testid="nav-logout">
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <Link to="/login" className="hover:text-blue-600 transition-colors" data-testid="nav-login">
                <LogIn size={20} />
              </Link>
            )}
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer data-testid="footer" className="border-t border-gray-200 dark:border-gray-700 py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Ror Bookstore. All rights reserved.
      </footer>
    </div>
  )
}
