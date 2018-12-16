# frozen_string_literal: true

class BookmarkSearcher
  def self.create(limit = 30)
    new(limit)
  end

  def initialize(limit = 30)
    @limit = limit
  end

  def condition_from_params(params)
    Condition.new(
      filter: params[:statusFilter],
      sort_key: params[:sortKey],
      offset: params[:offset],
    )
  end

  def search(user, cdtn)
    q = user.bookmarks.includes(entry: %i[resolved images]).where(status: cdtn.statuses)
    bookmarks = sort_with_offset(q, cdtn).to_a
    self.class::Result.new(bookmarks, bookmarks.size < @limit)
  end

  private

  def sort_with_offset(query, cdtn)
    order =
      case cdtn.sort_key&.underscore&.to_sym
      when :archived_at
        :archived_at
      else
        :added_to_pocket_at
      end
    query.order(order => :desc).offset(cdtn.offset).limit(@limit)
  end
end

class BookmarkSearcher
  class Condition
    attr_reader :statuses
    attr_reader :sort_key
    attr_reader :offset

    # XXX: We need to define this mapping in both of
    # frontend and backend.
    STATUS_FILTERS = {
      new: %i[unread reading],
      reading: %i[reading],
      archived: %i[archived],
      all: %i[unread reading archived],
    }.freeze

    def initialize(filter:, sort_key:, offset:)
      @statuses = STATUS_FILTERS[filter&.to_sym] || STATUS_FILTERS[:new]
      @offset = offset.to_i
      @sort_key = sort_key
    end
  end

  Result = Struct.new(:bookmarks, :is_last)
end
