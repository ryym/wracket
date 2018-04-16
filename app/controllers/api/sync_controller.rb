# frozen_string_literal: true

module Api
  class SyncController < ApiBaseController
    before_action do
      @syncer ||= PocketSynchronizer.create(current_user.access_token)
      @searcher ||= BookmarkSearcher.create
      @json ||= JsonMaker.new
    end

    def import_updates
      ok, message = @syncer.import_updates(current_user)
      unless ok
        return render status: :internal_server_error, json: {
          message: message,
        }
      end

      cdtn = @searcher.condition_from_params(params)
      bookmarks = @searcher.search(current_user, cdtn)
      render json: @json.bookmarks(bookmarks)
    end
  end
end
