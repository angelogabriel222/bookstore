import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { genresApi } from "../../api/genres"
import { Plus, Pencil, Trash2 } from "lucide-react"
import type { Genre } from "../../types"

export default function AdminGenres() {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [editing, setEditing] = useState<Genre | null>(null)
  const [form, setForm] = useState({ name: "", description: "" })

  const { data: genres } = useQuery({ queryKey: ["genres"], queryFn: genresApi.getAll })

  const createMutation = useMutation({
    mutationFn: (data: Partial<Genre>) => genresApi.create(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["genres"] }); closeModal() },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Genre> }) => genresApi.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["genres"] }); closeModal() },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => genresApi.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["genres"] }),
  })

  const openCreate = () => { setEditing(null); setForm({ name: "", description: "" }); setIsOpen(true) }
  const openEdit = (genre: Genre) => { setEditing(genre); setForm({ name: genre.name, description: genre.description || "" }); setIsOpen(true) }
  const closeModal = () => setIsOpen(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editing) updateMutation.mutate({ id: editing.id, data: form })
    else createMutation.mutate(form)
  }

  return (
    <div data-testid="admin-genres-page">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Genres</h1>
        <button onClick={openCreate} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer" data-testid="add-genre-btn">
          <Plus size={20} /> Add Genre
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-xl">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-slate-800">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Description</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {genres?.map((genre) => (
              <tr key={genre.id} className="border-t border-gray-200 dark:border-gray-700" data-testid={`genre-row-${genre.id}`}>
                <td className="p-3" data-testid={`genre-name-${genre.id}`}>{genre.name}</td>
                <td className="p-3 text-gray-500">{genre.description}</td>
                <td className="p-3 text-right">
                  <button onClick={() => openEdit(genre)} className="p-2 hover:text-blue-600 cursor-pointer" data-testid={`edit-genre-${genre.id}`}>
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => deleteMutation.mutate(genre.id)} className="p-2 hover:text-red-600 cursor-pointer" data-testid={`delete-genre-${genre.id}`}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">{editing ? "Edit Genre" : "New Genre"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                data-testid="genre-form-name"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 outline-none"
                required
              />
              <textarea
                data-testid="genre-form-description"
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 outline-none"
              />
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={closeModal} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer" data-testid="genre-form-submit">{editing ? "Update" : "Create"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
