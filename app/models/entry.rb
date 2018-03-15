class Entry < ApplicationRecord
  has_one :resolved, class_name: :Entry, foreign_key: :id, primary_key: :resolved_id
  has_many :user_entries, dependent: :destroy
  has_many :users, through: :user_entries
  has_many :user_entry_tags, dependent: :destroy
  has_many :images, dependent: :destroy

  # TODO: validation
end
