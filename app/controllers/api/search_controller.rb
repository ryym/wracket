# frozen_string_literal: true

module Api
  class SearchController < ApiBaseController
    before_action do
      @searcher ||= BookmarkSearcher.create
      @json ||= JsonMaker.new
    end

    def index
      cdtn = @searcher.condition(search_params)
      bookmarks = @searcher.search(current_user, cdtn)
      render json: @json.bookmarks(bookmarks)
    end

    private

    def search_params
      statuses = params[:statuses]
      statuses = [] if !statuses.is_a?(Array)
      {
        statuses: statuses,
        offset_value: params[:offset_value],
      }
    end
  end
end
