import { Link } from "react-router-dom"
import { BookOpen, ArrowRight, Shield, ShoppingCart, Zap } from "lucide-react"

export default function Landing() {
  return (
    <div data-testid="landing-page">
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6" data-testid="landing-title">
          Welcome to{" "}
          <span className="text-blue-600 dark:text-blue-400">Bookstore</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
          Discover thousands of books. Manage your collection with our powerful admin panel.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/books"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            data-testid="cta-books"
          >
            Browse Books <ArrowRight size={20} />
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-600 px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            data-testid="cta-login"
          >
            Admin Login <Shield size={20} />
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-8">
        {[
          { icon: BookOpen, title: "Vast Collection", desc: "Browse through our extensive catalog of books across multiple genres." },
          { icon: ShoppingCart, title: "Easy Shopping", desc: "Add books to your cart and checkout with ease." },
          { icon: Zap, title: "Fast & Reliable", desc: "Lightning-fast performance with real-time updates." },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="text-center p-6 rounded-xl border border-gray-200 dark:border-gray-700" data-testid="feature-card">
            <Icon size={40} className="mx-auto mb-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{desc}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
