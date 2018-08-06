# frozen_string_literal: true

class Settings
  def self.singleton
    @_settings ||= create
  end

  def self.create(env: ENV.to_h)
    new(env)
  end

  attr_reader :pocket_consumer_key
  attr_reader(
    :asset_url,
    :asset_manifest_path,
  )
  attr_reader(
    :storage_type,
    :gcp_project_id,
    :gcp_bucket_name,
    :gcp_credentials_path,
  )

  def initialize(env)
    @asset_url = env.fetch('ASSET_URL')
    asset_manifest_path = env['ASSET_MANIFEST_PATH']
    @asset_manifest_path = Rails.root.join(asset_manifest_path) if asset_manifest_path

    @pocket_consumer_key = env.fetch('POCKET_CONSUMER_KEY')

    # cloud_storage / disk_storage
    @storage_type = env.fetch('STORAGE_TYPE', 'disk_storage').to_sym
    if storage_type == :cloud_storage
      @gcp_project_id = env.fetch('GCP_PROJECT_ID')
      @gcp_bucket_name = env.fetch('GCP_BUCKET_NAME')
      @gcp_credentials_path = env['GCP_CREDENTIALS_PATH']
    end
  end
end
