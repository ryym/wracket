# frozen_string_literal: true

class Tag < ApplicationRecord
  has_many :bookmark_tags, dependent: :restrict_with_error, inverse_of: :tag

  # TODO: validation

  scope :by_name, ->(name) { where(name: name) }
end
