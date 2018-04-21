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
    set_offset(q, cdtn).to_a
  end

  private

  def set_offset(query, cdtn)
    query.limit(@limit)
    return query if cdtn.offset_value.blank?
    query.where('archived_at < ?', Time.zone.at(cdtn.offset_value.to_i))
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
end
