class HomeController < ApplicationController
  include Authenticatable

  before_action :authenticate!

  def index
    user = current_user
    puts user
  end
end
