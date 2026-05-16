module Api
  module V1
    module Admin
      class AuthorsController < ApplicationController
        before_action :authenticate_user!
        before_action :set_author, only: [:show, :update, :destroy]

        def index
          authors = Author.all
          render json: authors
        end

        def show
          render json: @author
        end

        def create
          author = Author.new(author_params)
          authorize author
          author.save!
          render json: author, status: :created
        end

        def update
          authorize @author
          @author.update!(author_params)
          render json: @author
        end

        def destroy
          authorize @author
          @author.destroy!
          head :no_content
        end

        private

        def set_author
          @author = Author.find(params[:id])
        end

        def author_params
          params.require(:author).permit(:name, :bio)
        end
      end
    end
  end
end
