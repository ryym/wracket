# frozen_string_literal: true

module Api
  class PingController < BaseController
    def ping
      render json: { hello: params.fetch('name', 'world') }
    end
  end
end
