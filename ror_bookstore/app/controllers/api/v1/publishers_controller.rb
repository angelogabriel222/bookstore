module Api
  module V1
    class PublishersController < ApplicationController
      before_action :authenticate_user!, except: [:index, :show]

      def index
        publishers = Publisher.all
        render json: publishers
      end

      def show
        publisher = Publisher.find(params[:id])
        render json: publisher
      end

      private

      def publisher_params
        params.require(:publisher).permit(:name)
      end
    end
  end
end
