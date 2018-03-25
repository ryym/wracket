# frozen_string_literal: true

class PocketClient
  def self.create(access_token)
    http = Http.new('getpocket.com', ssl: true, headers: {
      'Content-Type': 'application/json',
    })
    PocketClient.new(
      consumer_key: ENV['POCKET_CONSUMER_KEY'],
      access_token: access_token,
      http: http,
    )
  end

  def initialize(consumer_key:, access_token:, http:)
    @consumer_key = consumer_key
    @access_token = access_token
    @http = http
  end

  def retrieve(params = {})
    res = @http.post_json('/v3/get', params.merge(
      consumer_key: @consumer_key,
      access_token: @access_token,
    ))
    res.success? ? ResRetrieve.new(res) : Pocket::ResErr.new(res)
  end

  # Retrieve items for each given count and pass them to the given block.
  # It stops the loop when a response is not a success, or the items are empty.
  # But the given block is called on both cases.
  def retrieve_each(count, params = {})
    offset = 0
    while true
      ret = retrieve(params.merge(count: count, offset: offset))
      if ret.err?
        yield(ret, nil)
        break
      end

      json = ret.response.body_json
      yield(ret, json)
      break if json['list'].empty?
      offset += count
    end
  end
end

class PocketClient
  class ResRetrieve < Pocket::Result
  end
end
