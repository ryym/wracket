# frozen_string_literal: true

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  # Set up Sentry raven context.
  # https://docs.sentry.io/clients/ruby/integrations/rails/
  if SentryConfig.instance.enabled?
    before_action do
      Raven.user_context(id: session[:user_id])
      Raven.extra_context(params: params.to_unsafe_h, url: request.url)
    end
  end
end
