# frozen_string_literal: true

class HomeController < BaseController
  def index
    init = { ids: [], byId: {} }
    bookmarks = current_user.unarchived_bookmarks.each_with_object(init) do |b, bs|
      bs[:ids].push(b.id)
      bs[:byId][b.id] = {
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
