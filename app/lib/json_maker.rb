# frozen_string_literal: true

class JsonMaker
  # Convert to an object by ID.
  def bookmarks(bookmarks)
    bookmarks.each_with_object({}) do |b, bs|
      bs[b.id] = {
        id: b.id.to_s,
        title: b.entry.resolved_title,
        url: b.entry.url,
        status: b.status,
        addedAt: b.added_to_pocket_at.to_i,
        favorite: b.favorite,
        favoritedAt: b.favorited_at&.to_i,
      }
    end
  end
end
