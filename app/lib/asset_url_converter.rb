# frozen_string_literal: true

class AssetUrlConverter
  def self.singleton(settings: Settings.singleton)
    @_singleton ||= create(
      asset_host: settings.asset_host,
      manifest_path: settings.asset_manifest_path,
    )
  end

  def self.create(asset_host:, manifest_path:)
    helper = Helper.new(asset_host)
    return HotConverter.new(helper) if manifest_path.nil?
    manifest = JSON.parse(File.read(Rails.root.join(manifest_path)))
    StaticConverter.new(helper, manifest)
  end

  class HotConverter
    def initialize(helper)
      @helper = helper
    end

    def convert(path)
      @helper.asset_url(path)
    end
  end

  class StaticConverter
    def initialize(helper, manifest)
      @helper = helper
      @manifest = manifest
    end

    def convert(path)
      @manifest.key?(path) ? @helper.asset_url(@manifest[path]) : path
    end
  end

  class Helper
    def initialize(asset_host)
      @asset_host = asset_host
    end

    def asset_url(path)
      "#{@asset_host}/#{path}"
    end
  end
end
