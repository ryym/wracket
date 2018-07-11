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

  def favorite(bookmark_id, time = Time.current)
    find_bookmark(bookmark_id).tap do |bk|
      ret = @pocket.favorite(bk.entry_id, time)
      raise "failed to favorite bookmark #{bk.id}: #{ret}" if ret.err?
      bk.update_with_pocket!(time, favorite: true, favorited_at: time)
    end
  end

  def unfavorite(bookmark_id, time = Time.current)
    find_bookmark(bookmark_id).tap do |bk|
      ret = @pocket.unfavorite(bk.entry_id, time)
      raise "failed to unfavorite bookmark #{bk.id}: #{ret}" if ret.err?
      bk.update_with_pocket!(time, favorite: false, favorited_at: nil)
    end
  end

  def archive(bookmark_id, time = Time.current)
    find_bookmark(bookmark_id).tap do |bk|
      ret = @pocket.archive(bk.entry_id, time)
      raise "failed to archive bookmark #{bk.id}: #{ret}" if ret.err?
      bk.update_with_pocket!(time, archived_at: time, status: :archived)
    end
  end

  def readd(bookmark_id, time = Time.current)
    find_bookmark(bookmark_id).tap do |bk|
      ret = @pocket.readd(bk.entry_id, time)
      raise "failed to readd bookmark #{bk.id}: #{ret}" if ret.err?
      bk.update_with_pocket!(time, archived_at: nil, status: :unread)
    end
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
