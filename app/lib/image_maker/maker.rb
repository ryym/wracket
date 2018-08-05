# frozen_string_literal: true

require 'marcel'

class ImageMaker
  class Maker
    class MimeType
      def detect(io, **args)
        Marcel::MimeType.for(io, **args) || 'application/octet-stream'
      end
    end

    def self.create(storage)
      new(
        storage: storage,
        mime_type: self::MimeType.new,
        digest: Digest::SHA1,
      )
    end

    def initialize(storage:, mime_type:, digest:)
      @storage = storage
      @mime_type = mime_type
      @digest = digest
    end

    def make(io, content_type: nil)
      content_type ||= @mime_type.detect(io)

      digest = @digest.hexdigest(io.read)
      io.rewind

      @storage.upload(io, path: Image.path(digest), content_type: content_type)
      Image.create_with(content_type: content_type).find_or_create_by(digest: digest)
    end
  end
end
