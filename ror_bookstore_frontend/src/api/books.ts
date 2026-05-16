import { api } from "./client"
import type { Book } from "../types"

export const booksApi = {
  getAll: () => api.get<Book[]>("/books"),
  getById: (id: number) => api.get<Book>(`/books/${id}`),
  create: (data: Partial<Book>) => api.post<Book>("/admin/books", { book: data }),
  update: (id: number, data: Partial<Book>) => api.put<Book>(`/admin/books/${id}`, { book: data }),
  delete: (id: number) => api.delete<void>(`/admin/books/${id}`),
}
