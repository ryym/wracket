# frozen_string_literal: true

module Api
  class SearchHandler
    include ActionHandler::Equip

    def self.create
      new(
        searcher: BookmarkSearcher.create,
        json_maker: JsonMaker.create,
      )
    end

    def initialize(searcher:, json_maker:)
      @searcher = searcher
      @json = json_maker
    end

    args Args::Sessions.create

    def index(current_user, params)
      if current_user.sync_status_not_yet?
        return render json: {
          syncStatus: current_user.sync_status,
          bookmarks: [],
          isLast: false,
        }
      end

      cdtn = @searcher.condition_from_params(params)
      result = @searcher.search(current_user, cdtn)
      render json: {
        syncStatus: current_user.sync_status,
        bookmarks: @json.bookmarks(result.bookmarks),
        isLast: result.is_last,
      }
    end
  end

  class SearchController < ApiBaseController
    use_handler { Api::SearchHandler.create }
  end
end
