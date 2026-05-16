FactoryBot.define do
  factory :author do
    sequence(:name) { |n| "#{Faker::Book.author} #{n}" }
    description { Faker::Lorem.paragraph }
  end
end
