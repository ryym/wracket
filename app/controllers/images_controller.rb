# frozen_string_literal: true

class ImagesHandler
  include ActionHandler::Equip

  def self.create
    new(
      image_maker: ImageMaker.create,
    )
  end

  def initialize(image_maker:)
    @image_maker = image_maker
  end

  args_params :id, :variant

  def transform(id, variant)
    return render status: :bad_request, plain: '' if variant.blank?

    image = Image.find_by(id: id)
    return render status: :not_found, plain: '' if image.nil?

    variant_url = @image_maker.make_variant(image, variant)
    redirect_to(variant_url || @image_maker.url_for(image))
  end
end

class ImagesController < ViewBaseController
  use_handler { ImagesHandler.create }
end
