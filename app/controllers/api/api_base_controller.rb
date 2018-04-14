# frozen_string_literal: true

module Api
  # The redundant 'Api' prefix of this class name is intentional.
  # Without this, an inheritance like below could accidentally inherits
  # `BaseController` defined in the top level name scope if it exists
  # instead of `Api::BaseController`.
  #
  #   module Api
  #     class FooController < BaseController
  #       # ...
  #     end
  #   end
  class ApiBaseController < ApplicationController
    include Authenticatable

    before_action :authenticate_json!

    rescue_from StandardError, with: :handle_server_error

    private

    def authenticate_json!
      return if auth_check_ok?
      render status: :not_found, json: { message: 'not found' }
    end

    if Rails.env.production?
      def handle_server_error(_err)
        render status: internal_server_error, json: {
          message: 'Internal server error',
        }
      end
    else
      def handle_server_error(err)
        render status: :internal_server_error, json: {
          message: err.message,
          backtrace: err.backtrace,
        }
      end
    end
  end
end
