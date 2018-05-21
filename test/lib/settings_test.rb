# frozen_string_literal: true

require 'test_helper'

class SettingsTest < ActiveSupport::TestCase
  test 'it stores essential settings' do
    st = Settings.new(
      'ASSET_URL' => 'example.com:3000/hoge',
      'POCKET_CONSUMER_KEY' => 'pocket-consumer-key',
    )

    assert_equal('example.com:3000/hoge', st.asset_url, 'asset URL')
    assert_equal('pocket-consumer-key', st.pocket_consumer_key, 'pocket consumer key')
  end
end
