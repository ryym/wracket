# frozen_string_literal: true

class BookmarkSearcher
  def self.create(limit = 30)
    new(limit)
  end

  def initialize(limit = 30)
    @limit = limit
  end

  def condition_from_params(params)
    condition(statuses: params[:statuses], offset_value: params[:offset])
  end

  def condition(statuses:, offset_value:)
    statuses = [] if !statuses.is_a?(Array)
    Condition.new(statuses: statuses, offset_value: offset_value)
  end

  def search(user, cdtn)
    q = user.bookmarks.includes(entry: :resolved).where(status: cdtn.statuses)
    bookmarks = set_offset(q, cdtn).to_a
    self.class::Result.new(bookmarks, bookmarks.size < @limit)
  end

  private

  def set_offset(query, cdtn)
    query = query.limit(@limit)
    return query.order(added_to_pocket_at: :desc) if cdtn.offset_value.blank?
    query.
      order(added_to_pocket_at: :desc).
      where('added_to_pocket_at < ?', Time.zone.at(cdtn.offset_value.to_i))
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
      @offset_value = offset_value
    end
  end

  Result = Struct.new(:bookmarks, :is_last)
end
