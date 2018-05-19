# frozen_string_literal: true

module FrontendPathHelper
  def asset_url(path)
    AssetUrlConverter.singleton.convert(path)
  end

  def should_load_css?
    AssetUrlConverter.singleton.should_load_css?
  end
end
