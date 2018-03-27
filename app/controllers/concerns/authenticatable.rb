# frozen_string_literal: true

module Authenticatable
  extend ActiveSupport::Concern

  def current_user
    # XXX: Currently we store a user ID in the session directly. Is this secure?
    @__user ||= User.find_by(id: session[:user_id])
  end

  def auth_check_ok?
    !self.class.login_required || current_user.present?
  end

  class_methods do
    def login_required
      true
    end

    def require_login(required = true)
      return if required == login_required
      define_singleton_method(:login_required) do
        required
      end
    end
  end
end
