import { useQuery } from "@tanstack/react-query"
import { booksApi } from "../api/books"
import { BookOpen } from "lucide-react"

export default function Books() {
  const { data: books, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: booksApi.getAll,
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64" data-testid="books-loading">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" data-testid="books-page">
      <h1 className="text-3xl font-bold mb-8" data-testid="books-title">Books Catalog</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books?.map((book) => (
          <div
            key={book.id}
            className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            data-testid={`book-card-${book.id}`}
          >
            <div className="h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <BookOpen size={64} className="text-gray-400" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1" data-testid={`book-name-${book.id}`}>{book.name}</h3>
              <p className="text-sm text-gray-500 mb-2" data-testid={`book-author-${book.id}`}>{book.author?.name}</p>
              <p className="text-blue-600 dark:text-blue-400 font-bold text-xl" data-testid={`book-price-${book.id}`}>
                ${parseFloat(book.price).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
