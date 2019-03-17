require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
# require "action_mailer/railtie"
require "action_view/railtie"
# require "action_cable/engine"
# require "sprockets/railtie"
require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Wracket
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    # We handle frontend assets by Webpack.
    config.generators.stylesheets = false
    config.generators.javascripts = false
    config.generators.helper = false

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
  end

  # Specify default_url_options for action handler (and mailer).
  # This works but I don't know whether this is a best way to set the options.
  # (https://github.com/rails/rails/issues/29992)
  Rails.application.routes.default_url_options = {
    protocol: Rails.env.development? ? 'http' : 'https',
    host: ENV.fetch('SERVER_HOST'),
  }
end
