# Pocket API Authenticator.
# https://getpocket.com/developer/docs/overview
class PocketAuthenticator
  def self.new_http
    Http.new('getpocket.com', ssl: true, headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Accept': 'application/x-www-form-urlencoded',
    })
  end

  def initialize(consumer_key:, redirect_uri:, http: PocketAuthenticator.new_http)
    @consumer_key = consumer_key
    @redirect_uri = redirect_uri
    @http = http
  end

  def obtain_request_token
    res = @http.post_form('/v3/oauth/request', {
      consumer_key: @consumer_key,
      redirect_uri: @redirect_uri,
    })
    err?(res) ? return_err(res) : ResRequestToken.new(res, res.form['code'])
  end

  def authorization_url(request_token)
    query = {
      request_token: request_token,
      redirect_uri: @redirect_uri,
    }.to_query
    "https://getpocket.com/auth/authorize?#{query}"
  end

  # Pocket returns a same access token per user unless
  # the user revokes his token.
  def obtain_access_token(request_token)
    res = @http.post_form('/v3/oauth/authorize', {
      consumer_key: @consumer_key,
      code: request_token,
    })
    err?(res) ? return_err(res) : ResAccessToken.new(res, {
      access_token: res.form['access_token'],
      username: res.form['username'],
    })
  end

  private

  def err?(res)
    res.code != "200"
  end

  def return_err(res)
    ResErr.new(res, {
      error_code: res.header('X-Error-Code'),
      message: res.header('X-Error'),
    })
  end
end

class PocketAuthenticator
  class Result
    attr_reader :response

    def initialize(res)
      @response = res
    end

    def err?
      @response.code != "200"
    end
  end

  class ResErr < Result
    def initialize(res, error_code:, message:)
      super(res)
      @error_code = error_code
      @message = message
    end
  end

  class ResRequestToken < Result
    attr_reader :request_token

    def initialize(res, request_token)
      super(res)
      @request_token = request_token
    end
  end

  class ResAccessToken < Result
    attr_reader :access_token, :username

    def initialize(res, access_token:, username:)
      super(res)
      @access_token = access_token
      @username = username
    end
  end
end