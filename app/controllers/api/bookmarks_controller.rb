# frozen_string_literal: true

module Api
  class BookmarksController < ApiBaseController
    before_action do
      @updater ||= BookmarkUpdater.create(current_user)
    end

    before_action do
      @bookmark_id = params.fetch(:id)
    end

    def open
      bookmark = @updater.open(@bookmark_id)
      render json: {
        bookmarkId: bookmark.id,
        openedAt: bookmark.opened_at,
      }
    end
  end
end
