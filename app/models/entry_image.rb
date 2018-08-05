# frozen_string_literal: true

class EntryImage < ApplicationRecord
  # See Bookmark comments for the reason of `required: false`.
  belongs_to :entry, required: false, inverse_of: :entry_images
  belongs_to :image, required: false

  # TODO: validation
end
