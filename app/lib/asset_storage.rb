# frozen_string_literal: true

module AssetStorage
  module_function

  def create(settings: Settings.singleton)
    case settings.storage_type
    when :cloud_storage
      self::CloudStorage.create
    else
      self::DiskStorage.create
    end
  end
end
