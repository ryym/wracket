require 'forwardable'
require 'net/http'
require 'uri'

# Net::HTTP wrapper.
class Http
  def initialize(host, ssl: false, headers: {})
    @host = host
    @ssl = ssl
    @default_headers = headers
  end

  def post_json(path, data, headers: {})
    req = Net::HTTP::Post.new(path, @default_headers.merge(headers))
    req.body = JSON.generate(data)
    res = new_http.request(req)
    Response.new(res)
  end

  def post_form(path, data, headers: {})
    req = Net::HTTP::Post.new(path, @default_headers.merge(headers))
    req.set_form_data(data)
    res = new_http.request(req)
    Response.new(res)
  end

  private

  def new_http
    Net::HTTP.new(@host, @ssl ? 443 : 80).tap do |http|
      http.use_ssl = @ssl
    end
  end
end

class Http
  class Response
    extend Forwardable

    delegate %i[code body] => :@res

    def initialize(res)
      @res = res
    end

    def response
      @res
    end

    def header(key)
      @res[key]
    end

    def form
      @form ||= Hash[URI.decode_www_form(@res.body)]
    end

    def body_json
      JSON.parse(@res.body)
    end
  end
end
