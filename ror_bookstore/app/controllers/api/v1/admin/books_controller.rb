module Api
  module V1
    module Admin
      class BooksController < ApplicationController
        before_action :authenticate_user!
        before_action :set_book, only: [:show, :update, :destroy]

        def index
          books = Book.includes(:author, :publisher, :genre).all
          render json: books, include: [:author, :publisher, :genre]
        end

        def show
          render json: @book, include: [:author, :publisher, :genre]
        end

        def create
          book = Book.new(book_params)
          authorize book
          book.save!
          render json: book, status: :created, include: [:author, :publisher, :genre]
        end

        def update
          authorize @book
          @book.update!(book_params)
          render json: @book, include: [:author, :publisher, :genre]
        end

        def destroy
          authorize @book
          @book.destroy!
          head :no_content
        end

        private

        def set_book
          @book = Book.find(params[:id])
        end

        def book_params
          params.require(:book).permit(:name, :description, :price, :author_id, :publisher_id, :genre_id)
        end
      end
    end
  end
end
