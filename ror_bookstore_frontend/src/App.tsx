import { Routes, Route, Outlet } from "react-router-dom"
import { useEffect } from "react"
import Layout from "./components/Layout"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminSidebar from "./components/AdminSidebar"
import Landing from "./pages/Landing"
import Books from "./pages/Books"
import Login from "./pages/Login"
import AdminDashboard from "./pages/admin/Dashboard"
import AdminBooks from "./pages/admin/Books"
import AdminAuthors from "./pages/admin/Authors"
import AdminPublishers from "./pages/admin/Publishers"
import AdminGenres from "./pages/admin/Genres"
import { useThemeStore } from "./store/themeStore"

function AdminLayout() {
  return (
    <div className="flex" data-testid="admin-layout">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  )
}

export default function App() {
  const { theme } = useThemeStore()

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/books" element={<Books />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/books" element={<AdminBooks />} />
            <Route path="/admin/authors" element={<AdminAuthors />} />
            <Route path="/admin/publishers" element={<AdminPublishers />} />
            <Route path="/admin/genres" element={<AdminGenres />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}
