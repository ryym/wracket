# frozen_string_literal: true

class ImageMaker
  class Variators
    class Thumbnail < self::Base
      def initialize(name, size:, **common)
        super(name, common)
        @size = size
      end

      def process(path, image)
        img = MiniMagick::Image.open(path)
        img.resize @size
        img.path
      rescue MiniMagick::Invalid => err
        Rails.logger.error("failed to process image #{image.id}: #{err}")
        nil
      end
    end
  end
end
