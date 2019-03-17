# frozen_string_literal: true

module Api
  class BookmarksHandler
    include ActionHandler::Equip

    def self.create
      new(
        bookmark_updater_creator: BookmarkUpdater,
      )
    end

    def initialize(bookmark_updater_creator:)
      @updater_creator = bookmark_updater_creator
    end

    args Args::Sessions.create

    arg(:bookmark_id) { |ctrl| ctrl.params.fetch(:id) }

    def open(current_user, bookmark_id)
      bookmark = updater(current_user).open(bookmark_id)
      render json: {
        bookmarkId: bookmark.id,
        openedAt: bookmark.opened_at,
      }
    end

    def reset_open(current_user, bookmark_id)
      bookmark = updater(current_user).reset_open(bookmark_id)
      render json: { bookmarkId: bookmark.id }
    end

    def favorite(current_user, bookmark_id)
      bookmark = updater(current_user).favorite(bookmark_id)
      render json: {
        bookmarkId: bookmark.id,
        favoritedAt: bookmark.favorited_at.to_i,
      }
    end

    def unfavorite(current_user, bookmark_id)
      bookmark = updater(current_user).unfavorite(bookmark_id)
      render json: { bookmarkId: bookmark.id }
    end

    def archive(current_user, bookmark_id)
      bookmark = updater(current_user).archive(bookmark_id)
      render json: {
        bookmarkId: bookmark.id,
        archivedAt: bookmark.archived_at.to_i,
      }
    end

    def readd(current_user, bookmark_id)
      bookmark = updater(current_user).readd(bookmark_id)
      render json: { bookmarkId: bookmark.id }
    end

    def delete(current_user, bookmark_id)
      bookmark = updater(current_user).delete(bookmark_id)
      render json: { bookmarkId: bookmark.id }
    end

    private

    def updater(user)
      @updater_creator.create(user)
    end
  end

  class BookmarksController < ApiBaseController
    use_handler { Api::BookmarksHandler.create }
  end
end
