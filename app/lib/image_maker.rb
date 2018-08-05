# frozen_string_literal: true

require 'forwardable'

class ImageMaker
  extend Forwardable

  def self.create
    storage = AssetStorage.create
    variators = self::Variators.create
    new(
      maker: self::Maker.create(storage),
      variator: self::Variator.create(storage, variators),
      url_maker: self::UrlMaker.create(storage, variators),
    )
  end

  def initialize(maker:, variator:, url_maker:)
    @maker = maker
    @variator = variator
    @url_maker = url_maker
  end

  def_delegators :@maker, :make
  def_delegators :@variator, :has_variant?, :make_variant
  def_delegators :@url_maker, :url_for
end
