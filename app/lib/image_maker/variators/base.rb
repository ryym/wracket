# frozen_string_literal: true

class ImageMaker
  class Variators
    class Base
      attr_reader :name
      attr_reader :version

      def initialize(name, version:)
        @name = name.to_s
        @version = version
      end

      def process(_path)
        raise NotImplementedError
      end
    end
  end
end
