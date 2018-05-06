# frozen_string_literal: true

require 'test_helper'

class PocketAuthenticatorTest < ActiveSupport::TestCase
  test '#obtain_request_token obtains request token' do
    form = URI.encode_www_form([%w[code request-token]])
    res = Struct.new(:code, :body).new('200', form)

    http = mock_instance(Http)
    http.fake(:post_form) { Http::Response.new(res) }

    auth = PocketAuthenticator.new(
      consumer_key: 'consumer-key',
      redirect_uri: '/callback',
      http: http,
    )

    res = auth.obtain_request_token
    assert { res.request_token == 'request-token' }

    assert do
      http.args(:post_form)[0][1] == {
        consumer_key: 'consumer-key',
        redirect_uri: '/callback',
      }
    end
  end
end
