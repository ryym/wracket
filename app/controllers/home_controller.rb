# frozen_string_literal: true

class HomeHandler
  include ActionHandler::Equip

  def self.create
    new(
      bookmark_searcher: BookmarkSearcher.create,
      json_maker: JsonMaker.create,
    )
  end

  def initialize(bookmark_searcher:, json_maker:)
    @searcher = bookmark_searcher
    @json = json_maker
  end

  args Args::Sessions.create

  def index(current_user, params)
    cdtn = @searcher.condition_from_params(params)
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

class HomeController < ViewBaseController
  use_handler { HomeHandler.create }
end
