# frozen_string_literal: true

module AssetStorage
  class Util
    def self.create
      new
    end

    def make_path(path, variant = nil)
      suffix = variant ? "__#{variant}" : ''
      "#{path}#{suffix}"
    end
  end
end
