# frozen_string_literal: true

class AssetUrl
  if Rails.env.development? || Rails.env.test?
    def self.convert(path)
      asset_url(path)
    end
  else
    @manifest = JSON.parse(File.read(Rails.root.join(Settings.asset_manifest_path)))

    def self.convert(path)
      @manifest.key?(path) ? asset_url(@manifest[path]) : path
    end
  end

  def self.asset_url(path)
    "#{Settings.asset_host}/#{path}"
  end
end
