# frozen_string_literal: true

class EntryImage < ApplicationRecord
  MAX_ATTACH_TRIES = 3

  # See Bookmark comments for the reason of `required: false`.
  belongs_to :entry, required: false, inverse_of: :entry_images
  belongs_to :image, required: false

  # TODO: validation

  def attach_tryable?
    src.present? && image.nil? && attach_tries < MAX_ATTACH_TRIES
  end
end
