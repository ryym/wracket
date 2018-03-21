class Tag < ApplicationRecord
  has_many :user_entry_tags, inverse_of: :tag

  # TODO: validation

  scope :by_name, ->(name) { where(name: name) }
end
