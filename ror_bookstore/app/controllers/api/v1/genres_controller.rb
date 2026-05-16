module Api
  module V1
    class GenresController < ApplicationController
      before_action :authenticate_user!, except: [:index, :show]

      def index
        genres = Genre.all
        render json: genres
      end

      def show
        genre = Genre.find(params[:id])
        render json: genre
      end

      private

      def genre_params
        params.require(:genre).permit(:name)
      end
    end
  end
end
