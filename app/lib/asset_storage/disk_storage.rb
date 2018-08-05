# frozen_string_literal: true

require 'fileutils'

module AssetStorage
  class DiskStorage
    def self.create
      new(
        base_url: '',
        base_path: Rails.root.join('public'),
        util: AssetStorage::Util.create,
      )
    end

    def initialize(base_url:, base_path:, util:)
      @base_url = base_url
      @base_path = base_path
      @util = util
    end

    def url(path, variant: nil)
      "#{@base_url}/#{@util.make_path(path, variant)}"
    end

    def upload(io, path:, variant: nil, **_unused)
      IO.binwrite(make_disk_path(path, variant), io.read)
    end

    def download(path)
      IO.binread(make_disk_path(path))
    end

    private

    def make_disk_path(path, variant = nil)
      full_path = @base_path.join(@util.make_path(path, variant))
      dirname = full_path.dirname
      FileUtils.mkdir_p(dirname) if !File.exist?(dirname)
      full_path
    end
  end
end
