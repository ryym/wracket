# frozen_string_literal: true

require 'mini_magick'

class ImageMaker
  class Variators
    def self.create
      new([
        self::Thumbnail.new(:thumbnail, version: 1, size: '90x90'),
      ])
    end

    def initialize(variators)
      @variator_by_name = variators.each_with_object({}) do |v, hash|
        hash[v.name] = v
      end
    end

    def get!(variant_name)
      variant = @variator_by_name[variant_name.to_s]
      raise ArgumentError, "variant #{variant_name} does not exist" if variant.nil?
      variant
    end
  end
end
