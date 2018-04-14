# frozen_string_literal: true

class BookmarkSearcher
  def self.create(limit = 30)
    new(limit)
  end

  def initialize(limit = 30)
    @limit = limit
  end

  def condition(statuses:, offset_value:)
    Condition.new(statuses: statuses || [], offset_value: offset_value)
  end

  def search(user, cdtn)
    q = user.bookmarks.includes(entry: :resolved).where(status: cdtn.statuses)
    set_order_and_offset(q, cdtn).to_a
  end

  private

  def set_order_and_offset(query, cdtn)
    query =
      if cdtn.statuses == [:archived]
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
    attr_reader :statuses
    attr_reader :offset_value

    def initialize(statuses:, offset_value:)
      statuses = statuses.map(&:to_sym)
      statuses.each do |s|
        raise ArgumentError, "invalid status #{s}" if !Bookmark.statuses.key?(s)
      end
      @statuses = statuses
      @offset_value = offset_value ? Time.zone.parse(offset_value) : Time.current
    end
  end
end
