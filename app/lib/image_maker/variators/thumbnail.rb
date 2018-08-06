# frozen_string_literal: true

class ImageMaker
  class Variators
    class Thumbnail < self::Base
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
end
