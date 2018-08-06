# frozen_string_literal: true

class EntryImagesController < ViewBaseController
  before_action do
    @attacher ||= EntryImageAttacher.create
  end

  def attach
    id, variant = params.permit(:id, :variant).values
    record = EntryImage.eager_load(:image).find_by(id: id)
    return render status: :not_found, plain: '' if record.nil?

    url = @attacher.attach(record, variant: variant)
    redirect_to url
  end
end
