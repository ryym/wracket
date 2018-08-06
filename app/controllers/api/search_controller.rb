# frozen_string_literal: true

module Api
  class SearchController < ApiBaseController
    before_action do
      @searcher ||= BookmarkSearcher.create
      @json ||= JsonMaker.create
    end

    def index
      cdtn = @searcher.condition_from_params(params)
      result = @searcher.search(current_user, cdtn)
      render json: {
        bookmarks: @json.bookmarks(result.bookmarks),
        isLast: result.is_last,
      }
    end
  end
end
