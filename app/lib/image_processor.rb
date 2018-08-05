# frozen_string_literal: true

class ImageProcessor
  def self.create
    new(
      storage: AssetStorage.create,
      processors: ImageProcessor::Processors.create,
      url_helpers: Rails.application.routes.url_helpers,
      tempfile: Tempfile,
    )
  end

  def initialize(storage:, processors:, url_helpers:, tempfile:)
    @storage = storage
    @processors = processors
    @url_helpers = url_helpers
    @tempfile = tempfile
  end

  def url_for(image, variant: nil)
    return @storage.url(image.path) if variant.nil?

    processor = @processors.get!(variant)

    if image.has_variant?(processor.variant)
      @storage.url(image.path, variant: variant)
    else
      @url_helpers.process_image_path(image, variant: variant)
    end
  end

  def create_variant(image, variant_name, force: false)
    processor = @processors.get!(variant_name)

    do_create(image, variant_name, processor) if force || !image.has_variant?(processor.variant)

    @storage.url(image.path, variant: variant_name)
  end

  private

  def do_create(image, variant_name, processor)
    content = @storage.download(image.path)

    tempfile_with(content) do |f|
      processed_path = processor.process(f.path)
      @storage.upload(
        processed_path,
        path: image.path,
        variant: variant_name,
        content_type: image.content_type,
      )
    end

    image.add_variant!(processor.variant)
  end

  def tempfile_with(content)
    @tempfile.create do |f|
      f.binmode
      f.write(content)
      f.flush
      f.rewind
      yield f
    end
  end
end
