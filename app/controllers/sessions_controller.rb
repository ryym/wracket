# frozen_string_literal: true

# TODO: Handle errors properly.

class SessionsController < BaseController
  require_login false

  before_action do
    @pocket ||= PocketAuthenticator.new(
      consumer_key: ENV['POCKET_CONSUMER_KEY'],
      redirect_uri: oauth_callback_url,
    )
  end

  def login
    ret = @pocket.obtain_request_token
    return redirect_back(fallback_location: root_path) if ret.err?

    # XXX: Probably we should not store a request token in a session.
    session[:pocket_request_token] = ret.request_token
    redirect_to @pocket.authorization_url(ret.request_token)
  end

  def create
    request_token = session[:pocket_request_token]
    return redirect_to root_path if request_token.empty?

    ret = @pocket.obtain_access_token(request_token)
    return redirect_to root_path if ret.err?

    reset_session

    user = User.login(ret.username, ret.access_token)
    session[:user_id] = user.id

    redirect_to home_path
  end
end
