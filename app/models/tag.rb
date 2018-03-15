class Tag < ApplicationRecord
  has_many :user_entry_tags

  # TODO: validation
end
