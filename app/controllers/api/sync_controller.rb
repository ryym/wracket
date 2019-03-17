# frozen_string_literal: true

module Api
  class SyncHandler
    include ActionHandler::Equip

    def self.create
      new(
        pocket_syncer_creator: PocketSynchronizer,
        searcher: BookmarkSearcher.create,
        json_maker: JsonMaker.create,
      )
    end

    def initialize(pocket_syncer_creator:, searcher:, json_maker:)
      @syncer_creator = pocket_syncer_creator
      @searcher = searcher
      @json = json_maker
    end

    args Args::Sessions.create

    def import_updates(current_user, params)
      ok, message = syncer(current_user).synchronize(current_user)
      unless ok
        return render status: :internal_server_error, json: {
          message: message,
        }
      end

      cdtn = @searcher.condition_from_params(params)
      result = @searcher.search(current_user, cdtn)
      render json: @json.bookmarks(result.bookmarks)
    end

    private

    def syncer(current_user)
      @syncer_creator.create(current_user.access_token)
    end
  end

  class SyncController < ApiBaseController
    use_handler { Api::SyncHandler.create }
  end
end
