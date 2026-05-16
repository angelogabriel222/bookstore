import { BookOpen, Users, Building2, Tags } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { booksApi } from "../../api/books"
import { authorsApi } from "../../api/authors"
import { publishersApi } from "../../api/publishers"
import { genresApi } from "../../api/genres"

export default function Dashboard() {
  const { data: books } = useQuery({ queryKey: ["books"], queryFn: booksApi.getAll })
  const { data: authors } = useQuery({ queryKey: ["authors"], queryFn: authorsApi.getAll })
  const { data: publishers } = useQuery({ queryKey: ["publishers"], queryFn: publishersApi.getAll })
  const { data: genres } = useQuery({ queryKey: ["genres"], queryFn: genresApi.getAll })

  const stats = [
    { icon: BookOpen, label: "Books", count: books?.length ?? 0, color: "text-blue-600" },
    { icon: Users, label: "Authors", count: authors?.length ?? 0, color: "text-green-600" },
    { icon: Building2, label: "Publishers", count: publishers?.length ?? 0, color: "text-purple-600" },
    { icon: Tags, label: "Genres", count: genres?.length ?? 0, color: "text-orange-600" },
  ]

  return (
    <div data-testid="admin-dashboard">
      <h1 className="text-2xl font-bold mb-6" data-testid="dashboard-title">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ icon: Icon, label, count, color }) => (
          <div
            key={label}
            className="border border-gray-200 dark:border-gray-700 rounded-xl p-6"
            data-testid={`stat-card-${label.toLowerCase()}`}
          >
            <Icon size={32} className={`${color} mb-3`} />
            <p className="text-3xl font-bold">{count}</p>
            <p className="text-gray-500 dark:text-gray-400">{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
