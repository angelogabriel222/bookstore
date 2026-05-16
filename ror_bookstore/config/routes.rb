Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  devise_for :users, path: "api/v1/auth", controllers: {
    registrations: "api/v1/registrations",
    sessions: "api/v1/sessions"
  }, defaults: { format: :json }

  namespace :api do
    namespace :v1 do
      resources :books, only: [:index, :show]
      resources :authors, only: [:index, :show]
      resources :publishers, only: [:index, :show]
      resources :genres, only: [:index, :show]

      namespace :admin do
        resources :books
        resources :authors
        resources :publishers
        resources :genres
      end
    end
  end
end
