FactoryBot.define do
  factory :publisher do
    sequence(:name) { |n| "#{Faker::Book.publisher} #{n}" }
    description { Faker::Lorem.paragraph }
  end
end
