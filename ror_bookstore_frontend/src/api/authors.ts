import { api } from "./client"
import type { Author } from "../types"

export const authorsApi = {
  getAll: () => api.get<Author[]>("/authors"),
  create: (data: Partial<Author>) => api.post<Author>("/admin/authors", { author: data }),
  update: (id: number, data: Partial<Author>) => api.put<Author>(`/admin/authors/${id}`, { author: data }),
  delete: (id: number) => api.delete<void>(`/admin/authors/${id}`),
}
