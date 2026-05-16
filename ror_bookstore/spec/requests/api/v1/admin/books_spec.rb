require "rails_helper"

RSpec.describe "Api::V1::Admin::Books", type: :request do
  let(:admin) { create(:user, :admin) }
  let(:customer) { create(:user, role: :customer) }
  let(:token) do
    post "/api/v1/auth/sign_in", params: { user: { email: admin.email, password: "password" } }, as: :json
    response.headers["Authorization"]
  end

  let(:customer_token) do
    post "/api/v1/auth/sign_in", params: { user: { email: customer.email, password: "password" } }, as: :json
    response.headers["Authorization"]
  end

  let(:author) { create(:author) }
  let(:publisher) { create(:publisher) }
  let(:genre) { create(:genre) }

  let(:valid_attributes) do
    { book: { name: "New Book", price: 29.99, author_id: author.id, publisher_id: publisher.id, genre_id: genre.id } }
  end

  describe "POST /api/v1/admin/books" do
    context "as admin" do
      it "creates a book" do
        post "/api/v1/admin/books", params: valid_attributes, headers: { "Authorization" => token }, as: :json
        expect(response).to have_http_status(:created)
      end
    end

    context "as customer" do
      it "returns 403" do
        post "/api/v1/admin/books", params: valid_attributes, headers: { "Authorization" => customer_token }, as: :json
        expect(response).to have_http_status(:forbidden)
      end
    end

    context "without auth" do
      it "returns 401" do
        post "/api/v1/admin/books", params: valid_attributes, as: :json
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "PUT /api/v1/admin/books/:id" do
    let!(:book) { create(:book) }

    it "updates the book" do
      put "/api/v1/admin/books/#{book.id}", params: { book: { name: "Updated" } }, headers: { "Authorization" => token }, as: :json
      expect(response).to have_http_status(:ok)
      expect(book.reload.name).to eq("Updated")
    end
  end

  describe "DELETE /api/v1/admin/books/:id" do
    let!(:book) { create(:book) }

    it "deletes the book" do
      delete "/api/v1/admin/books/#{book.id}", headers: { "Authorization" => token }, as: :json
      expect(response).to have_http_status(:no_content)
    end

    context "as customer" do
      it "returns 403" do
        delete "/api/v1/admin/books/#{book.id}", headers: { "Authorization" => customer_token }, as: :json
        expect(response).to have_http_status(:forbidden)
      end
    end
  end
end
