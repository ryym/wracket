# frozen_string_literal: true

class Image < ApplicationRecord
  MAX_TRANSFORM_TRIES = 3

  has_many :entry_images, dependent: :destroy

  def self.path(name)
    "images/#{name}"
  end

  def path
    self.class.path(digest)
  end

  def transform_tryable?
    transform_tries < MAX_TRANSFORM_TRIES
  end

  def has_variant?(name, version)
    variants[name] == version
  end

  def add_variant!(name, version)
    update!(variants: variants.merge(name => version))
  end

  def remove_variant!(name)
    update!(variants: variants.except(name.to_s))
  end
end
