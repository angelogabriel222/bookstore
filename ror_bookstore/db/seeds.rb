authors = Author.create!([
  { name: "Gabriel Garcia Marquez", description: "Colombian novelist, Nobel Prize winner" },
  { name: "J.K. Rowling", description: "British author, creator of Harry Potter" },
  { name: "George Orwell", description: "English novelist and essayist" },
  { name: "Isabel Allende", description: "Chilean-American writer" },
  { name: "Haruki Murakami", description: "Japanese novelist and translator" },
  { name: "Jane Austen", description: "English novelist known for social commentary" },
  { name: "Stephen King", description: "American author of horror and suspense" },
  { name: "Paulo Coelho", description: "Brazilian novelist and lyricist" },
  { name: "Elena Ferrante", description: "Italian novelist" },
  { name: "Tolkien", description: "English writer and philologist" }
])

publishers = Publisher.create!([
  { name: "Penguin Random House", description: "Global publishing house" },
  { name: "HarperCollins", description: "International publisher" },
  { name: "Simon & Schuster", description: "American publishing company" },
  { name: "Macmillan Publishers", description: "British publishing house" },
  { name: "Hachette Livre", description: "French publishing group" }
])

genres = Genre.create!([
  { name: "Fiction", description: "Literary fiction and classics" },
  { name: "Fantasy", description: "Fantasy and magical realism" },
  { name: "Dystopian", description: "Dystopian and speculative fiction" },
  { name: "Romance", description: "Romance and relationships" },
  { name: "Horror", description: "Horror and suspense" },
  { name: "Science Fiction", description: "Science fiction and futuristic" },
  { name: "Historical", description: "Historical fiction" }
])

Book.create!([
  { name: "Cien Anos de Soledad", description: "The multi-generational story of the Buendia family in Macondo", price: 25.99, author: authors[0], publisher: publishers[0], genre: genres[1] },
  { name: "Harry Potter and the Philosopher's Stone", description: "The first book in the Harry Potter series", price: 19.99, author: authors[1], publisher: publishers[1], genre: genres[1] },
  { name: "1984", description: "A dystopian novel set in a totalitarian society", price: 15.99, author: authors[2], publisher: publishers[0], genre: genres[2] },
  { name: "The House of the Spirits", description: "A family saga set in an unnamed Latin American country", price: 22.50, author: authors[3], publisher: publishers[2], genre: genres[0] },
  { name: "Norwegian Wood", description: "A nostalgic story of loss and burgeoning sexuality", price: 18.75, author: authors[4], publisher: publishers[3], genre: genres[0] },
  { name: "Pride and Prejudice", description: "A romantic novel following Elizabeth Bennet", price: 12.99, author: authors[5], publisher: publishers[0], genre: genres[3] },
  { name: "The Shining", description: "A horror novel about the Torrance family", price: 16.99, author: authors[6], publisher: publishers[2], genre: genres[4] },
  { name: "The Alchemist", description: "A young shepherd's journey to find treasure", price: 14.50, author: authors[7], publisher: publishers[1], genre: genres[0] },
  { name: "My Brilliant Friend", description: "The story of two friends in 1950s Naples", price: 20.00, author: authors[8], publisher: publishers[4], genre: genres[0] },
  { name: "The Lord of the Rings", description: "An epic high-fantasy novel", price: 29.99, author: authors[9], publisher: publishers[1], genre: genres[1] },
  { name: "Animal Farm", description: "A satirical allegorical novella", price: 11.99, author: authors[2], publisher: publishers[0], genre: genres[2] },
  { name: "El Amor en los Tiempos del Colera", description: "A love story spanning decades", price: 24.00, author: authors[0], publisher: publishers[4], genre: genres[3] },
  { name: "Kafka on the Shore", description: "A surreal narrative intertwining two stories", price: 21.25, author: authors[4], publisher: publishers[3], genre: genres[1] },
  { name: "It", description: "A horror novel about an ancient evil in Derry", price: 18.99, author: authors[6], publisher: publishers[2], genre: genres[4] },
  { name: "Sense and Sensibility", description: "A story of love and heartbreak", price: 13.50, author: authors[5], publisher: publishers[0], genre: genres[3] }
])

User.find_or_create_by!(email: "superadmin@test.com") do |u|
  u.password = "password"
  u.role = :superadmin
end

User.find_or_create_by!(email: "admin@test.com") do |u|
  u.password = "password"
  u.role = :admin
end

User.find_or_create_by!(email: "customer@test.com") do |u|
  u.password = "password"
  u.role = :customer
end

puts "Seed completed successfully!"
puts "#{Author.count} authors"
puts "#{Publisher.count} publishers"
puts "#{Genre.count} genres"
puts "#{Book.count} books"
puts "#{User.count} users"
