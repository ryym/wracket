# frozen_string_literal: true

require 'mini_magick'

class ImageProcessor
  class Processors
    def self.create
      p = ImageProcessor
      new([
        p::Thumbnail.new(:thumbnail, version: 1, size: '100x100'),
      ])
    end

    def initialize(processors)
      @processor_by_name = processors.each_with_object({}) do |p, hash|
        hash[p.variant.name] = p
      end
    end

    def get!(variant_name)
      variant = @processor_by_name[variant_name.to_s]
      raise ArgumentError, "variant #{variant_name} does not exist" if variant.nil?
      variant
    end
  end
end
