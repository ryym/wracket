# frozen_string_literal: true

class ImagesController < ViewBaseController
  before_action do
    @image_maker ||= ImageMaker.create
  end

  def transform
    id, variant = params.permit(:id, :variant).values
    return render status: :bad_request, plain: '' if variant.blank?

    image = Image.find_by(id: id)
    return render status: :not_found, plain: '' if image.nil?

    variant_url = @image_maker.make_variant(image, variant)
    redirect_to(variant_url || @image_maker.url_for(image))
  end
end
