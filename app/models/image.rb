# frozen_string_literal: true

class Image < ApplicationRecord
  def self.path(name)
    "images/#{name}"
  end

  def path
    self.class.path(digest)
  end

  def has_variant?(variant)
    variants[variant.name] == variant.version
  end

  def add_variant!(variant)
    update!(variants: variants.merge(variant.name => variant.version))
  end

  def remove_variant!(variant_name)
    update!(variants: variants.except(variant_name.to_s))
  end
end
