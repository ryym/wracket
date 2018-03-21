
# TODO: Should encrypt access tokens.
# TODO: Add expiry for access tokens.

class User < ApplicationRecord
  has_many :user_entries, inverse_of: :user
  has_many :entries, through: :user_entries

  validates :username, presence: true, uniqueness: true
  validates :access_token, presence: true

  def self.login(name, token)
    user = User.find_by(username: name)
    if user
      user.update!(access_token: token)
      user
    else
      User.create!(username: name, access_token: token)
    end
  end
end
