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
    @http.post_json('/v3/get', params.merge(
      consumer_key: @consumer_key,
      access_token: @access_token,
    ))
  end
end
