# frozen_string_literal: true

module FrontendPathHelper
  def asset_url(path)
    AssetUrl.convert(path)
  end
end
