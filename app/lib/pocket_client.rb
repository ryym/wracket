# frozen_string_literal: true

# TODO: Check rate limits before all API calls.
# (https://getpocket.com/developer/docs/rate-limits)

class PocketClient
  def self.create(access_token)
    http = Http.new('getpocket.com', ssl: true, headers: {
      'Content-Type': 'application/json',
    })
    PocketClient.new(
      consumer_key: Settings.singleton.pocket_consumer_key,
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
    res = @http.post_json('/v3/get', with_creds(params))
    res.success? ? ResRetrieve.new(res) : Pocket::ResErr.new(res)
  end

  # Retrieve items for each given count and pass them to the given block.
  # It stops the loop when a response is not a success, or the items are empty.
  # But the given block is called on both cases.
  def retrieve_each(count, params = {})
    offset = params.fetch(:offset, 0)
    loop do
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

  def favorite(entry_id, time = Time.current)
    modify({
      action: 'favorite',
      item_id: entry_id,
      time: time.to_i,
    })
  end

  def unfavorite(entry_id, time = Time.current)
    modify({
      action: 'unfavorite',
      item_id: entry_id,
      time: time.to_i,
    })
  end

  def archive(entry_id, time = Time.current)
    modify({
      action: 'archive',
      item_id: entry_id,
      time: time.to_i,
    })
  end

  def readd(entry_id, time = Time.current)
    modify({
      action: 'readd',
      item_id: entry_id,
      time: time.to_i,
    })
  end

  def delete(entry_id, time = Time.current)
    modify({
      action: 'delete',
      item_id: entry_id,
      time: time.to_i,
    })
  end

  def modify(*actions)
    res = @http.post_json('/v3/send', with_creds({ actions: actions }))
    res.success? ? ResModify.new(res) : Pocket::ResErr.new(res)
  end

  private

  def with_creds(params)
    params.merge({
      consumer_key: @consumer_key,
      access_token: @access_token,
    })
  end
end

class PocketClient
  class ResRetrieve < Pocket::Result
  end

  # https://getpocket.com/developer/docs/v3/modify
  class ResModify < Pocket::Result
    STATUS_OK = '1'
    STATUS_ERR = '0'

    alias request_err? err?

    def modification_err?
      @response.body_json['status'] == STATUS_OK
    end

    def err?
      request_err? || modification_err?
    end
  end
end
