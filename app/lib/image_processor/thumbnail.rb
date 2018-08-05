# frozen_string_literal: true

class ImageProcessor
  class Thumbnail < self::Processor
    def initialize(name, size:, **common)
      super(name, common)
      @size = size
    end

    def process(path)
      img = MiniMagick::Image.open(path)
      img.resize @size
      img.path
    end
  end
end
