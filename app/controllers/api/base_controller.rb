# frozen_string_literal: true

module Api
  class BaseController < ApplicationController
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
