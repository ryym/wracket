class PocketClient
  def self.new_http
    Http.new('getpocket.com', ssl: true, headers: {
      'Content-Type': 'application/json',
    })
  end

  def initialize(consumer_key:, access_token:, http: PocketClient.new_http)
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
