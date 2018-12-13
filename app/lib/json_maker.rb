# frozen_string_literal: true

class JsonMaker
  def self.create
    new(
      image_maker: ImageMaker.create,
      url_helpers: Rails.application.routes.url_helpers,
    )
  end

  def initialize(image_maker:, url_helpers:)
    @image_maker = image_maker
    @url_helpers = url_helpers
  end

  def user(user)
    {
      syncStatus: user.sync_status,
    }
  end

  # Convert to an object by ID.
  def bookmarks(bookmarks)
    bookmarks.each_with_object({}) do |b, bs|
      first_image = b.entry.entry_images.min_by(&:pocket_image_id)
      bs[b.id] = {
        id: b.id.to_s,
        title: b.entry.resolved_title,
        url: b.entry.url,
        status: b.status,
        addedAt: b.added_to_pocket_at.to_i,
        archivedAt: b.archived_at&.to_i,
        favorite: b.favorite,
        thumbnailUrl: determine_image_url(first_image),
      }
    end
  end

  def determine_image_url(entry_image)
    if entry_image
      variant = :thumbnail
      if entry_image.image
        return @image_maker.url_for(entry_image.image, variant: variant)
      elsif entry_image.attach_tryable?
        return @url_helpers.attach_entry_image_path(entry_image, variant: variant)
      end
    end

    @image_maker.default_thumbnail_url
  end
end
