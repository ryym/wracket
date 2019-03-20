# frozen_string_literal: true

# TODO: Handle errors properly.

class SessionsHandler
  include ActionHandler::Equip

  MY_ADDRESS = 'ryym.64@gmail.com'

  def self.create
    urls = Rails.application.routes.url_helpers
    new(
      pocket_authenticator: PocketAuthenticator.create(urls.oauth_callback_url),
      pocket_first_sync_job: PocketFirstSyncJob,
    )
  end

  def initialize(pocket_authenticator:, pocket_first_sync_job:)
    @pocket = pocket_authenticator
    @first_sync_job = pocket_first_sync_job
  end

  def login(session)
    ret = @pocket.obtain_request_token
    if ret.err?
      return ActionHandler::Call.new(
        :redirect_back,
        [fallback_location: urls.root_path],
      )
    end

    session[:pocket_request_token] = ret.request_token
    redirect_to @pocket.authorization_url(ret.request_token)
  end

  def create(session, reset_session)
    request_token = session[:pocket_request_token]
    session.delete(:pocket_request_token)

    return redirect_to root_path if request_token.empty?

    ret = @pocket.obtain_access_token(request_token)
    return redirect_to root_path if ret.err?

    # XXX: Do not accept other users for now.
    return redirect_to root_path if ret.username != MY_ADDRESS

    reset_session.call

    user = User.login(ret.username, ret.access_token)
    session[:user_id] = user.id

    @first_sync_job.perform_later(user)

    redirect_to urls.home_path
  end
end

class SessionsController < ViewBaseController
  require_login false

  use_handler { SessionsHandler.create }
end
