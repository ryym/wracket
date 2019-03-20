# frozen_string_literal: true

class WelcomeController < ViewBaseController
  require_login false

  def index
    redirect_to home_path if current_user.present?
  end
end
