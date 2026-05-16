FactoryBot.define do
  factory :book do
    name { Faker::Book.title }
    description { Faker::Lorem.paragraph }
    price { Faker::Commerce.price(range: 5..100.0) }
    author
    publisher
    genre
  end
end
