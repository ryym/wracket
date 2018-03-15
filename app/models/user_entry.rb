class UserEntry < ApplicationRecord
  belongs_to :user
  belongs_to :entry
  has_many :user_entry_tags
  has_many :tags, through: :user_entry_tags

  # TODO: validation
end
