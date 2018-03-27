
# frozen_string_literal: true

class BaseController < ApplicationController
  include Authenticatable

  before_action :authenticate!

  private

  def authenticate!
    redirect_to root_path unless auth_check_ok?
  end
end
