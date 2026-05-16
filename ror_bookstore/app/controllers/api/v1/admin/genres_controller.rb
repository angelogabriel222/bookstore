module Api
  module V1
    module Admin
      class GenresController < ApplicationController
        before_action :authenticate_user!
        before_action :set_genre, only: [:show, :update, :destroy]

        def index
          genres = Genre.all
          render json: genres
        end

        def show
          render json: @genre
        end

        def create
          genre = Genre.new(genre_params)
          authorize genre
          genre.save!
          render json: genre, status: :created
        end

        def update
          authorize @genre
          @genre.update!(genre_params)
          render json: @genre
        end

        def destroy
          authorize @genre
          @genre.destroy!
          head :no_content
        end

        private

        def set_genre
          @genre = Genre.find(params[:id])
        end

        def genre_params
          params.require(:genre).permit(:name)
        end
      end
    end
  end
end
