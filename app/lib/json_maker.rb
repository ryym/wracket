# frozen_string_literal: true

class JsonMaker
  # {
  #   ids: number[],
  #   byId: { id: number, title: string, url: string },
  # }
  def bookmarks(bookmarks)
    init = { ids: [], byId: {} }
    bookmarks.each_with_object(init) do |b, bs|
      bs[:ids].push(b.id)
      bs[:byId][b.id] = {
        id: b.id,
        title: b.entry.resolved_title,
        url: b.entry.url,
        status: b.status,
        addedAt: b.added_to_pocket_at.to_i,
      }
    end
  end
end
