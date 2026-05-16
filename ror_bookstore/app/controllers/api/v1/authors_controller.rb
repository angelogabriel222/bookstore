module Api
  module V1
    class AuthorsController < ApplicationController
      before_action :authenticate_user!, except: [:index, :show]

      def index
        authors = Author.all
        render json: authors
      end

      def show
        author = Author.find(params[:id])
        render json: author
      end

      private

      def author_params
        params.require(:author).permit(:name, :bio)
      end
    end
  end
end
