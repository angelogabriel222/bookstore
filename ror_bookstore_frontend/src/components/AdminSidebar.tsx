import { NavLink } from "react-router-dom"
import { BookOpen, Users, Building2, Tags, LayoutDashboard } from "lucide-react"

const links = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/admin/books", icon: BookOpen, label: "Books" },
  { to: "/admin/authors", icon: Users, label: "Authors" },
  { to: "/admin/publishers", icon: Building2, label: "Publishers" },
  { to: "/admin/genres", icon: Tags, label: "Genres" },
]

export default function AdminSidebar() {
  return (
    <aside data-testid="admin-sidebar" className="w-64 bg-gray-50 dark:bg-slate-800 border-r border-gray-200 dark:border-gray-700 p-4">
      <nav className="space-y-1">
        {links.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
            data-testid={`sidebar-${label.toLowerCase()}`}
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
