# frozen_string_literal: true

class HomeController < ViewBaseController
  before_action do
    @json ||= JsonMaker.new
  end

  def index
    bookmarks = @json.bookmarks(current_user.unarchived_bookmarks)
    render locals: {
      user: current_user,
      bookmarks: bookmarks,
    }
  end
end
