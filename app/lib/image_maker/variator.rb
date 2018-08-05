# frozen_string_literal: true

class ImageMaker
  class Variator
    def self.create(storage, variators)
      new(
        storage: storage,
        variators: variators,
        tempfile: Tempfile,
      )
    end

    def initialize(storage:, variators:, tempfile:)
      @storage = storage
      @variators = variators
      @tempfile = tempfile
    end

    def has_variant?(image, variant_name)
      variator = @variators.get!(variant_name)
      image.has_variant?(variator.name, variator.version)
    end

    def make_variant(image, variant_name, force: false)
      variator = @variators.get!(variant_name)

      if force || !image.has_variant?(variator.name, variator.version)
        do_make(image, variant_name, variator)
      end

      @storage.url(image.path, variant: variant_name)
    end

    private

    def do_make(image, variant_name, variator)
      content = @storage.download(image.path)

      tempfile_with(content) do |f|
        processed_path = variator.process(f.path)
        File.open(processed_path) do |pf|
          @storage.upload(
            pf,
            path: image.path,
            variant: variant_name,
            content_type: image.content_type,
          )
        end
      end

      image.add_variant!(variator.name, variator.version)
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
end
