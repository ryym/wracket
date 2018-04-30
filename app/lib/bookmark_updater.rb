# frozen_string_literal: true

class BookmarkUpdater
  def self.create(user)
    new(user, {
      pocket: PocketClient.create(user.access_token),
    })
  end

  def initialize(user, pocket:)
    raise ArgumentError, 'invalid user' if !user.is_a?(User)
    @user = user
    @pocket = pocket
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

  def favorite(bookmark_id)
    bk = find_bookmark(bookmark_id)

    now = Time.current
    ret = @pocket.favorite(bk.entry_id, now)
    raise "failed to favorite bookmark #{bk.id}: #{ret}" if ret.err?

    bk.update_with_pocket!(now, favorite: true, favorited_at: now)
    bk
  end

  def unfavorite(bookmark_id)
    bk = find_bookmark(bookmark_id)

    now = Time.current
    ret = @pocket.unfavorite(bk.entry_id, now)
    raise "failed to unfavorite bookmark #{bk.id}: #{ret}" if ret.err?

    bk.update_with_pocket!(now, favorite: false)
    bk
  end

  # TODO: implement modifications.
  # def archive(bookmark_id); end
  # def unarchive(bookmark_id); end
  # def delete(bookmark_id); end

  private

  def find_bookmark(bookmark_id)
    @user.bookmarks.find(bookmark_id)
  end
end
