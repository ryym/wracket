# frozen_string_literal: true

class Image < ApplicationRecord
  # See Bookmark comments for the reason of `required: false`.
  belongs_to :entry, required: false

  # TODO: validation
end
