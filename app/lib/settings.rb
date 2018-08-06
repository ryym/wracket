# frozen_string_literal: true

class Settings
  def self.singleton
    @_settings ||= create
  end

  def self.create(env: ENV.to_h)
    new(env)
  end

  attr_reader :asset_url, :asset_manifest_path
  attr_reader :pocket_consumer_key
  attr_reader :storage_type

  def initialize(env)
    @asset_url = env.fetch('ASSET_URL')
    asset_manifest_path = env['ASSET_MANIFEST_PATH']
    @asset_manifest_path = Rails.root.join(asset_manifest_path) if asset_manifest_path

    @pocket_consumer_key = env.fetch('POCKET_CONSUMER_KEY')

    @storage_type = env.fetch('STORAGE_TYPE', 'disk').to_sym
  end
end
