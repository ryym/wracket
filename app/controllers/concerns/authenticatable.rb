# frozen_string_literal: true

module Authenticatable
  def authenticate!
    # XXX: Is this secure?
    @__user = User.find_by(id: session[:user_id])
    return redirect_to root_path if @__user.nil?
  end

  def current_user
    @__user
  end
end
