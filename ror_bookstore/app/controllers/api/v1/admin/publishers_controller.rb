module Api
  module V1
    module Admin
      class PublishersController < ApplicationController
        before_action :authenticate_user!
        before_action :set_publisher, only: [:show, :update, :destroy]

        def index
          publishers = Publisher.all
          render json: publishers
        end

        def show
          render json: @publisher
        end

        def create
          publisher = Publisher.new(publisher_params)
          authorize publisher
          publisher.save!
          render json: publisher, status: :created
        end

        def update
          authorize @publisher
          @publisher.update!(publisher_params)
          render json: @publisher
        end

        def destroy
          authorize @publisher
          @publisher.destroy!
          head :no_content
        end

        private

        def set_publisher
          @publisher = Publisher.find(params[:id])
        end

        def publisher_params
          params.require(:publisher).permit(:name)
        end
      end
    end
  end
end
