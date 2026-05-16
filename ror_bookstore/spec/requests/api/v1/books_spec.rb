require "rails_helper"

RSpec.describe "Api::V1::Books", type: :request do
  let!(:books) { create_list(:book, 3) }
  let(:customer) { create(:user, role: :customer) }
  let(:token) do
    post "/api/v1/auth/sign_in", params: { user: { email: customer.email, password: "password" } }, as: :json
    response.headers["Authorization"]
  end

  describe "GET /api/v1/books" do
    it "returns all books" do
      get "/api/v1/books", as: :json
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).size).to eq(3)
    end
  end

  describe "GET /api/v1/books/:id" do
    it "returns a specific book" do
      get "/api/v1/books/#{books.first.id}", as: :json
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["id"]).to eq(books.first.id)
    end

    it "returns 404 for non-existent book" do
      get "/api/v1/books/999", as: :json
      expect(response).to have_http_status(:not_found)
    end
  end
end
