# frozen_string_literal: true

module Api
  class SyncController < BaseController
    before_action do
      @syncer ||= PocketSynchronizer.create(current_user.access_token)
      @json ||= JsonMaker.new
    end

    def import_updates
      ok, message = @syncer.import_updates(current_user)
      unless ok
        return render status: :internal_server_error, json: {
          message: message,
        }
      end

      bookmarks = @json.bookmarks(current_user.unarchived_bookmarks)
      render json: bookmarks
    end
  end
end
