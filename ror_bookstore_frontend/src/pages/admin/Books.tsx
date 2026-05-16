import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { booksApi } from "../../api/books"
import { authorsApi } from "../../api/authors"
import { publishersApi } from "../../api/publishers"
import { genresApi } from "../../api/genres"
import { Plus, Pencil, Trash2 } from "lucide-react"
import type { Book } from "../../types"

export default function AdminBooks() {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [editing, setEditing] = useState<Book | null>(null)
  const [form, setForm] = useState({ name: "", description: "", price: "", author_id: "", publisher_id: "", genre_id: "" })

  const { data: books } = useQuery({ queryKey: ["books"], queryFn: booksApi.getAll })
  const { data: authors } = useQuery({ queryKey: ["authors"], queryFn: authorsApi.getAll })
  const { data: publishers } = useQuery({ queryKey: ["publishers"], queryFn: publishersApi.getAll })
  const { data: genres } = useQuery({ queryKey: ["genres"], queryFn: genresApi.getAll })

  const createMutation = useMutation({
    mutationFn: (data: Partial<Book>) => booksApi.create(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["books"] }); closeModal() },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Book> }) => booksApi.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["books"] }); closeModal() },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => booksApi.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["books"] }),
  })

  const openCreate = () => {
    setEditing(null)
    setForm({ name: "", description: "", price: "", author_id: "", publisher_id: "", genre_id: "" })
    setIsOpen(true)
  }

  const openEdit = (book: Book) => {
    setEditing(book)
    setForm({
      name: book.name,
      description: book.description || "",
      price: book.price.toString(),
      author_id: book.author_id.toString(),
      publisher_id: book.publisher_id.toString(),
      genre_id: book.genre_id.toString(),
    })
    setIsOpen(true)
  }

  const closeModal = () => setIsOpen(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const data = { ...form, author_id: parseInt(form.author_id), publisher_id: parseInt(form.publisher_id), genre_id: parseInt(form.genre_id) }
    if (editing) {
      updateMutation.mutate({ id: editing.id, data })
    } else {
      createMutation.mutate(data)
    }
  }

  return (
    <div data-testid="admin-books-page">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" data-testid="admin-books-title">Books</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          data-testid="add-book-btn"
        >
          <Plus size={20} /> Add Book
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-xl">
        <table className="w-full" data-testid="books-table">
          <thead className="bg-gray-50 dark:bg-slate-800">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Author</th>
              <th className="text-left p-3">Price</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books?.map((book) => (
              <tr key={book.id} className="border-t border-gray-200 dark:border-gray-700" data-testid={`book-row-${book.id}`}>
                <td className="p-3" data-testid={`book-name-${book.id}`}>{book.name}</td>
                <td className="p-3 text-gray-500">{book.author?.name}</td>
                <td className="p-3">${parseFloat(book.price).toFixed(2)}</td>
                <td className="p-3 text-right">
                  <button onClick={() => openEdit(book)} className="p-2 hover:text-blue-600 cursor-pointer" data-testid={`edit-book-${book.id}`}>
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => deleteMutation.mutate(book.id)} className="p-2 hover:text-red-600 cursor-pointer" data-testid={`delete-book-${book.id}`}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" data-testid="book-modal">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">{editing ? "Edit Book" : "New Book"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                data-testid="book-form-name"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 outline-none"
                required
              />
              <textarea
                data-testid="book-form-description"
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 outline-none"
              />
              <input
                data-testid="book-form-price"
                type="number"
                step="0.01"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 outline-none"
                required
              />
              <select
                data-testid="book-form-author"
                value={form.author_id}
                onChange={(e) => setForm({ ...form, author_id: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 outline-none"
                required
              >
                <option value="">Select Author</option>
                {authors?.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
              <select
                data-testid="book-form-publisher"
                value={form.publisher_id}
                onChange={(e) => setForm({ ...form, publisher_id: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 outline-none"
                required
              >
                <option value="">Select Publisher</option>
                {publishers?.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
              <select
                data-testid="book-form-genre"
                value={form.genre_id}
                onChange={(e) => setForm({ ...form, genre_id: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 outline-none"
                required
              >
                <option value="">Select Genre</option>
                {genres?.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
              </select>
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={closeModal} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer" data-testid="book-form-submit">
                  {editing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
