# frozen_string_literal: true

class ImageMaker
  class UrlMaker
    def self.create(storage, variators)
      new(
        storage: storage,
        variators: variators,
        url_helpers: Rails.application.routes.url_helpers,
      )
    end

    def initialize(storage:, variators:, url_helpers:)
      @storage = storage
      @variators = variators
      @url_helpers = url_helpers
    end

    def url_for(image, variant: nil)
      return @storage.url(image.path) if variant.nil?

      variator = @variators.get!(variant)

      if image.has_variant?(variator.name, variator.version)
        @storage.url(image.path, variant: variant)
      elsif image.transform_tryable?
        @url_helpers.transform_image_path(image, variant: variant)
      end

      @storage.url(image.path)
    end
  end
end
