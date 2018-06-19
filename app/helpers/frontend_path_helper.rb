# frozen_string_literal: true

module FrontendPathHelper
  def asset_url(path)
    AssetUrlConverter.singleton.convert(path)
  end

  def should_load_css?
    AssetUrlConverter.singleton.should_load_css?
  end

  def common_javascript_assets
    return @_common_javascript_assets if @_common_javascript_assets
    assets = should_load_css? ? [] : ['global-styles.js']
    @_common_javascript_assets = assets + [
      'react-redux.js',
      'vendors.js',
    ]
  end
end
