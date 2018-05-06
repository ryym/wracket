# frozen_string_literal: true

require 'test_helper'

class SettingsTest < ActiveSupport::TestCase
  test 'it stores essential settings' do
    st = Settings.new(
      'ASSET_HOST' => 'example.com',
      'ASSET_PORT' => '3000',
      'POCKET_CONSUMER_KEY' => 'pocket-consumer-key',
    )

    assert_equal('example.com:3000', st.asset_host, 'asset host')
    assert_equal('pocket-consumer-key', st.pocket_consumer_key, 'pocket consumer key')
  end
end
