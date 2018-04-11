# frozen_string_literal: true

module FrontendPathHelper
  def asset_url(path)
    AssetUrlConverter.singleton.convert(path)
  end
end
