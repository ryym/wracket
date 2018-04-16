# frozen_string_literal: true

class BookmarkUpdater
  def self.create(user)
    new(user)
  end

  def initialize(user)
    raise ArgumentError, 'invalid user' if !user.is_a?(User)
    @user = user
  end

  def open(bookmark_id)
    find_bookmark(bookmark_id).tap do |b|
      b.update!(status: :reading, opened_at: Time.current)
    end
  end

  def reset_open(bookmark_id)
    find_bookmark(bookmark_id).tap do |b|
      b.update!(status: :unread, opened_at: nil)
    end
  end

  # TODO: implement modifications.
  # def archive(bookmark_id); end
  # def unarchive(bookmark_id); end
  # def favorite(bookmark_id); end
  # def unfavorite(bookmark_id); end
  # def delete(bookmark_id); end

  private

  def find_bookmark(bookmark_id)
    @user.bookmarks.find(bookmark_id)
  end
end
