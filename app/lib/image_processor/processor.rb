# frozen_string_literal: true

class ImageProcessor
  class Variant
    attr_reader :name, :version

    def initialize(name, version:)
      @name = name.to_s
      @version = version
    end
  end

  class Processor
    attr_reader :variant

    def initialize(name, version:)
      @variant = ImageProcessor::Variant.new(name, version: version)
    end

    def process(_path)
      raise NotImplementedError
    end
  end
end
