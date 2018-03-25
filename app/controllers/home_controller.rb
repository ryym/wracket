# frozen_string_literal: true

class HomeController < ApplicationController
  include Authenticatable

  before_action :authenticate!

  def index
    init = { ids: [], by_id: {} }
    bookmarks = current_user.unarchived_bookmarks.each_with_object(init) do |b, bs|
      bs[:ids].push(b.id)
      bs[:by_id][b.id] = {
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
