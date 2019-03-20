# frozen_string_literal: true

class EntryImagesHandler
  include ActionHandler::Equip

  def self.create
    new(
      image_attacher: EntryImageAttacher.create,
    )
  end

  def initialize(image_attacher:)
    @attacher = image_attacher
  end

  args_params :id, :variant

  def attach(id, variant)
    record = EntryImage.eager_load(:image).find_by(id: id)
    return render status: :not_found, plain: '' if record.nil?

    url = @attacher.attach(record, variant: variant)
    redirect_to url
  end
end

class EntryImagesController < ViewBaseController
  use_handler { EntryImagesHandler.create }
end
