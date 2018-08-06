# frozen_string_literal: true

class HomeController < ViewBaseController
  before_action do
    @searcher ||= BookmarkSearcher.create
    @json ||= JsonMaker.create
  end

  def index
    cdtn = @searcher.condition(statuses: %i[unread reading])
    result = @searcher.search(current_user, cdtn)
    bookmarks = @json.bookmarks(result.bookmarks)

    render locals: {
      user: current_user,
      bookmarks: bookmarks,
    }
  end
end
