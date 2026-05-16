require "rails_helper"

RSpec.describe "Api::V1::Auth::Sessions", type: :request do
  let(:user) { create(:user, email: "test@test.com", password: "password") }

  describe "POST /api/v1/auth/sign_in" do
    context "with valid credentials" do
      before do
        post "/api/v1/auth/sign_in", params: { user: { email: user.email, password: "password" } }, as: :json
      end

      it "returns status 200" do
        expect(response).to have_http_status(:ok)
      end

      it "returns a token" do
        expect(response.headers["Authorization"]).to be_present
      end
    end

    context "with invalid credentials" do
      before do
        post "/api/v1/auth/sign_in", params: { user: { email: user.email, password: "wrong" } }, as: :json
      end

      it "returns status 401" do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "DELETE /api/v1/auth/sign_out" do
    before do
      post "/api/v1/auth/sign_in", params: { user: { email: user.email, password: "password" } }, as: :json
      @token = response.headers["Authorization"]
    end

    it "returns status 200" do
      delete "/api/v1/auth/sign_out", headers: { "Authorization" => @token }, as: :json
      expect(response).to have_http_status(:ok)
    end
  end
end
