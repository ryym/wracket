class Entry < ApplicationRecord
  # See https://getpocket.com/developer/docs/v3/retrieve for resolved_id.
  # - If the entry has a resolved entry, resolved_id is a different entry id.
  # - If the entry could not be resolved (yet), resolved_id is nil.
  # - Otherwise, resolved_id is the same as entry id.
  has_one :resolved, class_name: :Entry, foreign_key: :id, primary_key: :resolved_id
  has_many :bookmarks, dependent: :destroy, inverse_of: :entry
  has_many :users, through: :bookmarks
  has_many :bookmark_tags, dependent: :destroy
  has_many :images, dependent: :destroy

  # TODO: validation

  def resolved_url
    resolved&.url || url
  end

  def resolved_title
    return title unless resolved
    resolved.parsed_title || resolved.title
  end
end
