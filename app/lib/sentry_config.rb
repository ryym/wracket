# frozen_string_literal: true

class SentryConfig
  include Singleton

  def enabled?
    Raven.configuration.environments.include?(Rails.env.to_s)
  end
end
