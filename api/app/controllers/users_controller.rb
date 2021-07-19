class UsersController < ApplicationController
  before_action :set_user, only: [:update]

  def create
    @user = User.new(user_params)
    if @user.save
      login!
      render json: {
        status: :created,
        user: @user
      }
    else
      render json: {
        status: 500,
        errors: @user.errors
      }
    end
  end

  def update
    if @user.update(user_params)
      render json: {
        status: :updated,
        user: @user
      }
    else
      render json: {
        status: 500,
        errors: @user.errors
      }
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :air_quality_threshold, :city)
  end
end
