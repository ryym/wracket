# frozen_string_literal: true

module Api
  class SearchController < ApiBaseController
    before_action do
      @searcher ||= BookmarkSearcher.create
      @json ||= JsonMaker.new
    end

    def index
      cdtn = @searcher.condition_from_params(params)
      bookmarks = @searcher.search(current_user, cdtn)
      render json: @json.bookmarks(bookmarks)
    end
  end
end
