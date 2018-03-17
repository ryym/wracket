class UserEntry < ApplicationRecord
  # XXX: Actually both of the user and entry associations are required.
  # But with the default `required` option,
  # Rails selects the association from DB on every validation to ensure it exists.
  # This behavior reduces the performance of bulk insert.
  belongs_to :user, required: false
  belongs_to :entry, required: false
  has_many :user_entry_tags
  has_many :tags, through: :user_entry_tags

  # TODO: validation

  scope :by_user, ->(user){ where(user: user) }
end
