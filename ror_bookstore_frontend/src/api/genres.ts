import { api } from "./client"
import type { Genre } from "../types"

export const genresApi = {
  getAll: () => api.get<Genre[]>("/genres"),
  create: (data: Partial<Genre>) => api.post<Genre>("/admin/genres", { genre: data }),
  update: (id: number, data: Partial<Genre>) => api.put<Genre>(`/admin/genres/${id}`, { genre: data }),
  delete: (id: number) => api.delete<void>(`/admin/genres/${id}`),
}
