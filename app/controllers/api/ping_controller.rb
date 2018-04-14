# frozen_string_literal: true

module Api
  class PingController < ApiBaseController
    def ping
      render json: { hello: params.fetch('name', 'world') }
    end
  end
end
