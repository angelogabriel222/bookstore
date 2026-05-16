import { api } from "./client"
import type { AuthResponse } from "../types"

export const authApi = {
  login: (email: string, password: string) =>
    api.post<AuthResponse>("/auth/sign_in", { user: { email, password } }),

  register: (email: string, password: string, role = "customer") =>
    api.post<AuthResponse>("/auth", { user: { email, password, password_confirmation: password, role } }),

  logout: () => api.delete<{ message: string }>("/auth/sign_out"),
}
