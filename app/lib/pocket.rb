# frozen_string_literal: true

# Pocket module provides common utilities used in our Pocket clients.
module Pocket
  class Result
    attr_reader :response

    def initialize(res)
      @response = res
    end

    def err?
      @response.code != '200'
    end
  end

  class ResErr < Result
    attr_reader :error_code, :message

    def initialize(res)
      super(res)
      @error_code = res.header('X-Error-Code')
      @message = res.header('X-Error')
    end

    def to_s
      '[pocket response error] ' \
        "http status code: #{@response.code}, "\
        "error code: #{@error_code}, message: #{@message}"
    end
  end
end
