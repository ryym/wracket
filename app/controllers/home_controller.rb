# frozen_string_literal: true

class HomeController < ViewBaseController
  before_action do
    @searcher ||= BookmarkSearcher.create
    @json ||= JsonMaker.create
  end

  def index
    cdtn = @searcher.condition(statuses: %i[unread reading])
    result = @searcher.search(current_user, cdtn)

    initial_data = {
      user: @json.user(current_user),
      bookmarks: @json.bookmarks(result.bookmarks),
    }

    render locals: {
      initial_data: initial_data,
    }
  end
end
