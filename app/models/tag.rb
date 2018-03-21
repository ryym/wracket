class Tag < ApplicationRecord
  has_many :bookmark_tags, inverse_of: :tag

  # TODO: validation

  scope :by_name, ->(name) { where(name: name) }
end
