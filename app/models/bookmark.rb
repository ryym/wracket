# frozen_string_literal: true

class Bookmark < ApplicationRecord
  # XXX: Actually both of the user and entry associations are required.
  # But with the default `required` option,
  # Rails selects the association from DB on every validation to ensure it exists.
  # This behavior reduces the performance of bulk insert.
  belongs_to :user, required: false, inverse_of: :bookmarks
  belongs_to :entry, required: false, inverse_of: :bookmarks
  has_many :bookmark_tags, dependent: :destroy, inverse_of: :tag
  has_many :tags, through: :bookmark_tags

  # TODO: validation

  # unread -> reading -> archived -> deleted
  enum status: {
    unread: 0,
    archived: 1,
    deleted: 2,
    reading: 3,
  }

  scope :unarchived, -> { where(status: %i[unread reading]) }

  scope :by_user, ->(user) { where(user: user) }

  scope :order_by_newest, -> { order(added_to_pocket_at: :desc) }
end
