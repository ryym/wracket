class Entry < ApplicationRecord
  # See https://getpocket.com/developer/docs/v3/retrieve for resolved_id.
  # - If the entry has a resolved entry, resolved_id is a different entry id.
  # - If the entry could not be resolved (yet), resolved_id is nil.
  # - Otherwise, resolved_id is the same as entry id.
  has_one :resolved, class_name: :Entry, foreign_key: :id, primary_key: :resolved_id
  has_many :user_entries, dependent: :destroy
  has_many :users, through: :user_entries
  has_many :user_entry_tags, dependent: :destroy
  has_many :images, dependent: :destroy

  # TODO: validation
end
