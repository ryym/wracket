# frozen_string_literal: true

class Settings
  def self.singleton
    @_settings ||= create
  end

  def self.create(env: ENV.to_h)
    new(env)
  end

  attr_reader :asset_host, :asset_manifest_path
  attr_reader :pocket_consumer_key

  def initialize(env)
    @asset_host = env.fetch('ASSET_HOST')
    @asset_host += ":#{env['ASSET_PORT']}" if env.key?('ASSET_PORT')
    @asset_manifest_path = env['ASSET_MANIFEST_PATH']

    @pocket_consumer_key = env.fetch('POCKET_CONSUMER_KEY')
  end
end
