export interface User {
  id: number
  email: string
  role: "customer" | "admin" | "superadmin"
}

export interface Book {
  id: number
  name: string
  description: string
  price: string
  author_id: number
  publisher_id: number
  genre_id: number
  author?: Author
  publisher?: Publisher
  genre?: Genre
  created_at: string
  updated_at: string
}

export interface Author {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
}

export interface Publisher {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
}

export interface Genre {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
}

export interface AuthResponse {
  message: string
  user: User
}

export interface PaginatedResponse<T> {
  data: T[]
}
