# frozen_string_literal: true

module Api
  class BaseController < ApplicationController
    include Authenticatable

    before_action :authenticate_json!

    def authenticate_json!
      return if auth_check_ok?
      render status: :not_found, json: { message: 'not found' }
    end
  end
end
