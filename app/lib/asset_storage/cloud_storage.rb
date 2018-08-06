# frozen_string_literal: true

require 'google/cloud/storage'

module AssetStorage
  class CloudStorage
    def self.create
      # TODO: Remove hard coding.
      storage = Google::Cloud::Storage.new(
        project_id: 'hello-gcp2',
        credentials: 'gcp-cred.json',
      )
      new(
        storage,
        bucket_name: 'wracket',
        base_url: 'https://storage.googleapis.com',
        util: AssetStorage::Util.create,
      )
    end

    def initialize(storage, bucket_name:, base_url:, util:)
      @storage = storage
      @bucket_name = bucket_name
      @base_url = "#{base_url}/#{@bucket_name}"
      @util = util
    end

    def url(path, variant: nil)
      "#{@base_url}/#{@util.make_path(path, variant)}"
    end

    def upload(io, path:, content_type:, variant: nil)
      bucket.create_file(
        io,
        @util.make_path(path, variant),
        content_type: content_type,
        acl: 'public_read',
      )
    end

    def download(path)
      bucket.file(path).download.string
    end

    private

    def bucket
      @bucket ||= @storage.bucket(@bucket_name)
    end
  end
end
