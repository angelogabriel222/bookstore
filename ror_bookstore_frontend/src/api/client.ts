const API_BASE = "/api/v1"

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("auth_token")
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  }
  if (token) {
    ;(headers as Record<string, string>)["Authorization"] = token
  }

  const res = await fetch(`${API_BASE}${url}`, { ...options, headers })

  if (res.status === 204) return undefined as T

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || data.errors?.join(", ") || "Request failed")
  }

  const authHeader = res.headers.get("Authorization")
  if (authHeader) {
    localStorage.setItem("auth_token", authHeader)
  }

  return data
}

export const api = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, body: unknown) => request<T>(url, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(url: string, body: unknown) => request<T>(url, { method: "PUT", body: JSON.stringify(body) }),
  delete: <T>(url: string) => request<T>(url, { method: "DELETE" }),
}
