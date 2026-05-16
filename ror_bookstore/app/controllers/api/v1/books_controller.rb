module Api
  module V1
    class BooksController < ApplicationController
      before_action :authenticate_user!, except: [:index, :show]

      def index
        books = Book.includes(:author, :publisher, :genre).all
        render json: books, include: [:author, :publisher, :genre]
      end

      def show
        book = Book.includes(:author, :publisher, :genre).find(params[:id])
        render json: book, include: [:author, :publisher, :genre]
      end

      private

      def book_params
        params.require(:book).permit(:name, :description, :price, :author_id, :publisher_id, :genre_id)
      end
    end
  end
end
