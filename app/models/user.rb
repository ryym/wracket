
# frozen_string_literal: true

# TODO: Should encrypt access tokens.
# TODO: Add expiry for access tokens.

class User < ApplicationRecord
  has_many :bookmarks, dependent: :destroy, inverse_of: :user
  has_many :entries, through: :bookmarks

  validates :username, presence: true, uniqueness: true
  validates :access_token, presence: true

  enum first_sync: {
    incomplete: 0,
    done: 1,
  }, _prefix: true

  def self.login(name, token)
    user = User.find_by(username: name)
    if user
      user.update!(access_token: token)
      user
    else
      User.create!(username: name, access_token: token)
    end
  end

  def unarchived_bookmarks
    bookmarks.includes(entry: :resolved).unarchived.order_by_newest
  end
end
