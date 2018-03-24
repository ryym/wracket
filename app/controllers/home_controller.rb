class HomeController < ApplicationController
  include Authenticatable

  before_action :authenticate!

  def index
    init = { ids: [], by_id: {} }
    bookmarks = current_user.unarchived_bookmarks.inject(init) do |bs, b|
      bs[:ids].push(b.id)
      bs[:by_id][b.id] = {
        id: b.id,
        title: b.entry.resolved_title,
        url: b.entry.url,
      }
      bs
    end

    render locals: {
      user: current_user,
      bookmarks: bookmarks,
    }
  end
end
