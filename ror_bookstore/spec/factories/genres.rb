FactoryBot.define do
  factory :genre do
    sequence(:name) { |n| "#{Faker::Book.genre} #{n}" }
    description { Faker::Lorem.paragraph }
  end
end
