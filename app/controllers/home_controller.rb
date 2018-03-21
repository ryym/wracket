class HomeController < ApplicationController
  include Authenticatable

  before_action :authenticate!

  def index
    bookmarks = current_user.unarchived_bookmarks.map do |b|
      {
        id: b.id,
        title: b.entry.resolved_title,
        url: b.entry.url,
      }
    end

    render locals: {
      user: current_user,
      bookmarks: bookmarks,
    }
  end
end
