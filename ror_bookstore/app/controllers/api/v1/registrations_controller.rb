module Api
  module V1
    class RegistrationsController < Devise::RegistrationsController
      respond_to :json

      private

      def sign_up_params
        params.require(:user).permit(:email, :password, :password_confirmation, :role)
      end

      def respond_with(resource, _opts = {})
        if resource.persisted?
          render json: { message: "Account created successfully", user: resource }, status: :created
        else
          render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
        end
      end
    end
  end
end
