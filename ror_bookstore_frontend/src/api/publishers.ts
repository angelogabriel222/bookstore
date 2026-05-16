import { api } from "./client"
import type { Publisher } from "../types"

export const publishersApi = {
  getAll: () => api.get<Publisher[]>("/publishers"),
  create: (data: Partial<Publisher>) => api.post<Publisher>("/admin/publishers", { publisher: data }),
  update: (id: number, data: Partial<Publisher>) => api.put<Publisher>(`/admin/publishers/${id}`, { publisher: data }),
  delete: (id: number) => api.delete<void>(`/admin/publishers/${id}`),
}
