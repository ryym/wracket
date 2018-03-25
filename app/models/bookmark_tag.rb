# frozen_string_literal: true

class BookmarkTag < ApplicationRecord
  # See Bookmark comments for the reason of `required: false`.
  belongs_to :bookmark, required: false, inverse_of: :bookmark_tags
  belongs_to :tag, required: false, inverse_of: :bookmark_tags
end
