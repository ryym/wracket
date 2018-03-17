class Image < ApplicationRecord
  # See UserEntry comments for the reason of `required: false`.
  belongs_to :entry, required: false

  # TODO: validation
end
