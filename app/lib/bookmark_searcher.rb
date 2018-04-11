# frozen_string_literal: true

class BookmarkSearcher
  def self.create(limit = 30)
    new(limit)
  end

  def initialize(limit = 30)
    @limit = limit
  end

  def condition(status:, offset_value:)
    Condition.new(status: status || :unarchived, offset_value: offset_value)
  end

  def search(user, cdtn)
    q = user.bookmarks.includes(entry: :resolved).where(status: cdtn.status)
    set_order_and_offset(q, cdtn).to_a
  end

  private

  def set_order_and_offset(query, cdtn)
    query =
      case cdtn.status
      when :archived
        query.
          where('archived_at < ?', cdtn.offset_value).
          order(archived_at: :desc)
      else
        query.
          where('added_to_pocket_at < ?', cdtn.offset_value).
          order_by_newest
      end
    query.limit(@limit)
  end
end

class BookmarkSearcher
  class Condition
    attr_reader :status
    attr_reader :offset_value

    def initialize(status:, offset_value:)
      raise ArgumentError, "invalid status #{status}" if !Bookmark.statuses.key?(status)
      @status = status.to_sym
      @offset_value = offset_value ? Time.zone.parse(offset_value) : Time.current
    end
  end
end
