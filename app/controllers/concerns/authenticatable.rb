# frozen_string_literal: true

module Authenticatable
  def pocket_authenticator
    PocketAuthenticator.new(
      consumer_key: ENV['POCKET_CONSUMER_KEY'],
      redirect_uri: oauth_callback_url,
    )
  end

  def authenticate!
    # XXX: Is this secure?
    @__user = User.find_by(id: session[:user_id])
    return redirect_to root_path if @__user.nil?
  end

  def current_user
    @__user
  end
end
