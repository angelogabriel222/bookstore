FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { "password" }
    password_confirmation { "password" }
    role { :customer }

    trait :admin do
      role { :admin }
    end

    trait :superadmin do
      role { :superadmin }
    end
  end
end
