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

    def reset_open
      bookmark = @updater.reset_open(@bookmark_id)
      render json: { bookmarkId: bookmark.id }
    end

    def favorite
      bookmark = @updater.favorite(@bookmark_id)
      render json: {
        bookmarkId: bookmark.id,
        favorited_at: bookmark.favorited_at.to_i,
      }
    end

    def unfavorite
      bookmark = @updater.unfavorite(@bookmark_id)
      render json: { bookmarkId: bookmark.id }
    end
  end
end
